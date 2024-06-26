const fetchRequest = require("../../fetchRequest");

const handler = async function (event, context) {
  const { zoneId } = event.queryStringParameters;
  try {
    let apiUrl = `alerts/active/zone/${zoneId}`;
    const response = await fetchRequest(apiUrl, null, false);
    let alertData = response.features[0];
    let responseBody;
    if (alertData) {
      responseBody = {
        isActive: true,
        title: alertData.title,
        updated: alertData.updated,
        alert: alertData.properties?.headline,
        description: alertData.properties?.description,
      };
    } else {
      responseBody = {
        isActive: false,
        title: "No advisories at this time",
        updated: Date.now().toLocaleString(),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(responseBody),
    };
  } catch (error) {
    console.error(`Error with request.`, {
      statusCode: 500,
      body: {
        message: JSON.stringify(error.message),
      },
    });
  }
};

module.exports = { handler };
