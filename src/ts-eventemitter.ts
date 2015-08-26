///<reference path="../typings/node/node.d.ts" />
import {EventEmitter} from 'events';

class TsEventEmitterImpl implements TsEventEmitter {
    private eventEmitter: NodeJS.EventEmitter;
    constructor() {
        this.eventEmitter = new EventEmitter();
    }
    event(name: string): any {
        return new EventImpl(this, this.eventEmitter, name);
    }
    removeAllListeners(): void {
        this.eventEmitter.removeAllListeners();
    }
    setMaxListeners(n: number): void {
        this.eventEmitter.setMaxListeners(n);
    }
}

class EventImpl {
    constructor(private tsEventEmitter: TsEventEmitter, private eventEmitter: NodeJS.EventEmitter, private name: string) {
    }
    on(listener: Function): TsEventEmitter {
        this.eventEmitter.on(this.name, listener);
        return this.tsEventEmitter;
    }
    addListener(listener: Function): TsEventEmitter {
        this.eventEmitter.addListener(this.name, listener);
        return this.tsEventEmitter;
    }
    off(listener: Function): TsEventEmitter {
        return this.removeListener(listener);
    }
    removeListener(listener: Function): TsEventEmitter {
        this.eventEmitter.removeListener(this.name, listener);
        return this.tsEventEmitter;
    }
    removeAllListeners(): TsEventEmitter {
        this.eventEmitter.removeAllListeners(this.name);
        return this.tsEventEmitter;
    }
    listeners(): Function[] {
        return this.eventEmitter.listeners(this.name);
    }
    once(listener: Function): TsEventEmitter {
        this.eventEmitter.once(this.name, listener);
        return this.tsEventEmitter;
    }
    emit(...args: any[]): boolean {
        args.unshift(this.name);
        return this.eventEmitter.emit.apply(this.eventEmitter, args);
    }
}

export interface TsEventEmitter {
    event(name: string): EventBase<TsEventEmitter>;
    removeAllListeners(): void;
    setMaxListeners(n: number): void;
}

export module TsEventEmitter {
    export function create(): TsEventEmitter {
        return new TsEventEmitterImpl();
    }
}

export interface EventBase<E extends TsEventEmitter> {
}

export interface Event0<E extends TsEventEmitter> extends EventBase<E> {
    on(listener: () => any): E;
    addListener(listener: () => any): E;
    off(listener: () => any): E;
    removeListener(listener: () => any): E;
    removeAllListeners(): E;
    listeners(): {() : any}[];
    once(listener: () => any): E;
    emit(): boolean;
}

export interface Event1<E extends TsEventEmitter, T1> extends EventBase<E> {
    on(listener: (arg1: T1) => any): E;
    addListener(listener: (arg1: T1) => any): E;
    off(listener: (arg1: T1) => any): E;
    removeListener(listener: (arg1: T1) => any): E;
    removeAllListeners(): E;
    listeners(): {(arg1: T1) : any}[];
    once(listener: (arg1: T1) => any): E;
    emit(arg1: T1): boolean;
}

export interface Event2<E extends TsEventEmitter, T1, T2> extends EventBase<E> {
    on(listener: (arg1: T1, arg2: T2) => any): E;
    addListener(listener: (arg1: T1, arg2: T2) => any): E;
    off(listener: (arg1: T1, arg2: T2) => any): E;
    removeListener(listener: (arg1: T1, arg2: T2) => any): E;
    removeAllListeners(): E;
    listeners(): {(arg1: T1, arg2: T2): any}[];
    once(listener: (arg1: T1, arg2: T2) => any): E;
    emit(arg1: T1, arg2: T2): boolean;
}

export interface Event3<E extends TsEventEmitter, T1, T2, T3> extends EventBase<E> {
    on(listener: (arg1: T1, arg2: T2, arg3: T3) => any): E;
    addListener(listener: (arg1: T1, arg2: T2, arg3: T3) => any): E;
    off(listener: (arg1: T1, arg2: T2, arg3: T3) => any): E;
    removeListener(listener: (arg1: T1, arg2: T2, arg3: T3) => any): E;
    removeAllListeners(): E;
    listeners(): {(arg1: T1, arg2: T2, arg3: T3): any}[];
    once(listener: (arg1: T1, arg2: T2, arg3: T3) => any): E;
    emit(arg1: T1, arg2: T2, arg3: T3): boolean;
}

export interface Event4<E extends TsEventEmitter, T1, T2, T3, T4> extends EventBase<E> {
    on(listener: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => any): E;
    addListener(listener: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => any): E;
    off(listener: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => any): E;
    removeListener(listener: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => any): E;
    removeAllListeners(): E;
    listeners(): {(arg1: T1, arg2: T2, arg3: T3, arg4: T4): any}[];
    once(listener: (arg1: T1, arg2: T2, arg3: T3, arg4: T4) => any): E;
    emit(arg1: T1, arg2: T2, arg3: T3, arg4: T4): boolean;
}
