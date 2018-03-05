const { AudioContext } = window;
const audioContext = new AudioContext();

export function generateSound(frequency) {
  const masterDry = audioContext.createGain();
  masterDry.gain.value = 10;

  const filter = audioContext.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 30;

  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = frequency;
  oscillator.type = 'square';

  oscillator.connect(filter);
  filter.connect(masterDry);
  masterDry.connect(audioContext.destination);
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
}
