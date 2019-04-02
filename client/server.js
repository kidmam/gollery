const express = require("express")
const next = require("next")
const proxy = require("http-proxy-middleware")

const config = require("./config/config")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== "production"
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(proxy("/api/v1", { target: config.services.backend.url }))
  server.use(proxy("/images", { target: config.services.backend.url }))

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
