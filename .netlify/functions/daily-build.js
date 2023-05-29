require('dotenv').config();
const fetch = require('node-fetch');
const { schedule } = require('@netlify/functions');

const handler = async (event, context) => {
  await fetch(process.env.BUILD_HOOK, {
    method: 'POST'
  }).then(response => {
    console.log('Build hook response:', response);
  })

  return {
    statusCode: 200,
    body: 'Build triggered'
  };
};

// https://crontab.guru/#0_5_*_*_*
exports.handler = schedule('0 5 * * *', handler);