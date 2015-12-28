function Worker(queue){
  this.queue = queue
  queue.on("item added", function(event) {
    console.log("added",this.queue.items)
  }.bind(this))
}
module.exports = Worker
