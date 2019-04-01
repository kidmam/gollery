import React, { useState } from "react"
import Router from "next/router"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await fetch(`${window.location.origin}/api/v1/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password })
      })
      window.location.href = "/galleries"
    } catch (error) {}
  }

  return (
    <div className="row">
      <div className="col-md-6 col-md-offset-3">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Welcome Back!</h3>
          </div>
          <div className="panel-body">
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
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
