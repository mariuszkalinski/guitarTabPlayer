const { AudioContext } = window;

const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();

analyser.fftSize = 2048;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

// Get a canvas defined with ID "oscilloscope"
const canvas = document.getElementById('oscilloscope');
const canvasCtx = canvas.getContext('2d');

// draw an oscilloscope of the current audio source

function draw() {
  analyser.getByteTimeDomainData(dataArray);

  canvasCtx.fillStyle = 'rgb(200, 200, 200)';
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

  canvasCtx.lineWidth = 2;
  canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

  canvasCtx.beginPath();

  const sliceWidth = (canvas.width * 1.0) / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i += 1) {
    const v = dataArray[i] / 128.0;
    const y = (v * canvas.height) / 2;

    if (i === 0) {
      canvasCtx.moveTo(x, y);
    } else {
      canvasCtx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasCtx.lineTo(canvas.width, canvas.height / 2);
  canvasCtx.stroke();

  window.requestAnimationFrame(draw);
}

draw();

export function generateSound(frequency) {
  const masterDry = audioContext.createGain();
  masterDry.gain.value = 1;

  const filter = audioContext.createBiquadFilter();
  filter.type = 'lowpass';

  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = frequency;
  oscillator.type = 'square';

  oscillator.connect(masterDry);

  masterDry.connect(audioContext.destination);
  masterDry.connect(analyser);
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
