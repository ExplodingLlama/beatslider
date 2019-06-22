export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.setup = function() {
    s.createCanvas(window.innerWidth, window.innerHeight / 2);
  };

  s.state = {
    width: window.innerWidth,
    height: window.innerHeight / 2,
    clipLength: 2000, //in milliseconds
    currentTime: 0, //always between 0 and 1
    dots: [],
    timeAtLastDraw: 0
  };

  s.LINE_WIDTH = 4;
  s.BAR_HEIGHT = 100;
  s.LINE_START = (1 / 5) * s.state.width;
  s.LINE_END = (4 / 5) * s.state.width;
  s.LINE_Y = (1 / 3) * s.state.height;

  s.getLineXCoordinates = () => {
    if (
      s.mouseX >= s.LINE_START &&
      s.mouseX <= s.LINE_END &&
      s.mouseY >= s.LINE_Y - 5 &&
      s.mouseY <= s.LINE_Y + s.LINE_WIDTH + 5
    ) {
      let lineX = (s.mouseX - s.LINE_START) / (s.LINE_END - s.LINE_START);
      lineX = Math.round(lineX * 100) / 100;
      return lineX;
    }
    return -1;
  };

  s.handleDotCreationOrDeletion = lineX => {
    let pos = -1;
    if ((pos = s.state.dots.indexOf(lineX)) !== -1) {
      s.state.dots.splice(pos, 1);
    } else {
      s.state.dots.push(lineX);
    }
  };

  s.mousePressed = () => {
    let lineX = s.getLineXCoordinates();
    if (lineX >= 0 && lineX <= 1) {
      s.handleDotCreationOrDeletion(lineX);
      console.log("All the dots", s.state.dots);
    }
    return false;
  };

  s.draw = function() {
    //setup
    s.background(0);
    s.stroke(255, 221, 89);
    s.fill(255, 221, 89);
    s.rect(s.LINE_START, s.LINE_Y, s.LINE_END - s.LINE_START, s.LINE_WIDTH, 10);
    //end setup
    s.stroke(103, 89, 255);
    s.fill(103, 89, 255);
    s.state.dots.forEach(dot => {
      s.circle(
        dot * (s.LINE_END - s.LINE_START) + s.LINE_START,
        s.LINE_Y + s.LINE_WIDTH / 2,
        10
      );
    });
    //draw the bar
    s.stroke(255);
    s.fill(255);
    let barX = s.state.currentTime * (s.LINE_END - s.LINE_START) + s.LINE_START;
    s.rect(
      barX,
      s.LINE_Y - s.BAR_HEIGHT / 2 + s.LINE_WIDTH / 2,
      2,
      s.BAR_HEIGHT
    );
    //console.log(s.props);
    if (s.props.isPlaying) {
      let deltaT = s.millis() - s.state.timeAtLastDraw;
      s.state.currentTime =
        (deltaT + s.state.currentTime * s.state.clipLength) /
        s.state.clipLength;
    }
    if (s.state.currentTime > 1) {
      s.state.currentTime = 0 + s.state.currentTime - 1;
    }
    s.state.timeAtLastDraw = s.millis();
  };
}
