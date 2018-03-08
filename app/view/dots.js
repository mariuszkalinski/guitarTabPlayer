import { setCoords } from '../helpers/setCoords';

export const generateDotsView = (context, data, width, height) => {
  data.forEach((element) => {
    const [xcoord, ycoord] = element;

    const { leftPosition, topPosition } = setCoords(xcoord, ycoord, width, height);

    context.beginPath();
    context.arc(leftPosition + (width / 2), topPosition, 10, 0, 2 * Math.PI);
    context.fill();
    context.stroke();
  });
};
