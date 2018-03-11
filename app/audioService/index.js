const { AudioContext } = window;
const audioContext = new AudioContext();

export function generateSound(frequency) {
  const masterDry = audioContext.createGain();
  masterDry.gain.value = 1;

  const filter = audioContext.createBiquadFilter();
  filter.type = 'lowpass';
  // FILTERS TYPES AVAILABLE
  // "lowpass",
  // "highpass",
  // "bandpass",
  // "lowshelf",
  // "highshelf",
  // "peaking",
  // "notch",
  // "allpass"

  // filter.frequency.value = 1000;

  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = frequency;
  oscillator.type = 'triangle';
  // TYPES AVAILABLE
  // "sine",
  // "square",
  // "sawtooth",
  // "triangle",
  // "custom"
  oscillator.connect(masterDry);

  // oscillator.connect(filter);
  // filter.connect(masterDry);
  masterDry.connect(audioContext.destination);
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}

export const FRETS_DISTANCE = [
  0.65000,
  0.61352,
  0.57908,
  0.5466,
  0.51591,
  0.48695,
  0.45962,
  0.43382,
  0.40947,
  0.38649,
  0.3648,
  0.34433,
  0.325,
  0.30676,
  0.28954,
  0.27329,
  0.25795,
  0.24347,
  0.22981,
  0.21691,
  0.20474,
];

export const STRINGS_PROPERTIES = [
  {
    name: 'E - 1st',
    tension: 72.176944,
    thickness: 0.250000,
    unitWeight: 0.000395554,
  },
  {
    name: 'B - 2nd',
    tension: 79.335799,
    thickness: 0.360000,
    unitWeight: 0.0007753929,
  },
  {
    name: 'G - 3rd',
    tension: 120.915995,
    thickness: 0.584200,
    unitWeight: 0.0018766938,
  },
  {
    name: 'D - 4th',
    tension: 115.326204,
    thickness: 0.762000,
    unitWeight: 0.0032308634,
  },
  {
    name: 'A - 5th',
    tension: 115.326204,
    thickness: 0.990600,
    unitWeight: 0.0053686407,
  },
  {
    name: 'E - 6th',
    tension: 85.415922,
    thickness: 1.193800,
    unitWeight: 0.0077921454,
  },
];

export const stringFrequencyFormula = (stringsData, fretsDistance) => {
  let fretboardData = [];
  fretsDistance.forEach((distance, distanceIndex) => {
    stringsData.forEach((string, stringIndex) => {
      const { tension, unitWeight } = string;
      const frequency = Math.round((1 / distance / 2) * (Math.sqrt(tension / unitWeight)));
      fretboardData = [
        ...fretboardData,
        {
          coordinates: [distanceIndex, stringIndex],
          note: 'A',
          frequency,
        },
      ];
    });
  });
  return fretboardData;
};

console.table(stringFrequencyFormula(STRINGS_PROPERTIES, FRETS_DISTANCE)); //eslint-disable-line
