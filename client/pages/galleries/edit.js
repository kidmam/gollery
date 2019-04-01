import React, { useEffect, useState } from "react"
import Router from "next/router"

const Edit = ({ id }) => {
  const [title, setTitle] = useState("")
  const [files, setFiles] = useState({})
  const [galleryImages, setGalleryImages] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/v1/galleries/${id}/edit`,
          {
            method: "GET",
            credentials: "include"
          }
        )
        const gallery = await res.json()
        setTitle(gallery.Title)
        setGalleryImages(gallery.Images)
      } catch (error) {}
    }
    fetchData()
  }, [])

  const handleUpload = async e => {
    e.preventDefault()
    const formData = new FormData()
    for (const file of files) {
      formData.append("images", file, file.name)
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/galleries/${id}/images`,
        {
          method: "POST",
          credentials: "include",
          body: formData
        }
      )
      setGalleryImages(await res.json())
    } catch (error) {}
  }

  const handleDeleteImage = async (e, image) => {
    e.preventDefault()

    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/galleries/${id}/images/${encodeURIComponent(
          image.Filename
        )}/delete`,
        {
          method: "POST",
          credentials: "include"
        }
      )
      setGalleryImages(await res.json())
    } catch (error) {}
  }

  const handleDelete = async e => {
    e.preventDefault()

    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/galleries/${id}/delete`,
        {
          method: "POST",
          credentials: "include"
        }
      )
      Router.push("/galleries")
    } catch (error) {}
  }

  const handleSaveTitle = async e => {
    e.preventDefault()

    try {
      await fetch(`http://localhost:8080/api/v1/galleries/${id}/update`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ title })
      })
      setTitle(title)
    } catch (error) {}
  }

  return (
    <div>
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <h2>Edit your gallery</h2>
          <a href={`/galleries/${id}/show`}>View this gallery</a>
          <hr />
        </div>
        <div className="col-md-12">
          <form className="form-horizontal">
            <div className="form-group">
              <label className="col-md-1 control-label">Title</label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="What is the title of your gallery?"
                  onChange={e => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="col-md-1">
                <button
                  type="submit"
                  className="btn btn-default"
                  onClick={handleSaveTitle}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <div className="col-md-1">
          <label className="control-label pull-right">Images</label>
        </div>
        <div className="col-md-10">
          {galleryImages.map(image => (
            <div className="col-md-2" key={`${image.Path}`}>
              <a href={`http://localhost:8080/${image.Path}`}>
                <img
                  src={`http://localhost:8080/${image.Path}`}
                  className="thumbnail"
                />
              </a>
              <button
                type="submit"
                className="btn btn-default btn-delete"
                onClick={e => handleDeleteImage(e, image)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="form-group">
            <label className="col-md-1 control-label">Add Images</label>
            <div className="col-md-10">
              <input
                type="file"
                multiple
                onChange={e => setFiles(e.target.files)}
              />
              <p className="help-block">Please only use jpg, jpeg, and png.</p>
              <button
                type="submit"
                className="btn btn-default"
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          <h3>Dangerous buttons...</h3>
          <hr />
        </div>
        <div className="col-md-12" />
        <div className="form-group">
          <div className="col-md-10 col-md-offset-1">
            <button
              type="submit"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

Edit.getInitialProps = async ({ query: { id } }) => {
  return {
    id
  }
}

export default Edit
