package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"text/template"
	"time"

	"github.com/sirupsen/logrus"
)

type Routes map[string]string

type headers map[string]*template.Template
type SetHeaders map[string]headers

// parseRoutes takes raw json string and parses to a list of routes.
func parseRoutes(raw string) (*Routes, error) {
	var routes Routes
	err := json.Unmarshal([]byte(raw), &routes)
	if err != nil {
		return &routes, err
	}

	return &routes, nil
}

func parseSetHeaders(raw string) (*SetHeaders, error) {
	var doc map[string]map[string]string
	err := json.Unmarshal([]byte(raw), &doc)
	if err != nil {
		return nil, err
	}
	setHeaders := &SetHeaders{}
	for ptrn, hdrs := range doc {
		headers := headers{}
		for hdr, tmpl := range hdrs {
			t := template.Must(template.New(ptrn + hdr).Parse(tmpl))
			headers[hdr] = t
		}
		(*setHeaders)[ptrn] = headers
	}
	return setHeaders, nil
}

type AppConfig struct {
	PlatformApiHost string

	// Proxy is parsed from a json document with the keys being a http.ServeMux pattern
	// and the vals being the host to reverse proxy to.
	Proxy *Routes

	// SetHeader is parsed from a json document with the keys being a http.ServeMux
	// pattern and the vals being a header document, where the keys are the header
	// to set and the vals being text/template.
	SetHeaders *SetHeaders

	ListenOn              string
	SharedSecret          string
	DevelopmentEnabled    bool
	DevelopmentCustomerID string
	DevelopmentUserID     string
}

func initConfig() AppConfig {
	appConfig := AppConfig{}

	appConfig.PlatformApiHost = os.Getenv("PLATFORM_API")
	if appConfig.PlatformApiHost == "" {
		appConfig.PlatformApiHost = "localhost:8080"
	}

	appConfig.ListenOn = os.Getenv("LISTEN_ON")
	if appConfig.ListenOn == "" {
		appConfig.ListenOn = "localhost:3007"
	}

	appConfig.SharedSecret = os.Getenv("HEADER_SECRET")
	if appConfig.SharedSecret == "" {
		appConfig.SharedSecret = "CHANGEME"
	}

	appConfig.DevelopmentCustomerID = os.Getenv("DEVELOPMENT_CUSTOMER_ID")
	appConfig.DevelopmentUserID = os.Getenv("DEVELOPMENT_USER_ID")
	appConfig.DevelopmentEnabled = (appConfig.DevelopmentCustomerID != "" && appConfig.DevelopmentUserID != "")

	proxy := os.Getenv("PROXY")
	if proxy != "" {
		routes, err := parseRoutes(proxy)
		if err != nil {
			panic(err)
		}
		appConfig.Proxy = routes
	}
	setHeaders := os.Getenv("SET_HEADERS")
	if setHeaders != "" {
		headers, err := parseSetHeaders(setHeaders)
		if err != nil {
			panic(err)
		}
		appConfig.SetHeaders = headers
	}
	return appConfig
}

type backend struct {
	mux        *http.ServeMux
	logContext logrus.FieldLogger
	appConfig  AppConfig
}

func NewBackend(logContext logrus.FieldLogger, appConfig AppConfig) backend {
	s := backend{
		mux:        http.NewServeMux(),
		logContext: logContext,
		appConfig:  appConfig,
	}

	if s.appConfig.Proxy != nil {
		for pattern, host := range *s.appConfig.Proxy {
			s.mux.HandleFunc(pattern, s.Proxy(pattern, host))
		}
	} else {
		s.mux.HandleFunc("/", s.Proxy("/", s.appConfig.PlatformApiHost))
	}

	return s
}

func main() {
	// TODO make this a better service (example https://github.com/enricofoltran/simple-go-server/blob/master/main.go)
	logrus.SetFormatter(&logrus.JSONFormatter{})
	appConfig := initConfig()
	logContext := logrus.WithField("context", "backend-service")
	service := NewBackend(logContext, appConfig)
	// Setting the secret to blank, as it will be displayed in the logs,
	// It is still correct in the service
	appConfig.SharedSecret = ""
	logContext.WithFields(logrus.Fields{
		"config": appConfig,
	}).Info("Server starting")

	// http.HandleFunc("/", service.ProxyPlatformApiServer())
	srv := &http.Server{
		Addr:         appConfig.ListenOn,
		Handler:      service,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}

func (s backend) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	s.mux.ServeHTTP(w, r)
}

// Proxy replicates the old behaviour found in ProxyPlatformApiServer, but for
// any host. Used when setting up the handlers in NewBackend.
func (s backend) Proxy(pattern, host string) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		s.AddSharedSecret(r)
		if s.appConfig.DevelopmentEnabled {
			s.AddDolittleHeaders(r)
		}
		if s.appConfig.SetHeaders != nil && (*s.appConfig.SetHeaders)[pattern] != nil {
			for hdr, tmpl := range (*s.appConfig.SetHeaders)[pattern] {
				var val bytes.Buffer
				if err := tmpl.Execute(&val, r); err == nil {
					r.Header.Set(hdr, val.String())
					s.logContext.Debug(`The value of SET_HEADERS, is valid. The value is:`, r.Header.Get(hdr))
				} else {
					s.logContext.Errorf(`The value of SET_HEADERS, is not valid, for "%s". Template could not execute. Ignoring!`, hdr, err)
				}
			}
		}

		proxyURL, _ := url.Parse("/")
		proxyURL.Host = host
		proxyURL.Scheme = "http"

		proxy := httputil.NewSingleHostReverseProxy(proxyURL)

		r.Host = host
		r.URL.Host = host
		r.URL.Scheme = proxyURL.Scheme

		r.Header.Set("X-Forwarded-Host", r.Header.Get("Host"))

		proxy.ServeHTTP(w, r)
	}
}

func (s backend) ProxyPlatformApiServer() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		s.AddSharedSecret(r)
		if s.appConfig.DevelopmentEnabled {
			s.AddDolittleHeaders(r)
		}

		s.ServeReverseProxy(w, r)
	}
}

func (s backend) AddSharedSecret(req *http.Request) {
	req.Header.Set("x-shared-secret", s.appConfig.SharedSecret)
}

func (s backend) AddDolittleHeaders(req *http.Request) {
	req.Header.Set("Tenant-ID", s.appConfig.DevelopmentCustomerID)
	req.Header.Set("User-ID", s.appConfig.DevelopmentUserID)
}

func (s backend) ServeReverseProxy(res http.ResponseWriter, req *http.Request) {
	// TODO log requests
	host := s.appConfig.PlatformApiHost
	url, _ := url.Parse("/")
	url.Host = host
	// Hard coding to http for now
	url.Scheme = "http"
	proxy := httputil.NewSingleHostReverseProxy(url)

	// Update the request
	req.Host = url.Host
	req.URL.Host = url.Host
	req.URL.Scheme = url.Scheme

	req.Header.Set("X-Forwarded-Host", req.Header.Get("Host"))
	// Note that ServeHttp is non blocking and uses a go routine under the hood
	proxy.ServeHTTP(res, req)
}
