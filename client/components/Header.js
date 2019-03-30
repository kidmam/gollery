import React from "react"
import Router from "next/router"

const Header = ({ isLogin }) => {
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await fetch("http://localhost:8080/api/v1/logout", {
        method: "POST",
        credentials: "include"
      })
      window.location.href = "/"
    } catch (error) {}
  }

  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <a className="navbar-brand" href="/">
            Gollery.com
          </a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/galleries">Galleries</a>
            </li>
          </ul>
          {isLogin && (
            <ul className="nav navbar-nav navbar-right">
              <div className="navbar-form navbar-left">
                <button
                  type="submit"
                  className="btn btn-default"
                  onClick={handleSubmit}
                >
                  Log out
                </button>
              </div>
            </ul>
          )}
          {!isLogin && (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="/login">Log In</a>
              </li>
              <li>
                <a href="/signup">Sign Up</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
