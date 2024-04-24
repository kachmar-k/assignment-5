import { fetchRequest } from "../../gatsby-node";
const fetch = require("node-fetch");

const handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Hello World!",
    }),
  };
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
        apiUrl,
        message: JSON.stringify(error.message),
      },
    });
  }
};

module.exports = { handler };
