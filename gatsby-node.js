require("dotenv").config();
const eleventyFetch = require("@11ty/eleventy-fetch");
const fetchRequest = require("./fetchRequest");

// starter code to create graphql objects from an array of JSON assets

exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions;

  // YOUR CODE HERE TO FETCH YOUR DATA, SAY FROM A REST API
  // SAY YOU GET BACK A JSON RESPONSE CONTAINING AN ARRAY OF ASSETS
  // PSUEUO-CODE
  // let movieList = await fetch('movieurl');
  // let movieJson = await movieList.json();

  let weather = await fetchWeatherForecasts("CT,ME,MA,NH,RI,VT");

  // loop through data and create Gatsby nodes
  weather.data.forEach((zone) =>
    createNode({
      ...zone,
      id: createNodeId(`${zone.zoneId}`), //[ pass a unique identifier here: [movie.id] for example
      parent: null,
      children: [],
      internal: {
        type: "WeatherZone", // name of collection in graphql schema
        contentDigest: createContentDigest(zone),
      },
    })
  );
};

async function fetchWeatherForecasts(states) {
  let requestParams = {
    area: states,
    type: "public",
  };

  let weather = { data: [] };

  try {
    const response = await fetchRequest("zones", requestParams);
    let data = response.features;

    let weatherZones = [];
    data.forEach((zone) => {
      let featureData = {
        zoneId: zone.properties.id,
        name: zone.properties.name,
        state: zone.properties.state,
      };
      weatherZones.push(featureData);
    });

    for (i = 0; i < weatherZones.length; i++) {
      const zone = weatherZones[i];
      const forecastApi = `zones/${requestParams.type}/${zone.zoneId}/forecast`;
      try {
        const response = await fetchRequest(forecastApi, null);
        weatherZones[i] = {
          ...zone,
          forecast: response.properties,
        };
      } catch (error) {
        console.error(`Error fetching forecast data for zone: ${zone.zoneId}`);
      }
    }
    weather.data.push(...weatherZones);
  } catch (error) {
    console.error(`Error fetching data`, error);
  }
  return weather;
}

// Re-using generic fetch request function I created in the last assignment
/* async function fetchRequest(api, parameters) {
  const cacheDuration = "1d";
  const weatherBaseUrl = "https://api.weather.gov/";
  let baseUrl = weatherBaseUrl + api;
  let params = new URLSearchParams(parameters);
  let queryString = params.toString();
  let requestUrl = `${baseUrl}?${queryString}`;

  response = await eleventyFetch(requestUrl, {
    duration: cacheDuration,
    type: "json",
    fetchOptions: {
      headers: {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    },
    directory: ".eleventy-cache",
  });

  return response;
} */
