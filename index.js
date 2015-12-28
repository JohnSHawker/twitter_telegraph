console.log("Hello World!");
var Twitter = require('twitter')
var client = new Twitter({
  consumer_key: process.env.AUTOWHISTLER_CONSUMER_KEY,
  consumer_secret: process.env.AUTOWHISTLER_CONSUMER_SECRET,
  access_token_key: process.env.AUTOWHISTLER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.AUTOWHISTLER_ACCESS_TOKEN_SECRET,
});
console.log(process.env.AUTOWHISTLER_ACCESS_TOKEN_SECRET);
