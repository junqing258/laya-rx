(function(e) {
	var f = e.webkitAudioContext,
		d = function(a) {
			if (!a) {
				return
			}
			if (!a.setTargetAtTime) {
				a.setTargetAtTime = a.setTargetValueAtTime
			}
		};
	if (!e.AudioContext && f) {
		window.AudioContext = f;
		if (!f.prototype.createGain) {
			AudioContext.prototype._createGain = f.prototype.createGainNode;
			AudioContext.prototype.createGain = function() {
				var a = this._createGain();
				d(a.gain);
				return a
			}
		}
		if (!f.prototype.createDelay) {
			AudioContext.prototype._createDelay = f.prototype.createDelayNode;
			AudioContext.prototype.createDelay = function() {
				var a = this._createDelay();
				d(a.delayTime);
				return a
			}
		}
		AudioContext.prototype.createScriptProcessor = f.prototype.createScriptProcessor || f.prototype.createJavascriptNode;
		AudioContext.prototype._createOscillator = f.prototype.createOscillator;
		AudioContext.prototype.createOscillator = function() {
			var a = this._createOscillator();
			if (!a.start) {
				a.start = a.noteOn
			}
			if (!a.stop) {
				a.stop = a.noteOff
			}
			return a
		};
		AudioContext.prototype._createBufferSource = f.prototype.createBufferSource;
		AudioContext.prototype.createBufferSource = function() {
			var a = this._createBufferSource();
			if (!a.start) {
				a.start = a.noteGrainOn || a.noteOn
			}
			if (!a.stop) {
				a.stop = a.noteOff
			}
			d(a.playbackRate);
			return a
		}
	}
})(window);
window.RESOLUTIONS_CONFIG = {
	mobile: {
		landscape: {
			width: 960,
			height: 540,
			pixelFactor: 1,
			portraitTopOffset: 0,
			portraitLeftOffset: 0
		},
		portrait: {
			width: 540,
			height: 960,
			pixelFactor: 540 / 960,
			portraitTopOffset: 0,
			portraitLeftOffset: 100
		}
	},
	mobileLow: {
		landscape: {
			width: 960,
			height: 540,
			pixelFactor: 1,
			portraitTopOffset: 0,
			portraitLeftOffset: 0
		},
		portrait: {
			width: 540,
			height: 960,
			pixelFactor: 540 / 960,
			portraitTopOffset: 0,
			portraitLeftOffset: 100
		}
	},
	tablet: {
		"default": {
			width: 960,
			height: 540,
			pixelFactor: 1
		}
	},
	tabletLow: {
		"default": {
			width: 960,
			height: 540,
			pixelFactor: 1
		}
	},
	desktop: {
		"default": {
			width: 1280,
			height: 720,
			pixelFactor: 1.33
		}
	},
	"default": {
		"default": {
			width: 1280,
			height: 720,
			pixelFactor: 1.33
		}
	}
};
window.VIRTUAL_RESOLUTIONS_CONFIG = {
	"default": {
		landscape: {
			width: 1280,
			height: 720
		},
		portrait: {
			width: 720,
			height: 1280
		}
	},
	tablet: {
		"default": {
			width: 1280,
			height: 720
		}
	},
	tabletLow: {
		"default": {
			width: 1280,
			height: 720
		}
	}
};
window.Sys = {};
(function() {
	var m = navigator.userAgent,
		i, o, j, p, l, k, n;
	Sys.openBetMode = false;
	if (/callbackurl/i.test(window.location.search) && (/integration=openbet/i.test(window.location.search) || /openbet\.user_id/i.test(window.location.search))) {
		Sys.openBetMode = true
	}
	Sys.openBetPlayForFunMode = false;
	if (/integration=openbet/i.test(window.location.search) && !Sys.openBetMode) {
		Sys.openBetPlayForFunMode = true
	}
	Sys.isGcmEnabled = false;
	if (/openbet.gcmMode=true/i.test(window.location.search)) {
		Sys.isGcmEnabled = true
	}
	Sys.isiPad = false;
	Sys.isiPhone = false;
	Sys.isiPhoneIOS7 = false;
	Sys.isiPhoneIOS8 = false;
	Sys.isiPhoneIOS9 = false;
	Sys.isiPod = false;
	Sys.isAndroidDevice = false;
	Sys.isSamsungS = false;
	Sys.isOneX = false;
	Sys.isHTCOne = false;
	Sys.isAndroid23Device = false;
	Sys.isAndroid400 = false;
	Sys.isAndroid410 = false;
	Sys.isAndroidTablet = false;
	Sys.isAndroid3Tablet = false;
	Sys.isDesktop = false;
	Sys.has3DTransforms = false;
	Sys.isChrome = false;
	Sys.isChrome280 = false;
	Sys.isSafari = false;
	Sys.isChromeForIOS = false;
	(function() {
		var b = document,
			a = b.createElement("div"),
			c = false,
			d;
		if (a.style.webkitPerspective !== undefined) {
			d = b.createElement("style");
			d.textContent = "@media (-webkit-transform-3d){#test3d{height:3px}}";
			b.getElementsByTagName("head")[0].appendChild(d);
			a.id = "test3d";
			if (b.body) {
				b.body.appendChild(a);
				c = a.offsetHeight === 3;
				d.parentNode.removeChild(d);
				a.parentNode.removeChild(a)
			}
		}
		Sys.has3DTransforms = c
	}());
	if (m.match(/Chrome/i)) {
		Sys.isChrome = true;
		if (m.match(/Chrome\/28[\.\d]/i)) {
			Sys.isChrome280 = true
		}
	}
	if (m.match(/CriOS/i)) {
		Sys.isChromeForIOS = true
	}
	if (m.match(/Safari/i) && !Sys.isChromeForIOS) {
		Sys.isSafari = true
	}
	if (m.match(/iPad/i) !== null) {
		Sys.isiPad = true
	} else {
		if ((m.match(/iPod/i))) {
			Sys.isiPod = true
		} else {
			if ((m.match(/iPhone/i))) {
				i = "3gs,4,4s";
				o = "standard";
				i = (window.screen.height === 568) ? "5" : i;
				i = (window.screen.height === 667) ? "6" : i;
				o = window.matchMedia("(-webkit-min-device-pixel-ratio: 3)").matches && i === "6" ? "zoomed" : o;
				i = window.matchMedia("(-webkit-min-device-pixel-ratio: 3)").matches ? "6+" : i;
				Sys.isiPhone = {
					series: "iPhone",
					model: i,
					displayZoom: o
				}
			} else {
				if ((m.match(/Android/i)) || m.match(/HTC_Sensation/i)) {
					Sys.isAndroidDevice = true;
					if (m.match(/Android 3[\.\d]+/i)) {
						Sys.isAndroid3Tablet = true;
						Sys.isAndroidTablet = true
					} else {
						if (!m.match(/mobile/i)) {
							Sys.isAndroidTablet = true
						} else {
							if (m.match(/Android 2\.3/i)) {
								Sys.isAndroid23Device = true
							} else {
								if (m.match(/Android 4\.0/i)) {
									Sys.isAndroid400 = true
								} else {
									if (m.match(/Android 4\.1/i)) {
										Sys.isAndroid410 = true
									} else {
										if (m.match(/Android 4\.2/i)) {
											Sys.isAndroid420 = true
										} else {
											if (m.match(/Android 4\.3/i)) {
												Sys.isAndroid430 = true
											}
										}
									}
								}
							}
						}
					}
				} else {
					Sys.isDesktop = true
				}
			}
		}
	}
	Sys.isiPhoneIOS7 = (m.indexOf("IEMobile") < 0) && (/(?:OS\s*[7]+_0(?:_\d+)?\s*)/i.test(m) && !window.navigator.standalone) && (Sys.isiPhone || Sys.isiPod) && Sys.isSafari;
	Sys.isiPhoneIOS8 = (/OS\s*8_/i.test(m) && !window.navigator.standalone) && Sys.isiPhone && Sys.isSafari;
	Sys.isiPhoneIOS9 = (/OS\s*9_/i.test(m) && !window.navigator.standalone) && Sys.isiPhone && Sys.isSafari;
	Sys.isiOS9 = (/OS\s*9_/i.test(m));
	Sys.isIphone4Or4s = Sys.isiPhone && window.matchMedia("(-webkit-min-device-pixel-ratio: 2)").matches && window.screen.width === 320 && window.screen.height === 480;
	Sys.isIphone5Or5sOr5c = Sys.isiPhone && window.screen.width === 320 && window.screen.height === 568;
	l = document.getElementsByTagName("meta");
	k = l.length;
	for (p = 0; p < k; p++) {
		if (l[p].getAttribute("name") === "viewport") {
			j = l[p]
		}
	}
	if ((m.match(/GT-I9100/))) {
		Sys.isSamsungS = {
			series: "samsungS",
			model: "s2"
		}
	} else {
		if ((m.match(/GT-I9300/))) {
			Sys.isSamsungS = {
				series: "samsungS",
				model: "s3"
			}
		} else {
			if ((m.match(/GT-I9505/)) || (m.match(/GT-I9506/)) || (m.match(/GT-I9521/)) || (m.match(/GT-I9525/))) {
				Sys.isSamsungS = {
					series: "samsungS",
					model: "s4"
				}
			}
		}
	}
	if (j && (!Sys.isAndroidDevice || Sys.isChrome)) {
		n = "width=device-width,height = device-height, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no";
		if (Sys.isSafari) {
			n += ", minimal-ui"
		}
		j.content = n
	}
	Sys.isiOSDevice = Sys.isiPad || Sys.isiPhone || Sys.isiPod;
	Sys.isIphone3GS = (Sys.isiOSDevice && !window.matchMedia("(-webkit-min-device-pixel-ratio: 2)").matches && window.screen.width === 320 && window.screen.height === 480);
	Sys.isTouchDevice = Boolean("ontouchstart" in window);
	Sys.clickEvent = Sys.isTouchDevice ? "touchend" : "click";
	Sys.touchstartEvent = Sys.isTouchDevice ? "touchstart" : "mousedown";
	Sys.touchendEvent = Sys.isTouchDevice ? "touchend" : "mouseup";
	Sys.touchoutEvent = "mouseout";
	Sys.touchmoveEvent = Sys.isTouchDevice ? "touchmove" : "mousemove";
	Sys.isInIFrame = (window !== window.parent)
}());
Sys.apply = function(d, e) {
	var f;
	d = d || {};
	if (e === null || !Sys.isDefined(e)) {
		return d
	}
	if (d && e && Sys.isObj(e)) {
		for (f in e) {
			if (e.hasOwnProperty(f)) {
				d[f] = e[f]
			}
		}
	}
	return d
};
Sys.applyProperties = function(i, k) {
	var l = Object.keys(k),
		j = l.length,
		g, h;
	for (g = -1; ++g < j;) {
		h = l[g];
		if (Sys.isDefined(k[h])) {
			i[h] = k[h]
		}
	}
	return i
};
Sys.applyIf = function(d, e) {
	var f;
	if (d && e && Sys.isObj(e)) {
		for (f in e) {
			if (e.hasOwnProperty(f) && !d.hasOwnProperty(f)) {
				d[f] = e[f]
			}
		}
	} else {
		throw new Error("Error in Sys.applyIf")
	}
	return d
};
Sys.applyPropertiesIf = function(i, k) {
	var l = Object.keys(k),
		j = l.length,
		g, h;
	for (g = -1; ++g < j;) {
		h = l[g];
		if (!Sys.isDefined(i[h]) && Sys.isDefined(k[h])) {
			i[h] = k[h]
		}
	}
	return i
};
Sys.iterate = function(g, f, h) {
	var e;
	if (!Sys.isObj(g) || typeof f !== "function") {
		return g
	}
	for (e in g) {
		if (g.hasOwnProperty(e)) {
			f.call(h || g, e, g[e])
		}
	}
	return g
};
Sys.each = function(f, j, h) {
	var i, g;
	if (!Sys.isArray(f) || typeof j !== "function") {
		return f
	}
	for (i = 0, g = f.length; i < g; i += 1) {
		if (j.call(h || f[i], f[i], i) === false) {
			return i
		}
	}
	return f
};
Sys.contains = function(c, d) {
	return c.indexOf(d) > -1
};
Sys.variadic = function(c) {
	var d = c.length - 1;
	return function() {
		var b = [].slice.call(arguments, 0, d),
			a = [].slice.call(arguments, d);
		return c.apply(this, b.concat([a]))
	}
};
Sys.ns = function(g) {
	var f, h, e = g || "";
	f = e.split(".") || [];
	h = window;
	while (f.length > 0) {
		e = f.shift();
		if (Sys.isEmpty(h[e])) {
			h[e] = {}
		}
		h = h[e]
	}
};
Sys.pluck = function(e, f) {
	var d = [];
	Sys.each(e, function(a) {
		d.push(a[f])
	});
	return d
};
Sys.isEmpty = function(b) {
	return (b === null) || !Sys.isDefined(b) || (Sys.isArray(b) && !b.length)
};
Sys.isDefined = function(b) {
	return typeof b !== "undefined"
};
Sys.defaultValue = function(c, d) {
	return Sys.isEmpty(c) ? d : c
};
Sys.override = function(d, c) {
	if (c) {
		Sys.apply(d.prototype, c)
	}
};
Sys.overrideClass = function(e, f) {
	var h, g;
	if (Sys.isObj(f)) {
		Sys.apply(e.prototype, f);
		h = e.prototype;
		g = e.superclass;
		if (Sys.isFunc(f.constructor)) {
			e = f.constructor
		}
		e.prototype = h;
		e.superclass = g
	}
	return e
};
Sys.isArray = function(d) {
	var c = Object.prototype.toString.call(d);
	return (c === "[object Array]" || c === "[object NodeList]" || c === "[object TouchList]" || c === "[object HTMLCollection]")
};
Sys.isString = function(b) {
	return !Sys.isArray(b) && (typeof b === "string")
};
Sys.isNumber = function(b) {
	return !Sys.isArray(b) && !isNaN(b) && (typeof b === "number")
};
Sys.isObj = function(b) {
	return !Sys.isArray(b) && (typeof b === "object")
};
Sys.isFunc = function(b) {
	return (typeof b === "function")
};
Sys.isAudioBuffer = function(b) {
	return Object.prototype.toString.call(b) === "[object AudioBuffer]"
};
Sys.isInstanceOf = function(g, e) {
	var f = false;
	try {
		f = (g instanceof e)
	} catch (h) {}
	return f
};
Sys.copyObject = function(b) {
	return Sys.apply({}, b)
};
Sys.copyObj = Sys.copyObject;
Sys.clone = function(d) {
	var e = this,
		f;
	if (Sys.isArray(d)) {
		f = [];
		Sys.each(d, function(a) {
			f.push(Sys.clone(a))
		}, e)
	} else {
		if (Sys.isObj(d)) {
			f = {};
			Sys.iterate(d, function(b, a) {
				f[b] = Sys.clone(a)
			}, e)
		} else {
			f = d
		}
	}
	return f
};
Sys.extend = function(g, l, h) {
	var i = Object.prototype.constructor,
		j = l,
		k = function() {};
	if (j.constructor !== i) {
		l = j.constructor
	} else {
		l = function() {
			g.apply(this, arguments)
		}
	}
	k.prototype = g.prototype;
	l.prototype = new k();
	l.prototype.constructor = l;
	if (g.prototype.constructor === i) {
		g.prototype.constructor = g
	}
	l.superclass = g.prototype;
	Sys.override(l, j);
	return l
};
Sys.clamp = function(b) {
	if (b.value < b.min) {
		return b.min
	} else {
		if (b.value > b.max) {
			return b.max
		}
	}
	return b.value
};
Sys.range = function(j, l, k) {
	var i = [j],
		h = j > l,
		m, n;
	m = h ? -1 * Math.abs(k) || -1 : Math.abs(k) || 1;
	n = j + m;
	while (h ? n >= l : n <= l) {
		i.push(n);
		n = n + m
	}
	return i
};
Sys.reduce = function(f, h, i) {
	var j, g;
	if (!Sys.isDefined(i)) {
		i = f[0];
		f = f.slice(1)
	}
	if (f.reduce) {
		return f.reduce(h, i)
	}
	j = 0;
	g = f.length;
	for (; j < g; j++) {
		i = h(i, f[j], j, f)
	}
	return i
};
Sys.map = function(d, c) {
	if (d.map) {
		return d.map(c)
	}
	return Sys.reduce(d, function(a, f, b) {
		return a.concat(c(f, b, d))
	}, [])
};
Sys.filter = function(d, c) {
	if (d.filter) {
		return d.filter(c)
	}
	return Sys.reduce(d, function(a, f, b) {
		if (c(f, b, d)) {
			return a.concat(f)
		}
		return a
	}, [])
};
Sys.find = function(g, e) {
	var h, f;
	for (h = 0, f = g.length; h < f; h++) {
		if (e(g[h])) {
			return g[h]
		}
	}
	return undefined
};
Sys.EventHandler = function() {
	this.EVENTS = {}
};
Sys.EventHandler.prototype = {
	DEBUG: false,
	LOG_FUNC: false,
	LOG: false,
	LOG_WARN: false,
	LOG_FILTER: /(?:)/,
	history: [],
	toStringHistory: function(i) {
		var f = this,
			g = "",
			h, j = i || new RegExp();
		Sys.each(f.history, function(b) {
			try {
				h = JSON.stringify(b.params)
			} catch (a) {
				h = b.params
			}
			if (j.test(b.event)) {
				g += b.event + " (" + b.listeners + ") -> " + h + "\r\n"
			}
		});
		return g
	},
	addListener: function(f, d) {
		var e = this;
		if (!Sys.isDefined(e.EVENTS[d])) {
			e.EVENTS[d] = []
		}
		if (!Sys.contains(e.EVENTS[d], f)) {
			e.EVENTS[d].push(f)
		}
	},
	removeListener: function(g, h) {
		var e = this.EVENTS[h] || [],
			f = e.indexOf(g);
		if (f >= 0) {
			e[f] = "removed"
		}
	},
	dispatchEvent: Sys.variadic(function(l, m) {
		var n = this.EVENTS[l] || [],
			j = n.length - 1,
			i, k, h;
		for (i = j; i >= 0; i--) {
			k = n[i];
			h = (Sys.isObj(k)) ? k.handlers[l] : undefined;
			if (Sys.isDefined(h)) {
				h.apply(k, m)
			}
		}
		for (i = j; i >= 0; i--) {
			if (n[i] === "removed") {
				n.splice(i, 1);
				++i
			}
		}
	}),
	sortEventListeners: function(j) {
		var m = this.EVENTS,
			l = Object.keys(m),
			n = l.length,
			k, i, h;
		for (h = -1; ++h < n;) {
			k = m[l[h]];
			i = k.indexOf(j);
			if (i > 0) {
				k.splice(i, 1);
				k.unshift(j)
			}
		}
	}
};
window.EventHandler = new Sys.EventHandler();
Sys.ns("Sys");
Sys.Observable = function(b) {
	this.eventHandler = Sys.isDefined(b) && Sys.isDefined(b.eventHandler) ? b.eventHandler : EventHandler;
	this.handlers = {}
};
Sys.Observable.prototype = {
	fireEvent: function() {
		if (arguments.length === 0) {
			return
		}
		this.eventHandler.dispatchEvent.apply(this.eventHandler, arguments)
	},
	on: function(h) {
		var i = this,
			k = Object.keys(h),
			l = k.length,
			j, g = 0;
		while (g < l) {
			j = k[g];
			i.addListener(j, h[j]);
			++g
		}
	},
	off: function() {
		var h = this,
			j = Object.keys(h.handlers),
			f = j.length,
			i, g = 0;
		while (g < f) {
			i = j[g];
			h.removeListener(i);
			++g
		}
	},
	addListener: function(c, d) {
		this.handlers[c] = d;
		this.eventHandler.addListener(this, c)
	},
	removeListener: function(b) {
		this.eventHandler.removeListener(this, b);
		this.handlers[b] = undefined
	},
	hasListener: function(b) {
		return Sys.isDefined(this.handlers[b])
	}
};
Sys.ns("Sys");
Sys.Element = {
	constructor: function(f) {
		var d = this,
			e;
		d.transitionend = function() {};
		if (Sys.isString(f)) {
			e = document.createElement(f)
		} else {
			if (f !== null && Sys.isObj(f)) {
				if (/HTML[a-zA-z]*Element/i.test(f.toString())) {
					e = f
				} else {
					e = document.createElement(f.tag);
					Sys.iterate(f, function(b, a) {
						if (b === "cls") {
							e.setAttribute("class", a)
						} else {
							if (b === "innerHTML") {
								e.innerHTML = a
							} else {
								if (b === "textContent") {
									e.textContent = a
								} else {
									if (b === "items") {
										Sys.each(a, function(c) {
											this.add(c)
										}, d)
									} else {
										if (b === "transitionend" && typeof a === "function") {
											d.transitionend = a
										} else {
											if (b !== "renderTo" && b !== "tag") {
												e.setAttribute(b, a)
											}
										}
									}
								}
							}
						}
					})
				}
			} else {
				throw new Error("Invalid instantiation of Sys.Element, invalid input, needs element string or object")
			}
		}
		e.addEventListener("transitionend", function(a) {
			d.transitionend.apply(d, arguments);
			a.stopPropagation()
		}, false);
		if (!Sys.isEmpty(f.renderTo)) {
			document.getElementById(f.renderTo).appendChild(e)
		}
		d.el = e;
		Sys.Element.superclass.constructor.apply(d, arguments)
	},
	getEl: function() {
		return this.el
	},
	getChildren: function() {
		return Array.prototype.slice.call(this.getEl().childNodes, 0)
	},
	add: function(b) {
		this.el.appendChild(b.getEl());
		b.parent = this;
		return b
	},
	addBefore: function(c, d) {
		this.el.insertBefore(c.getEl(), d.getEl());
		c.parent = this;
		return c
	},
	addChildren: function(b) {
		Sys.each(b, function(a) {
			this.el.appendChild(a)
		}, this)
	},
	remove: function(d) {
		var c = d.getEl();
		if (this.el === c.parentNode) {
			this.el.removeChild(c)
		}
		return d
	},
	removeAll: function() {
		var b = this.el;
		while (b.firstChild) {
			b.removeChild(b.firstChild)
		}
	},
	addListener: function(i, k, l, h) {
		var j = this,
			m = function() {
				k.apply(l)
			},
			n;
		l = l || j.el;
		h = h || {};
		if (h.single) {
			m = function() {
				j.removeListener(i, k, l);
				k.apply(l)
			}
		}
		j.domEvents = j.domEvents || {};
		n = j.domEvents[i] || [];
		n.push({
			eventName: i,
			fn: k,
			scope: l,
			wrappedFn: m
		});
		j.domEvents[i] = n;
		j.el.addEventListener(i, m, false);
		Sys.Element.superclass.addListener.apply(this, arguments)
	},
	removeListener: function(f, h, e) {
		var g = this;
		e = e || g.el;
		Sys.each(g.domEvents[f], function(a, b) {
			if (a.eventName === f && a.fn === h && a.scope === e) {
				g.domEvents[f].splice(b, 1);
				g.el.removeEventListener(f, a.wrappedFn, false);
				return false
			}
			return true
		});
		Sys.Element.superclass.removeListener.apply(this, arguments)
	},
	getOffset: function() {
		return Sys.utils.getElOffset(this.el)
	},
	addAsFirst: function(b) {
		this.el.insertBefore(b.el, this.el.firstChild);
		return b
	},
	hasCSSClass: function(b) {
		return Sys.utils.hasCSSClass(this.el, b)
	},
	addCSSClass: function(b) {
		Sys.utils.addCSSClass(this.el, b)
	},
	removeCSSClass: function(b) {
		Sys.utils.removeCSSClass(this.el, b)
	},
	replaceCSSClass: function(e, f, d) {
		Sys.utils.replaceCSSClass(this.el, e, f, d)
	},
	setCSSClassString: function(b) {
		this.el.className = b
	},
	toggleClass: function(e, f) {
		var d = this;
		if (typeof f === "boolean") {
			return f ? d.addCSSClass(e) : d.removeCSSClass(e)
		}
		if (!d.hasCSSClass(e)) {
			return d.addCSSClass(e)
		}
		return d.removeCSSClass(e)
	}
};
Sys.Element.hasCls = Sys.Element.hasCSSClass;
Sys.Element.addCls = Sys.Element.addCSSClass;
Sys.Element.removeCls = Sys.Element.removeCSSClass;
Sys.Element.replaceCls = Sys.Element.replaceCSSClass;
Sys.Element.toggleCls = Sys.Element.toggleClass;
Sys.Element = Sys.extend(Sys.Observable, Sys.Element, "Sys.Element");
Sys.ns("Sys.Math");
Sys.apply(Sys.Math, {
	hypotenuse: function(d, c) {
		return Math.sqrt(d * d + c * c)
	},
	radToDeg: function(b) {
		return b * (180 / Math.PI)
	},
	degToRad: function(b) {
		return Animation.utils.degToRad(b, 10)
	},
	cos: function(b) {
		return Math.cos(this.degToRad(b))
	},
	acos: function(b) {
		return this.radToDeg(Math.acos(b))
	},
	sin: function(b) {
		return Math.sin(this.degToRad(b))
	},
	atan2: function(c, d) {
		return this.radToDeg(Math.atan2(c, d))
	},
	randomBetween: function(c, d) {
		return c + (d - c) * Math.random()
	},
	randomIntBetween: function(c, d) {
		return Math.floor(Math.random() * (d - c + 1)) + c
	},
	randomBetweenRanges: function() {
		var f = this,
			e = Array.prototype.slice.call(arguments),
			d = e[f.randomIntBetween(0, e.length - 1)];
		return f.randomBetween(d[0], d[1])
	},
	randomIntBetweenRanges: function() {
		var b = this;
		return Math.round(b.randomBetweenRanges.apply(b, arguments))
	},
	absoluteDifference: function(c, d) {
		return Math.abs(c - d)
	}
});
Sys.Deferred = function() {
	this.whenList = [];
	this.thenList = [];
	this.failList = [];
	this.alwaysList = [];
	this.states = {
		pending: 0,
		resolved: 1,
		rejected: 2
	};
	this.resolved = 0;
	this.rejected = 0;
	this.args = [];
	this.state = this.states.pending
};
Sys.Deferred.prototype = {
	when: function(d) {
		var c;
		if (Sys.isArray(d)) {
			c = d
		} else {
			c = Array.prototype.slice.call(arguments, 0)
		}
		Sys.each(c, function(a) {
			this.whenList.push(a);
			a.always(function() {
				this.onDeferredUpdated()
			}, this)
		}, this);
		this.onDeferredUpdated();
		return this
	},
	then: function(c, d) {
		d = d || window;
		if (this.isWaiting()) {
			this.thenList.push({
				fn: c,
				scope: d
			})
		} else {
			if (this.isResolved()) {
				c.call(d)
			}
		}
		return this
	},
	fail: function(c, d) {
		d = d || window;
		if (this.isWaiting()) {
			this.failList.push({
				fn: c,
				scope: d
			})
		} else {
			if (this.isRejected()) {
				c.call(d)
			}
		}
		return this
	},
	always: function(c, d) {
		d = d || window;
		if (this.isWaiting()) {
			this.alwaysList.push({
				fn: c,
				scope: d
			})
		} else {
			c.call(d)
		}
		return this
	},
	resolve: function() {
		this.state = this.states.resolved;
		this.onStateUpdated()
	},
	resolveWith: function(b) {
		this.args = b;
		this.resolve()
	},
	reject: function() {
		if (Sys.isFunc(this.fallbackFilter)) {
			this.onFallback()
		} else {
			this.state = this.states.rejected;
			this.onStateUpdated()
		}
	},
	rejectWith: function(b) {
		this.args = b;
		this.reject()
	},
	isRejected: function() {
		return (this.state === this.states.rejected)
	},
	isResolved: function() {
		return (this.state === this.states.resolved)
	},
	fallback: function(b) {
		this.fallbackFilter = b;
		return this
	},
	onFallback: function() {
		var c = this,
			d = c.fallbackFilter.call(this, this.args);
		if (Sys.isObj(d)) {
			d.done(function() {
				c.resolveWith(d.args)
			}).fail(function() {
				c.rejectWith(d.args)
			})
		}
	},
	onDeferredUpdated: function() {
		var f = 0,
			e = 0,
			d;
		Sys.each(this.whenList, function(a) {
			if (a.isRejected()) {
				f += 1
			} else {
				if (a.isResolved()) {
					e += 1
				}
			}
		}, this);
		this.resolved = e;
		this.rejected = f;
		if (!this.isWaiting()) {
			d = [];
			Sys.each(this.whenList, function(a) {
				d = d.concat(a.args)
			});
			if (f > 0) {
				this.rejectWith(d)
			} else {
				if (e > 0) {
					this.resolveWith(d)
				}
			}
		}
	},
	isWaiting: function() {
		return !this.whenList.length || ((this.resolved + this.rejected) < this.whenList.length)
	},
	onStateUpdated: function() {
		var g = [],
			h, e, f;
		if (this.state === this.states.resolved) {
			g = this.thenList.concat(this.alwaysList)
		} else {
			if (this.state === this.states.rejected) {
				g = this.failList.concat(this.alwaysList)
			}
		}
		f = g.length;
		for (e = -1; ++e < f;) {
			h = g[e].fn.apply(g[e].scope, this.args);
			if (Sys.isObj(h) && (e + 1 < f)) {
				h.thenList.push.apply(h.thenList, g.slice(e + 1));
				break
			}
		}
		this.thenList = [];
		this.alwaysList = [];
		this.failList = []
	}
};
Sys.Deferred.prototype.done = Sys.Deferred.prototype.then;
Sys.ns("Sys.utils");
(function() {
	var b = {
		queryStringToObject: function(a, n) {
			var k = {},
				i, l, j = Sys.isDefined(n) ? n : true,
				m;
			if (!a) {
				return k
			}
			m = a.replace("?", "").split(/&/);
			Sys.each(m, function(c) {
				i = c.split("=");
				l = i[1];
				if (j) {
					l = decodeURIComponent(l)
				}
				if (l === "false") {
					l = false
				} else {
					if (l === "true") {
						l = true
					}
				}
				k[i[0]] = l
			});
			return k
		},
		qsToObj: function(a, f) {
			var e = this.queryStringToObject(a, f);
			e.toStr = function() {
				var c = "";
				Sys.iterate(e, function(h, d) {
					if (typeof d !== "function") {
						c += c.length ? "&" : "?";
						c += h + "=" + d
					}
				});
				return c
			};
			return e
		},
		appendParameterToQuery: function(f, e) {
			var a = f[f.length - 1];
			if (a === "?" || a === "&") {
				f += e
			} else {
				if (!f.contains("?")) {
					f += "?" + e
				} else {
					f += "&" + e
				}
			}
			return f
		},
		httpGet: function(g) {
			var f = new XMLHttpRequest(),
				a = new Sys.Deferred(),
				h = g.url;
			f.onreadystatechange = function() {
				if (this.readyState === 4) {
					f.onreadystatechange = function() {};
					if (Sys.utils.httpRequestIsOK(f)) {
						if (g.responseType !== "arraybuffer" && Sys.isDefined(Sys.utils.getErrorCode(f))) {
							a.rejectWith([f])
						} else {
							a.resolveWith([f])
						}
					} else {
						a.rejectWith([f])
					}
				}
			};
			if (Sys.isDefined(g.onProgressCallback)) {
				f.onprogress = function(c) {
					g.onProgressCallback(c, g.name)
				}
			}
			f.open("GET", h);
			if (Sys.isDefined(g.responseType)) {
				f.responseType = g.responseType
			}
			if (!Sys.isEmpty(g.useCredentials)) {
				f.withCredentials = g.useCredentials
			}
			f.send();
			return a
		},
		httpRequestIsOK: function(a) {
			return a.status === 200 || (a.status === 0 && a.responseText.length > 0)
		},
		getErrorCode: function(a) {
			var d = Sys.utils.toInt(Sys.utils.getResponseParameter("errorcode", a));
			return !isNaN(d) ? d : undefined
		},
		getErrorData: function(a) {
			return this.getResponseParameter("errordata", a)
		},
		getResponseParameter: function(f, h) {
			var g = new RegExp(f + "=([^&]+)"),
				a = Sys.isDefined(h.responseText) ? h.responseText.match(g) : null;
			return a !== null ? a[1] : undefined
		},
		loadJS: function(h) {
			var a = new Sys.Deferred(),
				f = document,
				g = f.createElement("script");
			g.onload = function() {
				a.resolve()
			};
			g.type = "text/javascript";
			g.src = h.url;
			setTimeout(function() {
				if (!a.isResolved()) {
					a.reject()
				}
			}, 5000);
			f.getElementsByTagName("head")[0].appendChild(g);
			return a
		},
		strIsTrue: function(a) {
			if (Sys.isEmpty(a)) {
				return false
			}
			return a.toString().toLowerCase() === "true"
		},
		pseudoGUID: function() {
			return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
				var f = Math.random() * 16 | 0,
					a = c === "x" ? f : (f & 3 | 8);
				return a.toString(16)
			})
		},
		getNodesByFormat: function(f, a) {
			var k = this,
				l = [],
				i = 0,
				j;
			f.replace(/\{([^\{\}]*)\}/g, function(e, g, c, d) {
				l.push(document.createTextNode(d.slice(i, c)));
				i = c + e.length;
				j = function() {
					var h = a[Sys.utils.toInt(g)];
					if (Sys.isString(h) || Sys.isNumber(h)) {
						l.push(document.createTextNode(h.toString()));
						return h
					} else {
						if (Sys.isObj(h)) {
							l.push(h.getEl())
						}
					}
					return ""
				};
				j.apply(k, arguments)
			});
			if (i < f.length) {
				l.push(document.createTextNode(f.slice(i, f.length)))
			}
			return l
		},
		objSort: function(a, f, g) {
			var h = function(c, d) {
				return g ? d[f] - c[f] : c[f] - d[f]
			};
			a.sort(h);
			return a
		},
		toInt: function(a) {
			return parseInt(a, 10)
		},
		toFloat: function(a) {
			return parseFloat(a)
		},
		floorToEven: function(d) {
			var a = d % 2;
			return d - a
		},
		ceilToEven: function(d) {
			var a = d % 2;
			return d + (2 - a)
		},
		numberToFixedDigits: function(a, d) {
			if (Math.abs(a) < 1) {
				return a.toFixed(d - 1)
			}
			return a.toPrecision(d)
		},
		isUrl: function(a) {
			var d = new RegExp("(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-\\/]))?");
			return d.test(a)
		},
		getElOffset: function(e) {
			var a = 0,
				f = 0;
			if (e.offsetParent) {
				do {
					a += e.offsetLeft;
					f += e.offsetTop
				} while ((e = e.offsetParent))
			}
			return {
				left: a,
				top: f,
				x: a,
				y: f
			}
		},
		getTransformationOffset: function(g) {
			var a = 0,
				f = 0,
				h;
			if (g.parentElement) {
				do {
					h = new WebKitCSSMatrix(window.getComputedStyle(g).webkitTransform);
					a += h.e;
					f += h.f
				} while ((g = g.parentElement))
			}
			return {
				left: a,
				top: f,
				x: a,
				y: f
			}
		},
		getPointCoordinates: function(f) {
			var e = {
					x: 0,
					y: 0
				},
				a = f.type;
			if (/touch/.test(a)) {
				e.x = f.changedTouches[0].pageX;
				e.y = f.changedTouches[0].pageY
			} else {
				if (/mouse/.test(a)) {
					e.x = f.x;
					e.y = f.y
				}
			}
			return e
		},
		hasCSSClass: function(f, e) {
			var a = new RegExp("(^|\\s)" + e + "($|\\s)");
			return f.className.search(a) >= 0
		},
		addCSSClass: function(a, d) {
			if (!Sys.utils.hasCSSClass(a, d)) {
				a.className = Sys.utils.trimClassName(a.className + " " + d)
			}
		},
		removeCSSClass: function(a, d) {
			Sys.utils.replaceCSSClass(a, d, "", false)
		},
		replaceCSSClass: function(k, l, h, i) {
			var j = k.className,
				a;
			if (Sys.utils.hasCSSClass(k, l)) {
				a = new RegExp("(^|\\s)(" + l + ")($|\\s)");
				j = j.replace(a, "$1" + h + "$3");
				k.className = Sys.utils.trimClassName(j)
			} else {
				if (i) {
					Sys.utils.addCSSClass(k, h)
				}
			}
		},
		trimClassName: function(a) {
			return a.replace(/\s+/g, " ").trim()
		},
		addCSSClassToBody: function(a) {
			Sys.utils.addCSSClass(document.body, a)
		},
		replaceCSSClassOnBody: function(a, e, f) {
			Sys.utils.replaceCSSClass(document.body, a, e, f)
		},
		goTo: function(a) {
			window.location = this.sanitizeURL(a)
		},
		objectToQueryString: function(f) {
			var a = "",
				e;
			for (e in f) {
				if (f.hasOwnProperty(e)) {
					a += "&" + e + "=" + f[e]
				}
			}
			return a
		},
		reload: function() {
			window.location.reload()
		},
		containsObject: function(e, f) {
			var a;
			if (Sys.isObj(e) && Sys.isArray(f)) {
				for (a = 0; a < f.length; a++) {
					if (f[a] === e) {
						return {
							found: true,
							index: a
						}
					}
				}
			} else {}
			return {
				found: false,
				index: NaN
			}
		},
		getKeys: function(f) {
			var g = [],
				h, a = f.keys;
			if (typeof a !== "function") {
				for (h in f) {
					if (f.hasOwnProperty(h)) {
						g.push(h)
					}
				}
			} else {
				g = a(f)
			}
			return g
		},
		init2dMatrix: function(a, g, h) {
			var i, j = [];
			for (i = -1; ++i < a;) {
				j.push(Sys.utils.initArray(g, h))
			}
			return j
		},
		initArray: function(g, h) {
			var a, f = [];
			for (a = -1; ++a < g;) {
				f.push(h)
			}
			return f
		},
		getPrefixedCSSProperty: function(d) {
			var a = this.tryPrefixPropery(d, document.body.style);
			return a
		},
		tryPrefixPropery: function(i, k) {
			var l, j = ["webkit", "moz", "ms", "o"],
				h, a;
			if (!Sys.isDefined(i)) {
				return undefined
			}
			if (i in k) {
				return i
			}
			h = i.charAt(0).toUpperCase() + i.substr(1);
			for (a = 0; a < j.length; a++) {
				l = j[a] + h;
				if (l in k) {
					return l
				}
			}
			return undefined
		},
		pollyFill: function(a) {
			return this.getPrefixedCSSProperty(a)
		},
		parseQueryStringToNestedObject: function(a) {
			return this.parseQueryString(a, true)
		},
		parseQueryString: function(v, p) {
			var m = {},
				q = v.split("&"),
				u, s, a, t, r, n, o;
			for (u = 0; u < q.length; u++) {
				s = q[u].split("=");
				a = s[0].split(".");
				r = m;
				for (t = 0; t < a.length - 1; t++) {
					if (!r[a[t]]) {
						r[a[t]] = {}
					}
					r = r[a[t]]
				}
				n = a[a.length - 1];
				o = p === true ? this.parseValue(decodeURIComponent(s[1])) : decodeURIComponent(s[1]);
				if (n !== "") {
					r[n] = o
				}
			}
			return m
		},
		parseValue: function(g) {
			var h, a, f = {};
			if (g.toLowerCase() === "true") {
				return true
			}
			if (g.toLowerCase() === "false") {
				return false
			}
			if (g.toLowerCase() === "null") {
				return null
			}
			if (g.toLowerCase() === "undefined") {
				return undefined
			}
			if (!isNaN(Number(g))) {
				if (g.length > 16) {
					return g
				}
				return Number(g)
			}
			if (g.split(",").length > 1) {
				h = g.split(",");
				for (a = 0; a < h.length; a++) {
					h[a] = this.parseValue(h[a])
				}
				return h
			}
			if (g.split(":").length > 1) {
				h = g.split(":");
				f[h[0]] = this.parseValue(h[1]);
				return f
			}
			return g
		},
		parseReelInfo: function(a, k) {
			var h, l = [],
				j, i;
			if (Sys.isDefined(k)) {
				Sys.iterate(a.rs, function(d, c) {
					if (Sys.isObj(c) && c.id === k) {
						h = c.r
					}
				})
			}
			if (!Sys.isDefined(h)) {
				h = a.rs.i0.r
			}
			for (j = 0; Sys.isDefined(h["i" + j]); j++) {
				i = {
					hold: h["i" + j].hold,
					symbols: h["i" + j].syms,
					overlaySymbols: []
				};
				if (h["i" + j].overlay) {
					i.overlaySymbols = this.getOverlaySymbols(h["i" + j].overlay)
				}
				l.push(i)
			}
			return l
		},
		getOverlaySymbols: function(a) {
			var e = [],
				f;
			for (f = 0; a["i" + f]; f++) {
				e[a["i" + f].row] = a["i" + f]["with"]
			}
			return e
		},
		getClassFromString: function(i) {
			var h, j = window,
				a, g;
			if (Sys.isString(i)) {
				h = i.split(".");
				g = h.length;
				for (a = 0; a < g; a++) {
					j = j[h[a]];
					if (!Sys.isDefined(j)) {
						return undefined
					}
				}
				return j
			}
			return undefined
		},
		openURL: function(a) {
			var e = this.sanitizeURL(a);
			try {
				window.open(e, "_blank")
			} catch (f) {
				window.location.assign(e)
			}
		},
		sanitizeURL: function(g) {
			var h = /^(https?:)?\/\//,
				f = /<|>/g,
				a = {
					"<": "&lt;",
					">": "&gt;"
				};
			if (!h.test(g)) {
				return null
			}
			return g.replace(f, function(c) {
				return a[c]
			})
		}
	};
	Sys.utils = Sys.apply(Sys.utils, b)
}());
Sys.ns("Core");
Core.Module = {
	constructor: function(b) {
		Core.Module.superclass.constructor.apply(this, arguments);
		this.init(b)
	},
	getStateChanges: function() {},
	getMixinDependencies: function() {
		return []
	},
	getDefaultMVCClasses: function() {
		return {
			controller: Core.Controller
		}
	},
	init: function(q) {
		var l = this,
			j = ["model", "view", "controller"],
			k = l.getDefaultMVCClasses(),
			m = Object.keys(k),
			o = new Sys.EventHandler(),
			p, r, n;
		if (Sys.isDefined(q)) {
			Sys.each(j, function(a) {
				if (Sys.isDefined(q[a])) {
					k[a] = q[a]
				} else {
					if (m.contains(a) && !Sys.isDefined(k[a])) {
						throw new Error("Module :: The " + q.name + " module has a " + a + " class defined that is not included")
					}
				}
			})
		}
		if (Sys.isDefined(k.model)) {
			p = k.model;
			l.model = new p({
				name: q.name,
				eventHandler: o
			})
		}
		if (Sys.isDefined(k.view)) {
			if (!Sys.isDefined(l.model)) {
				l.model = new Core.Model({
					name: q.name,
					eventHandler: o
				})
			}
			r = k.view;
			l.view = new r({
				name: q.name,
				model: l.model,
				eventHandler: o
			})
		}
		n = k.controller;
		l.controller = new n({
			name: q.name,
			view: l.view,
			model: l.model,
			eventHandler: o
		});
		l.MODULE_NAME = q.name
	}
};
Core.Module = Sys.extend(Sys.Observable, Core.Module, "Core.Module");
Sys.ns("Core");
Core.Controller = {
	constructor: function(d) {
		var c = this;
		c.localEventHandler = d.eventHandler;
		c.eventHandler = EventHandler;
		c.handlers = {};
		c.init(d)
	},
	init: function(d) {
		var c = this;
		c.model = d.model;
		c.view = d.view;
		c.MODULE_NAME = d.name;
		c.setupEvents()
	},
	setupEvents: function() {},
	onModulesFinishedLoading: function() {
		this.model.setState("loaded")
	},
	addListener: function(f, d) {
		var e = this;
		e.handlers[f] = d;
		if (f.indexOf("view:") === 0) {
			e.localEventHandler.addListener(e, f)
		} else {
			e.eventHandler.addListener(e, f)
		}
	},
	removeListener: function(b) {
		if (b.indexOf("view:") === 0) {
			this.localEventHandler.removeListener(this, b)
		} else {
			this.eventHandler.removeListener(this, b)
		}
		this.handlers[b] = undefined
	}
};
Core.Controller = Sys.extend(Sys.Observable, Core.Controller, "Core.Controller");
Sys.ns("Core");
Core.Model = {
	constructor: function(b) {
		Core.Model.superclass.constructor.apply(this, arguments);
		this.init(b)
	},
	readData: function(b) {
		return this.data[b]
	},
	storeData: function(c, d) {
		this.data[c] = d;
		return this.data[c]
	},
	removeData: function(b) {
		delete this.data[b]
	},
	setState: function(d, c) {
		this.state = d;
		this.fireEvent("model:" + this.state, c)
	},
	getState: function() {
		return this.state
	},
	isState: function(b) {
		return b === this.state
	},
	init: function(d) {
		var c = this;
		c.data = {};
		c.state = undefined;
		c.MODULE_NAME = d.name;
		c.setupData()
	},
	setupData: function() {}
};
Core.Model = Sys.extend(Sys.Observable, Core.Model, "Core.Model");
Sys.ns("Core");
Core.View = {
	constructor: function(b) {
		Core.View.superclass.constructor.apply(this, arguments);
		this.init(b)
	},
	init: function(b) {
		this.model = b.model;
		this.MODULE_NAME = b.name;
		this.setupEvents()
	},
	setupEvents: function() {}
};
Core.View = Sys.extend(Sys.Observable, Core.View, "Core.View");
Sys.ns("Platform");
Platform.PlatformManager = {
	AVAILABLE_RESOURCE_BUNDLES: [],
	gatherWindowsInformation: function(b) {
		if (/Windows Phone/i.test(b)) {
			Platform.isWindowsMobileDevice = true;
			Platform.isWindowsHandHeldDevice = true;
			Platform.isMobileDevice = true
		} else {
			if (/\sarm;/.test(b) && (/trident/).test(b)) {
				Platform.isWindowsTabletDevice = true;
				Platform.isWindowsHandHeldDevice = true;
				if ((navigator.msMaxTouchPoints > 0 && window.MouseEvent) || (/touch; wpdesktop/).test(b)) {
					Platform.isTabletDevice = false
				} else {
					Platform.isTabletDevice = true
				}
			}
		}
	},
	gatherAppleInformation: function(b) {
		if (/ipod|ipad|iphone/i.test(b) && !(Platform.isWindowsHandHeldDevice === true)) {
			Platform.isIOSDevice = true;
			if (/ipad/i.test(b)) {
				Platform.isTabletDevice = true
			} else {
				Platform.isMobileDevice = true
			}
			if (!Sys.isDefined(window.orientation)) {
				Platform.isIOSDevice = false
			}
		}
	},
	gatherAndroidInformation: function(c) {
		var d;
		if (/Android/i.test(c) && !(Platform.isWindowsHandHeldDevice === true)) {
			Platform.isAndroidDevice = true;
			d = c.match(/Android (\d+)\.(\d+)/i);
			Platform.isAndroidMajorVersion = Number(d[1]);
			Platform.isAndroidMinorVersion = Number(d[2]);
			if (/mobile/i.test(c)) {
				Platform.isMobileDevice = true
			} else {
				Platform.isTabletDevice = true
			}
			if (/Chrome/i.test(c)) {
				Platform.isChromeBrowser = true;
				d = c.match(/Chrome\/(\d+)\.(\d+)/i);
				Platform.isChromeMajorVersion = Number(d[1]);
				Platform.isChromeMinorVersion = Number(d[2])
			} else {
				Platform.isAndroidStockBrowser = true
			}
			if (/GT-I9100/i.test(c)) {
				Platform.isSamsungS2Device = true
			}
			if (/GT-I9300/i.test(c)) {
				Platform.isSamsungS3Device = true
			}
			if (/GT-I9505|GT-I9521|GT-I9525/i.test(c)) {
				Platform.isSamsungS4Device = true
			}
		}
	},
	gatherDesktopInformation: function(b) {
		if (!Sys.isDefined(window.orientation) && !Platform.isMobileDevice && !Platform.isTabletDevice) {
			Platform.isDesktopDevice = true
		}
		Platform.isIEBrowser = /trident/i.test(b);
		Platform.isEdgeBrowser = /edge/i.test(b);
		Platform.isSafariBrowser = /Safari/i.test(b) && !/Chrome/i.test(b);
		if (!Platform.isDesktopDevice) {
			Platform.isLowEndDevice = this.checkIfLowEndDevice(b);
			Platform.isVibrationAPISupported = this.isVibrationAPISupported(navigator)
		}
	},
	gatherUserAgentInformation: function() {
		var d = this,
			c = navigator.userAgent.toLowerCase();
		d.gatherWindowsInformation(c);
		d.gatherAppleInformation(c);
		d.gatherAndroidInformation(c);
		d.gatherDesktopInformation(c)
	},
	checkIfLowEndDevice: function(k) {
		var i = Platform.isAndroidMajorVersion < 5,
			l = Platform.isAndroidMajorVersion === 5 && Platform.isAndroidMinorVersion === 0,
			m = Sys.isiPad && !window.matchMedia("(-webkit-min-device-pixel-ratio: 2)").matches,
			o = Platform.isWindowsHandHeldDevice && this.isLowMemoryWinPhone(k),
			j = !this.isWebGLSupported(),
			n = Platform.isAndroidStockBrowser || i || l,
			p = Sys.isIphone3GS || m || o;
		return (n || p || j)
	},
	checkIfHighEndDevice: function(c) {
		var d = Platform.isDesktopDevice;
		return d && !Platform.isIEBrowser && !Platform.isSafariBrowser
	},
	getDevicePerformance: function() {
		var d = navigator.userAgent.toLowerCase(),
			f = this.checkIfLowEndDevice(d),
			e = this.checkIfHighEndDevice(d);
		if (f) {
			return this.LOW_END_DEVICE
		} else {
			if (e) {
				return this.HIGH_END_DEVICE
			}
		}
		return this.MEDIUM_DEVICE
	},
	isLowMemoryWinPhone: function(f) {
		var e = false,
			d = /[L|l]umia/;
		if (d.test(f)) {
			e = true
		}
		return e
	},
	isWebGLSupported: function() {
		var f = {
				stencil: true
			},
			e, g;
		try {
			if (!window.WebGLRenderingContext) {
				return false
			}
			e = document.createElement("canvas");
			g = e.getContext("webgl", f) || e.getContext("experimental-webgl", f);
			return Boolean(g && g.getContextAttributes().stencil)
		} catch (h) {
			return false
		}
	},
	isVibrationAPISupported: function(b) {
		return Sys.isDefined(b.vibrate || b.webkitVibrate || b.mozVibrate || b.msVibrate)
	},
	detectPlatformFeatures: function() {
		var c, d;
		Platform.hasWebAudioContext = this.isWebAudioContextAvailable() && !Platform.isAndroidStockBrowser;
		Platform.hasFullscreenAPI = false;
		c = ["exitFullscreen", "webkitExitFullscreen", "webkitCancelFullScreen", "mozCancelFullScreen", "msExitFullscreen"];
		for (d = 0; d < c.length; d++) {
			if (c[d] in document) {
				Platform.hasFullscreenAPI = true;
				break
			}
		}
	},
	isWebAudioContextAvailable: function() {
		return Sys.isDefined(window.AudioContext || window.webkitAudioContext)
	},
	consolidatePlatformKnowledge: function() {
		var f = Platform.isAndroidMajorVersion === 4 && Platform.isAndroidMinorVersion === 3,
			d = Platform.isSamsungS3Device || Platform.isSamsungS4Device,
			e = Platform.isAndroidStockBrowser;
		e = e || Platform.isIphone3GSDevice;
		e = e || (f && d && Platform.isChromeMajorVersion === 28);
		Platform.isWebAudioEnabled = Platform.hasWebAudioContext && !e
	},
	applyOverrides: function() {},
	determineResourceBundle: function() {
		var h = this,
			e, f;
		if (Sys.isDefined(Platform.resourceBundle)) {
			return
		}
		h.detectPlatformFeatures();
		h.consolidatePlatformKnowledge();
		h.applyOverrides();
		for (e = 0; e < h.AVAILABLE_RESOURCE_BUNDLES.length; e++) {
			f = Platform["_" + h.AVAILABLE_RESOURCE_BUNDLES[e]];
			if (f.requirementsAreMet()) {
				Platform.resourceBundle = f;
				Platform.resourceBundle.preloadAudio = f.preloadAudio();
				try {
					Platform.hasWebGLContext = f.preloadOptionalWebGLLibrary()
				} catch (g) {
					break
				}
			}
		}
		h.applyFeatureDetectedProperties()
	},
	applyFeatureDetectedProperties: function() {
		Platform.resourceBundle.loaderResourceKeys.audio = this.determineAudioConfiguration(Platform.resourceBundle.loaderResourceKeys.audio)
	},
	determineAudioConfiguration: function(h) {
		var g = Platform.hasWebAudioContext ? "webAudio" : "legacyAudio",
			f = "",
			j, i;
		if (g === "webAudio" && !Platform.isDesktopDevice) {
			j = (Platform.resourceBundle.audioType && Platform.resourceBundle.audioType.postFix) ? Platform.resourceBundle.audioType.postFix : "_mobile";
			g += j || "_mobile";
			f = "_sprite"
		}
		i = "_" + h + f;
		return g + i
	}
};
Platform.PlatformManager.LOW_END_DEVICE = "low";
Platform.PlatformManager.MEDIUM_DEVICE = "med";
Platform.PlatformManager.HIGH_END_DEVICE = "high";
Platform.PlatformManager.gatherUserAgentInformation();
Sys.ns("Platform");
Platform._android = {
	IDENTIFIER: "Android",
	loaderResourceKeys: {
		GFX: "960x540",
		audio: "ogg"
	},
	requirementsAreMet: function() {
		return Platform.isAndroidDevice
	},
	preloadAudio: function() {
		return false
	},
	preloadOptionalWebGLLibrary: function() {
		return false
	}
};
Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("android");
Sys.ns("Platform");
Platform._mobile = {
	IDENTIFIER: "mobile",
	loaderResourceKeys: {
		GFX: "960x540",
		audio: "mp3"
	},
	requirementsAreMet: function() {
		return !Platform.isDesktopDevice && !Platform.isLowEndDevice
	},
	preloadAudio: function() {
		return false
	},
	preloadOptionalWebGLLibrary: function() {
		return false
	}
};
Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("mobile");
Sys.ns("Platform");
Platform._mobile_low = {
	IDENTIFIER: "mobileLow",
	loaderResourceKeys: {
		GFX: "960x540",
		audio: "mp3"
	},
	requirementsAreMet: function() {
		return !Platform.isDesktopDevice && Platform.isLowEndDevice
	},
	preloadAudio: function() {
		return false
	},
	preloadOptionalWebGLLibrary: function() {
		return false
	}
};
Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("mobile_low");
Sys.ns("Platform");
Platform._android_low = {
	IDENTIFIER: "androidLow",
	loaderResourceKeys: {
		GFX: "960x540",
		audio: "ogg"
	},
	requirementsAreMet: function() {
		return Platform.isAndroidDevice && Platform.isLowEndDevice
	},
	preloadAudio: function() {
		return false
	},
	preloadOptionalWebGLLibrary: function() {
		return false
	}
};
Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("android_low");
Sys.ns("Platform");
Platform._desktop = {
	IDENTIFIER: "Desktop",
	loaderResourceKeys: {
		GFX: "1280x720",
		audio: "ogg"
	},
	requirementsAreMet: function() {
		return Platform.isDesktopDevice
	},
	preloadAudio: function() {
		return Platform.hasWebAudioContext
	},
	preloadOptionalWebGLLibrary: function() {
		return false
	}
};
Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("desktop");
Sys.ns("Platform");
Platform._desktop_edge = {
	IDENTIFIER: "Desktop Edge",
	loaderResourceKeys: {
		GFX: "1280x720",
		audio: "mp3"
	},
	requirementsAreMet: function() {
		return Platform.isDesktopDevice && Platform.isEdgeBrowser
	},
	preloadAudio: function() {
		return Platform.hasWebAudioContext
	},
	preloadOptionalWebGLLibrary: function() {
		return false
	}
};
Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("desktop_edge");
Sys.ns("Platform");
Platform._desktop_IE = {
	IDENTIFIER: "Desktop IE",
	loaderResourceKeys: {
		GFX: "1280x720",
		audio: "mp3"
	},
	requirementsAreMet: function() {
		return Platform.isDesktopDevice && Platform.isIEBrowser
	},
	preloadAudio: function() {
		return Platform.hasWebAudioContext
	},
	preloadOptionalWebGLLibrary: function() {
		return false
	}
};
Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("desktop_IE");
Sys.ns("Platform");
Platform._desktop_safari = {
	IDENTIFIER: "Desktop Safari",
	loaderResourceKeys: {
		GFX: "1280x720",
		audio: "mp3"
	},
	requirementsAreMet: function() {
		return Platform.isDesktopDevice && Platform.isSafariBrowser
	},
	preloadAudio: function() {
		return Platform.hasWebAudioContext
	},
	preloadOptionalWebGLLibrary: function() {
		return false
	}
};
Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("desktop_safari");
Sys.ns("Platform");
Platform._default = {
	IDENTIFIER: "Default",
	loaderResourceKeys: {
		GFX: "960x540",
		audio: "mp3"
	},
	requirementsAreMet: function() {
		return false
	},
	preloadAudio: function() {
		return false
	},
	preloadOptionalWebGLLibrary: function() {
		return false
	}
};
Platform.PlatformManager.AVAILABLE_RESOURCE_BUNDLES.push("default");
Sys.ns("Sys");
Sys.Environment = {
	constructor: function(d) {
		var c = this;
		Sys.Environment.superclass.constructor.apply(c, arguments);
		c.isIniFrame = (window.top !== window.self);
		c.allowCustomCanvasSize = Boolean(window.RESOLUTIONS_CONFIG && window.VIRTUAL_RESOLUTIONS_CONFIG);
		c.supportedPlatforms = ["mobile", "mobileLow", "tablet", "tabletLow", "desktop"];
		c.portraitSupport = true;
		c.init();
		document.onselectstart = function() {
			return false
		}
	},
	getResolution: function() {
		return this.resolutionProperties.resolution
	},
	getStageResolution: function() {
		return this.resolutionProperties.virtualResolution
	},
	allowsCustomCanvasSize: function() {
		return this.allowCustomCanvasSize
	},
	getViewportOrientation: function(b) {
		if (this.allowsCustomCanvasSize() && !b) {
			return this.viewportOrientation
		}
		return this.orientation()
	},
	getCurrentResolutionPixelFactor: function() {
		return this.resolutionProperties.resolution.pixelFactor
	},
	scaleValue: function(d, f) {
		var e = Sys.isNumber(f) ? f : 0;
		return parseFloat(d.toFixed(e))
	},
	scaleX: function(d, c) {
		return this.scaleValue(d, c)
	},
	scaleY: function(c, d) {
		return this.scaleValue(c, d)
	},
	getVirtualToWindowScale: function(b) {
		return parseFloat(this.resolutionProperties.virtualToWindowScale.toFixed(b))
	},
	getWindowToVirtualScale: function(b) {
		return parseFloat((1 / this.resolutionProperties.virtualToWindowScale).toFixed(b))
	},
	updateResolutionProperties: function() {
		this.resolutionProperties = this.determineResolution();
		document.documentElement.style.fontSize = this.resolutionProperties.resolution.pixelFactor * 100 + "px"
	},
	getInitialScreenSize: function() {
		return this.initialScreenSize
	},
	init: function() {
		var b = this;
		b.defaultResolutions = {
			mobile: {
				"default": {
					width: 960,
					height: 540,
					pixelFactor: 1,
					portraitTopOffset: 0.3
				}
			},
			mobileLow: {
				"default": {
					width: 960,
					height: 540,
					pixelFactor: 1,
					portraitTopOffset: 0.3
				}
			},
			tablet: {
				"default": {
					width: 960,
					height: 540,
					pixelFactor: 1
				}
			},
			tabletLow: {
				"default": {
					width: 960,
					height: 540,
					pixelFactor: 1
				}
			},
			desktop: {
				"default": {
					width: 1280,
					height: 720,
					pixelFactor: 720 / 540
				}
			}
		};
		b.defaultVirtualResolutions = {
			"default": {
				"default": {
					width: 1280,
					height: 720
				}
			}
		};
		b.identifyOS();
		b.identifyBrowser();
		b.identifyPlatform();
		b.resolutionProperties = b.determineResolution();
		b.initialScreenSize = b.getInnerScreenSize();
		document.documentElement.style.fontSize = b.resolutionProperties.resolution.pixelFactor * 100 + "px";
		b.checkSoundSupport();
		b.setupPageVisibility();
		b.defineInputEvents();
		b.setupEvents()
	},
	setupEvents: function() {
		var b = this;
		b.on({
			receivedOrientationChange_event: b.onOrientationChange,
			receivedEnvironmentSize_event: b.onSizeChange,
			"notify:potraitMessage.active": b.setPortraitSupport
		})
	},
	setPortraitSupport: function() {
		this.portraitSupport = false
	},
	isPortraitSupported: function() {
		return this.portraitSupport
	},
	identifyOS: function() {
		var c = navigator.userAgent,
			d = "";
		if (c.match(/Windows/i)) {
			d = "windows"
		} else {
			if (c.match(/Android/i)) {
				d = "android"
			} else {
				if (c.match(/iPad/i) || c.match(/iPhone/i) || c.match(/iPod/i)) {
					d = "ios"
				}
			}
		}
		this.os = d
	},
	identifyBrowser: function() {
		var f = navigator.userAgent,
			d = this.os,
			e = "";
		if (f.match(/CriOS/i) || f.match(/Chrome/i)) {
			e = "chrome"
		} else {
			if (f.match(/MSIE [0-9]*\.[0-9]*;/i)) {
				e = "ie"
			} else {
				if (f.match(/Safari/i)) {
					if (d === "ios") {
						e = "safari"
					} else {
						if (d === "android") {
							e = "stock"
						}
					}
				} else {
					if (f.match(/Firefox/i)) {
						e = "firefox"
					}
				}
			}
		}
		this.browser = e
	},
	identifyPlatform: function() {
		var b = "mobile";
		if (Platform.isTabletDevice) {
			b = "tablet"
		} else {
			if (Platform.isDesktopDevice) {
				b = "desktop"
			}
		}
		this.platformCSS = b;
		if (b !== "desktop" && Platform.isLowEndDevice) {
			b += "Low"
		}
		this.platform = b
	},
	getOrientation: function() {
		if (Sys.isDefined(this.deviceOrientation)) {
			return this.deviceOrientation
		}
		if (Platform.isDesktopDevice || (!this.allowsCustomCanvasSize() && Platform.isTabletDevice)) {
			return "LANDSCAPE"
		}
		if (Platform.isAndroidStockBrowser) {
			if (Math.abs(window.orientation) === 90) {
				return "LANDSCAPE"
			}
			return "PORTRAIT"
		}
		if (window.innerWidth >= window.innerHeight) {
			return "LANDSCAPE"
		}
		return "PORTRAIT"
	},
	determineResolution: function() {
		var e = {
				standard: window.RESOLUTIONS_CONFIG || this.defaultResolutions,
				virtual: window.VIRTUAL_RESOLUTIONS_CONFIG || this.defaultVirtualResolutions
			},
			f = this.getVirtualResolution(e.virtual),
			d = this.getClosestResolution(e.standard, f);
		this.viewportOrientation = d.width / d.height >= 1 ? "LANDSCAPE" : "PORTRAIT";
		return {
			virtualResolution: f,
			resolution: d,
			virtualToWindowScale: d.height / f.height,
			portraitTopOffset: d.portraitTopOffset || 0
		}
	},
	getKeyOfClosestResolution: function(h, j) {
		var m = j[0].value,
			l = j[0].key,
			k = Math.abs(h - m),
			i = j.length,
			n;
		while (i--) {
			n = Math.abs(h - j[i].value);
			if (n < k) {
				k = n;
				l = j[i].key
			}
		}
		return l
	},
	getClosestResolution: function(f, j) {
		var i = this,
			h = i.getPlatformSpecificConfig(f),
			g = {};
		if (h === null || Object.keys(h).length === 0) {
			return null
		}
		Sys.iterate(h, function(a, b) {
			g[a] = i.examineResolution(b)
		});
		return i.findClosestResolution(j, g)
	},
	findClosestResolution: function(i, j) {
		var f = this.examineResolution(i),
			g = [],
			h = function(a, b) {
				if (Math.abs(a.diff) < Math.abs(b.diff)) {
					return -1
				} else {
					if (Math.abs(a.diff) > Math.abs(b.diff)) {
						return 1
					}
				}
				return 0
			};
		Sys.iterate(j, function(e, c) {
			var m = c,
				a, d, b, n;
			a = Math.abs(m.width - f.width);
			d = Math.abs(m.height - f.height);
			b = a + d;
			n = Math.abs(m.ratio - f.ratio);
			m.diff = b * (1 + n);
			g.push(m)
		});
		g.sort(h);
		return g[0].source
	},
	examineResolution: function(b) {
		return {
			source: b,
			width: b.width,
			height: b.height,
			ratio: b.width / b.height
		}
	},
	getPlatformSpecificConfig: function(i, l) {
		var g = this.getCurrentPlatform(),
			h = "Low",
			j = "default",
			k;
		if (l) {
			g = g.toUpperCase();
			h = h.toUpperCase();
			j = j.toUpperCase()
		}
		k = i[g] || i[g.replace(h, "")] || i[j];
		return k || null
	},
	getOrientationSpecificConfig: function(m, h, j) {
		var n = this.getViewportOrientation(j),
			i = "default",
			l = "base",
			k = {};
		if (!Sys.isDefined(m) || m === null) {
			return null
		}
		if (!h) {
			n = n.toLowerCase();
			l = l.toLowerCase()
		} else {
			i = i.toUpperCase();
			l = l.toUpperCase()
		}
		if (Sys.isDefined(m[l])) {
			k = Sys.applyProperties(k, m[l]);
			k = Sys.applyProperties(k, m[n] || {});
			return k
		}
		return m[n] || m[i] || null
	},
	getConfigForCurrentDeviceState: function(g, f, h) {
		var e = this.getPlatformSpecificConfig(g, f);
		return this.getOrientationSpecificConfig(e, f, h)
	},
	getVirtualResolution: function(d) {
		var c = this.getConfigForCurrentDeviceState(d, false, true);
		if (c !== null) {
			return c
		}
		return null
	},
	getTopAboveGame: function(d) {
		var c = this.getSpaceAboveGame();
		return Math.round(c * d - c)
	},
	getTopInGame: function(b) {
		return Math.round(this.getGameHeight() * b)
	},
	getTopBelowGame: function(b) {
		return Math.round(this.getGameHeight() + b * this.getSpaceBelowGame())
	},
	getBottomAboveGame: function(b) {
		return Math.round(-1 * this.getSpaceAboveGame() * b)
	},
	getBottomInGame: function(b) {
		return Math.round(this.getGameHeight() * b)
	},
	getBottomBelowGame: function(d) {
		var c = this.getSpaceBelowGame();
		return Math.round(d * c - c)
	},
	getSpaceAboveGame: function() {
		var c = Game.stage.getGameContainer().getBoundingClientRect(),
			d = 1 / this.getScale();
		return c.top * d
	},
	getGameHeight: function() {
		return this.resolutionProperties.resolution.height
	},
	getSpaceBelowGame: function() {
		var i = this,
			f = Game.stage.getGameContainer().getBoundingClientRect(),
			g = 1 / i.getScale(),
			h = i.getInnerScreenSize().height,
			j = parseInt(document.getElementById("viewport").style.top, 10) + f.height;
		return (h - j) * g
	},
	getCroppedCanvasTopOffsetToBottom: function() {
		var c = this,
			d = c.getResolution();
		return d.height
	},
	getCroppedViewportBottomOffset: function() {
		var d = this,
			e = d.getResolution(),
			f;
		f = e.height - window.innerHeight;
		return Math.abs(f)
	},
	getSupportedPlatforms: function() {
		return this.supportedPlatforms
	},
	getCurrentPlatform: function() {
		return this.platform
	},
	getCurrentPlatformCSS: function() {
		return this.platformCSS
	},
	checkSoundSupport: function() {
		var b = this;
		b.supportsWebAudio = Sys.isDefined(window.AudioContext);
		if (Sys.isAndroidDevice && !Sys.isChrome || Sys.isIphone3GS) {
			b.supportsWebAudio = false
		} else {
			if (Sys.isAndroidDevice && Sys.isAndroid430 && Sys.isChrome280 && (Sys.isSamsungS.model === "s4" || Sys.isSamsungS.model === "s3")) {
				b.supportsWebAudio = false
			}
		}
	},
	setupPageVisibility: function() {
		var h = this,
			g, f, e = function(a) {
				h.onPageVisibilityChange(a, document[g])
			};
		if (typeof document.hidden !== "undefined") {
			g = "hidden";
			f = "visibilitychange"
		} else {
			if (typeof document.mozHidden !== "undefined") {
				g = "mozHidden";
				f = "mozvisibilitychange"
			} else {
				if (typeof document.msHidden !== "undefined") {
					g = "msHidden";
					f = "msvisibilitychange"
				} else {
					if (typeof document.webkitHidden !== "undefined") {
						g = "webkitHidden";
						f = "webkitvisibilitychange"
					}
				}
			}
		}
		if (typeof document.addEventListener === "undefined" || typeof g === "undefined") {} else {
			document.addEventListener(f, e, false)
		}
	},
	onPageVisibilityChange: function(d, c) {
		this.fireEvent("pageVisibilityChanged_event", c)
	},
	orientation: function() {
		return this.getOrientation()
	},
	onOrientationChange: function(b) {
		if (Sys.isDefined(b)) {
			this.deviceOrientation = b.orientation
		}
		this.fireEvent("environmentOrientationChanged_event")
	},
	onSizeChange: function(b) {
		if (Sys.isDefined(b)) {
			this.screenSize = {
				width: b.width,
				height: b.height
			}
		}
	},
	getScreenSize: function() {
		return {
			width: window.outerWidth,
			height: window.outerHeight
		}
	},
	getRealScreenSize: function() {
		var e = this,
			d, f;
		if (Platform.isDesktopDevice) {
			return e.getInnerScreenSize()
		}
		if (e.getOrientation() === "PORTRAIT") {
			d = Math.min(window.screen.width, window.screen.height);
			f = Math.max(window.screen.width, window.screen.height)
		} else {
			if (e.getOrientation() === "LANDSCAPE") {
				d = Math.max(window.screen.width, window.screen.height);
				f = Math.min(window.screen.width, window.screen.height)
			}
		}
		return {
			width: d,
			height: f
		}
	},
	getInnerScreenSize: function() {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	},
	getScale: function() {
		return this.scale
	},
	setScale: function(b) {
		this.scale = b
	},
	goTo: function(b) {
		this.fireEvent("request:fullscreen.exit");
		this.setWindowLocation(b)
	},
	setWindowLocation: function(b) {
		setTimeout(function() {
			window.location = Sys.utils.sanitizeURL(b)
		}, 300)
	},
	openNewBrowserTab: function(c, d) {
		window.open(c, d).focus()
	},
	goToLobby: function(h) {
		var j = Resources.readData("lobbyUrl"),
			g = Resources.readData("lobbyUrl"),
			f = Resources.readData("queryData"),
			i = Resources.readData("sessionID");
		if (Sys.isDefined(g) && Sys.isDefined(h)) {
			g = Sys.utils.appendParameterToQuery(g, "reason=" + h)
		}
		if (Sys.isDefined(f)) {
			if (Sys.isDefined(g) && Sys.isDefined(f.gameId)) {
				g = Sys.utils.appendParameterToQuery(g, "gameId=" + f.gameId)
			}
			if (Sys.isDefined(g) && Sys.isDefined(i)) {
				g = Sys.utils.appendParameterToQuery(g, "sessId=" + i)
			}
		}
		if (Sys.isDefined(j) && j !== "") {
			this.goTo(g)
		} else {}
	},
	goToCashier: function() {
		this.goToLobby(5)
	},
	reload: function() {
		window.location.reload()
	},
	getInteractionEvents: function(b) {
		if (Sys.isDefined(b)) {
			return this.interactionEvents[b]
		}
		return this.interactionEvents
	},
	getEventType: function() {
		return this.eventType
	},
	isStartEvent: function(f) {
		var d = this,
			e = Sys.contains(d.interactionEvents.start, f.type);
		if (f.type === "mousedown" && !d.leftButtonClicked(f)) {
			e = false
		}
		return e
	},
	isEndEvent: function(f) {
		var d = this,
			e = Sys.contains(d.interactionEvents.end, f.type);
		if (f.type === "mouseup" && !d.leftButtonClicked(f)) {
			e = false
		}
		return e
	},
	isMoveEvent: function(b) {
		return Sys.contains(this.interactionEvents.move, b.type)
	},
	isCancelEvent: function(b) {
		return Sys.contains(this.interactionEvents.cancel, b.type)
	},
	isScrollEvent: function(b) {
		return Sys.contains(this.interactionEvents.scroll, b.type)
	},
	isKeyUpEvent: function(b) {
		return Sys.contains(this.interactionEvents.keyUp, b.type)
	},
	isKeyDownEvent: function(b) {
		return Sys.contains(this.interactionEvents.keyDown, b.type)
	},
	isKeyPressEvent: function(b) {
		return Sys.contains(this.interactionEvents.keyPress, b.type)
	},
	getMouseWheelEventName: function() {
		if ((Boolean(window.MSInputMethodContext) && Boolean(document.documentMode)) || "onwheel" in document.createElement("div")) {
			return "wheel"
		} else {
			if (typeof document.onmousewheel !== "undefined") {
				return "mousewheel"
			}
		}
		return "DOMMouseScroll"
	},
	isTouchCapable: function() {
		return "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch || window.navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0
	},
	defineInputEvents: function() {
		var m = this,
			r = [],
			p = [],
			o = [],
			j = [],
			k = [],
			q = [],
			l = [],
			n = [];
		if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
			r.push(window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown");
			p.push(window.navigator.pointerEnabled ? "pointermove" : "MSPointerMove");
			o.push(window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp");
			j.push(window.navigator.pointerEnabled ? "pointerout" : "MSPointerOut");
			if (!m.isTouchCapable()) {
				k.push(m.getMouseWheelEventName())
			}
			n.push("pointerEvent")
		} else {
			if (m.isTouchCapable()) {
				r.push("touchstart");
				p.push("touchmove");
				o.push("touchend");
				j.push("touchcancel");
				n.push("touchEvent")
			}
			if (!Platform.isAndroidStockBrowser) {
				r.push("mousedown");
				p.push("mousemove");
				o.push("mouseup");
				j.push("mouseout");
				k.push(m.getMouseWheelEventName());
				n.push("mouseEvent")
			}
		}
		if (m.platform === "desktop") {
			q.push("keyup");
			l.push("keydown")
		}
		m.interactionEvents = {
			start: r,
			move: p,
			end: o,
			cancel: j,
			keyUp: q,
			keyDown: l,
			scroll: k
		};
		m.eventType = n
	},
	leftButtonClicked: function(b) {
		if ("buttons" in b && b.buttons !== 0) {
			return b.buttons === 1
		} else {
			if ("which" in b) {
				return b.which === 1
			}
		}
		return b.button === 0
	}
};
Sys.Environment = Sys.extend(Sys.Observable, Sys.Environment, "Sys.Environment");
window.Environment = new Sys.Environment();
Sys.ns("Sys");
Sys.Resources = {
	constructor: function() {
		var b = this;
		Sys.Resources.superclass.constructor.apply(b, arguments);
		b.init()
	},
	init: function() {
		this.data = {}
	},
	readData: function(b) {
		return this.data[b]
	},
	storeData: function(c, d) {
		this.data[c] = d;
		this.fireEvent("notify:resources.dataStored", c);
		return this.data[c]
	},
	processAudio: function(g) {
		var j = this,
			k = j.readData(g),
			i = window.AudioContext,
			h = new i(),
			l;
		h.decodeAudioData(k, function(a) {
			l = a;
			j.storeData("decoded:" + g, {
				context: h,
				buffer: l
			});
			j.fireEvent("notify:resources.soundDecoded")
		}, function() {})
	},
	removeData: function(b) {
		delete this.data[b]
	}
};
Sys.Resources = Sys.extend(Sys.Observable, Sys.Resources, "Sys.Resources");
window.Resources = new Sys.Resources();
Sys.ns("Sys");
Sys.ns("Services");
Sys.Storage = {
	constructor: function() {
		Sys.Storage.superclass.constructor.apply(this, arguments);
		this.init()
	},
	init: function() {
		this.data = {}
	},
	readData: function(b) {
		return this.data[b]
	},
	storeData: function(c, d) {
		this.data[c] = d;
		return this.data[c]
	},
	removeData: function(b) {
		delete this.data[b]
	}
};
Sys.Storage = Sys.extend(Sys.Observable, Sys.Storage, "Sys.Storage");
Services.storage = new Sys.Storage();
Array.prototype.sum = function() {
	var d = 0,
		e, f;
	for (e = 0, f = this.length; e < f; e++) {
		d += this[e]
	}
	return d
};
Array.prototype.min = function() {
	return this.length === 0 ? undefined : Math.min.apply(Math, this)
};
Array.prototype.max = function() {
	return this.length === 0 ? undefined : Math.max.apply(Math, this)
};
Array.prototype.average = function() {
	if (this.length === 0) {
		return undefined
	}
	return this.sum() / this.length
};
Array.prototype.indexOf = function(e) {
	var f = this.length,
		d;
	for (d = -1; ++d < f;) {
		if (this[d] === e) {
			return d
		}
	}
	return -1
};
Array.prototype.contains = function(b) {
	return this.indexOf(b) !== -1
};
Array.prototype.last = function() {
	return this[this.length - 1]
};
Array.prototype.remove = Array.prototype.remove || function(c) {
	var d = this.indexOf(c);
	if (d === -1) {
		return
	}
	this.splice(d, 1)
};
(function() {
	var b = String.prototype.trim;
	if (typeof b !== "function") {
		String.prototype.trim = function() {
			return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
		}
	}
}());
String.prototype.contains = function(b) {
	if (b === "") {
		return false
	}
	return (this.indexOf(b) !== -1)
};
if (typeof Function.prototype.bind !== "function") {
	Function.prototype.bind = function(d) {
		var f = this,
			e = Array.prototype.slice.call(arguments, 1);
		return function() {
			f.apply(d, e.concat(Array.prototype.slice.call(arguments)))
		}
	}
}
Sys.UserInputUtils = {
	getDOMElementFromCoordinates: function(c) {
		var d;
		if (Sys.isObj(c) && (!Sys.isDefined(c.x) || !Sys.isDefined(c.y))) {
			return null
		}
		d = document.elementFromPoint(c.x, c.y);
		if (!Sys.isEmpty(d) && d.nodeType === 3) {
			d.target = d.parentNode
		}
		return d
	},
	getUserInputCoordinates: function(d) {
		var c = {
			x: d.changedTouches ? d.changedTouches[0].clientX : d.clientX,
			y: d.changedTouches ? d.changedTouches[0].clientY : d.clientY
		};
		return c
	},
	getDOMElementFromEvent: function(b) {
		return Sys.UserInputUtils.getDOMElementFromCoordinates(Sys.UserInputUtils.getUserInputCoordinates(b))
	},
	calculateMetrics: function(d) {
		var e = d.getBoundingClientRect(),
			f = d.offsetWidth / e.width;
		return {
			top: e.top,
			left: e.left,
			width: e.width,
			height: e.height,
			scale: f
		}
	},
	getCoordinatesRelativeToElement: function(l, m) {
		var n = Sys.UserInputUtils.calculateMetrics(m),
			k = l.x - n.left,
			h = l.y - n.top,
			i = k * n.scale,
			j = h * n.scale;
		return {
			x: i,
			y: j
		}
	},
	isParentAndChildElements: function(d, c) {
		if (d === c) {
			return true
		} else {
			if (c && c !== document.body && c.parentElement) {
				return this.isParentAndChildElements(d, c.parentElement)
			}
		}
		return false
	},
	isCoordinateTarget: function(d, c) {
		return Sys.UserInputUtils.isParentAndChildElements(d, Sys.UserInputUtils.getDOMElementFromCoordinates(c))
	},
	isEventTarget: function(d, c) {
		return Sys.UserInputUtils.isParentAndChildElements(d, Sys.UserInputUtils.getDOMElementFromEvent(c))
	},
	isUserInputInSegment: function(o, m, i) {
		var u = m,
			v = i,
			q, t, p, r, n, s;
		if (!Sys.isDefined(o) || !Sys.isDefined(u)) {
			return false
		}
		if (!Sys.isArray(u)) {
			u = [u]
		}
		v = Sys.isDefined(v) ? v : true;
		t = v ? Environment.getWindowToVirtualScale(3) : 1;
		p = o.x * t;
		r = o.y * t;
		for (s = -1, q = u.length; ++s < q;) {
			n = u[s];
			if (p >= n.x && p <= n.x + n.width && r >= n.y && r <= n.y + n.height) {
				return true
			}
		}
		return false
	}
};
Sys.ns("Core");
Core.LanguageManager = {
	constructor: function() {
		var b = this;
		Core.LanguageManager.superclass.constructor.apply(b, arguments);
		b.texts = {};
		b.errorTexts = {};
		b.setupEvents()
	},
	setupEvents: function() {
		var b = this;
		b.on({
			"notify:resources.dataStored": b.preload
		})
	},
	preload: function(g) {
		var l = this,
			j, h, k, i;
		if (g === "languageXML") {
			j = Resources.readData(g);
			h = Sys.utils.XMLHelper.findAll("ds", j.documentElement);
			Sys.each(h, function(a) {
				i = Sys.utils.XMLHelper.getAttributeValue("name", a);
				k = a.textContent;
				l.texts[i] = k
			});
			l.fireEvent("languageLoaded_event")
		}
	},
	getErrorText: function(b) {
		if (this.hasText(b)) {
			return this.getText(b)
		}
		return "[Error ID not found]"
	},
	hasText: function(b) {
		return Sys.isDefined(this.texts[b])
	},
	getText: function(j, n) {
		var l = this,
			m = "",
			k, h, i;
		if (!l.hasText(j)) {
			k = "[" + j + " not defined]";
			return k
		} else {
			if (l.texts[j] === "") {
				k = "[" + j + " not translated]";
				return k
			}
		}
		i = l.texts[j];
		i = i.replace("%2B", "+");
		if (n) {
			h = Sys.utils.getNodesByFormat(i, n, l);
			Sys.each(h, function(a) {
				if (Sys.isString(a)) {
					m += a
				} else {
					m += a.data.toString()
				}
			}, l);
			return m
		}
		return i
	}
};
Core.LanguageManager = Sys.extend(Sys.Observable, Core.LanguageManager, "Core.LanguageManager");
Sys.ns("Language");
Language.Keys = {
	accountUnavailable: "OCTaccountUnavailable",
	additonalFreeSpinsWon: "OCTadditonalFreeSpinsWon",
	autoplay: "OCTautoplayPanelLabel",
	autoplay_advancedSettings: "OCTadvancedSettings",
	autoplay_numberSpins: "OCTnumberSpins",
	autoplay_panelStartText: "OCTautoplayPanelStartText",
	autoplay_setting_stopAutoPlay: "OCTstopAutoPlayColon",
	autoplay_setting_ifCashDecreasesBy: "OCTifCashDecreasesBy",
	autoplay_setting_ifCashIncreasesBy: "OCTifCashIncreasesBy",
	autoplay_setting_ifFBonusIsStarted: "OCTifFBonusIsStarted",
	autoplay_setting_ifFreeSpinsIsStarted: "OCTifFreeSpinsIsStarted",
	autoplay_setting_ifWinExeeds: "OCTifWinExeeds",
	autoplay_setting_onAnyWin: "OCTonAnyWin",
	autoplay_setting_ifCashDecreasesByInfoTouch: "OCTlossLimitInfoTouch",
	autoplay_setting_ifCashDecreasesByInfo: "OCTlossLimitInfo",
	autoplay_setting_ifCashDecreasesByWarning: "OCTlossLimitWarning",
	autoplay_setting_ifCashDecreasesByWarningTouch: "betExceedCDB",
	autoplay_stopAutoPlay: "OCTstopAutoPlay",
	autoplay_stopText: "OCTautoplayStopText",
	autoSpins: "OCTautoSpins",
	betColonVar: "OCTbetColonVar",
	betInCash: "OCTbetInCash",
	betInCoins: "OCTbetInCoins",
	betLevel: "OCTbetlevel",
	betSettings_uc: "OCTbetSettingsCaps",
	bigWin: "OCTbigWin",
	bonusAwardedTitle: "bonusAwardedTitle",
	bonusAwardedCongrats: "bonusAwardedCongrats",
	btn_autoplay: "OCTautoplayButton",
	btn_casino: "OCTcasino_btn",
	btn_checkEnd: "OCTCheckEndButton",
	btn_close: "OCTclose_btn",
	btn_continue: "OCTContinue",
	btn_deposit: "OCTdeposit_btn",
	btn_login: "OCTlogin_btn",
	btn_maxbet: "OCTmaxbetbutton",
	btn_no: "OCTbtnNo",
	btn_ok: "OCTbtnOK",
	btn_reduceBet: "OCTreduceBet_btn",
	btn_reload: "OCTreload_btn",
	btn_sessionTimeOut: "OCTreload_btnRev",
	btn_yes: "OCTbtnYes",
	btn_addValue: "addValue",
	cash: "OCTcash",
	cashColon: "OCTcashColon",
	cashColonVar: "OCTcashColonVar",
	coinsColonVar: "OCTcoinsColonVar",
	coinsWonColon: "OCTcoinsWonColon",
	coinValue: "OCTcoinValue",
	congratulations: "OCTcongratsLC",
	congratulations_uc: "OCTcongratsUC",
	connectionLost: "OCTconnectionLost",
	connectionQualityPoor: "OCTconnectionQualityPoor",
	"continue": "OCTContinue",
	continue_uc: "OCTbutton_CONTINUE",
	continuePlaying: "OCTcontinuePlaying",
	deposit: "OCTdeposit",
	depositPlay: "OCTdepositPlay",
	error: "OCTerror",
	freeRounds_expired: "OCTfreerounds",
	freeRoundsFinished: "OCTfreeRoundsFinished",
	freeRoundsLeftColon: "OCTFreeRoundsLeftwithColon",
	freeRoundsVar: "OCTfreeRoundsVar",
	freeSpins: "OCTfreeSpinsUC",
	freeSpinsLeftColonVar: "OCTfreeSpinsLeftColonVar",
	gameHistory: "OCTgameHistory",
	gameHistory_uc: "OCTgameHistoryHeadingUC",
	gameHistoryHeading: "OCTgameHistoryHeadingUC",
	gameRules_uc: "OCTgameRulesUC",
	gameSettingsPanelLabel: "OCTslidePanelLabel",
	gameUnavailable: "OCTgameUnavailable",
	haveFreeRounds: "OCThaveFreeRounds",
	historyNotAvailable: "OCThistoryNotAvailable",
	landscapeMode: "OCTlandscapeMode",
	level: "OCTlevel",
	loading: "OCTloadingText",
	loadingDots: "OCTloading",
	loadingTakesLonger: "OCTloadingTakesLonger",
	lostConnectInactivity: "OCTlostConnectInactivity",
	machinetext_bet: "OCTmachinetext_bet",
	machinetext_coins: "OCTmachinetext_coins",
	machinetext_coinvalue: "OCTmachinetext_coinvalue",
	machinetext_win: "OCTmachinetext_win",
	megaWin: "OCTmegaWin",
	messageCaption: "OCTmessagecaption",
	newHistoryWindow: "OCTnewHistoryWindow",
	outOfMoney: "OCToutOfMoney",
	paytable_betLineWinsLeftToRightOnly: "OCTbetLineWinsLeftToRightOnly",
	paytable_extraInfo: "OCTextraInfo",
	paytable_highest: "OCTpaytableHighest",
	paytable_symbolPayout: "OCTsymbolPayout",
	paytable_uc: "OCTbutton_paytableUC",
	paytable_voidAllPays: "OCTvoidAllPays",
	paytable_winningBetLinesHeading: "OCTwinningBetLinesHeading",
	playingForFun: "OCTplayingForFun",
	youPlayingForFun: "OCTyouPlayingFun",
	playLimit: "OCTplayLimit",
	quickSpin: "OCTquickSpin",
	rc_checkPlayingLost: "OCTRCheckPlayingLost",
	rc_checkPlayingWon: "OCTRCheckPlayingWon",
	rc_checkReminder: "OCTRCcheckReminder",
	reduce: "OCTreduce",
	reload: "OCTreload",
	reset: "OCTreset",
	restoredGameHeader: "OCTrestoredGameHeader",
	returnToLobby: "OCTreturnToLobby",
	roundsLeft: "OCTroundsLeft",
	roundsUseAcctMoney: "OCTroundsUseAcctMoney",
	sessionTimeOut: "OCTsessionTimeOut",
	setting_gameSound: "OCTgameSound",
	setting_gameVibration: "OCTgameVibration",
	setting_introGame: "OCTintroGameSetting",
	setting_introScreeGame: "OCTintroScreeGameSetting",
	setting_leftHandMode: "OCTleftHandMode",
	setting_quickSpinGame: "OCTquickSpinGameSetting",
	setting_spaceSpin: "OCTspaceSpin",
	skipIntro: "OCTskipIntro",
	slowConnection: "OCTslowConnection",
	soundSettings_uc: "OCTsoundSettingsCaps",
	spinSettings_uc: "OCTspinSettingsCaps",
	spinsLeftText: "OCTspinsLeftText",
	startFreespins: "OCTstartFreeSpins",
	stopIfFreeSpins: "OCTstopIfFreeSpins",
	superMegaWin: "OCTsuperMegaWin",
	totalbet: "OCTtotalbet",
	totalWin: "OCTTotalWinwithColonVar",
	totalWinColon: "OCTtotalWinWithColon",
	totalWinColon_uc: "OCTtotalWinUCnoVar",
	totalWinColonVar: "OCTtotalWinColonVar",
	totalWinColonVar_uc: "OCTTotalWinwithColonUC",
	varRetriggerFSNoSpan: "OCTvarRetriggerFSNoSpan",
	win: "OCTWin",
	winColon_uc: "OCTwinColonUC",
	winColonVar: "OCTwinColonVar",
	winUpTo: "OCTwinUpTo",
	youWin: "OCTyouWinUCNoExclamation",
	youWonCoins: "OCTyouWonCoins",
	deviceBestGameExperience: "deviceBestGameExperience",
	deviceBrowserUpdateMust: "deviceBrowserUpdateMust",
	deviceOptimizedFor: "deviceOptimizedFor",
	deviceUpdateBrowser: "deviceUpdateBrowser",
	deviceUpdateOS: "deviceUpdateOS",
	deviceUseBrowser: "deviceUseBrowser",
	gameOptimisedFor: "gameOptimisedFor",
	MGcontinueYesNo: "MGcontinueYesNo",
	MGdeviceNoSupport: "MGdeviceNoSupport",
	MGnoOSSupport: "MGnoOSSupport",
	optimisedForVersion: "optimisedForVersion",
	upgradeIn: "upgradeIn"
};
Sys.UserInput = {
	constructor: function() {
		Sys.UserInput.superclass.constructor.apply(this, arguments);
		this.init()
	},
	init: function() {
		var m = this,
			n, k = Environment.getInteractionEvents("scroll"),
			o = Environment.getInteractionEvents("keyUp"),
			p = Environment.getInteractionEvents("keyDown"),
			i = Environment.getInteractionEvents("start"),
			j = Environment.getInteractionEvents("move"),
			l = Environment.getInteractionEvents("end");
		m.setupData();
		m.interactionEventHandlers = {
			start: m.handleInteractionStart.bind(m),
			end: m.handleInteractionEnd.bind(m),
			cancel: m.handleInteractionEnd.bind(m),
			move: m.handleInteractionMove.bind(m),
			keyUp: m.handleInteractionKeyUp.bind(m),
			keyDown: m.handleInteractionKeyDown.bind(m),
			scroll: m.handleInteractionScroll.bind(m)
		};
		m.on({
			"request:userInputManager.activateExclusivity": m.activateExclusivity,
			"request:userInputManager.deactivateExclusivity": m.deactivateExclusivity,
			"request:userInputManager.allowInteractions": m.setState.bind(m, "active"),
			"request:userInputManager.ignoreAllInteractions": m.setState.bind(m, "deactivated"),
			"request:userInputManager.allowPropagation": this.storeData.bind(m, "allowPropagation", true),
			"request:userInputManager.disAllowPropagation": this.storeData.bind(m, "allowPropagation", false)
		});
		if (!Sys.isEmpty(document.body)) {
			for (n = -1; ++n < i.length;) {
				document.body.addEventListener(i[n], m.interactionEventHandlers.start, true)
			}
			for (n = -1; ++n < j.length;) {
				document.body.addEventListener(j[n], m.interactionEventHandlers.move, false)
			}
			for (n = -1; ++n < l.length;) {
				document.body.addEventListener(l[n], m.interactionEventHandlers.end, true)
			}
			if (Sys.isDefined(o[0])) {
				for (n = -1; ++n < o.length;) {
					document.addEventListener(o[n], m.interactionEventHandlers.keyUp, false)
				}
			}
			if (Sys.isDefined(p[0])) {
				for (n = -1; ++n < p.length;) {
					document.addEventListener(p[n], m.interactionEventHandlers.keyDown, false)
				}
			}
			if (Sys.isDefined(k[0])) {
				for (n = -1; ++n < k.length;) {
					document.body.addEventListener(k[n], m.interactionEventHandlers.scroll, true)
				}
			}
			m.disableGestureEvents()
		}
		if (Sys.isInIFrame) {
			m.iFrame = window
		}
	},
	setupData: function() {
		this.data = {
			standardEvents: {
				start: "notify:userInputManager.userInputStarted",
				end: "notify:userInputManager.userInputEnded",
				move: "notify:userInputManager.userInputMove",
				hover: "notify:userInputManager.userInputHover",
				cancel: "notify:userInputManager.userInputCanceled",
				keyUp: "notify:userInputManager.userInputKeyUp",
				keyDown: "notify:userInputManager.userInputKeyDown",
				scroll: "notify:userInputManager.userInputScroll"
			},
			exclusiveEvents: {},
			allowPropagation: false,
			exclusiveQueue: []
		}
	},
	activateExclusivity: function(d) {
		var f = this,
			e = f.readData("exclusiveQueue");
		if (f.readData("exclusivityRequested")) {
			e.push(d)
		} else {
			if (f.readData("activeInteraction")) {
				f.sendInputEvent("end", {
					clientX: -1,
					clientY: -1
				})
			}
			f.storeData("exclusivityRequested", true);
			f.setExclusiveEvents(d)
		}
	},
	deactivateExclusivity: function(j) {
		var i = this,
			g, k = i.readData("exclusiveEvents"),
			h = i.readData("exclusiveQueue"),
			l;
		if (Sys.isString(j) && k.requester === j) {
			g = true
		} else {
			if (Sys.isObj(j)) {
				g = true;
				Sys.iterate(j, function(b, a) {
					if (k[b] !== a) {
						g = false
					}
				})
			}
		}
		if (g) {
			if (h.length > 0) {
				i.setExclusiveEvents(h.shift())
			} else {
				i.storeData("exclusivityRequested", false)
			}
		} else {
			l = h.indexOf(j);
			if (l >= 0) {
				h.splice(l, 1)
			}
		}
	},
	setExclusiveEvents: function(c) {
		var d;
		if (Sys.isString(c)) {
			d = {
				requester: c,
				start: "notify:userInputManager." + c + "ExclusiveStart",
				end: "notify:userInputManager." + c + "ExclusiveEnd",
				keyUp: "notify:userInputManager." + c + "ExclusiveKeyUp",
				keyDown: "notify:userInputManager." + c + "ExclusiveKeyDown",
				move: "notify:userInputManager." + c + "ExclusiveMove",
				hover: "notify:userInputManager." + c + "ExclusiveHover",
				cancel: "notify:userInputManager." + c + "ExclusiveCancel",
				scroll: "notify:userInputManager." + c + "ExclusiveScroll"
			}
		} else {
			d = c
		}
		this.storeData("exclusiveEvents", d)
	},
	checkPropagation: function(c) {
		var d = (c.touches) ? c.touches.length : 1;
		if (this.readData("allowPropagation") && d < 2) {
			return
		}
		this.preventPropagation(c)
	},
	preventPropagation: function(b) {
		b.preventDefault();
		b.stopPropagation()
	},
	handleInteractionStart: function(h) {
		var e = this,
			g, f = e.readData("activeInteraction");
		e.checkPropagation(h);
		if (e.isState("deactivated") || !Environment.isStartEvent(h) || Sys.isDefined(f)) {
			return
		}
		g = Sys.UserInputUtils.getUserInputCoordinates(h);
		f = {
			target: Sys.UserInputUtils.getDOMElementFromCoordinates(g)
		};
		if (h.type === "touchstart") {
			f.identifier = h.targetTouches[0].identifier
		}
		e.storeData("activeInteraction", f);
		if (Sys.isInIFrame) {
			e.iFrame.focus()
		}
		e.sendInputEvent("start", h)
	},
	handleInteractionMove: function(h) {
		var e = this,
			g = true,
			f = e.readData("activeInteraction");
		e.checkPropagation(h);
		if (e.isState("deactivated") || !Environment.isMoveEvent(h)) {
			return
		}
		if (h.type === "touchmove") {
			g = e.isTouchInList(h.changedTouches, f.identifier)
		}
		if (g) {
			e.sendInputEvent(Sys.isDefined(f) ? "move" : "hover", h)
		}
	},
	handleInteractionEnd: function(g) {
		var h = this,
			f = false,
			e = h.readData("activeInteraction");
		h.checkPropagation(g);
		if (h.isState("deactivated") || !Sys.isDefined(e) || (!Environment.isEndEvent(g) && !Environment.isCancelEvent(g))) {
			return
		}
		if (Environment.isEndEvent(g)) {
			if (g.type === "touchend" || g.type === "touchcancel") {
				f = h.isTouchInList(g.touches, e.identifier)
			}
			if (!f) {
				h.storeData("activeInteraction", undefined);
				h.sendInputEvent("end", g)
			}
		}
	},
	handleInteractionScroll: function(f) {
		var d = this,
			e = d.readData("activeInteraction");
		d.checkPropagation(f);
		if (d.isState("deactivated") || Sys.isDefined(e) || !Environment.isScrollEvent(f)) {
			return
		}
		d.sendInputEvent("scroll", f)
	},
	handleInteractionKeyUp: function(f) {
		var d = this,
			e = d.readData("activeInteraction");
		if (d.isState("deactivated") || e !== f.keyCode || !Environment.isKeyUpEvent(f)) {
			return
		}
		d.removeData("activeInteraction");
		d.sendInputEvent("keyUp", f)
	},
	handleInteractionKeyDown: function(f) {
		var d = this,
			e = d.readData("activeInteraction");
		if (d.isState("deactivated") || Sys.isDefined(e) || !Environment.isKeyDownEvent(f)) {
			return
		}
		d.storeData("activeInteraction", f.keyCode);
		d.sendInputEvent("keyDown", f)
	},
	isTouchInList: function(d, e) {
		var f = false;
		Sys.each(d, function(a) {
			if (a.identifier === e) {
				f = true;
				return false
			}
			return true
		});
		return f
	},
	sendInputEvent: function(e, f) {
		var d = this.getEvent(e);
		if (Sys.isDefined(d)) {
			this.fireEvent(d, Sys.UserInputUtils.getUserInputCoordinates(f), f)
		}
	},
	getEvent: function(c) {
		var d = this.readData("exclusivityRequested");
		return d ? this.readData("exclusiveEvents")[c] : this.readData("standardEvents")[c]
	},
	disableGestureEvents: function() {
		var b = this;
		document.body.addEventListener("gesturestart", b.preventPropagation.bind(b), false);
		document.body.addEventListener("gesturechange", b.preventPropagation.bind(b), false);
		document.body.addEventListener("gestureend", b.preventPropagation.bind(b), false)
	},
	storeData: function(d, c) {
		this.data[d] = c
	},
	readData: function(b) {
		return this.data[b]
	},
	removeData: function(b) {
		delete this.data[b]
	},
	setState: function(b) {
		this.state = b
	},
	readState: function() {
		return this.state
	},
	isState: function(b) {
		return b === this.state
	}
};
Sys.UserInput = Sys.extend(Sys.Observable, Sys.UserInput, "Sys.UserInput");
window.UserInput = new Sys.UserInput();
Sys.ns("Interface.utils");
Interface.utils.UserInputBase = {
	CSS: {},
	constructor: function(b) {
		Interface.utils.UserInputBase.superclass.constructor.apply(this, arguments);
		this.init(b)
	},
	enable: function() {
		var b = this;
		b.enabled = true;
		b.startListeningToUserInput();
		b.container.removeCls(b.CSS.disabled)
	},
	disable: function() {
		var b = this;
		b.enabled = false;
		b.stopListeningToUserInput();
		b.container.addCls(b.CSS.disabled)
	},
	isEnabled: function() {
		return this.enabled
	},
	lock: function(c) {
		var d = this;
		if (!d.locker.contains(c)) {
			d.locker.push(c)
		}
		d.disable()
	},
	unlock: function(f) {
		var e = this,
			d = e.locker.indexOf(f);
		if (d >= 0) {
			e.locker.splice(d, 1)
		}
		if (!e.isLocked()) {
			e.enable()
		}
	},
	isLocked: function() {
		return this.locker.length !== 0
	},
	getContainer: function() {
		return this.container
	},
	init: function(d) {
		var c = this;
		d = d || {};
		d.cls = Sys.isString(d.cls) ? d.cls : "";
		c.id = d.id;
		c.locker = [];
		if (Sys.isDefined(d.CSS)) {
			c.CSS = Sys.applyIf(d.CSS, c.CSS)
		}
		c.setupContainer(d);
		if (d.enabled) {
			c.enable()
		} else {
			c.disable()
		}
	},
	onUserInputStart: function() {},
	onUserInputEnd: function() {},
	onUserInputMove: function() {},
	onUserInputCanceled: function() {},
	setupContainer: function() {
		var b = this;
		b.container = new Sys.Element({
			id: b.id,
			tag: "div",
			cls: b.CSS.base
		})
	},
	startListeningToUserInput: function() {
		var b = this;
		b.on({
			"notify:userInputManager.userInputStarted": b.onUserInputStart,
			"notify:userInputManager.userInputEnded": b.onUserInputEnd,
			"notify:userInputManager.userInputMove": b.onUserInputMove,
			"notify:userInputManager.userInputCanceled": b.onUserInputCanceled
		})
	},
	stopListeningToUserInput: function() {
		var b = this;
		b.removeListener("notify:userInputManager.userInputStarted");
		b.removeListener("notify:userInputManager.userInputEnded");
		b.removeListener("notify:userInputManager.userInputMove");
		b.removeListener("notify:userInputManager.userInputCanceled")
	},
	setValue: function() {}
};
Interface.utils.UserInputBase = Sys.extend(Sys.Observable, Interface.utils.UserInputBase, "Interface.utils.UserInputBase");
Sys.ns("Interface.utils");
Interface.utils.Button = {
	CSS: {
		base: "button",
		pressed: "button_pressed",
		disabled: "button_disabled"
	},
	DEFAULT_USER_INPUT_EVENTS: {
		started: "notify:userInputManager.userInputStarted",
		ended: "notify:userInputManager.userInputEnded",
		move: "notify:userInputManager.userInputMove",
		canceled: "notify:userInputManager.userInputCanceled"
	},
	constructor: function(b) {
		Interface.utils.Button.superclass.constructor.apply(this, arguments)
	},
	enable: function() {
		var b = this;
		b.enabled = true;
		b.container.removeCls(b.CSS.disabled);
		if (b.enableInteraction) {
			b.startListeningToUserInput()
		}
	},
	disable: function() {
		var b = this;
		b.enabled = false;
		b.container.addCls(b.CSS.disabled);
		if (b.enableInteraction) {
			b.stopListeningToUserInput()
		}
	},
	setText: function(b) {
		this.label = b;
		this.container.el.textContent = b
	},
	getText: function() {
		return this.label
	},
	show: function(b) {
		this.container.el.style.display = Sys.isDefined(b) ? b : "block"
	},
	hide: function() {
		this.container.el.style.display = "none"
	},
	init: function(d) {
		var c = this;
		Interface.utils.Button.superclass.init.call(c, d);
		if (Sys.isDefined(d.userInputEvents)) {
			c.userInputEvents = d.userInputEvents
		} else {
			c.userInputEvents = c.DEFAULT_USER_INPUT_EVENTS
		}
		c.clickCallback = d.clickCallback;
		c.enableInteraction = Sys.isDefined(c.clickCallback);
		if (d.hidden === true) {
			c.hide()
		}
		if (Sys.isString(d.label)) {
			c.setText(d.label)
		}
	},
	startListeningToUserInput: function() {
		var b = this;
		if (Sys.isDefined(b.userInputEvents.started)) {
			b.addListener(b.userInputEvents.started, b.onUserInputStart)
		}
		if (Sys.isDefined(b.userInputEvents.started)) {
			b.addListener(b.userInputEvents.ended, b.onUserInputEnd)
		}
		if (Sys.isDefined(b.userInputEvents.move)) {
			b.addListener(b.userInputEvents.move, b.onUserInputMove)
		}
		if (Sys.isDefined(b.userInputEvents.canceled)) {
			b.addListener(b.userInputEvents.canceled, b.onUserInputCanceled)
		}
	},
	stopListeningToUserInput: function() {
		var b = this;
		if (Sys.isDefined(b.userInputEvents.started)) {
			b.removeListener(b.userInputEvents.started)
		}
		if (Sys.isDefined(b.userInputEvents.ended)) {
			b.removeListener(b.userInputEvents.ended)
		}
		if (Sys.isDefined(b.userInputEvents.move)) {
			b.removeListener(b.userInputEvents.move)
		}
		if (Sys.isDefined(b.userInputEvents.canceled)) {
			b.removeListener(b.userInputEvents.canceled)
		}
	},
	onUserInputStart: function(c) {
		var d = this;
		if (d.enabled && Sys.UserInputUtils.isCoordinateTarget(d.container.el, c)) {
			d.isActiveInputTarget = true;
			d.container.addCls(d.CSS.pressed)
		}
	},
	onUserInputEnd: function(c) {
		var d = this;
		if (d.isActiveInputTarget && Sys.UserInputUtils.isCoordinateTarget(d.container.el, c)) {
			d.clickCallback()
		}
		d.onUserInputCanceled()
	},
	onUserInputCanceled: function() {
		this.isActiveInputTarget = false;
		this.container.removeCls(this.CSS.pressed)
	}
};
Interface.utils.Button = Sys.extend(Interface.utils.UserInputBase, Interface.utils.Button, "Interface.utils.Button");
Sys.ns("Interface.utils");
Interface.utils.InteractiveContainer = {
	DEFAULT_BUTTON_TEXT: "Add Value",
	CSS: {
		base: "interface-interactiveContainer_base",
		disabled: "interface-interactiveContainer_disabled",
		label: "interface-interactiveContainer_label",
		button_wrapper: "interface-interactiveContainer_buttonWrapper",
		button: "interface-interactiveContainer_button"
	},
	constructor: function(b) {
		Interface.utils.InteractiveContainer.superclass.constructor.apply(this, arguments)
	},
	init: function(d) {
		var c = this;
		d = d || {};
		c.title = d.title;
		c.callback = d.callback;
		c.minValue = d.minValue;
		c.info = d.info || "";
		c.buttonText = d.buttonText || c.DEFAULT_BUTTON_TEXT;
		c.callback = d.callback || function() {};
		c.keyboardResult = {};
		Interface.utils.InteractiveContainer.superclass.init.apply(c, arguments)
	},
	setMinValue: function(b) {
		this.minValue = b
	},
	setupContainer: function(d) {
		var c = this;
		c.container = new Sys.Element({
			id: c.id,
			tag: "div",
			cls: d.cls + " " + c.CSS.base
		});
		if (c.title) {
			c.label = c.container.add(new Sys.Element({
				id: c.id + "_title",
				tag: "div",
				cls: c.CSS.label,
				textContent: c.title
			}))
		}
		c.buttonWrapper = c.container.add(new Sys.Element({
			id: c.id + "_button_wrapper",
			tag: "div",
			cls: c.CSS.button_wrapper
		}));
		c.addButton = c.buttonWrapper.add(new Sys.Element({
			id: c.id + "_button",
			tag: "div",
			cls: String(c.CSS.button),
			textContent: c.buttonText
		}))
	},
	setValue: function(e, h) {
		var g = this,
			f;
		if (Sys.isNumber(e)) {
			f = {
				formattedInputField: Services.moneyManager.formatMoneyCurrencySign(Sys.utils.toInt(e), undefined, 0),
				input: String(Sys.utils.toInt(e / 100)),
				value: Sys.utils.toInt(e / 100),
				cents: e
			};
			if (h !== true) {
				g.keyboardCallback(f)
			} else {
				g.keyboardResult = f;
				g.updateButtonText()
			}
		}
	},
	onUserInputStart: function(b) {
		this.wasInitialInputTarget = Sys.UserInputUtils.isCoordinateTarget(this.buttonWrapper.el, b) && this.enabled
	},
	onUserInputEnd: function(f) {
		var d = this,
			e = Sys.UserInputUtils.isCoordinateTarget(d.buttonWrapper.el, f);
		if (e && d.wasInitialInputTarget) {
			d.requestKeyboard()
		}
		d.wasInitialInputTarget = false
	},
	click: function() {
		this.requestKeyboard()
	},
	requestKeyboard: function() {
		var b = this;
		b.fireEvent("request:keyboard.open", {
			info: b.info,
			label: b.title,
			okCallback: b.keyboardCallback.bind(b),
			cancelCallback: b.keyboardCallback.bind(b),
			minValue: b.minValue
		})
	},
	keyboardCallback: function(d) {
		var c = this;
		if (Sys.isDefined(d)) {
			c.keyboardResult = d
		}
		c.updateButtonText();
		c.callback(c.keyboardResult.cents || 0)
	},
	updateButtonText: function() {
		var c = this,
			d = c.addButton;
		if (c.keyboardResult.value > 0) {
			d.el.textContent = c.keyboardResult.formattedInput;
			d.addCSSClass("interactive_pushed")
		} else {
			d.el.textContent = c.buttonText;
			d.removeCSSClass("interactive_pushed")
		}
	}
};
Interface.utils.InteractiveContainer = Sys.extend(Interface.utils.UserInputBase, Interface.utils.InteractiveContainer, "Interface.utils.InteractiveContainer");
Sys.ns("Core");
Core.Orientation = {
	constructor: function() {
		var b = this;
		Core.Orientation.superclass.constructor.apply(b, arguments);
		b.previousResolution = Environment.getInitialScreenSize();
		b.setupEvents();
		b.setBodyOrientationClass()
	},
	isPortrait: function() {
		return this.getOrientation() === "PORTRAIT"
	},
	isLandscape: function() {
		return this.getOrientation() === "LANDSCAPE"
	},
	getOrientation: function() {
		return Environment.getOrientation()
	},
	orientationHasChanged: function() {
		var e = this.previousResolution,
			f = Environment.getInnerScreenSize(),
			g = Math.floor(e.width / e.height),
			h = Math.floor(f.width / f.height);
		return g !== h
	},
	onVisibilityChange: function(b) {
		if (!b) {
			this.onOrientationChange()
		}
	},
	setupEvents: function() {
		var b = this;
		window.addEventListener("orientationchange", function() {
			b.onOrientationChange()
		}, false);
		b.on({
			"notify:scaling.updated": b.onScalingUpdated,
			pageVisibilityChanged_event: b.onVisibilityChange,
			"request:orientation.forceUpdate": b.onOrientationChange
		})
	},
	onOrientationChange: function() {
		var b = this;
		b.resetOrientationChecker();
		b.fireEvent("notify:orientation.change", b.getOrientation());
		b.setBodyOrientationClass();
		b.orientationChecker = setInterval(function() {
			if (!b.orientationHasChanged()) {
				if (b.timer > 0 && Date.now() - b.timer >= 3000) {
					b.resetOrientationChecker()
				}
				return
			}
			if (b.firstCheckPassed) {
				b.resetOrientationChecker()
			} else {
				b.firstCheckPassed = true;
				b.timer = Date.now()
			}
			b.previousResolution = Environment.getInnerScreenSize();
			b.fireEvent("notify:orientation.changed", b.getOrientation())
		}, 1000 / 60)
	},
	resetOrientationChecker: function() {
		clearInterval(this.orientationChecker);
		this.firstCheckPassed = false;
		this.timer = 0
	},
	onScalingUpdated: function() {
		this.setBodyOrientationClass()
	},
	setBodyOrientationClass: function() {
		var e = Environment.getCurrentPlatformCSS(),
			d = this.getOrientation(),
			f = d === "PORTRAIT" ? e + "_landscape" : e + "_portrait";
		Sys.utils.replaceCSSClassOnBody(f, e + "_" + d.toLowerCase(), true)
	}
};
Core.Orientation = Sys.extend(Sys.Observable, Core.Orientation, "Core.Orientation");
Sys.ns("Core");
Core.Scaling = {
	constructor: function() {
		var b = this;
		Core.Scaling.superclass.constructor.apply(b, arguments);
		b.scalingPrefix = Sys.utils.getPrefixedCSSProperty("transform");
		b.viewport = document.getElementById("viewport");
		b.setGameSize();
		b.addDocumentListeners();
		b.setupEvents()
	},
	setupEvents: function() {
		var b = this;
		b.on({
			"request:scaling.update": b.scale,
			"notify:orientation.change": b.onOrientationChange,
			"notify:orientation.changed": b.onOrientationChanged,
			pageVisibilityChanged_event: b.scale,
			"request:viewport.resize": b.scale,
			"notify:loader.closed": b.scale
		})
	},
	scale: function() {
		var d = this,
			e = Environment.getViewportOrientation(),
			f = d.calculateScale();
		Environment.setScale(f);
		d.setDocumentSize();
		d.scaleGame(f);
		d.fireEvent("notify:viewport.scaled");
		d.fireEvent("notify:scaling.updated");
		d.fireEvent("notify:viewport." + e)
	},
	onOrientationChange: function() {
		this.scale()
	},
	onOrientationChanged: function() {
		if (Environment.allowsCustomCanvasSize()) {
			Environment.updateResolutionProperties();
			this.updateGameSize()
		} else {
			this.onOrientationChange()
		}
	},
	calculateScale: function(n) {
		var o = Resources.readData("config"),
			p = Sys.isObj(o) && Boolean(o.useLetterboxing),
			i = Environment.getResolution(),
			m = n || Platform.hasFullscreenAPI || p ? Environment.getInnerScreenSize() : Environment.getRealScreenSize(),
			k = m.height / i.height,
			j = m.width / i.width,
			l = Math.min(j, k);
		l = this.formatScaleValue(l);
		return l
	},
	scaleGame: function(b) {
		this.viewport.style[this.scalingPrefix] = "scale(" + b + ")";
		this.centerGame(b)
	},
	centerGame: function(g) {
		var f = this.viewport.style,
			e = Environment.resolutionProperties.portraitTopOffset,
			h;
		if (Services.orientation.isPortrait() && Platform.isMobileDevice) {
			h = Math.round(e * Environment.getResolution().height * g) + "px"
		} else {
			h = this.getScaledFullscreenElementOffsetTop(g) + "px"
		}
		f.top = h;
		f.left = this.getScaledFullscreenElementOffsetLeft(g) + "px";
		window.scrollTo(0, 0)
	},
	setDocumentSize: function() {
		var c = document.body.style,
			d = document.documentElement.style;
		d.width = "100%";
		d.height = "100%";
		if (Platform.isDesktopDevice) {
			d.overflow = "hidden"
		}
		c.width = "100%";
		c.height = "100%"
	},
	updateGameSize: function() {
		this.setGameSize();
		this.scale();
		this.fireEvent("notify:scaling.gameSizeChanged")
	},
	setGameSize: function() {
		this.setElementSize(this.viewport)
	},
	setElementSize: function(d) {
		var e = Environment.getResolution(),
			f = d.style;
		f.width = e.width + "px";
		f.height = e.height + "px";
		f[this.scalingPrefix + "Origin"] = "0 0"
	},
	formatScaleValue: function(b) {
		return parseFloat((b).toFixed(3))
	},
	getScaledFullscreenElementOffsetTop: function(f) {
		var e = Environment.getInnerScreenSize().height,
			d = Environment.getResolution().height;
		return this.getScaledOffset(e, d * f)
	},
	getScaledFullscreenElementOffsetLeft: function(f) {
		var d = Environment.getInnerScreenSize().width,
			e = Environment.getResolution().width;
		return this.getScaledOffset(d, e * f)
	},
	getScaledOffset: function(c, d) {
		return Math.round((c - d) / 2)
	},
	addDocumentListeners: function() {
		window.addEventListener("resize", this.scale.bind(this), false)
	}
};
Core.Scaling = Sys.extend(Sys.Observable, Core.Scaling, "Core.Scaling");
(function() {
	var c, d;
	if (Platform.isIOSDevice) {
		c = function() {
			var l = Resources.readData("deviceDetection"),
				p = Sys.utils.XMLHelper,
				m = p.getAttributeValue,
				a = p.findNode("deviceScreenSpecifications", p.findNode("root", l)),
				n = p.findAll("deviceSpecification", a),
				o = n.length,
				b, i;
			for (i = 0; i < o; i++) {
				b = n[i];
				if (window.screen.width === parseInt(m("width", b), 10) && window.screen.height === parseInt(m("height", b), 10) && window.devicePixelRatio === parseInt(m("devicePixelRatio", b), 10)) {
					return [parseInt(m("portraitViewportWidth", b), 10), parseInt(m("portraitViewportHeight", b), 10), parseInt(m("landscapeViewportWidth", b), 10), parseInt(m("landscapeViewportHeight", b), 10), parseInt(m("width", b), 10), parseInt(m("height", b), 10), parseInt(m("devicePixelRatio", b), 10), m("model", b)]
				}
			}
			return undefined
		};
		d = Core.Scaling.prototype.setupEvents;
		Sys.override(Core.Scaling, {
			setupEvents: function() {
				var a = this;
				d.call(a);
				a.on({
					"notify:resourceHandler.priorityListComplete": a.onDeviceDetectionLoaded
				})
			},
			onDeviceDetectionLoaded: function() {
				var a = c();
				if (!Sys.isDefined(a) || Environment.isIniFrame) {
					return
				}
				Resources.storeData("screenSpecification", a);
				this.addCSSClassToBody()
			},
			addCSSClassToBody: function() {
				var a = c(),
					b = Resources.readData("config"),
					f = Sys.isObj(b) && Boolean(b.useLetterboxing);
				if (Sys.isSafari && !window.navigator.standalone && a[7] === "iPhone 5 or 5s") {
					Sys.utils.addCSSClassToBody("iOS_ui")
				}
				if (Sys.isSafari && !window.navigator.standalone) {
					Sys.utils.addCSSClassToBody("iOS")
				}
				if (!f) {
					Sys.utils.addCSSClassToBody("iOS_cropped")
				}
			},
			setDocumentSize: function() {
				var a = document.body.style,
					b = document.documentElement.style;
				b.width = "100%";
				b.height = "100%";
				b.overflow = "hidden";
				a.width = "100%";
				a.height = "100%"
			}
		})
	}
}());
(function(k) {
	var i = Date.now || function() {
		return +new Date()
	};
	var l = 60;
	var j = 1000;
	var g = {};
	var h = 1;
	if (!k.core) {
		k.core = {
			effect: {}
		}
	} else {
		if (!core.effect) {
			core.effect = {}
		}
	}
	core.effect.Animate = {
		requestAnimationFrame: (function() {
			var c = k.requestAnimationFrame || k.webkitRequestAnimationFrame || k.mozRequestAnimationFrame || k.oRequestAnimationFrame;
			var e = !!c;
			if (c && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(c.toString())) {
				e = false
			}
			if (e) {
				return function(m, n) {
					c(m, n)
				}
			}
			var a = 60;
			var p = {};
			var f = 0;
			var o = 1;
			var b = null;
			var d = +new Date();
			return function(m, n) {
				var r = o++;
				p[r] = m;
				f++;
				if (b === null) {
					b = setInterval(function() {
						var q = +new Date();
						var u = p;
						p = {};
						f = 0;
						for (var v in u) {
							if (u.hasOwnProperty(v)) {
								u[v](q);
								d = q
							}
						}
						if (q - d > 2500) {
							clearInterval(b);
							b = null
						}
					}, 1000 / a)
				}
				return r
			}
		})(),
		stop: function(a) {
			var b = g[a] != null;
			if (b) {
				g[a] = null
			}
			return b
		},
		isRunning: function(a) {
			return g[a] != null
		},
		start: function(u, e, c, f, A, B) {
			var y = i();
			var x = y;
			var a = 0;
			var v = 0;
			var z = h++;
			if (!B) {
				B = document.body
			}
			if (z % 20 === 0) {
				var b = {};
				for (var d in g) {
					b[d] = true
				}
				g = b
			}
			var w = function(q) {
				var n = q !== true;
				var o = i();
				if (!g[z] || (e && !e(z))) {
					g[z] = null;
					c && c(l - (v / ((o - y) / j)), z, false);
					return
				}
				if (n) {
					var r = Math.round((o - x) / (j / l)) - 1;
					for (var p = 0; p < Math.min(r, 4); p++) {
						w(true);
						v++
					}
				}
				if (f) {
					a = (o - y) / f;
					if (a > 1) {
						a = 1
					}
				}
				var m = A ? A(a) : a;
				if ((u(m, o, n) === false || a === 1) && n) {
					g[z] = null;
					c && c(l - (v / ((o - y) / j)), z, a === 1 || f == null)
				} else {
					if (n) {
						x = o;
						core.effect.Animate.requestAnimationFrame(w, B)
					}
				}
			};
			g[z] = true;
			core.effect.Animate.requestAnimationFrame(w, B);
			return z
		}
	}
})(this);
var Scroller;
(function() {
	var g = function() {};
	Scroller = function(a, c) {
		this.__callback = a;
		this.options = {
			scrollingX: true,
			scrollingY: true,
			animating: true,
			animationDuration: 250,
			bouncing: true,
			locking: true,
			paging: false,
			snapping: false,
			zooming: false,
			minZoom: 0.5,
			maxZoom: 3,
			speedMultiplier: 1,
			scrollingComplete: g,
			penetrationDeceleration: 0.03,
			penetrationAcceleration: 0.08
		};
		for (var b in c) {
			this.options[b] = c[b]
		}
	};
	var h = function(a) {
		return (Math.pow((a - 1), 3) + 1)
	};
	var j = function(a) {
		if ((a /= 0.5) < 1) {
			return 0.5 * Math.pow(a, 3)
		}
		return 0.5 * (Math.pow((a - 2), 3) + 2)
	};
	var f = {
		__isSingleTouch: false,
		__isTracking: false,
		__didDecelerationComplete: false,
		__isGesturing: false,
		__isDragging: false,
		__isDecelerating: false,
		__isAnimating: false,
		__clientLeft: 0,
		__clientTop: 0,
		__clientWidth: 0,
		__clientHeight: 0,
		__contentWidth: 0,
		__contentHeight: 0,
		__snapWidth: 100,
		__snapHeight: 100,
		__refreshHeight: null,
		__refreshActive: false,
		__refreshActivate: null,
		__refreshDeactivate: null,
		__refreshStart: null,
		__zoomLevel: 1,
		__scrollLeft: 0,
		__scrollTop: 0,
		__maxScrollLeft: 0,
		__maxScrollTop: 0,
		__scheduledLeft: 0,
		__scheduledTop: 0,
		__scheduledZoom: 0,
		__lastTouchLeft: null,
		__lastTouchTop: null,
		__lastTouchMove: null,
		__positions: null,
		__minDecelerationScrollLeft: null,
		__minDecelerationScrollTop: null,
		__maxDecelerationScrollLeft: null,
		__maxDecelerationScrollTop: null,
		__decelerationVelocityX: null,
		__decelerationVelocityY: null,
		setDimensions: function(a, c, e, b) {
			var d = this;
			if (a === +a) {
				d.__clientWidth = a
			}
			if (c === +c) {
				d.__clientHeight = c
			}
			if (e === +e) {
				d.__contentWidth = e
			}
			if (b === +b) {
				d.__contentHeight = b
			}
			d.__computeScrollMax();
			d.scrollTo(d.__scrollLeft, d.__scrollTop, true)
		},
		setPosition: function(a, b) {
			var c = this;
			c.__clientLeft = a || 0;
			c.__clientTop = b || 0
		},
		setSnapSize: function(a, c) {
			var b = this;
			b.__snapWidth = a;
			b.__snapHeight = c
		},
		activatePullToRefresh: function(e, a, b, c) {
			var d = this;
			d.__refreshHeight = e;
			d.__refreshActivate = a;
			d.__refreshDeactivate = b;
			d.__refreshStart = c
		},
		triggerPullToRefresh: function() {
			this.__publish(this.__scrollLeft, -this.__refreshHeight, this.__zoomLevel, true);
			if (this.__refreshStart) {
				this.__refreshStart()
			}
		},
		finishPullToRefresh: function() {
			var a = this;
			a.__refreshActive = false;
			if (a.__refreshDeactivate) {
				a.__refreshDeactivate()
			}
			a.scrollTo(a.__scrollLeft, a.__scrollTop, true)
		},
		getValues: function() {
			var a = this;
			return {
				left: a.__scrollLeft,
				top: a.__scrollTop,
				zoom: a.__zoomLevel
			}
		},
		getScrollMax: function() {
			var a = this;
			return {
				left: a.__maxScrollLeft,
				top: a.__maxScrollTop
			}
		},
		zoomTo: function(r, q, e, b, c) {
			var a = this;
			if (!a.options.zooming) {
				throw new Error("Zooming is not enabled!")
			}
			if (c) {
				a.__zoomComplete = c
			}
			if (a.__isDecelerating) {
				core.effect.Animate.stop(a.__isDecelerating);
				a.__isDecelerating = false
			}
			var o = a.__zoomLevel;
			if (e == null) {
				e = a.__clientWidth / 2
			}
			if (b == null) {
				b = a.__clientHeight / 2
			}
			r = Math.max(Math.min(r, a.options.maxZoom), a.options.minZoom);
			a.__computeScrollMax(r);
			var p = ((e + a.__scrollLeft) * r / o) - e;
			var d = ((b + a.__scrollTop) * r / o) - b;
			if (p > a.__maxScrollLeft) {
				p = a.__maxScrollLeft
			} else {
				if (p < 0) {
					p = 0
				}
			}
			if (d > a.__maxScrollTop) {
				d = a.__maxScrollTop
			} else {
				if (d < 0) {
					d = 0
				}
			}
			a.__publish(p, d, r, q)
		},
		zoomBy: function(c, d, e, b, a) {
			var l = this;
			l.zoomTo(l.__zoomLevel * c, d, e, b, a)
		},
		scrollTo: function(a, b, d, c) {
			var e = this;
			if (e.__isDecelerating) {
				core.effect.Animate.stop(e.__isDecelerating);
				e.__isDecelerating = false
			}
			if (c != null && c !== e.__zoomLevel) {
				if (!e.options.zooming) {
					throw new Error("Zooming is not enabled!")
				}
				a *= c;
				b *= c;
				e.__computeScrollMax(c)
			} else {
				c = e.__zoomLevel
			}
			if (!e.options.scrollingX) {
				a = e.__scrollLeft
			} else {
				if (e.options.paging) {
					a = Math.round(a / e.__clientWidth) * e.__clientWidth
				} else {
					if (e.options.snapping) {
						a = Math.round(a / e.__snapWidth) * e.__snapWidth
					}
				}
			}
			if (!e.options.scrollingY) {
				b = e.__scrollTop
			} else {
				if (e.options.paging) {
					b = Math.round(b / e.__clientHeight) * e.__clientHeight
				} else {
					if (e.options.snapping) {
						b = Math.round(b / e.__snapHeight) * e.__snapHeight
					}
				}
			}
			a = Math.max(Math.min(e.__maxScrollLeft, a), 0);
			b = Math.max(Math.min(e.__maxScrollTop, b), 0);
			if (a === e.__scrollLeft && b === e.__scrollTop) {
				d = false
			}
			e.__publish(a, b, c, d)
		},
		scrollBy: function(a, b, d) {
			var e = this;
			var c = e.__isAnimating ? e.__scheduledLeft : e.__scrollLeft;
			var l = e.__isAnimating ? e.__scheduledTop : e.__scrollTop;
			e.scrollTo(c + (a || 0), l + (b || 0), d)
		},
		doMouseZoom: function(b, e, c, d) {
			var l = this;
			var a = b > 0 ? 0.97 : 1.03;
			return l.zoomTo(l.__zoomLevel * a, false, c - l.__clientLeft, d - l.__clientTop)
		},
		doTouchStart: function(a, d) {
			if (a.length == null) {
				throw new Error("Invalid touch list: " + a)
			}
			if (d instanceof Date) {
				d = d.valueOf()
			}
			if (typeof d !== "number") {
				throw new Error("Invalid timestamp value: " + d)
			}
			var e = this;
			e.__interruptedAnimation = true;
			if (e.__isDecelerating) {
				core.effect.Animate.stop(e.__isDecelerating);
				e.__isDecelerating = false;
				e.__interruptedAnimation = true
			}
			if (e.__isAnimating) {
				core.effect.Animate.stop(e.__isAnimating);
				e.__isAnimating = false;
				e.__interruptedAnimation = true
			}
			var c, b;
			var l = a.length === 1;
			if (l) {
				c = a[0].pageX;
				b = a[0].pageY
			} else {
				c = Math.abs(a[0].pageX + a[1].pageX) / 2;
				b = Math.abs(a[0].pageY + a[1].pageY) / 2
			}
			e.__initialTouchLeft = c;
			e.__initialTouchTop = b;
			e.__zoomLevelStart = e.__zoomLevel;
			e.__lastTouchLeft = c;
			e.__lastTouchTop = b;
			e.__lastTouchMove = d;
			e.__lastScale = 1;
			e.__enableScrollX = !l && e.options.scrollingX;
			e.__enableScrollY = !l && e.options.scrollingY;
			e.__isTracking = true;
			e.__didDecelerationComplete = false;
			e.__isDragging = !l;
			e.__isSingleTouch = l;
			e.__positions = []
		},
		doTouchMove: function(I, J, a) {
			if (I.length == null) {
				throw new Error("Invalid touch list: " + I)
			}
			if (J instanceof Date) {
				J = J.valueOf()
			}
			if (typeof J !== "number") {
				throw new Error("Invalid timestamp value: " + J)
			}
			var E = this;
			if (!E.__isTracking) {
				return
			}
			var b, N;
			if (I.length === 2) {
				b = Math.abs(I[0].pageX + I[1].pageX) / 2;
				N = Math.abs(I[0].pageY + I[1].pageY) / 2
			} else {
				b = I[0].pageX;
				N = I[0].pageY
			}
			var K = E.__positions;
			if (E.__isDragging) {
				var G = b - E.__lastTouchLeft;
				var H = N - E.__lastTouchTop;
				var B = E.__scrollLeft;
				var O = E.__scrollTop;
				var P = E.__zoomLevel;
				if (a != null && E.options.zooming) {
					var c = P;
					P = P / E.__lastScale * a;
					P = Math.max(Math.min(P, E.options.maxZoom), E.options.minZoom);
					if (c !== P) {
						var C = b - E.__clientLeft;
						var L = N - E.__clientTop;
						B = ((C + B) * P / c) - C;
						O = ((L + O) * P / c) - L;
						E.__computeScrollMax(P)
					}
				}
				if (E.__enableScrollX) {
					B -= G * this.options.speedMultiplier;
					var D = E.__maxScrollLeft;
					if (B > D || B < 0) {
						if (E.options.bouncing) {
							B += (G / 2 * this.options.speedMultiplier)
						} else {
							if (B > D) {
								B = D
							} else {
								B = 0
							}
						}
					}
				}
				if (E.__enableScrollY) {
					O -= H * this.options.speedMultiplier;
					var A = E.__maxScrollTop;
					if (O > A || O < 0) {
						if (E.options.bouncing) {
							O += (H / 2 * this.options.speedMultiplier);
							if (!E.__enableScrollX && E.__refreshHeight != null) {
								if (!E.__refreshActive && O <= -E.__refreshHeight) {
									E.__refreshActive = true;
									if (E.__refreshActivate) {
										E.__refreshActivate()
									}
								} else {
									if (E.__refreshActive && O > -E.__refreshHeight) {
										E.__refreshActive = false;
										if (E.__refreshDeactivate) {
											E.__refreshDeactivate()
										}
									}
								}
							}
						} else {
							if (O > A) {
								O = A
							} else {
								O = 0
							}
						}
					}
				}
				if (K.length > 60) {
					K.splice(0, 30)
				}
				K.push(B, O, J);
				E.__publish(B, O, P)
			} else {
				var F = E.options.locking ? 3 : 0;
				var M = 5;
				var d = Math.abs(b - E.__initialTouchLeft);
				var e = Math.abs(N - E.__initialTouchTop);
				E.__enableScrollX = E.options.scrollingX && d >= F;
				E.__enableScrollY = E.options.scrollingY && e >= F;
				K.push(E.__scrollLeft, E.__scrollTop, J);
				E.__isDragging = (E.__enableScrollX || E.__enableScrollY) && (d >= M || e >= M);
				if (E.__isDragging) {
					E.__interruptedAnimation = false
				}
			}
			E.__lastTouchLeft = b;
			E.__lastTouchTop = N;
			E.__lastTouchMove = J;
			E.__lastScale = a
		},
		doTouchEnd: function(r) {
			if (r instanceof Date) {
				r = r.valueOf()
			}
			if (typeof r !== "number") {
				throw new Error("Invalid timestamp value: " + r)
			}
			var a = this;
			if (!a.__isTracking) {
				return
			}
			a.__isTracking = false;
			if (a.__isDragging) {
				a.__isDragging = false;
				if (a.__isSingleTouch && a.options.animating && (r - a.__lastTouchMove) <= 100) {
					var e = a.__positions;
					var t = e.length - 1;
					var d = t;
					for (var q = t; q > 0 && e[q] > (a.__lastTouchMove - 100); q -= 3) {
						d = q
					}
					if (d !== t) {
						var b = e[t] - e[d];
						var u = a.__scrollLeft - e[d - 2];
						var c = a.__scrollTop - e[d - 1];
						a.__decelerationVelocityX = u / b * (1000 / 60);
						a.__decelerationVelocityY = c / b * (1000 / 60);
						var s = a.options.paging || a.options.snapping ? 4 : 1;
						if (Math.abs(a.__decelerationVelocityX) > s || Math.abs(a.__decelerationVelocityY) > s) {
							if (!a.__refreshActive) {
								a.__startDeceleration(r)
							}
						}
					} else {
						a.options.scrollingComplete()
					}
				} else {
					if ((r - a.__lastTouchMove) > 100) {
						a.options.scrollingComplete()
					}
				}
			}
			if (!a.__isDecelerating) {
				if (a.__refreshActive && a.__refreshStart) {
					a.__publish(a.__scrollLeft, -a.__refreshHeight, a.__zoomLevel, true);
					if (a.__refreshStart) {
						a.__refreshStart()
					}
				} else {
					if (a.__interruptedAnimation || a.__isDragging) {
						a.options.scrollingComplete()
					}
					a.scrollTo(a.__scrollLeft, a.__scrollTop, true, a.__zoomLevel);
					if (a.__refreshActive) {
						a.__refreshActive = false;
						if (a.__refreshDeactivate) {
							a.__refreshDeactivate()
						}
					}
				}
			}
			a.__positions.length = 0
		},
		__publish: function(z, c, a, B) {
			var D = this;
			var y = D.__isAnimating;
			if (y) {
				core.effect.Animate.stop(y);
				D.__isAnimating = false
			}
			if (B && D.options.animating) {
				D.__scheduledLeft = z;
				D.__scheduledTop = c;
				D.__scheduledZoom = a;
				var x = D.__scrollLeft;
				var w = D.__scrollTop;
				var C = D.__zoomLevel;
				var b = z - x;
				var e = c - w;
				var u = a - C;
				var A = function(k, m, l) {
					if (l) {
						D.__scrollLeft = x + (b * k);
						D.__scrollTop = w + (e * k);
						D.__zoomLevel = C + (u * k);
						if (D.__callback) {
							D.__callback(D.__scrollLeft, D.__scrollTop, D.__zoomLevel)
						}
					}
				};
				var d = function(k) {
					return D.__isAnimating === k
				};
				var v = function(l, k, m) {
					if (k === D.__isAnimating) {
						D.__isAnimating = false
					}
					if (D.__didDecelerationComplete || m) {
						D.options.scrollingComplete()
					}
					if (D.options.zooming) {
						D.__computeScrollMax();
						if (D.__zoomComplete) {
							D.__zoomComplete();
							D.__zoomComplete = null
						}
					}
				};
				D.__isAnimating = core.effect.Animate.start(A, d, v, D.options.animationDuration, y ? h : j)
			} else {
				D.__scheduledLeft = D.__scrollLeft = z;
				D.__scheduledTop = D.__scrollTop = c;
				D.__scheduledZoom = D.__zoomLevel = a;
				if (D.__callback) {
					D.__callback(z, c, a)
				}
				if (D.options.zooming) {
					D.__computeScrollMax();
					if (D.__zoomComplete) {
						D.__zoomComplete();
						D.__zoomComplete = null
					}
				}
			}
		},
		__computeScrollMax: function(a) {
			var b = this;
			if (a == null) {
				a = b.__zoomLevel
			}
			b.__maxScrollLeft = Math.max((b.__contentWidth * a) - b.__clientWidth, 0);
			b.__maxScrollTop = Math.max((b.__contentHeight * a) - b.__clientHeight, 0)
		},
		__startDeceleration: function(q) {
			var a = this;
			if (a.options.paging) {
				var r = Math.max(Math.min(a.__scrollLeft, a.__maxScrollLeft), 0);
				var t = Math.max(Math.min(a.__scrollTop, a.__maxScrollTop), 0);
				var b = a.__clientWidth;
				var d = a.__clientHeight;
				a.__minDecelerationScrollLeft = Math.floor(r / b) * b;
				a.__minDecelerationScrollTop = Math.floor(t / d) * d;
				a.__maxDecelerationScrollLeft = Math.ceil(r / b) * b;
				a.__maxDecelerationScrollTop = Math.ceil(t / d) * d
			} else {
				a.__minDecelerationScrollLeft = 0;
				a.__minDecelerationScrollTop = 0;
				a.__maxDecelerationScrollLeft = a.__maxScrollLeft;
				a.__maxDecelerationScrollTop = a.__maxScrollTop
			}
			var s = function(k, m, l) {
				a.__stepThroughDeceleration(l)
			};
			var e = a.options.snapping ? 4 : 0.1;
			var c = function() {
				var k = Math.abs(a.__decelerationVelocityX) >= e || Math.abs(a.__decelerationVelocityY) >= e;
				if (!k) {
					a.__didDecelerationComplete = true
				}
				return k
			};
			var p = function(l, k, m) {
				a.__isDecelerating = false;
				if (a.__didDecelerationComplete) {
					a.options.scrollingComplete()
				}
			};
			a.__isDecelerating = core.effect.Animate.start(s, c, p)
		},
		__stepThroughDeceleration: function(v) {
			var b = this;
			var s = b.__scrollLeft + b.__decelerationVelocityX;
			var u = b.__scrollTop + b.__decelerationVelocityY;
			if (!b.options.bouncing) {
				var t = Math.max(Math.min(b.__maxDecelerationScrollLeft, s), b.__minDecelerationScrollLeft);
				if (t !== s) {
					s = t;
					b.__decelerationVelocityX = 0
				}
				var e = Math.max(Math.min(b.__maxDecelerationScrollTop, u), b.__minDecelerationScrollTop);
				if (e !== u) {
					u = e;
					b.__decelerationVelocityY = 0
				}
			}
			if (v) {
				b.__publish(s, u, b.__zoomLevel)
			} else {
				b.__scrollLeft = s;
				b.__scrollTop = u
			}
			if (!b.options.paging) {
				var d = 0.95;
				b.__decelerationVelocityX *= d;
				b.__decelerationVelocityY *= d
			}
			if (b.options.bouncing) {
				var a = 0;
				var c = 0;
				var q = b.options.penetrationDeceleration;
				var r = b.options.penetrationAcceleration;
				if (s < b.__minDecelerationScrollLeft) {
					a = b.__minDecelerationScrollLeft - s
				} else {
					if (s > b.__maxDecelerationScrollLeft) {
						a = b.__maxDecelerationScrollLeft - s
					}
				}
				if (u < b.__minDecelerationScrollTop) {
					c = b.__minDecelerationScrollTop - u
				} else {
					if (u > b.__maxDecelerationScrollTop) {
						c = b.__maxDecelerationScrollTop - u
					}
				}
				if (a !== 0) {
					if (a * b.__decelerationVelocityX <= 0) {
						b.__decelerationVelocityX += a * q
					} else {
						b.__decelerationVelocityX = a * r
					}
				}
				if (c !== 0) {
					if (c * b.__decelerationVelocityY <= 0) {
						b.__decelerationVelocityY += c * q
					} else {
						b.__decelerationVelocityY = c * r
					}
				}
			}
		}
	};
	for (var i in f) {
		Scroller.prototype[i] = f[i]
	}
})();
var dat = dat || {};
dat.gui = dat.gui || {};
dat.utils = dat.utils || {};
dat.controllers = dat.controllers || {};
dat.dom = dat.dom || {};
dat.color = dat.color || {};
dat.utils.css = (function() {
	return {
		load: function(e, f) {
			f = f || document;
			var d = f.createElement("link");
			d.type = "text/css";
			d.rel = "stylesheet";
			d.href = e;
			f.getElementsByTagName("head")[0].appendChild(d)
		},
		inject: function(d, f) {
			f = f || document;
			var e = document.createElement("style");
			e.type = "text/css";
			e.innerHTML = d;
			f.getElementsByTagName("head")[0].appendChild(e)
		}
	}
})();
dat.utils.common = (function() {
	var d = Array.prototype.forEach;
	var c = Array.prototype.slice;
	return {
		BREAK: {},
		extend: function(a) {
			this.each(c.call(arguments, 1), function(b) {
				for (var f in b) {
					if (!this.isUndefined(b[f])) {
						a[f] = b[f]
					}
				}
			}, this);
			return a
		},
		defaults: function(a) {
			this.each(c.call(arguments, 1), function(b) {
				for (var f in b) {
					if (this.isUndefined(a[f])) {
						a[f] = b[f]
					}
				}
			}, this);
			return a
		},
		compose: function() {
			var a = c.call(arguments);
			return function() {
				var f = c.call(arguments);
				for (var b = a.length - 1; b >= 0; b--) {
					f = [a[b].apply(this, f)]
				}
				return f[0]
			}
		},
		each: function(a, b, h) {
			if (!a) {
				return
			}
			if (d && a.forEach && a.forEach === d) {
				a.forEach(b, h)
			} else {
				if (a.length === a.length + 0) {
					for (var i = 0, j = a.length; i < j; i++) {
						if (i in a && b.call(h, a[i], i) === this.BREAK) {
							return
						}
					}
				} else {
					for (var i in a) {
						if (b.call(h, a[i], i) === this.BREAK) {
							return
						}
					}
				}
			}
		},
		defer: function(a) {
			setTimeout(a, 0)
		},
		toArray: function(a) {
			if (a.toArray) {
				return a.toArray()
			}
			return c.call(a)
		},
		isUndefined: function(a) {
			return a === undefined
		},
		isNull: function(a) {
			return a === null
		},
		isNaN: function(a) {
			return a !== a
		},
		isArray: Array.isArray || function(a) {
			return a.constructor === Array
		},
		isObject: function(a) {
			return a === Object(a)
		},
		isNumber: function(a) {
			return a === a + 0
		},
		isString: function(a) {
			return a === a + ""
		},
		isBoolean: function(a) {
			return a === false || a === true
		},
		isFunction: function(a) {
			return Object.prototype.toString.call(a) === "[object Function]"
		}
	}
})();
dat.controllers.Controller = (function(d) {
	var c = function(b, a) {
		this.initialValue = b[a];
		this.domElement = document.createElement("div");
		this.object = b;
		this.property = a;
		this.__onChange = undefined;
		this.__onFinishChange = undefined
	};
	d.extend(c.prototype, {
		onChange: function(a) {
			this.__onChange = a;
			return this
		},
		onFinishChange: function(a) {
			this.__onFinishChange = a;
			return this
		},
		setValue: function(a) {
			this.object[this.property] = a;
			if (this.__onChange) {
				this.__onChange.call(this, a)
			}
			this.updateDisplay();
			return this
		},
		getValue: function() {
			return this.object[this.property]
		},
		updateDisplay: function() {
			return this
		},
		isModified: function() {
			return this.initialValue !== this.getValue()
		}
	});
	return c
})(dat.utils.common);
dat.dom.dom = (function(g) {
	var i = {
		HTMLEvents: ["change"],
		MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
		KeyboardEvents: ["keydown"]
	};
	var j = {};
	g.each(i, function(a, b) {
		g.each(a, function(c) {
			j[c] = b
		})
	});
	var h = /(\d+(\.\d+)?)px/;

	function l(a) {
		if (a === "0" || g.isUndefined(a)) {
			return 0
		}
		var b = a.match(h);
		if (!g.isNull(b)) {
			return parseFloat(b[1])
		}
		return 0
	}
	var k = {
		makeSelectable: function(a, b) {
			if (a === undefined || a.style === undefined) {
				return
			}
			a.onselectstart = b ? function() {
				return false
			} : function() {};
			a.style.MozUserSelect = b ? "auto" : "none";
			a.style.KhtmlUserSelect = b ? "auto" : "none";
			a.unselectable = b ? "on" : "off"
		},
		makeFullscreen: function(a, c, b) {
			if (g.isUndefined(c)) {
				c = true
			}
			if (g.isUndefined(b)) {
				b = true
			}
			a.style.position = "absolute";
			if (c) {
				a.style.left = 0;
				a.style.right = 0
			}
			if (b) {
				a.style.top = 0;
				a.style.bottom = 0
			}
		},
		fakeEvent: function(e, p, d, f) {
			d = d || {};
			var c = j[p];
			if (!c) {
				throw new Error("Event type " + p + " not supported.")
			}
			var b = document.createEvent(c);
			switch (c) {
				case "MouseEvents":
					var q = d.x || d.clientX || 0;
					var r = d.y || d.clientY || 0;
					b.initMouseEvent(p, d.bubbles || false, d.cancelable || true, window, d.clickCount || 1, 0, 0, q, r, false, false, false, false, 0, null);
					break;
				case "KeyboardEvents":
					var a = b.initKeyboardEvent || b.initKeyEvent;
					g.defaults(d, {
						cancelable: true,
						ctrlKey: false,
						altKey: false,
						shiftKey: false,
						metaKey: false,
						keyCode: undefined,
						charCode: undefined
					});
					a(p, d.bubbles || false, d.cancelable, window, d.ctrlKey, d.altKey, d.shiftKey, d.metaKey, d.keyCode, d.charCode);
					break;
				default:
					b.initEvent(p, d.bubbles || false, d.cancelable || true);
					break
			}
			g.defaults(b, f);
			e.dispatchEvent(b)
		},
		bind: function(a, b, c, d) {
			d = d || false;
			if (a.addEventListener) {
				a.addEventListener(b, c, d)
			} else {
				if (a.attachEvent) {
					a.attachEvent("on" + b, c)
				}
			}
			return k
		},
		unbind: function(a, b, c, d) {
			d = d || false;
			if (a.removeEventListener) {
				a.removeEventListener(b, c, d)
			} else {
				if (a.detachEvent) {
					a.detachEvent("on" + b, c)
				}
			}
			return k
		},
		addClass: function(a, b) {
			if (a.className === undefined) {
				a.className = b
			} else {
				if (a.className !== b) {
					var c = a.className.split(/ +/);
					if (c.indexOf(b) == -1) {
						c.push(b);
						a.className = c.join(" ").replace(/^\s+/, "").replace(/\s+$/, "")
					}
				}
			}
			return k
		},
		removeClass: function(a, b) {
			if (b) {
				if (a.className === undefined) {} else {
					if (a.className === b) {
						a.removeAttribute("class")
					} else {
						var c = a.className.split(/ +/);
						var d = c.indexOf(b);
						if (d != -1) {
							c.splice(d, 1);
							a.className = c.join(" ")
						}
					}
				}
			} else {
				a.className = undefined
			}
			return k
		},
		hasClass: function(a, b) {
			return new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)").test(a.className) || false
		},
		getWidth: function(a) {
			var b = getComputedStyle(a);
			return l(b["border-left-width"]) + l(b["border-right-width"]) + l(b["padding-left"]) + l(b["padding-right"]) + l(b.width)
		},
		getHeight: function(a) {
			var b = getComputedStyle(a);
			return l(b["border-top-width"]) + l(b["border-bottom-width"]) + l(b["padding-top"]) + l(b["padding-bottom"]) + l(b.height)
		},
		getOffset: function(b) {
			var a = {
				left: 0,
				top: 0
			};
			if (b.offsetParent) {
				do {
					a.left += b.offsetLeft;
					a.top += b.offsetTop
				} while (b = b.offsetParent)
			}
			return a
		},
		isActive: function(a) {
			return a === document.activeElement && (a.type || a.href)
		}
	};
	return k
})(dat.utils.common);
dat.controllers.OptionController = (function(h, g, f) {
	var e = function(d, c, j) {
		e.superclass.call(this, d, c);
		var a = this;
		this.__select = document.createElement("select");
		if (f.isArray(j)) {
			var b = {};
			f.each(j, function(i) {
				b[i] = i
			});
			j = b
		}
		f.each(j, function(i, m) {
			var n = document.createElement("option");
			n.innerHTML = m;
			n.setAttribute("value", i);
			a.__select.appendChild(n)
		});
		this.updateDisplay();
		g.bind(this.__select, "change", function() {
			var i = this.options[this.selectedIndex].value;
			a.setValue(i)
		});
		this.domElement.appendChild(this.__select)
	};
	e.superclass = h;
	f.extend(e.prototype, h.prototype, {
		setValue: function(b) {
			var a = e.superclass.prototype.setValue.call(this, b);
			if (this.__onFinishChange) {
				this.__onFinishChange.call(this, this.getValue())
			}
			return a
		},
		updateDisplay: function() {
			this.__select.value = this.getValue();
			return e.superclass.prototype.updateDisplay.call(this)
		}
	});
	return e
})(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
dat.controllers.NumberController = (function(g, e) {
	var h = function(c, b, a) {
		h.superclass.call(this, c, b);
		a = a || {};
		this.__min = a.min;
		this.__max = a.max;
		this.__step = a.step;
		if (e.isUndefined(this.__step)) {
			if (this.initialValue == 0) {
				this.__impliedStep = 1
			} else {
				this.__impliedStep = Math.pow(10, Math.floor(Math.log(this.initialValue) / Math.LN10)) / 10
			}
		} else {
			this.__impliedStep = this.__step
		}
		this.__precision = f(this.__impliedStep)
	};
	h.superclass = g;
	e.extend(h.prototype, g.prototype, {
		setValue: function(a) {
			if (this.__min !== undefined && a < this.__min) {
				a = this.__min
			} else {
				if (this.__max !== undefined && a > this.__max) {
					a = this.__max
				}
			}
			if (this.__step !== undefined && a % this.__step != 0) {
				a = Math.round(a / this.__step) * this.__step
			}
			return h.superclass.prototype.setValue.call(this, a)
		},
		min: function(a) {
			this.__min = a;
			return this
		},
		max: function(a) {
			this.__max = a;
			return this
		},
		step: function(a) {
			this.__step = a;
			this.__impliedStep = a;
			this.__precision = f(a);
			return this
		}
	});

	function f(a) {
		a = a.toString();
		if (a.indexOf(".") > -1) {
			return a.length - a.indexOf(".") - 1
		} else {
			return 0
		}
	}
	return h
})(dat.controllers.Controller, dat.utils.common);
dat.controllers.NumberControllerBox = (function(i, h, j) {
	var f = function(r, a, s) {
		this.__truncationSuspended = false;
		f.superclass.call(this, r, a, s);
		var d = this;
		var p;
		this.__input = document.createElement("input");
		this.__input.setAttribute("type", "text");
		h.bind(this.__input, "change", c);
		h.bind(this.__input, "blur", t);
		h.bind(this.__input, "mousedown", b);
		h.bind(this.__input, "keydown", function(k) {
			if (k.keyCode === 13) {
				d.__truncationSuspended = true;
				this.blur();
				d.__truncationSuspended = false
			}
		});

		function c() {
			var k = parseFloat(d.__input.value);
			if (!j.isNaN(k)) {
				d.setValue(k)
			}
		}

		function t() {
			c();
			if (d.__onFinishChange) {
				d.__onFinishChange.call(d, d.getValue())
			}
		}

		function b(k) {
			h.bind(window, "mousemove", q);
			h.bind(window, "mouseup", e);
			p = k.clientY
		}

		function q(k) {
			var l = p - k.clientY;
			d.setValue(d.getValue() + l * d.__impliedStep);
			p = k.clientY
		}

		function e() {
			h.unbind(window, "mousemove", q);
			h.unbind(window, "mouseup", e)
		}
		this.updateDisplay();
		this.domElement.appendChild(this.__input)
	};
	f.superclass = i;
	j.extend(f.prototype, i.prototype, {
		updateDisplay: function() {
			this.__input.value = this.__truncationSuspended ? this.getValue() : g(this.getValue(), this.__precision);
			return f.superclass.prototype.updateDisplay.call(this)
		}
	});

	function g(b, c) {
		var a = Math.pow(10, c);
		return Math.round(b * a) / a
	}
	return f
})(dat.controllers.NumberController, dat.dom.dom, dat.utils.common);
var rawCssText = "/**\n * dat-gui JavaScript Controller Library\n * http://code.google.com/p/dat-gui\n *\n * Copyright 2011 Data Arts Team, Google Creative Lab\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n */\n\n.slider {\n  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);\n  height: 1em;\n  border-radius: 1em;\n  background-color: #eee;\n  padding: 0 0.5em;\n  overflow: hidden;\n}\n\n.slider-fg {\n  padding: 1px 0 2px 0;\n  background-color: #aaa;\n  height: 1em;\n  margin-left: -0.5em;\n  padding-right: 0.5em;\n  border-radius: 1em 0 0 1em;\n}\n\n.slider-fg:after {\n  display: inline-block;\n  border-radius: 1em;\n  background-color: #fff;\n  border:  1px solid #aaa;\n  content: '';\n  float: right;\n  margin-right: -1em;\n  margin-top: -1px;\n  height: 0.9em;\n  width: 0.9em;\n}",
	cssConverterElement = document.createElement("div");
cssConverterElement.appendChild(document.createTextNode(rawCssText));
dat.controllers.NumberControllerSlider = (function(m, k, i, h, j) {
	var n = function(q, a, g, c, r) {
		n.superclass.call(this, q, a, {
			min: g,
			max: c,
			step: r
		});
		var d = this;
		this.__background = document.createElement("div");
		this.__foreground = document.createElement("div");
		k.bind(this.__background, "mousedown", b);
		k.addClass(this.__background, "slider");
		k.addClass(this.__foreground, "slider-fg");

		function b(o) {
			k.bind(window, "mousemove", f);
			k.bind(window, "mouseup", e);
			f(o)
		}

		function f(p) {
			p.preventDefault();
			var o = k.getOffset(d.__background);
			var t = k.getWidth(d.__background);
			d.setValue(l(p.clientX, o.left, o.left + t, d.__min, d.__max));
			return false
		}

		function e() {
			k.unbind(window, "mousemove", f);
			k.unbind(window, "mouseup", e);
			if (d.__onFinishChange) {
				d.__onFinishChange.call(d, d.getValue())
			}
		}
		this.updateDisplay();
		this.__background.appendChild(this.__foreground);
		this.domElement.appendChild(this.__background)
	};
	n.superclass = m;
	n.useDefaultStyles = function() {
		i.inject(j)
	};
	h.extend(n.prototype, m.prototype, {
		updateDisplay: function() {
			var a = (this.getValue() - this.__min) / (this.__max - this.__min);
			this.__foreground.style.width = a * 100 + "%";
			return n.superclass.prototype.updateDisplay.call(this)
		}
	});

	function l(e, b, d, a, c) {
		return a + (c - a) * ((e - b) / (d - b))
	}
	return n
})(dat.controllers.NumberController, dat.dom.dom, dat.utils.css, dat.utils.common, cssConverterElement.innerHTML);
dat.controllers.FunctionController = (function(e, h, f) {
	var g = function(d, c, b) {
		g.superclass.call(this, d, c);
		var a = this;
		this.__button = document.createElement("div");
		this.__button.innerHTML = b === undefined ? "Fire" : b;
		h.bind(this.__button, "click", function(j) {
			j.preventDefault();
			a.fire();
			return false
		});
		h.addClass(this.__button, "button");
		this.domElement.appendChild(this.__button)
	};
	g.superclass = e;
	f.extend(g.prototype, e.prototype, {
		fire: function() {
			if (this.__onChange) {
				this.__onChange.call(this)
			}
			if (this.__onFinishChange) {
				this.__onFinishChange.call(this, this.getValue())
			}
			this.getValue().call(this.object)
		}
	});
	return g
})(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
dat.controllers.BooleanController = (function(h, g, f) {
	var e = function(c, b) {
		e.superclass.call(this, c, b);
		var a = this;
		this.__prev = this.getValue();
		this.__checkbox = document.createElement("input");
		this.__checkbox.setAttribute("type", "checkbox");
		g.bind(this.__checkbox, "change", d, false);
		this.domElement.appendChild(this.__checkbox);
		this.updateDisplay();

		function d() {
			a.setValue(!a.__prev)
		}
	};
	e.superclass = h;
	f.extend(e.prototype, h.prototype, {
		setValue: function(b) {
			var a = e.superclass.prototype.setValue.call(this, b);
			if (this.__onFinishChange) {
				this.__onFinishChange.call(this, this.getValue())
			}
			this.__prev = this.getValue();
			return a
		},
		updateDisplay: function() {
			if (this.getValue() === true) {
				this.__checkbox.setAttribute("checked", "checked");
				this.__checkbox.checked = true
			} else {
				this.__checkbox.checked = false
			}
			return e.superclass.prototype.updateDisplay.call(this)
		}
	});
	return e
})(dat.controllers.Controller, dat.dom.dom, dat.utils.common);
dat.color.toString = (function(b) {
	return function(a) {
		if (a.a == 1 || b.isUndefined(a.a)) {
			var d = a.hex.toString(16);
			while (d.length < 6) {
				d = "0" + d
			}
			return "#" + d
		} else {
			return "rgba(" + Math.round(a.r) + "," + Math.round(a.g) + "," + Math.round(a.b) + "," + a.a + ")"
		}
	}
})(dat.utils.common);
dat.color.interpret = (function(k, l) {
	var h, i;
	var g = function() {
		i = false;
		var a = arguments.length > 1 ? l.toArray(arguments) : arguments[0];
		l.each(j, function(b) {
			if (b.litmus(a)) {
				l.each(b.conversions, function(c, d) {
					h = c.read(a);
					if (i === false && h !== false) {
						i = h;
						h.conversionName = d;
						h.conversion = c;
						return l.BREAK
					}
				});
				return l.BREAK
			}
		});
		return i
	};
	var j = [{
		litmus: l.isString,
		conversions: {
			THREE_CHAR_HEX: {
				read: function(b) {
					var a = b.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
					if (a === null) {
						return false
					}
					return {
						space: "HEX",
						hex: parseInt("0x" + a[1].toString() + a[1].toString() + a[2].toString() + a[2].toString() + a[3].toString() + a[3].toString())
					}
				},
				write: k
			},
			SIX_CHAR_HEX: {
				read: function(b) {
					var a = b.match(/^#([A-F0-9]{6})$/i);
					if (a === null) {
						return false
					}
					return {
						space: "HEX",
						hex: parseInt("0x" + a[1].toString())
					}
				},
				write: k
			},
			CSS_RGB: {
				read: function(b) {
					var a = b.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
					if (a === null) {
						return false
					}
					return {
						space: "RGB",
						r: parseFloat(a[1]),
						g: parseFloat(a[2]),
						b: parseFloat(a[3])
					}
				},
				write: k
			},
			CSS_RGBA: {
				read: function(b) {
					var a = b.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\,\s*(.+)\s*\)/);
					if (a === null) {
						return false
					}
					return {
						space: "RGB",
						r: parseFloat(a[1]),
						g: parseFloat(a[2]),
						b: parseFloat(a[3]),
						a: parseFloat(a[4])
					}
				},
				write: k
			}
		}
	}, {
		litmus: l.isNumber,
		conversions: {
			HEX: {
				read: function(a) {
					return {
						space: "HEX",
						hex: a,
						conversionName: "HEX"
					}
				},
				write: function(a) {
					return a.hex
				}
			}
		}
	}, {
		litmus: l.isArray,
		conversions: {
			RGB_ARRAY: {
				read: function(a) {
					if (a.length != 3) {
						return false
					}
					return {
						space: "RGB",
						r: a[0],
						g: a[1],
						b: a[2]
					}
				},
				write: function(a) {
					return [a.r, a.g, a.b]
				}
			},
			RGBA_ARRAY: {
				read: function(a) {
					if (a.length != 4) {
						return false
					}
					return {
						space: "RGB",
						r: a[0],
						g: a[1],
						b: a[2],
						a: a[3]
					}
				},
				write: function(a) {
					return [a.r, a.g, a.b, a.a]
				}
			}
		}
	}, {
		litmus: l.isObject,
		conversions: {
			RGBA_OBJ: {
				read: function(a) {
					if (l.isNumber(a.r) && l.isNumber(a.g) && l.isNumber(a.b) && l.isNumber(a.a)) {
						return {
							space: "RGB",
							r: a.r,
							g: a.g,
							b: a.b,
							a: a.a
						}
					}
					return false
				},
				write: function(a) {
					return {
						r: a.r,
						g: a.g,
						b: a.b,
						a: a.a
					}
				}
			},
			RGB_OBJ: {
				read: function(a) {
					if (l.isNumber(a.r) && l.isNumber(a.g) && l.isNumber(a.b)) {
						return {
							space: "RGB",
							r: a.r,
							g: a.g,
							b: a.b
						}
					}
					return false
				},
				write: function(a) {
					return {
						r: a.r,
						g: a.g,
						b: a.b
					}
				}
			},
			HSVA_OBJ: {
				read: function(a) {
					if (l.isNumber(a.h) && l.isNumber(a.s) && l.isNumber(a.v) && l.isNumber(a.a)) {
						return {
							space: "HSV",
							h: a.h,
							s: a.s,
							v: a.v,
							a: a.a
						}
					}
					return false
				},
				write: function(a) {
					return {
						h: a.h,
						s: a.s,
						v: a.v,
						a: a.a
					}
				}
			},
			HSV_OBJ: {
				read: function(a) {
					if (l.isNumber(a.h) && l.isNumber(a.s) && l.isNumber(a.v)) {
						return {
							space: "HSV",
							h: a.h,
							s: a.s,
							v: a.v
						}
					}
					return false
				},
				write: function(a) {
					return {
						h: a.h,
						s: a.s,
						v: a.v
					}
				}
			}
		}
	}];
	return g
})(dat.color.toString, dat.utils.common);
rawCssText = ".dg {\n  /** Clear list styles */\n  /* Auto-place container */\n  /* Auto-placed GUI's */\n  /* Line items that don't contain folders. */\n  /** Folder names */\n  /** Hides closed items */\n  /** Controller row */\n  /** Name-half (left) */\n  /** Controller-half (right) */\n  /** Controller placement */\n  /** Shorter number boxes when slider is present. */\n  /** Ensure the entire boolean and function row shows a hand */ }\n  .dg ul {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    clear: both; }\n  .dg.ac {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 0;\n    z-index: 10; }\n  .dg:not(.ac) .main {\n    /** Exclude mains in ac so that we don't hide close button */\n    overflow: hidden; }\n  .dg.main {\n    -webkit-transition: opacity 0.1s linear;\n    -o-transition: opacity 0.1s linear;\n    -moz-transition: opacity 0.1s linear;\n    transition: opacity 0.1s linear; }\n    .dg.main.taller-than-window {\n      overflow-y: auto; }\n      .dg.main.taller-than-window .close-button {\n        opacity: 1;\n        /* TODO, these are style notes */\n        margin-top: -1px;\n        border-top: 1px solid #2c2c2c; }\n    .dg.main ul.closed .close-button {\n      opacity: 1 !important; }\n    .dg.main:hover .close-button,\n    .dg.main .close-button.drag {\n      opacity: 1; }\n    .dg.main .close-button {\n      /*opacity: 0;*/\n      -webkit-transition: opacity 0.1s linear;\n      -o-transition: opacity 0.1s linear;\n      -moz-transition: opacity 0.1s linear;\n      transition: opacity 0.1s linear;\n      border: 0;\n      position: absolute;\n      line-height: 19px;\n      height: 20px;\n      /* TODO, these are style notes */\n      cursor: pointer;\n      text-align: center;\n      background-color: #000; }\n      .dg.main .close-button:hover {\n        background-color: #111; }\n  .dg.a {\n    float: right;\n    margin-right: 15px;\n    overflow-x: hidden; }\n    .dg.a.has-save > ul {\n      margin-top: 27px; }\n      .dg.a.has-save > ul.closed {\n        margin-top: 0; }\n    .dg.a .save-row {\n      position: fixed;\n      top: 0;\n      z-index: 1002; }\n  .dg li {\n    -webkit-transition: height 0.1s ease-out;\n    -o-transition: height 0.1s ease-out;\n    -moz-transition: height 0.1s ease-out;\n    transition: height 0.1s ease-out; }\n  .dg li:not(.folder) {\n    cursor: auto;\n    height: 27px;\n    line-height: 27px;\n    overflow: hidden;\n    padding: 0 4px 0 5px; }\n  .dg li.folder {\n    padding: 0;\n    border-left: 4px solid rgba(0, 0, 0, 0); }\n  .dg li.title {\n    cursor: pointer;\n    margin-left: -4px; }\n  .dg .closed li:not(.title),\n  .dg .closed ul li,\n  .dg .closed ul li > * {\n    height: 0;\n    overflow: hidden;\n    border: 0; }\n  .dg .cr {\n    clear: both;\n    padding-left: 3px;\n    height: 27px; }\n  .dg .property-name {\n    cursor: default;\n    float: left;\n    clear: left;\n    width: 40%;\n    overflow: hidden;\n    text-overflow: ellipsis; }\n  .dg .c {\n    float: left;\n    width: 60%; }\n  .dg .c input[type=text] {\n    border: 0;\n    margin-top: 4px;\n    padding: 3px;\n    width: 100%;\n    float: right; }\n  .dg .has-slider input[type=text] {\n    width: 30%;\n    /*display: none;*/\n    margin-left: 0; }\n  .dg .slider {\n    float: left;\n    width: 66%;\n    margin-left: -5px;\n    margin-right: 0;\n    height: 19px;\n    margin-top: 4px; }\n  .dg .slider-fg {\n    height: 100%; }\n  .dg .c input[type=checkbox] {\n    margin-top: 9px; }\n  .dg .c select {\n    margin-top: 5px; }\n  .dg .cr.function,\n  .dg .cr.function .property-name,\n  .dg .cr.function *,\n  .dg .cr.boolean,\n  .dg .cr.boolean * {\n    cursor: pointer; }\n  .dg .selector {\n    display: none;\n    position: absolute;\n    margin-left: -9px;\n    margin-top: 23px;\n    z-index: 10; }\n  .dg .c:hover .selector,\n  .dg .selector.drag {\n    display: block; }\n  .dg li.save-row {\n    padding: 0; }\n    .dg li.save-row .button {\n      display: inline-block;\n      padding: 0px 6px; }\n  .dg.dialogue {\n    background-color: #222;\n    width: 460px;\n    padding: 15px;\n    font-size: 13px;\n    line-height: 15px; }\n\n/* TODO Separate style and structure */\n#dg-new-constructor {\n  padding: 10px;\n  color: #222;\n  font-family: Monaco, monospace;\n  font-size: 10px;\n  border: 0;\n  resize: none;\n  box-shadow: inset 1px 1px 1px #888;\n  word-wrap: break-word;\n  margin: 12px 0;\n  display: block;\n  width: 440px;\n  overflow-y: scroll;\n  height: 100px;\n  position: relative; }\n\n#dg-local-explain {\n  display: none;\n  font-size: 11px;\n  line-height: 17px;\n  border-radius: 3px;\n  background-color: #333;\n  padding: 8px;\n  margin-top: 10px; }\n  #dg-local-explain code {\n    font-size: 10px; }\n\n#dat-gui-save-locally {\n  display: none; }\n\n/** Main type */\n.dg {\n  color: #eee;\n  font: 11px 'Lucida Grande', sans-serif;\n  text-shadow: 0 -1px 0 #111;\n  /** Auto place */\n  /* Controller row, <li> */\n  /** Controllers */ }\n  .dg.main {\n    /** Scrollbar */ }\n    .dg.main::-webkit-scrollbar {\n      width: 5px;\n      background: #1a1a1a; }\n    .dg.main::-webkit-scrollbar-corner {\n      height: 0;\n      display: none; }\n    .dg.main::-webkit-scrollbar-thumb {\n      border-radius: 5px;\n      background: #676767; }\n  .dg li:not(.folder) {\n    background: #1a1a1a;\n    border-bottom: 1px solid #2c2c2c; }\n  .dg li.save-row {\n    line-height: 25px;\n    background: #dad5cb;\n    border: 0; }\n    .dg li.save-row select {\n      margin-left: 5px;\n      width: 108px; }\n    .dg li.save-row .button {\n      margin-left: 5px;\n      margin-top: 1px;\n      border-radius: 2px;\n      font-size: 9px;\n      line-height: 7px;\n      padding: 4px 4px 5px 4px;\n      background: #c5bdad;\n      color: #fff;\n      text-shadow: 0 1px 0 #b0a58f;\n      box-shadow: 0 -1px 0 #b0a58f;\n      cursor: pointer; }\n      .dg li.save-row .button.gears {\n        background: #c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;\n        height: 7px;\n        width: 8px; }\n      .dg li.save-row .button:hover {\n        background-color: #bab19e;\n        box-shadow: 0 -1px 0 #b0a58f; }\n  .dg li.folder {\n    border-bottom: 0; }\n  .dg li.title {\n    padding-left: 16px;\n    background: black url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;\n    cursor: pointer;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.2); }\n  .dg .closed li.title {\n    background-image: url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==); }\n  .dg .cr.boolean {\n    border-left: 3px solid #806787; }\n  .dg .cr.function {\n    border-left: 3px solid #e61d5f; }\n  .dg .cr.number {\n    border-left: 3px solid #2fa1d6; }\n    .dg .cr.number input[type=text] {\n      color: #2fa1d6; }\n  .dg .cr.string {\n    border-left: 3px solid #1ed36f; }\n    .dg .cr.string input[type=text] {\n      color: #1ed36f; }\n  .dg .cr.function:hover, .dg .cr.boolean:hover {\n    background: #111; }\n  .dg .c input[type=text] {\n    background: #303030;\n    outline: none; }\n    .dg .c input[type=text]:hover {\n      background: #3c3c3c; }\n    .dg .c input[type=text]:focus {\n      background: #494949;\n      color: #fff; }\n  .dg .c .slider {\n    background: #303030;\n    cursor: ew-resize; }\n  .dg .c .slider-fg {\n    background: #2fa1d6; }\n  .dg .c .slider:hover {\n    background: #3c3c3c; }\n    .dg .c .slider:hover .slider-fg {\n      background: #44abda; }\n";
cssConverterElement = document.createElement("div");
cssConverterElement.appendChild(document.createTextNode(rawCssText));
dat.GUI = dat.gui.GUI = (function(V, T, ar, at, av, ab, al, ai, O, Z, ag, ao, aq, ay, ah) {
	V.inject(ar);
	var Y = "dg";
	var aa = 72;
	var ap = 20;
	var az = "Default";
	var aA = (function() {
		try {
			return "localStorage" in window && window.localStorage !== null
		} catch (a) {
			return false
		}
	})();
	var ad;
	var N = true;
	var ak;
	var S = false;
	var W = [];
	var au = function(f) {
		var e = this;
		this.domElement = document.createElement("div");
		this.domElement.id = "dat.gui";
		this.__ul = document.createElement("ul");
		this.domElement.appendChild(this.__ul);
		ay.addClass(this.domElement, Y);
		this.__folders = {};
		this.__controllers = [];
		this.__rememberedObjects = [];
		this.__rememberedObjectIndecesToControllers = [];
		this.__listening = [];
		f = f || {};
		f = ah.defaults(f, {
			autoPlace: true,
			width: au.DEFAULT_WIDTH
		});
		f = ah.defaults(f, {
			resizable: f.autoPlace,
			hideable: f.autoPlace
		});
		if (!ah.isUndefined(f.load)) {
			if (f.preset) {
				f.load.preset = f.preset
			}
		} else {
			f.load = {
				preset: az
			}
		}
		if (ah.isUndefined(f.parent) && f.hideable) {
			W.push(this)
		}
		f.resizable = ah.isUndefined(f.parent) && f.resizable;
		if (f.autoPlace && ah.isUndefined(f.scrollable)) {
			f.scrollable = true
		}
		var c = aA && localStorage.getItem(aj(this, "isLocal")) === "true";
		var g;
		Object.defineProperties(this, {
			parent: {
				get: function() {
					return f.parent
				}
			},
			scrollable: {
				get: function() {
					return f.scrollable
				}
			},
			autoPlace: {
				get: function() {
					return f.autoPlace
				}
			},
			preset: {
				get: function() {
					if (e.parent) {
						return e.getRoot().preset
					} else {
						return f.load.preset
					}
				},
				set: function(k) {
					if (e.parent) {
						e.getRoot().preset = k
					} else {
						f.load.preset = k
					}
					af(this);
					e.revert()
				}
			},
			width: {
				get: function() {
					return f.width
				},
				set: function(k) {
					f.width = k;
					R(e, k)
				}
			},
			name: {
				get: function() {
					return f.name
				},
				set: function(k) {
					f.name = k;
					if (i) {
						i.innerHTML = f.name
					}
				}
			},
			closed: {
				get: function() {
					return f.closed
				},
				set: function(k) {
					f.closed = k;
					if (f.closed) {
						ay.addClass(e.__ul, au.CLASS_CLOSED)
					} else {
						ay.removeClass(e.__ul, au.CLASS_CLOSED)
					}
					this.onResize();
					if (e.__closeButton) {
						e.__closeButton.innerHTML = k ? au.TEXT_OPEN : au.TEXT_CLOSED
					}
				}
			},
			load: {
				get: function() {
					return f.load
				}
			},
			useLocalStorage: {
				get: function() {
					return c
				},
				set: function(k) {
					if (aA) {
						c = k;
						if (k) {
							ay.bind(window, "unload", g)
						} else {
							ay.unbind(window, "unload", g)
						}
						localStorage.setItem(aj(e, "isLocal"), k)
					}
				}
			}
		});
		if (ah.isUndefined(f.parent)) {
			f.closed = false;
			ay.addClass(this.domElement, au.CLASS_MAIN);
			ay.makeSelectable(this.domElement, false);
			if (aA) {
				if (c) {
					e.useLocalStorage = true;
					var j = localStorage.getItem(aj(this, "gui"));
					if (j) {
						f.load = JSON.parse(j)
					}
				}
			}
			this.__closeButton = document.createElement("div");
			this.__closeButton.innerHTML = au.TEXT_CLOSED;
			ay.addClass(this.__closeButton, au.CLASS_CLOSE_BUTTON);
			this.domElement.appendChild(this.__closeButton);
			ay.bind(this.__closeButton, "click", function() {
				e.closed = !e.closed
			})
		} else {
			if (f.closed === undefined) {
				f.closed = true
			}
			var i = document.createTextNode(f.name);
			ay.addClass(i, "controller-name");
			var b = X(e, i);
			var a = function(k) {
				k.preventDefault();
				e.closed = !e.closed;
				return false
			};
			ay.addClass(this.__ul, au.CLASS_CLOSED);
			ay.addClass(b, "title");
			ay.bind(b, "click", a);
			if (!f.closed) {
				this.closed = false
			}
		}
		if (f.autoPlace) {
			if (ah.isUndefined(f.parent)) {
				if (N) {
					ak = document.createElement("div");
					ay.addClass(ak, Y);
					ay.addClass(ak, au.CLASS_AUTO_PLACE_CONTAINER);
					document.body.appendChild(ak);
					N = false
				}
				ak.appendChild(this.domElement);
				ay.addClass(this.domElement, au.CLASS_AUTO_PLACE)
			}
			if (!this.parent) {
				R(e, f.width)
			}
		}
		ay.bind(window, "resize", function() {
			e.onResize()
		});
		ay.bind(this.__ul, "webkitTransitionEnd", function() {
			e.onResize()
		});
		ay.bind(this.__ul, "transitionend", function() {
			e.onResize()
		});
		ay.bind(this.__ul, "oTransitionEnd", function() {
			e.onResize()
		});
		this.onResize();
		if (f.resizable) {
			P(this)
		}
		g = function() {
			if (aA && localStorage.getItem(aj(e, "isLocal")) === "true") {
				localStorage.setItem(aj(e, "gui"), JSON.stringify(e.getSaveObject()))
			}
		};
		this.saveToLocalStorageIfPossible = g;
		var d = e.getRoot();

		function h() {
			var k = e.getRoot();
			k.width += 1;
			ah.defer(function() {
				k.width -= 1
			})
		}
		if (!f.parent) {
			h()
		}
	};
	au.toggleHide = function() {
		S = !S;
		ah.each(W, function(a) {
			a.domElement.style.zIndex = S ? -999 : 999;
			a.domElement.style.opacity = S ? 0 : 1
		})
	};
	au.CLASS_AUTO_PLACE = "a";
	au.CLASS_AUTO_PLACE_CONTAINER = "ac";
	au.CLASS_MAIN = "main";
	au.CLASS_CONTROLLER_ROW = "cr";
	au.CLASS_TOO_TALL = "taller-than-window";
	au.CLASS_CLOSED = "closed";
	au.CLASS_CLOSE_BUTTON = "close-button";
	au.CLASS_DRAG = "drag";
	au.DEFAULT_WIDTH = 245;
	au.TEXT_CLOSED = "Close Controls";
	au.TEXT_OPEN = "Open Controls";
	ay.bind(window, "keydown", function(a) {
		if (document.activeElement.type !== "text" && (a.which === aa || a.keyCode == aa)) {
			au.toggleHide()
		}
	}, false);
	ah.extend(au.prototype, {
		add: function(b, a) {
			return ax(this, b, a, {
				factoryArgs: Array.prototype.slice.call(arguments, 2)
			})
		},
		addColor: function(b, a) {
			return ax(this, b, a, {
				color: true
			})
		},
		remove: function(b) {
			this.__ul.removeChild(b.__li);
			this.__controllers.slice(this.__controllers.indexOf(b), 1);
			var a = this;
			ah.defer(function() {
				a.onResize()
			})
		},
		destroy: function() {
			if (this.autoPlace) {
				ak.removeChild(this.domElement)
			}
		},
		addFolder: function(b) {
			if (this.__folders[b] !== undefined) {
				throw new Error('You already have a folder in this GUI by the name "' + b + '"')
			}
			var a = {
				name: b,
				parent: this
			};
			a.autoPlace = this.autoPlace;
			if (this.load && this.load.folders && this.load.folders[b]) {
				a.closed = this.load.folders[b].closed;
				a.load = this.load.folders[b]
			}
			var c = new au(a);
			this.__folders[b] = c;
			var d = X(this, c.domElement);
			ay.addClass(d, "folder");
			return c
		},
		open: function() {
			this.closed = false
		},
		close: function() {
			this.closed = true
		},
		onResize: function() {
			var c = this.getRoot();
			if (c.scrollable) {
				var a = ay.getOffset(c.__ul).top;
				var b = 0;
				ah.each(c.__ul.childNodes, function(d) {
					if (!(c.autoPlace && d === c.__save_row)) {
						b += ay.getHeight(d)
					}
				});
				if (window.innerHeight - a - ap < b) {
					ay.addClass(c.domElement, au.CLASS_TOO_TALL);
					c.__ul.style.height = window.innerHeight - a - ap + "px"
				} else {
					ay.removeClass(c.domElement, au.CLASS_TOO_TALL);
					c.__ul.style.height = "auto"
				}
			}
			if (c.__resize_handle) {
				ah.defer(function() {
					c.__resize_handle.style.height = c.__ul.offsetHeight + "px"
				})
			}
			if (c.__closeButton) {
				c.__closeButton.style.width = c.width + "px"
			}
		},
		remember: function() {
			if (ah.isUndefined(ad)) {
				ad = new aq();
				ad.domElement.innerHTML = T
			}
			if (this.parent) {
				throw new Error("You can only call remember on a top level GUI.")
			}
			var a = this;
			ah.each(Array.prototype.slice.call(arguments), function(b) {
				if (a.__rememberedObjects.length == 0) {
					ae(a)
				}
				if (a.__rememberedObjects.indexOf(b) == -1) {
					a.__rememberedObjects.push(b)
				}
			});
			if (this.autoPlace) {
				R(this, this.width)
			}
		},
		getRoot: function() {
			var a = this;
			while (a.parent) {
				a = a.parent
			}
			return a
		},
		getSaveObject: function() {
			var a = this.load;
			a.closed = this.closed;
			if (this.__rememberedObjects.length > 0) {
				a.preset = this.preset;
				if (!a.remembered) {
					a.remembered = {}
				}
				a.remembered[this.preset] = U(this)
			}
			a.folders = {};
			ah.each(this.__folders, function(b, c) {
				a.folders[c] = b.getSaveObject()
			});
			return a
		},
		save: function() {
			if (!this.load.remembered) {
				this.load.remembered = {}
			}
			this.load.remembered[this.preset] = U(this);
			am(this, false);
			this.saveToLocalStorageIfPossible()
		},
		saveAs: function(a) {
			if (!this.load.remembered) {
				this.load.remembered = {};
				this.load.remembered[az] = U(this, true)
			}
			this.load.remembered[a] = U(this);
			this.preset = a;
			ac(this, a, true);
			this.saveToLocalStorageIfPossible()
		},
		revert: function(a) {
			ah.each(this.__controllers, function(b) {
				if (!this.getRoot().load.remembered) {
					b.setValue(b.initialValue)
				} else {
					aw(a || this.getRoot(), b)
				}
			}, this);
			ah.each(this.__folders, function(b) {
				b.revert(b)
			});
			if (!a) {
				am(this.getRoot(), false)
			}
		},
		listen: function(b) {
			var a = this.__listening.length == 0;
			this.__listening.push(b);
			if (a) {
				Q(this.__listening)
			}
		}
	});

	function ax(g, e, b, f) {
		if (e[b] === undefined) {
			throw new Error("Object " + e + ' has no property "' + b + '"')
		}
		var d;
		if (f.color) {
			d = new ag(e, b)
		} else {
			var a = [e, b].concat(f.factoryArgs);
			d = at.apply(g, a)
		}
		if (f.before instanceof av) {
			f.before = f.before.__li
		}
		aw(g, d);
		ay.addClass(d.domElement, "c");
		var i = document.createElement("span");
		ay.addClass(i, "property-name");
		i.innerHTML = d.property;
		var h = document.createElement("div");
		h.appendChild(i);
		h.appendChild(d.domElement);
		var c = X(g, h, f.before);
		ay.addClass(c, au.CLASS_CONTROLLER_ROW);
		ay.addClass(c, typeof d.getValue());
		an(g, c, d);
		g.__controllers.push(d);
		return d
	}

	function X(c, a, b) {
		var d = document.createElement("li");
		if (a) {
			d.appendChild(a)
		}
		if (b) {
			c.__ul.insertBefore(d, params.before)
		} else {
			c.__ul.appendChild(d)
		}
		c.onResize();
		return d
	}

	function an(c, e, d) {
		d.__li = e;
		d.__gui = c;
		ah.extend(d, {
			options: function(f) {
				if (arguments.length > 1) {
					d.remove();
					return ax(c, d.object, d.property, {
						before: d.__li.nextElementSibling,
						factoryArgs: [ah.toArray(arguments)]
					})
				}
				if (ah.isArray(f) || ah.isObject(f)) {
					d.remove();
					return ax(c, d.object, d.property, {
						before: d.__li.nextElementSibling,
						factoryArgs: [f]
					})
				}
			},
			name: function(f) {
				d.__li.firstElementChild.firstElementChild.innerHTML = f;
				return d
			},
			listen: function() {
				d.__gui.listen(d);
				return d
			},
			remove: function() {
				d.__gui.remove(d);
				return d
			}
		});
		if (d instanceof O) {
			var a = new ai(d.object, d.property, {
				min: d.__min,
				max: d.__max,
				step: d.__step
			});
			ah.each(["updateDisplay", "onChange", "onFinishChange"], function(f) {
				var h = d[f];
				var g = a[f];
				d[f] = a[f] = function() {
					var i = Array.prototype.slice.call(arguments);
					h.apply(d, i);
					return g.apply(a, i)
				}
			});
			ay.addClass(e, "has-slider");
			d.domElement.insertBefore(a.domElement, d.domElement.firstElementChild)
		} else {
			if (d instanceof ai) {
				var b = function(f) {
					if (ah.isNumber(d.__min) && ah.isNumber(d.__max)) {
						d.remove();
						return ax(c, d.object, d.property, {
							before: d.__li.nextElementSibling,
							factoryArgs: [d.__min, d.__max, d.__step]
						})
					}
					return f
				};
				d.min = ah.compose(b, d.min);
				d.max = ah.compose(b, d.max)
			} else {
				if (d instanceof ab) {
					ay.bind(e, "click", function() {
						ay.fakeEvent(d.__checkbox, "click")
					});
					ay.bind(d.__checkbox, "click", function(f) {
						f.stopPropagation()
					})
				} else {
					if (d instanceof al) {
						ay.bind(e, "click", function() {
							ay.fakeEvent(d.__button, "click")
						});
						ay.bind(e, "mouseover", function() {
							ay.addClass(d.__button, "hover")
						});
						ay.bind(e, "mouseout", function() {
							ay.removeClass(d.__button, "hover")
						})
					} else {
						if (d instanceof ag) {
							ay.addClass(e, "color");
							d.updateDisplay = ah.compose(function(f) {
								e.style.borderLeftColor = d.__color.toString();
								return f
							}, d.updateDisplay);
							d.updateDisplay()
						}
					}
				}
			}
		}
		d.setValue = ah.compose(function(f) {
			if (c.getRoot().__preset_select && d.isModified()) {
				am(c.getRoot(), true)
			}
			return f
		}, d.setValue)
	}

	function aw(f, g) {
		var h = f.getRoot();
		var a = h.__rememberedObjects.indexOf(g.object);
		if (a != -1) {
			var d = h.__rememberedObjectIndecesToControllers[a];
			if (d === undefined) {
				d = {};
				h.__rememberedObjectIndecesToControllers[a] = d
			}
			d[g.property] = g;
			if (h.load && h.load.remembered) {
				var e = h.load.remembered;
				var c;
				if (e[f.preset]) {
					c = e[f.preset]
				} else {
					if (e[az]) {
						c = e[az]
					} else {
						return
					}
				}
				if (c[a] && c[a][g.property] !== undefined) {
					var b = c[a][g.property];
					g.initialValue = b;
					g.setValue(b)
				}
			}
		}
	}

	function aj(b, a) {
		return document.location.href + "." + a
	}

	function ae(i) {
		var l = i.__save_row = document.createElement("li");
		ay.addClass(i.domElement, "has-save");
		i.__ul.insertBefore(l, i.__ul.firstChild);
		ay.addClass(l, "save-row");
		var j = document.createElement("span");
		j.innerHTML = "&nbsp;";
		ay.addClass(j, "button gears");
		var h = document.createElement("span");
		h.innerHTML = "Save";
		ay.addClass(h, "button");
		ay.addClass(h, "save");
		var e = document.createElement("span");
		e.innerHTML = "New";
		ay.addClass(e, "button");
		ay.addClass(e, "save-as");
		var g = document.createElement("span");
		g.innerHTML = "Revert";
		ay.addClass(g, "button");
		ay.addClass(g, "revert");
		var a = i.__preset_select = document.createElement("select");
		if (i.load && i.load.remembered) {
			ah.each(i.load.remembered, function(n, m) {
				ac(i, m, m == i.preset)
			})
		} else {
			ac(i, az, false)
		}
		ay.bind(a, "change", function() {
			for (var m = 0; m < i.__preset_select.length; m++) {
				i.__preset_select[m].innerHTML = i.__preset_select[m].value
			}
			i.preset = this.value
		});
		l.appendChild(a);
		l.appendChild(j);
		l.appendChild(h);
		l.appendChild(e);
		l.appendChild(g);
		if (aA) {
			var b = document.getElementById("dg-save-locally");
			var f = document.getElementById("dg-local-explain");
			b.style.display = "block";
			var d = document.getElementById("dg-local-storage");
			if (localStorage.getItem(aj(i, "isLocal")) === "true") {
				d.setAttribute("checked", "checked")
			}

			function k() {
				f.style.display = i.useLocalStorage ? "block" : "none"
			}
			k();
			ay.bind(d, "change", function() {
				i.useLocalStorage = !i.useLocalStorage;
				k()
			})
		}
		var c = document.getElementById("dg-new-constructor");
		ay.bind(c, "keydown", function(m) {
			if (m.metaKey && (m.which === 67 || m.keyCode == 67)) {
				ad.hide()
			}
		});
		ay.bind(j, "click", function() {
			c.innerHTML = JSON.stringify(i.getSaveObject(), undefined, 2);
			ad.show();
			c.focus();
			c.select()
		});
		ay.bind(h, "click", function() {
			i.save()
		});
		ay.bind(e, "click", function() {
			var m = prompt("Enter a new preset name.");
			if (m) {
				i.saveAs(m)
			}
		});
		ay.bind(g, "click", function() {
			i.revert()
		})
	}

	function P(c) {
		c.__resize_handle = document.createElement("div");
		ah.extend(c.__resize_handle.style, {
			width: "6px",
			marginLeft: "-3px",
			height: "200px",
			cursor: "ew-resize",
			position: "absolute"
		});
		var d;
		ay.bind(c.__resize_handle, "mousedown", e);
		ay.bind(c.__closeButton, "mousedown", e);
		c.domElement.insertBefore(c.__resize_handle, c.domElement.firstElementChild);

		function e(f) {
			f.preventDefault();
			d = f.clientX;
			ay.addClass(c.__closeButton, au.CLASS_DRAG);
			ay.bind(window, "mousemove", a);
			ay.bind(window, "mouseup", b);
			return false
		}

		function a(f) {
			f.preventDefault();
			c.width += d - f.clientX;
			c.onResize();
			d = f.clientX;
			return false
		}

		function b() {
			ay.removeClass(c.__closeButton, au.CLASS_DRAG);
			ay.unbind(window, "mousemove", a);
			ay.unbind(window, "mouseup", b)
		}
	}

	function R(a, b) {
		a.domElement.style.width = b + "px";
		if (a.__save_row && a.autoPlace) {
			a.__save_row.style.width = b + "px"
		}
		if (a.__closeButton) {
			a.__closeButton.style.width = b + "px"
		}
	}

	function U(c, b) {
		var a = {};
		ah.each(c.__rememberedObjects, function(d, f) {
			var g = {};
			var e = c.__rememberedObjectIndecesToControllers[f];
			ah.each(e, function(i, h) {
				g[h] = b ? i.initialValue : i.getValue()
			});
			a[f] = g
		});
		return a
	}

	function ac(d, c, a) {
		var b = document.createElement("option");
		b.innerHTML = c;
		b.value = c;
		d.__preset_select.appendChild(b);
		if (a) {
			d.__preset_select.selectedIndex = d.__preset_select.length - 1
		}
	}

	function af(b) {
		for (var a = 0; a < b.__preset_select.length; a++) {
			if (b.__preset_select[a].value == b.preset) {
				b.__preset_select.selectedIndex = a
			}
		}
	}

	function am(c, b) {
		var a = c.__preset_select[c.__preset_select.selectedIndex];
		if (b) {
			a.innerHTML = a.value + "*"
		} else {
			a.innerHTML = a.value
		}
	}

	function Q(a) {
		if (a.length != 0) {
			ao(function() {
				Q(a)
			})
		}
		ah.each(a, function(b) {
			b.updateDisplay()
		})
	}
	return au
})(dat.utils.css, '<div id="dg-save" class="dg dialogue">\n\n  Here\'s the new load parameter for your <code>GUI</code>\'s constructor:\n\n  <textarea id="dg-new-constructor"></textarea>\n\n  <div id="dg-save-locally">\n\n    <input id="dg-local-storage" type="checkbox"/> Automatically save\n    values to <code>localStorage</code> on exit.\n\n    <div id="dg-local-explain">The values saved to <code>localStorage</code> will\n      override those passed to <code>dat.GUI</code>\'s constructor. This makes it\n      easier to work incrementally, but <code>localStorage</code> is fragile,\n      and your friends may not see the same values you do.\n      \n    </div>\n    \n  </div>\n\n</div>', cssConverterElement.innerHTML, dat.controllers.factory = (function(l, n, m, i, j, k, h) {
	return function(b, a) {
		var c = b[a];
		if (h.isArray(arguments[2]) || h.isObject(arguments[2])) {
			return new l(b, a, arguments[2])
		}
		if (h.isNumber(c)) {
			if (h.isNumber(arguments[2]) && h.isNumber(arguments[3])) {
				return new m(b, a, arguments[2], arguments[3])
			} else {
				return new n(b, a, {
					min: arguments[2],
					max: arguments[3]
				})
			}
		}
		if (h.isString(c)) {
			return new i(b, a)
		}
		if (h.isFunction(c)) {
			return new j(b, a, "")
		}
		if (h.isBoolean(c)) {
			return new k(b, a)
		}
	}
})(dat.controllers.OptionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.StringController = (function(h, g, e) {
	var f = function(d, b) {
		f.superclass.call(this, d, b);
		var a = this;
		this.__input = document.createElement("input");
		this.__input.setAttribute("type", "text");
		g.bind(this.__input, "keyup", j);
		g.bind(this.__input, "change", j);
		g.bind(this.__input, "blur", c);
		g.bind(this.__input, "keydown", function(i) {
			if (i.keyCode === 13) {
				this.blur()
			}
		});

		function j() {
			a.setValue(a.__input.value)
		}

		function c() {
			if (a.__onFinishChange) {
				a.__onFinishChange.call(a, a.getValue())
			}
		}
		this.updateDisplay();
		this.domElement.appendChild(this.__input)
	};
	f.superclass = h;
	e.extend(f.prototype, h.prototype, {
		updateDisplay: function() {
			if (!g.isActive(this.__input)) {
				this.__input.value = this.getValue()
			}
			return f.superclass.prototype.updateDisplay.call(this)
		}
	});
	return f
})(dat.controllers.Controller, dat.dom.dom, dat.utils.common), dat.controllers.FunctionController, dat.controllers.BooleanController, dat.utils.common), dat.controllers.Controller, dat.controllers.BooleanController, dat.controllers.FunctionController, dat.controllers.NumberControllerBox, dat.controllers.NumberControllerSlider, dat.controllers.OptionController, dat.controllers.ColorController = (function(p, o, r, q, m) {
	var n = function(f, a) {
		n.superclass.call(this, f, a);
		this.__color = new r(this.getValue());
		this.__temp = new r(0);
		var c = this;
		this.domElement = document.createElement("div");
		o.makeSelectable(this.domElement, false);
		this.__selector = document.createElement("div");
		this.__selector.className = "selector";
		this.__saturation_field = document.createElement("div");
		this.__saturation_field.className = "saturation-field";
		this.__field_knob = document.createElement("div");
		this.__field_knob.className = "field-knob";
		this.__field_knob_border = "2px solid ";
		this.__hue_knob = document.createElement("div");
		this.__hue_knob.className = "hue-knob";
		this.__hue_field = document.createElement("div");
		this.__hue_field.className = "hue-field";
		this.__input = document.createElement("input");
		this.__input.type = "text";
		this.__input_textShadow = "0 1px 1px ";
		o.bind(this.__input, "keydown", function(s) {
			if (s.keyCode === 13) {
				i.call(this)
			}
		});
		o.bind(this.__input, "blur", i);
		o.bind(this.__selector, "mousedown", function(s) {
			o.addClass(this, "drag").bind(window, "mouseup", function(v) {
				o.removeClass(c.__selector, "drag")
			})
		});
		var e = document.createElement("div");
		m.extend(this.__selector.style, {
			width: "122px",
			height: "102px",
			padding: "3px",
			backgroundColor: "#222",
			boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
		});
		m.extend(this.__field_knob.style, {
			position: "absolute",
			width: "12px",
			height: "12px",
			border: this.__field_knob_border + (this.__color.v < 0.5 ? "#fff" : "#000"),
			boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
			borderRadius: "12px",
			zIndex: 1
		});
		m.extend(this.__hue_knob.style, {
			position: "absolute",
			width: "15px",
			height: "2px",
			borderRight: "4px solid #fff",
			zIndex: 1
		});
		m.extend(this.__saturation_field.style, {
			width: "100px",
			height: "100px",
			border: "1px solid #555",
			marginRight: "3px",
			display: "inline-block",
			cursor: "pointer"
		});
		m.extend(e.style, {
			width: "100%",
			height: "100%",
			background: "none"
		});
		l(e, "top", "rgba(0,0,0,0)", "#000");
		m.extend(this.__hue_field.style, {
			width: "15px",
			height: "100px",
			display: "inline-block",
			border: "1px solid #555",
			cursor: "ns-resize"
		});
		j(this.__hue_field);
		m.extend(this.__input.style, {
			outline: "none",
			textAlign: "center",
			color: "#fff",
			border: 0,
			fontWeight: "bold",
			textShadow: this.__input_textShadow + "rgba(0,0,0,0.7)"
		});
		o.bind(this.__saturation_field, "mousedown", b);
		o.bind(this.__field_knob, "mousedown", b);
		o.bind(this.__hue_field, "mousedown", function(s) {
			d(s);
			o.bind(window, "mousemove", d);
			o.bind(window, "mouseup", h)
		});

		function b(s) {
			g(s);
			o.bind(window, "mousemove", g);
			o.bind(window, "mouseup", t)
		}

		function t() {
			o.unbind(window, "mousemove", g);
			o.unbind(window, "mouseup", t)
		}

		function i() {
			var s = q(this.value);
			if (s !== false) {
				c.__color.__state = s;
				c.setValue(c.__color.toOriginal())
			} else {
				this.value = c.__color.toString()
			}
		}

		function h() {
			o.unbind(window, "mousemove", d);
			o.unbind(window, "mouseup", h)
		}
		this.__saturation_field.appendChild(e);
		this.__selector.appendChild(this.__field_knob);
		this.__selector.appendChild(this.__saturation_field);
		this.__selector.appendChild(this.__hue_field);
		this.__hue_field.appendChild(this.__hue_knob);
		this.domElement.appendChild(this.__input);
		this.domElement.appendChild(this.__selector);
		this.updateDisplay();

		function g(B) {
			B.preventDefault();
			var w = o.getWidth(c.__saturation_field);
			var A = o.getOffset(c.__saturation_field);
			var s = (B.clientX - A.left + document.body.scrollLeft) / w;
			var v = 1 - (B.clientY - A.top + document.body.scrollTop) / w;
			if (v > 1) {
				v = 1
			} else {
				if (v < 0) {
					v = 0
				}
			}
			if (s > 1) {
				s = 1
			} else {
				if (s < 0) {
					s = 0
				}
			}
			c.__color.v = v;
			c.__color.s = s;
			c.setValue(c.__color.toOriginal());
			return false
		}

		function d(x) {
			x.preventDefault();
			var y = o.getHeight(c.__hue_field);
			var s = o.getOffset(c.__hue_field);
			var z = 1 - (x.clientY - s.top + document.body.scrollTop) / y;
			if (z > 1) {
				z = 1
			} else {
				if (z < 0) {
					z = 0
				}
			}
			c.__color.h = z * 360;
			c.setValue(c.__color.toOriginal());
			return false
		}
	};
	n.superclass = p;
	m.extend(n.prototype, p.prototype, {
		updateDisplay: function() {
			var c = q(this.getValue());
			if (c !== false) {
				var d = false;
				m.each(r.COMPONENTS, function(e) {
					if (!m.isUndefined(c[e]) && !m.isUndefined(this.__color.__state[e]) && c[e] !== this.__color.__state[e]) {
						d = true;
						return {}
					}
				}, this);
				if (d) {
					m.extend(this.__color.__state, c)
				}
			}
			m.extend(this.__temp.__state, this.__color.__state);
			this.__temp.a = 1;
			var a = (this.__color.v < 0.5 || this.__color.s > 0.5) ? 255 : 0;
			var b = 255 - a;
			m.extend(this.__field_knob.style, {
				marginLeft: 100 * this.__color.s - 7 + "px",
				marginTop: 100 * (1 - this.__color.v) - 7 + "px",
				backgroundColor: this.__temp.toString(),
				border: this.__field_knob_border + "rgb(" + a + "," + a + "," + a + ")"
			});
			this.__hue_knob.style.marginTop = (1 - this.__color.h / 360) * 100 + "px";
			this.__temp.s = 1;
			this.__temp.v = 1;
			l(this.__saturation_field, "left", "#fff", this.__temp.toString());
			m.extend(this.__input.style, {
				backgroundColor: this.__input.value = this.__color.toString(),
				color: "rgb(" + a + "," + a + "," + a + ")",
				textShadow: this.__input_textShadow + "rgba(" + b + "," + b + "," + b + ",.7)"
			})
		}
	});
	var k = ["-moz-", "-o-", "-webkit-", "-ms-", ""];

	function l(a, c, b, d) {
		a.style.background = "";
		m.each(k, function(e) {
			a.style.cssText += "background: " + e + "linear-gradient(" + c + ", " + b + " 0%, " + d + " 100%); "
		})
	}

	function j(a) {
		a.style.background = "";
		a.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);";
		a.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
		a.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
		a.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);";
		a.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);"
	}
	return n
})(dat.controllers.Controller, dat.dom.dom, dat.color.Color = (function(q, k, p, l) {
	var r = function() {
		this.__state = q.apply(this, arguments);
		if (this.__state === false) {
			throw "Failed to interpret color arguments"
		}
		this.__state.a = this.__state.a || 1
	};
	r.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"];
	l.extend(r.prototype, {
		toString: function() {
			return p(this)
		},
		toOriginal: function() {
			return this.__state.conversion.write(this)
		}
	});
	m(r.prototype, "r", 2);
	m(r.prototype, "g", 1);
	m(r.prototype, "b", 0);
	j(r.prototype, "h");
	j(r.prototype, "s");
	j(r.prototype, "v");
	Object.defineProperty(r.prototype, "a", {
		get: function() {
			return this.__state.a
		},
		set: function(a) {
			this.__state.a = a
		}
	});
	Object.defineProperty(r.prototype, "hex", {
		get: function() {
			if (!this.__state.space !== "HEX") {
				this.__state.hex = k.rgb_to_hex(this.r, this.g, this.b)
			}
			return this.__state.hex
		},
		set: function(a) {
			this.__state.space = "HEX";
			this.__state.hex = a
		}
	});

	function m(a, b, c) {
		Object.defineProperty(a, b, {
			get: function() {
				if (this.__state.space === "RGB") {
					return this.__state[b]
				}
				n(this, b, c);
				return this.__state[b]
			},
			set: function(d) {
				if (this.__state.space !== "RGB") {
					n(this, b, c);
					this.__state.space = "RGB"
				}
				this.__state[b] = d
			}
		})
	}

	function j(a, b) {
		Object.defineProperty(a, b, {
			get: function() {
				if (this.__state.space === "HSV") {
					return this.__state[b]
				}
				o(this);
				return this.__state[b]
			},
			set: function(c) {
				if (this.__state.space !== "HSV") {
					o(this);
					this.__state.space = "HSV"
				}
				this.__state[b] = c
			}
		})
	}

	function n(c, a, b) {
		if (c.__state.space === "HEX") {
			c.__state[a] = k.component_from_hex(c.__state.hex, b)
		} else {
			if (c.__state.space === "HSV") {
				l.extend(c.__state, k.hsv_to_rgb(c.__state.h, c.__state.s, c.__state.v))
			} else {
				throw "Corrupted color state"
			}
		}
	}

	function o(a) {
		var b = k.rgb_to_hsv(a.r, a.g, a.b);
		l.extend(a.__state, {
			s: b.s,
			v: b.v
		});
		if (!l.isNaN(b.h)) {
			a.__state.h = b.h
		} else {
			if (l.isUndefined(a.__state.h)) {
				a.__state.h = 0
			}
		}
	}
	return r
})(dat.color.interpret, dat.color.math = (function() {
	var b;
	return {
		hsv_to_rgb: function(o, a, f) {
			var p = Math.floor(o / 60) % 6;
			var n = o / 60 - Math.floor(o / 60);
			var q = f * (1 - a);
			var r = f * (1 - (n * a));
			var c = f * (1 - ((1 - n) * a));
			var h = [
				[f, c, q],
				[r, f, q],
				[q, f, c],
				[q, r, f],
				[c, q, f],
				[f, q, r]
			][p];
			return {
				r: h[0] * 255,
				g: h[1] * 255,
				b: h[2] * 255
			}
		},
		rgb_to_hsv: function(g, h, p) {
			var o = Math.min(g, h, p),
				q = Math.max(g, h, p),
				a = q - o,
				m, n;
			if (q != 0) {
				n = a / q
			} else {
				return {
					h: NaN,
					s: 0,
					v: 0
				}
			}
			if (g == q) {
				m = (h - p) / a
			} else {
				if (h == q) {
					m = 2 + (p - g) / a
				} else {
					m = 4 + (g - h) / a
				}
			}
			m /= 6;
			if (m < 0) {
				m += 1
			}
			return {
				h: m * 360,
				s: n,
				v: q / 255
			}
		},
		rgb_to_hex: function(a, g, i) {
			var h = this.hex_with_component(0, 2, a);
			h = this.hex_with_component(h, 1, g);
			h = this.hex_with_component(h, 0, i);
			return h
		},
		component_from_hex: function(d, a) {
			return (d >> (a * 8)) & 255
		},
		hex_with_component: function(f, a, e) {
			return e << (b = a * 8) | (f & ~(255 << b))
		}
	}
})(), dat.color.toString, dat.utils.common), dat.color.interpret, dat.utils.common), dat.utils.requestAnimationFrame = (function() {
	return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(c, d) {
		window.setTimeout(c, 1000 / 60)
	}
})(), dat.dom.CenteredDiv = (function(g, h) {
	var e = function() {
		this.backgroundElement = document.createElement("div");
		h.extend(this.backgroundElement.style, {
			backgroundColor: "rgba(0,0,0,0.8)",
			top: 0,
			left: 0,
			display: "none",
			zIndex: "1000",
			opacity: 0,
			WebkitTransition: "opacity 0.2s linear"
		});
		g.makeFullscreen(this.backgroundElement);
		this.backgroundElement.style.position = "fixed";
		this.domElement = document.createElement("div");
		h.extend(this.domElement.style, {
			position: "fixed",
			display: "none",
			zIndex: "1001",
			opacity: 0,
			WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear"
		});
		document.body.appendChild(this.backgroundElement);
		document.body.appendChild(this.domElement);
		var a = this;
		g.bind(this.backgroundElement, "click", function() {
			a.hide()
		})
	};
	e.prototype.show = function() {
		var a = this;
		this.backgroundElement.style.display = "block";
		this.domElement.style.display = "block";
		this.domElement.style.opacity = 0;
		this.domElement.style.webkitTransform = "scale(1.1)";
		this.layout();
		h.defer(function() {
			a.backgroundElement.style.opacity = 1;
			a.domElement.style.opacity = 1;
			a.domElement.style.webkitTransform = "scale(1)"
		})
	};
	e.prototype.hide = function() {
		var a = this;
		var b = function() {
			a.domElement.style.display = "none";
			a.backgroundElement.style.display = "none";
			g.unbind(a.domElement, "webkitTransitionEnd", b);
			g.unbind(a.domElement, "transitionend", b);
			g.unbind(a.domElement, "oTransitionEnd", b)
		};
		g.bind(this.domElement, "webkitTransitionEnd", b);
		g.bind(this.domElement, "transitionend", b);
		g.bind(this.domElement, "oTransitionEnd", b);
		this.backgroundElement.style.opacity = 0;
		this.domElement.style.opacity = 0;
		this.domElement.style.webkitTransform = "scale(1.1)"
	};
	e.prototype.layout = function() {
		this.domElement.style.left = window.innerWidth / 2 - g.getWidth(this.domElement) / 2 + "px";
		this.domElement.style.top = window.innerHeight / 2 - g.getHeight(this.domElement) / 2 + "px"
	};

	function f(a) {}
	return e
})(dat.dom.dom, dat.utils.common), dat.dom.dom, dat.utils.common);
Sys.ns("Layering");
Layering.Game = {
	Background: {
		image: 0
	},
	Logo: {
		image: 5
	},
	ResourceLoader: {
		fade: 50,
		spinner: 51
	},
	Movie: {
		video: 50,
		button: 51
	}
};
Sys.ns("Layering.Game");
Layering.Game.Slots = {
	BigWin: {
		text: 20
	},
	CoinWin: {
		background: 15,
		text: 16
	},
	FreeSpinSymbolAttentionAnimation: {
		animationItems: 2
	},
	FreeSpinAdditional: {
		text: 20
	},
	FreeSpinCountDown: {
		text: 20
	},
	FreeSpinIntro: {
		skip: 121,
		background: 122,
		button: 123,
		text: 124
	},
	FreeSpinOutro: {
		background: 120,
		backgroundImage: 121,
		button: 122,
		text: 123
	},
	Keypad: {
		background_basic: 3,
		background_freespin: 35,
		bet: 4,
		balance: 4,
		win: 36,
		total_win: 36,
		betLevelSelector: 5,
		coinValueSelector: 5,
		maxBet: {
			button: 5,
			label: 6
		},
		autoPlay: {
			button: 5,
			label: 6
		},
		paytable: {
			button: 5,
			label: 6
		}
	},
	QuickStop: {
		flash: 25
	},
	Spin: {
		"default": {
			symbols: 1
		},
		symbols: 1
	},
	SpreadingWild: {
		symbols: 5
	},
	StickySymbols: {
		symbols: 5
	},
	WinningSymbols: {
		animationItems: 10
	},
	WinSituationsDisplay: {
		hoverBetlines: 21,
		betlines: 20,
		betlineNumberHighlight: 20
	}
};
Sys.ns("Core");
Core.DeviceDetectionCodes = {
	WHITE: 0,
	GREY_OS: 1,
	GREY_OS_VERSION: 2,
	GREY_BROWSER: 3,
	GREY_BROWSER_VERSION: 4,
	BLACK_OS: 5,
	BLACK_OS_VERSION: 6,
	BLACK_BROWSER: 7,
	BLACK_BROWSER_VERSION: 8
};
Core.DeviceDetectionService = (function() {
	var j, i, g, h, f;
	j = function(b, c, a) {
		var e = new RegExp(c),
			d = e.exec(b),
			l;
		if (!(d && d.length > 0)) {
			throw new Error("Could not find a matching version")
		}
		l = d[1];
		if (a) {
			l = l.replace(new RegExp(a, "g"), ".")
		}
		if (!Core._DeviceDetectionUtils.isVersionNumber(l)) {
			throw new Error("The match found is not a valid version")
		}
		return l
	};
	i = function(b, y, c) {
		var s = Object.keys(y),
			e = s.length,
			a, x, v, u, t, d, w;
		for (w = 0; w < e; w++) {
			a = y[s[w]];
			x = c[s[w]];
			u = false;
			v = new RegExp(x.matchPattern);
			if (x.excludePattern) {
				u = (new RegExp(x.excludePattern)).test(b)
			}
			if (v.test(b) && !u) {
				if (a.version) {
					t = j(b, x.version.matchPattern, x.version.separator);
					d = Core._DeviceDetectionUtils.isInRange(t, a.version.min, a.version.max)
				} else {
					d = true
				}
				return {
					name: s[w],
					inRange: d
				}
			}
		}
		return null
	};
	g = function(b, a) {
		var o = a.definitions.operatingSystems,
			c = a.ruleSets.white || {},
			e = i(b, c, o),
			d, n, p = {};
		if (e) {
			p.allowed = true;
			p.preferredBrowser = o[e.name].preferredBrowser;
			if (!e.inRange) {
				p.code = Core.DeviceDetectionCodes.GREY_OS_VERSION;
				return p
			}
			n = c[e.name].browsers;
			d = i(b, n || {}, a.definitions.browsers);
			if (!n) {
				p.code = Core.DeviceDetectionCodes.WHITE
			} else {
				if (d) {
					if (!d.inRange) {
						p.code = Core.DeviceDetectionCodes.GREY_BROWSER_VERSION
					} else {
						p.code = Core.DeviceDetectionCodes.WHITE
					}
				} else {
					p.code = Core.DeviceDetectionCodes.GREY_BROWSER
				}
			}
		}
		return p
	};
	h = function(b, s) {
		var t = s.definitions.operatingSystems,
			d = s.ruleSets.black || {},
			c = i(b, d, t),
			p, q, r, e, a = {};
		if (c && c.inRange) {
			p = d[c.name];
			q = p.browsers;
			r = i(b, q || {}, s.definitions.browsers);
			if (r && r.inRange) {
				e = q[r.name];
				a.preferredBrowser = t[c.name].preferredBrowser;
				a.allowed = false;
				if (!e.version) {
					a.code = Core.DeviceDetectionCodes.BLACK_BROWSER
				} else {
					a.code = Core.DeviceDetectionCodes.BLACK_BROWSER_VERSION
				}
			} else {
				if (!p.version) {
					a.allowed = false;
					a.code = Core.DeviceDetectionCodes.BLACK_OS
				} else {
					if (!q) {
						a.allowed = false;
						a.code = Core.DeviceDetectionCodes.BLACK_OS_VERSION
					}
				}
			}
		}
		return a
	};
	f = function(c, a) {
		var b = Resources.readData("disableDeviceDetection"),
			d = {
				preferredBrowser: null,
				allowed: true,
				code: Core.DeviceDetectionCodes.GREY_OS
			};
		if (!b) {
			Sys.applyProperties(d, g(c, a));
			Sys.applyProperties(d, h(c, a));
			return d
		}
		return {
			preferredBrowser: null,
			allowed: true,
			code: Core.DeviceDetectionCodes.WHITE
		}
	};
	return {
		validate: function(b, a) {
			if (!Sys.isString(b)) {
				throw new Error("Could not validate the device since the user agent was not a string")
			}
			if (!Sys.isObj(a)) {
				throw new Error("Could not validate the device since the configuration was not an object")
			}
			return f(b, a)
		}
	}
}());
Sys.ns("Core");
Core._DeviceDetectionUtils = (function() {
	return {
		isVersionNumber: function(b) {
			return (/^\d+(\.\d+){0,2}$/).test(b)
		},
		compareVersions: function(m, n) {
			var l, a, k, b, i;
			if (!Core._DeviceDetectionUtils.isVersionNumber(m) || !Core._DeviceDetectionUtils.isVersionNumber(n)) {
				throw new Error("The versions provided are not valid versions")
			}
			b = m.split(".").map(parseFloat);
			i = n.split(".").map(parseFloat);
			while (b.length < i.length) {
				b.push(0)
			}
			while (i.length < b.length) {
				i.push(0)
			}
			for (l = 0; l < b.length; l++) {
				a = b[l];
				k = i[l];
				if (a === k) {
					continue
				}
				return a < k ? -1 : 1
			}
			return 0
		},
		isInRange: function(f, i, g) {
			var h = true,
				j = true;
			if (i && Core._DeviceDetectionUtils.compareVersions(f, i) < 0) {
				h = false
			}
			if (g && Core._DeviceDetectionUtils.compareVersions(f, g) > 0) {
				j = false
			}
			return h && j
		}
	}
}());
Sys.ns("Loader");
Loader.DeviceDetector = {
	constructor: function() {
		Loader.DeviceDetector.superclass.constructor.call(this);
		this.setupEvents()
	},
	setupEvents: function() {
		var b = this;
		b.on({
			"notify:resourceHandler.priorityListComplete": b.onPriorityListComplete
		})
	},
	onPriorityListComplete: function() {
		this.performValidation()
	},
	performValidation: function() {
		var i = this,
			e = Core.DeviceDetectionCodes,
			j = Resources.readData("deviceDetectionJson"),
			g;
		try {
			g = Core.DeviceDetectionService.validate(navigator.userAgent, j)
		} catch (h) {
			i.fireEvent("request:loaderErrorHandler.showTechnicalError");
			return
		}
		switch (g.code) {
			case e.WHITE:
				i.handleWhiteListedCombination();
				break;
			case e.GREY_OS:
				i.handleGreyListedCombination(Services.languageManager.getText(Language.Keys.MGnoOSSupport));
				break;
			case Core.DeviceDetectionCodes.GREY_OS_VERSION:
				i.handleGreyListedCombination(Services.languageManager.getText(Language.Keys.deviceBestGameExperience));
				break;
			case Core.DeviceDetectionCodes.GREY_BROWSER:
				i.handleGreyListedCombination(Services.languageManager.getText(Language.Keys.optimisedForVersion, [g.preferredBrowser]));
				break;
			case Core.DeviceDetectionCodes.GREY_BROWSER_VERSION:
				i.handleGreyListedCombination(Services.languageManager.getText(Language.Keys.deviceUpdateBrowser));
				break;
			case e.BLACK_OS:
			case e.BLACK_OS_VERSION:
			case e.BLACK_BROWSER:
			case e.BLACK_BROWSER_VERSION:
				i.handleBlackListedCombination();
				break;
			default:
				i.fireEvent("request:loaderErrorHandler.showTechnicalError")
		}
	},
	handleWhiteListedCombination: function() {
		this.fireEvent("notify:deviceDetector.validationComplete", true);
		this.fireEvent("notify:deviceDetector.finished")
	},
	handleGreyListedCombination: function(f) {
		var d = this,
			e = {
				proceed: {
					label: Services.languageManager.getText(Language.Keys.btn_continue),
					action: function() {
						d.fireEvent("notify:deviceDetector.finished");
						d.fireEvent("request:loader.hideDialog")
					}
				},
				casinoLobby: {
					label: Services.languageManager.getText(Language.Keys.btn_casino),
					action: function() {
						Environment.goToLobby("6")
					}
				}
			};
		d.fireEvent("notify:deviceDetector.validationComplete", true);
		d.showDialog({
			texts: [f],
			buttons: Platform.isDesktopDevice ? [e.proceed] : [e.casinoLobby, e.proceed],
			confirmDialog: {
				id: "deviceDetector.greyList"
			}
		})
	},
	handleBlackListedCombination: function() {
		var c = this,
			d = {
				casinoLobby: {
					label: Services.languageManager.getText(Language.Keys.btn_casino),
					action: function() {
						Environment.goToLobby("6")
					}
				}
			};
		c.fireEvent("notify:deviceDetector.validationComplete", false);
		c.showDialog({
			texts: [Services.languageManager.getText(Language.Keys.MGdeviceNoSupport)],
			buttons: !Platform.isDesktopDevice ? [d.casinoLobby] : [],
			severity: "stopped"
		})
	},
	showDialog: function(b) {
		this.fireEvent("request:loader.showDialog", b);
		this.handleIntegrationSpecificDialogs(b)
	},
	handleIntegrationSpecificDialogs: function(b) {}
};
Loader.DeviceDetector = Sys.extend(Sys.Observable, Loader.DeviceDetector, "Loader.DeviceDetector");
Sys.ns("Sys.utils");
Sys.utils.XMLHelper = {
	getNodeValue: function(f, d) {
		var e;
		if (d.getElementsByTagName) {
			e = d.getElementsByTagName(f);
			if (e.length > 0) {
				return e[0].textContent
			}
		}
		return null
	},
	findNode: function(f, d) {
		var e;
		if (d.getElementsByTagName) {
			e = d.getElementsByTagName(f);
			if (e.length > 0) {
				return e[0]
			}
		}
		return null
	},
	findAll: function(f, d) {
		var e = [];
		if (!Sys.isEmpty(d)) {
			if (d.getElementsByTagName) {
				e = d.getElementsByTagName(f)
			}
		}
		return e
	},
	getAttributeValue: function(c, d) {
		if (d.attributes) {
			if (d.hasAttribute(c)) {
				return d.attributes.getNamedItem(c).value
			}
		}
		return null
	},
	toJSON: function(k) {
		var i = {
				tag: k.nodeName
			},
			j, h, l, a;
		if (k.hasChildNodes()) {
			i.children = [];
			for (j = 0; j < k.childNodes.length; j++) {
				h = k.childNodes.item(j);
				if (h.nodeType === 1) {
					i.children.push(Sys.utils.XMLHelper.toJSON(h))
				} else {
					if (h.nodeType === 3) {
						i.text = h.nodeValue.replace(/^\s+|\s+$/g, "")
					}
				}
			}
		}
		if (k.attributes) {
			i.attributes = {};
			l = k.attributes.length;
			for (j = 0; j < l; j++) {
				a = k.attributes[j];
				i.attributes[a.nodeName] = a.nodeValue
			}
		}
		i.find = function(c) {
			var b = [];
			Sys.each(i.children, function(d) {
				if (d.tag === c) {
					b.push(d)
				}
			});
			return b[0] || null
		};
		i.findAll = function(c) {
			var b = [];
			Sys.each(i.children, function(d) {
				if (d.tag === c) {
					b.push(d)
				}
			});
			return b
		};
		return i
	},
	getMoneyFormatFromXML: function(l, h) {
		var g = Sys.utils.XMLHelper.findAll("moneyformat", l),
			j = g.length,
			i, k;
		for (k = -1; ++k < j;) {
			i = Sys.utils.XMLHelper.getNodeValue("iso", g[k]);
			if (i === h) {
				return Sys.utils.XMLHelper.getMoneyFormatFromNode(g[k])
			}
		}
		return undefined
	},
	getMoneyFormatFromNode: function(f) {
		var i = {},
			h, g, j;
		h = Sys.utils.XMLHelper.findNode("dividers", f);
		i.thousandsDivider = Sys.utils.XMLHelper.getAttributeValue("thousands", h);
		i.decimalDivider = Sys.utils.XMLHelper.getAttributeValue("decimal", h);
		g = Sys.utils.XMLHelper.findNode("curchar", f);
		i.currencyChar = g.textContent;
		i.isCurrCharAfter = (Sys.utils.XMLHelper.getAttributeValue("after", g) === "true");
		j = Sys.utils.XMLHelper.findNode("iso", f);
		i.iso = j.textContent;
		return i
	}
};
Sys.ns("Sys.utils");
Sys.utils.FunctionQueuer = {
	constructor: function() {
		var b = this;
		Sys.utils.FunctionQueuer.superclass.constructor.apply(this, arguments);
		b.q = [];
		b.executing = false;
		b.debug = false
	},
	queue: function(g) {
		var f = g.args || [],
			h = g.waitForEvents || [],
			j = g.waitForObjects || [],
			i;
		if (!Sys.isArray(f)) {
			f = [f]
		}
		if (!Sys.isArray(h)) {
			h = [h]
		}
		i = {
			obj: g.obj,
			fun: g.fn,
			event: g.endEvent,
			args: f,
			we: h,
			wo: g.waitForObject || g.obj,
			wos: {
				totalEventsCount: 0,
				waitForObjects: j
			}
		};
		if (h.length || j.length) {
			this.createWaiters(i)
		}
		this.q.push(i);
		this.processQueue()
	},
	execute: function(f) {
		var d = this,
			e;
		d.executing = true;
		e = function() {
			if (d.debug) {}
			f.obj.removeListener(f.event, e, d);
			d.executing = false;
			d.processQueue()
		};
		f.obj.on(f.event, e, d);
		f.fun.apply(f.obj, f.args)
	},
	processQueue: function() {
		var h = this,
			g, f, e;
		if (!h.executing && h.q.length) {
			f = h.q[0].wos;
			e = f.waitForObjects.length !== 0;
			if ((h.q[0].we.length === 0 && !e) || (e && f.totalEventsCount === 0)) {
				g = h.q.shift();
				h.execute(g)
			} else {
				if (h.debug) {
					if (Sys.isDefined(h.q[0].wos)) {}
				}
			}
		} else {
			if (h.debug) {
				if (!h.q.length) {} else {
					if (h.executing) {}
				}
			}
		}
	},
	createWaiters: function(c) {
		var d = this;
		if (c.we.length) {
			d.registerListeners({
				queueItem: c,
				waitForEvents: c.we,
				waitForObject: c.wo
			})
		} else {
			if (c.wos.waitForObjects.length) {
				Sys.each(c.wos.waitForObjects, function(a) {
					if (!Sys.isArray(a.events)) {
						a.events = [a.events]
					}
					c.wos.totalEventsCount += a.events.length;
					d.registerListeners({
						queueItem: c,
						waitForEvents: a.events,
						waitForObject: a.obj
					})
				})
			}
		}
	},
	registerListeners: function(e) {
		var f = this,
			d;
		Sys.each(e.waitForEvents, function(a) {
			var b = function() {
				if (f.debug) {}
				e.waitForEvents.splice(e.waitForEvents.indexOf(a), 1);
				d = e.queueItem.wos;
				if (Sys.isDefined(d.waitForObjects.length)) {
					if (d.totalEventsCount >= 1) {
						d.totalEventsCount -= 1
					}
				}
				e.waitForObject.removeListener(a, b, f);
				f.processQueue()
			};
			e.waitForObject.on(a, b, f)
		})
	}
};
Sys.utils.FunctionQueuer = Sys.extend(Sys.Observable, Sys.utils.FunctionQueuer, "Sys.utils.FunctionQueuer");
Sys.ns("Loader");
Loader.ResourceHandler = {
	INTEGRATION: "standard",
	constructor: function(d) {
		var c = this;
		d = d || {};
		Loader.ResourceHandler.superclass.constructor.call(c, d);
		c.setupData(d);
		c.setupEvents();
		if (Sys.isFunc(d.callback)) {
			c.progressCallback = d.callback
		}
		c.setLanguageOfHtmlTag(Resources.readData("queryData").lang)
	},
	setupEvents: function() {
		var b = this;
		b.on({
			"notify:loader.animationComplete": b.onLoaderAnimationComplete,
			"notify:gcmProxy.animationComplete": b.onLoaderAnimationComplete,
			"notify:loader.confirmDialogClosed": b.onRequestedConfirmDialogsClosed,
			"notify:userAgentManager.loadDialogConfirmed": b.onRequestedConfirmDialogsClosed,
			"notify:userAgentManager.requestedConfirmDialogsClosed": b.onRequestedConfirmDialogsClosed,
			"notify:userAgentManager.deviceDetectionFinished": b.onDetectionComplete,
			"notify:deviceDetector.validationComplete": b.onDetectionComplete,
			"notify:deviceDetector.finished": b.onRequestedConfirmDialogsClosed
		})
	},
	progressCallback: function(b) {
		this.fireEvent("request:loader.updateProgress", b);
		this.fireEvent("request:gcmProxy.updateProgress", b)
	},
	preLoad: function() {
		var g = this,
			e = new Sys.Deferred(),
			f, h;
		g.fireEvent("request:loader.show");
		g.storeData("startTime", Date.now());
		g.isDeviceDetectionDisabled();
		f = g.determineSessionID();
		if (Sys.isDefined(f)) {
			h = e.when(f).then(function() {
				return g.gameServerInit()
			})
		} else {
			g.determinePluginURL();
			h = e.when(g.gameServerInit())
		}
		h.then(function() {
			return g.loadResourcesXML()
		}).then(function() {
			g.addDynamicPriorityResources();
			return g.loadResources("priorityList")
		}).done(function() {
			g.fireEvent("notify:resourceHandler.priorityListComplete")
		})
	},
	isDeviceDetectionDisabled: function() {
		var b = Resources.readData("queryData");
		if (typeof b.disableDeviceDetection === "boolean") {
			Resources.storeData("disableDeviceDetection", b.disableDeviceDetection)
		}
	},
	determineSessionID: function() {
		var j = this,
			f = Resources.readData("queryData"),
			g = f.callbackurl,
			h = f.sessId,
			i = f.integration;
		if (Sys.isDefined(g) && Sys.isDefined(i)) {
			return j.performServletCall(g, i)
		} else {
			if (!Sys.isDefined(h)) {
				Environment.goToLobby("1")
			}
		}
		j.storeSessionID(h);
		return undefined
	},
	determinePluginURL: function() {
		var b = Resources.readData("queryData");
		if (Sys.isDefined(b.pluginURL)) {
			Resources.storeData("pluginURL", b.pluginURL)
		}
	},
	performServletCall: function(h, g) {
		var e = this,
			f = new Sys.Deferred();
		if (g === e.INTEGRATION) {
			f.when(Sys.utils.httpGet({
				url: h,
				useCredentials: true
			})).fail(function() {
				Environment.goToLobby("1")
			}).done(function(a) {
				e.handleServletResponse(a)
			})
		} else {
			Environment.goToLobby("1")
		}
		return f
	},
	handleServletResponse: function(f) {
		var h = Sys.utils.parseQueryString(f.responseText),
			g = h.playerSessionId,
			e = h.pluginURL;
		if (!Sys.isDefined(g)) {
			Environment.goToLobby("1")
		} else {
			this.storeSessionID(decodeURIComponent(g))
		}
		if (Sys.isDefined(e)) {
			Resources.storeData("pluginURL", decodeURIComponent(e))
		} else {
			this.determinePluginURL()
		}
	},
	storeSessionID: function(b) {
		this.storeData("sessionID", b);
		Resources.storeData("sessionID", b)
	},
	onDetectionComplete: function(b) {
		if (b) {
			this.storeData("detectionComplete", true);
			this.load()
		}
	},
	onRequestedConfirmDialogsClosed: function() {
		var b = this;
		b.storeData("allConfirmDialogsClosed", true);
		if (b.readData("loaderCompleted")) {
			b.initGameIfPossible()
		}
	},
	load: function() {
		var c = this,
			d = new Sys.Deferred();
		if (!c.readData("detectionComplete")) {
			return
		}
		c.addPlatformSpecificResourcesToGenericList();
		d.when(c.loadResources("genericList")).fail(function(a) {
			c.fireEvent("request:loaderErrorHandler.handleRequestError", a)
		}).done(function() {
			c.storeData("loaderCompleted", true);
			c.onLoaderComplete()
		})
	},
	addPlatformSpecificResourcesToGenericList: function() {
		var f = this,
			i, h, g, j;
		Platform.PlatformManager.determineResourceBundle();
		i = f.readData("genericList");
		h = f.readData("dynamicallyLoadedResources");
		g = f.readData("totalSize");
		Sys.iterate(Platform.resourceBundle.loaderResourceKeys, function(a, b) {
			j = h[a][b];
			if (Sys.isDefined(j)) {
				i.push(j);
				g += j.size
			}
		});
		f.storeData("genericList", i);
		f.storeData("totalSize", g)
	},
	addDynamicPriorityResources: function() {
		var i = this,
			f, j, g, h;
		Platform.PlatformManager.determineResourceBundle();
		f = i.readData("priorityList");
		j = i.readData("priorityDynamicallyLoadedResources");
		g = i.readData("totalSize");
		Sys.iterate(Platform.resourceBundle.loaderResourceKeys, function(a, b) {
			if (Sys.isDefined(j[a]) && Sys.isDefined(j[a][b])) {
				h = j[a][b];
				f.push(h);
				g += h.size
			}
		});
		i.storeData("priorityList", f);
		i.storeData("totalSize", g)
	},
	gameServerInit: function() {
		var e = this,
			f = new Sys.Deferred(),
			d = e.createInitQuery().getQuery();
		f.when(Sys.utils.httpGet({
			url: d
		})).done(function(a) {
			e.gameServerInitComplete(a)
		}).fail(function(a) {
			e.fireEvent("request:loaderErrorHandler.handleRequestError", a)
		});
		return f
	},
	loadResourcesXML: function() {
		var d = this,
			c = new Sys.Deferred();
		c.when(Sys.utils.httpGet({
			url: "resources.xml"
		})).fail(function(a) {
			d.fireEvent("request:loaderErrorHandler.handleRequestError", a)
		}).done(function(a) {
			d.parseResourceXml(a)
		});
		return c
	},
	loadResources: function(g) {
		var k = this,
			i = k.readData(g),
			l = new Sys.Deferred(),
			h = [],
			j = Sys.isDefined(k.readData("resources")) ? k.readData("resources") : {};
		Sys.each(i, function(b) {
			var d = b.type,
				e = k.getPathFromName(b.name, b.url),
				c = new Sys.Deferred(),
				f = (d === "audio") ? "arraybuffer" : undefined,
				a;
			if (g === "genericList") {
				a = function(p, o) {
					k.onProgressCallback(p, o)
				}
			}
			if (d === "css") {
				k.cssComplete("", b.name, b.url)
			}
			c.when(Sys.utils.httpGet({
				url: e,
				name: b.name,
				onProgressCallback: a,
				responseType: f
			})).fallback(function(n) {
				return k.onLoadResourceError(n, b)
			}).done(function(o) {
				var p = k[d + "Complete"];
				if (Sys.isDefined(p)) {
					if (d !== "css") {
						p.call(k, o, b.name, b.url)
					}
				} else {
					Resources.storeData(b.name + "Response", o)
				}
			});
			j[b.name] = 0;
			h.push(c)
		});
		k.storeData("resources", j);
		l.when(h);
		return l
	},
	onLoadResourceError: function(g, i) {
		var j = this,
			h = Resources.readData("language"),
			f;
		if (i.name === "languageXML" && h.lang !== h.defaultLang) {
			f = "../langlib/" + h.defaultLang + "/" + i.url;
			h.lang = h.defaultLang;
			return Sys.utils.httpGet({
				url: f,
				name: i.name
			}).fail(function(a) {
				j.fireEvent("request:loaderErrorHandler.handleRequestError", a)
			}).done(function(a) {
				j[i.type + "Complete"](a, i.name, i.url)
			})
		}
		j.fireEvent("request:loaderErrorHandler.handleRequestError", g);
		return undefined
	},
	onProgressCallback: function(h, f) {
		var e = this,
			g = e.readData("resources");
		g[f] = h.loaded;
		e.calculatePercentage();
		e.checkLoadSpeed()
	},
	calculatePercentage: function() {
		var p = this,
			n = p.readData("resources"),
			j = p.readData("totalSize"),
			l = 0,
			k, o = Object.keys(n),
			m = o.length,
			i = 0;
		while (i < m) {
			l += n[o[i]];
			++i
		}
		k = (l / j) * 100;
		k = Math.min(k, 100);
		k = parseInt(k, 10);
		p.storeData("percentageLoaded", k);
		p.progressCallback(k)
	},
	checkLoadSpeed: function() {
		var j = this,
			k = this.readData("startTime"),
			g = this.readData("totalSize"),
			h = this.readData("status"),
			l = Date.now(),
			i = (60000 / 2500000) * g;
		if (h !== "slow" && (l - k > i)) {
			j.slownessDetected()
		}
	},
	slownessDetected: function() {
		var f = this,
			d, e = Services.languageManager;
		f.storeData("status", "slow");
		d = {
			texts: [e.hasText(Language.Keys.loadingTakesLonger) ? e.getText(Language.Keys.loadingTakesLonger) : "Loading the game is taking longer than usual."],
			buttons: [{
				action: function() {
					Environment.goToLobby("9")
				},
				label: e.hasText(Language.Keys.btn_casino) ? e.getText(Language.Keys.btn_casino) : "Home",
				scope: f
			}, {
				action: function() {
					Environment.reload()
				},
				label: e.hasText(Language.Keys.btn_reload) ? e.getText(Language.Keys.btn_reload) : "Reload",
				scope: f
			}],
			severity: "slow"
		};
		f.fireEvent("request:loader.showDialog", d)
	},
	onLoaderComplete: function() {
		var b = this;
		b.progressCallback(100);
		b.storeData("resourcesLoaded", true);
		b.initGameIfPossible()
	},
	onLoaderAnimationComplete: function() {
		var b = this;
		b.fireEvent("notify:resourceHandler.animationComplete");
		b.storeData("animationComplete", true);
		b.initGameIfPossible()
	},
	initGameIfPossible: function() {
		var b = this;
		if (!b.scriptsAppended && b.readData("resourcesLoaded") && b.readData("animationComplete") && b.readData("allConfirmDialogsClosed")) {
			b.scriptsAppended = true;
			b.fireEvent("notify:resourceHandler.gameAssetsLoaded");
			b.appendScriptFiles()
		}
	},
	gameServerInitComplete: function(b) {
		Resources.storeData("gameServerInitResponse", Sys.utils.qsToObj(b.responseText));
		Resources.storeData("gameServerInitResponseObject", Sys.utils.parseQueryStringToNestedObject(b.responseText));
		Resources.storeData("unParsedGameServerInitResponse", b.responseText);
		Resources.storeData("historyUrl", this.buildHistoryUrl())
	},
	jsonComplete: function(d, c) {
		Resources.storeData(c, JSON.parse(d.responseText))
	},
	priorityAudioJsonComplete: function(e, d) {
		var f = JSON.parse(e.responseText);
		if (Platform.resourceBundle.preloadAudio) {
			this.addAudioToGenericList(f)
		}
		Resources.storeData(d, f)
	},
	addAudioToGenericList: function(m) {
		var k = this,
			r = m.files.main,
			l = Sys.isDefined(m.fileSizes) && Sys.isDefined(m.fileSizes.main) ? m.fileSizes.main : {},
			n, p, q, o = k.readData("genericList"),
			i = k.readData("totalSize");
		if (Sys.isObj(r)) {
			p = Object.keys(r);
			q = p.length;
			for (n = -1; ++n < q;) {
				o.push({
					url: r[p[n]],
					type: "audio",
					name: p[n],
					size: 100000,
					loadComplete: false
				});
				i += (Sys.isDefined(l[p[n]]) ? l[p[n]] : 100000)
			}
		} else {
			o.push({
				url: r,
				type: "audio",
				name: "main",
				size: 100000,
				loadComplete: false
			});
			i += (Sys.isDefined(l) ? l : 100000)
		}
		k.storeData("totalSize", i)
	},
	audioComplete: function(e, d) {
		var f = Resources.readData("preloadedAudio");
		if (!Sys.isDefined(f)) {
			f = {}
		}
		f["main/" + d] = e.response;
		Resources.storeData("preloadedAudio", f)
	},
	xmlComplete: function(d, c) {
		Resources.storeData(c, d.responseXML)
	},
	cssComplete: function(f, i, j) {
		var h = document.createElement("link"),
			g = this.readData("cssFiles");
		h.setAttribute("rel", "stylesheet");
		h.setAttribute("type", "text/css");
		h.setAttribute("href", j);
		g.push(h)
	},
	javascriptComplete: function(h, l, g) {
		var j = document,
			i = this.readData("scriptFiles"),
			k = j.createElement("script");
		k.type = "text/javascript";
		k.charset = "utf-8";
		k.src = g;
		i.push(k)
	},
	appendScriptFiles: function() {
		var j = document.getElementsByTagName("head")[0],
			i = this.readData("scriptFiles"),
			g = this.readData("cssFiles"),
			h = g.length,
			f;
		for (f = -1; ++f < h;) {
			j.appendChild(g[f])
		}
		h = i.length;
		for (f = -1; ++f < h;) {
			j.appendChild(i[f])
		}
	},
	preloadAudioComplete: function(d, c) {
		Resources.storeData(c, JSON.parse(d.responseText));
		Resources.processAudio(c)
	},
	getPathFromName: function(h, i) {
		var m = this,
			l = i,
			j, n = Resources.readData("gameServerInitResponse"),
			k = Resources.readData("language");
		if (h === "languageXML") {
			l = "../langlib/" + k.lang + "/" + i
		} else {
			if (h === "moneyformat_player") {
				l = "../../../currencies/" + n.playercurrencyiso.toLowerCase() + "/" + i
			} else {
				if (h === "moneyformat_jackpot") {
					l = "../../../currencies/" + n.jackpotcurrencyiso.toLowerCase() + "/" + i
				} else {
					if (h === "deviceDetection" || h === "deviceDetectionJson") {
						j = n.staticsharedurl || m.readData("deviceListPath").fallbackPath;
						l = j + "/" + i
					}
				}
			}
		}
		return l
	},
	createInitQuery: function() {
		var e = this,
			h = e.getSessionId(),
			f = Resources.readData("queryData"),
			g = Resources.readData("extraParams");
		return {
			serverStr: f.server + "servlet/CasinoGameServlet;jsession=" + h,
			initStr: "?action=init&sessid=" + h + "&gameId=" + f.gameId,
			extraParams: Sys.utils.objectToQueryString(g),
			noCache: "&no-cache=" + Math.round(Date.now()),
			getQuery: function() {
				var a = "",
					b;
				for (b in this) {
					if (this.hasOwnProperty(b) && typeof this[b] === "string") {
						a += this[b]
					}
				}
				return a
			}
		}
	},
	getSessionId: function() {
		return Resources.readData("sessionID")
	},
	parseResourceXml: function(k) {
		var o = this,
			j = Sys.utils.XMLHelper.toJSON(k.responseXML),
			r = j.children[0].children,
			m = [],
			q = [],
			p = {},
			l = {},
			n = 0;
		Sys.each(r, function(a) {
			Sys.each(a.findAll("resource"), function(f) {
				var e = {
						url: "",
						type: "",
						size: "",
						loadComplete: false
					},
					b, d, g, c;
				e.type = f.find("type").text;
				e.url = f.find("url").text;
				e.size = Sys.utils.toInt(f.find("size").text);
				e.name = f.find("name").text;
				b = f.find("priority");
				d = f.find("resourceTag");
				if (b !== null) {
					if (d !== null) {
						g = d.find("type").text;
						c = d.find("key").text;
						if (!Sys.isDefined(l[g])) {
							l[g] = {}
						}
						l[g][c] = e
					} else {
						e.priority = b.text;
						m.push(e)
					}
				} else {
					if (d !== null) {
						g = d.find("type").text;
						c = d.find("key").text;
						if (!Sys.isDefined(p[g])) {
							p[g] = {}
						}
						p[g][c] = e
					} else {
						q.push(e);
						n += e.size
					}
				}
			})
		});
		o.storeData("totalSize", n);
		o.storeData("priorityList", m);
		o.storeData("genericList", q);
		o.storeData("dynamicallyLoadedResources", p);
		o.storeData("priorityDynamicallyLoadedResources", l)
	},
	setupData: function(e) {
		var f = this,
			d = Sys.utils.qsToObj(window.location.search);
		f.data = {};
		f.storeData("callback", e.callback);
		f.storeData("scriptFiles", []);
		f.storeData("cssFiles", []);
		f.storeData("totalSize", 0);
		f.storeData("resourcesLoaded", false);
		f.storeData("animationComplete", false);
		f.storeData("deviceListPath", {
			fallbackPath: d.staticsharedurl
		});
		f.storeData("detectionComplete", false);
		f.storeData("allConfirmDialogsClosed", false);
		f.storeData("loaderCompleted", false);
		f.storeData("soundDecoded", !Environment.supportsWebAudio);
		Resources.storeData("queryData", d);
		Resources.storeData("extraParams", {
			wantsfreerounds: true,
			freeroundmode: false,
			wantsreels: true
		});
		Resources.storeData("language", {
			defaultLang: "en",
			lang: d.lang
		});
		Resources.storeData("lobbyUrl", d.lobbyURL)
	},
	buildHistoryUrl: function() {
		var c = Resources.readData("queryData"),
			d = c.server;
		if (d[d.length - 1] !== "/") {
			d += "/"
		}
		d += "game/history?lang=" + c.lang + "&sessionId=" + Resources.readData("sessionID");
		if (!Platform.isDesktopDevice) {
			d += "&type=mobile"
		}
		return d
	},
	readData: function(b) {
		return this.data[b]
	},
	storeData: function(d, c) {
		this.data[d] = c
	},
	setLanguageOfHtmlTag: function(b) {
		document.documentElement.lang = b
	}
};
Loader.ResourceHandler = Sys.extend(Sys.Observable, Loader.ResourceHandler, "Loader.ResourceHandler");
Sys.ns("Core");
Core.LoaderController = {
	MINIMUM_LOADING_TIME: 3000,
	LOADER_PERCENTAGE_STEP: 0.2,
	DEBUG: false,
	constructor: function() {
		Core.LoaderController.superclass.constructor.apply(this, arguments)
	},
	init: function() {
		Core.LoaderController.superclass.init.apply(this, arguments);
		this.model.storeData("delayedMessages", [])
	},
	setupEvents: function() {
		var b = this;
		b.on({
			"request:loader.show": b.show,
			"request:loader.hide": b.hide,
			"request:loader.showDialog": b.requestDialog,
			"request:loader.hideDialog": b.hideDialog,
			"request:loader.updateProgress": b.update,
			"notify:stateHandler.leavingBeforeLoaderCloseState": b.onLeavingBeforeLoaderCloseState,
			"notify:scaling.gameSizeChanged": b.onGameSizeChanged,
			"notify:viewport.scaled": b.onGameSizeChanged,
			"notify:loader.closed": b.onClosed
		})
	},
	onLeavingBeforeLoaderCloseState: function() {
		this.hide()
	},
	update: function(d) {
		var c = d;
		c = parseInt(c, 10) || 0;
		c = c >= 0 ? c : 0;
		c = c <= 100 ? c : 100;
		this.model.storeData("progressValue", c)
	},
	tick: function() {
		var i = this,
			l = i.model.readData("progressValue") || 0,
			j = i.model.readData("percentage") || 0,
			g = Date.now(),
			h = g - i.startTime,
			k = parseInt(h / i.MINIMUM_LOADING_TIME * 100, 10);
		k = k < 100 ? k : 100;
		l = k < l ? k : l;
		if (j + i.LOADER_PERCENTAGE_STEP * 100 <= l) {
			i.model.storeData("percentage", l);
			i.view.updateLoaderBar()
		}
		if (l === 100) {
			clearInterval(i.tickInterval);
			i.model.storeData("percentage", 100);
			i.view.updateLoaderBar();
			i.fireEvent("notify:loader.loaderBarFilled");
			setTimeout(i.fireEvent.bind(i, "notify:loader.animationComplete"), parseInt(i.MINIMUM_LOADING_TIME * i.LOADER_PERCENTAGE_STEP, 10));
			i.showDialogFromQueue()
		}
	},
	show: function() {
		var b = this;
		if (Services.orientation.orientationHasChanged()) {
			b.fireEvent("request:orientation.forceUpdate")
		}
		b.startTime = Date.now();
		clearInterval(b.tickInterval);
		b.tickInterval = setInterval(b.tick.bind(b), parseInt(b.MINIMUM_LOADING_TIME * b.LOADER_PERCENTAGE_STEP, 10));
		b.view.show()
	},
	hide: function() {
		var b = this;
		b.startTime = undefined;
		clearInterval(b.tickInterval);
		b.view.hide();
		b.fireEvent("notify:loader.closed");
		if (Services.orientation.orientationHasChanged()) {
			this.fireEvent("request:orientation.forceUpdate")
		}
	},
	requestDialog: function(f) {
		var h = this,
			e = f || {},
			g = h.model.readData("delayedMessages");
		if (e.severity === "stopped") {
			h.model.storeData("currentMessage", e);
			h.stopLoading();
			return
		}
		if (e.severity === "slow") {
			h.model.storeData("currentMessage", e);
			h.view.showDialog()
		} else {
			g.push(e)
		}
	},
	stopLoading: function() {
		var b = this;
		b.model.storeData("stoppingError", true);
		setTimeout(function() {
			clearInterval(b.tickInterval);
			b.model.storeData("percentage", 100);
			b.view.updateLoaderBar();
			b.showDialog()
		}, 1000)
	},
	showDialog: function() {
		this.view.showDialog()
	},
	showDialogFromQueue: function() {
		var d = this,
			c = d.model.readData("delayedMessages");
		if (c.length > 0) {
			d.model.storeData("currentMessage", c.pop());
			d.view.showDialog()
		}
	},
	hideDialog: function() {
		var c = this,
			d = c.model.readData("currentMessage") || {
				confirmDialog: {}
			};
		c.fireEvent("notify:loader.confirmDialogClosed", d.confirmDialog.id);
		c.view.hideDialog();
		if (c.model.readData("percentage") === 100) {
			c.showDialogFromQueue()
		}
	},
	onGameSizeChanged: function() {
		if (Sys.isFunc(this.view.refresh)) {
			this.view.refresh()
		}
	},
	onClosed: function() {
		this.view.onClosed()
	}
};
Core.LoaderController = Sys.extend(Core.Controller, Core.LoaderController, "Core.LoaderController");
Sys.ns("Core");
Core.LoaderView = {
	ANIMATION_DELAY: 100,
	LOGO_SVG: {
		tag: "svg",
		attributes: {
			"class": "logoSVG",
			version: "1.1",
			viewBox: "0 0 258 92",
			xmlns: "http://www.w3.org/2000/svg"
		},
		children: [{
			tag: "defs",
			attributes: {},
			children: [{
				tag: "clipPath",
				attributes: {
					id: "netMask"
				},
				children: [{
					tag: "rect",
					attributes: {
						x: "0",
						y: "0",
						width: "135px",
						height: "92px"
					},
					children: []
				}]
			}, {
				tag: "clipPath",
				attributes: {
					id: "entMask"
				},
				children: [{
					tag: "rect",
					attributes: {
						x: "136",
						y: "0",
						width: "245.427px",
						height: "92px"
					},
					children: []
				}]
			}]
		}, {
			tag: "g",
			attributes: {
				id: "logo"
			},
			children: [{
				tag: "path",
				attributes: {
					id: "line",
					"class": "logoLine logoPartsFill",
					d: "M 135,0 L 137.393,0 L 137.393,91.447 L 135,91.447 L 135,0 Z",
					"shape-rendering": "crispEdges"
				},
				children: []
			}, {
				tag: "g",
				attributes: {
					"clip-path": "url(#netMask)"
				},
				children: [{
					tag: "g",
					attributes: {
						"class": "netWrapper"
					},
					children: [{
						tag: "path",
						attributes: {
							d: "M 31.69,51.93 L 22.25,36.651 L 10.15,17.731 L 10.032,17.542 L 0.003,17.542 L 0.003,73.621 L 11.133,73.621 L 11.133,39.151 L 19.432,52.581 L 32.78,73.621 L 42.89,73.621 L 42.89,17.541 L 31.692,17.541 L 31.692,51.93 L 31.692,51.93 M 31.692,51.93 ",
							"class": "logoPartsFill"
						},
						children: []
					}, {
						tag: "path",
						attributes: {
							d: "M 49.15,73.62 L 85.91,73.62 L 85.91,63.001 L 60.35,63.001 L 60.35,50.772 L 82.199,50.772 L 82.199,40.074 L 60.35,40.074 L 60.35,28.245 L 85.91,28.245 L 85.91,17.547 L 49.15,17.547 L 49.15,73.627 L 49.15,73.627 M 49.15,73.627 ",
							"class": "logoPartsFill"
						},
						children: []
					}, {
						tag: "path",
						attributes: {
							d: "M 90.419,28.319 L 103.268,28.319 L 103.268,73.619 L 114.468,73.619 L 114.468,28.319 L 127.237,28.319 L 127.237,17.54 L 90.418,17.54 L 90.418,28.319 L 90.418,28.319 M 90.418,28.319 ",
							"class": "logoPartsFill"
						},
						children: []
					}]
				}]
			}, {
				tag: "g",
				attributes: {
					"clip-path": "url(#entMask)"
				},
				children: [{
					tag: "g",
					attributes: {
						"class": "entWrapper"
					},
					children: [{
						tag: "path",
						attributes: {
							d: "M 135,73.621 L 168.309,73.621 L 168.309,63.002 L 142.753,63.002 L 142.753,50.773 L 164.601,50.773 L 164.601,40.075 L 142.753,40.075 L 142.753,28.246 L 168.309,28.246 L 168.309,17.548 L 135,17.548 ",
							"class": "logoPartsFill"
						},
						children: []
					}, {
						tag: "path",
						attributes: {
							d: "M 205.6,52.02 L 196.162,36.75 L 184.064,17.83 L 183.947,17.631 L 173.92,17.631 L 173.92,73.709 L 185.039,73.709 L 185.039,39.24 L 193.339,52.669 L 206.699,73.709 L 216.809,73.709 L 216.809,17.63 L 205.61,17.63 L 205.61,52.02 L 205.61,52.02 M 205.61,52.02 ",
							"class": "logoPartsFill"
						},
						children: []
					}, {
						tag: "path",
						attributes: {
							d: "M 221.38,17.629 L 221.38,28.408 L 234.228,28.408 L 234.228,73.706 L 245.427,73.706 L 245.427,28.407 L 258.196,28.407 L 258.196,17.627 L 221.377,17.627 L 221.377,17.627 M 221.377,17.627 ",
							"class": "logoPartsFill"
						},
						children: []
					}]
				}]
			}]
		}]
	},
	SLOGAN_SVG: {
		tag: "svg",
		attributes: {
			viewBox: "0 0 195.8 22.1",
			"class": "fillWhite sloganSVG"
		},
		children: [{
			tag: "path",
			attributes: {
				d: "M8.8 21.9h-8.8v-18.7h8.4c3.8 0 5.4 2.4 5.4 5.1 0 1.4-.7 3-2.3 3.8 1.8.9 2.6 2.8 2.6 4.3.1 2.9-1.8 5.5-5.3 5.5zm-1.3-15.4h-3.8v4.1h3.8c1.5 0 2.5-.8 2.5-2 0-1.4-.8-2.1-2.5-2.1zm.2 7.3h-4v4.8h4c1.7 0 2.5-.9 2.5-2.4 0-1.4-.9-2.4-2.5-2.4zM15.9 3.2h12.9v3.3h-9.2v4.3h7.9v3.3h-7.9v4.4h9.2v3.3h-12.9v-18.6zM39 6.5v15.4h-3.7v-15.4h-5v-3.3h13.6v3.4h-4.9zM53.8 6.5v15.4h-3.7v-15.4h-5v-3.3h13.6v3.4h-4.9zM60.2 3.2h12.9v3.3h-9.2v4.3h7.9v3.3h-7.9v4.4h9.2v3.3h-12.9v-18.6zM83.1 3.2c3.8 0 5.4 3.1 5.4 5.8 0 2-1.1 4.2-3.1 5.2l3.4 7.7h-4l-2.9-7h-3.4v7h-3.7v-18.7h8.3zm-4.6 8.3h3.8c1.7 0 2.6-1 2.6-2.5 0-1.4-.9-2.5-2.6-2.5h-3.8v5zM103.9 22.1c-3.5 0-7.2-2-7.2-6v-7c0-4 3.6-6.1 7.3-6.1 2.1 0 4.4.6 5.8 1.8l-1.8 2.9c-1.1-1-2.7-1.3-3.9-1.3-1.7 0-3.6.9-3.6 3.4v5.5c0 2.4 1.8 3.4 3.5 3.4.7 0 1.6-.1 2.4-.8v-3.1h-2.7v-3.2h6.4v7.9c-1.7 1.9-4.2 2.6-6.2 2.6zM122.5 18h-6.5l-1.2 3.9h-4l6.6-18.7h3.8l6.5 18.7h-4.1l-1.1-3.9zm-5.5-3.1h4.5l-.7-2.4-1.5-4.9h-.1l-1.4 4.9-.8 2.4zM143.4 11.8l-1.7 3.5-2.1 4h-2.7l-2.1-3.9-1.8-3.5h-.1v10.1h-3.7v-18.8h3.4l3.3 6.6 2.3 4.6h.2l2.3-4.7 3.2-6.5h3.4v18.7h-3.7v-10.1h-.2zM154.3 3.2v18.7h-3.7v-18.7h3.7zM161.1 10.1v11.8h-3.7v-18.7h3.4l4.3 6.4 3.6 5.4h.1v-11.8h3.7v18.7h-3.4l-4.8-7.1-3.1-4.7h-.1zM182.1 22.1c-3.5 0-7.2-2-7.2-6v-7c0-4 3.6-6.1 7.3-6.1 2.1 0 4.4.6 5.8 1.8l-1.8 2.9c-1.1-1-2.7-1.3-3.9-1.3-1.7 0-3.6.9-3.6 3.4v5.5c0 2.4 1.8 3.4 3.5 3.4.7 0 1.6-.1 2.4-.8v-3.1h-2.7v-3.2h6.4v7.9c-1.7 1.9-4.2 2.6-6.2 2.6zM190.2.6v3.5h-.6v-3.5h-1.2v-.6h3.1v.6h-1.3zm3.7 2.2l.5-1.1.9-1.7h.5v4.1h-.6v-2.8l-.4.8-.7 1.4h-.4l-.7-1.3-.5-.9v2.8h-.6v-4.1h.6l.9 1.7.5 1.1z"
			},
			children: []
		}]
	},
	constructor: function() {
		Core.LoaderView.superclass.constructor.apply(this, arguments)
	},
	init: function(d) {
		var c = this;
		Core.LoaderView.superclass.init.apply(c, arguments);
		c.loaderWrapper = document.getElementById("loaderWrapper") || document.createElement("div");
		c.loaderBackground = document.getElementById("loaderBackground") || document.createElement("div");
		c.hasClosed = false;
		c.setup();
		c.render();
		c.show()
	},
	setup: function() {
		var d = this,
			c = d.createLoaderBar();
		d.brandingWrapper = d.createBrandingWrapper();
		d.mainLogoWrapper = d.createMainLogo();
		d.sloganWrapper = d.createSlogan();
		d.dialogAndLogoWrapper = document.createElement("div");
		d.dialogWrapper = document.createElement("div");
		d.dialogAndLogoWrapper.appendChild(d.mainLogoWrapper);
		d.dialogAndLogoWrapper.appendChild(d.sloganWrapper);
		d.dialogAndLogoWrapper.appendChild(d.dialogWrapper);
		d.loaderWrapper.appendChild(c);
		d.loaderWrapper.appendChild(d.dialogAndLogoWrapper);
		d.loaderWrapper.appendChild(d.brandingWrapper);
		Sys.utils.addCSSClass(d.dialogAndLogoWrapper, "dialogAndLogoWrapper");
		Sys.utils.addCSSClass(d.loaderWrapper, "loaderWrapper");
		Sys.utils.addCSSClass(d.loaderBackground, "loaderBackground")
	},
	render: function() {
		var h = this,
			f = Environment.getResolution(),
			g = Environment.allowsCustomCanvasSize() ? Environment.getCurrentResolutionPixelFactor() * this.getScaleFactor() : Environment.getScale() * this.getScaleFactor(true),
			e = Sys.utils.getPrefixedCSSProperty("transform");
		h.loaderWrapper.style.width = f.width + "px";
		h.loaderWrapper.style.height = f.height + "px";
		h.loaderWrapper.style.top = Services.scaling.getScaledFullscreenElementOffsetTop(g) + "px";
		h.loaderWrapper.style.left = Services.scaling.getScaledFullscreenElementOffsetLeft(g) + "px";
		h.loaderWrapper.style[e] = "scale(" + g + ")";
		h.loaderWrapper.style[e + "Origin"] = "0 0";
		window.scrollTo(0, 0)
	},
	onClosed: function() {
		this.hasClosed = true;
		document.body.style.backgroundColor = "#131313";
		document.documentElement.style.backgroundColor = "#131313"
	},
	getScaleFactor: function(d) {
		var c = Services.scaling.calculateScale(true);
		if (Environment.getCurrentPlatform() === "tablet") {
			if (Services.orientation.isPortrait()) {
				return 0.9
			}
			return 0.6
		} else {
			if (d) {
				return 1
			} else {
				if (Environment.getCurrentPlatform() === "mobile" && Services.orientation.isPortrait()) {
					return 0.9
				}
			}
		}
		return c
	},
	refresh: function() {
		if (!this.hasClosed) {
			this.render()
		}
	},
	show: function() {
		var b = this;
		b.loaderWrapper.style.display = b.loaderBackground.style.display = "block";
		clearTimeout(b.timeout);
		b.timeout = setTimeout(b.animateAll.bind(b), b.ANIMATION_DELAY)
	},
	hide: function() {
		var b = this;
		clearTimeout(b.timeout);
		b.loaderWrapper.style.display = b.loaderBackground.style.display = "none"
	},
	showDialog: function() {
		var f = this,
			d = f.model.readData("currentMessage"),
			e = this.createDialog(d);
		Sys.utils.addCSSClass(f.loaderWrapper, "dialogVisible");
		f.dialogAndLogoWrapper.replaceChild(e, f.dialogWrapper);
		f.dialogWrapper = e;
		setTimeout(function() {
			f.dialogWrapper.style.top = 0
		}, f.ANIMATION_DELAY)
	},
	hideDialog: function() {
		Sys.utils.removeCSSClass(this.loaderWrapper, "dialogVisible");
		this.dialogWrapper.style.top = "100%"
	},
	updateLoaderBar: function() {
		var b = this;
		if (b.model.readData("stoppingError") === true) {
			Sys.utils.addCSSClass(b.loaderWrapper, "error")
		}
		b.loaderBarProgress.style.width = b.model.readData("percentage") + "%"
	},
	getBrandingContent: function() {
		return {}
	},
	createBrandingWrapper: function() {
		var f = document.createElement("div"),
			d = this.getBrandingContent(),
			e;
		Sys.utils.addCSSClass(f, "brandingWrapper");
		if (d.tag === "svg") {
			e = this.createElement(d, "http://www.w3.org/2000/svg")
		} else {
			e = this.createElement(d)
		}
		if (e) {
			f.appendChild(e);
			Sys.utils.addCSSClass(this.loaderWrapper, "branded")
		}
		return f
	},
	createLoaderBar: function() {
		var d = this,
			e = document.createElement("div"),
			f = document.createElement("div");
		Sys.utils.addCSSClass(e, "loaderBar");
		Sys.utils.addCSSClass(f, "loaderBarProgress");
		e.appendChild(f);
		d.loaderBarProgress = f;
		return e
	},
	createMainLogo: function() {
		var d = this,
			e = document.createElement("div"),
			f = d.createElement(d.LOGO_SVG, "http://www.w3.org/2000/svg");
		Sys.utils.addCSSClass(e, "logoWrapper");
		if (Platform.isIEBrowser || Platform.isEdgeBrowser) {
			Sys.utils.addCSSClass(e, "IEBrowser")
		}
		e.appendChild(f);
		return e
	},
	createSlogan: function() {
		var d = this,
			f = document.createElement("div"),
			e = d.createElement(this.SLOGAN_SVG, "http://www.w3.org/2000/svg");
		Sys.utils.addCSSClass(f, "sloganWrapper");
		f.appendChild(e);
		return f
	},
	createElement: function(i, j) {
		var l, h, k, g;
		if (!Sys.isDefined(i.tag)) {
			return null
		}
		if (j) {
			l = document.createElementNS(j, i.tag)
		} else {
			l = document.createElement(i.tag)
		}
		for (h in i.attributes) {
			if (i.attributes.hasOwnProperty(h)) {
				l.setAttribute(h, i.attributes[h])
			}
		}
		for (k = 0; k < i.children.length; k++) {
			g = this.createElement(i.children[k], j);
			l.appendChild(g)
		}
		return l
	},
	createDialog: function(g) {
		var k = document.createElement("div"),
			i = document.createElement("div"),
			j = document.createElement("div"),
			h, l;
		g = g || {};
		k.classList.add("loadDialogWrapper");
		i.classList.add("loadDialogTextWrap");
		j.classList.add("loadDialogGUI");
		g.texts.map(function(a) {
			h = document.createElement("div");
			h.innerText = a;
			i.appendChild(h)
		});
		g.buttons.map(function(a) {
			a.clickCallback = a.action;
			l = new Interface.utils.Button(a);
			l.enable();
			j.appendChild(l.getContainer().getEl())
		});
		k.appendChild(i);
		k.appendChild(j);
		return k
	},
	animateLogo: function() {
		Sys.utils.addCSSClass(this.mainLogoWrapper, "animate")
	},
	animateSlogan: function() {
		Sys.utils.addCSSClass(this.sloganWrapper, "animate")
	},
	animateBranding: function() {
		Sys.utils.addCSSClass(this.brandingWrapper, "animate")
	},
	animateAll: function() {
		this.animateLogo();
		this.animateSlogan();
		this.animateBranding()
	}
};
Core.LoaderView = Sys.extend(Core.View, Core.LoaderView, "Core.LoaderView");
Sys.ns("Core");
Core.Loader = {
	constructor: function() {
		Core.Loader.superclass.constructor.apply(this, arguments)
	},
	getDefaultMVCClasses: function() {
		return {
			model: Core.Model,
			view: Core.LoaderView,
			controller: Core.LoaderController
		}
	}
};
Core.Loader = Sys.extend(Core.Module, Core.Loader, "Core.Loader");
Sys.ns("Loader");
Loader.ErrorHandler = {
	HTTP_ERROR_TEXTS: [{
		key: Language.Keys.connectionLost,
		fallback: "Connection Lost"
	}, {
		key: Language.Keys.reload,
		fallback: "Please reload the game."
	}],
	GAME_SERVER_ERROR_TEXT: [{
		key: Language.Keys.error,
		fallback: "Technical Error"
	}, {
		key: Language.Keys.returnToLobby,
		fallback: "Please return to Casino."
	}],
	PLUGIN_TIMEOUT_ERROR_TEXT: [{
		key: Language.Keys.error,
		fallback: "Technical Error"
	}, {
		key: Language.Keys.returnToLobby,
		fallback: "Please return to Casino."
	}],
	constructor: function() {
		var b = this;
		Loader.ErrorHandler.superclass.constructor.apply(this, arguments);
		b.errorStatus = {
			http: "handleHttpError",
			timeout: "handleTimeoutError",
			server: "handleGameServerError"
		};
		b.data = {
			status: ""
		};
		b.setupDialogButtons();
		b.setupEvents()
	},
	setupEvents: function() {
		var b = this;
		b.on({
			"request:loaderErrorHandler.handleRequestError": b.handleRequestError,
			"request:loaderErrorHandler.handlePluginTimeoutError": b.handlePluginTimeoutError,
			"request:loaderErrorHandler.showTechnicalError": b.handleTechnicalError
		})
	},
	handlePluginTimeoutError: function() {
		var b = this;
		b.dispatchDialogRequest({
			texts: b.getTexts(b.PLUGIN_TIMEOUT_ERROR_TEXT),
			buttons: b.dialogButtons,
			severity: "stopped"
		})
	},
	readStatus: function() {
		return this.data.status
	},
	setStatus: function(c) {
		var d = this.readStatus();
		if (d !== c) {
			this.data.status = c
		}
	},
	handleRequestError: function(e) {
		var h = this,
			f, g = Sys.utils.getErrorCode(e);
		if (!Sys.utils.httpRequestIsOK(e)) {
			f = "http"
		} else {
			if (Sys.isDefined(g)) {
				f = "server";
				if (g === 20) {
					Environment.goToLobby("1")
				}
			} else {
				Environment.goToLobby("1")
			}
		}
		if (!Sys.isDefined(f) || f === h.readStatus()) {
			return
		}
		h[h.errorStatus[f]]();
		h.setStatus(f)
	},
	handleHttpError: function() {
		var b = this;
		b.dispatchDialogRequest({
			texts: b.getTexts(b.HTTP_ERROR_TEXTS),
			buttons: b.dialogButtons,
			severity: "stopped"
		})
	},
	handleGameServerError: function() {
		var b = this;
		b.dispatchDialogRequest({
			texts: b.getTexts(b.GAME_SERVER_ERROR_TEXT),
			buttons: b.dialogButtons,
			severity: "stopped"
		})
	},
	handleTechnicalError: function() {
		this.handleGameServerError()
	},
	getTexts: function(i) {
		var h = [],
			g = Services.languageManager,
			j, f;
		for (f = -1; ++f < i.length;) {
			j = i[f];
			h.push(g.hasText(j.key) ? g.getText(j.key) : j.fallback)
		}
		return h
	},
	setupDialogButtons: function() {
		this.dialogButtons = [{
			action: function() {
				Environment.goToLobby("9")
			},
			label: Services.languageManager.hasText(Language.Keys.btn_casino) ? Services.languageManager.getText(Language.Keys.btn_casino) : "Home"
		}, {
			action: function() {
				Environment.reload()
			},
			label: Services.languageManager.hasText(Language.Keys.btn_reload) ? Services.languageManager.getText(Language.Keys.btn_reload) : "Reload"
		}]
	},
	dispatchDialogRequest: function(b) {
		this.fireEvent("request:loader.showDialog", b)
	}
};
Loader.ErrorHandler = Sys.extend(Sys.Observable, Loader.ErrorHandler, "Loader.ErrorHandler");
if (Sys.isDefined(Loader.ResourceHandler) && Platform.isDesktopDevice) {
	Sys.override(Loader.ResourceHandler, {
		slownessDetected: function() {
			var f = this,
				d, e = Services.languageManager;
			f.storeData("status", "slow");
			d = {
				texts: [e.hasText(Language.Keys.loadingTakesLonger) ? e.getText(Language.Keys.loadingTakesLonger) : "Loading the game is taking longer than usual."],
				buttons: [{
					action: function() {
						Environment.reload()
					},
					label: e.hasText(Language.Keys.btn_reload) ? e.getText(Language.Keys.btn_reload) : "Reload",
					scope: f
				}],
				severity: "slow"
			};
			f.fireEvent("request:loader.showDialog", d)
		}
	})
}
if (Sys.isDefined(Loader.ErrorHandler) && Platform.isDesktopDevice) {
	Sys.override(Loader.ErrorHandler, {
		GAME_SERVER_ERROR_TEXT: [{
			key: Language.Keys.error,
			fallback: "Technical Error"
		}],
		SESSION_TIMEOUT_TEXT: [{
			key: "20",
			fallback: "Your session has timed out. Restart the game."
		}],
		PLUGIN_TIMEOUT_ERROR_TEXT: [{
			key: Language.Keys.error,
			fallback: "Technical Error"
		}],
		handleRequestError: function(e) {
			var h = this,
				f, g = Sys.utils.getErrorCode(e);
			if (!Sys.utils.httpRequestIsOK(e)) {
				f = "http"
			} else {
				if (Sys.isDefined(g)) {
					f = "server";
					if (g === 20) {
						f = "timeout"
					}
				} else {
					f = "server"
				}
			}
			if (!Sys.isDefined(f) || f === h.readStatus()) {
				return
			}
			h[h.errorStatus[f]]();
			h.setStatus(f)
		},
		setupDialogButtons: function() {
			this.dialogButtons = [{
				action: function() {
					Environment.reload()
				},
				label: Services.languageManager.hasText(Language.Keys.btn_reload) ? Services.languageManager.getText(Language.Keys.btn_reload) : "Reload"
			}]
		},
		handleTimeoutError: function() {
			var b = this;
			b.dispatchDialogRequest({
				texts: b.getTexts(b.SESSION_TIMEOUT_TEXT),
				buttons: [],
				severity: "stopped"
			})
		}
	})
}
Sys.ns("Game");
Sys.ns("Services");
window.initializeGame = function(b) {
	Game.gameStartDateMs = Date.now();
	if (Sys.isDefined(Loader.DeviceDetector)) {
		new Loader.DeviceDetector()
	} else {
		if (Sys.isDefined(Core.UseragentManager)) {
			Game.uam = new Core.UseragentManager()
		}
	}
	Services.orientation = new Core.Orientation();
	Game.viewport = Services.scaling = new Core.Scaling();
	Services.languageManager = new Core.LanguageManager();
	Game.languagemanager = Services.languageManager;
	if (!Sys.isGcmEnabled) {
		Game.loader = new Core.Loader({
			name: "loader"
		})
	}
	Game.errorHandler = new Loader.ErrorHandler();
	Game.resourceHandler = new Loader.ResourceHandler();
	Services.scaling.scale();
	Game.resourceHandler.preLoad()
};
if (!Sys.isGcmEnabled) {
	document.addEventListener("DOMContentLoaded", function() {
		initializeGame()
	})
}
var __extends = (this && this.__extends) || (function() {
	var b = Object.setPrototypeOf || ({
			__proto__: []
		}
		instanceof Array && function(a, d) {
			a.__proto__ = d
		}) || function(a, g) {
		for (var d in g) {
			if (g.hasOwnProperty(d)) {
				a[d] = g[d]
			}
		}
	};
	return function(a, g) {
		b(a, g);

		function d() {
			this.constructor = a
		}
		a.prototype = g === null ? Object.create(g) : (d.prototype = g.prototype, new d())
	}
})();
var pixi_spine;
(function(c) {
	var d;
	(function(w) {
		var b = (function() {
			function e(h, g, f) {
				if (h == null) {
					throw new Error("name cannot be null.")
				}
				if (g == null) {
					throw new Error("timelines cannot be null.")
				}
				this.name = h;
				this.timelines = g;
				this.duration = f
			}
			e.prototype.apply = function(k, n, l, h, o, j, g, p) {
				if (k == null) {
					throw new Error("skeleton cannot be null.")
				}
				if (h && this.duration != 0) {
					l %= this.duration;
					if (n > 0) {
						n %= this.duration
					}
				}
				var f = this.timelines;
				for (var i = 0, m = f.length; i < m; i++) {
					f[i].apply(k, n, l, o, j, g, p)
				}
			};
			e.binarySearch = function(h, g, f) {
				if (f === void 0) {
					f = 1
				}
				var i = 0;
				var k = h.length / f - 2;
				if (k == 0) {
					return f
				}
				var j = k >>> 1;
				while (true) {
					if (h[(j + 1) * f] <= g) {
						i = j + 1
					} else {
						k = j
					}
					if (i == k) {
						return (i + 1) * f
					}
					j = (i + k) >>> 1
				}
			};
			e.linearSearch = function(h, i, j) {
				for (var g = 0, f = h.length - j; g <= f; g += j) {
					if (h[g] > i) {
						return g
					}
				}
				return -1
			};
			return e
		}());
		w.Animation = b;
		var E;
		(function(e) {
			e[e.rotate = 0] = "rotate";
			e[e.translate = 1] = "translate";
			e[e.scale = 2] = "scale";
			e[e.shear = 3] = "shear";
			e[e.attachment = 4] = "attachment";
			e[e.color = 5] = "color";
			e[e.deform = 6] = "deform";
			e[e.event = 7] = "event";
			e[e.drawOrder = 8] = "drawOrder";
			e[e.ikConstraint = 9] = "ikConstraint";
			e[e.transformConstraint = 10] = "transformConstraint";
			e[e.pathConstraintPosition = 11] = "pathConstraintPosition";
			e[e.pathConstraintSpacing = 12] = "pathConstraintSpacing";
			e[e.pathConstraintMix = 13] = "pathConstraintMix"
		})(E = w.TimelineType || (w.TimelineType = {}));
		var a = (function() {
			function e(f) {
				if (f <= 0) {
					throw new Error("frameCount must be > 0: " + f)
				}
				this.curves = w.Utils.newFloatArray((f - 1) * e.BEZIER_SIZE)
			}
			e.prototype.getFrameCount = function() {
				return this.curves.length / e.BEZIER_SIZE + 1
			};
			e.prototype.setLinear = function(f) {
				this.curves[f * e.BEZIER_SIZE] = e.LINEAR
			};
			e.prototype.setStepped = function(f) {
				this.curves[f * e.BEZIER_SIZE] = e.STEPPED
			};
			e.prototype.getCurveType = function(f) {
				var h = f * e.BEZIER_SIZE;
				if (h == this.curves.length) {
					return e.LINEAR
				}
				var g = this.curves[h];
				if (g == e.LINEAR) {
					return e.LINEAR
				}
				if (g == e.STEPPED) {
					return e.STEPPED
				}
				return e.BEZIER
			};
			e.prototype.setCurve = function(t, j, f, l, g) {
				var R = (-j * 2 + l) * 0.03,
					k = (-f * 2 + g) * 0.03;
				var o = ((j - l) * 3 + 1) * 0.006,
					q = ((f - g) * 3 + 1) * 0.006;
				var P = R * 2 + o,
					Q = k * 2 + q;
				var m = j * 0.3 + R + o * 0.16666667,
					p = f * 0.3 + k + q * 0.16666667;
				var h = t * e.BEZIER_SIZE;
				var n = this.curves;
				n[h++] = e.BEZIER;
				var r = m,
					s = p;
				for (var i = h + e.BEZIER_SIZE - 1; h < i; h += 2) {
					n[h] = r;
					n[h + 1] = s;
					m += P;
					p += Q;
					P += o;
					Q += q;
					r += m;
					s += p
				}
			};
			e.prototype.getCurvePercent = function(k, f) {
				f = w.MathUtils.clamp(f, 0, 1);
				var l = this.curves;
				var i = k * e.BEZIER_SIZE;
				var p = l[i];
				if (p == e.LINEAR) {
					return f
				}
				if (p == e.STEPPED) {
					return 0
				}
				i++;
				var n = 0;
				for (var m = i, j = i + e.BEZIER_SIZE - 1; i < j; i += 2) {
					n = l[i];
					if (n >= f) {
						var g = void 0,
							h = void 0;
						if (i == m) {
							g = 0;
							h = 0
						} else {
							g = l[i - 2];
							h = l[i - 1]
						}
						return h + (l[i + 1] - h) * (f - g) / (n - g)
					}
				}
				var o = l[i - 1];
				return o + (1 - o) * (f - n) / (1 - n)
			};
			return e
		}());
		a.LINEAR = 0;
		a.STEPPED = 1;
		a.BEZIER = 2;
		a.BEZIER_SIZE = 10 * 2 - 1;
		w.CurveTimeline = a;
		var v = (function(e) {
			__extends(f, e);

			function f(h) {
				var g = e.call(this, h) || this;
				g.frames = w.Utils.newFloatArray(h << 1);
				return g
			}
			f.prototype.getPropertyId = function() {
				return (E.rotate << 24) + this.boneIndex
			};
			f.prototype.setFrame = function(i, h, g) {
				i <<= 1;
				this.frames[i] = h;
				this.frames[i + f.ROTATION] = g
			};
			f.prototype.apply = function(j, o, k, m, i, h, r) {
				var q = this.frames;
				var n = j.bones[this.boneIndex];
				if (k < q[0]) {
					if (h) {
						n.rotation = n.data.rotation
					}
					return
				}
				if (k >= q[q.length - f.ENTRIES]) {
					if (h) {
						n.rotation = n.data.rotation + q[q.length + f.PREV_ROTATION] * i
					} else {
						var s = n.data.rotation + q[q.length + f.PREV_ROTATION] - n.rotation;
						s -= (16384 - ((16384.499999999996 - s / 360) | 0)) * 360;
						n.rotation += s * i
					}
					return
				}
				var l = b.binarySearch(q, k, f.ENTRIES);
				var t = q[l + f.PREV_ROTATION];
				var L = q[l];
				var g = this.getCurvePercent((l >> 1) - 1, 1 - (k - L) / (q[l + f.PREV_TIME] - L));
				var p = q[l + f.ROTATION] - t;
				p -= (16384 - ((16384.499999999996 - p / 360) | 0)) * 360;
				p = t + p * g;
				if (h) {
					p -= (16384 - ((16384.499999999996 - p / 360) | 0)) * 360;
					n.rotation = n.data.rotation + p * i
				} else {
					p = n.data.rotation + p - n.rotation;
					p -= (16384 - ((16384.499999999996 - p / 360) | 0)) * 360;
					n.rotation += p * i
				}
			};
			return f
		}(a));
		v.ENTRIES = 2;
		v.PREV_TIME = -2;
		v.PREV_ROTATION = -1;
		v.ROTATION = 1;
		w.RotateTimeline = v;
		var u = (function(e) {
			__extends(f, e);

			function f(h) {
				var g = e.call(this, h) || this;
				g.frames = w.Utils.newFloatArray(h * f.ENTRIES);
				return g
			}
			f.prototype.getPropertyId = function() {
				return (E.translate << 24) + this.boneIndex
			};
			f.prototype.setFrame = function(j, i, h, g) {
				j *= f.ENTRIES;
				this.frames[j] = i;
				this.frames[j + f.X] = h;
				this.frames[j + f.Y] = g
			};
			f.prototype.apply = function(i, p, j, l, h, g, r) {
				var q = this.frames;
				var m = i.bones[this.boneIndex];
				if (j < q[0]) {
					if (g) {
						m.x = m.data.x;
						m.y = m.data.y
					}
					return
				}
				var n = 0,
					o = 0;
				if (j >= q[q.length - f.ENTRIES]) {
					n = q[q.length + f.PREV_X];
					o = q[q.length + f.PREV_Y]
				} else {
					var k = b.binarySearch(q, j, f.ENTRIES);
					n = q[k + f.PREV_X];
					o = q[k + f.PREV_Y];
					var s = q[k];
					var t = this.getCurvePercent(k / f.ENTRIES - 1, 1 - (j - s) / (q[k + f.PREV_TIME] - s));
					n += (q[k + f.X] - n) * t;
					o += (q[k + f.Y] - o) * t
				}
				if (g) {
					m.x = m.data.x + n * h;
					m.y = m.data.y + o * h
				} else {
					m.x += (m.data.x + n - m.x) * h;
					m.y += (m.data.y + o - m.y) * h
				}
			};
			return f
		}(a));
		u.ENTRIES = 3;
		u.PREV_TIME = -3;
		u.PREV_X = -2;
		u.PREV_Y = -1;
		u.X = 1;
		u.Y = 2;
		w.TranslateTimeline = u;
		var J = (function(e) {
			__extends(f, e);

			function f(g) {
				return e.call(this, g) || this
			}
			f.prototype.getPropertyId = function() {
				return (E.scale << 24) + this.boneIndex
			};
			f.prototype.apply = function(i, r, j, k, h, g, t) {
				var q = this.frames;
				var l = i.bones[this.boneIndex];
				if (j < q[0]) {
					if (g) {
						l.scaleX = l.data.scaleX;
						l.scaleY = l.data.scaleY
					}
					return
				}
				var n = 0,
					o = 0;
				if (j >= q[q.length - f.ENTRIES]) {
					n = q[q.length + f.PREV_X] * l.data.scaleX;
					o = q[q.length + f.PREV_Y] * l.data.scaleY
				} else {
					var m = b.binarySearch(q, j, f.ENTRIES);
					n = q[m + f.PREV_X];
					o = q[m + f.PREV_Y];
					var O = q[m];
					var P = this.getCurvePercent(m / f.ENTRIES - 1, 1 - (j - O) / (q[m + f.PREV_TIME] - O));
					n = (n + (q[m + f.X] - n) * P) * l.data.scaleX;
					o = (o + (q[m + f.Y] - o) * P) * l.data.scaleY
				}
				if (h == 1) {
					l.scaleX = n;
					l.scaleY = o
				} else {
					var p = 0,
						s = 0;
					if (g) {
						p = l.data.scaleX;
						s = l.data.scaleY
					} else {
						p = l.scaleX;
						s = l.scaleY
					}
					if (t) {
						n = Math.abs(n) * w.MathUtils.signum(p);
						o = Math.abs(o) * w.MathUtils.signum(s)
					} else {
						p = Math.abs(p) * w.MathUtils.signum(n);
						s = Math.abs(s) * w.MathUtils.signum(o)
					}
					l.scaleX = p + (n - p) * h;
					l.scaleY = s + (o - s) * h
				}
			};
			return f
		}(u));
		w.ScaleTimeline = J;
		var C = (function(f) {
			__extends(e, f);

			function e(g) {
				return f.call(this, g) || this
			}
			e.prototype.getPropertyId = function() {
				return (E.shear << 24) + this.boneIndex
			};
			e.prototype.apply = function(i, p, j, l, h, g, r) {
				var q = this.frames;
				var m = i.bones[this.boneIndex];
				if (j < q[0]) {
					if (g) {
						m.shearX = m.data.shearX;
						m.shearY = m.data.shearY
					}
					return
				}
				var n = 0,
					o = 0;
				if (j >= q[q.length - e.ENTRIES]) {
					n = q[q.length + e.PREV_X];
					o = q[q.length + e.PREV_Y]
				} else {
					var k = b.binarySearch(q, j, e.ENTRIES);
					n = q[k + e.PREV_X];
					o = q[k + e.PREV_Y];
					var s = q[k];
					var t = this.getCurvePercent(k / e.ENTRIES - 1, 1 - (j - s) / (q[k + e.PREV_TIME] - s));
					n = n + (q[k + e.X] - n) * t;
					o = o + (q[k + e.Y] - o) * t
				}
				if (g) {
					m.shearX = m.data.shearX + n * h;
					m.shearY = m.data.shearY + o * h
				} else {
					m.shearX += (m.data.shearX + n - m.shearX) * h;
					m.shearY += (m.data.shearY + o - m.shearY) * h
				}
			};
			return e
		}(u));
		w.ShearTimeline = C;
		var H = (function(e) {
			__extends(f, e);

			function f(h) {
				var g = e.call(this, h) || this;
				g.frames = w.Utils.newFloatArray(h * f.ENTRIES);
				return g
			}
			f.prototype.getPropertyId = function() {
				return (E.color << 24) + this.slotIndex
			};
			f.prototype.setFrame = function(l, h, j, k, i, g) {
				l *= f.ENTRIES;
				this.frames[l] = h;
				this.frames[l + f.R] = j;
				this.frames[l + f.G] = k;
				this.frames[l + f.B] = i;
				this.frames[l + f.A] = g
			};
			f.prototype.apply = function(k, h, Q, o, R, s, n) {
				var m = k.slots[this.slotIndex];
				var O = this.frames;
				if (Q < O[0]) {
					if (s) {
						m.color.setFromColor(m.data.color)
					}
					return
				}
				var r = 0,
					j = 0,
					i = 0,
					g = 0;
				if (Q >= O[O.length - f.ENTRIES]) {
					var l = O.length;
					r = O[l + f.PREV_R];
					j = O[l + f.PREV_G];
					i = O[l + f.PREV_B];
					g = O[l + f.PREV_A]
				} else {
					var t = b.binarySearch(O, Q, f.ENTRIES);
					r = O[t + f.PREV_R];
					j = O[t + f.PREV_G];
					i = O[t + f.PREV_B];
					g = O[t + f.PREV_A];
					var P = O[t];
					var q = this.getCurvePercent(t / f.ENTRIES - 1, 1 - (Q - P) / (O[t + f.PREV_TIME] - P));
					r += (O[t + f.R] - r) * q;
					j += (O[t + f.G] - j) * q;
					i += (O[t + f.B] - i) * q;
					g += (O[t + f.A] - g) * q
				}
				if (R == 1) {
					m.color.set(r, j, i, g)
				} else {
					var p = m.color;
					if (s) {
						p.setFromColor(m.data.color)
					}
					p.add((r - p.r) * R, (j - p.g) * R, (i - p.b) * R, (g - p.a) * R)
				}
			};
			return f
		}(a));
		H.ENTRIES = 5;
		H.PREV_TIME = -5;
		H.PREV_R = -4;
		H.PREV_G = -3;
		H.PREV_B = -2;
		H.PREV_A = -1;
		H.R = 1;
		H.G = 2;
		H.B = 3;
		H.A = 4;
		w.ColorTimeline = H;
		var y = (function() {
			function e(f) {
				this.frames = w.Utils.newFloatArray(f);
				this.attachmentNames = new Array(f)
			}
			e.prototype.getPropertyId = function() {
				return (E.attachment << 24) + this.slotIndex
			};
			e.prototype.getFrameCount = function() {
				return this.frames.length
			};
			e.prototype.setFrame = function(f, g, h) {
				this.frames[f] = g;
				this.attachmentNames[f] = h
			};
			e.prototype.apply = function(k, o, l, n, j, i, g) {
				var p = k.slots[this.slotIndex];
				if (g && i) {
					var q = p.data.attachmentName;
					p.setAttachment(q == null ? null : k.getAttachment(this.slotIndex, q));
					return
				}
				var r = this.frames;
				if (l < r[0]) {
					if (i) {
						var h = p.data.attachmentName;
						p.setAttachment(h == null ? null : k.getAttachment(this.slotIndex, h))
					}
					return
				}
				var m = 0;
				if (l >= r[r.length - 1]) {
					m = r.length - 1
				} else {
					m = b.binarySearch(r, l, 1) - 1
				}
				var f = this.attachmentNames[m];
				k.slots[this.slotIndex].setAttachment(f == null ? null : k.getAttachment(this.slotIndex, f))
			};
			return e
		}());
		w.AttachmentTimeline = y;
		var G = (function(f) {
			__extends(e, f);

			function e(h) {
				var g = f.call(this, h) || this;
				g.frames = w.Utils.newFloatArray(h);
				g.frameVertices = new Array(h);
				return g
			}
			e.prototype.getPropertyId = function() {
				return (E.deform << 24) + this.slotIndex
			};
			e.prototype.setFrame = function(i, g, h) {
				this.frames[i] = g;
				this.frameVertices[i] = h
			};
			e.prototype.apply = function(ae, j, aa, i, ac, o, l) {
				var af = ae.slots[this.slotIndex];
				var Y = af.getAttachment();
				if (!(Y instanceof w.VertexAttachment) || !Y.applyDeform(this.attachment)) {
					return
				}
				var t = this.frames;
				var ad = af.attachmentVertices;
				if (aa < t[0]) {
					if (o) {
						w.Utils.setArraySize(ad, 0)
					}
					return
				}
				var Z = this.frameVertices;
				var W = Z[0].length;
				if (ad.length != W) {
					ac = 1
				}
				var ab = w.Utils.setArraySize(ad, W);
				if (aa >= t[t.length - 1]) {
					var h = Z[t.length - 1];
					if (ac == 1) {
						w.Utils.arrayCopy(h, 0, ab, 0, W)
					} else {
						if (o) {
							var r = Y;
							if (r.bones == null) {
								var p = r.vertices;
								for (var k = 0; k < W; k++) {
									var m = p[k];
									ab[k] = m + (h[k] - m) * ac
								}
							} else {
								for (var k = 0; k < W; k++) {
									ab[k] = h[k] * ac
								}
							}
						} else {
							for (var k = 0; k < W; k++) {
								ab[k] += (h[k] - ab[k]) * ac
							}
						}
					}
					return
				}
				var q = b.binarySearch(t, aa);
				var g = Z[q - 1];
				var s = Z[q];
				var X = t[q];
				var V = this.getCurvePercent(q - 1, 1 - (aa - X) / (t[q - 1] - X));
				if (ac == 1) {
					for (var k = 0; k < W; k++) {
						var n = g[k];
						ab[k] = n + (s[k] - n) * V
					}
				} else {
					if (o) {
						var r = Y;
						if (r.bones == null) {
							var p = r.vertices;
							for (var k = 0; k < W; k++) {
								var n = g[k],
									m = p[k];
								ab[k] = m + (n + (s[k] - n) * V - m) * ac
							}
						} else {
							for (var k = 0; k < W; k++) {
								var n = g[k];
								ab[k] = (n + (s[k] - n) * V) * ac
							}
						}
					} else {
						for (var k = 0; k < W; k++) {
							var n = g[k];
							ab[k] += (n + (s[k] - n) * V - ab[k]) * ac
						}
					}
				}
			};
			return e
		}(a));
		w.DeformTimeline = G;
		var B = (function() {
			function e(f) {
				this.frames = w.Utils.newFloatArray(f);
				this.events = new Array(f)
			}
			e.prototype.getPropertyId = function() {
				return E.event << 24
			};
			e.prototype.getFrameCount = function() {
				return this.frames.length
			};
			e.prototype.setFrame = function(f, g) {
				this.frames[f] = g.time;
				this.events[f] = g
			};
			e.prototype.apply = function(j, n, k, o, i, h, f) {
				if (o == null) {
					return
				}
				var p = this.frames;
				var l = this.frames.length;
				if (n > k) {
					this.apply(j, n, Number.MAX_VALUE, o, i, h, f);
					n = -1
				} else {
					if (n >= p[l - 1]) {
						return
					}
				}
				if (k < p[0]) {
					return
				}
				var m = 0;
				if (n < p[0]) {
					m = 0
				} else {
					m = b.binarySearch(p, n);
					var g = p[m];
					while (m > 0) {
						if (p[m - 1] != g) {
							break
						}
						m--
					}
				}
				for (; m < l && k >= p[m]; m++) {
					o.push(this.events[m])
				}
			};
			return e
		}());
		w.EventTimeline = B;
		var I = (function() {
			function e(f) {
				this.frames = w.Utils.newFloatArray(f);
				this.drawOrders = new Array(f)
			}
			e.prototype.getPropertyId = function() {
				return E.drawOrder << 24
			};
			e.prototype.getFrameCount = function() {
				return this.frames.length
			};
			e.prototype.setFrame = function(f, h, g) {
				this.frames[f] = h;
				this.drawOrders[f] = g
			};
			e.prototype.apply = function(i, n, j, m, h, f, r) {
				var p = i.drawOrder;
				var s = i.slots;
				if (r && f) {
					w.Utils.arrayCopy(i.slots, 0, i.drawOrder, 0, i.slots.length);
					return
				}
				var q = this.frames;
				if (j < q[0]) {
					if (f) {
						w.Utils.arrayCopy(i.slots, 0, i.drawOrder, 0, i.slots.length)
					}
					return
				}
				var l = 0;
				if (j >= q[q.length - 1]) {
					l = q.length - 1
				} else {
					l = b.binarySearch(q, j) - 1
				}
				var o = this.drawOrders[l];
				if (o == null) {
					w.Utils.arrayCopy(s, 0, p, 0, s.length)
				} else {
					for (var g = 0, k = o.length; g < k; g++) {
						p[g] = s[o[g]]
					}
				}
			};
			return e
		}());
		w.DrawOrderTimeline = I;
		var A = (function(f) {
			__extends(e, f);

			function e(h) {
				var g = f.call(this, h) || this;
				g.frames = w.Utils.newFloatArray(h * e.ENTRIES);
				return g
			}
			e.prototype.getPropertyId = function() {
				return (E.ikConstraint << 24) + this.ikConstraintIndex
			};
			e.prototype.setFrame = function(i, j, g, h) {
				i *= e.ENTRIES;
				this.frames[i] = j;
				this.frames[i + e.MIX] = g;
				this.frames[i + e.BEND_DIRECTION] = h
			};
			e.prototype.apply = function(j, o, k, n, i, h, r) {
				var q = this.frames;
				var m = j.ikConstraints[this.ikConstraintIndex];
				if (k < q[0]) {
					if (h) {
						m.mix = m.data.mix;
						m.bendDirection = m.data.bendDirection
					}
					return
				}
				if (k >= q[q.length - e.ENTRIES]) {
					if (h) {
						m.mix = m.data.mix + (q[q.length + e.PREV_MIX] - m.data.mix) * i;
						m.bendDirection = r ? m.data.bendDirection : q[q.length + e.PREV_BEND_DIRECTION]
					} else {
						m.mix += (q[q.length + e.PREV_MIX] - m.mix) * i;
						if (!r) {
							m.bendDirection = q[q.length + e.PREV_BEND_DIRECTION]
						}
					}
					return
				}
				var l = b.binarySearch(q, k, e.ENTRIES);
				var p = q[l + e.PREV_MIX];
				var s = q[l];
				var g = this.getCurvePercent(l / e.ENTRIES - 1, 1 - (k - s) / (q[l + e.PREV_TIME] - s));
				if (h) {
					m.mix = m.data.mix + (p + (q[l + e.MIX] - p) * g - m.data.mix) * i;
					m.bendDirection = r ? m.data.bendDirection : q[l + e.PREV_BEND_DIRECTION]
				} else {
					m.mix += (p + (q[l + e.MIX] - p) * g - m.mix) * i;
					if (!r) {
						m.bendDirection = q[l + e.PREV_BEND_DIRECTION]
					}
				}
			};
			return e
		}(a));
		A.ENTRIES = 3;
		A.PREV_TIME = -3;
		A.PREV_MIX = -2;
		A.PREV_BEND_DIRECTION = -1;
		A.MIX = 1;
		A.BEND_DIRECTION = 2;
		w.IkConstraintTimeline = A;
		var z = (function(e) {
			__extends(f, e);

			function f(h) {
				var g = e.call(this, h) || this;
				g.frames = w.Utils.newFloatArray(h * f.ENTRIES);
				return g
			}
			f.prototype.getPropertyId = function() {
				return (E.transformConstraint << 24) + this.transformConstraintIndex
			};
			f.prototype.setFrame = function(l, h, i, k, g, j) {
				l *= f.ENTRIES;
				this.frames[l] = h;
				this.frames[l + f.ROTATE] = i;
				this.frames[l + f.TRANSLATE] = k;
				this.frames[l + f.SCALE] = g;
				this.frames[l + f.SHEAR] = j
			};
			f.prototype.apply = function(m, j, R, i, k, s, r) {
				var P = this.frames;
				var q = m.transformConstraints[this.transformConstraintIndex];
				if (R < P[0]) {
					if (s) {
						var h = q.data;
						q.rotateMix = h.rotateMix;
						q.translateMix = h.rotateMix;
						q.scaleMix = h.scaleMix;
						q.shearMix = h.shearMix
					}
					return
				}
				var o = 0,
					O = 0,
					g = 0,
					l = 0;
				if (R >= P[P.length - f.ENTRIES]) {
					var p = P.length;
					o = P[p + f.PREV_ROTATE];
					O = P[p + f.PREV_TRANSLATE];
					g = P[p + f.PREV_SCALE];
					l = P[p + f.PREV_SHEAR]
				} else {
					var t = b.binarySearch(P, R, f.ENTRIES);
					o = P[t + f.PREV_ROTATE];
					O = P[t + f.PREV_TRANSLATE];
					g = P[t + f.PREV_SCALE];
					l = P[t + f.PREV_SHEAR];
					var Q = P[t];
					var n = this.getCurvePercent(t / f.ENTRIES - 1, 1 - (R - Q) / (P[t + f.PREV_TIME] - Q));
					o += (P[t + f.ROTATE] - o) * n;
					O += (P[t + f.TRANSLATE] - O) * n;
					g += (P[t + f.SCALE] - g) * n;
					l += (P[t + f.SHEAR] - l) * n
				}
				if (s) {
					var h = q.data;
					q.rotateMix = h.rotateMix + (o - h.rotateMix) * k;
					q.translateMix = h.translateMix + (O - h.translateMix) * k;
					q.scaleMix = h.scaleMix + (g - h.scaleMix) * k;
					q.shearMix = h.shearMix + (l - h.shearMix) * k
				} else {
					q.rotateMix += (o - q.rotateMix) * k;
					q.translateMix += (O - q.translateMix) * k;
					q.scaleMix += (g - q.scaleMix) * k;
					q.shearMix += (l - q.shearMix) * k
				}
			};
			return f
		}(a));
		z.ENTRIES = 5;
		z.PREV_TIME = -5;
		z.PREV_ROTATE = -4;
		z.PREV_TRANSLATE = -3;
		z.PREV_SCALE = -2;
		z.PREV_SHEAR = -1;
		z.ROTATE = 1;
		z.TRANSLATE = 2;
		z.SCALE = 3;
		z.SHEAR = 4;
		w.TransformConstraintTimeline = z;
		var x = (function(f) {
			__extends(e, f);

			function e(h) {
				var g = f.call(this, h) || this;
				g.frames = w.Utils.newFloatArray(h * e.ENTRIES);
				return g
			}
			e.prototype.getPropertyId = function() {
				return (E.pathConstraintPosition << 24) + this.pathConstraintIndex
			};
			e.prototype.setFrame = function(i, g, h) {
				i *= e.ENTRIES;
				this.frames[i] = g;
				this.frames[i + e.VALUE] = h
			};
			e.prototype.apply = function(j, o, k, n, i, g, q) {
				var p = this.frames;
				var m = j.pathConstraints[this.pathConstraintIndex];
				if (k < p[0]) {
					if (g) {
						m.position = m.data.position
					}
					return
				}
				var h = 0;
				if (k >= p[p.length - e.ENTRIES]) {
					h = p[p.length + e.PREV_VALUE]
				} else {
					var l = b.binarySearch(p, k, e.ENTRIES);
					h = p[l + e.PREV_VALUE];
					var r = p[l];
					var s = this.getCurvePercent(l / e.ENTRIES - 1, 1 - (k - r) / (p[l + e.PREV_TIME] - r));
					h += (p[l + e.VALUE] - h) * s
				}
				if (g) {
					m.position = m.data.position + (h - m.data.position) * i
				} else {
					m.position += (h - m.position) * i
				}
			};
			return e
		}(a));
		x.ENTRIES = 2;
		x.PREV_TIME = -2;
		x.PREV_VALUE = -1;
		x.VALUE = 1;
		w.PathConstraintPositionTimeline = x;
		var D = (function(e) {
			__extends(f, e);

			function f(g) {
				return e.call(this, g) || this
			}
			f.prototype.getPropertyId = function() {
				return (E.pathConstraintSpacing << 24) + this.pathConstraintIndex
			};
			f.prototype.apply = function(j, o, k, n, i, h, r) {
				var q = this.frames;
				var m = j.pathConstraints[this.pathConstraintIndex];
				if (k < q[0]) {
					if (h) {
						m.spacing = m.data.spacing
					}
					return
				}
				var p = 0;
				if (k >= q[q.length - f.ENTRIES]) {
					p = q[q.length + f.PREV_VALUE]
				} else {
					var l = b.binarySearch(q, k, f.ENTRIES);
					p = q[l + f.PREV_VALUE];
					var s = q[l];
					var g = this.getCurvePercent(l / f.ENTRIES - 1, 1 - (k - s) / (q[l + f.PREV_TIME] - s));
					p += (q[l + f.VALUE] - p) * g
				}
				if (h) {
					m.spacing = m.data.spacing + (p - m.data.spacing) * i
				} else {
					m.spacing += (p - m.spacing) * i
				}
			};
			return f
		}(x));
		w.PathConstraintSpacingTimeline = D;
		var F = (function(f) {
			__extends(e, f);

			function e(h) {
				var g = f.call(this, h) || this;
				g.frames = w.Utils.newFloatArray(h * e.ENTRIES);
				return g
			}
			e.prototype.getPropertyId = function() {
				return (E.pathConstraintMix << 24) + this.pathConstraintIndex
			};
			e.prototype.setFrame = function(i, j, h, g) {
				i *= e.ENTRIES;
				this.frames[i] = j;
				this.frames[i + e.ROTATE] = h;
				this.frames[i + e.TRANSLATE] = g
			};
			e.prototype.apply = function(i, p, j, n, h, t, q) {
				var o = this.frames;
				var m = i.pathConstraints[this.pathConstraintIndex];
				if (j < o[0]) {
					if (t) {
						m.rotateMix = m.data.rotateMix;
						m.translateMix = m.data.translateMix
					}
					return
				}
				var g = 0,
					k = 0;
				if (j >= o[o.length - e.ENTRIES]) {
					g = o[o.length + e.PREV_ROTATE];
					k = o[o.length + e.PREV_TRANSLATE]
				} else {
					var l = b.binarySearch(o, j, e.ENTRIES);
					g = o[l + e.PREV_ROTATE];
					k = o[l + e.PREV_TRANSLATE];
					var r = o[l];
					var s = this.getCurvePercent(l / e.ENTRIES - 1, 1 - (j - r) / (o[l + e.PREV_TIME] - r));
					g += (o[l + e.ROTATE] - g) * s;
					k += (o[l + e.TRANSLATE] - k) * s
				}
				if (t) {
					m.rotateMix = m.data.rotateMix + (g - m.data.rotateMix) * h;
					m.translateMix = m.data.translateMix + (k - m.data.translateMix) * h
				} else {
					m.rotateMix += (g - m.rotateMix) * h;
					m.translateMix += (k - m.translateMix) * h
				}
			};
			return e
		}(a));
		F.ENTRIES = 3;
		F.PREV_TIME = -3;
		F.PREV_ROTATE = -2;
		F.PREV_TRANSLATE = -1;
		F.ROTATE = 1;
		F.TRANSLATE = 2;
		w.PathConstraintMixTimeline = F
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(j) {
		var l = (function() {
			function e(f) {
				this.tracks = new Array();
				this.events = new Array();
				this.listeners = new Array();
				this.queue = new b(this);
				this.propertyIDs = new j.IntSet();
				this.animationsChanged = false;
				this.timeScale = 1;
				this.trackEntryPool = new j.Pool(function() {
					return new a()
				});
				this.data = f
			}
			e.prototype.update = function(s) {
				s *= this.timeScale;
				var h = this.tracks;
				for (var g = 0, t = h.length; g < t; g++) {
					var u = h[g];
					if (u == null) {
						continue
					}
					u.animationLast = u.nextAnimationLast;
					u.trackLast = u.nextTrackLast;
					var v = s * u.timeScale;
					if (u.delay > 0) {
						u.delay -= v;
						if (u.delay > 0) {
							continue
						}
						v = -u.delay;
						u.delay = 0
					}
					var f = u.next;
					if (f != null) {
						var n = u.trackLast - f.delay;
						if (n >= 0) {
							f.delay = 0;
							f.trackTime = n + s * f.timeScale;
							u.trackTime += v;
							this.setCurrent(g, f, true);
							while (f.mixingFrom != null) {
								f.mixTime += v;
								f = f.mixingFrom
							}
							continue
						}
					} else {
						if (u.trackLast >= u.trackEnd && u.mixingFrom == null) {
							h[g] = null;
							this.queue.end(u);
							this.disposeNext(u);
							continue
						}
					}
					this.updateMixingFrom(u, s);
					u.trackTime += v
				}
				this.queue.drain()
			};
			e.prototype.updateMixingFrom = function(h, f) {
				var g = h.mixingFrom;
				if (g == null) {
					return
				}
				this.updateMixingFrom(g, f);
				if (h.mixTime >= h.mixDuration && g.mixingFrom != null && h.mixTime > 0) {
					h.mixingFrom = null;
					this.queue.end(g);
					return
				}
				g.animationLast = g.nextAnimationLast;
				g.trackLast = g.nextTrackLast;
				g.trackTime += f * g.timeScale;
				h.mixTime += f * g.timeScale
			};
			e.prototype.apply = function(n) {
				if (n == null) {
					throw new Error("skeleton cannot be null.")
				}
				if (this.animationsChanged) {
					this._animationsChanged()
				}
				var E = this.events;
				var K = this.tracks;
				for (var h = 0, B = K.length; h < B; h++) {
					var L = K[h];
					if (L == null || L.delay > 0) {
						continue
					}
					var F = L.alpha;
					if (L.mixingFrom != null) {
						F *= this.applyMixingFrom(L, n)
					} else {
						if (L.trackTime >= L.trackEnd) {
							F = 0
						}
					}
					var A = L.animationLast,
						I = L.getAnimationTime();
					var C = L.animation.timelines.length;
					var f = L.animation.timelines;
					if (F == 1) {
						for (var G = 0; G < C; G++) {
							f[G].apply(n, A, I, E, 1, true, false)
						}
					} else {
						var J = L.timelinesRotation.length == 0;
						if (J) {
							j.Utils.setArraySize(L.timelinesRotation, C << 1, null)
						}
						var D = L.timelinesRotation;
						var g = L.timelinesFirst;
						for (var G = 0; G < C; G++) {
							var H = f[G];
							if (H instanceof j.RotateTimeline) {
								this.applyRotateTimeline(H, n, I, F, g[G], D, G << 1, J)
							} else {
								H.apply(n, A, I, E, F, g[G], false)
							}
						}
					}
					this.queueEvents(L, I);
					E.length = 0;
					L.nextAnimationLast = I;
					L.nextTrackLast = L.trackTime
				}
				this.queue.drain()
			};
			e.prototype.applyMixingFrom = function(O, N) {
				var E = O.mixingFrom;
				if (E.mixingFrom != null) {
					this.applyMixingFrom(E, N)
				}
				var J = 0;
				if (O.mixDuration == 0) {
					J = 1
				} else {
					J = O.mixTime / O.mixDuration;
					if (J > 1) {
						J = 1
					}
				}
				var P = J < E.eventThreshold ? this.events : null;
				var I = J < E.attachmentThreshold,
					g = J < E.drawOrderThreshold;
				var h = E.animationLast,
					D = E.getAnimationTime();
				var H = E.animation.timelines.length;
				var F = E.animation.timelines;
				var B = E.timelinesFirst;
				var M = E.alpha * O.mixAlpha * (1 - J);
				var K = E.timelinesRotation.length == 0;
				if (K) {
					j.Utils.setArraySize(E.timelinesRotation, H << 1, null)
				}
				var f = E.timelinesRotation;
				for (var C = 0; C < H; C++) {
					var L = F[C];
					var G = B[C];
					if (L instanceof j.RotateTimeline) {
						this.applyRotateTimeline(L, N, D, M, G, f, C << 1, K)
					} else {
						if (!G) {
							if (!I && L instanceof j.AttachmentTimeline) {
								continue
							}
							if (!g && L instanceof j.DrawOrderTimeline) {
								continue
							}
						}
						L.apply(N, h, D, P, M, G, true)
					}
				}
				if (O.mixDuration > 0) {
					this.queueEvents(E, D)
				}
				this.events.length = 0;
				E.nextAnimationLast = D;
				E.nextTrackLast = E.trackTime;
				return J
			};
			e.prototype.applyRotateTimeline = function(V, X, R, W, h, L, Q, T) {
				if (T) {
					L[Q] = 0
				}
				if (W == 1) {
					V.apply(X, 0, R, null, 1, h, false);
					return
				}
				var P = V;
				var J = P.frames;
				var U = X.bones[P.boneIndex];
				if (R < J[0]) {
					if (h) {
						U.rotation = U.data.rotation
					}
					return
				}
				var S = 0;
				if (R >= J[J.length - j.RotateTimeline.ENTRIES]) {
					S = U.data.rotation + J[J.length + j.RotateTimeline.PREV_ROTATION]
				} else {
					var G = j.Animation.binarySearch(J, R, j.RotateTimeline.ENTRIES);
					var N = J[G + j.RotateTimeline.PREV_ROTATION];
					var M = J[G];
					var Z = P.getCurvePercent((G >> 1) - 1, 1 - (R - M) / (J[G + j.RotateTimeline.PREV_TIME] - M));
					S = J[G + j.RotateTimeline.ROTATION] - N;
					S -= (16384 - ((16384.499999999996 - S / 360) | 0)) * 360;
					S = N + S * Z + U.data.rotation;
					S -= (16384 - ((16384.499999999996 - S / 360) | 0)) * 360
				}
				var O = h ? U.data.rotation : U.rotation;
				var I = 0,
					H = S - O;
				if (H == 0) {
					I = L[Q]
				} else {
					H -= (16384 - ((16384.499999999996 - H / 360) | 0)) * 360;
					var K = 0,
						Y = 0;
					if (T) {
						K = 0;
						Y = H
					} else {
						K = L[Q];
						Y = L[Q + 1]
					}
					var f = H > 0,
						g = K >= 0;
					if (j.MathUtils.signum(Y) != j.MathUtils.signum(H) && Math.abs(Y) <= 90) {
						if (Math.abs(K) > 180) {
							K += 360 * j.MathUtils.signum(K)
						}
						g = f
					}
					I = H + K - K % 360;
					if (g != f) {
						I += 360 * j.MathUtils.signum(K)
					}
					L[Q] = I
				}
				L[Q + 1] = H;
				O += I * W;
				U.rotation = O - (16384 - ((16384.499999999996 - O / 360) | 0)) * 360
			};
			e.prototype.queueEvents = function(A, B) {
				var x = A.animationStart,
					y = A.animationEnd;
				var n = y - x;
				var v = A.trackLast % n;
				var z = this.events;
				var h = 0,
					w = z.length;
				for (; h < w; h++) {
					var f = z[h];
					if (f.time < v) {
						break
					}
					if (f.time > y) {
						continue
					}
					this.queue.event(A, f)
				}
				if (A.loop ? (v > A.trackTime % n) : (B >= y && A.animationLast < y)) {
					this.queue.complete(A)
				}
				for (; h < w; h++) {
					var g = z[h];
					if (g.time < x) {
						continue
					}
					this.queue.event(A, z[h])
				}
			};
			e.prototype.clearTracks = function() {
				var g = this.queue.drainDisabled;
				this.queue.drainDisabled = true;
				for (var h = 0, f = this.tracks.length; h < f; h++) {
					this.clearTrack(h)
				}
				this.tracks.length = 0;
				this.queue.drainDisabled = g;
				this.queue.drain()
			};
			e.prototype.clearTrack = function(f) {
				if (f >= this.tracks.length) {
					return
				}
				var h = this.tracks[f];
				if (h == null) {
					return
				}
				this.queue.end(h);
				this.disposeNext(h);
				var n = h;
				while (true) {
					var g = n.mixingFrom;
					if (g == null) {
						break
					}
					this.queue.end(g);
					n.mixingFrom = null;
					n = g
				}
				this.tracks[h.trackIndex] = null;
				this.queue.drain()
			};
			e.prototype.setCurrent = function(n, h, g) {
				var f = this.expandToIndex(n);
				this.tracks[n] = h;
				if (f != null) {
					if (g) {
						this.queue.interrupt(f)
					}
					h.mixingFrom = f;
					h.mixTime = 0;
					f.timelinesRotation.length = 0;
					if (f.mixingFrom != null && f.mixDuration > 0) {
						h.mixAlpha *= Math.min(f.mixTime / f.mixDuration, 1)
					}
				}
				this.queue.start(h)
			};
			e.prototype.setAnimation = function(f, h, n) {
				var g = this.data.skeletonData.findAnimation(h);
				if (g == null) {
					throw new Error("Animation not found: " + h)
				}
				return this.setAnimationWith(f, g, n)
			};
			e.prototype.setAnimationWith = function(q, g, p) {
				if (g == null) {
					throw new Error("animation cannot be null.")
				}
				var r = true;
				var f = this.expandToIndex(q);
				if (f != null) {
					if (f.nextTrackLast == -1) {
						this.tracks[q] = f.mixingFrom;
						this.queue.interrupt(f);
						this.queue.end(f);
						this.disposeNext(f);
						f = f.mixingFrom;
						r = false
					} else {
						this.disposeNext(f)
					}
				}
				var h = this.trackEntry(q, g, p, f);
				this.setCurrent(q, h, r);
				this.queue.drain();
				return h
			};
			e.prototype.addAnimation = function(p, g, o, h) {
				var f = this.data.skeletonData.findAnimation(g);
				if (f == null) {
					throw new Error("Animation not found: " + g)
				}
				return this.addAnimationWith(p, f, o, h)
			};
			e.prototype.addAnimationWith = function(r, t, q, h) {
				if (t == null) {
					throw new Error("animation cannot be null.")
				}
				var f = this.expandToIndex(r);
				if (f != null) {
					while (f.next != null) {
						f = f.next
					}
				}
				var g = this.trackEntry(r, t, q, f);
				if (f == null) {
					this.setCurrent(r, g, true);
					this.queue.drain()
				} else {
					f.next = g;
					if (h <= 0) {
						var s = f.animationEnd - f.animationStart;
						if (s != 0) {
							h += s * (1 + ((f.trackTime / s) | 0)) - this.data.getMix(f.animation, t)
						} else {
							h = 0
						}
					}
				}
				g.delay = h;
				return g
			};
			e.prototype.setEmptyAnimation = function(f, h) {
				var g = this.setAnimationWith(f, e.emptyAnimation, false);
				g.mixDuration = h;
				g.trackEnd = h;
				return g
			};
			e.prototype.addEmptyAnimation = function(f, n, h) {
				if (h <= 0) {
					h -= n
				}
				var g = this.addAnimationWith(f, e.emptyAnimation, false, h);
				g.mixDuration = n;
				g.trackEnd = n;
				return g
			};
			e.prototype.setEmptyAnimations = function(n) {
				var g = this.queue.drainDisabled;
				this.queue.drainDisabled = true;
				for (var h = 0, p = this.tracks.length; h < p; h++) {
					var f = this.tracks[h];
					if (f != null) {
						this.setEmptyAnimation(f.trackIndex, n)
					}
				}
				this.queue.drainDisabled = g;
				this.queue.drain()
			};
			e.prototype.expandToIndex = function(f) {
				if (f < this.tracks.length) {
					return this.tracks[f]
				}
				j.Utils.ensureArrayCapacity(this.tracks, f - this.tracks.length + 1, null);
				this.tracks.length = f + 1;
				return null
			};
			e.prototype.trackEntry = function(p, f, o, g) {
				var h = this.trackEntryPool.obtain();
				h.trackIndex = p;
				h.animation = f;
				h.loop = o;
				h.eventThreshold = 0;
				h.attachmentThreshold = 0;
				h.drawOrderThreshold = 0;
				h.animationStart = 0;
				h.animationEnd = f.duration;
				h.animationLast = -1;
				h.nextAnimationLast = -1;
				h.delay = 0;
				h.trackTime = 0;
				h.trackLast = -1;
				h.nextTrackLast = -1;
				h.trackEnd = Number.MAX_VALUE;
				h.timeScale = 1;
				h.alpha = 1;
				h.mixAlpha = 1;
				h.mixTime = 0;
				h.mixDuration = g == null ? 0 : this.data.getMix(g.animation, f);
				return h
			};
			e.prototype.disposeNext = function(f) {
				var g = f.next;
				while (g != null) {
					this.queue.dispose(g);
					g = g.next
				}
				f.next = null
			};
			e.prototype._animationsChanged = function() {
				this.animationsChanged = false;
				var f = this.propertyIDs;
				var n = 0,
					g = this.tracks.length;
				f.clear();
				for (; n < g; n++) {
					var h = this.tracks[n];
					if (h == null) {
						continue
					}
					this.setTimelinesFirst(h);
					n++;
					break
				}
				for (; n < g; n++) {
					var h = this.tracks[n];
					if (h != null) {
						this.checkTimelinesFirst(h)
					}
				}
			};
			e.prototype.setTimelinesFirst = function(g) {
				if (g.mixingFrom != null) {
					this.setTimelinesFirst(g.mixingFrom);
					this.checkTimelinesUsage(g, g.timelinesFirst);
					return
				}
				var q = this.propertyIDs;
				var h = g.animation.timelines;
				var r = h.length;
				var f = j.Utils.setArraySize(g.timelinesFirst, r, false);
				for (var n = 0; n < r; n++) {
					q.add(h[n].getPropertyId());
					f[n] = true
				}
			};
			e.prototype.checkTimelinesFirst = function(f) {
				if (f.mixingFrom != null) {
					this.checkTimelinesFirst(f.mixingFrom)
				}
				this.checkTimelinesUsage(f, f.timelinesFirst)
			};
			e.prototype.checkTimelinesUsage = function(f, n) {
				var r = this.propertyIDs;
				var g = f.animation.timelines;
				var s = g.length;
				var t = j.Utils.setArraySize(n, s);
				for (var h = 0; h < s; h++) {
					t[h] = r.add(g[h].getPropertyId())
				}
			};
			e.prototype.getCurrent = function(f) {
				if (f >= this.tracks.length) {
					return null
				}
				return this.tracks[f]
			};
			e.prototype.addListener = function(f) {
				if (f == null) {
					throw new Error("listener cannot be null.")
				}
				this.listeners.push(f)
			};
			e.prototype.removeListener = function(f) {
				var g = this.listeners.indexOf(f);
				if (g >= 0) {
					this.listeners.splice(g, 1)
				}
			};
			e.prototype.clearListeners = function() {
				this.listeners.length = 0
			};
			e.prototype.clearListenerNotifications = function() {
				this.queue.clear()
			};
			e.prototype.setAnimationByName = function(f, g, h) {
				if (!e.deprecatedWarning1) {
					e.deprecatedWarning1 = true
				}
				this.setAnimation(f, g, h)
			};
			e.prototype.addAnimationByName = function(f, g, n, h) {
				if (!e.deprecatedWarning2) {
					e.deprecatedWarning2 = true
				}
				this.addAnimation(f, g, n, h)
			};
			e.prototype.hasAnimation = function(g) {
				var f = this.data.skeletonData.findAnimation(g);
				return f !== null
			};
			e.prototype.hasAnimationByName = function(f) {
				if (!e.deprecatedWarning3) {
					e.deprecatedWarning3 = true
				}
				return this.hasAnimation(f)
			};
			return e
		}());
		l.emptyAnimation = new j.Animation("<empty>", [], 0);
		l.deprecatedWarning1 = false;
		l.deprecatedWarning2 = false;
		l.deprecatedWarning3 = false;
		j.AnimationState = l;
		var a = (function() {
			function e() {
				this.timelinesFirst = new Array();
				this.timelinesRotation = new Array()
			}
			e.prototype.reset = function() {
				this.next = null;
				this.mixingFrom = null;
				this.animation = null;
				this.listener = null;
				this.timelinesFirst.length = 0;
				this.timelinesRotation.length = 0
			};
			e.prototype.getAnimationTime = function() {
				if (this.loop) {
					var f = this.animationEnd - this.animationStart;
					if (f == 0) {
						return this.animationStart
					}
					return (this.trackTime % f) + this.animationStart
				}
				return Math.min(this.trackTime + this.animationStart, this.animationEnd)
			};
			e.prototype.setAnimationLast = function(f) {
				this.animationLast = f;
				this.nextAnimationLast = f
			};
			e.prototype.isComplete = function() {
				return this.trackTime >= this.animationEnd - this.animationStart
			};
			e.prototype.resetRotationDirections = function() {
				this.timelinesRotation.length = 0
			};
			Object.defineProperty(e.prototype, "time", {
				get: function() {
					if (!e.deprecatedWarning1) {
						e.deprecatedWarning1 = true
					}
					return this.trackTime
				},
				set: function(f) {
					if (!e.deprecatedWarning1) {
						e.deprecatedWarning1 = true
					}
					this.trackTime = f
				},
				enumerable: true,
				configurable: true
			});
			Object.defineProperty(e.prototype, "endTime", {
				get: function() {
					if (!e.deprecatedWarning2) {
						e.deprecatedWarning2 = true
					}
					return this.trackTime
				},
				set: function(f) {
					if (!e.deprecatedWarning2) {
						e.deprecatedWarning2 = true
					}
					this.trackTime = f
				},
				enumerable: true,
				configurable: true
			});
			e.prototype.loopsCount = function() {
				return Math.floor(this.trackTime / this.trackEnd)
			};
			return e
		}());
		a.deprecatedWarning1 = false;
		a.deprecatedWarning2 = false;
		j.TrackEntry = a;
		var b = (function() {
			function e(f) {
				this.objects = [];
				this.drainDisabled = false;
				this.animState = f
			}
			e.prototype.start = function(f) {
				this.objects.push(i.start);
				this.objects.push(f);
				this.animState.animationsChanged = true
			};
			e.prototype.interrupt = function(f) {
				this.objects.push(i.interrupt);
				this.objects.push(f)
			};
			e.prototype.end = function(f) {
				this.objects.push(i.end);
				this.objects.push(f);
				this.animState.animationsChanged = true
			};
			e.prototype.dispose = function(f) {
				this.objects.push(i.dispose);
				this.objects.push(f)
			};
			e.prototype.complete = function(f) {
				this.objects.push(i.complete);
				this.objects.push(f)
			};
			e.prototype.event = function(f, g) {
				this.objects.push(i.event);
				this.objects.push(f);
				this.objects.push(g)
			};
			e.prototype.deprecateStuff = function() {
				if (!e.deprecatedWarning1) {
					e.deprecatedWarning1 = true
				}
				return true
			};
			e.prototype.drain = function() {
				if (this.drainDisabled) {
					return
				}
				this.drainDisabled = true;
				var t = this.objects;
				var f = this.animState.listeners;
				for (var r = 0; r < t.length; r += 2) {
					var g = t[r];
					var u = t[r + 1];
					switch (g) {
						case i.start:
							if (u.listener != null && u.listener.start) {
								u.listener.start(u)
							}
							for (var h = 0; h < f.length; h++) {
								if (f[h].start) {
									f[h].start(u)
								}
							}
							u.onStart && this.deprecateStuff() && u.onStart(u.trackIndex);
							this.animState.onStart && this.deprecateStuff() && this.deprecateStuff && this.animState.onStart(u.trackIndex);
							break;
						case i.interrupt:
							if (u.listener != null && u.listener.interrupt) {
								u.listener.interrupt(u)
							}
							for (var h = 0; h < f.length; h++) {
								if (f[h].interrupt) {
									f[h].interrupt(u)
								}
							}
							break;
						case i.end:
							if (u.listener != null && u.listener.end) {
								u.listener.end(u)
							}
							for (var h = 0; h < f.length; h++) {
								if (f[h].end) {
									f[h].end(u)
								}
							}
							u.onEnd && this.deprecateStuff() && u.onEnd(u.trackIndex);
							this.animState.onEnd && this.deprecateStuff() && this.animState.onEnd(u.trackIndex);
						case i.dispose:
							if (u.listener != null && u.listener.dispose) {
								u.listener.dispose(u)
							}
							for (var h = 0; h < f.length; h++) {
								if (f[h].dispose) {
									f[h].dispose(u)
								}
							}
							this.animState.trackEntryPool.free(u);
							break;
						case i.complete:
							if (u.listener != null && u.listener.complete) {
								u.listener.complete(u)
							}
							for (var h = 0; h < f.length; h++) {
								if (f[h].complete) {
									f[h].complete(u)
								}
							}
							var v = j.MathUtils.toInt(u.loopsCount());
							u.onComplete && this.deprecateStuff() && u.onComplete(u.trackIndex, v);
							this.animState.onComplete && this.deprecateStuff() && this.animState.onComplete(u.trackIndex, v);
							break;
						case i.event:
							var s = t[r++ + 2];
							if (u.listener != null && u.listener.event) {
								u.listener.event(u, s)
							}
							for (var h = 0; h < f.length; h++) {
								if (f[h].event) {
									f[h].event(u, s)
								}
							}
							u.onEvent && this.deprecateStuff() && u.onEvent(u.trackIndex, s);
							this.animState.onEvent && this.deprecateStuff() && this.animState.onEvent(u.trackIndex, s);
							break
					}
				}
				this.clear();
				this.drainDisabled = false
			};
			e.prototype.clear = function() {
				this.objects.length = 0
			};
			return e
		}());
		b.deprecatedWarning1 = false;
		j.EventQueue = b;
		var i;
		(function(e) {
			e[e.start = 0] = "start";
			e[e.interrupt = 1] = "interrupt";
			e[e.end = 2] = "end";
			e[e.dispose = 3] = "dispose";
			e[e.complete = 4] = "complete";
			e[e.event = 5] = "event"
		})(i = j.EventType || (j.EventType = {}));
		var k = (function() {
			function e() {}
			e.prototype.start = function(f) {};
			e.prototype.interrupt = function(f) {};
			e.prototype.end = function(f) {};
			e.prototype.dispose = function(f) {};
			e.prototype.complete = function(f) {};
			e.prototype.event = function(f, g) {};
			return e
		}());
		j.AnimationStateAdapter2 = k
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(a) {
		var b = (function() {
			function f(e) {
				this.animationToMixTime = {};
				this.defaultMix = 0;
				if (e == null) {
					throw new Error("skeletonData cannot be null.")
				}
				this.skeletonData = e
			}
			f.prototype.setMix = function(m, n, l) {
				var e = this.skeletonData.findAnimation(m);
				if (e == null) {
					throw new Error("Animation not found: " + m)
				}
				var k = this.skeletonData.findAnimation(n);
				if (k == null) {
					throw new Error("Animation not found: " + n)
				}
				this.setMixWith(e, k, l)
			};
			f.prototype.setMixByName = function(i, j, e) {
				if (!f.deprecatedWarning1) {
					f.deprecatedWarning1 = true
				}
				this.setMix(i, j, e)
			};
			f.prototype.setMixWith = function(e, j, k) {
				if (e == null) {
					throw new Error("from cannot be null.")
				}
				if (j == null) {
					throw new Error("to cannot be null.")
				}
				var l = e.name + j.name;
				this.animationToMixTime[l] = k
			};
			f.prototype.getMix = function(e, j) {
				var l = e.name + j.name;
				var k = this.animationToMixTime[l];
				return k === undefined ? this.defaultMix : k
			};
			return f
		}());
		b.deprecatedWarning1 = false;
		a.AnimationStateData = b
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a = (function() {
			function f(e) {
				this.atlas = e
			}
			f.prototype.newRegionAttachment = function(k, n, l) {
				var m = this.atlas.findRegion(l);
				if (m == null) {
					throw new Error("Region not found in atlas: " + l + " (region attachment: " + n + ")")
				}
				var e = new b.RegionAttachment(n);
				e.region = m;
				return e
			};
			f.prototype.newMeshAttachment = function(k, n, l) {
				var m = this.atlas.findRegion(l);
				if (m == null) {
					throw new Error("Region not found in atlas: " + l + " (mesh attachment: " + n + ")")
				}
				var e = new b.MeshAttachment(n);
				e.region = m;
				return e
			};
			f.prototype.newBoundingBoxAttachment = function(e, h) {
				return new b.BoundingBoxAttachment(h)
			};
			f.prototype.newPathAttachment = function(e, h) {
				return new b.PathAttachment(h)
			};
			return f
		}());
		b.AtlasAttachmentLoader = a
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a = (function() {
			function e(h) {
				if (h == null) {
					throw new Error("name cannot be null.")
				}
				this.name = h
			}
			return e
		}());
		b.Attachment = a;
		var f = (function(e) {
			__extends(h, e);

			function h(j) {
				var g = e.call(this, j) || this;
				g.worldVerticesLength = 0;
				return g
			}
			h.prototype.computeWorldVertices = function(g, j) {
				this.computeWorldVerticesWith(g, 0, this.worldVerticesLength, j, 0)
			};
			h.prototype.computeWorldVerticesWith = function(ap, am, ae, ab, al) {
				ae += al;
				var ao = ap.bone.skeleton;
				var an = ap.attachmentVertices;
				var ai = this.vertices;
				var y = this.bones;
				if (y == null) {
					if (an.length > 0) {
						ai = an
					}
					var ak = ap.bone;
					var V = ak.matrix;
					var aa = V.tx;
					var ac = V.ty;
					var i = V.a,
						n = V.c,
						v = V.b,
						w = V.d;
					for (var ag = am, U = al; U < ae; ag += 2, U += 2) {
						var Y = ai[ag],
							ad = ai[ag + 1];
						ab[U] = Y * i + ad * n + aa;
						ab[U + 1] = Y * v + ad * w + ac
					}
					return
				}
				var aj = 0,
					W = 0;
				for (var T = 0; T < am; T += 2) {
					var X = y[aj];
					aj += X + 1;
					W += X
				}
				var af = ao.bones;
				if (an.length == 0) {
					for (var U = al, n = W * 3; U < ae; U += 2) {
						var g = 0,
							m = 0;
						var X = y[aj++];
						X += aj;
						for (; aj < X; aj++, n += 3) {
							var ak = af[y[aj]];
							var V = ak.matrix;
							var Y = ai[n],
								ad = ai[n + 1],
								ah = ai[n + 2];
							g += (Y * V.a + ad * V.c + V.tx) * ah;
							m += (Y * V.b + ad * V.d + V.ty) * ah
						}
						ab[U] = g;
						ab[U + 1] = m
					}
				} else {
					var Z = an;
					for (var U = al, n = W * 3, x = W << 1; U < ae; U += 2) {
						var g = 0,
							m = 0;
						var X = y[aj++];
						X += aj;
						for (; aj < X; aj++, n += 3, x += 2) {
							var ak = af[y[aj]];
							var V = ak.matrix;
							var Y = ai[n] + Z[x],
								ad = ai[n + 1] + Z[x + 1],
								ah = ai[n + 2];
							g += (Y * V.a + ad * V.c + V.tx) * ah;
							m += (Y * V.b + ad * V.d + V.ty) * ah
						}
						ab[U] = g;
						ab[U + 1] = m
					}
				}
			};
			h.prototype.applyDeform = function(g) {
				return this == g
			};
			return h
		}(a));
		b.VertexAttachment = f
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a;
		(function(f) {
			f[f.Region = 0] = "Region";
			f[f.BoundingBox = 1] = "BoundingBox";
			f[f.Mesh = 2] = "Mesh";
			f[f.LinkedMesh = 3] = "LinkedMesh";
			f[f.Path = 4] = "Path"
		})(a = b.AttachmentType || (b.AttachmentType = {}))
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a = (function(g) {
			__extends(h, g);

			function h(f) {
				var e = g.call(this, f) || this;
				e.color = new b.Color(1, 1, 1, 1);
				return e
			}
			return h
		}(b.VertexAttachment));
		b.BoundingBoxAttachment = a
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a = (function(g) {
			__extends(h, g);

			function h(f) {
				var e = g.call(this, f) || this;
				e.color = new b.Color(1, 1, 1, 1);
				e.inheritDeform = false;
				e.tempColor = new b.Color(0, 0, 0, 0);
				return e
			}
			h.prototype.updateWorldVertices = function(e, f) {
				return []
			};
			h.prototype.updateUVs = function(F, y) {
				var r = this.regionUVs;
				var C = r.length;
				if (!y || y.length != C) {
					y = b.Utils.newFloatArray(C)
				}
				if (F == null) {
					return
				}
				var e = F.texture;
				var D = e._uvs;
				var u = F.width,
					H = F.height,
					v = F.originalWidth,
					i = F.originalHeight;
				var E = F.offsetX,
					G = F.pixiOffsetY;
				for (var x = 0; x < C; x += 2) {
					var f = this.regionUVs[x],
						n = this.regionUVs[x + 1];
					f = (f * v - E) / u;
					n = (n * i - G) / H;
					y[x] = (D.x0 * (1 - f) + D.x1 * f) * (1 - n) + (D.x3 * (1 - f) + D.x2 * f) * n;
					y[x + 1] = (D.y0 * (1 - f) + D.y1 * f) * (1 - n) + (D.y3 * (1 - f) + D.y2 * f) * n
				}
				return y
			};
			h.prototype.applyDeform = function(e) {
				return this == e || (this.inheritDeform && this.parentMesh == e)
			};
			h.prototype.getParentMesh = function() {
				return this.parentMesh
			};
			h.prototype.setParentMesh = function(e) {
				this.parentMesh = e;
				if (e != null) {
					this.bones = e.bones;
					this.vertices = e.vertices;
					this.regionUVs = e.regionUVs;
					this.triangles = e.triangles;
					this.hullLength = e.hullLength;
					this.worldVerticesLength = e.worldVerticesLength
				}
			};
			return h
		}(b.VertexAttachment));
		b.MeshAttachment = a
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(a) {
		var b = (function(g) {
			__extends(h, g);

			function h(f) {
				var e = g.call(this, f) || this;
				e.closed = false;
				e.constantSpeed = false;
				e.color = new a.Color(1, 1, 1, 1);
				return e
			}
			return h
		}(a.VertexAttachment));
		a.PathAttachment = b
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(a) {
		var b = (function(g) {
			__extends(h, g);

			function h(f) {
				var e = g.call(this, f) || this;
				e.x = 0;
				e.y = 0;
				e.scaleX = 1;
				e.scaleY = 1;
				e.rotation = 0;
				e.width = 0;
				e.height = 0;
				e.color = new a.Color(1, 1, 1, 1);
				return e
			}
			h.prototype.updateWorldVertices = function(e, f) {
				return []
			};
			return h
		}(a.Attachment));
		a.RegionAttachment = b
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a;
		(function(f) {
			f[f.Normal = 0] = "Normal";
			f[f.Additive = 1] = "Additive";
			f[f.Multiply = 2] = "Multiply";
			f[f.Screen = 3] = "Screen"
		})(a = b.BlendMode || (b.BlendMode = {}))
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a = (function() {
			function f(i, e, j) {
				this.matrix = new PIXI.Matrix();
				this.children = new Array();
				this.x = 0;
				this.y = 0;
				this.rotation = 0;
				this.scaleX = 0;
				this.scaleY = 0;
				this.shearX = 0;
				this.shearY = 0;
				this.ax = 0;
				this.ay = 0;
				this.arotation = 0;
				this.ascaleX = 0;
				this.ascaleY = 0;
				this.ashearX = 0;
				this.ashearY = 0;
				this.appliedValid = false;
				this.sorted = false;
				if (i == null) {
					throw new Error("data cannot be null.")
				}
				if (e == null) {
					throw new Error("skeleton cannot be null.")
				}
				this.data = i;
				this.skeleton = e;
				this.parent = j;
				this.setToSetupPose()
			}
			Object.defineProperty(f.prototype, "worldX", {
				get: function() {
					return this.matrix.tx
				},
				enumerable: true,
				configurable: true
			});
			Object.defineProperty(f.prototype, "worldY", {
				get: function() {
					return this.matrix.ty
				},
				enumerable: true,
				configurable: true
			});
			f.prototype.update = function() {
				this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY)
			};
			f.prototype.updateWorldTransform = function() {
				this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY)
			};
			f.prototype.updateWorldTransformWith = function(x, S, Q, s, y, m, r) {
				this.ax = x;
				this.ay = S;
				this.arotation = Q;
				this.ascaleX = s;
				this.ascaleY = y;
				this.ashearX = m;
				this.ashearY = r;
				this.appliedValid = true;
				var U = this.parent;
				var T = this.matrix;
				if (U == null) {
					var ac = Q + 90 + r;
					var O = b.MathUtils.cosDeg(Q + m) * s;
					var R = b.MathUtils.cosDeg(ac) * y;
					var W = b.MathUtils.sinDeg(Q + m) * s;
					var X = b.MathUtils.sinDeg(ac) * y;
					var ag = this.skeleton;
					if (ag.flipX) {
						x = -x;
						O = -O;
						R = -R
					}
					if (ag.flipY !== f.yDown) {
						S = -S;
						W = -W;
						X = -X
					}
					T.a = O;
					T.c = R;
					T.b = W;
					T.d = X;
					T.tx = x + ag.x;
					T.ty = S + ag.y;
					return
				}
				var ai = U.matrix.a,
					aj = U.matrix.c,
					ak = U.matrix.b,
					e = U.matrix.d;
				T.tx = ai * x + aj * S + U.matrix.tx;
				T.ty = ak * x + e * S + U.matrix.ty;
				switch (this.data.transformMode) {
					case b.TransformMode.Normal:
						var ac = Q + 90 + r;
						var O = b.MathUtils.cosDeg(Q + m) * s;
						var R = b.MathUtils.cosDeg(ac) * y;
						var W = b.MathUtils.sinDeg(Q + m) * s;
						var X = b.MathUtils.sinDeg(ac) * y;
						T.a = ai * O + aj * W;
						T.c = ai * R + aj * X;
						T.b = ak * O + e * W;
						T.d = ak * R + e * X;
						return;
					case b.TransformMode.OnlyTranslation:
						var ac = Q + 90 + r;
						T.a = b.MathUtils.cosDeg(Q + m) * s;
						T.c = b.MathUtils.cosDeg(ac) * y;
						T.b = b.MathUtils.sinDeg(Q + m) * s;
						T.d = b.MathUtils.sinDeg(ac) * y;
						break;
					case b.TransformMode.NoRotationOrReflection:
						var aa = ai * ai + ak * ak;
						var af = 0;
						if (aa > 0.0001) {
							aa = Math.abs(ai * e - aj * ak) / aa;
							aj = ak * aa;
							e = ai * aa;
							af = Math.atan2(ak, ai) * b.MathUtils.radDeg
						} else {
							ai = 0;
							ak = 0;
							af = 90 - Math.atan2(e, aj) * b.MathUtils.radDeg
						}
						var ad = Q + m - af;
						var ae = Q + r - af + 90;
						var O = b.MathUtils.cosDeg(ad) * s;
						var R = b.MathUtils.cosDeg(ae) * y;
						var W = b.MathUtils.sinDeg(ad) * s;
						var X = b.MathUtils.sinDeg(ae) * y;
						T.a = ai * O - aj * W;
						T.c = ai * R - aj * X;
						T.b = ak * O + e * W;
						T.d = ak * R + e * X;
						break;
					case b.TransformMode.NoScale:
					case b.TransformMode.NoScaleOrReflection:
						var ah = b.MathUtils.cosDeg(Q);
						var al = b.MathUtils.sinDeg(Q);
						var ab = ai * ah + aj * al;
						var V = ak * ah + e * al;
						var aa = Math.sqrt(ab * ab + V * V);
						if (aa > 0.00001) {
							aa = 1 / aa
						}
						ab *= aa;
						V *= aa;
						aa = Math.sqrt(ab * ab + V * V);
						var Y = Math.PI / 2 + Math.atan2(V, ab);
						var P = Math.cos(Y) * aa;
						var Z = Math.sin(Y) * aa;
						var O = b.MathUtils.cosDeg(m) * s;
						var R = b.MathUtils.cosDeg(90 + r) * y;
						var W = b.MathUtils.sinDeg(m) * s;
						var X = b.MathUtils.sinDeg(90 + r) * y;
						T.a = ab * O + P * W;
						T.c = ab * R + P * X;
						T.b = V * O + Z * W;
						T.d = V * R + Z * X;
						if (this.data.transformMode != b.TransformMode.NoScaleOrReflection ? ai * e - aj * ak < 0 : ((this.skeleton.flipX != this.skeleton.flipY) != f.yDown)) {
							T.c = -T.c;
							T.d = -T.d
						}
						return
				}
				if (this.skeleton.flipX) {
					T.a = -T.a;
					T.c = -T.c
				}
				if (this.skeleton.flipY != f.yDown) {
					T.b = -T.b;
					T.d = -T.d
				}
			};
			f.prototype.setToSetupPose = function() {
				var e = this.data;
				this.x = e.x;
				this.y = e.y;
				this.rotation = e.rotation;
				this.scaleX = e.scaleX;
				this.scaleY = e.scaleY;
				this.shearX = e.shearX;
				this.shearY = e.shearY
			};
			f.prototype.getWorldRotationX = function() {
				return Math.atan2(this.matrix.b, this.matrix.a) * b.MathUtils.radDeg
			};
			f.prototype.getWorldRotationY = function() {
				return Math.atan2(this.matrix.d, this.matrix.c) * b.MathUtils.radDeg
			};
			f.prototype.getWorldScaleX = function() {
				var e = this.matrix;
				return Math.sqrt(e.a * e.a + e.c * e.c)
			};
			f.prototype.getWorldScaleY = function() {
				var e = this.matrix;
				return Math.sqrt(e.b * e.b + e.d * e.d)
			};
			f.prototype.worldToLocalRotationX = function() {
				var e = this.parent;
				if (e == null) {
					return this.arotation
				}
				var i = e.matrix,
					j = this.matrix;
				return Math.atan2(i.a * j.b - i.b * j.a, i.d * j.a - i.c * j.b) * b.MathUtils.radDeg
			};
			f.prototype.worldToLocalRotationY = function() {
				var e = this.parent;
				if (e == null) {
					return this.arotation
				}
				var i = e.matrix,
					j = this.matrix;
				return Math.atan2(i.a * j.d - i.b * j.c, i.d * j.c - i.c * j.d) * b.MathUtils.radDeg
			};
			f.prototype.rotateWorld = function(e) {
				var r = this.matrix;
				var q = this.matrix.a,
					s = r.c,
					t = r.b,
					m = r.d;
				var o = b.MathUtils.cosDeg(e),
					p = b.MathUtils.sinDeg(e);
				r.a = o * q - p * t;
				r.c = o * s - p * m;
				r.b = p * q + o * t;
				r.d = p * s + o * m;
				this.appliedValid = false
			};
			f.prototype.updateAppliedTransform = function() {
				this.appliedValid = true;
				var e = this.parent;
				var x = this.matrix;
				if (e == null) {
					this.ax = x.tx;
					this.ay = x.ty;
					this.arotation = Math.atan2(x.b, x.a) * b.MathUtils.radDeg;
					this.ascaleX = Math.sqrt(x.a * x.a + x.b * x.b);
					this.ascaleY = Math.sqrt(x.c * x.c + x.d * x.d);
					this.ashearX = 0;
					this.ashearY = Math.atan2(x.a * x.c + x.b * x.d, x.a * x.d - x.b * x.c) * b.MathUtils.radDeg;
					return
				}
				var w = e.matrix;
				var v = 1 / (w.a * w.d - w.b * w.c);
				var F = x.tx - w.tx,
					H = x.ty - w.ty;
				this.ax = (F * w.d * v - H * w.c * v);
				this.ay = (H * w.a * v - F * w.b * v);
				var y = v * w.d;
				var B = v * w.a;
				var z = v * w.c;
				var A = v * w.b;
				var C = y * x.a - z * x.b;
				var D = y * x.c - z * x.d;
				var E = B * x.b - A * x.a;
				var G = B * x.d - A * x.c;
				this.ashearX = 0;
				this.ascaleX = Math.sqrt(C * C + E * E);
				if (this.ascaleX > 0.0001) {
					var m = C * G - D * E;
					this.ascaleY = m / this.ascaleX;
					this.ashearY = Math.atan2(C * D + E * G, m) * b.MathUtils.radDeg;
					this.arotation = Math.atan2(E, C) * b.MathUtils.radDeg
				} else {
					this.ascaleX = 0;
					this.ascaleY = Math.sqrt(D * D + G * G);
					this.ashearY = 0;
					this.arotation = 90 - Math.atan2(G, D) * b.MathUtils.radDeg
				}
			};
			f.prototype.worldToLocal = function(t) {
				var v = this.matrix;
				var m = v.a,
					p = v.c,
					r = v.b,
					s = v.d;
				var u = 1 / (m * s - p * r);
				var e = t.x - v.tx,
					q = t.y - v.ty;
				t.x = (e * s * u - q * p * u);
				t.y = (q * m * u - e * r * u);
				return t
			};
			f.prototype.localToWorld = function(j) {
				var k = this.matrix;
				var l = j.x,
					e = j.y;
				j.x = l * k.a + e * k.c + k.tx;
				j.y = l * k.b + e * k.d + k.ty;
				return j
			};
			return f
		}());
		a.yDown = false;
		b.Bone = a
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(f) {
		var a = (function() {
			function e(k, l, j) {
				this.x = 0;
				this.y = 0;
				this.rotation = 0;
				this.scaleX = 1;
				this.scaleY = 1;
				this.shearX = 0;
				this.shearY = 0;
				this.transformMode = b.Normal;
				if (k < 0) {
					throw new Error("index must be >= 0.")
				}
				if (l == null) {
					throw new Error("name cannot be null.")
				}
				this.index = k;
				this.name = l;
				this.parent = j
			}
			return e
		}());
		f.BoneData = a;
		var b;
		(function(e) {
			e[e.Normal = 0] = "Normal";
			e[e.OnlyTranslation = 1] = "OnlyTranslation";
			e[e.NoRotationOrReflection = 2] = "NoRotationOrReflection";
			e[e.NoScale = 3] = "NoScale";
			e[e.NoScaleOrReflection = 4] = "NoScaleOrReflection"
		})(b = f.TransformMode || (f.TransformMode = {}))
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(a) {
		var b = (function() {
			function f(e, h) {
				if (h == null) {
					throw new Error("data cannot be null.")
				}
				this.time = e;
				this.data = h
			}
			return f
		}());
		a.Event = b
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a = (function() {
			function f(e) {
				this.name = e
			}
			return f
		}());
		b.EventData = a
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(a) {
		var b = (function() {
			function f(i, e) {
				this.mix = 1;
				this.bendDirection = 0;
				this.level = 0;
				if (i == null) {
					throw new Error("data cannot be null.")
				}
				if (e == null) {
					throw new Error("skeleton cannot be null.")
				}
				this.data = i;
				this.mix = i.mix;
				this.bendDirection = i.bendDirection;
				this.bones = new Array();
				for (var j = 0; j < i.bones.length; j++) {
					this.bones.push(e.findBone(i.bones[j].name))
				}
				this.target = e.findBone(i.target.name)
			}
			f.prototype.getOrder = function() {
				return this.data.order
			};
			f.prototype.apply = function() {
				this.update()
			};
			f.prototype.update = function() {
				var e = this.target;
				var h = this.bones;
				switch (h.length) {
					case 1:
						this.apply1(h[0], e.worldX, e.worldY, this.mix);
						break;
					case 2:
						this.apply2(h[0], h[1], e.worldX, e.worldY, this.bendDirection, this.mix);
						break
				}
			};
			f.prototype.apply1 = function(e, r, t, w) {
				if (!e.appliedValid) {
					e.updateAppliedTransform()
				}
				var y = e.parent.matrix;
				var z = 1 / (y.a * y.d - y.b * y.c);
				var q = r - y.tx,
					s = t - y.ty;
				var u = (q * y.d - s * y.c) * z - e.ax,
					v = (s * y.a - q * y.b) * z - e.ay;
				var x = Math.atan2(v, u) * a.MathUtils.radDeg - e.ashearX - e.arotation;
				if (e.ascaleX < 0) {
					x += 180
				}
				if (x > 180) {
					x -= 360
				} else {
					if (x < -180) {
						x += 360
					}
				}
				e.updateWorldTransformWith(e.ax, e.ay, e.arotation + x * w, e.ascaleX, e.ascaleY, e.ashearX, e.ashearY)
			};
			f.prototype.apply2 = function(a3, bc, aA, aG, aC, aT) {
				if (aT == 0) {
					bc.updateWorldTransform();
					return
				}
				if (!a3.appliedValid) {
					a3.updateAppliedTransform()
				}
				if (!bc.appliedValid) {
					bc.updateAppliedTransform()
				}
				var a8 = a3.ax,
					a9 = a3.ay,
					a4 = a3.ascaleX,
					a6 = a3.ascaleY,
					u = bc.ascaleX;
				var bf = 0,
					bi = 0,
					aL = 0;
				if (a4 < 0) {
					a4 = -a4;
					bf = 180;
					aL = -1
				} else {
					bf = 0;
					aL = 1
				}
				if (a6 < 0) {
					a6 = -a6;
					aL = -aL
				}
				if (u < 0) {
					u = -u;
					bi = 180
				} else {
					bi = 0
				}
				var aV = a3.matrix;
				var aB = bc.ax,
					aH = 0,
					az = 0,
					aD = 0,
					ay = aV.a,
					aF = aV.c,
					aJ = aV.b,
					aN = aV.d;
				var e = Math.abs(a4 - a6) <= 0.0001;
				if (!e) {
					aH = 0;
					az = ay * aB + aV.tx;
					aD = aJ * aB + aV.ty
				} else {
					aH = bc.ay;
					az = ay * aB + aF * aH + aV.tx;
					aD = aJ * aB + aN * aH + aV.ty
				}
				var a1 = a3.parent;
				var aP = a3.parent.matrix;
				ay = aP.a;
				aF = aP.c;
				aJ = aP.b;
				aN = aP.d;
				var at = 1 / (ay * aN - aF * aJ),
					x = aA - aP.tx,
					y = aG - aP.ty;
				var aO = (x * aN - y * aF) * at - a8,
					aR = (y * ay - x * aJ) * at - a9;
				x = az - aP.tx;
				y = aD - aP.ty;
				var be = (x * aN - y * aF) * at - a8,
					bh = (y * ay - x * aJ) * at - a9;
				var a5 = Math.sqrt(be * be + bh * bh),
					a7 = bc.data.length * u,
					aX = 0,
					aZ = 0;
				outer: if (e) {
					a7 *= a4;
					var bg = (aO * aO + aR * aR - a5 * a5 - a7 * a7) / (2 * a5 * a7);
					if (bg < -1) {
						bg = -1
					} else {
						if (bg > 1) {
							bg = 1
						}
					}
					aZ = Math.acos(bg) * aC;
					ay = a5 + a7 * bg;
					aF = a7 * Math.sin(aZ);
					aX = Math.atan2(aR * ay - aO * aF, aO * ay + aR * aF)
				} else {
					ay = a4 * a7;
					aF = a6 * a7;
					var aQ = ay * ay,
						ax = aF * aF,
						aS = aO * aO + aR * aR,
						bd = Math.atan2(aR, aO);
					aJ = ax * a5 * a5 + aQ * aS - aQ * ax;
					var ba = -2 * ax * a5,
						bb = ax - aQ;
					aN = ba * ba - 4 * bb * aJ;
					if (aN >= 0) {
						var a0 = Math.sqrt(aN);
						if (ba < 0) {
							a0 = -a0
						}
						a0 = -(ba + a0) / 2;
						var aW = a0 / bb,
							aY = aJ / a0;
						var a2 = Math.abs(aW) < Math.abs(aY) ? aW : aY;
						if (a2 * a2 <= aS) {
							y = Math.sqrt(aS - a2 * a2) * aC;
							aX = bd - Math.atan2(y, a2);
							aZ = Math.atan2(y / a6, (a2 - a5) / a4);
							break outer
						}
					}
					var ar = 0,
						aM = Number.MAX_VALUE,
						q = 0,
						r = 0;
					var aU = 0,
						aw = 0,
						aE = 0,
						aI = 0;
					x = a5 + ay;
					aN = x * x;
					if (aN > aw) {
						aU = 0;
						aw = aN;
						aE = x
					}
					x = a5 - ay;
					aN = x * x;
					if (aN < aM) {
						ar = a.MathUtils.PI;
						aM = aN;
						q = x
					}
					var aK = Math.acos(-ay * a5 / (aQ - ax));
					x = ay * Math.cos(aK) + a5;
					y = aF * Math.sin(aK);
					aN = x * x + y * y;
					if (aN < aM) {
						ar = aK;
						aM = aN;
						q = x;
						r = y
					}
					if (aN > aw) {
						aU = aK;
						aw = aN;
						aE = x;
						aI = y
					}
					if (aS <= (aM + aw) / 2) {
						aX = bd - Math.atan2(r * aC, q);
						aZ = ar * aC
					} else {
						aX = bd - Math.atan2(aI * aC, aE);
						aZ = aU * aC
					}
				}
				var av = Math.atan2(aH, aB) * aL;
				var au = a3.arotation;
				aX = (aX - av) * a.MathUtils.radDeg + bf - au;
				if (aX > 180) {
					aX -= 360
				} else {
					if (aX < -180) {
						aX += 360
					}
				}
				a3.updateWorldTransformWith(a8, a9, au + aX * aT, a3.ascaleX, a3.ascaleY, 0, 0);
				au = bc.arotation;
				aZ = ((aZ + av) * a.MathUtils.radDeg - bc.ashearX) * aL + bi - au;
				if (aZ > 180) {
					aZ -= 360
				} else {
					if (aZ < -180) {
						aZ += 360
					}
				}
				bc.updateWorldTransformWith(aB, aH, au + aZ * aT, bc.ascaleX, bc.ascaleY, bc.ashearX, bc.ashearY)
			};
			return f
		}());
		a.IkConstraint = b
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a = (function() {
			function f(e) {
				this.order = 0;
				this.bones = new Array();
				this.bendDirection = 1;
				this.mix = 1;
				this.name = e
			}
			return f
		}());
		b.IkConstraintData = a
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a = (function() {
			function f(k, i) {
				this.position = 0;
				this.spacing = 0;
				this.rotateMix = 0;
				this.translateMix = 0;
				this.spaces = new Array();
				this.positions = new Array();
				this.world = new Array();
				this.curves = new Array();
				this.lengths = new Array();
				this.segments = new Array();
				if (k == null) {
					throw new Error("data cannot be null.")
				}
				if (i == null) {
					throw new Error("skeleton cannot be null.")
				}
				this.data = k;
				this.bones = new Array();
				for (var l = 0, e = k.bones.length; l < e; l++) {
					this.bones.push(i.findBone(k.bones[l].name))
				}
				this.target = i.findSlot(k.target.name);
				this.position = k.position;
				this.spacing = k.spacing;
				this.rotateMix = k.rotateMix;
				this.translateMix = k.translateMix
			}
			f.prototype.apply = function() {
				this.update()
			};
			f.prototype.update = function() {
				var ao = this.target.getAttachment();
				if (!(ao instanceof b.PathAttachment)) {
					return
				}
				var r = this.rotateMix,
					n = this.translateMix;
				var aJ = n > 0,
					i = r > 0;
				if (!aJ && !i) {
					return
				}
				var az = this.data;
				var an = az.spacingMode;
				var aK = an == b.SpacingMode.Length;
				var al = az.rotateMode;
				var am = al == b.RotateMode.Tangent,
					ak = al == b.RotateMode.ChainScale;
				var aq = this.bones.length,
					aj = am ? aq : aq + 1;
				var y = this.bones;
				var p = b.Utils.setArraySize(this.spaces, aj),
					aM = null;
				var aL = this.spacing;
				if (ak || aK) {
					if (ak) {
						aM = b.Utils.setArraySize(this.lengths, aq)
					}
					for (var m = 0, x = aj - 1; m < x;) {
						var ap = y[m];
						var s = ap.matrix;
						var ar = ap.data.length,
							ah = ar * s.a,
							ai = ar * s.b;
						ar = Math.sqrt(ah * ah + ai * ai);
						if (ak) {
							aM[m] = ar
						}
						p[++m] = aK ? Math.max(0, ar + aL) : aL
					}
				} else {
					for (var m = 1; m < aj; m++) {
						p[m] = aL
					}
				}
				var aA = this.computeWorldPositions(ao, aj, am, az.positionMode == b.PositionMode.Percent, an == b.SpacingMode.Percent);
				var aC = aA[0],
					aE = aA[1],
					aF = az.offsetRotation;
				var aD = false;
				if (aF == 0) {
					aD = al == b.RotateMode.Chain
				} else {
					aD = false;
					var ay = this.target.bone.matrix;
					aF *= ay.a * ay.d - ay.b * ay.c > 0 ? b.MathUtils.degRad : -b.MathUtils.degRad
				}
				for (var m = 0, ae = 3; m < aq; m++, ae += 3) {
					var ap = y[m];
					var s = ap.matrix;
					s.tx += (aC - s.tx) * n;
					s.ty += (aE - s.ty) * n;
					var ah = aA[ae],
						ai = aA[ae + 1],
						aG = ah - aC,
						aI = ai - aE;
					if (ak) {
						var au = aM[m];
						if (au != 0) {
							var ag = (Math.sqrt(aG * aG + aI * aI) / au - 1) * r + 1;
							s.a *= ag;
							s.b *= ag
						}
					}
					aC = ah;
					aE = ai;
					if (i) {
						var at = s.a,
							aw = s.c,
							ax = s.b,
							e = s.d,
							af = 0,
							aH = 0,
							aB = 0;
						if (am) {
							af = aA[ae - 1]
						} else {
							if (p[m + 1] == 0) {
								af = aA[ae + 2]
							} else {
								af = Math.atan2(aI, aG)
							}
						}
						af -= Math.atan2(ax, at);
						if (aD) {
							aH = Math.cos(af);
							aB = Math.sin(af);
							var av = ap.data.length;
							aC += (av * (aH * at - aB * ax) - aG) * r;
							aE += (av * (aB * at + aH * ax) - aI) * r
						} else {
							af += aF
						}
						if (af > b.MathUtils.PI) {
							af -= b.MathUtils.PI2
						} else {
							if (af < -b.MathUtils.PI) {
								af += b.MathUtils.PI2
							}
						}
						af *= r;
						aH = Math.cos(af);
						aB = Math.sin(af);
						s.a = aH * at - aB * ax;
						s.c = aH * aw - aB * e;
						s.b = aB * at + aH * ax;
						s.d = aB * aw + aH * e
					}
					ap.appliedValid = false
				}
			};
			f.prototype.computeWorldPositions = function(ak, aq, av, aT, aV) {
				var aW = this.target;
				var ao = this.position;
				var p = this.spaces,
					an = b.Utils.setArraySize(this.positions, aq * 3 + 2),
					aE = null;
				var am = ak.closed;
				var aB = ak.worldVerticesLength,
					aH = aB / 6,
					ar = f.NONE;
				if (!ak.constantSpeed) {
					var aU = ak.lengths;
					aH -= am ? 1 : 2;
					var aD = aU[aH];
					if (aT) {
						ao *= aD
					}
					if (aV) {
						for (var o = 0; o < aq; o++) {
							p[o] *= aD
						}
					}
					aE = b.Utils.setArraySize(this.world, 8);
					for (var o = 0, ai = 0, aQ = 0; o < aq; o++, ai += 3) {
						var i = p[o];
						ao += i;
						var aj = ao;
						if (am) {
							aj %= aD;
							if (aj < 0) {
								aj += aD
							}
							aQ = 0
						} else {
							if (aj < 0) {
								if (ar != f.BEFORE) {
									ar = f.BEFORE;
									ak.computeWorldVerticesWith(aW, 2, 4, aE, 0)
								}
								this.addBeforePosition(aj, aE, 0, an, ai);
								continue
							} else {
								if (aj > aD) {
									if (ar != f.AFTER) {
										ar = f.AFTER;
										ak.computeWorldVerticesWith(aW, aB - 6, 4, aE, 0)
									}
									this.addAfterPosition(aj - aD, aE, 0, an, ai);
									continue
								}
							}
						}
						for (;; aQ++) {
							var aK = aU[aQ];
							if (aj > aK) {
								continue
							}
							if (aQ == 0) {
								aj /= aK
							} else {
								var au = aU[aQ - 1];
								aj = (aj - au) / (aK - au)
							}
							break
						}
						if (aQ != ar) {
							ar = aQ;
							if (am && aQ == aH) {
								ak.computeWorldVerticesWith(aW, aB - 4, 4, aE, 0);
								ak.computeWorldVerticesWith(aW, 0, 4, aE, 4)
							} else {
								ak.computeWorldVerticesWith(aW, aQ * 6 + 2, 8, aE, 0)
							}
						}
						this.addCurvePosition(aj, aE[0], aE[1], aE[2], aE[3], aE[4], aE[5], aE[6], aE[7], an, ai, av || (o > 0 && i == 0))
					}
					return an
				}
				if (am) {
					aB += 2;
					aE = b.Utils.setArraySize(this.world, aB);
					ak.computeWorldVerticesWith(aW, 2, aB - 4, aE, 0);
					ak.computeWorldVerticesWith(aW, 0, 2, aE, aB - 4);
					aE[aB - 2] = aE[0];
					aE[aB - 1] = aE[1]
				} else {
					aH--;
					aB -= 4;
					aE = b.Utils.setArraySize(this.world, aB);
					ak.computeWorldVerticesWith(aW, 2, aB, aE, 0)
				}
				var aS = b.Utils.setArraySize(this.curves, aH);
				var al = 0;
				var aI = aE[0],
					ay = aE[1],
					af = 0,
					aA = 0,
					ah = 0,
					aC = 0,
					aJ = 0,
					az = 0;
				var aO = 0,
					aP = 0,
					aw = 0,
					ax = 0,
					aF = 0,
					e = 0,
					w = 0,
					ag = 0;
				for (var o = 0, ap = 2; o < aH; o++, ap += 6) {
					af = aE[ap];
					aA = aE[ap + 1];
					ah = aE[ap + 2];
					aC = aE[ap + 3];
					aJ = aE[ap + 4];
					az = aE[ap + 5];
					aO = (aI - af * 2 + ah) * 0.1875;
					aP = (ay - aA * 2 + aC) * 0.1875;
					aw = ((af - ah) * 3 - aI + aJ) * 0.09375;
					ax = ((aA - aC) * 3 - ay + az) * 0.09375;
					aF = aO * 2 + aw;
					e = aP * 2 + ax;
					w = (af - aI) * 0.75 + aO + aw * 0.16666667;
					ag = (aA - ay) * 0.75 + aP + ax * 0.16666667;
					al += Math.sqrt(w * w + ag * ag);
					w += aF;
					ag += e;
					aF += aw;
					e += ax;
					al += Math.sqrt(w * w + ag * ag);
					w += aF;
					ag += e;
					al += Math.sqrt(w * w + ag * ag);
					w += aF + aw;
					ag += e + ax;
					al += Math.sqrt(w * w + ag * ag);
					aS[o] = al;
					aI = aJ;
					ay = az
				}
				if (aT) {
					ao *= al
				}
				if (aV) {
					for (var o = 0; o < aq; o++) {
						p[o] *= al
					}
				}
				var aN = this.segments;
				var aG = 0;
				for (var o = 0, ai = 0, aQ = 0, aR = 0; o < aq; o++, ai += 3) {
					var i = p[o];
					ao += i;
					var aj = ao;
					if (am) {
						aj %= al;
						if (aj < 0) {
							aj += al
						}
						aQ = 0
					} else {
						if (aj < 0) {
							this.addBeforePosition(aj, aE, 0, an, ai);
							continue
						} else {
							if (aj > al) {
								this.addAfterPosition(aj - al, aE, aB - 4, an, ai);
								continue
							}
						}
					}
					for (;; aQ++) {
						var aL = aS[aQ];
						if (aj > aL) {
							continue
						}
						if (aQ == 0) {
							aj /= aL
						} else {
							var au = aS[aQ - 1];
							aj = (aj - au) / (aL - au)
						}
						break
					}
					if (aQ != ar) {
						ar = aQ;
						var at = aQ * 6;
						aI = aE[at];
						ay = aE[at + 1];
						af = aE[at + 2];
						aA = aE[at + 3];
						ah = aE[at + 4];
						aC = aE[at + 5];
						aJ = aE[at + 6];
						az = aE[at + 7];
						aO = (aI - af * 2 + ah) * 0.03;
						aP = (ay - aA * 2 + aC) * 0.03;
						aw = ((af - ah) * 3 - aI + aJ) * 0.006;
						ax = ((aA - aC) * 3 - ay + az) * 0.006;
						aF = aO * 2 + aw;
						e = aP * 2 + ax;
						w = (af - aI) * 0.3 + aO + aw * 0.16666667;
						ag = (aA - ay) * 0.3 + aP + ax * 0.16666667;
						aG = Math.sqrt(w * w + ag * ag);
						aN[0] = aG;
						for (at = 1; at < 8; at++) {
							w += aF;
							ag += e;
							aF += aw;
							e += ax;
							aG += Math.sqrt(w * w + ag * ag);
							aN[at] = aG
						}
						w += aF;
						ag += e;
						aG += Math.sqrt(w * w + ag * ag);
						aN[8] = aG;
						w += aF + aw;
						ag += e + ax;
						aG += Math.sqrt(w * w + ag * ag);
						aN[9] = aG;
						aR = 0
					}
					aj *= aG;
					for (;; aR++) {
						var aM = aN[aR];
						if (aj > aM) {
							continue
						}
						if (aR == 0) {
							aj /= aM
						} else {
							var au = aN[aR - 1];
							aj = aR + (aj - au) / (aM - au)
						}
						break
					}
					this.addCurvePosition(aj * 0.1, aI, ay, af, aA, ah, aC, aJ, az, an, ai, av || (o > 0 && i == 0))
				}
				return an
			};
			f.prototype.addBeforePosition = function(v, i, p, r, t) {
				var u = i[p],
					o = i[p + 1],
					x = i[p + 2] - u,
					e = i[p + 3] - o,
					w = Math.atan2(e, x);
				r[t] = u + v * Math.cos(w);
				r[t + 1] = o + v * Math.sin(w);
				r[t + 2] = w
			};
			f.prototype.addAfterPosition = function(v, i, p, r, t) {
				var u = i[p + 2],
					o = i[p + 3],
					x = u - i[p],
					e = o - i[p + 1],
					w = Math.atan2(e, x);
				r[t] = u + v * Math.cos(w);
				r[t + 1] = o + v * Math.sin(w);
				r[t + 2] = w
			};
			f.prototype.addCurvePosition = function(o, J, T, u, x, H, y, K, U, N, e, O) {
				if (o == 0 || isNaN(o)) {
					o = 0.0001
				}
				var X = o * o,
					S = X * o,
					L = 1 - o,
					R = L * L,
					W = R * L;
				var Q = L * o,
					V = Q * 3,
					I = L * V,
					p = V * o;
				var M = J * W + u * I + H * p + K * S,
					P = T * W + x * I + y * p + U * S;
				N[e] = M;
				N[e + 1] = P;
				if (O) {
					N[e + 2] = Math.atan2(P - (T * R + x * Q * 2 + y * X), M - (J * R + u * Q * 2 + H * X))
				}
			};
			f.prototype.getOrder = function() {
				return this.data.order
			};
			return f
		}());
		a.NONE = -1;
		a.BEFORE = -2;
		a.AFTER = -3;
		b.PathConstraint = a
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(j) {
		var a = (function() {
			function e(f) {
				this.order = 0;
				this.bones = new Array();
				this.name = f
			}
			return e
		}());
		j.PathConstraintData = a;
		var i;
		(function(e) {
			e[e.Fixed = 0] = "Fixed";
			e[e.Percent = 1] = "Percent"
		})(i = j.PositionMode || (j.PositionMode = {}));
		var b;
		(function(e) {
			e[e.Length = 0] = "Length";
			e[e.Fixed = 1] = "Fixed";
			e[e.Percent = 2] = "Percent"
		})(b = j.SpacingMode || (j.SpacingMode = {}));
		var h;
		(function(e) {
			e[e.Tangent = 0] = "Tangent";
			e[e.Chain = 1] = "Chain";
			e[e.ChainScale = 2] = "ChainScale"
		})(h = j.RotateMode || (j.RotateMode = {}))
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a = (function() {
			function f(t) {
				this._updateCache = new Array();
				this.updateCacheReset = new Array();
				this.time = 0;
				this.flipX = false;
				this.flipY = false;
				this.x = 0;
				this.y = 0;
				if (t == null) {
					throw new Error("data cannot be null.")
				}
				this.data = t;
				this.bones = new Array();
				for (var s = 0; s < t.bones.length; s++) {
					var v = t.bones[s];
					var e = void 0;
					if (v.parent == null) {
						e = new b.Bone(v, this, null)
					} else {
						var w = this.bones[v.parent.index];
						e = new b.Bone(v, this, w);
						w.children.push(e)
					}
					this.bones.push(e)
				}
				this.slots = new Array();
				this.drawOrder = new Array();
				for (var s = 0; s < t.slots.length; s++) {
					var q = t.slots[s];
					var e = this.bones[q.boneData.index];
					var i = new b.Slot(q, e);
					this.slots.push(i);
					this.drawOrder.push(i)
				}
				this.ikConstraints = new Array();
				for (var s = 0; s < t.ikConstraints.length; s++) {
					var x = t.ikConstraints[s];
					this.ikConstraints.push(new b.IkConstraint(x, this))
				}
				this.transformConstraints = new Array();
				for (var s = 0; s < t.transformConstraints.length; s++) {
					var r = t.transformConstraints[s];
					this.transformConstraints.push(new b.TransformConstraint(r, this))
				}
				this.pathConstraints = new Array();
				for (var s = 0; s < t.pathConstraints.length; s++) {
					var u = t.pathConstraints[s];
					this.pathConstraints.push(new b.PathConstraint(u, this))
				}
				this.color = new b.Color(1, 1, 1, 1);
				this.updateCache()
			}
			f.prototype.updateCache = function() {
				var D = this._updateCache;
				D.length = 0;
				this.updateCacheReset.length = 0;
				var v = this.bones;
				for (var i = 0, w = v.length; i < w; i++) {
					v[i].sorted = false
				}
				var C = this.ikConstraints;
				var n = this.transformConstraints;
				var A = this.pathConstraints;
				var B = C.length,
					u = n.length,
					x = A.length;
				var y = B + u + x;
				outer: for (var i = 0; i < y; i++) {
					for (var e = 0; e < B; e++) {
						var z = C[e];
						if (z.data.order == i) {
							this.sortIkConstraint(z);
							continue outer
						}
					}
					for (var e = 0; e < u; e++) {
						var z = n[e];
						if (z.data.order == i) {
							this.sortTransformConstraint(z);
							continue outer
						}
					}
					for (var e = 0; e < x; e++) {
						var z = A[e];
						if (z.data.order == i) {
							this.sortPathConstraint(z);
							continue outer
						}
					}
				}
				for (var i = 0, w = v.length; i < w; i++) {
					this.sortBone(v[i])
				}
			};
			f.prototype.sortIkConstraint = function(k) {
				var l = k.target;
				this.sortBone(l);
				var m = k.bones;
				var n = m[0];
				this.sortBone(n);
				if (m.length > 1) {
					var e = m[m.length - 1];
					if (!(this._updateCache.indexOf(e) > -1)) {
						this.updateCacheReset.push(e)
					}
				}
				this._updateCache.push(k);
				this.sortReset(n.children);
				m[m.length - 1].sorted = true
			};
			f.prototype.sortPathConstraint = function(v) {
				var p = v.target;
				var q = p.data.index;
				var u = p.bone;
				if (this.skin != null) {
					this.sortPathConstraintAttachment(this.skin, q, u)
				}
				if (this.data.defaultSkin != null && this.data.defaultSkin != this.skin) {
					this.sortPathConstraintAttachment(this.data.defaultSkin, q, u)
				}
				for (var o = 0, e = this.data.skins.length; o < e; o++) {
					this.sortPathConstraintAttachment(this.data.skins[o], q, u)
				}
				var r = p.getAttachment();
				if (r instanceof b.PathAttachment) {
					this.sortPathConstraintAttachmentWith(r, u)
				}
				var t = v.bones;
				var s = t.length;
				for (var o = 0; o < s; o++) {
					this.sortBone(t[o])
				}
				this._updateCache.push(v);
				for (var o = 0; o < s; o++) {
					this.sortReset(t[o].children)
				}
				for (var o = 0; o < s; o++) {
					t[o].sorted = true
				}
			};
			f.prototype.sortTransformConstraint = function(e) {
				this.sortBone(e.target);
				var j = e.bones;
				var k = j.length;
				for (var l = 0; l < k; l++) {
					this.sortBone(j[l])
				}
				this._updateCache.push(e);
				for (var l = 0; l < k; l++) {
					this.sortReset(j[l].children)
				}
				for (var l = 0; l < k; l++) {
					j[l].sorted = true
				}
			};
			f.prototype.sortPathConstraintAttachment = function(e, m, k) {
				var n = e.attachments[m];
				if (!n) {
					return
				}
				for (var l in n) {
					this.sortPathConstraintAttachmentWith(n[l], k)
				}
			};
			f.prototype.sortPathConstraintAttachmentWith = function(e, n) {
				if (!(e instanceof b.PathAttachment)) {
					return
				}
				var i = e.bones;
				if (i == null) {
					this.sortBone(n)
				} else {
					var s = this.bones;
					var q = 0;
					while (q < i.length) {
						var p = i[q++];
						for (var t = q + p; q < t; q++) {
							var r = i[q];
							this.sortBone(s[r])
						}
					}
				}
			};
			f.prototype.sortBone = function(e) {
				if (e.sorted) {
					return
				}
				var h = e.parent;
				if (h != null) {
					this.sortBone(h)
				}
				e.sorted = true;
				this._updateCache.push(e)
			};
			f.prototype.sortReset = function(l) {
				for (var k = 0, e = l.length; k < e; k++) {
					var i = l[k];
					if (i.sorted) {
						this.sortReset(i.children)
					}
					i.sorted = false
				}
			};
			f.prototype.updateWorldTransform = function() {
				var n = this.updateCacheReset;
				for (var m = 0, e = n.length; m < e; m++) {
					var i = n[m];
					i.ax = i.x;
					i.ay = i.y;
					i.arotation = i.rotation;
					i.ascaleX = i.scaleX;
					i.ascaleY = i.scaleY;
					i.ashearX = i.shearX;
					i.ashearY = i.shearY;
					i.appliedValid = true
				}
				var l = this._updateCache;
				for (var m = 0, e = l.length; m < e; m++) {
					l[m].update()
				}
			};
			f.prototype.setToSetupPose = function() {
				this.setBonesToSetupPose();
				this.setSlotsToSetupPose()
			};
			f.prototype.setBonesToSetupPose = function() {
				var s = this.bones;
				for (var p = 0, t = s.length; p < t; p++) {
					s[p].setToSetupPose()
				}
				var n = this.ikConstraints;
				for (var p = 0, t = n.length; p < t; p++) {
					var e = n[p];
					e.bendDirection = e.data.bendDirection;
					e.mix = e.data.mix
				}
				var r = this.transformConstraints;
				for (var p = 0, t = r.length; p < t; p++) {
					var e = r[p];
					var i = e.data;
					e.rotateMix = i.rotateMix;
					e.translateMix = i.translateMix;
					e.scaleMix = i.scaleMix;
					e.shearMix = i.shearMix
				}
				var q = this.pathConstraints;
				for (var p = 0, t = q.length; p < t; p++) {
					var e = q[p];
					var i = e.data;
					e.position = i.position;
					e.spacing = i.spacing;
					e.rotateMix = i.rotateMix;
					e.translateMix = i.translateMix
				}
			};
			f.prototype.setSlotsToSetupPose = function() {
				var i = this.slots;
				b.Utils.arrayCopy(i, 0, this.drawOrder, 0, i.length);
				for (var j = 0, e = i.length; j < e; j++) {
					i[j].setToSetupPose()
				}
			};
			f.prototype.getRootBone = function() {
				if (this.bones.length == 0) {
					return null
				}
				return this.bones[0]
			};
			f.prototype.findBone = function(l) {
				if (l == null) {
					throw new Error("boneName cannot be null.")
				}
				var n = this.bones;
				for (var m = 0, e = n.length; m < e; m++) {
					var i = n[m];
					if (i.data.name == l) {
						return i
					}
				}
				return null
			};
			f.prototype.findBoneIndex = function(i) {
				if (i == null) {
					throw new Error("boneName cannot be null.")
				}
				var l = this.bones;
				for (var k = 0, e = l.length; k < e; k++) {
					if (l[k].data.name == i) {
						return k
					}
				}
				return -1
			};
			f.prototype.findSlot = function(n) {
				if (n == null) {
					throw new Error("slotName cannot be null.")
				}
				var l = this.slots;
				for (var m = 0, e = l.length; m < e; m++) {
					var i = l[m];
					if (i.data.name == n) {
						return i
					}
				}
				return null
			};
			f.prototype.findSlotIndex = function(l) {
				if (l == null) {
					throw new Error("slotName cannot be null.")
				}
				var i = this.slots;
				for (var k = 0, e = i.length; k < e; k++) {
					if (i[k].data.name == l) {
						return k
					}
				}
				return -1
			};
			f.prototype.setSkinByName = function(h) {
				var e = this.data.findSkin(h);
				if (e == null) {
					throw new Error("Skin not found: " + h)
				}
				this.setSkin(e)
			};
			f.prototype.setSkin = function(o) {
				if (o != null) {
					if (this.skin != null) {
						o.attachAll(this, this.skin)
					} else {
						var p = this.slots;
						for (var q = 0, e = p.length; q < e; q++) {
							var i = p[q];
							var r = i.data.attachmentName;
							if (r != null) {
								var n = o.getAttachment(q, r);
								if (n != null) {
									i.setAttachment(n)
								}
							}
						}
					}
				}
				this.skin = o
			};
			f.prototype.getAttachmentByName = function(e, h) {
				return this.getAttachment(this.data.findSlotIndex(e), h)
			};
			f.prototype.getAttachment = function(i, j) {
				if (j == null) {
					throw new Error("attachmentName cannot be null.")
				}
				if (this.skin != null) {
					var e = this.skin.getAttachment(i, j);
					if (e != null) {
						return e
					}
				}
				if (this.data.defaultSkin != null) {
					return this.data.defaultSkin.getAttachment(i, j)
				}
				return null
			};
			f.prototype.setAttachment = function(q, r) {
				if (q == null) {
					throw new Error("slotName cannot be null.")
				}
				var o = this.slots;
				for (var p = 0, e = o.length; p < e; p++) {
					var i = o[p];
					if (i.data.name == q) {
						var n = null;
						if (r != null) {
							n = this.getAttachment(p, r);
							if (n == null) {
								throw new Error("Attachment not found: " + r + ", for slot: " + q)
							}
						}
						i.setAttachment(n);
						return
					}
				}
				throw new Error("Slot not found: " + q)
			};
			f.prototype.findIkConstraint = function(m) {
				if (m == null) {
					throw new Error("constraintName cannot be null.")
				}
				var i = this.ikConstraints;
				for (var l = 0, e = i.length; l < e; l++) {
					var n = i[l];
					if (n.data.name == m) {
						return n
					}
				}
				return null
			};
			f.prototype.findTransformConstraint = function(n) {
				if (n == null) {
					throw new Error("constraintName cannot be null.")
				}
				var m = this.transformConstraints;
				for (var l = 0, e = m.length; l < e; l++) {
					var i = m[l];
					if (i.data.name == n) {
						return i
					}
				}
				return null
			};
			f.prototype.findPathConstraint = function(n) {
				if (n == null) {
					throw new Error("constraintName cannot be null.")
				}
				var l = this.pathConstraints;
				for (var m = 0, e = l.length; m < e; m++) {
					var i = l[m];
					if (i.data.name == n) {
						return i
					}
				}
				return null
			};
			f.prototype.getBounds = function(y, F) {
				if (y == null) {
					throw new Error("offset cannot be null.")
				}
				if (F == null) {
					throw new Error("size cannot be null.")
				}
				var D = this.drawOrder;
				var z = Number.POSITIVE_INFINITY,
					A = Number.POSITIVE_INFINITY,
					C = Number.NEGATIVE_INFINITY,
					E = Number.NEGATIVE_INFINITY;
				for (var x = 0, B = D.length; x < B; x++) {
					var I = D[x];
					var i = null;
					var n = I.getAttachment();
					if (n instanceof b.RegionAttachment) {
						i = n.updateWorldVertices(I, false)
					} else {
						if (n instanceof b.MeshAttachment) {
							i = n.updateWorldVertices(I, true)
						}
					}
					if (i != null) {
						for (var H = 0, G = i.length; H < G; H += 8) {
							var J = i[H],
								e = i[H + 1];
							z = Math.min(z, J);
							A = Math.min(A, e);
							C = Math.max(C, J);
							E = Math.max(E, e)
						}
					}
				}
				y.set(z, A);
				F.set(C - z, E - A)
			};
			f.prototype.update = function(e) {
				this.time += e
			};
			return f
		}());
		b.Skeleton = a
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a = (function() {
			function f() {
				this.minX = 0;
				this.minY = 0;
				this.maxX = 0;
				this.maxY = 0;
				this.boundingBoxes = new Array();
				this.polygons = new Array();
				this.polygonPool = new b.Pool(function() {
					return b.Utils.newFloatArray(16)
				})
			}
			f.prototype.update = function(A, t) {
				if (A == null) {
					throw new Error("skeleton cannot be null.")
				}
				var B = this.boundingBoxes;
				var i = this.polygons;
				var v = this.polygonPool;
				var u = A.slots;
				var w = u.length;
				B.length = 0;
				v.freeAll(i);
				i.length = 0;
				for (var y = 0; y < w; y++) {
					var e = u[y];
					var x = e.getAttachment();
					if (x instanceof b.BoundingBoxAttachment) {
						var z = x;
						B.push(z);
						var s = v.obtain();
						if (s.length != z.worldVerticesLength) {
							s = b.Utils.newFloatArray(z.worldVerticesLength)
						}
						i.push(s);
						z.computeWorldVertices(e, s)
					}
				}
				if (t) {
					this.aabbCompute()
				}
			};
			f.prototype.aabbCompute = function() {
				var x = Number.POSITIVE_INFINITY,
					y = Number.POSITIVE_INFINITY,
					A = Number.NEGATIVE_INFINITY,
					B = Number.NEGATIVE_INFINITY;
				var e = this.polygons;
				for (var w = 0, z = e.length; w < z; w++) {
					var i = e[w];
					var v = i;
					for (var D = 0, C = i.length; D < C; D += 2) {
						var n = v[D];
						var u = v[D + 1];
						x = Math.min(x, n);
						y = Math.min(y, u);
						A = Math.max(A, n);
						B = Math.max(B, u)
					}
				}
				this.minX = x;
				this.minY = y;
				this.maxX = A;
				this.maxY = B
			};
			f.prototype.aabbContainsPoint = function(h, e) {
				return h >= this.minX && h <= this.maxX && e >= this.minY && e <= this.maxY
			};
			f.prototype.aabbIntersectsSegment = function(w, e, x, r) {
				var t = this.minX;
				var u = this.minY;
				var y = this.maxX;
				var z = this.maxY;
				if ((w <= t && x <= t) || (e <= u && r <= u) || (w >= y && x >= y) || (e >= z && r >= z)) {
					return false
				}
				var v = (r - e) / (x - w);
				var s = v * (t - w) + e;
				if (s > u && s < z) {
					return true
				}
				s = v * (y - w) + e;
				if (s > u && s < z) {
					return true
				}
				var m = (u - e) / v + w;
				if (m > t && m < y) {
					return true
				}
				m = (z - e) / v + w;
				if (m > t && m < y) {
					return true
				}
				return false
			};
			f.prototype.aabbIntersectsSkeleton = function(e) {
				return this.minX < e.maxX && this.maxX > e.minX && this.minY < e.maxY && this.maxY > e.minY
			};
			f.prototype.containsPoint = function(n, e) {
				var m = this.polygons;
				for (var l = 0, i = m.length; l < i; l++) {
					if (this.containsPointPolygon(m[l], n, e)) {
						return this.boundingBoxes[l]
					}
				}
				return null
			};
			f.prototype.containsPointPolygon = function(s, r, t) {
				var u = s;
				var e = s.length;
				var x = e - 2;
				var w = false;
				for (var q = 0; q < e; q += 2) {
					var z = u[q + 1];
					var v = u[x + 1];
					if ((z < t && v >= t) || (v < t && z >= t)) {
						var y = u[q];
						if (y + (t - z) / (v - z) * (u[x] - y) < r) {
							w = !w
						}
					}
					x = q
				}
				return w
			};
			f.prototype.intersectsSegment = function(p, i, q, n) {
				var r = this.polygons;
				for (var o = 0, e = r.length; o < e; o++) {
					if (this.intersectsSegmentPolygon(r[o], p, i, q, n)) {
						return this.boundingBoxes[o]
					}
				}
				return null
			};
			f.prototype.intersectsSegmentPolygon = function(E, H, O, e, P) {
				var K = E;
				var S = E.length;
				var J = H - e,
					Q = O - P;
				var L = H * P - O * e;
				var x = K[S - 2],
					R = K[S - 1];
				for (var D = 0; D < S; D += 2) {
					var y = K[D],
						T = K[D + 1];
					var M = x * T - R * y;
					var F = x - y,
						C = R - T;
					var N = J * C - Q * F;
					var G = (L * F - J * M) / N;
					if (((G >= x && G <= y) || (G >= y && G <= x)) && ((G >= H && G <= e) || (G >= e && G <= H))) {
						var I = (L * C - Q * M) / N;
						if (((I >= R && I <= T) || (I >= T && I <= R)) && ((I >= O && I <= P) || (I >= P && I <= O))) {
							return true
						}
					}
					x = y;
					R = T
				}
				return false
			};
			f.prototype.getPolygon = function(e) {
				if (e == null) {
					throw new Error("boundingBox cannot be null.")
				}
				var h = this.boundingBoxes.indexOf(e);
				return h == -1 ? null : this.polygons[h]
			};
			f.prototype.getWidth = function() {
				return this.maxX - this.minX
			};
			f.prototype.getHeight = function() {
				return this.maxY - this.minY
			};
			return f
		}());
		b.SkeletonBounds = a
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(a) {
		var b = (function() {
			function f() {
				this.bones = new Array();
				this.slots = new Array();
				this.skins = new Array();
				this.events = new Array();
				this.animations = new Array();
				this.ikConstraints = new Array();
				this.transformConstraints = new Array();
				this.pathConstraints = new Array();
				this.fps = 0
			}
			f.prototype.findBone = function(l) {
				if (l == null) {
					throw new Error("boneName cannot be null.")
				}
				var n = this.bones;
				for (var m = 0, e = n.length; m < e; m++) {
					var i = n[m];
					if (i.name == l) {
						return i
					}
				}
				return null
			};
			f.prototype.findBoneIndex = function(i) {
				if (i == null) {
					throw new Error("boneName cannot be null.")
				}
				var l = this.bones;
				for (var k = 0, e = l.length; k < e; k++) {
					if (l[k].name == i) {
						return k
					}
				}
				return -1
			};
			f.prototype.findSlot = function(n) {
				if (n == null) {
					throw new Error("slotName cannot be null.")
				}
				var l = this.slots;
				for (var m = 0, e = l.length; m < e; m++) {
					var i = l[m];
					if (i.name == n) {
						return i
					}
				}
				return null
			};
			f.prototype.findSlotIndex = function(l) {
				if (l == null) {
					throw new Error("slotName cannot be null.")
				}
				var i = this.slots;
				for (var k = 0, e = i.length; k < e; k++) {
					if (i[k].name == l) {
						return k
					}
				}
				return -1
			};
			f.prototype.findSkin = function(n) {
				if (n == null) {
					throw new Error("skinName cannot be null.")
				}
				var i = this.skins;
				for (var m = 0, e = i.length; m < e; m++) {
					var l = i[m];
					if (l.name == n) {
						return l
					}
				}
				return null
			};
			f.prototype.findEvent = function(l) {
				if (l == null) {
					throw new Error("eventDataName cannot be null.")
				}
				var m = this.events;
				for (var n = 0, e = m.length; n < e; n++) {
					var i = m[n];
					if (i.name == l) {
						return i
					}
				}
				return null
			};
			f.prototype.findAnimation = function(m) {
				if (m == null) {
					throw new Error("animationName cannot be null.")
				}
				var e = this.animations;
				for (var n = 0, i = e.length; n < i; n++) {
					var l = e[n];
					if (l.name == m) {
						return l
					}
				}
				return null
			};
			f.prototype.findIkConstraint = function(n) {
				if (n == null) {
					throw new Error("constraintName cannot be null.")
				}
				var l = this.ikConstraints;
				for (var m = 0, e = l.length; m < e; m++) {
					var i = l[m];
					if (i.name == n) {
						return i
					}
				}
				return null
			};
			f.prototype.findTransformConstraint = function(n) {
				if (n == null) {
					throw new Error("constraintName cannot be null.")
				}
				var m = this.transformConstraints;
				for (var l = 0, e = m.length; l < e; l++) {
					var i = m[l];
					if (i.name == n) {
						return i
					}
				}
				return null
			};
			f.prototype.findPathConstraint = function(n) {
				if (n == null) {
					throw new Error("constraintName cannot be null.")
				}
				var l = this.pathConstraints;
				for (var m = 0, e = l.length; m < e; m++) {
					var i = l[m];
					if (i.name == n) {
						return i
					}
				}
				return null
			};
			f.prototype.findPathConstraintIndex = function(i) {
				if (i == null) {
					throw new Error("pathConstraintName cannot be null.")
				}
				var k = this.pathConstraints;
				for (var l = 0, e = k.length; l < e; l++) {
					if (k[l].name == i) {
						return l
					}
				}
				return -1
			};
			return f
		}());
		a.SkeletonData = b
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a = (function() {
			function e(h) {
				this.scale = 1;
				this.linkedMeshes = new Array();
				this.attachmentLoader = h
			}
			e.prototype.readSkeletonData = function(R) {
				var i = this.scale;
				var ao = new b.SkeletonData();
				var af = typeof(R) === "string" ? JSON.parse(R) : R;
				var ap = af.skeleton;
				if (ap != null) {
					ao.hash = ap.hash;
					ao.version = ap.spine;
					ao.width = ap.width;
					ao.height = ap.height;
					ao.fps = ap.fps;
					ao.imagesPath = ap.images
				}
				if (af.bones) {
					for (var U = 0; U < af.bones.length; U++) {
						var n = af.bones[U];
						var aj = null;
						var ac = this.getValue(n, "parent", null);
						if (ac != null) {
							aj = ao.findBone(ac);
							if (aj == null) {
								throw new Error("Parent bone not found: " + ac)
							}
						}
						var j = new b.BoneData(ao.bones.length, n.name, aj);
						j.length = this.getValue(n, "length", 0) * i;
						j.x = this.getValue(n, "x", 0) * i;
						j.y = this.getValue(n, "y", 0) * i;
						j.rotation = this.getValue(n, "rotation", 0);
						j.scaleX = this.getValue(n, "scaleX", 1);
						j.scaleY = this.getValue(n, "scaleY", 1);
						j.shearX = this.getValue(n, "shearX", 0);
						j.shearY = this.getValue(n, "shearY", 0);
						if (n.hasOwnProperty("inheritScale") || n.hasOwnProperty("inheritRotation")) {
							j.transformMode = e.transformModeLegacy(this.getValue(n, "inheritRotation", true), this.getValue(n, "inheritScale", true))
						} else {
							j.transformMode = e.transformModeFromString(this.getValue(n, "transform", "normal"))
						}
						ao.bones.push(j)
					}
				}
				if (af.slots) {
					for (var U = 0; U < af.slots.length; U++) {
						var T = af.slots[U];
						var ad = T.name;
						var ae = T.bone;
						var ah = ao.findBone(ae);
						if (ah == null) {
							throw new Error("Slot bone not found: " + ae)
						}
						var j = new b.SlotData(ao.slots.length, ad, ah);
						var Z = this.getValue(T, "color", null);
						if (Z != null) {
							j.color.setFromString(Z)
						}
						j.attachmentName = this.getValue(T, "attachment", null);
						j.blendMode = e.blendModeFromString(this.getValue(T, "blend", "normal"));
						ao.slots.push(j)
					}
				}
				if (af.ik) {
					for (var U = 0; U < af.ik.length; U++) {
						var V = af.ik[U];
						var j = new b.IkConstraintData(V.name);
						j.order = this.getValue(V, "order", 0);
						for (var X = 0; X < V.bones.length; X++) {
							var ae = V.bones[X];
							var al = ao.findBone(ae);
							if (al == null) {
								throw new Error("IK bone not found: " + ae)
							}
							j.bones.push(al)
						}
						var ak = V.target;
						j.target = ao.findBone(ak);
						if (j.target == null) {
							throw new Error("IK target bone not found: " + ak)
						}
						j.bendDirection = this.getValue(V, "bendPositive", true) ? 1 : -1;
						j.mix = this.getValue(V, "mix", 1);
						ao.ikConstraints.push(j)
					}
				}
				if (af.transform) {
					for (var U = 0; U < af.transform.length; U++) {
						var V = af.transform[U];
						var j = new b.TransformConstraintData(V.name);
						j.order = this.getValue(V, "order", 0);
						for (var X = 0; X < V.bones.length; X++) {
							var ae = V.bones[X];
							var al = ao.findBone(ae);
							if (al == null) {
								throw new Error("Transform constraint bone not found: " + ae)
							}
							j.bones.push(al)
						}
						var ak = V.target;
						j.target = ao.findBone(ak);
						if (j.target == null) {
							throw new Error("Transform constraint target bone not found: " + ak)
						}
						j.offsetRotation = this.getValue(V, "rotation", 0);
						j.offsetX = this.getValue(V, "x", 0) * i;
						j.offsetY = this.getValue(V, "y", 0) * i;
						j.offsetScaleX = this.getValue(V, "scaleX", 0);
						j.offsetScaleY = this.getValue(V, "scaleY", 0);
						j.offsetShearY = this.getValue(V, "shearY", 0);
						j.rotateMix = this.getValue(V, "rotateMix", 1);
						j.translateMix = this.getValue(V, "translateMix", 1);
						j.scaleMix = this.getValue(V, "scaleMix", 1);
						j.shearMix = this.getValue(V, "shearMix", 1);
						ao.transformConstraints.push(j)
					}
				}
				if (af.path) {
					for (var U = 0; U < af.path.length; U++) {
						var V = af.path[U];
						var j = new b.PathConstraintData(V.name);
						j.order = this.getValue(V, "order", 0);
						for (var X = 0; X < V.bones.length; X++) {
							var ae = V.bones[X];
							var al = ao.findBone(ae);
							if (al == null) {
								throw new Error("Transform constraint bone not found: " + ae)
							}
							j.bones.push(al)
						}
						var ak = V.target;
						j.target = ao.findSlot(ak);
						if (j.target == null) {
							throw new Error("Path target slot not found: " + ak)
						}
						j.positionMode = e.positionModeFromString(this.getValue(V, "positionMode", "percent"));
						j.spacingMode = e.spacingModeFromString(this.getValue(V, "spacingMode", "length"));
						j.rotateMode = e.rotateModeFromString(this.getValue(V, "rotateMode", "tangent"));
						j.offsetRotation = this.getValue(V, "rotation", 0);
						j.position = this.getValue(V, "position", 0);
						if (j.positionMode == b.PositionMode.Fixed) {
							j.position *= i
						}
						j.spacing = this.getValue(V, "spacing", 0);
						if (j.spacingMode == b.SpacingMode.Length || j.spacingMode == b.SpacingMode.Fixed) {
							j.spacing *= i
						}
						j.rotateMix = this.getValue(V, "rotateMix", 1);
						j.translateMix = this.getValue(V, "translateMix", 1);
						ao.pathConstraints.push(j)
					}
				}
				if (af.skins) {
					for (var S in af.skins) {
						var ai = af.skins[S];
						var ab = new b.Skin(S);
						for (var ad in ai) {
							var P = ao.findSlotIndex(ad);
							if (P == -1) {
								throw new Error("Slot not found: " + ad)
							}
							var T = ai[ad];
							for (var Y in T) {
								var W = this.readAttachment(T[Y], ab, P, Y);
								if (W != null) {
									ab.addAttachment(P, Y, W)
								}
							}
						}
						ao.skins.push(ab);
						if (ab.name == "default") {
							ao.defaultSkin = ab
						}
					}
				}
				for (var U = 0, ag = this.linkedMeshes.length; U < ag; U++) {
					var ar = this.linkedMeshes[U];
					var ab = ar.skin == null ? ao.defaultSkin : ao.findSkin(ar.skin);
					if (ab == null) {
						throw new Error("Skin not found: " + ar.skin)
					}
					var am = ab.getAttachment(ar.slotIndex, ar.parent);
					if (am == null) {
						throw new Error("Parent mesh not found: " + ar.parent)
					}
					ar.mesh.setParentMesh(am)
				}
				this.linkedMeshes.length = 0;
				if (af.events) {
					for (var an in af.events) {
						var Q = af.events[an];
						var j = new b.EventData(an);
						j.intValue = this.getValue(Q, "int", 0);
						j.floatValue = this.getValue(Q, "float", 0);
						j.stringValue = this.getValue(Q, "string", "");
						ao.events.push(j)
					}
				}
				if (af.animations) {
					for (var aa in af.animations) {
						var aq = af.animations[aa];
						this.readAnimation(aq, aa, ao)
					}
				}
				return ao
			};
			e.prototype.readAttachment = function(F, J, x, E) {
				var C = this.scale;
				E = this.getValue(F, "name", E);
				var i = this.getValue(F, "type", "region");
				switch (i) {
					case "region":
						var H = this.getValue(F, "path", E);
						var L = this.attachmentLoader.newRegionAttachment(J, E, H);
						if (L == null) {
							return null
						}
						L.path = H;
						L.x = this.getValue(F, "x", 0) * C;
						L.y = this.getValue(F, "y", 0) * C;
						L.scaleX = this.getValue(F, "scaleX", 1);
						L.scaleY = this.getValue(F, "scaleY", 1);
						L.rotation = this.getValue(F, "rotation", 0);
						L.width = F.width * C;
						L.height = F.height * C;
						var B = this.getValue(F, "color", null);
						if (B != null) {
							L.color.setFromString(B)
						}
						return L;
					case "boundingbox":
						var y = this.attachmentLoader.newBoundingBoxAttachment(J, E);
						if (y == null) {
							return null
						}
						this.readVertices(F, y, F.vertexCount << 1);
						var B = this.getValue(F, "color", null);
						if (B != null) {
							y.color.setFromString(B)
						}
						return y;
					case "weightedmesh":
					case "skinnedmesh":
					case "mesh":
					case "linkedmesh":
						var H = this.getValue(F, "path", E);
						var I = this.attachmentLoader.newMeshAttachment(J, E, H);
						if (I == null) {
							return null
						}
						I.path = H;
						var B = this.getValue(F, "color", null);
						if (B != null) {
							I.color.setFromString(B)
						}
						var K = this.getValue(F, "parent", null);
						if (K != null) {
							I.inheritDeform = this.getValue(F, "deform", true);
							this.linkedMeshes.push(new f(I, this.getValue(F, "skin", null), x, K));
							return I
						}
						var A = F.uvs;
						this.readVertices(F, I, A.length);
						I.triangles = F.triangles;
						I.regionUVs = A;
						I.hullLength = this.getValue(F, "hull", 0) * 2;
						return I;
					case "path":
						var H = this.attachmentLoader.newPathAttachment(J, E);
						if (H == null) {
							return null
						}
						H.closed = this.getValue(F, "closed", false);
						H.constantSpeed = this.getValue(F, "constantSpeed", true);
						var G = F.vertexCount;
						this.readVertices(F, H, G << 1);
						var D = b.Utils.newArray(G / 3, 0);
						for (var z = 0; z < F.lengths.length; z++) {
							D[z++] = F.lengths[z] * C
						}
						H.lengths = D;
						var B = this.getValue(F, "color", null);
						if (B != null) {
							H.color.setFromString(B)
						}
						return H
				}
				return null
			};
			e.prototype.readVertices = function(A, u, i) {
				var x = this.scale;
				u.worldVerticesLength = i;
				var t = A.vertices;
				if (i == t.length) {
					if (x != 1) {
						for (var w = 0, z = t.length; w < z; w++) {
							t[w] *= x
						}
					}
					u.vertices = b.Utils.toFloatArray(t);
					return
				}
				var n = new Array();
				var y = new Array();
				for (var w = 0, z = t.length; w < z;) {
					var v = t[w++];
					y.push(v);
					for (var B = w + v * 4; w < B; w += 4) {
						y.push(t[w]);
						n.push(t[w + 1] * x);
						n.push(t[w + 2] * x);
						n.push(t[w + 3])
					}
				}
				u.bones = y;
				u.vertices = b.Utils.toFloatArray(n)
			};
			e.prototype.readAnimation = function(av, aQ, aP) {
				var aq = this.scale;
				var al = new Array();
				var aA = 0;
				if (av.slots) {
					for (var aC in av.slots) {
						var aw = av.slots[aC];
						var az = aP.findSlotIndex(aC);
						if (az == -1) {
							throw new Error("Slot not found: " + aC)
						}
						for (var a4 in aw) {
							var aO = aw[a4];
							if (a4 == "color") {
								var aU = new b.ColorTimeline(aO.length);
								aU.slotIndex = az;
								var a0 = 0;
								for (var aK = 0; aK < aO.length; aK++) {
									var aH = aO[aK];
									var au = new b.Color();
									au.setFromString(aH.color);
									aU.setFrame(a0, aH.time, au.r, au.g, au.b, au.a);
									this.readCurve(aH, aU, a0);
									a0++
								}
								al.push(aU);
								aA = Math.max(aA, aU.frames[(aU.getFrameCount() - 1) * b.ColorTimeline.ENTRIES])
							} else {
								if (a4 = "attachment") {
									var aU = new b.AttachmentTimeline(aO.length);
									aU.slotIndex = az;
									var a0 = 0;
									for (var aK = 0; aK < aO.length; aK++) {
										var aH = aO[aK];
										aU.setFrame(a0++, aH.time, aH.name)
									}
									al.push(aU);
									aA = Math.max(aA, aU.frames[aU.getFrameCount() - 1])
								} else {
									throw new Error("Invalid timeline type for a slot: " + a4 + " (" + aC + ")")
								}
							}
						}
					}
				}
				if (av.bones) {
					for (var aS in av.bones) {
						var aX = av.bones[aS];
						var aT = aP.findBoneIndex(aS);
						if (aT == -1) {
							throw new Error("Bone not found: " + aS)
						}
						for (var a4 in aX) {
							var aO = aX[a4];
							if (a4 === "rotate") {
								var aU = new b.RotateTimeline(aO.length);
								aU.boneIndex = aT;
								var a0 = 0;
								for (var aK = 0; aK < aO.length; aK++) {
									var aH = aO[aK];
									aU.setFrame(a0, aH.time, aH.angle);
									this.readCurve(aH, aU, a0);
									a0++
								}
								al.push(aU);
								aA = Math.max(aA, aU.frames[(aU.getFrameCount() - 1) * b.RotateTimeline.ENTRIES])
							} else {
								if (a4 === "translate" || a4 === "scale" || a4 === "shear") {
									var aU = null;
									var aG = 1;
									if (a4 === "scale") {
										aU = new b.ScaleTimeline(aO.length)
									} else {
										if (a4 === "shear") {
											aU = new b.ShearTimeline(aO.length)
										} else {
											aU = new b.TranslateTimeline(aO.length);
											aG = aq
										}
									}
									aU.boneIndex = aT;
									var a0 = 0;
									for (var aK = 0; aK < aO.length; aK++) {
										var aH = aO[aK];
										var y = this.getValue(aH, "x", 0),
											ak = this.getValue(aH, "y", 0);
										aU.setFrame(a0, aH.time, y * aG, ak * aG);
										this.readCurve(aH, aU, a0);
										a0++
									}
									al.push(aU);
									aA = Math.max(aA, aU.frames[(aU.getFrameCount() - 1) * b.TranslateTimeline.ENTRIES])
								} else {
									throw new Error("Invalid timeline type for a bone: " + a4 + " (" + aS + ")")
								}
							}
						}
					}
				}
				if (av.ik) {
					for (var aV in av.ik) {
						var an = av.ik[aV];
						var aE = aP.findIkConstraint(aV);
						var aU = new b.IkConstraintTimeline(an.length);
						aU.ikConstraintIndex = aP.ikConstraints.indexOf(aE);
						var a0 = 0;
						for (var aK = 0; aK < an.length; aK++) {
							var aH = an[aK];
							aU.setFrame(a0, aH.time, this.getValue(aH, "mix", 1), this.getValue(aH, "bendPositive", true) ? 1 : -1);
							this.readCurve(aH, aU, a0);
							a0++
						}
						al.push(aU);
						aA = Math.max(aA, aU.frames[(aU.getFrameCount() - 1) * b.IkConstraintTimeline.ENTRIES])
					}
				}
				if (av.transform) {
					for (var aV in av.transform) {
						var an = av.transform[aV];
						var aE = aP.findTransformConstraint(aV);
						var aU = new b.TransformConstraintTimeline(an.length);
						aU.transformConstraintIndex = aP.transformConstraints.indexOf(aE);
						var a0 = 0;
						for (var aK = 0; aK < an.length; aK++) {
							var aH = an[aK];
							aU.setFrame(a0, aH.time, this.getValue(aH, "rotateMix", 1), this.getValue(aH, "translateMix", 1), this.getValue(aH, "scaleMix", 1), this.getValue(aH, "shearMix", 1));
							this.readCurve(aH, aU, a0);
							a0++
						}
						al.push(aU);
						aA = Math.max(aA, aU.frames[(aU.getFrameCount() - 1) * b.TransformConstraintTimeline.ENTRIES])
					}
				}
				if (av.paths) {
					for (var aV in av.paths) {
						var an = av.paths[aV];
						var at = aP.findPathConstraintIndex(aV);
						if (at == -1) {
							throw new Error("Path constraint not found: " + aV)
						}
						var aF = aP.pathConstraints[at];
						for (var a4 in an) {
							var aO = an[a4];
							if (a4 === "position" || a4 === "spacing") {
								var aU = null;
								var aG = 1;
								if (a4 === "spacing") {
									aU = new b.PathConstraintSpacingTimeline(aO.length);
									if (aF.spacingMode == b.SpacingMode.Length || aF.spacingMode == b.SpacingMode.Fixed) {
										aG = aq
									}
								} else {
									aU = new b.PathConstraintPositionTimeline(aO.length);
									if (aF.positionMode == b.PositionMode.Fixed) {
										aG = aq
									}
								}
								aU.pathConstraintIndex = at;
								var a0 = 0;
								for (var aK = 0; aK < aO.length; aK++) {
									var aH = aO[aK];
									aU.setFrame(a0, aH.time, this.getValue(aH, a4, 0) * aG);
									this.readCurve(aH, aU, a0);
									a0++
								}
								al.push(aU);
								aA = Math.max(aA, aU.frames[(aU.getFrameCount() - 1) * b.PathConstraintPositionTimeline.ENTRIES])
							} else {
								if (a4 === "mix") {
									var aU = new b.PathConstraintMixTimeline(aO.length);
									aU.pathConstraintIndex = at;
									var a0 = 0;
									for (var aK = 0; aK < aO.length; aK++) {
										var aH = aO[aK];
										aU.setFrame(a0, aH.time, this.getValue(aH, "rotateMix", 1), this.getValue(aH, "translateMix", 1));
										this.readCurve(aH, aU, a0);
										a0++
									}
									al.push(aU);
									aA = Math.max(aA, aU.frames[(aU.getFrameCount() - 1) * b.PathConstraintMixTimeline.ENTRIES])
								}
							}
						}
					}
				}
				if (av.deform) {
					for (var aR in av.deform) {
						var i = av.deform[aR];
						var aM = aP.findSkin(aR);
						if (aM == null) {
							throw new Error("Skin not found: " + aR)
						}
						for (var aC in i) {
							var aw = i[aC];
							var az = aP.findSlotIndex(aC);
							if (az == -1) {
								throw new Error("Slot not found: " + aw.name)
							}
							for (var a4 in aw) {
								var aO = aw[a4];
								var aI = aM.getAttachment(az, a4);
								if (aI == null) {
									throw new Error("Deform attachment not found: " + aO.name)
								}
								var n = aI.bones != null;
								var a2 = aI.vertices;
								var ay = n ? a2.length / 3 * 2 : a2.length;
								var aU = new b.DeformTimeline(aO.length);
								aU.slotIndex = az;
								aU.attachment = aI;
								var a0 = 0;
								for (var aL = 0; aL < aO.length; aL++) {
									var aH = aO[aL];
									var ao = void 0;
									var ar = this.getValue(aH, "vertices", null);
									if (ar == null) {
										ao = n ? b.Utils.newFloatArray(ay) : a2
									} else {
										ao = b.Utils.newFloatArray(ay);
										var aD = this.getValue(aH, "offset", 0);
										b.Utils.arrayCopy(ar, 0, ao, aD, ar.length);
										if (aq != 1) {
											for (var aK = aD, j = aK + ar.length; aK < j; aK++) {
												ao[aK] *= aq
											}
										}
										if (!n) {
											for (var aK = 0; aK < ay; aK++) {
												ao[aK] += a2[aK]
											}
										}
									}
									aU.setFrame(a0, aH.time, ao);
									this.readCurve(aH, aU, a0);
									a0++
								}
								al.push(aU);
								aA = Math.max(aA, aU.frames[aU.getFrameCount() - 1])
							}
						}
					}
				}
				var x = av.drawOrder;
				if (x == null) {
					x = av.draworder
				}
				if (x != null) {
					var aU = new b.DrawOrderTimeline(x.length);
					var aW = aP.slots.length;
					var a0 = 0;
					for (var aL = 0; aL < x.length; aL++) {
						var ax = x[aL];
						var ap = null;
						var aJ = this.getValue(ax, "offsets", null);
						if (aJ != null) {
							ap = b.Utils.newArray(aW, -1);
							var a3 = b.Utils.newArray(aW - aJ.length, 0);
							var aY = 0,
								aB = 0;
							for (var aK = 0; aK < aJ.length; aK++) {
								var aZ = aJ[aK];
								var az = aP.findSlotIndex(aZ.slot);
								if (az == -1) {
									throw new Error("Slot not found: " + aZ.slot)
								}
								while (aY != az) {
									a3[aB++] = aY++
								}
								ap[aY + aZ.offset] = aY++
							}
							while (aY < aW) {
								a3[aB++] = aY++
							}
							for (var aK = aW - 1; aK >= 0; aK--) {
								if (ap[aK] == -1) {
									ap[aK] = a3[--aB]
								}
							}
						}
						aU.setFrame(a0++, ax.time, ap)
					}
					al.push(aU);
					aA = Math.max(aA, aU.frames[aU.getFrameCount() - 1])
				}
				if (av.events) {
					var aU = new b.EventTimeline(av.events.length);
					var a0 = 0;
					for (var aK = 0; aK < av.events.length; aK++) {
						var a1 = av.events[aK];
						var aN = aP.findEvent(a1.name);
						if (aN == null) {
							throw new Error("Event not found: " + a1.name)
						}
						var am = new b.Event(a1.time, aN);
						am.intValue = this.getValue(a1, "int", aN.intValue);
						am.floatValue = this.getValue(a1, "float", aN.floatValue);
						am.stringValue = this.getValue(a1, "string", aN.stringValue);
						aU.setFrame(a0++, am)
					}
					al.push(aU);
					aA = Math.max(aA, aU.frames[aU.getFrameCount() - 1])
				}
				if (isNaN(aA)) {
					throw new Error("Error while parsing animation, duration is NaN")
				}
				aP.animations.push(new b.Animation(aQ, al, aA))
			};
			e.prototype.readCurve = function(m, n, k) {
				if (!m.curve) {
					return
				}
				if (m.curve === "stepped") {
					n.setStepped(k)
				} else {
					if (Object.prototype.toString.call(m.curve) === "[object Array]") {
						var l = m.curve;
						n.setCurve(k, l[0], l[1], l[2], l[3])
					}
				}
			};
			e.prototype.getValue = function(k, j, l) {
				return k[j] !== undefined ? k[j] : l
			};
			e.blendModeFromString = function(h) {
				if (h === "multiply") {
					return PIXI.BLEND_MODES.MULTIPLY
				}
				if (h === "additive") {
					return PIXI.BLEND_MODES.ADD
				}
				if (h === "screen") {
					return PIXI.BLEND_MODES.SCREEN
				}
				if (h === "normal") {
					return PIXI.BLEND_MODES.NORMAL
				}
				throw new Error("Unknown blend mode: " + h)
			};
			e.positionModeFromString = function(h) {
				h = h.toLowerCase();
				if (h == "fixed") {
					return b.PositionMode.Fixed
				}
				if (h == "percent") {
					return b.PositionMode.Percent
				}
				throw new Error("Unknown position mode: " + h)
			};
			e.spacingModeFromString = function(h) {
				h = h.toLowerCase();
				if (h == "length") {
					return b.SpacingMode.Length
				}
				if (h == "fixed") {
					return b.SpacingMode.Fixed
				}
				if (h == "percent") {
					return b.SpacingMode.Percent
				}
				throw new Error("Unknown position mode: " + h)
			};
			e.rotateModeFromString = function(h) {
				h = h.toLowerCase();
				if (h == "tangent") {
					return b.RotateMode.Tangent
				}
				if (h == "chain") {
					return b.RotateMode.Chain
				}
				if (h == "chainscale") {
					return b.RotateMode.ChainScale
				}
				throw new Error("Unknown rotate mode: " + h)
			};
			e.transformModeFromString = function(h) {
				h = h.toLowerCase();
				if (h == "normal") {
					return b.TransformMode.Normal
				}
				if (h == "onlytranslation") {
					return b.TransformMode.OnlyTranslation
				}
				if (h == "norotationorreflection") {
					return b.TransformMode.NoRotationOrReflection
				}
				if (h == "noscale") {
					return b.TransformMode.NoScale
				}
				if (h == "noscaleorreflection") {
					return b.TransformMode.NoScaleOrReflection
				}
				throw new Error("Unknown transform mode: " + h)
			};
			e.transformModeLegacy = function(j, i) {
				if (j && i) {
					return b.TransformMode.Normal
				} else {
					if (j) {
						return b.TransformMode.NoScaleOrReflection
					} else {
						if (i) {
							return b.TransformMode.NoRotationOrReflection
						} else {
							return b.TransformMode.OnlyTranslation
						}
					}
				}
			};
			return e
		}());
		b.SkeletonJson = a;
		var f = (function() {
			function e(k, l, n, m) {
				this.mesh = k;
				this.skin = l;
				this.slotIndex = n;
				this.parent = m
			}
			return e
		}())
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a = (function() {
			function f(e) {
				this.attachments = new Array();
				if (e == null) {
					throw new Error("name cannot be null.")
				}
				this.name = e
			}
			f.prototype.addAttachment = function(k, j, e) {
				if (e == null) {
					throw new Error("attachment cannot be null.")
				}
				var l = this.attachments;
				if (k >= l.length) {
					l.length = k + 1
				}
				if (!l[k]) {
					l[k] = {}
				}
				l[k][j] = e
			};
			f.prototype.getAttachment = function(j, i) {
				var e = this.attachments[j];
				return e ? e[i] : null
			};
			f.prototype.attachAll = function(x, e) {
				var u = 0;
				for (var w = 0; w < x.slots.length; w++) {
					var q = x.slots[w];
					var r = q.getAttachment();
					if (r && u < e.attachments.length) {
						var s = e.attachments[u];
						for (var i in s) {
							var t = s[i];
							if (r == t) {
								var v = this.getAttachment(u, name);
								if (v != null) {
									q.setAttachment(v)
								}
								break
							}
						}
					}
					u++
				}
			};
			return f
		}());
		b.Skin = a
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a = (function() {
			function f(e, h) {
				this.attachmentVertices = new Array();
				if (e == null) {
					throw new Error("data cannot be null.")
				}
				if (h == null) {
					throw new Error("bone cannot be null.")
				}
				this.data = e;
				this.bone = h;
				this.color = new b.Color();
				this.blendMode = e.blendMode;
				this.setToSetupPose()
			}
			f.prototype.getAttachment = function() {
				return this.attachment
			};
			f.prototype.setAttachment = function(e) {
				if (this.attachment == e) {
					return
				}
				this.attachment = e;
				this.attachmentTime = this.bone.skeleton.time;
				this.attachmentVertices.length = 0
			};
			f.prototype.setAttachmentTime = function(e) {
				this.attachmentTime = this.bone.skeleton.time - e
			};
			f.prototype.getAttachmentTime = function() {
				return this.bone.skeleton.time - this.attachmentTime
			};
			f.prototype.setToSetupPose = function() {
				this.color.setFromColor(this.data.color);
				if (this.data.attachmentName == null) {
					this.attachment = null
				} else {
					this.attachment = null;
					this.setAttachment(this.bone.skeleton.getAttachment(this.data.index, this.data.attachmentName))
				}
			};
			return f
		}());
		b.Slot = a
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a = (function() {
			function f(i, j, e) {
				this.color = new b.Color(1, 1, 1, 1);
				if (i < 0) {
					throw new Error("index must be >= 0.")
				}
				if (j == null) {
					throw new Error("name cannot be null.")
				}
				if (e == null) {
					throw new Error("boneData cannot be null.")
				}
				this.index = i;
				this.name = j;
				this.boneData = e
			}
			return f
		}());
		b.SlotData = a
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(j) {
		var h = (function() {
			function e(f) {
				this._image = f
			}
			e.prototype.getImage = function() {
				return this._image
			};
			e.filterFromString = function(f) {
				switch (f.toLowerCase()) {
					case "nearest":
						return i.Nearest;
					case "linear":
						return i.Linear;
					case "mipmap":
						return i.MipMap;
					case "mipmapnearestnearest":
						return i.MipMapNearestNearest;
					case "mipmaplinearnearest":
						return i.MipMapLinearNearest;
					case "mipmapnearestlinear":
						return i.MipMapNearestLinear;
					case "mipmaplinearlinear":
						return i.MipMapLinearLinear;
					default:
						throw new Error("Unknown texture filter " + f)
				}
			};
			e.wrapFromString = function(f) {
				switch (f.toLowerCase()) {
					case "mirroredtepeat":
						return a.MirroredRepeat;
					case "clamptoedge":
						return a.ClampToEdge;
					case "repeat":
						return a.Repeat;
					default:
						throw new Error("Unknown texture wrap " + f)
				}
			};
			return e
		}());
		j.Texture = h;
		var i;
		(function(e) {
			e[e.Nearest = 9728] = "Nearest";
			e[e.Linear = 9729] = "Linear";
			e[e.MipMap = 9987] = "MipMap";
			e[e.MipMapNearestNearest = 9984] = "MipMapNearestNearest";
			e[e.MipMapLinearNearest = 9985] = "MipMapLinearNearest";
			e[e.MipMapNearestLinear = 9986] = "MipMapNearestLinear";
			e[e.MipMapLinearLinear = 9987] = "MipMapLinearLinear"
		})(i = j.TextureFilter || (j.TextureFilter = {}));
		var a;
		(function(e) {
			e[e.MirroredRepeat = 33648] = "MirroredRepeat";
			e[e.ClampToEdge = 33071] = "ClampToEdge";
			e[e.Repeat = 10497] = "Repeat"
		})(a = j.TextureWrap || (j.TextureWrap = {}));
		var b = (function() {
			function e() {
				this.size = null
			}
			Object.defineProperty(e.prototype, "width", {
				get: function() {
					var f = this.texture;
					if (PIXI.VERSION[0] == "3") {
						return f.crop.width
					}
					if (f.trim) {
						return f.trim.width
					}
					return f.orig.width
				},
				enumerable: true,
				configurable: true
			});
			Object.defineProperty(e.prototype, "height", {
				get: function() {
					var f = this.texture;
					if (PIXI.VERSION[0] == "3") {
						return f.crop.height
					}
					if (f.trim) {
						return f.trim.height
					}
					return f.orig.height
				},
				enumerable: true,
				configurable: true
			});
			Object.defineProperty(e.prototype, "u", {
				get: function() {
					return this.texture._uvs.x0
				},
				enumerable: true,
				configurable: true
			});
			Object.defineProperty(e.prototype, "v", {
				get: function() {
					return this.texture._uvs.y0
				},
				enumerable: true,
				configurable: true
			});
			Object.defineProperty(e.prototype, "u2", {
				get: function() {
					return this.texture._uvs.x2
				},
				enumerable: true,
				configurable: true
			});
			Object.defineProperty(e.prototype, "v2", {
				get: function() {
					return this.texture._uvs.y2
				},
				enumerable: true,
				configurable: true
			});
			Object.defineProperty(e.prototype, "offsetX", {
				get: function() {
					var f = this.texture;
					return f.trim ? f.trim.x : 0
				},
				enumerable: true,
				configurable: true
			});
			Object.defineProperty(e.prototype, "offsetY", {
				get: function() {
					return this.spineOffsetY
				},
				enumerable: true,
				configurable: true
			});
			Object.defineProperty(e.prototype, "pixiOffsetY", {
				get: function() {
					var f = this.texture;
					return f.trim ? f.trim.y : 0
				},
				enumerable: true,
				configurable: true
			});
			Object.defineProperty(e.prototype, "spineOffsetY", {
				get: function() {
					var f = this.texture;
					return this.originalHeight - this.height - (f.trim ? f.trim.y : 0)
				},
				enumerable: true,
				configurable: true
			});
			Object.defineProperty(e.prototype, "originalWidth", {
				get: function() {
					var f = this.texture;
					if (PIXI.VERSION[0] == "3") {
						if (f.trim) {
							return f.trim.width
						}
						return f.crop.width
					}
					return f.orig.width
				},
				enumerable: true,
				configurable: true
			});
			Object.defineProperty(e.prototype, "originalHeight", {
				get: function() {
					var f = this.texture;
					if (PIXI.VERSION[0] == "3") {
						if (f.trim) {
							return f.trim.height
						}
						return f.crop.height
					}
					return f.orig.height
				},
				enumerable: true,
				configurable: true
			});
			Object.defineProperty(e.prototype, "x", {
				get: function() {
					return this.texture.frame.x
				},
				enumerable: true,
				configurable: true
			});
			Object.defineProperty(e.prototype, "y", {
				get: function() {
					return this.texture.frame.y
				},
				enumerable: true,
				configurable: true
			});
			Object.defineProperty(e.prototype, "rotate", {
				get: function() {
					return this.texture.rotate !== 0
				},
				enumerable: true,
				configurable: true
			});
			return e
		}());
		j.TextureRegion = b
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(i) {
		var a = (function() {
			function e(g, l, f) {
				this.pages = new Array();
				this.regions = new Array();
				if (g) {
					this.addSpineAtlas(g, l, f)
				}
			}
			e.prototype.addTexture = function(q, u) {
				var r = this.pages;
				var t = null;
				for (var g = 0; g < r.length; g++) {
					if (r[g].baseTexture === u.baseTexture) {
						t = r[g];
						break
					}
				}
				if (t === null) {
					t = new b();
					t.name = "texturePage";
					var f = u.baseTexture;
					t.width = f.realWidth;
					t.height = f.realHeight;
					t.baseTexture = f;
					t.minFilter = t.magFilter = i.TextureFilter.Nearest;
					t.uWrap = i.TextureWrap.ClampToEdge;
					t.vWrap = i.TextureWrap.ClampToEdge;
					r.push(t)
				}
				var s = new j();
				s.name = q;
				s.page = t;
				s.texture = u;
				s.index = -1;
				this.regions.push(s);
				return s
			};
			e.prototype.addTextureHash = function(l, f) {
				for (var g in l) {
					if (l.hasOwnProperty(g)) {
						this.addTexture(f && g.indexOf(".") !== -1 ? g.substr(0, g.lastIndexOf(".")) : g, l[g])
					}
				}
			};
			e.prototype.addSpineAtlas = function(g, l, f) {
				return this.load(g, l, f)
			};
			e.prototype.load = function(g, q, t) {
				var u = this;
				if (q == null) {
					throw new Error("textureLoader cannot be null.")
				}
				var r = new h(g);
				var s = new Array(4);
				var v = null;
				var f = function() {
					while (true) {
						var x = r.readLine();
						if (x == null) {
							return t && t(u)
						}
						x = x.trim();
						if (x.length == 0) {
							v = null
						} else {
							if (!v) {
								v = new b();
								v.name = x;
								if (r.readTuple(s) == 2) {
									v.width = parseInt(s[0]);
									v.height = parseInt(s[1]);
									r.readTuple(s)
								}
								r.readTuple(s);
								v.minFilter = i.Texture.filterFromString(s[0]);
								v.magFilter = i.Texture.filterFromString(s[1]);
								var m = r.readValue();
								v.uWrap = i.TextureWrap.ClampToEdge;
								v.vWrap = i.TextureWrap.ClampToEdge;
								if (m == "x") {
									v.uWrap = i.TextureWrap.Repeat
								} else {
									if (m == "y") {
										v.vWrap = i.TextureWrap.Repeat
									} else {
										if (m == "xy") {
											v.uWrap = v.vWrap = i.TextureWrap.Repeat
										}
									}
								}
								q(x, function(w) {
									v.baseTexture = w;
									if (!w.hasLoaded) {
										w.width = v.width;
										w.height = v.height
									}
									u.pages.push(v);
									v.setFilters();
									if (!v.width || !v.height) {
										v.width = w.realWidth;
										v.height = w.realHeight;
										if (!v.width || !v.height) {}
									}
									f()
								});
								u.pages.push(v);
								break
							} else {
								var Q = new j();
								Q.name = x;
								Q.page = v;
								var O = r.readValue() == "true" ? 6 : 0;
								r.readTuple(s);
								var K = parseInt(s[0]);
								var M = parseInt(s[1]);
								r.readTuple(s);
								var T = parseInt(s[0]);
								var k = parseInt(s[1]);
								var P = v.baseTexture.resolution;
								K /= P;
								M /= P;
								T /= P;
								k /= P;
								var o = new PIXI.Rectangle(K, M, O ? k : T, O ? T : k);
								if (r.readTuple(s) == 4) {
									if (r.readTuple(s) == 4) {
										r.readTuple(s)
									}
								}
								var l = parseInt(s[0]) / P;
								var R = parseInt(s[1]) / P;
								r.readTuple(s);
								var p = parseInt(s[0]) / P;
								var y = parseInt(s[1]) / P;
								var S = new PIXI.Rectangle(0, 0, l, R);
								var L = new PIXI.Rectangle(p, R - k - y, T, k);
								if (PIXI.VERSION[0] == "4") {
									Q.texture = new PIXI.Texture(Q.page.baseTexture, o, S, L, O)
								} else {
									var n = new PIXI.Rectangle(K, M, T, k);
									var N = n.clone();
									L.width = l;
									L.height = R;
									Q.texture = new PIXI.Texture(Q.page.baseTexture, n, N, L, O)
								}
								Q.index = parseInt(r.readValue());
								Q.texture._updateUvs();
								u.regions.push(Q)
							}
						}
					}
				};
				f()
			};
			e.prototype.findRegion = function(g) {
				for (var f = 0; f < this.regions.length; f++) {
					if (this.regions[f].name == g) {
						return this.regions[f]
					}
				}
				return null
			};
			e.prototype.dispose = function() {
				for (var f = 0; f < this.pages.length; f++) {
					this.pages[f].baseTexture.dispose()
				}
			};
			return e
		}());
		i.TextureAtlas = a;
		var h = (function() {
			function e(f) {
				this.index = 0;
				this.lines = f.split(/\r\n|\r|\n/)
			}
			e.prototype.readLine = function() {
				if (this.index >= this.lines.length) {
					return null
				}
				return this.lines[this.index++]
			};
			e.prototype.readValue = function() {
				var g = this.readLine();
				var f = g.indexOf(":");
				if (f == -1) {
					throw new Error("Invalid line: " + g)
				}
				return g.substring(f + 1).trim()
			};
			e.prototype.readTuple = function(p) {
				var g = this.readLine();
				var s = g.indexOf(":");
				if (s == -1) {
					throw new Error("Invalid line: " + g)
				}
				var f = 0,
					r = s + 1;
				for (; f < 3; f++) {
					var q = g.indexOf(",", r);
					if (q == -1) {
						break
					}
					p[f] = g.substr(r, q - r).trim();
					r = q + 1
				}
				p[f] = g.substring(r).trim();
				return f + 1
			};
			return e
		}());
		var b = (function() {
			function e() {}
			e.prototype.setFilters = function() {
				var g = this.baseTexture;
				var f = this.minFilter;
				if (f == i.TextureFilter.Linear) {
					g.scaleMode = PIXI.SCALE_MODES.LINEAR
				} else {
					if (this.minFilter == i.TextureFilter.Nearest) {
						g.scaleMode = PIXI.SCALE_MODES.NEAREST
					} else {
						g.mipmap = true;
						if (f == i.TextureFilter.MipMapNearestNearest) {
							g.scaleMode = PIXI.SCALE_MODES.NEAREST
						} else {
							g.scaleMode = PIXI.SCALE_MODES.LINEAR
						}
					}
				}
			};
			return e
		}());
		i.TextureAtlasPage = b;
		var j = (function(e) {
			__extends(f, e);

			function f() {
				return e !== null && e.apply(this, arguments) || this
			}
			return f
		}(i.TextureRegion));
		i.TextureAtlasRegion = j
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a = (function() {
			function f(i, e) {
				this.rotateMix = 0;
				this.translateMix = 0;
				this.scaleMix = 0;
				this.shearMix = 0;
				this.temp = new b.Vector2();
				if (i == null) {
					throw new Error("data cannot be null.")
				}
				if (e == null) {
					throw new Error("skeleton cannot be null.")
				}
				this.data = i;
				this.rotateMix = i.rotateMix;
				this.translateMix = i.translateMix;
				this.scaleMix = i.scaleMix;
				this.shearMix = i.shearMix;
				this.bones = new Array();
				for (var j = 0; j < i.bones.length; j++) {
					this.bones.push(e.findBone(i.bones[j].name))
				}
				this.target = e.findBone(i.target.name)
			}
			f.prototype.apply = function() {
				this.update()
			};
			f.prototype.update = function() {
				var O = this.rotateMix,
					i = this.translateMix,
					S = this.scaleMix,
					aa = this.shearMix;
				var n = this.target;
				var Q = n.matrix.a,
					U = n.matrix.c,
					W = n.matrix.b,
					X = n.matrix.d;
				var T = this.bones;
				for (var e = 0, r = T.length; e < r; e++) {
					var Z = T[e];
					var m = Z.matrix;
					var Y = false;
					if (O != 0) {
						var K = m.a,
							M = m.c,
							N = m.b,
							P = m.d;
						var s = Math.atan2(W, Q) - Math.atan2(N, K) + this.data.offsetRotation * b.MathUtils.degRad;
						if (s > b.MathUtils.PI) {
							s -= b.MathUtils.PI2
						} else {
							if (s < -b.MathUtils.PI) {
								s += b.MathUtils.PI2
							}
						}
						s *= O;
						var ab = Math.cos(s),
							ad = Math.sin(s);
						m.a = ab * K - ad * N;
						m.c = ab * M - ad * P;
						m.b = ad * K + ab * N;
						m.d = ad * M + ab * P;
						Y = true
					}
					if (i != 0) {
						var R = this.temp;
						n.localToWorld(R.set(this.data.offsetX, this.data.offsetY));
						m.tx += (R.x - m.tx) * i;
						m.ty += (R.y - m.ty) * i;
						Y = true
					}
					if (S > 0) {
						var L = Math.sqrt(m.a * m.a + m.b * m.b);
						var ac = Math.sqrt(Q * Q + W * W);
						if (L > 0.00001) {
							L = (L + (ac - L + this.data.offsetScaleX) * S) / L
						}
						m.a *= L;
						m.b *= L;
						L = Math.sqrt(m.c * m.c + m.d * m.d);
						ac = Math.sqrt(U * U + X * X);
						if (L > 0.00001) {
							L = (L + (ac - L + this.data.offsetScaleY) * S) / L
						}
						m.c *= L;
						m.d *= L;
						Y = true
					}
					if (aa > 0) {
						var M = m.c,
							P = m.d;
						var V = Math.atan2(P, M);
						var s = Math.atan2(X, U) - Math.atan2(W, Q) - (V - Math.atan2(m.b, m.a));
						if (s > b.MathUtils.PI) {
							s -= b.MathUtils.PI2
						} else {
							if (s < -b.MathUtils.PI) {
								s += b.MathUtils.PI2
							}
						}
						s = V + (s + this.data.offsetShearY * b.MathUtils.degRad) * aa;
						var L = Math.sqrt(M * M + P * P);
						m.c = Math.cos(s) * L;
						m.d = Math.sin(s) * L;
						Y = true
					}
					if (Y) {
						Z.appliedValid = false
					}
				}
			};
			f.prototype.getOrder = function() {
				return this.data.order
			};
			return f
		}());
		b.TransformConstraint = a
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(b) {
		var a = (function() {
			function f(e) {
				this.order = 0;
				this.bones = new Array();
				this.rotateMix = 0;
				this.translateMix = 0;
				this.scaleMix = 0;
				this.shearMix = 0;
				this.offsetRotation = 0;
				this.offsetX = 0;
				this.offsetY = 0;
				this.offsetScaleX = 0;
				this.offsetScaleY = 0;
				this.offsetShearY = 0;
				if (e == null) {
					throw new Error("name cannot be null.")
				}
				this.name = e
			}
			return f
		}());
		b.TransformConstraintData = a
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(c) {
	var d;
	(function(q) {
		var n = (function() {
			function e() {
				this.array = new Array()
			}
			e.prototype.add = function(g) {
				var f = this.contains(g);
				this.array[g | 0] = g | 0;
				return !f
			};
			e.prototype.contains = function(f) {
				return this.array[f | 0] != undefined
			};
			e.prototype.remove = function(f) {
				this.array[f | 0] = undefined
			};
			e.prototype.clear = function() {
				this.array.length = 0
			};
			return e
		}());
		q.IntSet = n;
		var r = (function() {
			function e(g, h, f, i) {
				if (g === void 0) {
					g = 0
				}
				if (h === void 0) {
					h = 0
				}
				if (f === void 0) {
					f = 0
				}
				if (i === void 0) {
					i = 0
				}
				this.r = g;
				this.g = h;
				this.b = f;
				this.a = i
			}
			e.prototype.set = function(g, h, f, i) {
				this.r = g;
				this.g = h;
				this.b = f;
				this.a = i;
				this.clamp();
				return this
			};
			e.prototype.setFromColor = function(f) {
				this.r = f.r;
				this.g = f.g;
				this.b = f.b;
				this.a = f.a;
				return this
			};
			e.prototype.setFromString = function(f) {
				f = f.charAt(0) == "#" ? f.substr(1) : f;
				this.r = parseInt(f.substr(0, 2), 16) / 255;
				this.g = parseInt(f.substr(2, 2), 16) / 255;
				this.b = parseInt(f.substr(4, 2), 16) / 255;
				this.a = (f.length != 8 ? 255 : parseInt(f.substr(6, 2), 16)) / 255;
				return this
			};
			e.prototype.add = function(g, h, f, i) {
				this.r += g;
				this.g += h;
				this.b += f;
				this.a += i;
				this.clamp();
				return this
			};
			e.prototype.clamp = function() {
				if (this.r < 0) {
					this.r = 0
				} else {
					if (this.r > 1) {
						this.r = 1
					}
				}
				if (this.g < 0) {
					this.g = 0
				} else {
					if (this.g > 1) {
						this.g = 1
					}
				}
				if (this.b < 0) {
					this.b = 0
				} else {
					if (this.b > 1) {
						this.b = 1
					}
				}
				if (this.a < 0) {
					this.a = 0
				} else {
					if (this.a > 1) {
						this.a = 1
					}
				}
				return this
			};
			return e
		}());
		r.WHITE = new r(1, 1, 1, 1);
		r.RED = new r(1, 0, 0, 1);
		r.GREEN = new r(0, 1, 0, 1);
		r.BLUE = new r(0, 0, 1, 1);
		r.MAGENTA = new r(1, 0, 1, 1);
		q.Color = r;
		var o = (function() {
			function e() {}
			e.clamp = function(g, h, f) {
				if (g < h) {
					return h
				}
				if (g > f) {
					return f
				}
				return g
			};
			e.cosDeg = function(f) {
				return Math.cos(f * e.degRad)
			};
			e.sinDeg = function(f) {
				return Math.sin(f * e.degRad)
			};
			e.signum = function(f) {
				return f > 0 ? 1 : f < 0 ? -1 : 0
			};
			e.toInt = function(f) {
				return f > 0 ? Math.floor(f) : Math.ceil(f)
			};
			e.cbrt = function(f) {
				var g = Math.pow(Math.abs(f), 1 / 3);
				return f < 0 ? -g : g
			};
			return e
		}());
		o.PI = 3.1415927;
		o.PI2 = o.PI * 2;
		o.radiansToDegrees = 180 / o.PI;
		o.radDeg = o.radiansToDegrees;
		o.degreesToRadians = o.PI / 180;
		o.degRad = o.degreesToRadians;
		q.MathUtils = o;
		var m = (function() {
			function e() {}
			e.arrayCopy = function(h, i, k, g, f) {
				for (var j = i, t = g; j < i + f; j++, t++) {
					k[t] = h[j]
				}
			};
			e.setArraySize = function(g, j, h) {
				if (h === void 0) {
					h = 0
				}
				var i = g.length;
				if (i == j) {
					return g
				}
				g.length = j;
				if (i < j) {
					for (var f = i; f < j; f++) {
						g[f] = h
					}
				}
				return g
			};
			e.ensureArrayCapacity = function(g, f, h) {
				if (h === void 0) {
					h = 0
				}
				if (g.length >= f) {
					return g
				}
				return e.setArraySize(g, f, h)
			};
			e.newArray = function(h, f) {
				var g = new Array(h);
				for (var i = 0; i < h; i++) {
					g[i] = f
				}
				return g
			};
			e.newFloatArray = function(h) {
				if (e.SUPPORTS_TYPED_ARRAYS) {
					return new Float32Array(h)
				} else {
					var g = new Array(h);
					for (var f = 0; f < g.length; f++) {
						g[f] = 0
					}
					return g
				}
			};
			e.toFloatArray = function(f) {
				return e.SUPPORTS_TYPED_ARRAYS ? new Float32Array(f) : f
			};
			return e
		}());
		m.SUPPORTS_TYPED_ARRAYS = typeof(Float32Array) !== "undefined";
		q.Utils = m;
		var l = (function() {
			function e() {}
			e.logBones = function(g) {
				for (var i = 0; i < g.bones.length; i++) {
					var h = g.bones[i];
					var f = h.matrix
				}
			};
			return e
		}());
		q.DebugUtils = l;
		var b = (function() {
			function e(f) {
				this.items = new Array();
				this.instantiator = f
			}
			e.prototype.obtain = function() {
				return this.items.length > 0 ? this.items.pop() : this.instantiator()
			};
			e.prototype.free = function(f) {
				if (f.reset) {
					f.reset()
				}
				this.items.push(f)
			};
			e.prototype.freeAll = function(f) {
				for (var g = 0; g < f.length; g++) {
					if (f[g].reset) {
						f[g].reset()
					}
					this.items[g] = f[g]
				}
			};
			e.prototype.clear = function() {
				this.items.length = 0
			};
			return e
		}());
		q.Pool = b;
		var a = (function() {
			function e(f, g) {
				if (f === void 0) {
					f = 0
				}
				if (g === void 0) {
					g = 0
				}
				this.x = f;
				this.y = g
			}
			e.prototype.set = function(f, g) {
				this.x = f;
				this.y = g;
				return this
			};
			e.prototype.length = function() {
				var f = this.x;
				var g = this.y;
				return Math.sqrt(f * f + g * g)
			};
			e.prototype.normalize = function() {
				var f = this.length();
				if (f != 0) {
					this.x /= f;
					this.y /= f
				}
				return this
			};
			return e
		}());
		q.Vector2 = a;
		var p = (function() {
			function e() {
				this.maxDelta = 0.064;
				this.framesPerSecond = 0;
				this.delta = 0;
				this.totalTime = 0;
				this.lastTime = Date.now() / 1000;
				this.frameCount = 0;
				this.frameTime = 0
			}
			e.prototype.update = function() {
				var f = Date.now() / 1000;
				this.delta = f - this.lastTime;
				this.frameTime += this.delta;
				this.totalTime += this.delta;
				if (this.delta > this.maxDelta) {
					this.delta = this.maxDelta
				}
				this.lastTime = f;
				this.frameCount++;
				if (this.frameTime > 1) {
					this.framesPerSecond = this.frameCount / this.frameTime;
					this.frameTime = 0;
					this.frameCount = 0
				}
			};
			return e
		}());
		q.TimeKeeper = p
	})(d = c.core || (c.core = {}))
})(pixi_spine || (pixi_spine = {}));
(function(h) {
	function j(b) {
		var a = PIXI.loaders.Resource.TYPE;
		if (a) {
			return b.type === a.JSON
		}
		return b.isJson
	}

	function f() {
		return function(t, s) {
			if (!t.data || !j(t) || !t.data.bones) {
				return s()
			}
			var e = t.metadata ? t.metadata.spineAtlas : null;
			if (e === false) {
				return s()
			}
			if (e && e.pages) {
				var r = new h.core.SkeletonJson(new h.core.AtlasAttachmentLoader(e));
				var v = r.readSkeletonData(t.data);
				t.spineData = v;
				t.spineAtlas = e;
				return s()
			}
			var d = ".atlas";
			if (t.metadata && t.metadata.spineAtlasSuffix) {
				d = t.metadata.spineAtlasSuffix
			}
			var a = t.url.substr(0, t.url.lastIndexOf(".")) + d;
			a = a.replace(this.baseUrl, "");
			var c = {
				crossOrigin: t.crossOrigin,
				xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.TEXT,
				metadata: t.metadata ? t.metadata.spineMetadata : null,
				parentResource: t
			};
			var u = {
				crossOrigin: t.crossOrigin,
				metadata: t.metadata ? t.metadata.imageMetadata : null,
				parentResource: t
			};
			var q = t.url.substr(0, t.url.lastIndexOf("/") + 1);
			q = q.replace(this.baseUrl, "");
			var b = i(this, t.name + "_atlas_page_", q, u);
			this.add(t.name + "_atlas", a, c, function(k) {
				new h.core.TextureAtlas(k.xhr.responseText, b, function(l) {
					var m = new h.core.SkeletonJson(new h.core.AtlasAttachmentLoader(l));
					var n = m.readSkeletonData(t.data);
					t.spineData = n;
					t.spineAtlas = l;
					s()
				})
			})
		}
	}
	h.atlasParser = f;

	function i(d, a, c, b) {
		if (c && c.lastIndexOf("/") !== (c.length - 1)) {
			c += "/"
		}
		return function(p, e) {
			var n = a + p;
			var o = c + p;
			d.add(n, o, b, function(k) {
				e(k.texture.baseTexture)
			})
		}
	}
	h.imageLoaderAdapter = i;

	function g(a, b) {
		if (a && a.lastIndexOf("/") !== (a.length - 1)) {
			a += "/"
		}
		return function(d, c) {
			c(PIXI.BaseTexture.fromImage(d, b))
		}
	}
	h.syncImageLoaderAdapter = g;
	PIXI.loaders.Loader.addPixiMiddleware(f);
	PIXI.loader.use(f())
})(pixi_spine || (pixi_spine = {}));
(function(i) {
	i.core.Bone.yDown = true;
	var l = [0, 0, 0];
	var g = (function(a) {
		__extends(b, a);

		function b(c) {
			return a.call(this, c) || this
		}
		return b
	}(PIXI.Sprite));
	i.SpineSprite = g;
	var j = (function(b) {
		__extends(a, b);

		function a(e, n, f, c, d) {
			return b.call(this, e, n, f, c, d) || this
		}
		return a
	}(PIXI.mesh.Mesh));
	i.SpineMesh = j;
	var h = (function(a) {
		__extends(b, a);

		function b(f) {
			var e = a.call(this) || this;
			e.hackTextureBySlotName = function(p, m, o) {
				if (m === void 0) {
					m = null
				}
				if (o === void 0) {
					o = null
				}
				var q = this.skeleton.findSlotIndex(p);
				if (q == -1) {
					return false
				}
				return this.hackTextureBySlotIndex(q, m, o)
			};
			if (!f) {
				throw new Error("The spineData param is required.")
			}
			if ((typeof f) === "string") {
				throw new Error('spineData param cant be string. Please use spine.Spine.fromAtlas("YOUR_RESOURCE_NAME") from now on.')
			}
			e.spineData = f;
			e.skeleton = new i.core.Skeleton(f);
			e.skeleton.updateWorldTransform();
			e.stateData = new i.core.AnimationStateData(f);
			e.state = new i.core.AnimationState(e.stateData);
			e.slotContainers = [];
			for (var u = 0, w = e.skeleton.slots.length; u < w; u++) {
				var c = e.skeleton.slots[u];
				var n = c.attachment;
				var d = new PIXI.Container();
				e.slotContainers.push(d);
				e.addChild(d);
				if (n instanceof i.core.RegionAttachment) {
					var v = n.region.name;
					var y = e.createSprite(c, n, v);
					c.currentSprite = y;
					c.currentSpriteName = v;
					d.addChild(y)
				} else {
					if (n instanceof i.core.MeshAttachment) {
						var x = e.createMesh(c, n);
						c.currentMesh = x;
						c.currentMeshName = n.name;
						d.addChild(x)
					} else {
						continue
					}
				}
			}
			e.autoUpdate = true;
			e.tintRgb = new Float32Array([1, 1, 1]);
			return e
		}
		Object.defineProperty(b.prototype, "autoUpdate", {
			get: function() {
				return (this.updateTransform === b.prototype.autoUpdateTransform)
			},
			set: function(c) {
				this.updateTransform = c ? b.prototype.autoUpdateTransform : PIXI.Container.prototype.updateTransform
			},
			enumerable: true,
			configurable: true
		});
		Object.defineProperty(b.prototype, "tint", {
			get: function() {
				return PIXI.utils.rgb2hex(this.tintRgb)
			},
			set: function(c) {
				this.tintRgb = PIXI.utils.hex2rgb(c, this.tintRgb)
			},
			enumerable: true,
			configurable: true
		});
		b.prototype.update = function(e) {
			this.state.update(e);
			this.state.apply(this.skeleton);
			this.skeleton.updateWorldTransform();
			var I = this.skeleton.drawOrder;
			var J = this.skeleton.slots;
			for (var O = 0, S = I.length; O < S; O++) {
				this.children[O] = this.slotContainers[I[O].data.index]
			}
			var N = this.tintRgb[0];
			var X = this.tintRgb[1];
			var P = this.tintRgb[2];
			for (O = 0, S = J.length; O < S; O++) {
				var V = J[O];
				var L = V.attachment;
				var T = this.slotContainers[O];
				if (!L) {
					T.visible = false;
					continue
				}
				var W = L.color;
				if (L instanceof i.core.RegionAttachment) {
					var U = L.region;
					if (U) {
						if (V.currentMesh) {
							V.currentMesh.visible = false;
							V.currentMesh = null;
							V.currentMeshName = undefined
						}
						var d = U;
						if (!V.currentSpriteName || V.currentSpriteName !== d.name) {
							var M = d.name;
							if (V.currentSprite) {
								V.currentSprite.visible = false
							}
							V.sprites = V.sprites || {};
							if (V.sprites[M] !== undefined) {
								V.sprites[M].visible = true
							} else {
								var c = this.createSprite(V, L, M);
								T.addChild(c)
							}
							V.currentSprite = V.sprites[M];
							V.currentSpriteName = M
						}
					}
					if (T.transform) {
						var H = T.transform;
						var R = H;
						var f = void 0;
						if (R.matrix2d) {
							f = R.matrix2d;
							R._dirtyVersion++;
							R.version = R._dirtyVersion;
							R.isStatic = true;
							R.operMode = 0
						} else {
							if (R.position) {
								H = new PIXI.TransformBase();
								T.transform = H
							}
							f = H.localTransform
						}
						V.bone.matrix.copy(f)
					} else {
						var Q = T.localTransform || new PIXI.Matrix();
						V.bone.matrix.copy(Q);
						T.localTransform = Q;
						T.displayObjectUpdateTransform = k
					}
					l[0] = N * V.color.r * W.r;
					l[1] = X * V.color.g * W.g;
					l[2] = P * V.color.b * W.b;
					V.currentSprite.tint = PIXI.utils.rgb2hex(l);
					V.currentSprite.blendMode = V.blendMode
				} else {
					if (L instanceof i.core.MeshAttachment) {
						if (V.currentSprite) {
							V.currentSprite.visible = false;
							V.currentSprite = null;
							V.currentSpriteName = undefined;
							if (T.transform) {
								T.transform = new PIXI.TransformStatic()
							} else {
								T.localTransform = new PIXI.Matrix();
								T.displayObjectUpdateTransform = PIXI.DisplayObject.prototype.updateTransform
							}
						}
						if (!V.currentMeshName || V.currentMeshName !== L.name) {
							var n = L.name;
							if (V.currentMesh) {
								V.currentMesh.visible = false
							}
							V.meshes = V.meshes || {};
							if (V.meshes[n] !== undefined) {
								V.meshes[n].visible = true
							} else {
								var Y = this.createMesh(V, L);
								T.addChild(Y)
							}
							V.currentMesh = V.meshes[n];
							V.currentMeshName = n
						}
						L.computeWorldVertices(V, V.currentMesh.vertices);
						if (PIXI.VERSION[0] !== "3") {
							var K = V.currentMesh.tintRgb;
							K[0] = N * V.color.r * W.r;
							K[1] = X * V.color.g * W.g;
							K[2] = P * V.color.b * W.b
						}
						V.currentMesh.blendMode = V.blendMode
					} else {
						T.visible = false;
						continue
					}
				}
				T.visible = true;
				T.alpha = V.color.a
			}
		};
		b.prototype.setSpriteRegion = function(c, e, d) {
			e.region = d;
			e.texture = d.texture;
			if (!d.size) {
				e.scale.x = c.scaleX * c.width / d.originalWidth;
				e.scale.y = -c.scaleY * c.height / d.originalHeight
			} else {
				e.scale.x = d.size.width / d.originalWidth;
				e.scale.y = -d.size.height / d.originalHeight
			}
		};
		b.prototype.setMeshRegion = function(d, c, e) {
			c.region = e;
			c.texture = e.texture;
			d.updateUVs(e, c.uvs);
			c.dirty++
		};
		b.prototype.autoUpdateTransform = function() {
			if (b.globalAutoUpdate) {
				this.lastTime = this.lastTime || Date.now();
				var c = (Date.now() - this.lastTime) * 0.001;
				this.lastTime = Date.now();
				this.update(c)
			} else {
				this.lastTime = 0
			}
			PIXI.Container.prototype.updateTransform.call(this)
		};
		b.prototype.createSprite = function(p, c, o) {
			var d = c.region;
			if (p.tempAttachment === c) {
				d = p.tempRegion;
				p.tempAttachment = null;
				p.tempRegion = null
			}
			var e = d.texture;
			var f = new g(e);
			f.rotation = c.rotation * i.core.MathUtils.degRad;
			f.anchor.x = 0.5;
			f.anchor.y = 0.5;
			f.position.x = c.x;
			f.position.y = c.y;
			f.alpha = c.color.a;
			f.region = c.region;
			this.setSpriteRegion(c, f, c.region);
			p.sprites = p.sprites || {};
			p.sprites[o] = f;
			return f
		};
		b.prototype.createMesh = function(c, d) {
			var e = d.region;
			if (c.tempAttachment === d) {
				e = c.tempRegion;
				c.tempAttachment = null;
				c.tempRegion = null
			}
			var f = new j(e.texture, new Float32Array(d.regionUVs.length), new Float32Array(d.regionUVs.length), new Uint16Array(d.triangles), PIXI.mesh.Mesh.DRAW_MODES.TRIANGLES);
			f.canvasPadding = 1.5;
			f.alpha = d.color.a;
			f.region = d.region;
			this.setMeshRegion(d, f, e);
			c.meshes = c.meshes || {};
			c.meshes[d.name] = f;
			return f
		};
		b.prototype.hackTextureBySlotIndex = function(o, e, f) {
			if (e === void 0) {
				e = null
			}
			if (f === void 0) {
				f = null
			}
			var p = this.skeleton.slots[o];
			if (!p) {
				return false
			}
			var c = p.attachment;
			var d = c.region;
			if (e) {
				d = new i.core.TextureRegion();
				d.texture = e;
				d.size = f
			}
			if (p.currentSprite && p.currentSprite.region != d) {
				this.setSpriteRegion(c, p.currentSprite, d);
				p.currentSprite.region = d
			} else {
				if (p.currentMesh && p.currentMesh.region != d) {
					this.setMeshRegion(c, p.currentMesh, d)
				} else {
					p.tempRegion = d;
					p.tempAttachment = c
				}
			}
			return true
		};
		return b
	}(PIXI.Container));
	h.globalAutoUpdate = true;
	i.Spine = h;

	function k() {
		var a = this.parent.worldTransform;
		var b = this.worldTransform;
		var c = this.localTransform;
		b.a = c.a * a.a + c.b * a.c;
		b.b = c.a * a.b + c.b * a.d;
		b.c = c.c * a.a + c.d * a.c;
		b.d = c.c * a.b + c.d * a.d;
		b.tx = c.tx * a.a + c.ty * a.c + a.tx;
		b.ty = c.tx * a.b + c.ty * a.d + a.ty;
		this.worldAlpha = this.alpha * this.parent.worldAlpha;
		this._currentBounds = null
	}
})(pixi_spine || (pixi_spine = {}));
PIXI.spine = pixi_spine;
PIXI.settings.RETINA_PREFIX = /@(.+?)x/g;
PIXI.utils.getResolutionOfUrl = function(f) {
	var d = PIXI.settings.RETINA_PREFIX.exec(f),
		e = 1;
	while (d !== null) {
		e = parseFloat(d[1]);
		d = PIXI.settings.RETINA_PREFIX.exec(f)
	}
	return e
};
PIXI.VideoBaseTexture.prototype._onCanPlay = function() {
	this.hasLoaded = true;
	if (this.source) {
		this.source.removeEventListener("canplay", this._onCanPlay);
		this.source.removeEventListener("canplaythrough", this._onCanPlay);
		this.width = this.source.videoWidth;
		this.height = this.source.videoHeight;
		if (!this.__loaded) {
			this.__loaded = true;
			this.emit("loaded", this)
		}
	}
};
PIXI.interaction.InteractionManager.prototype.addEvents = function() {
	if (!this.interactionDOMElement) {
		return
	}
	PIXI.ticker.shared.add(this.update, this);
	if (window.navigator.msPointerEnabled) {
		this.interactionDOMElement.style["-ms-content-zooming"] = "none";
		this.interactionDOMElement.style["-ms-touch-action"] = "none"
	}
	window.document.addEventListener("mousemove", this.onPointerMove, true);
	window.document.addEventListener("mousedown", this.onPointerDown, true);
	window.document.addEventListener("mouseout", this.onPointerOut, true);
	window.document.addEventListener("mouseover", this.onPointerOver, true);
	window.addEventListener("mouseup", this.onPointerUp, true);
	window.addEventListener("touchstart", this.onPointerDown, true);
	window.addEventListener("touchend", this.onPointerUp, true);
	window.addEventListener("touchmove", this.onPointerMove, true);
	if (window.navigator.pointerEnabled) {
		window.document.addEventListener("pointerdown", this.onPointerDown, true);
		window.document.addEventListener("pointermove", this.onPointerMove, true);
		window.document.addEventListener("pointerup", this.onPointerUp, true)
	} else {
		if (window.navigator.msPointerEnabled) {
			window.document.addEventListener("MSPointerDown", this.onPointerDown, true);
			window.document.addEventListener("MSPointerMove", this.onPointerMove, true);
			window.document.addEventListener("MSPointerUp", this.onPointerUp, true)
		}
	}
	this.eventsAdded = true
};
PIXI.interaction.InteractionManager.prototype.removeEvents = function() {
	if (!this.interactionDOMElement) {
		return
	}
	PIXI.ticker.shared.remove(this.update);
	if (window.navigator.msPointerEnabled) {
		this.interactionDOMElement.style["-ms-content-zooming"] = "";
		this.interactionDOMElement.style["-ms-touch-action"] = ""
	}
	window.document.removeEventListener("mousemove", this.onPointerMove, true);
	window.document.removeEventListener("mousedown", this.onPointerDown, true);
	window.document.removeEventListener("mouseout", this.onPointerOut, true);
	window.document.removeEventListener("mouseover", this.onPointerOver, true);
	window.removeEventListener("mouseup", this.onPointerUp, true);
	window.removeEventListener("touchstart", this.onPointerDown, true);
	window.removeEventListener("touchend", this.onPointerUp, true);
	window.removeEventListener("touchmove", this.onPointerMove, true);
	if (window.navigator.pointerEnabled) {
		window.document.removeEventListener("pointerdown", this.onPointerDown, true);
		window.document.removeEventListener("pointermove", this.onPointerMove, true);
		window.document.removeEventListener("pointerup", this.onPointerUp, true)
	} else {
		if (window.navigator.msPointerEnabled) {
			window.document.removeEventListener("MSPointerDown", this.onPointerDown, true);
			window.document.removeEventListener("MSPointerMove", this.onPointerMove, true);
			window.document.removeEventListener("MSPointerUp", this.onPointerUp, true)
		}
	}
	this.interactionDOMElement = null;
	this.eventsAdded = false
};
PIXI.interaction.InteractionManager.prototype.onPointerDown = function onPointerDown(j) {
	var o = this.normalizeToPointerData(j);
	var k = o.length;
	for (var p = 0; p < k; p++) {
		var n = o[p];
		var m = this.getInteractionDataForPointerId(n);
		var i = this.configureInteractionEventForDOMEvent(this.eventData, n, m);
		i.data.originalEvent = j;
		this.processInteractive(i, this.renderer._lastObjectRendered, this.processPointerDown, true);
		this.emit("pointerdown", i);
		if (n.pointerType === "touch") {
			this.emit("touchstart", i)
		} else {
			if (n.pointerType === "mouse") {
				var l = n.button === 2 || n.which === 3;
				this.emit(l ? "rightdown" : "mousedown", this.eventData)
			}
		}
	}
};
Object.defineProperties(PIXI.Container.prototype, {
	width: {
		get: function() {
			return this.scale.x * this.getBounds(true).width
		}
	},
	height: {
		get: function() {
			return this.scale.y * this.getBounds(true).height
		}
	},
	y: {
		get: function() {
			if (this.position) {
				return this.position.y
			}
			if (this.transform) {
				if (this.transform.position) {
					return this.transform.position.y
				}
				if (this.transform.worldTransform) {
					return this.transform.worldTransform.ty
				}
			}
			return this.getBounds(true).y
		},
		set: function(b) {
			this.transform.position.y = b
		}
	}
});
PIXI.Polygon.prototype.contains = function contains(i, j) {
	var s = false;
	var v = this.points.length / 2;
	for (var p = 0, q = v - 1; p < v; q = p++) {
		var n = this.points[p * 2];
		var r = this.points[p * 2 + 1];
		var o = this.points[q * 2];
		var t = this.points[q * 2 + 1];
		var u = r > j !== t > j && i < (o - n) * ((j - r) / (t - r)) + n;
		if (u) {
			s = !s
		}
	}
	return s
};
Sys.ns("cloudkid");
cloudkid.Emitter = function(d, e, f) {
	return new PIXI.particles.Emitter(d, e, f)
};
PIXI.spine.core.AnimationState.prototype.setAnimationByName = function(f, d, e) {
	return this.setAnimation(f, d, e)
};
PIXI.spine.core.AnimationState.prototype.addAnimationByName = function(g, h, f, e) {
	return this.addAnimation(g, h, f, e)
};
PIXI.spine.core.AnimationState.prototype.hasAnimationByName = function(d) {
	var c = this.data.skeletonData.findAnimation(d);
	return c !== null
};
Sys.ns("Sys.utils");
Sys.utils.ObjectPool = {
	_registry: {},
	_pool: {},
	inRegistry: function(b) {
		if (!Sys.isDefined(this._registry[b])) {
			return false
		} else {
			return true
		}
	},
	growPool: function(i, k) {
		if (k === 0) {
			return
		}
		if (!this.inRegistry(i)) {
			return
		}
		var l = this._registry[i];
		var g = this._pool[i];
		var j;
		for (var h = 0; h < k; h++) {
			j = l.constructFunction.apply(l.constructScope, l.constructParams);
			j.poolId = i;
			g.push(j);
			l.objectsInPool += 1
		}
		if (Sys.isDefined(l.maxWarningCount)) {
			if (l.objectsInPool > l.maxWarningCount) {}
		}
	},
	getObjectFromPool: function(b) {
		if (!this.inRegistry(b)) {
			return
		}
		if (this._pool[b].length === 0) {
			this.growPool(b, this._registry[b].increment)
		}
		return this._pool[b].pop()
	},
	returnObjectToPool: function(b) {
		if (!Sys.isDefined(b.poolId)) {
			return
		}
		if (!this.inRegistry(b.poolId)) {
			return
		}
		if (!Sys.isDefined(b)) {}
		return this._pool[b.poolId].push(b)
	},
	registerObjectForPooling: function(j, h, k, m, n, i, l) {
		if (this._registry[j] === j) {}
		this._registry[j] = {};
		this._registry[j].id = j;
		this._registry[j].constructScope = h;
		this._registry[j].constructFunction = k;
		this._registry[j].constructParams = m ? m : [];
		this._registry[j].initialObjectCount = n ? n : 0;
		this._registry[j].increment = i ? i : 1;
		this._registry[j].maxWarningCount = l ? l : undefined;
		this._registry[j].objectsInPool = 0;
		this._pool[j] = [];
		this.growPool(this._registry[j].id, n)
	}
};
Sys.ns("Sys.utils");
Sys.utils.repeatString = function(c, d) {
	if (c.repeat) {
		return c.repeat(d)
	} else {
		return new Array(d + 1).join(c)
	}
};
Sys.override(Core.Scaling, {});
Sys.ns("Integration");
Integration.OpenBetResourceHandlerOverride = {
	INTEGRATION: "openbet",
	determineSessionID: function() {
		return this.performServletCall(Resources.readData("queryData").callbackurl, "openbet")
	},
	handleServletResponse: function(g) {
		var j = this,
			i = {},
			l = Sys.utils.qsToObj(g.responseText, false),
			h = Resources.readData("queryData"),
			k = l.pluginURL;
		i["openbet.rgitoken"] = l.rgitoken;
		i["openbet.user_id"] = h["openbet.user_id"];
		i["openbet.game_code"] = h["openbet.game_code"];
		i["openbet.channel"] = j.getOpenBetChannel();
		i["openbet.user_type"] = h["openbet.user_type"];
		i["openbet.affiliate"] = Sys.isDefined(h["openbet.affiliate"]) ? h["openbet.affiliate"] : "";
		i["openbet.rgs_site"] = "NetEnt site";
		i["openbet.promotions"] = "NO";
		Sys.applyIf(Resources.readData("extraParams"), i);
		j.storeSessionID("NULL");
		if (Sys.isDefined(k)) {
			Resources.storeData("pluginURL", decodeURIComponent(k))
		} else {
			j.determinePluginURL()
		}
	},
	getOpenBetChannel: function() {
		return Resources.readData("queryData")["openbet.channel"]
	},
	_gameServerInitComplete: Loader.ResourceHandler.prototype.gameServerInitComplete,
	gameServerInitComplete: function(d) {
		var c = Sys.utils.parseQueryStringToNestedObject(d.responseText);
		Resources.storeData("gameServerInitResponse", Sys.utils.qsToObj(d.responseText));
		Resources.storeData("gameServerInitResponseObject", c);
		this.storeSessionID(c.openbet.sessionid);
		Resources.storeData("unParsedGameServerInitResponse", d.responseText);
		Resources.storeData("historyUrl", this.buildHistoryUrl())
	}
};
Integration.OpenBetLanguageManagerOverride = {
	_getText: Core.LanguageManager.prototype.getText,
	getText: function(g, e) {
		var h = this,
			f = "OB" + g;
		if (h.hasText(f)) {
			return h._getText(f, e)
		}
		return h._getText(g, e)
	}
};
Integration.applyOpenBetOverrides = function() {
	Sys.override(Loader.ResourceHandler, Integration.OpenBetResourceHandlerOverride);
	Integration.applyOpenBetLanguageOverrides()
};
Integration.applyOpenBetLanguageOverrides = function() {
	if (Platform.isDesktopDevice) {
		Sys.override(Core.LanguageManager, Integration.OpenBetLanguageManagerOverride)
	}
};
if (Sys.openBetMode) {
	Integration.applyOpenBetOverrides()
} else {
	if (Sys.openBetPlayForFunMode) {
		Integration.applyOpenBetLanguageOverrides()
	}
}
Sys.ns("Integration.GCM");
Integration.GCM.availableOptions = ["MUTE", "TURBO"];
window.setViewportHidden = function(d) {
	var f = document.getElementById("viewport"),
		e;
	if (f !== null && Sys.isDefined(f)) {
		e = 1;
		if (d) {
			e = 0.01
		}
		f.style.opacity = e
	}
};
Integration.GCM.Proxy = {
	MODULE_NAME: "GCMProxy",
	gcmCoreInstance: undefined,
	exclusivityEnable: false,
	inIdleState: false,
	multiChoiceGameDialogsQueue: [],
	freeBetBalance: 0,
	latestWin: 0,
	basicGamePanelEnabled: true,
	constructor: function() {
		var d = this,
			f, e;
		Integration.GCM.Proxy.superclass.constructor.call(d);
		Sys.override(Loader.ResourceHandler, {
			getOpenBetChannel: d.getGcmChannel.bind(d)
		});
		Sys.override(Environment, {
			goToLobby: d.goToLobby.bind(d)
		});
		d.exposedInterface = {
			gameRevealed: d.gameRevealed.bind(d),
			gcmReady: d.gcmReady.bind(d),
			optionHasChanged: d.optionHasChanged.bind(d),
			balancesHasChanged: d.balancesHasChanged.bind(d),
			toggleMute: d.toggleMute.bind(d),
			configReady: d.configReady.bind(d),
			resume: d.resume.bind(d),
			updateLoadingBar: d.simulateLoading.bind(d)
		};
		f = com.openbet.gcmBridge;
		f.init(document.body, window.location.href, d.exposedInterface);
		e = d.getIframe();
		if (e !== null && Sys.isDefined(e)) {
			e.style.zIndex = 10
		}
		d.on({
			"notify:resourceHandler.gameAssetsLoaded": d.onGameLoadedSuccessfully,
			"request:gcmProxy.updateProgress": d.simulateLoading,
			"notify:stateHandler.leavingBeforeLoaderCloseState": d.onGameResourcesLoaded,
			"notify:resourceHandler.animationComplete": d.onLoadAnimationClosed,
			"notify:loader.closed": d.onLoadAnimationClosed,
			"notify:stateHandler.enteringSpinningState": d.onSpinStart,
			"notify:stateHandler.enteringIdleState": d.onEnteringIdleState,
			"notify:stateHandler.leavingIdleState": d.onLeavingIdleState,
			"notify:settingsManager.settingChanged": d.onSettingChanged,
			"notify:responseParser.responseParsed": d.processServerResponse,
			"notify:moneyManager.betChanged": d.updateBetInUI,
			"notify:moneyManager.balanceReloaded": d.updateBalanceInUI,
			"request:disableBasicGamePanel": d.disableBasicGamePanel,
			"request:enableBasicGamePanel": d.enableBasicGamePanel,
			"request:gcmProxy.handleError": d.handleError,
			"request:cashField.showWin": d.onShowWin
		})
	},
	goToLobby: function() {
		var b = this;
		b.handleError({
			category: "CRITICAL",
			severity: "ERROR",
			errorCode: "CRITICAL_ERROR",
			message: Services.languageManager.getText(Language.Keys.btn_casino),
			extraParameters: {
				originalError: "criticalError",
				originalTitle: Services.languageManager.getText(Language.Keys.btn_casino),
				reason: 3,
				suppressMessage: true
			}
		})
	},
	getIframe: function() {
		return document.querySelector("iframe[name='commonUIIFrame']")
	},
	getGcmChannel: function() {
		return this.gcmCoreInstance.getConfig().channel
	},
	onGameLoadedSuccessfully: function() {
		this.setupAccount();
		setViewportHidden(false)
	},
	setupAccount: function() {
		var h = Resources.readData("gameServerInitResponse"),
			k = h.playercurrencyiso,
			l = Sys.utils.XMLHelper.getMoneyFormatFromXML(Resources.readData("moneyformat_player"), k),
			m = {
				ccy_code: k,
				ccy_decimal_separator: l.decimalDivider,
				ccy_thousand_separator: l.thousandsDivider
			},
			i = Number(h.credit),
			j = Sys.isDefined(h["openbet.freebets"]) ? Number(h["openbet.freebets"]) : 0,
			n = {
				CASH: {
					amount: i
				},
				FREEBET: {
					amount: j
				}
			};
		this.gcmCoreInstance.accountInit(m, n);
		this.gcmCoreInstance.stakeUpdate(0);
		this.gcmCoreInstance.paidUpdate(0)
	},
	onGameResourcesLoaded: function() {
		this.gameResourcesLoaded = true;
		this.tryToFinishGCMInitialization()
	},
	onLoadAnimationClosed: function() {
		this.loadAnimationClosed = true;
		this.tryToFinishGCMInitialization()
	},
	tryToFinishGCMInitialization: function() {
		var b = this;
		if (b.gameResourcesLoaded && b.loadAnimationClosed) {
			b.updateBalanceInUI();
			b.updateBetInUI();
			b.updatePayoutInUI();
			b.registerAvailableOptions();
			b.gcmCoreInstance.gameReady();
			b.fireEvent("request:scaling.update")
		}
	},
	registerAvailableOptions: function() {
		var d = this,
			c = d.gcmCoreInstance;
		Sys.each(Integration.GCM.availableOptions, function(a) {
			c.regOption(a)
		});
		d.hasRegisteredOptions = true;
		d.updateTurboSettingInUI();
		d.updateAudioSettingInUI()
	},
	onSpinStart: function() {
		this.hideCommonUI()
	},
	hideCommonUI: function() {
		this.gcmCoreInstance.gameAnimationStart()
	},
	processServerResponse: function(f) {
		var d = this,
			e = f.openbet;
		d.freeBetBalance = (Sys.isDefined(e) && Sys.isDefined(e.freebets)) ? Number(e.freebets) : d.freeBetBalance;
		d.latestWin = Sys.isDefined(f.wins) ? f.wins.centsTotal : 0
	},
	onShowWin: function() {
		this.updateBalanceInUI();
		this.updatePayoutInUI()
	},
	onEnteringIdleState: function() {
		var b = this;
		b.inIdleState = true;
		b.showCommonUI()
	},
	showCommonUI: function() {
		this.gcmCoreInstance.gameAnimationComplete(this.enableUI)
	},
	enableUI: function() {},
	updateBalanceInUI: function() {
		var b = this.getBalances();
		this.gcmCoreInstance.balancesUpdate(b)
	},
	getBalances: function() {
		var d = Services.moneyManager.getBalanceCents() / 100,
			c = this.freeBetBalance / 100;
		return {
			CASH: {
				amount: d - c
			},
			FREEBET: {
				amount: c
			}
		}
	},
	updatePayoutInUI: function() {
		this.gcmCoreInstance.paidUpdate(this.latestWin / 100)
	},
	onLeavingIdleState: function() {
		this.inIdleState = false;
		this.gcmCoreInstance.paidUpdate(0);
		this.updateBalanceInUI()
	},
	onSettingChanged: function(b) {
		if (b === "betLevel" || b === "denomination" || b === "betLines") {
			this.updateBetInUI()
		} else {
			if (b === "quickSpin") {
				this.updateTurboSettingInUI()
			} else {
				if (b === "volume") {
					this.updateAudioSettingInUI()
				}
			}
		}
	},
	updateBetInUI: function() {
		var b = Services.moneyManager.getBetCents() / 100;
		if (Sys.isNumber(b)) {
			this.gcmCoreInstance.stakeUpdate(b)
		}
	},
	updateTurboSettingInUI: function() {
		var d = this,
			c = Services.settingsManager.getSetting("quickSpin") === true;
		if (d.hasRegisteredOptions && Integration.GCM.availableOptions.contains("TURBO")) {
			d.gcmCoreInstance.optionHasChanged("TURBO", "GAME", c)
		}
	},
	updateAudioSettingInUI: function() {
		var c = this,
			d = Services.settingsManager.getSetting("volume") === 0;
		if (c.hasRegisteredOptions && Integration.GCM.availableOptions.contains("MUTE")) {
			c.exposedInterface.toggleMute(d)
		}
	},
	handleError: function(j) {
		var f = this,
			g, h, i;
		f.disableUI();
		g = true;
		if (j.RGIError) {
			h = com.openbet.gcm.xmlutil;
			i = h.getErrorInfoFromRGIXml(decodeURIComponent(j.RGIXML));
			f.shouldRevertRound = i.errorAction === "VOID_TXN";
			f.gcmCoreInstance.handleServerError(i)
		} else {
			j = Sys.applyIf(j, {
				category: "NON_RECOVERABLE_ERROR",
				severity: "ERROR",
				message: "An error occurred",
				errorCode: "CLIENTERROR"
			});
			if (j.category === "MULTI_CHOICE_DIALOG") {
				if (Sys.isDefined(f.actionsOfCurrentDialog)) {
					g = false;
					f.multiChoiceGameDialogsQueue.push(j)
				} else {
					f.actionsOfCurrentDialog = j.actions;
					if (!f.exclusivityEnable) {
						f.fireEvent("request:userInputManager.activateExclusivity", f.MODULE_NAME);
						f.fireEvent("request:quickSettingsMenu.externalDeactivate", f.MODULE_NAME);
						f.fireEvent("request:spinButton.hide", f.MODULE_NAME);
						f.exclusivityEnable = true
					}
				}
			}
			if (g) {
				f.shouldRevertRound = j.revert === true;
				f.gcmCoreInstance.handleError(j.category, j.severity, j.errorCode, j.message, j.extraParameters)
			}
		}
	},
	disableUI: function() {},
	gcmReady: function(b) {
		this.gcmCoreInstance = b;
		this.simulateLoading(0)
	},
	configReady: function() {
		var d = this,
			c = !d.isDemoMode();
		if ((c && Sys.openBetMode) || (!c && !Sys.openBetMode)) {
			initializeGame({
				loaderProgressCallBack: d.simulateLoading.bind(d)
			})
		} else {
			if (c && !Sys.openBetMode) {
				d.handleError({
					category: "LOGIN_ERROR",
					severity: "ERROR",
					message: "ACCOUNT_UNAVAILABLE",
					errorCode: "ACCOUNT_UNAVAILABLE",
					extraParameters: {
						originalError: 70,
						originalTitle: "MGaccountUnavailable"
					}
				})
			} else {
				Environment.goToLobby()
			}
		}
	},
	isDemoMode: function() {
		return this.gcmCoreInstance.getConfig().playMode === "demo"
	},
	simulateLoading: function(d) {
		var c = Sys.utils.toInt(d);
		if (c < 100) {
			this.gcmCoreInstance.loadProgressUpdate(c)
		} else {
			this.gcmCoreInstance.loadProgressUpdate(99);
			this.hideCommonUI();
			this.fireEvent("notify:gcmProxy.animationComplete")
		}
	},
	gameRevealed: function() {
		this.configureGameForGcm()
	},
	configureGameForGcm: function() {
		this.fireEvent("request:homeButton.hidePermanently")
	},
	optionHasChanged: function(d, f) {
		var e = this;
		switch (d) {
			case "MUTE":
				e.toggleSound(f);
				break;
			case "TURBO":
				e.toggleQuickSpin(f);
				break;
			case "GAME_PREFERENCES":
				if (Platform.isDesktopDevice) {
					e.toggleSettingsWindowDesktop("gameSettings")
				} else {
					e.toggleSettingsWindow(f, "betSettings")
				}
				break;
			case "PAYTABLE":
				e.toggleSettingsWindow(f, "paytable");
				break;
			case "ABOUT":
				if (e.inIdleState) {
					e.toggleSettingsWindow(f, "gameRules")
				}
				break;
			default:
		}
	},
	disableBasicGamePanel: function() {
		this.basicGamePanelEnabled = false
	},
	enableBasicGamePanel: function() {
		this.basicGamePanelEnabled = true
	},
	toggleSettingsWindowDesktop: function(b) {
		this.fireEvent("request:" + b + ".toggle")
	},
	toggleSettingsWindow: function(d, c) {
		if (!this.basicGamePanelEnabled) {
			return
		}
		if (d) {
			this.fireEvent("request:" + c + ".show")
		} else {
			this.fireEvent("request:settingsWindow.close")
		}
	},
	toggleSound: function(b) {
		Services.settingsManager.storeSetting("volume", b ? 0 : 1)
	},
	toggleQuickSpin: function(c) {
		var d;
		this.fireEvent("request:settingsManager.storeData", "quickSpin", c);
		d = Services.settingsManager.getSetting("quickSpin");
		if (d !== c) {
			this.gcmCoreInstance.optionHasChanged("TURBO", "GAME", d)
		}
	},
	balancesHasChanged: function(d) {
		var e, f;
		if (this.inIdleState) {
			e = parseInt(Math.round(d.CASH.amount * 100), 10);
			f = parseInt(Math.round(d.FREEBET.amount * 100), 10);
			Services.moneyManager.setBalance(e + f);
			this.freeBetBalance = f
		} else {
			Sys.utils.reload()
		}
	},
	toggleMute: function(b) {
		this.gcmCoreInstance.optionHasChanged("MUTE", "GAME", b)
	},
	resume: function(h) {
		var i = this,
			f = h,
			g = Sys.isArray(i.actionsOfCurrentDialog),
			j;
		try {
			if (g && i.actionsOfCurrentDialog.length === 1 && !Sys.isDefined(f)) {
				f = 0
			}
			if (g && Sys.isDefined(i.actionsOfCurrentDialog[f])) {
				i.actionsOfCurrentDialog[f]()
			} else {
				if (i.shouldRevertRound) {
					i.fireEvent("request:moneyManager.revertBet");
					i.fireEvent("request:spin.activateDefaultOutcome", "basic");
					i.updateBalanceInUI()
				}
			}
		} finally {
			i.actionsOfCurrentDialog = undefined
		}
		if (i.multiChoiceGameDialogsQueue.length > 0) {
			j = i.multiChoiceGameDialogsQueue.shift();
			i.handleError(j)
		} else {
			i.exclusivityEnable = false;
			i.fireEvent("request:userInputManager.deactivateExclusivity", i.MODULE_NAME);
			i.fireEvent("request:quickSettingsMenu.externalActivate", i.MODULE_NAME);
			i.fireEvent("request:spinButton.show", i.MODULE_NAME)
		}
	}
};
Integration.GCM.Proxy = Sys.extend(Sys.Observable, Integration.GCM.Proxy, "Integration.GCM.Proxy");
if (Sys.isGcmEnabled) {
	setViewportHidden(true);
	Sys.utils.addCSSClassToBody("gcmMode");
	Sys.utils.loadJS({
		url: "../../../gcm/js/gcmBridge.js"
	}).then(function() {
		new Integration.GCM.Proxy()
	})
}
Sys.ns("Integration.GCM");
Integration.ErrorHandler = {
	handleRequestError: function(h) {
		var g = this,
			f = Sys.utils.getResponseParameter("openbet.error.xml", h),
			e;
		if (!Sys.utils.httpRequestIsOK(h)) {
			e = "http"
		} else {
			if (Sys.isDefined(f)) {
				this.fireEvent("request:gcmProxy.handleError", {
					RGIError: true,
					RGIXML: f.replace(/\+/g, " ")
				})
			} else {
				e = "server"
			}
		}
		if (!Sys.isDefined(e) || e === g.readStatus()) {
			return
		}
		g[g.errorStatus[e]]();
		g.setStatus(e)
	}
};
Integration.GCM.ResourceHandler = {
	slownessDetected: function() {}
};
Integration.GCM.DeviceDetector = {
	handleIntegrationSpecificDialogs: function(h) {
		var g = h.severity === "stopped",
			e = {
				category: "MULTI_CHOICE_DIALOG",
				severity: g ? "ERROR" : "INFO",
				message: h.texts.join("\n"),
				errorCode: "ERROR",
				actions: [],
				extraParameters: {}
			},
			f = [];
		Sys.each(h.buttons, function(a) {
			f.push(a.label);
			e.actions.push(a.action)
		});
		e.extraParameters.options = f;
		this.fireEvent("request:gcmProxy.handleError", e)
	}
};
(function() {
	if (Sys.isGcmEnabled) {
		Sys.override(Loader.ErrorHandler, Integration.GCM.ErrorHandler);
		Sys.override(Loader.ResourceHandler, Integration.GCM.ResourceHandler);
		if (Sys.isDefined(Loader.DeviceDetector)) {
			Sys.override(Loader.DeviceDetector, Integration.GCM.DeviceDetector)
		}
	}
}());