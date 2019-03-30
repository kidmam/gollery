import React, { useState, useEffect } from "react"
import Router from "next/router"

const Show = ({ id }) => {
  const [gallery, setGallery] = useState({ Images: [] })

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `http://localhost:8080/api/v1/galleries/${id}`,
          {
            method: "GET",
            credentials: "include"
          }
        )
        setGallery(await res.json())
      } catch (error) {}
    }
    fetchData()
  }, [])

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <h1>{gallery.Title}</h1>
          <hr />
        </div>
      </div>
      <div className="row">
        {gallery.Images.map(img => (
          <div className="col-md-4">
            <a href={`http://localhost:8080/${img.Path}`}>
              <img
                src={`http://localhost:8080/${img.Path}`}
                className="thumbnail"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

Show.getInitialProps = async ({ query: { id } }) => {
  return {
    id
  }
}

export default Show
