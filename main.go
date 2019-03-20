package main

import (
	"fmt"
	"net/http"
)

func handlerFunc(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	if r.URL.Path == "/" {
		fmt.Fprintf(w, "<h1>Welcome to my awesome site!</h1>")
		return
	} else if r.URL.Path == "/contact" {
		fmt.Fprint(w, "To get in touch, please send an email "+
			"to <a href=\"mailto:maxlivinci@gmail.com\">"+
			"maxlivinci@gmail.com</a>.")
	} else {
		w.WriteHeader(http.StatusNotFound)
		fmt.Fprint(w, "<h1>We could not find the page you "+
			"were looking for :(</h1>"+
			"<p>Please email us if you keep being sent to an "+
			"invalid page.</p>")
	}
}

func main() {
	http.HandleFunc("/", handlerFunc)
	http.ListenAndServe(":3000", nil)
}
