package main

import (
	"net/http"
	"net/http/httptest"
	"net/url"
	"os"
	"reflect"
	"testing"

	"github.com/sirupsen/logrus"
)

func testEqualRoutes(t *testing.T, actual, expected *Routes) {
	if !reflect.DeepEqual(expected, actual) {
		t.Errorf("The actual routes, %+v, are not as expected, %+v", actual, expected)
	}
}

func TestParseRoutes(t *testing.T) {
	routes, err := parseRoutes(`{"/hello": "localhost:1234"}`)
	if err != nil {
		t.Errorf("Couldn't parse the routes, %v", err)
	}
	testEqualRoutes(t, routes, &Routes{"/hello": "localhost:1234"})

}

func TestProxyEnvVar(t *testing.T) {
	conf := initConfig()
	if conf.Proxy != nil {
		t.Errorf("Expected empty proxy!")
	}
	os.Setenv("PROXY", `{"/hello": "localhost:2222"}`)
	conf = initConfig()
	testEqualRoutes(t, conf.Proxy, &Routes{"/hello": "localhost:2222"})

	os.Setenv("PROXY", `{"/hello": "localhost:2222", "/foo": "somewhere"}`)
	conf = initConfig()
	testEqualRoutes(t, conf.Proxy, &Routes{"/hello": "localhost:2222", "/foo": "somewhere"})
}

func TestProxyWithoutProxy(t *testing.T) {
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

func TestProxyWithProxy(t *testing.T) {
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
		Proxy: &Routes{"/bridge/": bURL.Host, "/": pURL.Host},
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

func TestProxyOverwritingPlatforAPI(t *testing.T) {
	platformAPI1 := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t.Errorf("Didn't expect anything to be routed to platformAPI1")
	}))
	defer platformAPI1.Close()

	platformAPI2 := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {}))
	defer platformAPI2.Close()

	url1, _ := url.Parse(platformAPI1.URL)
	url2, _ := url.Parse(platformAPI2.URL)

	service := NewBackend(logrus.StandardLogger(), AppConfig{
		PlatformApiHost: url1.Host,
		Proxy:           &Routes{"/": url2.Host},
	})

	ts := httptest.NewServer(service.mux)
	defer ts.Close()

	res, err := http.Get(ts.URL + "/")
	if err != nil {
		t.Errorf("Could not get %s", ts.URL)
	}
	if res.StatusCode != 200 {
		t.Errorf("Expected Status OK, got %v", res.Status)
	}

	res, err = http.Get(ts.URL + "/hello")
	if err != nil {
		t.Errorf("Could not get %s", ts.URL)
	}
	if res.StatusCode != 200 {
		t.Errorf("Expected Status OK, got %v", res.Status)
	}
}
