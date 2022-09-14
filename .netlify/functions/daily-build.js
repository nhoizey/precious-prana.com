require('dotenv').config();
const fetch = require('node-fetch');
const { schedule } = require('@netlify/functions');

// https://crontab.guru/#0_5_*_*_*
const handler = schedule('0 5 * * *', async () => {
  await fetch(process.env.BUILD_HOOK, {
    method: 'POST'
  }).then(response => {
    console.log('Build hook response:', response);
  })

  return {
    statusCode: 200,
    body: 'Build triggered'
  };
});

module.exports.handler = handler;