import React, { useState, useEffect } from "react"
import Router from "next/router"
import Link from "next/link"

const Galleries = () => {
  const [galleries, setGalleries] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${window.location.origin}/api/v1/galleries`, {
          method: "GET",
          credentials: "include"
        })
        setGalleries(await res.json())
      } catch (error) {
        Router.push("/login")
      }
    }
    fetchData()
  }, [])

  return (
    <div className="row">
      <div className="col-md-12">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>View</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {galleries.map(gallery => (
              <tr key={gallery.ID}>
                <th scope="row">{gallery.ID}</th>
                <td>{gallery.Title}</td>
                <td>
                  <Link href={`/galleries/${gallery.ID}/show`}>
                    <a>View</a>
                  </Link>
                </td>
                <td>
                  <Link href={`/galleries/${gallery.ID}/edit`}>
                    <a>Edit</a>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link href="/galleries/new">
          <a className="btn btn-primary">New Gallery</a>
        </Link>
      </div>
    </div>
  )
}

export default Galleries
