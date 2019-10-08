import 'regenerator-runtime/runtime';
import Morbido from '../src/index';

const morbidoTarget = document.getElementById('morbido-target');
const plushToy = document.getElementById('plush-toy');

const morbido = new Morbido(morbidoTarget, {
  timeout: {
    exit: 600,
    mutate: 1200,
    enter: 600,
  },
  onExit: ({ mutation }) => {
    console.group('🧸 Morbido mutation');
    console.log('[onExit]', mutation);

    plushToy.classList.remove('enter');
    plushToy.classList.add('exit');
  },
  onMutate: ({ mutation }) => {
    console.log('[onMutate]', mutation);

    plushToy.classList.remove('exit');
    plushToy.classList.add('mutate');
  },
  onEnter: ({ mutation }) => {
    console.log('[onEnter]', mutation);
    console.groupEnd('🧸 Morbido mutation');

    plushToy.classList.remove('mutate');
    plushToy.classList.add('enter');
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

  morbido.mutate();
}, 5000);
