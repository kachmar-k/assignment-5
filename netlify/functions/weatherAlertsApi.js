const fetchRequest = require("../../fetchRequest");

const handler = async function (event, context) {
  const { zoneId } = event.queryStringParameters;
  console.log(`HANDLER`);
  try {
    let apiUrl = `alerts/active/zone/${zoneId}`;
    const response = await fetchRequest(apiUrl, null, false);
    let alertData = response.features[0];
    console.log(JSON.stringify(alertData));
    return {
      statusCode: 200,
      body: {
        title: alertData.title,
        updated: alertData.updated,
        alert: alertData.properties?.headline,
        description: alertData.properties?.description,
      },
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
