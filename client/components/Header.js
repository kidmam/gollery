import React from "react"
import Link from "next/link"

const Header = ({ isLogin }) => {
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await fetch(`${window.location.origin}/api/v1/logout`, {
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
          <Link href="/">
            <a className="navbar-brand">Gollery</a>
          </Link>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
            <li>
              <Link href="/galleries">
                <a>Galleries</a>
              </Link>
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
                <Link href="/login">
                  <a>Log In</a>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <a>Sign Up</a>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
