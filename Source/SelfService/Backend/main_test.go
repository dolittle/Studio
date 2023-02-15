package main

import (
	"net/http"
	"net/http/httptest"
	"net/url"
	"testing"

	"github.com/sirupsen/logrus"
)

var appConfig = AppConfig{
	PlatformApiHost: "something",
	BridgeApiHost:   "somethingelse",
	ListenOn:        "localhost:1234",
}

func TestProxyWithoutBridge(t *testing.T) {
	path := "/bridge/hello"
	platformAPI := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != path {
			t.Error("Path should be unaltered")
		}
	}))
	defer platformAPI.Close()

	url, _ := url.Parse(platformAPI.URL)
	service := NewBackend(logrus.StandardLogger(), AppConfig{PlatformApiHost: url.Host})

	ts := httptest.NewServer(service)
	defer ts.Close()

	res, err := http.Get(ts.URL + path)
	if err != nil {
		t.Errorf("Could not get %s", ts.URL)
	}
	if res.StatusCode != 200 {
		t.Errorf("Expected Status OK, got %v", res.Status)
	}
}

func TestProxyWithBridge(t *testing.T) {
	bPath := "/bridge/hello"
	pPath := "/foo/bar"
	platformAPI := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != pPath {
			t.Errorf("[platform-api] Forwarding error for: %s!", r.URL.Path)
		}
	}))
	defer platformAPI.Close()

	bridgeAPI := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != bPath {
			t.Errorf("[bridge-api] Forwarding error for: %s!", r.URL.Path)
		}
	}))
	defer bridgeAPI.Close()

	pURL, _ := url.Parse(platformAPI.URL)
	bURL, _ := url.Parse(bridgeAPI.URL)

	service := NewBackend(logrus.StandardLogger(), AppConfig{
		PlatformApiHost: pURL.Host,
		BridgeApiHost:   bURL.Host,
	})

	ts := httptest.NewServer(service.mux)
	defer ts.Close()

	res, err := http.Get(ts.URL + pPath)
	if err != nil {
		t.Errorf("Could not get %s", ts.URL)
	}
	if res.StatusCode != 200 {
		t.Errorf("Expected Status OK, got %v", res.Status)
	}

	res, err = http.Get(ts.URL + bPath)
	if err != nil {
		t.Errorf("Could not get %s", ts.URL)
	}
	if res.StatusCode != 200 {
		t.Errorf("Expected Status OK, got %v", res.Status)
	}
}
