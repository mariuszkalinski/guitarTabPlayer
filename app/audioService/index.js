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
  0.6135548,
  0.5791531,
  0.5466802,
  0.5160281,
  0.4870947,
  0.4597835,
  0.4340037,
  0.4096693,
  0.3866993,
  0.3650173,
  0.3445509,
  0.3252321,
  0.3069965,
  0.2897834,
  0.2735354,
  0.2581984,
  0.2437213,
  0.230056,
  0.2171568,
  0.2049809,
];

export const STRINGS_PROPERTIES = [
  {
    name: 'E1',
    tension: 72.6376,
    thickness: 0.250000,
    unitWeight: 0.000395554,
  },
  {
    name: 'B2',
    tension: 79.911,
    thickness: 0.360000,
    unitWeight: 0.0007753929,
  },
  {
    name: 'G3',
    tension: 121.845,
    thickness: 0.584200,
    unitWeight: 0.0018766938,
  },
  {
    name: 'D4',
    tension: 117.723,
    thickness: 0.762000,
    unitWeight: 0.0032308634,
  },
  {
    name: 'A5',
    tension: 109.79,
    thickness: 0.990600,
    unitWeight: 0.0053686407,
  },
  {
    name: 'E6',
    tension: 89.44,
    thickness: 1.193800,
    unitWeight: 0.0077921454,
  },
];

export const stringFrequencyFormula = (stringsData, fretsDistance) => {
  const fretboardData = [];
  fretsDistance.forEach((distance, distanceIndex) => {
    stringsData.forEach((string) => {
      const { name, tension, unitWeight } = string;
      const frequency = (1 / (distance * 2)) * (Math.sqrt(tension / unitWeight));
      fretboardData[name] = [
        ...fretboardData[name] || [],
        {
          coordinates: distanceIndex,
          note: 'A',
          frequency,
        },
      ];
    });
  });
  return fretboardData;
};

console.table(stringFrequencyFormula(STRINGS_PROPERTIES, FRETS_DISTANCE).E1); //eslint-disable-line
