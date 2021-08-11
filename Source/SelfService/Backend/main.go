package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"time"

	"github.com/sirupsen/logrus"
)

type AppConfig struct {
	PlatformApiHost     string
	ListenOn            string
	SharedSecret        string
	DevelopmentEnabled  bool
	DevelopmentTenantID string
	DevelopmentUserID   string
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

	appConfig.DevelopmentTenantID = os.Getenv("DEVELOPMENT_TENANT_ID")
	appConfig.DevelopmentUserID = os.Getenv("DEVELOPMENT_USER_ID")
	appConfig.DevelopmentEnabled = (appConfig.DevelopmentTenantID != "" && appConfig.DevelopmentUserID != "")

	return appConfig
}

type backend struct {
	logContext logrus.FieldLogger
	appConfig  AppConfig
}

func NewBackend(logContext logrus.FieldLogger, appConfig AppConfig) backend {
	return backend{
		logContext: logContext,
		appConfig:  appConfig,
	}
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

	http.HandleFunc("/", service.ProxyPlatformApiServer())
	srv := &http.Server{
		Addr:         appConfig.ListenOn,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
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
	req.Header.Set("Tenant-ID", s.appConfig.DevelopmentTenantID)
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
