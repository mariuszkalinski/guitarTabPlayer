export const getFretSpacing = (index, fretsSpacing) => {
  if (!index) return 0;
  return Math.round((fretsSpacing[index - 1] - fretsSpacing[index]) * 3000);
};
