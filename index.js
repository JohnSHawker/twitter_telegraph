var Queue = require ('./queue')
var Worker = require ('./worker')
// var Twitter = require('twitter')
var Promise = require('bluebird')
var morse = require('morse-node').create("ITU")
var morseTone = require('./morse-tone')

var queue = new Queue(["i"])
var worker = new Worker(queue, processTweet)
// var client = new Twitter({
//   consumer_key: process.env.AUTOWHISTLER_CONSUMER_KEY,
//   consumer_secret: process.env.AUTOWHISTLER_CONSUMER_SECRET,
//   access_token_key: process.env.AUTOWHISTLER_ACCESS_TOKEN_KEY,
//   access_token_secret: process.env.AUTOWHISTLER_ACCESS_TOKEN_SECRET,
// });

// client.stream('statuses/filter', {track: 'Autowhistler'}, function(stream) {
//   stream.on('data', function(tweet) {
//   console.log("Recieved tweet!")
//     console.log(tweet.text);
//     queue.add(tweet.text);
//   });
//
//   stream.on('error', function(error) {
//     throw error;
//   });
// });

/////////////////////////////////////////////
/// worker /////
/////////////////////////////////

// queue.add("asdf")
// queue.add("jkl;")
// queue.add("qwerty")
// function processitem(item){
//   return new Promise(function(resolve, reject){
//     setTimeout(function(){
//       console.log("processing.",item,morse.encode(item))
//       resolve(item)
//     },1000)
//   })
// }
function processTweet(item){
  console.log("processTweet ")
  return new Promise(function(resolve, reject){
    var encoded = morse.encode(item).split("")
    var morseQueue = new Queue(encoded)
    var morseWorker = new Worker(morseQueue, processMorseCharacter)
    morseWorker.on("done",function(){
      resolve()
    })
  })
}
function processMorseCharacter(char){
  console.log("processing char", char)
  if (char === "/") return morseTone.wordBreak()
  if (char === " ") return morseTone.letterBreak()
  if (char === ".") return morseTone.dit()
  if (char === "-") return morseTone.dah()
  throw new error("can't read this!")
}
