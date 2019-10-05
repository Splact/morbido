# Morbido 🧸

Morbido simplify the management of transitions for DOM elements with changing size.

## Use cases

- Slider with changing height due to items with different sizes
- Accordion with opening/closing areas

## Install

```
yarn add morbido
```

## Usage

```js
import Morbido from 'morbido';

...

const morbido = new Morbido(morbidoTarget, {
  onExit: ({ mutation, exitingElement, enteringElement }) => {
    exitingElement.classList.add('hide');
    enteringElement.classList.add('hide');

    // return a promise waiting for hide transition end
    return new Promise(resolve => setTimeout(resolve, 600));
  },
  onMutation: ({ mutation }) => {
    // return a promise waiting for resize transition end
    return new Promise(resolve => setTimeout(resolve, 1200));
  },
  onEnter: ({ mutation, enteringElement }) => {
    enteringElement.classList.remove('hide');

    // return a promise waiting for show transition end
    return new Promise(resolve => setTimeout(resolve, 600));
  },
});

...

target.innerText =
  'Tombola caprese, forte ballerina. Cupola lasagne tombola tortellini pronto \
zucchini ciao confetti paparazzi, panini maestro, pepperoni\ pronto lasagne \
ciao barista. Parmigiana fritti forte fritti cappuccino pizza macaroni, \
espresso pasta gnocchi pepperoni paparazzi biscotti, biscotti. Mamma mandolino \
pronto macaroni mamma berlusconi spaghetti tombola caprese cupola. Espresso \
barista barista salami.';

morbido.mutate();
```

## Mutation lifecycle

1. Previous state is restored with transition disabled and previous width and heigth set inline, then the transition is restored (if any)
2. Await for `onExit` callback
3. New width and height are set inline to the exiting element
4. Await for `onMutation` callback
5. The exiting element is replaced with the entering one
6. Await for `onEnter` callback
7. Current state is saved for future mutations

## Mutation object

The mutation object contains information about size change, with values before and after the mutation occurs.

```js
{
  width: {
    from: 480,
    to: 480,
  },
  height: {
    from: 240,
    to: 480,
  },
};
```

## Exiting element

The exiting element is a `target` clone with previous state. This is updated (a new clone is created) on these circumstances:

- the Morbido instance is created
- `watch` method is called
- a mutation is ended

## Entering element

The `target` passed when the Morbido instance is created.

## API

### Morbido(target, options?)

#### options

Type: `object`

##### watchAttributes

Type: `boolean`<br>
Default: `true`

When `true` on watch mode it observes for attribute changes

##### watchCharacterData

Type: `boolean`<br>
Default: `true`

When `true` on watch mode it observes for text node changes

##### watchChildList

Type: `boolean`<br>
Default: `true`

When `true` on watch mode it observes for child list changes

##### watchSubtree

Type: `boolean`<br>
Default: `true`

When `true` on watch mode it observes for changes on all discendants too

##### timeout

Type: `object`<br>
Default:

```
{
  exit: 0,
  mutation: 0,
  enter: 0
}
```

This object can be set to avoid the return of promises in the callbacks.

##### onExit

Type: `function`<br>
Default: `f => f`

This function is called before the previous state element starts exiting. As soon as the returned value resolves (if it's a promise) and `timeout.exit` time passed the exiting element receives the width and height inline.

##### onMutation

Type: `function`<br>
Default: `f => f`

This function is called just after the width and height of the exiting element changed. As soon as the returned value resolves (if it's a promise) and `timeout.mutation` time passed the exiting element is replaced with the entering one.

##### onEnter

Type: `function`<br>
Default: `f => f`

This function is called after the exiting element is replaced with the entering one. As soon as the returned value resolves (if it's a promise) and `timeout.enter` time passed the "previous state" is saved again.

### morbido.mutate()

Starts a mutation process (see [mutation lifecycle](#mutation-lifecycle)).

### morbido.watch()

Starts watching for mutations relaying on the [Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

_Use this mode with caution: every dom change will start a mutation process._

### morbido.stop()

Stops the watch mode.

## Maintainers

- [Dario Carella](https://github.com/Splact)
- [Marco Acierno](https://github.com/marcoacierno)
