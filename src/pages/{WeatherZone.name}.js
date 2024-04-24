import * as React from "react";
import { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { graphql } from "gatsby";
import WeatherTile from "../components/weather-tile/weather-tile";

const WeatherPage = ({ data }) => {
  const weather = data.allWeatherZone.nodes[0];

  // weekly forecast
  const weeklyForecast = [];
  for (let i = 0; i < 7; i++) {
    weeklyForecast.push(weather.forecast.periods[i]);
  }

  // weather alerts
  const [weatherAlert] = useState({});
  let alertText = {};
  useEffect(() => {
    console.log(`USE EFFECT`);
    fetch(
      `./../../.netlify/functions/weatherAlertsApi?zoneId=${weather.zoneId}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        console.log(JSON.stringify(response));
        return response.json();
      })
      .then((json) => {
        console.log(json.data);
        if (json?.data?.isActive) {
          alertText = json.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [weatherAlert.updated]);

  return (
    <Layout>
      <h2 style={{ color: "white", marginLeft: "1.25vw" }}>{weather.name}</h2>
      <div>
        {alertText?.alert}
        <br></br>
        {alertText?.description}
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {weeklyForecast.map((day) => {
          return <WeatherTile dailyForecast={day} key={day.name}></WeatherTile>;
        })}
      </div>
      <div style={{ color: "white", marginLeft: "1.25vw" }}>
        <h3>Detailed Summary</h3>
        {weeklyForecast.map((day) => {
          return (
            <p style={{ margin: "0" }} key={day.name}>
              <span style={{ fontWeight: "700" }}>{day.name}: </span>{" "}
              {day.detailedForecast}
            </p>
          );
        })}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query ($name: String) {
    allWeatherZone(filter: { name: { eq: $name } }) {
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
`;

export default WeatherPage;
