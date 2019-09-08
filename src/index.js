class DeepCloner {
  constructor() {
    this.cache = [];
  }

  clone(target) {
    if (target instanceof Object) {
      let dist
      if (this.getCachedDist(target)) {
        return this.getCachedDist(target);
      } else if (target instanceof Function) {
        dist = function() {
          return target.apply(this, arguments)
        };
      } else if (target instanceof RegExp) {
        dist = new RegExp(target.source, target.flags)
      } else if (target instanceof Date) {
        dist = new Date(target.getTime())
      } else if (target instanceof Array) {
        dist = new Array()
      } else {
        dist = {}
      }
      this.cache.push([target, dist]);
      for (let key in target) {
        if (target.hasOwnProperty(key)) {
          dist[key] = this.clone(target[key]);
        }
      }
      return dist;
    }
    return target;
  }

  getCachedDist(target) {
    const cachedArray = this.cache.find(array => {
      return array[0] === target;
    });
    return cachedArray && cachedArray[1];
  }
}

module.exports = DeepCloner;
