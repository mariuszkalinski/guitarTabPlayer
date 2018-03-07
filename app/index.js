import { State } from './state/mainState';

import { notesData } from './notesData';
import { generateCanvasView } from './view';

const appState = new State();

console.log(appState.getState);

const controlls = [
  {
    left: 400,
    top: 10,
    width: 30,
    height: 30,
    fill: 'yellow',
    callback() { appState.setState = { noteDuration: 2 }; console.log(appState.getState); },
  },
];

generateCanvasView('myCanvas', [...notesData, ...controlls]);

