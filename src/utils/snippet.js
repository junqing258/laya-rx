
const pipeAsyncFunctions = (...fns) => arg => fns.reduce((p, f) => p.then(f), Promise.resolve(arg));

const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());

const chainAsync = fns => {
    let curr = 0;
    const last = fns[fns.length - 1];
    const next = () => {
        const fn = fns[curr++];
        fn === last ? fn() : fn(next);
    };
    return next;
};

const promisify = func => (...args) =>
    new Promise((resolve, reject) =>
        func(...args, (err, result) => (err ? reject(err) : resolve(result)))
    );


const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));

const curry = (fn, arity = fn.length, ...args) =>
    arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);




const debounce = (fn, ms = 0) => {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

const throttle = (fn, wait) => {
    let inThrottle, lastFn, lastTime;
    return function() {
        const context = this,
            args = arguments;
        if (!inThrottle) {
            fn.apply(context, args);
            lastTime = Date.now();
            inThrottle = true;
        } else {
            clearTimeout(lastFn);
            lastFn = setTimeout(function() {
                if (Date.now() - lastTime >= wait) {
                    fn.apply(context, args);
                    lastTime = Date.now();
                }
            }, Math.max(wait - (Date.now() - lastTime), 0));
        }
    };
};




const difference = (a, b) => {
    const s = new Set(b);
    return a.filter(x => !s.has(x));
};


