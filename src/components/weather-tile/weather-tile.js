import * as React from 'react'
import { tile } from './weather-tile.module.css'
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image"



const WeatherTile = (props) => {
    const dailyForecast = props.dailyForecast;
    const weatherOptions = useStaticQuery(graphql`
    query {
        allWeatherOptionsJson {
            nodes {
              forecast
              image {
                src {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
      }`).allWeatherOptionsJson.nodes;

    function getWeather() {
        if(dailyForecast) {
            let forecast = dailyForecast.detailedForecast.toLowerCase();
            let displayForecast = {index: -1, weather: undefined};
            weatherOptions.forEach(x => {
                const currentIndex = forecast.indexOf(x.forecast);
                if(currentIndex !== -1) {
                    if(displayForecast.index === -1) {
                        displayForecast.index = currentIndex;
                        displayForecast.weather = x;
                    } else if(displayForecast.index > currentIndex){
                        displayForecast.index = currentIndex;
                        displayForecast.weather = x;
                    }
                }
            });
            console.log(displayForecast)
            return displayForecast.weather
        }
    }


    const weatherInfo = getWeather();

    return(
        <div className={tile}>
            <h2 className={weatherInfo}>{dailyForecast.name}</h2>
            <GatsbyImage image={getImage(weatherInfo.image?.src?.childImageSharp)} alt="forecast"></GatsbyImage>
            <p>{getWeather().forecast}</p>
            <br/>
        </div>
    );
}



export default WeatherTile

