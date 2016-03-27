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

interface TsEventEmitter {
    event(name: string): TsEventEmitter.Event;
    removeAllListeners(): void;
    setMaxListeners(n: number): void;
}

namespace TsEventEmitter {
    export function create(): TsEventEmitter {
        return new TsEventEmitterImpl();
    }
    export interface Event {
    }
    export interface Event0<E extends TsEventEmitter> extends Event {
        on(listener: () => any): E;
        addListener(listener: () => any): E;
        off(listener: () => any): E;
        removeListener(listener: () => any): E;
        removeAllListeners(): E;
        listeners(): {() : any}[];
        once(listener: () => any): E;
        emit(): boolean;
    }
    export interface Event1<E extends TsEventEmitter, T> extends Event {
        on(listener: (arg: T) => any): E;
        addListener(listener: (arg: T) => any): E;
        off(listener: (arg: T) => any): E;
        removeListener(listener: (arg: T) => any): E;
        removeAllListeners(): E;
        listeners(): {(arg: T) : any}[];
        once(listener: (arg: T) => any): E;
        emit(arg: T): boolean;
    }
}

export default TsEventEmitter;