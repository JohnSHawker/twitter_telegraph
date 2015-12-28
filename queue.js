function Queue(){
  this.items = []
}
Queue.prototype.add = function(item){
  this.items.push(item)
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
