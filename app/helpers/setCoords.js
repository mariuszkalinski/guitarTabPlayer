export const setCoords = (x, y, width, height) => {
  const firstRowTopPosition = 0;

  const leftPosition = x * width;
  const topPosition = firstRowTopPosition + (y * height);

  return {
    leftPosition,
    topPosition,
  };
};
