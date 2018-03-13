const { AudioContext } = window;

const audioContext = new AudioContext();

export function generateSound(frequency) {
  const masterDry = audioContext.createGain();
  masterDry.gain.value = 1;

  const filter = audioContext.createBiquadFilter();
  filter.type = 'lowpass';

  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = frequency;
  oscillator.type = 'triangle';

  oscillator.connect(masterDry);

  masterDry.connect(audioContext.destination);
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

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
