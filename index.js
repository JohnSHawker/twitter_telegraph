console.log("Hello World!");
var Queue = require ('./queue')
var Twitter = require('twitter')
var client = new Twitter({
  consumer_key: process.env.AUTOWHISTLER_CONSUMER_KEY,
  consumer_secret: process.env.AUTOWHISTLER_CONSUMER_SECRET,
  access_token_key: process.env.AUTOWHISTLER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.AUTOWHISTLER_ACCESS_TOKEN_SECRET,
});
var params = {screen_name: 'Autowhistler'};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets);
  }
});
client.stream('statuses/filter', {track: 'Autowhistler'}, function(stream) {
  stream.on('data', function(tweet) {
  console.log("Recieved tweet!")
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    throw error;
  });
});
var queue = new Queue()
queue.add("asdf")
queue.add("jkl;").add("qwerty")
console.log(queue.items)
console.log(queue.consume())
console.log(queue.items)
