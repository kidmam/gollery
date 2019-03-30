import React from "react"

import Header from "./Header"
import Footer from "./Footer"

const Layout = ({ children, isLogin }) => (
  <div>
    <Header isLogin={isLogin} />
    <div className="container-fluid">
      {children}
      <Footer />
      <style jsx global>{`
        .thumbnail {
          width: 100%;
          margin-bottom: 6px;
        }
        .btn-delete {
          margin-bottom: 6px;
        }
        footer {
          padding-top: 60px;
        }
      `}</style>
    </div>
  </div>
)

export default Layout
