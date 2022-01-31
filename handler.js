'use strict';

const fn = require('modules/checktags.js')

module.exports.hello = async (event) => {
  console.log(event);
  let paragraph = '';
  if (event.body) {
    let body = JSON.parse(event.body)
    if (body.paragraph)
      paragraph = body.paragraph;
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: fn.checkTags(paragraph),
        input: event,
      },
      null,
      2
    ),
  };
};
