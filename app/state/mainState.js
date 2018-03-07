const initialState = {
  filterType: 'lowpass',
  filterFrequencyValue: 0,
  oscilatorFrequencyValue: 0,
  oscilatorType: 'triangle',
  noteDuration: 0.5,
};

export class State {
  constructor() {
    this.sound = initialState;
    this.event = new CustomEvent('build', this.sound);
  }
  get getState() { return this.sound; }
  set setState(newState) {
    this.sound = {
      ...this.sound,
      ...newState,
    };
    this.dispatchEvent('build');
  }
}
