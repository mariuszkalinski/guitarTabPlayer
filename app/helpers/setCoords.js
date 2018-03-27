export const setCoords = (currentPosition, width, index) => {
  if (index < 2) {
    return {
      leftPosition: 51,
    };
  }

  const leftPosition = currentPosition + width;

  return {
    leftPosition,
  };
};
