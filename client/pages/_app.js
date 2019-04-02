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

    return {
      pageProps
    }
  }

  state = {
    isLogin: false
  }

  async componentDidMount() {
    try {
      const res = await fetch(`${window.location.origin}/api/v1/isLogin`, {
        method: "GET",
        credentials: "include"
      })
      const isLogin = await res.json()
      this.setState({ isLogin })
    } catch (e) {
      this.setState({ isLogin: false })
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Head>
          <title>Gollery</title>
        </Head>
        <Layout isLogin={this.state.isLogin}>
          <Component {...pageProps} />
        </Layout>
      </Container>
    )
  }
}

export default MyApp
