import * as React from "react"
import Layout from '../components/layout/layout'
import { graphql } from 'gatsby';
import WeatherTile from "../components/weather-tile/weather-tile";

const WeatherPage = ({pageContext, data}) => {
  const weather = data.allWeatherZone.nodes[0];
  const weeklyForecast = [];

  for(let i=0; i<7; i++) {
    weeklyForecast.push(weather.forecast.periods[i])
  }

  return (
    <Layout>
      <h2 style={{color: 'white', marginLeft: '1.25vw'}}>{weather.name}</h2>
      <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        { 
          weeklyForecast.map((day) => {
            return (
                <WeatherTile dailyForecast={day}></WeatherTile>
            )
          })
        }
      </div>
      <div style={{color: 'white', marginLeft: '1.25vw'}}>
        <h3>Detailed Summary</h3>
        {
          weeklyForecast.map((day) => {
            return(<p style={{margin: '0'}}><span style={{fontWeight: '700'}}>{day.name}: </span> {day.detailedForecast}</p>)
          })
        }
      </div>
    </Layout>
  )
}

export const query = graphql`
query ($name: String){
  allWeatherZone(filter: {name: {eq: $name}}) {
    nodes {
      name
      state
      zoneId
      forecast {
        updated
        periods {
          detailedForecast
          name
          number
        }
      }
    }
  }
}
`

export default WeatherPage
