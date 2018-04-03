import { drawOsciloscope } from '../tools/osciloscope';

export class SoundGenerator {
  constructor(audioContext, debugSoundWave) {
    this.sampleRate = audioContext.sampleRate;
    this.processor = audioContext.createScriptProcessor(512, 0, 1);
    this.playing = false;
    this.analyser = audioContext.createAnalyser();

    if (debugSoundWave) {
      const canvas = document.getElementById('oscilloscope');

      drawOsciloscope(canvas, this.analyser);

      this.analyser.connect(audioContext.destination);
      this.processor.connect(this.analyser);
    } else {
      this.processor.connect(audioContext.destination);
    }
  }

  play(frequency) {
    const fundamentalFrequency = Math.round(this.sampleRate / frequency);
    let impulse = this.sampleRate / 1000;
    const float32 = new Float32Array(fundamentalFrequency);
    let n = 0;

    this.processor.onaudioprocess = (event) => {
      const out = event.outputBuffer.getChannelData(0);
      let i = 0;
      let xn;

      for (i; i < out.length; i += 1) {
        impulse -= 1;
        xn = impulse >= 0 ? Math.random() - 0.5 : 0;

        const finalWave = xn + ((float32[n] + float32[(n + 1) % fundamentalFrequency]) / 2);

        float32[n] = finalWave;
        out[i] = finalWave;

        n += 1;
        if (n >= fundamentalFrequency || !this.playing) {
          n = 0;
        }
      }
    };

    this.playing = true;
  }
  pause() {
    this.playing = false;
  }
}
