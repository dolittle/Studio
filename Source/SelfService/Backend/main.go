package main

import (
	"encoding/json"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"time"

	"github.com/sirupsen/logrus"
)

type Route struct {
	Pattern string
	Host    string
}

type Routes []Route

// parseRoutes takes raw json string and parses to a list of routes.
func parseRoutes(raw string) (*Routes, error) {
	var doc map[string]string
	routes := &Routes{}
	err := json.Unmarshal([]byte(raw), &doc)
	if err != nil {
		return routes, err
	}
	for pattern, host := range doc {
		*routes = append(*routes, Route{pattern, host})
	}

	return routes, nil
}

type AppConfig struct {
	PlatformApiHost string
	// Proxy is parsed from a json document with the keys being a http.ServeMux pattern
	// and the vals being the host to reverse proxy to.
	Proxy                 *Routes
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

	s.mux.HandleFunc("/", s.Proxy(s.appConfig.PlatformApiHost))

	if s.appConfig.Proxy != nil {
		for _, route := range *s.appConfig.Proxy {
			s.mux.HandleFunc(route.Pattern, s.Proxy(route.Host))
		}

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
func (s backend) Proxy(host string) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		s.AddSharedSecret(r)
		if s.appConfig.DevelopmentEnabled {
			s.AddDolittleHeaders(r)
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
