///<reference path="../typings/tsd.d.ts" />
import {TsEventEmitter, EventBase, Event0, Event1, Event2, Event3, Event4} from '../src/ts-eventemitter';
import {Test} from 'nodeunit';
import {EventEmitter} from 'events';

interface TestEventEmitter extends TsEventEmitter {
    event(event: 'noArgEvent'): Event0<TestEventEmitter>;
    event(event: 'oneArgEvent'): Event1<TestEventEmitter, string>;
    event(event: 'twoArgsEvent'): Event2<TestEventEmitter, number, string>;
    event(event: 'threeArgsEvent'): Event3<TestEventEmitter, number, string, boolean>;
    event(event: 'fourArgsEvent'): Event4<TestEventEmitter, number, string, boolean, number[]>;
    event(name: string): EventBase<TestEventEmitter>;
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

        test.strictEqual(noArgEvent.on(onListener), testEventEmitter);
        test.strictEqual(functionData.on.callCount, 1);
        test.deepEqual(functionData.on.arguments[0], ['noArgEvent', onListener]);

        test.strictEqual(noArgEvent.addListener(addListener), testEventEmitter);
        test.strictEqual(functionData.addListener.callCount, 1);
        test.deepEqual(functionData.addListener.arguments[0], ['noArgEvent', addListener]);

        test.strictEqual(noArgEvent.off(offListener), testEventEmitter);
        test.strictEqual(functionData.removeListener.callCount, 1);
        test.deepEqual(functionData.removeListener.arguments[0], ['noArgEvent', offListener]);

        test.strictEqual(noArgEvent.removeListener(removeListener), testEventEmitter);
        test.strictEqual(functionData.removeListener.callCount, 2);
        test.deepEqual(functionData.removeListener.arguments[1], ['noArgEvent', removeListener]);

        test.strictEqual(noArgEvent.removeAllListeners(), testEventEmitter);
        test.strictEqual(functionData.removeAllListeners.callCount, 1);
        test.deepEqual(functionData.removeAllListeners.arguments[0], ['noArgEvent']);

        test.deepEqual(noArgEvent.listeners(), []);
        test.strictEqual(functionData.listeners.callCount, 1);
        test.deepEqual(functionData.listeners.arguments[0], ['noArgEvent']);

        test.strictEqual(noArgEvent.once(onceListener), testEventEmitter);
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

        test.strictEqual(oneArgEvent.on(onListener), testEventEmitter);
        test.strictEqual(functionData.on.callCount, 1);
        test.deepEqual(functionData.on.arguments[0], ['oneArgEvent', onListener]);

        test.strictEqual(oneArgEvent.addListener(addListener), testEventEmitter);
        test.strictEqual(functionData.addListener.callCount, 1);
        test.deepEqual(functionData.addListener.arguments[0], ['oneArgEvent', addListener]);

        test.strictEqual(oneArgEvent.off(offListener), testEventEmitter);
        test.strictEqual(functionData.removeListener.callCount, 1);
        test.deepEqual(functionData.removeListener.arguments[0], ['oneArgEvent', offListener]);

        test.strictEqual(oneArgEvent.removeListener(removeListener), testEventEmitter);
        test.strictEqual(functionData.removeListener.callCount, 2);
        test.deepEqual(functionData.removeListener.arguments[1], ['oneArgEvent', removeListener]);

        test.strictEqual(oneArgEvent.removeAllListeners(), testEventEmitter);
        test.strictEqual(functionData.removeAllListeners.callCount, 1);
        test.deepEqual(functionData.removeAllListeners.arguments[0], ['oneArgEvent']);

        test.deepEqual(oneArgEvent.listeners(), []);
        test.strictEqual(functionData.listeners.callCount, 1);
        test.deepEqual(functionData.listeners.arguments[0], ['oneArgEvent']);

        test.strictEqual(oneArgEvent.once(onceListener), testEventEmitter);
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

        test.strictEqual(twoArgsEvent.on(onListener), testEventEmitter);
        test.strictEqual(functionData.on.callCount, 1);
        test.deepEqual(functionData.on.arguments[0], ['twoArgsEvent', onListener]);

        test.strictEqual(twoArgsEvent.addListener(addListener), testEventEmitter);
        test.strictEqual(functionData.addListener.callCount, 1);
        test.deepEqual(functionData.addListener.arguments[0], ['twoArgsEvent', addListener]);

        test.strictEqual(twoArgsEvent.off(offListener), testEventEmitter);
        test.strictEqual(functionData.removeListener.callCount, 1);
        test.deepEqual(functionData.removeListener.arguments[0], ['twoArgsEvent', offListener]);

        test.strictEqual(twoArgsEvent.removeListener(removeListener), testEventEmitter);
        test.strictEqual(functionData.removeListener.callCount, 2);
        test.deepEqual(functionData.removeListener.arguments[1], ['twoArgsEvent', removeListener]);

        test.strictEqual(twoArgsEvent.removeAllListeners(), testEventEmitter);
        test.strictEqual(functionData.removeAllListeners.callCount, 1);
        test.deepEqual(functionData.removeAllListeners.arguments[0], ['twoArgsEvent']);

        test.deepEqual(twoArgsEvent.listeners(), []);
        test.strictEqual(functionData.listeners.callCount, 1);
        test.deepEqual(functionData.listeners.arguments[0], ['twoArgsEvent']);

        test.strictEqual(twoArgsEvent.once(onceListener), testEventEmitter);
        test.strictEqual(functionData.once.callCount, 1);
        test.deepEqual(functionData.once.arguments[0], ['twoArgsEvent', onceListener]);

        test.strictEqual(twoArgsEvent.emit(2, 'str'), true);
        test.strictEqual(functionData.emit.callCount, 1);
        test.deepEqual(functionData.emit.arguments[0], ['twoArgsEvent', 2, 'str']);

        test.done();
    },
    'can handle an event with three arguments': (test: Test) => {
        var testEventEmitter: TestEventEmitter = TsEventEmitter.create(),
            threeArgsEvent = testEventEmitter.event('threeArgsEvent'),
            onListener = (n: number, s: string, b: boolean) => {},
            addListener = (n: number, s: string, b: boolean) => {},
            offListener = (n: number, s: string, b: boolean) => {},
            removeListener = (n: number, s: string, b: boolean) => {},
            onceListener = (n: number, s: string, b: boolean) => {};

        test.strictEqual(threeArgsEvent.on(onListener), testEventEmitter);
        test.strictEqual(functionData.on.callCount, 1);
        test.deepEqual(functionData.on.arguments[0], ['threeArgsEvent', onListener]);

        test.strictEqual(threeArgsEvent.addListener(addListener), testEventEmitter);
        test.strictEqual(functionData.addListener.callCount, 1);
        test.deepEqual(functionData.addListener.arguments[0], ['threeArgsEvent', addListener]);

        test.strictEqual(threeArgsEvent.off(offListener), testEventEmitter);
        test.strictEqual(functionData.removeListener.callCount, 1);
        test.deepEqual(functionData.removeListener.arguments[0], ['threeArgsEvent', offListener]);

        test.strictEqual(threeArgsEvent.removeListener(removeListener), testEventEmitter);
        test.strictEqual(functionData.removeListener.callCount, 2);
        test.deepEqual(functionData.removeListener.arguments[1], ['threeArgsEvent', removeListener]);

        test.strictEqual(threeArgsEvent.removeAllListeners(), testEventEmitter);
        test.strictEqual(functionData.removeAllListeners.callCount, 1);
        test.deepEqual(functionData.removeAllListeners.arguments[0], ['threeArgsEvent']);

        test.deepEqual(threeArgsEvent.listeners(), []);
        test.strictEqual(functionData.listeners.callCount, 1);
        test.deepEqual(functionData.listeners.arguments[0], ['threeArgsEvent']);

        test.strictEqual(threeArgsEvent.once(onceListener), testEventEmitter);
        test.strictEqual(functionData.once.callCount, 1);
        test.deepEqual(functionData.once.arguments[0], ['threeArgsEvent', onceListener]);

        test.strictEqual(threeArgsEvent.emit(2, 'str', true), true);
        test.strictEqual(functionData.emit.callCount, 1);
        test.deepEqual(functionData.emit.arguments[0], ['threeArgsEvent', 2, 'str', true]);

        test.done();
    },
    'can handle an event with four arguments': (test: Test) => {
        var testEventEmitter: TestEventEmitter = TsEventEmitter.create(),
            fourArgsEvent = testEventEmitter.event('fourArgsEvent'),
            onListener = (n: number, s: string, b: boolean, ns: number[]) => {},
            addListener = (n: number, s: string, b: boolean, ns: number[]) => {},
            offListener = (n: number, s: string, b: boolean, ns: number[]) => {},
            removeListener = (n: number, s: string, b: boolean, ns: number[]) => {},
            onceListener = (n: number, s: string, b: boolean, ns: number[]) => {};

        test.strictEqual(fourArgsEvent.on(onListener), testEventEmitter);
        test.strictEqual(functionData.on.callCount, 1);
        test.deepEqual(functionData.on.arguments[0], ['fourArgsEvent', onListener]);

        test.strictEqual(fourArgsEvent.addListener(addListener), testEventEmitter);
        test.strictEqual(functionData.addListener.callCount, 1);
        test.deepEqual(functionData.addListener.arguments[0], ['fourArgsEvent', addListener]);

        test.strictEqual(fourArgsEvent.off(offListener), testEventEmitter);
        test.strictEqual(functionData.removeListener.callCount, 1);
        test.deepEqual(functionData.removeListener.arguments[0], ['fourArgsEvent', offListener]);

        test.strictEqual(fourArgsEvent.removeListener(removeListener), testEventEmitter);
        test.strictEqual(functionData.removeListener.callCount, 2);
        test.deepEqual(functionData.removeListener.arguments[1], ['fourArgsEvent', removeListener]);

        test.strictEqual(fourArgsEvent.removeAllListeners(), testEventEmitter);
        test.strictEqual(functionData.removeAllListeners.callCount, 1);
        test.deepEqual(functionData.removeAllListeners.arguments[0], ['fourArgsEvent']);

        test.deepEqual(fourArgsEvent.listeners(), []);
        test.strictEqual(functionData.listeners.callCount, 1);
        test.deepEqual(functionData.listeners.arguments[0], ['fourArgsEvent']);

        test.strictEqual(fourArgsEvent.once(onceListener), testEventEmitter);
        test.strictEqual(functionData.once.callCount, 1);
        test.deepEqual(functionData.once.arguments[0], ['fourArgsEvent', onceListener]);

        test.strictEqual(fourArgsEvent.emit(2, 'str', true, [3, 4]), true);
        test.strictEqual(functionData.emit.callCount, 1);
        test.deepEqual(functionData.emit.arguments[0], ['fourArgsEvent', 2, 'str', true, [3, 4]]);

        test.done();
    }
};
