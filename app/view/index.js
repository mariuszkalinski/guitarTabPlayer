import { SoundGenerator } from '../audioService';
import { generateDotsView } from './dots';
import { setCoords } from '../helpers/setCoords';
import { getFretSpacing } from '../helpers/getFretSpacing';
import { FRETS_DISTANCE } from '../consts';
import '../styles/styles.scss';

const { AudioContext } = window;

const audioContext = new AudioContext();
const sound = new SoundGenerator(audioContext, true);

const fretboardWidth = 1200;

const generateGuitarView = (getContext, data, height) => {
  const {
    elem,
    elemLeft,
    elemTop,
    context,
  } = getContext;
  // Draw fretboard

  context.shadowColor = 'black';
  context.shadowBlur = 135;
  context.shadowOffsetX = 47;
  context.shadowOffsetY = 81;

  context.moveTo(51, 12);
  context.lineTo(1301, 0);
  context.lineTo(1301, 240);
  context.lineTo(51, 230);
  const myGradient = context.createLinearGradient(10, 0, 0, 570);
  myGradient.addColorStop(0, '#5A4112');
  myGradient.addColorStop(0.5, '#815209');
  myGradient.addColorStop(1, '#5A4112');
  context.fillStyle = myGradient;
  context.fill();
  // draw head

  context.shadowBlur = 0;
  context.shadowColor = 'transparent';
  const rectX = 0;
  const rectY = 10;
  const rectWidth = 51;
  const rectHeight = 221;
  const cornerRadius = 5;

  context.lineJoin = 'round';
  context.lineWidth = cornerRadius;
  context.fillStyle = '#D8D8D8';
  context.strokeStyle = '#D8D8D8';
  context.strokeRect(
    rectX + (cornerRadius / 2), rectY + (cornerRadius / 2),
    rectWidth - cornerRadius, rectHeight - cornerRadius,
  );
  context.fillRect(
    rectX + (cornerRadius / 2), rectY + (cornerRadius / 2),
    rectWidth - cornerRadius, rectHeight - cornerRadius,
  );

  // Draw frets
  // fretboardWidth
  const firstLastFretDistance = FRETS_DISTANCE[0] - FRETS_DISTANCE[FRETS_DISTANCE.length - 1];
  FRETS_DISTANCE.forEach((fret, index) => {
    if (index > 0) {
      const leftPosition = (((0.65 - fret) / firstLastFretDistance) * fretboardWidth) + 51;
      context.fillStyle = '#A6A6A6';
      context.fillRect(leftPosition, 10, 8, 221);
      context.fillRect(leftPosition, 10, 8, 221);
    }
  });

  // Draw string
  context.shadowColor = 'black';
  context.shadowBlur = 10;
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 2;
  context.fillStyle = '#E2E2E2';
  context.fillRect(51, 20, 1250, 3);
  context.fillRect(51, 60, 1250, 4);
  context.fillRect(51, 100, 1250, 5);
  context.fillRect(51, 140, 1250, 6);
  context.fillRect(51, 180, 1250, 7);
  context.fillRect(51, 215, 1250, 8);
  // Draw playable
  Object.keys(data).forEach((key, index) => {
    let notePosition = 0;
    data[key].forEach((element, elementIndex) => {
      const {
        frequency,
      } = element;
      const canvasProps = context.canvas.getBoundingClientRect();
      const canvasTopBorderPosition = canvasProps.y;
      const canvasLeftBorderPosition = canvasProps.x;

      const topPosition = index * height;
      const width = getFretSpacing(elementIndex, FRETS_DISTANCE) - 13;
      const { leftPosition } = setCoords(notePosition, width, elementIndex);

      elem.addEventListener('click', (event) => {
        const x = (event.pageX) - (canvasLeftBorderPosition - elemLeft);
        const y = (event.pageY) - (elemTop + canvasTopBorderPosition);

        if (y > topPosition
          && y < topPosition + height
          && x > leftPosition
          && x < leftPosition + width) {
          if (frequency) {
            sound.play(frequency);
          }
        }
      });
      notePosition = leftPosition;
    });
  });
};

export { generateGuitarView, generateDotsView, setCoords };
