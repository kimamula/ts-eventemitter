import TsEventEmitter from '../src/ts-eventemitter';
import {Test} from 'nodeunit';
import {EventEmitter} from 'events';

interface TestEventEmitter extends TsEventEmitter {
    event(event: 'noArgEvent'): TsEventEmitter.Event0<this>;
    event(event: 'oneArgEvent'): TsEventEmitter.Event1<this, string>;
    event(event: string): TsEventEmitter.Event;
}

// Store data of each function for test
const functionData = {
    'addListener': {'original': EventEmitter.prototype.addListener, 'callCount': 0, 'arguments':<any[]>[], 'returnValue': <any>null},
    'on': {'original': EventEmitter.prototype.on, 'callCount': 0, 'arguments':<any[]>[], 'returnValue': <any>null},
    'once': {'original': EventEmitter.prototype.once, 'callCount': 0, 'arguments':<any[]>[], 'returnValue': <any>null},
    'removeListener': {'original': EventEmitter.prototype.removeListener, 'callCount': 0, 'arguments':<any[]>[], 'returnValue': <any>null},
    'removeAllListeners': {'original': EventEmitter.prototype.removeAllListeners, 'callCount': 0, 'arguments':<any[]>[], 'returnValue': <any>null},
    'setMaxListeners': {'original': EventEmitter.prototype.setMaxListeners, 'callCount': 0, 'arguments':<any[]>[], 'returnValue': <any>null},
    'listeners': {'original': EventEmitter.prototype.listeners, 'callCount': 0, 'arguments':<any[]>[], 'returnValue': <any>[]},
    'emit': {'original': EventEmitter.prototype.emit, 'callCount': 0, 'arguments':<any[]>[], 'returnValue': true}
};

module.exports = {
    'setUp': (callback: Function) => {
        Object.keys(functionData).forEach((name: string) => {
            const data = functionData[name];
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
            const data = functionData[name];
            EventEmitter.prototype[name] = data.original;
            data.callCount = 0;
            data.arguments.length = 0;
        });
        callback();
    },
    'delegates a function call which is not linked to a specific event to the corresponding EventEmitter function': (test: Test) => {
        const testEventEmitter: TestEventEmitter = TsEventEmitter.create();

        testEventEmitter.removeAllListeners();
        test.strictEqual(functionData.removeAllListeners.callCount, 1);
        test.deepEqual(functionData.removeAllListeners.arguments[0], []);

        testEventEmitter.setMaxListeners(100);
        test.strictEqual(functionData.setMaxListeners.callCount, 1);
        test.deepEqual(functionData.setMaxListeners.arguments[0], [100]);

        test.done();
    },
    'can handle an event without argument': (test: Test) => {
        const testEventEmitter: TestEventEmitter = TsEventEmitter.create(),
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
        const testEventEmitter: TestEventEmitter = TsEventEmitter.create(),
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
    }
};
