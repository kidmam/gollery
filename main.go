package main

import (
	"fmt"
	"net/http"

	"github.com/LIYINGZHEN/gollery/views"
	"github.com/gorilla/mux"
)

var homeView *views.View
var contactView *views.View

func home(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	err := homeView.Template.ExecuteTemplate(w,
		homeView.Layout, nil)
	if err != nil {
		panic(err)
	}
}
func contact(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	err := contactView.Template.ExecuteTemplate(w,
		contactView.Layout, nil)
	if err != nil {
		panic(err)
	}
}

func faq(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	fmt.Fprint(w, "How can I help you?")
}

func notFound(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	fmt.Fprint(w, "404 Not Found")
}

func main() {
	homeView = views.NewView("bootstrap", "views/home.html")
	contactView = views.NewView("bootstrap", "views/contact.html")

	r := mux.NewRouter()
	r.HandleFunc("/", home)
	r.HandleFunc("/contact", contact)
	r.HandleFunc("/faq", faq)
	r.NotFoundHandler = http.HandlerFunc(notFound)
	http.ListenAndServe(":3000", r)
}
