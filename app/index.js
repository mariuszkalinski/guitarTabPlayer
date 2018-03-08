// import { State } from './state/mainState';

import { notesFrequencies } from './data/notesFrequencies';
import { generateGuitarView } from './view';

const width = 60;
const height = 60;

// const appState = new State();

// console.log(appState.getState);

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

generateGuitarView(createContext('myCanvas'), notesFrequencies, width, height);
