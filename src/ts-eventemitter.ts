///<reference path="../typings/node/node.d.ts" />
import events = require('events');
var EventEmitter = events.EventEmitter;

export function create(): Interface {
    return new TsEventEmitter();
}

class TsEventEmitter implements Interface {
    private eventEmitter: NodeJS.EventEmitter;
    constructor() {
        this.eventEmitter = new EventEmitter();
    }
    event(name: string): any {
        return new EventImpl(this.eventEmitter, name);
    }
    removeAllListeners(): void {
        this.eventEmitter.removeAllListeners();
    }
    setMaxListeners(n: number): void {
        this.eventEmitter.setMaxListeners(n);
    }
}

class EventImpl {
    constructor(private eventEmitter: NodeJS.EventEmitter, private name: string) {
    }
    on(listener: Function): EventImpl {
        this.eventEmitter.on(this.name, listener);
        return this;
    }
    addListener(listener: Function): EventImpl {
        this.eventEmitter.addListener(this.name, listener);
        return this;
    }
    off(listener: Function): EventImpl {
        return this.removeListener(listener);
    }
    removeListener(listener: Function): EventImpl {
        this.eventEmitter.removeListener(this.name, listener);
        return this;
    }
    removeAllListeners(): EventImpl {
        this.eventEmitter.removeAllListeners(this.name);
        return this;
    }
    listeners(): Function[] {
        return this.eventEmitter.listeners(this.name);
    }
    once(listener: Function): EventImpl {
        this.eventEmitter.once(this.name, listener);
        return this;
    }
    emit(...args: any[]): boolean {
        args.unshift(this.name);
        return this.eventEmitter.emit.apply(this.eventEmitter, args);
    }
}

export interface Interface {
    event(name: string): any;
    removeAllListeners(): void;
    setMaxListeners(n: number): void;
}

export interface Event0 {
    on(listener: () => any): Event0;
    addListener(listener: () => any): Event0;
    off(listener: () => any): Event0;
    removeListener(listener: () => any): Event0;
    removeAllListeners(): Event0;
    listeners(): {() : any}[];
    once(listener: () => any): Event0;
    emit(): boolean;
}

export interface Event1<T1> {
    on(listener: (arg1: T1) => any): Event1<T1>;
    addListener(listener: (arg1: T1) => any): Event1<T1>;
    off(listener: (arg1: T1) => any): Event1<T1>;
    removeListener(listener: (arg1: T1) => any): Event1<T1>;
    removeAllListeners(): Event1<T1>;
    listeners(): {(arg1: T1) : any}[];
    once(listener: (arg1: T1) => any): Event1<T1>;
    emit(arg1: T1): boolean;
}

export interface Event2<T1, T2> {
    on(listener: (arg1: T1, arg2: T2) => any): Event2<T1, T2>;
    addListener(listener: (arg1: T1, arg2: T2) => any): Event2<T1, T2>;
    off(listener: (arg1: T1, arg2: T2) => any): Event2<T1, T2>;
    removeListener(listener: (arg1: T1, arg2: T2) => any): Event2<T1, T2>;
    removeAllListeners(): Event2<T1, T2>;
    listeners(): {(arg1: T1, arg2: T2): any}[];
    once(listener: (arg1: T1, arg2: T2) => any): Event2<T1, T2>;
    emit(arg1: T1, arg2: T2): boolean;
}