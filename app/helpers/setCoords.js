export const setCoords = (currentPosition, width, index) => {
  if (!index) {
    return {
      leftPosition: 0,
    };
  }

  const leftPosition = currentPosition + width;

  return {
    leftPosition,
  };
};
