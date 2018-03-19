export default class Step {

  constructor () {
    this.actived = false;
    this.queue = [];
  }

  push (method, ...args) {
    let key;
    if (typeof method === 'string') {
      key = args[0], method = args[1];
    }
    if (typeof args[args.length - 1] !== 'function') {
      args.push(function () {});
    }

    var callback = args[args.length - 1];

    this.queue.push({
      'key': key || (this.queue.length - 1),
      'method': method,
      'args': args
    });

    this.next();
    return this;
  }

  next (key) {
    if (!this.queue.length) return this.actived = false;
    if (this.actived) return;
    this.actived = true;

    let item;
    if (!key) {
      item = this.queue.shift();
    } else {
      item = this.queue.find(v => v.key === key);
    }
    const {method, args} = item;
    let callback = args[args.length - 1];

    args[args.length - 1] = (...rest) => {
      callback(...rest);
      this._next();
    };
    method(...args);
  }

  _next () {
    this.actived = false;
    this.next();
  }

  goto (key) {
    return this.next(key);
  }

}
