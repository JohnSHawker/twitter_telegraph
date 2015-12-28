var events = require('events');

function Worker(queue,processingFunc){
  this.queue = queue
  this.processingFunc = processingFunc
  this.isRunning = false
  queue.on("item added", function(event) {
    if(!this.isRunning){
      this.processNext()
    }
  }.bind(this))
  this.processNext()
}
Worker.prototype = new events.EventEmitter();
Worker.prototype.processNext = function(){
  if (this.queue.isEmpty()){
    this.isRunning = false
        this.emit("done")
    return
  } else {
    this.isRunning = true
        var item = this.queue.consume()
    return this.processingFunc(item)
    .then(function(){
      this.processNext()
    }.bind(this))
  }
}
module.exports = Worker
