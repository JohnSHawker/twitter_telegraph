var events = require('events');

function Queue(items){
  this.items = items || []
}
Queue.prototype = new events.EventEmitter();
Queue.prototype.add = function(item){
  this.items.push(item)
  this.emit("item added")
  return this
}
Queue.prototype.consume = function(){
  if (this.isEmpty()) throw new Error("Queue is empty.")
  return this.items.shift()
}
Queue.prototype.isEmpty = function(){
  return this.items.length == 0
}
module.exports = Queue
