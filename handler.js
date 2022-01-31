// AWS Lambda function
'use strict';

const fn = require('modules/checktags.js')

module.exports.hello = async (event) => {
  let paragraph = '';

  try {
    if (event.body) {
      let body = JSON.parse(event.body)
      if (body.paragraph)
        paragraph = body.paragraph;
    }
  } catch (error) {
    console.error(error);
  }

  // Check that we have some truthy value...
  if (paragraph) {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: fn.checkTags(paragraph)
        },
        null,
        2
      ),
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: "Empty request passed, please send a POST request with {'paragraph': 'your text here'} body"
        },
        null,
        2
      ),
    };
  }
};
