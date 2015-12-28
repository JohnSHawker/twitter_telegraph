function Worker(queue,processingFunc){
  this.queue = queue
  this.processingFunc = processingFunc
  this.isRunning = false
  queue.on("item added", function(event) {
    if(!this.isRunning){
      this.processNext()
    }
  }.bind(this))
}
Worker.prototype.processNext = function(){
  console.log(this.queue,"queue")
  if (this.queue.isEmpty()){
    this.isRunning = false
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
