'use strict';

const fn = require('modules/checktags.js')

module.exports.hello = async (event) => {
  console.log(event);
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: fn.checkTags(event),
        input: event,
      },
      null,
      2
    ),
  };
};
