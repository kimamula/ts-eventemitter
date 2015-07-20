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
/// <reference path="path/to/node_modules/ts-eventemitter/dist/ts-eventemitter.d.ts" />
import {TsEventEmitter, EventBase, Event0, Event1, Event2} from 'ts-eventemitter';

export interface MyEventEmitter extends TsEventEmitter {
    event(name: 'foo'): Event0<MyEventEmitter>;
    event(name: 'bar'): Event1<MyEventEmitter, string>;
    event(name: 'baz'): Event2<MyEventEmitter, number, string>;
    event(name: string): EventBase<MyEventEmitter>;
}

var MyEventEmitter: MyEventEmitter = TsEventEmitter.create();

export default MyEventEmitter;
```

* Use it.

```typescript
/// <reference path="path/to/node_modules/ts-eventemitter/dist/ts-eventemitter.d.ts" />
import {TsEventEmitter, Event0, Event1, Event2} from 'ts-eventemitter';
import MyEventEmitter from 'MyEventEmitter';

MyEventEmitter.event('foo').on(() => {
    console.log('foo');
}).event('bar').on((name: string) => {
    console.log('Hello, ' + name);
}).event('baz').on((id: number, name: string) => {
    console.log('Hello, ' + name '. Your id is ' + id);
});

MyEventEmitter.event('foo').emit();
MyEventEmitter.event('bar').emit('kimamula');
MyEventEmitter.event('baz').emit(1, 'kimamula');

// The below codes raise compilation errors
MyEventEmitter.event('fo').emit(); // typo
MyEventEmitter.event('bar').on((id: number) => {}); // wrong argument type
MyEventEmitter.event('baz').emit(1); // wrong number of argument
```
