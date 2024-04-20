import * as React from "react"
import Layout from '../components/layout/layout'
import { graphql, useStaticQuery } from 'gatsby';
import WeatherTile from "../components/weather-tile/weather-tile";

const AboutPage = () => {

  return (
    <Layout>
      <br/>
      <br/>
      <div>
      Created using the 
        <a href="https://www.weather.gov/documentation/services-web-api"> National Weather Service API</a>
      </div>
    
    </Layout>
  )
}

export default AboutPage
