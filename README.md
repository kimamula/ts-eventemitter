# DEPRECATED

As of TypeScript 2.1, you can easily define a type safe EventEmitter with `keyof` and therefore you don't need this package anymore.
See https://github.com/kimamula/TypeScript-definition-of-EventEmitter-with-keyof.

ts-eventemitter
==========
A thin TypeScript wrapper for EventEmitter which provides with type-safety.

## Install

```shell
npm install ts-eventemitter
```

## Usage

* Define your EventEmitter.

```typescript
import TsEventEmitter from 'ts-eventemitter';

export interface MyEventEmitter extends TsEventEmitter {
    event(name: 'foo'): TsEventEmitter.Event0<this>;
    event(name: 'bar'): TsEventEmitter.Event1<this, string>;
    event(name: 'baz'): TsEventEmitter.Event1<this, { id: number; name: string; }>;
    event(name: string): TsEventEmitter.Event;
}

const MyEventEmitter: MyEventEmitter = TsEventEmitter.create();

export default MyEventEmitter;
```

* Use it.

```typescript
import MyEventEmitter from 'MyEventEmitter';

MyEventEmitter.event('foo').on(() =>
    console.log('foo')
).event('bar').on(name =>
    console.log(`Hello, ${name}`)
).event('baz').on(({id, name}) =>
    console.log(`Hello, ${name}. Your id is ${id}`)
);

MyEventEmitter.event('foo').emit();
MyEventEmitter.event('bar').emit('kimamula');
MyEventEmitter.event('baz').emit({id: 1, name: 'kimamula'});

// The below codes raise compilation errors
MyEventEmitter.event('fo').emit(); // typo
MyEventEmitter.event('bar').on((id: number) => {}); // wrong argument type
MyEventEmitter.event('baz').emit(1); // wrong argument type
```
