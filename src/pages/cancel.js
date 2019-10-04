import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const CancelPage = () => (
  <Layout>
    <h1>Order Canceled</h1>

    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default CancelPage
