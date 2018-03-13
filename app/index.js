import { generateGuitarView } from './view';

import { stringFrequencyFormula } from './audioService';
import { FRETS_DISTANCE, STRINGS_PROPERTIES } from './consts';

const height = 40;

const createContext = (id) => {
  const elem = document.getElementById(id);
  const elemLeft = elem.offsetLeft;
  const elemTop = elem.offsetTop;
  const context = elem.getContext('2d');

  return {
    elem,
    elemLeft,
    elemTop,
    context,
  };
};

generateGuitarView(
  createContext('myCanvas'),
  stringFrequencyFormula(STRINGS_PROPERTIES, FRETS_DISTANCE),
  height,
);
