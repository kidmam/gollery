import React, { useState } from "react"
import Router from "next/router"

const Signup = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await fetch(`${window.location.origin}/api/v1/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password })
      })
      window.location.href = "/galleries"
    } catch (error) {}
  }

  return (
    <div className="row">
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Sign Up Now!</h3>
          </div>
          <div className="panel-body">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="Your full name"
                onChange={e => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="form-group">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
