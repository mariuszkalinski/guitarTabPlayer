export const generateCanvasView = (id, data) => {
  const elem = document.getElementById(id);
  const elemLeft = elem.offsetLeft;
  const elemTop = elem.offsetTop;
  const context = elem.getContext('2d');

  elem.addEventListener('click', (event) => {
    const x = event.pageX - elemLeft;
    const y = event.pageY - elemTop;

    data.forEach((element) => {
      const {
        left,
        top,
        width,
        height,
        fill,
        name,
        callback,
      } = element;

      context.fillStyle = fill;
      context.fillRect(left, top, width, height);
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.fillText(name, left + 20, top + 20);

      if (y > top
          && y < top + height
          && x > left
          && x < left + width
          && callback) {
        element.callback();
      }
    });
  }, false);
};
