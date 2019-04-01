import React, { useState } from "react"
import Router from "next/router"

const New = () => {
  const [title, setTitle] = useState([])

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:8080/api/v1/galleries", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ title })
      })
      Router.push(`/galleries/${await res.json()}/edit`)
    } catch (error) {}
  }

  return (
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Create a gallery</h3>
          </div>
          <div className="panel-body">
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="What is the title of your gallery?"
                onChange={e => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New
