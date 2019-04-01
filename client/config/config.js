const _ = require("lodash")

const env = process.env.NODE_ENV || "development"

const shared = {}

const development = {
  environment: "development",
  port: 3000,
  services: {
    backend: {
      url: "http://localhost:8080"
    }
  }
}

const developmentDocker = {
  environment: "developmentDocker",
  port: 3000,
  services: {
    backend: {
      url: "http://backend:8080"
    }
  }
}

const production = {
  environment: "production",
  port: 3000,
  services: {
    backend: {
      url: "http://backend:8080"
    }
  }
}

const config = {
  development,
  developmentDocker,
  production
}

module.exports = _.merge({}, shared, config[env])
