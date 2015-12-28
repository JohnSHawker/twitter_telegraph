var pico = require("node-pico")
var Promise = require("bluebird")
var ditLength = 1000
var dahLength = ditLength * 3
var wordLength = ditLength * 7

function sinetone(freq1, freq2, milliseconds) {
  var phase1 = 0;
  var phase2 = 0;
  var phaseIncr1 = (freq1 || 440) / pico.sampleRate;
  var phaseIncr2 = (freq2 || 442) / pico.sampleRate;
  var elapsed = 0
  var perSampleElapsed = 1000 / pico.sampleRate;
  return function(e) {
    var out = e.buffers;
    for (var i = 0; i < e.bufferSize; i++) {
      // out[0][i] = (Math.floor(Math.sin(2 * Math.PI * phase1)) + .5) / 2
      out[0][i] = (elapsed < milliseconds) ? Math.sin(2 * Math.PI * phase1) * 0.25 : 0
      // out[1][i] = (elapsed < milliseconds) ? Math.sin(2 * Math.PI * phase2) * 0.25 : 0
      phase1 += phaseIncr1;
      phase2 += phaseIncr2;
      elapsed += perSampleElapsed
    }
  };
}
function rest(milliseconds){
  return new Promise(function(resolve,reject){
    var time = Date.now()
    console.log("rest start")
    return setTimeout(function(){
      console.log("finished", Date.now() - time)
      resolve()
    }, milliseconds)
  })
}
function playTone(freq,milliseconds, name){
  return new Promise(function(resolve, reject){
    var time = Date.now()
    console.log("playing", name)
    pico.play(sinetone(freq,freq, milliseconds))
    return setTimeout(function(){
      console.log("pausing", name)
    console.log('real elapsed' ,Date.now() - time)
      pico.pause()
      resolve()
    },milliseconds)
  })
}
function dah(){
  return playTone(440,dahLength, "dah")
  .then(rest(ditLength))

}
function dit(){
  return playTone(440,ditLength, "dit")
  .then(rest(ditLength))

}
function letterBreak(){
  return rest(dahLength - ditLength)

}
function wordBreak(){
  return rest(wordLength - ditLength)

}
function tweetBreak(){
  return rest((2 * wordLength) - ditLength)

}
module.exports = {
  dah: dah,
  dit: dit,
  letterBreak: letterBreak,
  wordBreak: wordBreak,
  tweetBreak: tweetBreak,
}
