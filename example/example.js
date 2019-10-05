import 'regenerator-runtime/runtime';
import Morbido from '../src/index';

const morbidoTarget = document.getElementById('morbido-target');

const morbido = new Morbido(morbidoTarget, {
  onExit: ({ mutation, exitingElement, enteringElement }) => {
    console.log('[onExit]', mutation);
    exitingElement.classList.add('hide');
    enteringElement.classList.add('hide');

    return new Promise(resolve => setTimeout(resolve, 600));
  },
  onMutation: ({ mutation }) => {
    console.log('[onMutation]', mutation);
    return new Promise(resolve => setTimeout(resolve, 1200));
  },
  onEnter: ({ mutation, enteringElement }) => {
    console.log('[onEnter]', mutation);
    enteringElement.classList.remove('hide');
    return new Promise(resolve => setTimeout(resolve, 600));
  },
});

const DUMMY_PARAGRAPH =
  'Forte, frittata tortellini paparazzi caprese, forte, cupola zucchini\
pronto tombola caprese salami. Spaghetti confetti ballerina cannelloni\
tortellini spaghetti espresso, ciao panini pepperoni ballerina\
zucchini gnocchi pepperoni, barista <strong>gnocchi mamma</strong> salami frittata\
pepperoni.';

let pCount = 0;
setInterval(() => {
  pCount = (pCount + 1) % 3;
  let i = pCount;

  Array.from(morbidoTarget.querySelectorAll('p')).forEach(p => p.remove());

  const p = document.createElement('p');
  p.innerHTML = DUMMY_PARAGRAPH;

  morbidoTarget.appendChild(p);
  while (i-- > 0) morbidoTarget.appendChild(p.cloneNode(true));

  debugger;

  morbido.mutate();
}, 3000);
