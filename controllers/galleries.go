package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/LIYINGZHEN/gollery/context"
	"github.com/LIYINGZHEN/gollery/models"
	"github.com/LIYINGZHEN/gollery/views"
	"github.com/gorilla/mux"
)

func NewGalleries(gs models.GalleryService) *Galleries {
	return &Galleries{
		New:      views.NewView("bootstrap", "galleries/new"),
		ShowView: views.NewView("bootstrap", "galleries/show"),
		gs:       gs,
	}
}

type Galleries struct {
	New      *views.View
	ShowView *views.View
	gs       models.GalleryService
}

type GalleryForm struct {
	Title string `schema:"title"`
}

// GET /galleries/:id
func (g *Galleries) Show(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	idStr := vars["id"]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid gallery ID", http.StatusNotFound)
		return
	}
	gallery, err := g.gs.ByID(uint(id))
	if err != nil {
		switch err {
		case models.ErrNotFound:
			http.Error(w, "Gallery not found", http.StatusNotFound)
		default:
			http.Error(w, "Whoops! Something went wrong.", http.StatusInternalServerError)
		}
		return
	}
	var vd views.Data
	vd.Yield = gallery
	g.ShowView.Render(w, vd)
}

// POST /galleries
func (g *Galleries) Create(w http.ResponseWriter, r *http.Request) {
	var vd views.Data
	var form GalleryForm
	if err := parseForm(r, &form); err != nil {
		vd.SetAlert(err)
		g.New.Render(w, vd)
		return
	}
	user := context.User(r.Context())
	gallery := models.Gallery{
		Title:  form.Title,
		UserID: user.ID,
	}
	if err := g.gs.Create(&gallery); err != nil {
		vd.SetAlert(err)
		g.New.Render(w, vd)
		return
	}
	fmt.Fprintln(w, gallery)
}
