const eleventyFetch = require("@11ty/eleventy-fetch");

// Re-using generic fetch request function I created in the last assignment
const fetchRequest = async (api, parameters, cache) => {
  const cacheDuration = "1d";
  const weatherBaseUrl = "https://api.weather.gov/";
  let baseUrl = weatherBaseUrl + api;
  let params = new URLSearchParams(parameters);
  let queryString = params.toString();
  let requestUrl = `${baseUrl}?${queryString}`;
  if (cache === false) {
    response = await fetch(requestUrl, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  }
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
};

module.exports = fetchRequest;
