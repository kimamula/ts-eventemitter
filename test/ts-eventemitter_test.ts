///<reference path="../typings/tsd.d.ts" />
import {TsEventEmitter, Event0, Event1, Event2} from '../src/ts-eventemitter';
import {Test} from 'nodeunit';
import {EventEmitter} from 'events';

interface TestEventEmitter extends TsEventEmitter {
    event(event: 'noArgEvent'): Event0;
    event(event: 'oneArgEvent'): Event1<string>;
    event(event: 'twoArgsEvent'): Event2<number, string>;
    event(name: string): void;
}

// Store data of each function for test
var functionData = {
    'addListener': {'original': EventEmitter.prototype.addListener, 'callCount': 0, 'arguments':[], 'returnValue': null},
    'on': {'original': EventEmitter.prototype.on, 'callCount': 0, 'arguments':[], 'returnValue': null},
    'once': {'original': EventEmitter.prototype.once, 'callCount': 0, 'arguments':[], 'returnValue': null},
    'removeListener': {'original': EventEmitter.prototype.removeListener, 'callCount': 0, 'arguments':[], 'returnValue': null},
    'removeAllListeners': {'original': EventEmitter.prototype.removeAllListeners, 'callCount': 0, 'arguments':[], 'returnValue': null},
    'setMaxListeners': {'original': EventEmitter.prototype.setMaxListeners, 'callCount': 0, 'arguments':[], 'returnValue': null},
    'listeners': {'original': EventEmitter.prototype.listeners, 'callCount': 0, 'arguments':[], 'returnValue': []},
    'emit': {'original': EventEmitter.prototype.emit, 'callCount': 0, 'arguments':[], 'returnValue': true}
};

module.exports = {
    'setUp': (callback: Function) => {
        Object.keys(functionData).forEach((name: string) => {
            var data = functionData[name];
            EventEmitter.prototype[name] = (...args: any[]) => {
                data.callCount += 1;
                data.arguments.push(args);
                return data.returnValue;
            }
        });
        callback();
    },
    'tearDown': (callback: Function) => {
        Object.keys(functionData).forEach((name: string) => {
            var data = functionData[name];
            EventEmitter.prototype[name] = data.original;
            data.callCount = 0;
            data.arguments.length = 0;
        });
        callback();
    },
    'delegates a function call which is not linked to a specific event to the corresponding EventEmitter function': (test: Test) => {
        var testEventEmitter: TestEventEmitter = TsEventEmitter.create();

        testEventEmitter.removeAllListeners();
        test.strictEqual(functionData.removeAllListeners.callCount, 1);
        test.deepEqual(functionData.removeAllListeners.arguments[0], []);

        testEventEmitter.setMaxListeners(100);
        test.strictEqual(functionData.setMaxListeners.callCount, 1);
        test.deepEqual(functionData.setMaxListeners.arguments[0], [100]);

        test.done();
    },
    'can handle an event without argument': (test: Test) => {
        var testEventEmitter: TestEventEmitter = TsEventEmitter.create(),
            noArgEvent = testEventEmitter.event('noArgEvent'),
            onListener = () => {},
            addListener = () => {},
            offListener = () => {},
            removeListener = () => {},
            onceListener = () => {};

        test.strictEqual(noArgEvent.on(onListener), noArgEvent);
        test.strictEqual(functionData.on.callCount, 1);
        test.deepEqual(functionData.on.arguments[0], ['noArgEvent', onListener]);

        test.strictEqual(noArgEvent.addListener(addListener), noArgEvent);
        test.strictEqual(functionData.addListener.callCount, 1);
        test.deepEqual(functionData.addListener.arguments[0], ['noArgEvent', addListener]);

        test.strictEqual(noArgEvent.off(offListener), noArgEvent);
        test.strictEqual(functionData.removeListener.callCount, 1);
        test.deepEqual(functionData.removeListener.arguments[0], ['noArgEvent', offListener]);

        test.strictEqual(noArgEvent.removeListener(removeListener), noArgEvent);
        test.strictEqual(functionData.removeListener.callCount, 2);
        test.deepEqual(functionData.removeListener.arguments[1], ['noArgEvent', removeListener]);

        test.strictEqual(noArgEvent.removeAllListeners(), noArgEvent);
        test.strictEqual(functionData.removeAllListeners.callCount, 1);
        test.deepEqual(functionData.removeAllListeners.arguments[0], ['noArgEvent']);

        test.deepEqual(noArgEvent.listeners(), []);
        test.strictEqual(functionData.listeners.callCount, 1);
        test.deepEqual(functionData.listeners.arguments[0], ['noArgEvent']);

        test.strictEqual(noArgEvent.once(onceListener), noArgEvent);
        test.strictEqual(functionData.once.callCount, 1);
        test.deepEqual(functionData.once.arguments[0], ['noArgEvent', onceListener]);

        test.strictEqual(noArgEvent.emit(), true);
        test.strictEqual(functionData.emit.callCount, 1);
        test.deepEqual(functionData.emit.arguments[0], ['noArgEvent']);

        test.done();
    },
    'can handle an event with an argument': (test: Test) => {
        var testEventEmitter: TestEventEmitter = TsEventEmitter.create(),
            oneArgEvent = testEventEmitter.event('oneArgEvent'),
            onListener = (s: string) => {},
            addListener = (s: string) => {},
            offListener = (s: string) => {},
            removeListener = (s: string) => {},
            onceListener = (s: string) => {};

        test.strictEqual(oneArgEvent.on(onListener), oneArgEvent);
        test.strictEqual(functionData.on.callCount, 1);
        test.deepEqual(functionData.on.arguments[0], ['oneArgEvent', onListener]);

        test.strictEqual(oneArgEvent.addListener(addListener), oneArgEvent);
        test.strictEqual(functionData.addListener.callCount, 1);
        test.deepEqual(functionData.addListener.arguments[0], ['oneArgEvent', addListener]);

        test.strictEqual(oneArgEvent.off(offListener), oneArgEvent);
        test.strictEqual(functionData.removeListener.callCount, 1);
        test.deepEqual(functionData.removeListener.arguments[0], ['oneArgEvent', offListener]);

        test.strictEqual(oneArgEvent.removeListener(removeListener), oneArgEvent);
        test.strictEqual(functionData.removeListener.callCount, 2);
        test.deepEqual(functionData.removeListener.arguments[1], ['oneArgEvent', removeListener]);

        test.strictEqual(oneArgEvent.removeAllListeners(), oneArgEvent);
        test.strictEqual(functionData.removeAllListeners.callCount, 1);
        test.deepEqual(functionData.removeAllListeners.arguments[0], ['oneArgEvent']);

        test.deepEqual(oneArgEvent.listeners(), []);
        test.strictEqual(functionData.listeners.callCount, 1);
        test.deepEqual(functionData.listeners.arguments[0], ['oneArgEvent']);

        test.strictEqual(oneArgEvent.once(onceListener), oneArgEvent);
        test.strictEqual(functionData.once.callCount, 1);
        test.deepEqual(functionData.once.arguments[0], ['oneArgEvent', onceListener]);

        test.strictEqual(oneArgEvent.emit('string'), true);
        test.strictEqual(functionData.emit.callCount, 1);
        test.deepEqual(functionData.emit.arguments[0], ['oneArgEvent', 'string']);

        test.done();
    },
    'can handle an event with two arguments': (test: Test) => {
        var testEventEmitter: TestEventEmitter = TsEventEmitter.create(),
            twoArgsEvent = testEventEmitter.event('twoArgsEvent'),
            onListener = (n: number, s: string) => {},
            addListener = (n: number, s: string) => {},
            offListener = (n: number, s: string) => {},
            removeListener = (n: number, s: string) => {},
            onceListener = (n: number, s: string) => {};

        test.strictEqual(twoArgsEvent.on(onListener), twoArgsEvent);
        test.strictEqual(functionData.on.callCount, 1);
        test.deepEqual(functionData.on.arguments[0], ['twoArgsEvent', onListener]);

        test.strictEqual(twoArgsEvent.addListener(addListener), twoArgsEvent);
        test.strictEqual(functionData.addListener.callCount, 1);
        test.deepEqual(functionData.addListener.arguments[0], ['twoArgsEvent', addListener]);

        test.strictEqual(twoArgsEvent.off(offListener), twoArgsEvent);
        test.strictEqual(functionData.removeListener.callCount, 1);
        test.deepEqual(functionData.removeListener.arguments[0], ['twoArgsEvent', offListener]);

        test.strictEqual(twoArgsEvent.removeListener(removeListener), twoArgsEvent);
        test.strictEqual(functionData.removeListener.callCount, 2);
        test.deepEqual(functionData.removeListener.arguments[1], ['twoArgsEvent', removeListener]);

        test.strictEqual(twoArgsEvent.removeAllListeners(), twoArgsEvent);
        test.strictEqual(functionData.removeAllListeners.callCount, 1);
        test.deepEqual(functionData.removeAllListeners.arguments[0], ['twoArgsEvent']);

        test.deepEqual(twoArgsEvent.listeners(), []);
        test.strictEqual(functionData.listeners.callCount, 1);
        test.deepEqual(functionData.listeners.arguments[0], ['twoArgsEvent']);

        test.strictEqual(twoArgsEvent.once(onceListener), twoArgsEvent);
        test.strictEqual(functionData.once.callCount, 1);
        test.deepEqual(functionData.once.arguments[0], ['twoArgsEvent', onceListener]);

        test.strictEqual(twoArgsEvent.emit(2, 'str'), true);
        test.strictEqual(functionData.emit.callCount, 1);
        test.deepEqual(functionData.emit.arguments[0], ['twoArgsEvent', 2, 'str']);

        test.done();
    }
};
