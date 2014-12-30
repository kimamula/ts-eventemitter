///<reference path="../typings/node/node.d.ts" />
import events = require('events');
var EventEmitter = events.EventEmitter;

export class TsEventEmitter implements TsEventEmitterBase {
    private eventEmitter: NodeJS.EventEmitter;
    constructor() {
        this.eventEmitter = new EventEmitter();
    }
    event(name: string): any {
        return new TsEventImpl(this.eventEmitter, name);
    }
    removeAllListeners(): TsEventEmitter {
        this.eventEmitter.removeAllListeners();
        return this;
    }
    setMaxListeners(n: number): void {
        this.eventEmitter.setMaxListeners(n);
    }
}

class TsEventImpl {
    constructor(private eventEmitter: NodeJS.EventEmitter, private name: string) {
    }
    on(listener: Function): TsEventImpl {
        this.eventEmitter.on(this.name, listener);
        return this;
    }
    addListener(listener: Function): TsEventImpl {
        this.eventEmitter.addListener(this.name, listener);
        return this;
    }
    off(listener: Function): TsEventImpl {
        return this.removeListener(listener);
    }
    removeListener(listener: Function): TsEventImpl {
        this.eventEmitter.removeListener(this.name, listener);
        return this;
    }
    removeAllListeners(): TsEventImpl {
        this.eventEmitter.removeAllListeners(this.name);
        return this;
    }
    listeners(): Function[] {
        return this.eventEmitter.listeners(this.name);
    }
    once(listener: Function): TsEventImpl {
        this.eventEmitter.once(this.name, listener);
        return this;
    }
    emit(...args: any[]): boolean {
        args.unshift(this.name);
        return this.eventEmitter.emit.apply(this.eventEmitter, args);
    }
}

export interface TsEventEmitterBase {
    removeAllListeners(): TsEventEmitter;
    setMaxListeners(n: number): void;
}

export interface TsEvent0 {
    on(listener: () => any): TsEvent0;
    addListener(listener: () => any): TsEvent0;
    off(listener: () => any): TsEvent0;
    removeListener(listener: () => any): TsEvent0;
    removeAllListeners(): TsEvent0;
    listeners(): {() : any}[];
    once(listener: () => any): TsEvent0;
    emit(): boolean;
}

export interface TsEvent1<T1> {
    on(listener: (arg1: T1) => any): TsEvent1<T1>;
    addListener(listener: (arg1: T1) => any): TsEvent1<T1>;
    off(listener: (arg1: T1) => any): TsEvent1<T1>;
    removeListener(listener: (arg1: T1) => any): TsEvent1<T1>;
    removeAllListeners(): TsEvent1<T1>;
    listeners(): {(arg1: T1) : any}[];
    once(listener: (arg1: T1) => any): TsEvent1<T1>;
    emit(arg1: T1): boolean;
}

export interface TsEvent2<T1, T2> {
    on(listener: (arg1: T1, arg2: T2) => any): TsEvent2<T1, T2>;
    addListener(listener: (arg1: T1, arg2: T2) => any): TsEvent2<T1, T2>;
    off(listener: (arg1: T1, arg2: T2) => any): TsEvent2<T1, T2>;
    removeListener(listener: (arg1: T1, arg2: T2) => any): TsEvent2<T1, T2>;
    removeAllListeners(): TsEvent2<T1, T2>;
    listeners(): {(arg1: T1, arg2: T2): any}[];
    once(listener: (arg1: T1, arg2: T2) => any): TsEvent2<T1, T2>;
    emit(arg1: T1, arg2: T2): boolean;
}