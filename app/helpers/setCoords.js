export const setCoords = (x, y, width, height) => {
  const firstRowTopPosition = height * 6;

  const leftPosition = x * width;
  const topPosition = firstRowTopPosition - (y * height);

  return {
    leftPosition,
    topPosition,
  };
};
