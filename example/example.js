import 'regenerator-runtime/runtime';
import Morbido from '../src/index';

const morbidoTarget = document.getElementById('morbido-target');
const changingParagraph = document.getElementById('changing-paragraph');

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
morbido.watch();

const DUMMY_PARAGRAPH =
  'Forte, frittata tortellini paparazzi caprese, forte, cupola zucchini\
pronto tombola caprese salami. Spaghetti confetti ballerina cannelloni\
tortellini spaghetti espresso, ciao panini pepperoni ballerina\
zucchini gnocchi pepperoni, barista gnocchi mamma salami frittata\
pepperoni.';

let pCount = 0;
setInterval(() => {
  pCount = (pCount + 1) % 3;
  let i = pCount + 1;
  let p = '';
  while (i-- > 0) p += ' ' + DUMMY_PARAGRAPH;

  changingParagraph.innerText = p;
}, 3000);
