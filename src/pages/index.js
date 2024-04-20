import * as React from "react"
import Layout from '../components/layout/layout'
import WeatherZones from "../components/weatherZones/weatherZones"


const IndexPage = () => {
  return (
    <Layout>
      <WeatherZones></WeatherZones>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
