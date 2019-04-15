function preload() {
  // loadFont('fonts/vd.ttf');
}

function setup() {
  cnv = createCanvas(window.innerWidth, window.innerHeight);
  img = loadImage('./images/cover.png');
  textSize(36);
  textFont('./fonts/vd.ttf');
  textStyle('BOLD');
  y = height;
  nextButton = createButton('click here');
  nextButton.mousePressed(changeBg);

}

function draw() {
  // Displays the image at its actual size at point (0,0)
  bg = background(img, 0, 0, width, height);

  //Welcome message
  if (y > 200) {
    y = y - 1
  }
  fill(59, 70, 73);
  intro = text("Hi there. Welcome to A Stitch in Time, a digital storybook based on the book by Himradi Das and Veena Prasad. Illustrations by Ankitha Kini", 200, y, 800, 300);
}

function changeBg() {
  img = loadImage('./images/a-stitch-in-time_2.png')
  bg = background(img, 0, 0, width, height);
  intro = text("")
}
