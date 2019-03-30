const express = require("express")
const next = require("next")
const fetch = require("cross-fetch")

const config = require("./config/config")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  // APIs
  server.get(`/api/v1/isLogin`, async (req, res) => {
    try {
      const r = await fetch(`${config.services.backend.url}/api/v1/isLogin`, {
        method: "GET",
        credentials: "include",
        headers: {
          cookie: req.headers.cookie
        }
      })
      const isLogin = await r.json()
      res.json(isLogin)
    } catch (e) {
      res.json(false)
    }
  })

  server.get("/galleries/:id/edit", (req, res) => {
    return app.render(req, res, "/galleries/edit", req.params)
  })

  server.get("/galleries/:id/show", (req, res) => {
    return app.render(req, res, "/galleries/show", req.params)
  })

  server.get("/galleries/:id/show", (req, res) => {
    return app.render(req, res, "/galleries/show", req.params)
  })

  server.get("*", (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
