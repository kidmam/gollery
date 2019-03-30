import App, { Container } from "next/app"
import Head from "next/head"
import React from "react"
import fetch from "cross-fetch"

import Layout from "../components/Layout"

class MyApp extends App {
  constructor(props) {
    super(props)
  }

  static async getInitialProps({ Component, ctx, req }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    let isLogin = false
    if (!process.browser) {
      try {
        const res = await fetch("http://localhost:3000/api/v1/isLogin", {
          method: "GET",
          headers: {
            cookie: ctx.req.headers.cookie
          }
        })
        isLogin = await res.json()
      } catch (e) {
        isLogin = false
      }
    }

    return {
      pageProps,
      isLogin
    }
  }

  render() {
    const { Component, pageProps, isLogin } = this.props

    return (
      <Container>
        <Head>
          <title>Gollery</title>
        </Head>
        <Layout isLogin={isLogin}>
          <Component {...pageProps} />
        </Layout>
      </Container>
    )
  }
}

export default MyApp
