class Tool {
  bindEvent(target, eventType, callback) {
    if (target.addEventListener) {
      target.addEventListener(eventType, callback, false)
      return {
        remove: target.removeEventListener(eventType, callback, false)
      }
    }
  }
}



export default new Tool()
