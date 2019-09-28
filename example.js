import Morbido from '../es/index';

const changeButton = document.getElementById('change-button');
const morbidoTarget = document.getElementById('morbido-target');
const changingParagraph = document.getElementById('changing-paragraph');

const morbido = new Morbido(morbidoTarget);

const DUMMY_PARAGRAPH =
  'Forte, frittata tortellini paparazzi caprese, forte, cupola zucchini\
pronto tombola caprese salami. Spaghetti confetti ballerina cannelloni\
tortellini spaghetti espresso, ciao panini pepperoni ballerina\
zucchini gnocchi pepperoni, barista gnocchi mamma salami frittata\
pepperoni.';

changeButton.addEventListener('click', () => {
  let pCount = 1 + Math.round(Math.random() * 2);
  let p = '';
  while (pCount-- > 0) p += DUMMY_PARAGRAPH;

  changingParagraph.innerText = p;
});
