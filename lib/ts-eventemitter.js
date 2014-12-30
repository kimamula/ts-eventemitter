///<reference path="../typings/node/node.d.ts" />
var events = require('events');
var EventEmitter = events.EventEmitter;
var TsEventEmitter = (function () {
    function TsEventEmitter() {
        this.eventEmitter = new EventEmitter();
    }
    TsEventEmitter.prototype.event = function (name) {
        return new TsEventImpl(this.eventEmitter, name);
    };
    TsEventEmitter.prototype.removeAllListeners = function () {
        this.eventEmitter.removeAllListeners();
        return this;
    };
    TsEventEmitter.prototype.setMaxListeners = function (n) {
        this.eventEmitter.setMaxListeners(n);
    };
    return TsEventEmitter;
})();
exports.TsEventEmitter = TsEventEmitter;
var TsEventImpl = (function () {
    function TsEventImpl(eventEmitter, name) {
        this.eventEmitter = eventEmitter;
        this.name = name;
    }
    TsEventImpl.prototype.on = function (listener) {
        this.eventEmitter.on(this.name, listener);
        return this;
    };
    TsEventImpl.prototype.addListener = function (listener) {
        this.eventEmitter.addListener(this.name, listener);
        return this;
    };
    TsEventImpl.prototype.off = function (listener) {
        return this.removeListener(listener);
    };
    TsEventImpl.prototype.removeListener = function (listener) {
        this.eventEmitter.removeListener(this.name, listener);
        return this;
    };
    TsEventImpl.prototype.removeAllListeners = function () {
        this.eventEmitter.removeAllListeners(this.name);
        return this;
    };
    TsEventImpl.prototype.listeners = function () {
        return this.eventEmitter.listeners(this.name);
    };
    TsEventImpl.prototype.once = function (listener) {
        this.eventEmitter.once(this.name, listener);
        return this;
    };
    TsEventImpl.prototype.emit = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        args.unshift(this.name);
        return this.eventEmitter.emit.apply(this.eventEmitter, args);
    };
    return TsEventImpl;
})();
