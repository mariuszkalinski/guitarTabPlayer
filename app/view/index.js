import { generateSound } from '../audioService';
import { generateDotsView } from './dots';
import { setCoords } from '../helpers/setCoords';

import { dotsData } from '../data/dotsData';

// import guitarSvg from '../assets/guitar.svg';

let currentFrequency = null;

const generateGuitarView = (getContext, data, width, height) => {
  const {
    elem,
    elemLeft,
    elemTop,
    context,
  } = getContext;

  // const imgData = encodeURIComponent(guitarSvg);

  // const img = new Image();

  // img.onload = () => {
  //   context.drawImage(img, 0, 0);

  //   elem.toBlob((blob) => {
  //     const newImg = document.createElement('img');
  //     const url = URL.createObjectURL(blob);

  //     newImg.onload = () => {
  //       URL.revokeObjectURL(url);
  //     };

  //     newImg.src = url;
  //     document.body.appendChild(newImg);
  //   });
  // };

  // img.src = `data:image/svg+xml,${imgData}`;

  context.fillRect(0, 10, 53, 221);

  elem.addEventListener('click', (event) => {
    const x = event.pageX - elemLeft;
    const y = event.pageY - elemTop;

    data.forEach((element) => {
      const {
        coordinates: [xcoord, ycoord],
        note,
        frequency,
        callback,
      } = element;

      const { leftPosition, topPosition } = setCoords(xcoord, ycoord, width, height);

      if (y > topPosition
        && y < topPosition + height
        && x > leftPosition
        && x < leftPosition + width) {
        if (callback) {
          element.callback();
        }
        if (frequency) {
          generateSound(frequency);
          currentFrequency = frequency;
        }
      }

      context.fillStyle = frequency === currentFrequency ? '#7c5e02' : '#a57c00';
      context.strokeStyle = 'white';
      context.fillRect(leftPosition, topPosition, width, height);
      context.strokeRect(leftPosition, topPosition, width, height);
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.fillText(note, leftPosition + (width / 2), topPosition + (height / 2));
      context.fillText(frequency, leftPosition + (width / 2), topPosition + (height / 2) + 10);

      generateDotsView(context, dotsData, width, height);
    }, false);
  });

  data.forEach((element) => {
    const {
      coordinates: [xcoord, ycoord],
      note,
      frequency,
    } = element;

    const { leftPosition, topPosition } = setCoords(xcoord, ycoord, width, height);

    context.fillStyle = '#a57c00';
    context.strokeStyle = 'white';
    context.fillRect(leftPosition, topPosition, width, height);
    context.strokeRect(leftPosition, topPosition, width, height);
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText(note, leftPosition + (width / 2), topPosition + (height / 2));
    context.fillText(frequency, leftPosition + (width / 2), topPosition + (height / 2) + 10);
  });
};

export { generateGuitarView, generateDotsView, setCoords };
