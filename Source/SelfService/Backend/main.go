package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"time"
)

func main() {

	// Set to false for when in the cluster
	includeDolittleHeaders := false

	// Ugly first version
	platformApi := os.Getenv("PLATFORM_API")
	if platformApi == "" {
		platformApi = "localhost:8080"
	}

	listenOn := os.Getenv("LISTEN_ON")
	if listenOn == "" {
		listenOn = "localhost:3007"
		includeDolittleHeaders = true
	}

	sharedSecret := os.Getenv("HEADER_SECRET")
	if sharedSecret == "" {
		sharedSecret = "TODO-1"
	}

	http.HandleFunc("/", proxyPlatformApiServer(platformApi, sharedSecret, includeDolittleHeaders))
	srv := &http.Server{
		Addr:         listenOn,
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}

	log.Fatal(srv.ListenAndServe())
}

func proxyPlatformApiServer(platformApi string, sharedSecret string, includeDolittleHeaders bool) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		addSharedSecret(sharedSecret, r)
		if includeDolittleHeaders {
			addDolittleHeaders(r)
		}
		// TODO this needs elevating
		serveReverseProxy(platformApi, w, r)
	}
}

func addSharedSecret(sharedSecret string, req *http.Request) {
	//req.Header.Set("X-Shared-Secret", sharedSecret)
	req.Header.Set("x-shared-secret", sharedSecret)
}

func addDolittleHeaders(req *http.Request) {
	// Below shouldn't be needed
	// User-ID: '{{ print .Subject }}'
	// Tenant-ID: '{{ print .Extra.Tenant }}'
	tenantID := "453e04a7-4f9d-42f2-b36c-d51fa2c83fa3"
	userID := "be194a45-24b4-4911-9c8d-37125d132b0b"

	req.Header.Set("User-ID", userID)
	req.Header.Set("Tenant-ID", tenantID)
}

func serveReverseProxy(host string, res http.ResponseWriter, req *http.Request) {
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
