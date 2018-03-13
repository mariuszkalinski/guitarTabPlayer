import { generateSound } from '../audioService';
import { generateDotsView } from './dots';
import { setCoords } from '../helpers/setCoords';
import { getFretSpacing } from '../helpers/getFretSpacing';
import { FRETS_DISTANCE } from '../consts';

const generateGuitarView = (getContext, data, height) => {
  const {
    elem,
    elemLeft,
    elemTop,
    context,
  } = getContext;

  Object.keys(data).forEach((key, index) => {
    let notePosition = 0;
    data[key].forEach((element, elementIndex) => {
      const {
        note,
        frequency,
      } = element;
      const topPosition = index * height;
      const width = getFretSpacing(elementIndex, FRETS_DISTANCE);
      const { leftPosition } = setCoords(notePosition, width, elementIndex);

      context.fillStyle = '#a57c00';
      context.strokeStyle = 'white';
      context.fillRect(leftPosition, topPosition, width, height);
      context.strokeRect(leftPosition, topPosition, width, height);
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.fillText(note, leftPosition + (width / 2), (topPosition) + (height / 2));
      context.fillText(Math.round(frequency), leftPosition + (width / 2), (topPosition) + (height / 2) + 10);

      elem.addEventListener('click', (event) => {
        const x = event.pageX - elemLeft;
        const y = event.pageY - elemTop;
        if (y > topPosition
          && y < topPosition + height
          && x > leftPosition
          && x < leftPosition + width) {
          if (frequency) {
            generateSound(frequency);
          }
        }
      });
      notePosition = leftPosition;
    });
  });
};

export { generateGuitarView, generateDotsView, setCoords };
