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
