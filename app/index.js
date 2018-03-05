import { notesData } from './notesData';
import { generateSound } from './audioService';

const elem = document.getElementById('myCanvas');
const elemLeft = elem.offsetLeft;
const elemTop = elem.offsetTop;
const context = elem.getContext('2d');

elem.addEventListener('click', (event) => {
  const x = event.pageX - elemLeft;
  const y = event.pageY - elemTop;

  notesData.forEach((element) => {
    if (y > element.top && y < element.top + element.height && x > element.left && x < element.left + element.width) {
      generateSound(element.frequency);
    }
  });
}, false);

notesData.forEach((element) => {
  context.fillStyle = element.colour;
  context.fillRect(element.left, element.top, element.width, element.height);
  context.fillStyle = 'red';
  context.textAlign = 'center';
  context.fillText(element.name, element.left + 20, element.top + 20);
});
