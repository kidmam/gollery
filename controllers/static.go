package controllers

import "github.com/LIYINGZHEN/gollery/views"

func NewStatic() *Static {
	return &Static{
		Home:    views.NewView("bootstrap", "views/static/home.html"),
		Contact: views.NewView("bootstrap", "views/static/contact.html"),
		Faq:     views.NewView("bootstrap", "views/static/faq.html"),
	}
}

type Static struct {
	Home    *views.View
	Contact *views.View
	Faq     *views.View
}
