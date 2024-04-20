const eleventyFetch = require("@11ty/eleventy-fetch");

async function fetchWeatherForecasts(states) {

	let requestParams = {
		area: states,
		type: "public"
	}

	let weather = {data: []};

    try {	
        const response = await fetchRequest("zones", requestParams);
        let data = response.features;

        let weatherZones = [];
        data.forEach((zone) => {
			let featureData = {
				id: zone.properties.id,
				name: zone.properties.name,
				state: zone.properties.state,
			}
             weatherZones.push(featureData);
         });

		for(i = 0; i<weatherZones.length; i++) {
			const zone = weatherZones[i]
			const forecastApi = `zones/${requestParams.type}/${zone.id}/forecast`;
			try {
				const response = await fetchRequest(forecastApi, null);
				weatherZones[i] = {
					...zone,
					forecast: response.properties
				};
			} catch (error) {
				console.error(`Error fetching forecast data for zone: ${zone.id}`)
			}
		};
		weather.data.push(...weatherZones)
	} catch (error) {
		console.error(`Error fetching data`, error)
	}
	return weather;
}


// Re-using generic fetch request function I created in the last assignment
async function fetchRequest(api, parameters) {
	const cacheDuration = '1d';
	const weatherBaseUrl = "https://api.weather.gov/"
    let baseUrl = weatherBaseUrl + api;
    let params = new URLSearchParams(parameters);
    let queryString = params.toString();
    let requestUrl = `${baseUrl}?${queryString}`;


    response = await eleventyFetch(requestUrl, {
        duration: cacheDuration,
        type: "json",
        fetchOptions: {
            headers: {
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        },
		directory: ".eleventy-cache",
    })

    return response;
}
