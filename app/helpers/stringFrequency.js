export const stringFrequencyFormula = (stringsData, fretsDistance) => {
  const fretboardData = [];
  fretsDistance.forEach((distance, distanceIndex) => {
    stringsData.forEach((string) => {
      const { name, tension, unitWeight } = string;
      const frequency = (1 / (distance * 2)) * (Math.sqrt(tension / unitWeight));
      fretboardData[name] = [
        ...fretboardData[name] || [],
        {
          xcoord: distanceIndex,
          note: 'A',
          frequency,
        },
      ];
    });
  });
  return fretboardData;
};
