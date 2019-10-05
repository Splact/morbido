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
