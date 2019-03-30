package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"gollery/context"
	"gollery/models"
	"gollery/views"

	"github.com/gorilla/mux"
)

const (
	IndexGalleries = "index_galleries"
	ShowGallery    = "show_gallery"
	EditGallery    = "edit_gallery"

	maxMultipartMem = 1 << 20 // 1 megabyte
)

func NewGalleries(gs models.GalleryService,
	is models.ImageService, r *mux.Router) *Galleries {
	return &Galleries{
		New:       views.NewView("bootstrap", "galleries/new"),
		ShowView:  views.NewView("bootstrap", "galleries/show"),
		EditView:  views.NewView("bootstrap", "galleries/edit"),
		IndexView: views.NewView("bootstrap", "galleries/index"),
		gs:        gs,
		is:        is,
		r:         r,
	}
}

type Galleries struct {
	New       *views.View
	ShowView  *views.View
	EditView  *views.View
	IndexView *views.View
	gs        models.GalleryService
	is        models.ImageService
	r         *mux.Router
}

type GalleryForm struct {
	Title string `schema:"title"`
}

// GET /galleries
func (g *Galleries) Index(w http.ResponseWriter, r *http.Request) {
	user := context.User(r.Context())
	galleries, err := g.gs.ByUserID(user.ID)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	js, err := json.Marshal(galleries)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

// GET /galleries/:id
func (g *Galleries) Show(w http.ResponseWriter, r *http.Request) {
	gallery, err := g.galleryByID(w, r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	js, err := json.Marshal(gallery)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

// GET /galleries/:id/edit
func (g *Galleries) Edit(w http.ResponseWriter, r *http.Request) {
	gallery, err := g.galleryByID(w, r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	user := context.User(r.Context())
	if gallery.UserID != user.ID {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	js, err := json.Marshal(gallery)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

// POST /galleries/:id/update
func (g *Galleries) Update(w http.ResponseWriter, r *http.Request) {
	gallery, err := g.galleryByID(w, r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	user := context.User(r.Context())
	if gallery.UserID != user.ID {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	var form GalleryForm
	if err := json.NewDecoder(r.Body).Decode(&form); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	gallery.Title = form.Title
	err = g.gs.Update(gallery)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// POST /galleries/:id/images
func (g *Galleries) ImageUpload(w http.ResponseWriter, r *http.Request) {
	gallery, err := g.galleryByID(w, r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	user := context.User(r.Context())
	if gallery.UserID != user.ID {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	err = r.ParseMultipartForm(maxMultipartMem)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	// Iterate over uploaded files to process them.
	files := r.MultipartForm.File["images"]
	for _, f := range files {
		// Open the uploaded file
		file, err := f.Open()
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
		defer file.Close()

		// Create the image
		err = g.is.Create(gallery.ID, file, f.Filename)
		if err != nil {
			log.Println(err)
			w.WriteHeader(http.StatusInternalServerError)
			return
		}
	}

	images, _ := g.is.ByGalleryID(gallery.ID)

	js, err := json.Marshal(images)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

// POST /galleries/:id/images/:filename/delete
func (g *Galleries) ImageDelete(w http.ResponseWriter, r *http.Request) {
	gallery, err := g.galleryByID(w, r)
	if err != nil {
		return
	}
	user := context.User(r.Context())
	if gallery.UserID != user.ID {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	filename := mux.Vars(r)["filename"]
	i := models.Image{
		Filename:  filename,
		GalleryID: gallery.ID,
	}
	err = g.is.Delete(&i)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	images, _ := g.is.ByGalleryID(gallery.ID)

	js, err := json.Marshal(images)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

// POST /galleries
func (g *Galleries) Create(w http.ResponseWriter, r *http.Request) {
	var form GalleryForm
	if err := json.NewDecoder(r.Body).Decode(&form); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	user := context.User(r.Context())
	gallery := models.Gallery{
		Title:  form.Title,
		UserID: user.ID,
	}
	if err := g.gs.Create(&gallery); err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	js, err := json.Marshal(gallery.ID)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)
}

// POST /galleries/:id/delete
func (g *Galleries) Delete(w http.ResponseWriter, r *http.Request) {
	gallery, err := g.galleryByID(w, r)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	user := context.User(r.Context())
	if gallery.UserID != user.ID {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	err = g.gs.Delete(gallery.ID)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
}

// galleryByID will parse the "id" variable from the
// request path using gorilla/mux and then use that ID to
// retrieve the gallery from the GalleryService
//
// galleryByID will return an error if one occurs, but it
// will also render the error with an http.Error function
// call, so you do not need to.
func (g *Galleries) galleryByID(w http.ResponseWriter,
	r *http.Request) (*models.Gallery, error) {
	vars := mux.Vars(r)
	idStr := vars["id"]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		// This really shouldn't happen with our regex used for
		// routes with an ID, so we should log the error.
		log.Println(err)
		http.Error(w, "Invalid gallery ID", http.StatusNotFound)
		return nil, err
	}
	gallery, err := g.gs.ByID(uint(id))
	if err != nil {
		switch err {
		case models.ErrNotFound:
			http.Error(w, "Gallery not found", http.StatusNotFound)
		default:
			// If we don't get an expected error like ErrNotFound
			// we should log it so we can look into it later.
			log.Println(err)
			http.Error(w, "Whoops! Something went wrong.", http.StatusInternalServerError)
		}
		return nil, err
	}
	images, _ := g.is.ByGalleryID(gallery.ID)
	gallery.Images = images
	return gallery, nil
}
