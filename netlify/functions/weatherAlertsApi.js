const fetchRequest = require("../../fetchRequest");

const handler = async function (event, context) {
  const { zoneId } = event.queryStringParameters;
  console.log(`HANDLER`);
  try {
    let apiUrl = `alerts/active/zone/${zoneId}`;
    const response = await fetchRequest(apiUrl, null);
    console.log(response);

    return {
      statusCode: 200,
      body: data,
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
