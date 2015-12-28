var Queue = require ('./queue')
var Worker = require ('./worker')
var Twitter = require('twitter')
var Promise = require('bluebird')
var morse = require('morse-node').create("ITU")

var queue = new Queue(["stuff","bob"])
var worker = new Worker(queue,processitem)
var client = new Twitter({
  consumer_key: process.env.AUTOWHISTLER_CONSUMER_KEY,
  consumer_secret: process.env.AUTOWHISTLER_CONSUMER_SECRET,
  access_token_key: process.env.AUTOWHISTLER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.AUTOWHISTLER_ACCESS_TOKEN_SECRET,
});

client.stream('statuses/filter', {track: 'Autowhistler'}, function(stream) {
  stream.on('data', function(tweet) {
  console.log("Recieved tweet!")
    console.log(tweet.text);
    queue.add(tweet.text);
  });

  stream.on('error', function(error) {
    throw error;
  });
});

/////////////////////////////////////////////
/// worker /////
/////////////////////////////////

queue.add("asdf")
queue.add("jkl;")
queue.add("qwerty")
function processitem(item){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      console.log("processing.",item,morse.encode(item))
      resolve(item)
    },1000)
  })
}
