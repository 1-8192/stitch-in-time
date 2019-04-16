let userName;
let pageCount = 2;
let welcomeButton;
let signIn;

function preload() {
  // loadFont('fonts/vd.ttf');
}

function setup() {
  cnv = createCanvas(window.innerWidth, window.innerHeight);
  img = loadImage('./images/cover.png');
  textSize(36);
  textFont('./fonts/vd.ttf');
  textStyle('BOLD');
  //height for text scrolling
  y = height;
  //button to click next
  // welcomeButton = createButton('Start reading');
  // welcomeButton.position(600,300);
  // welcomeButton.mousePressed(changeBg);
  // //input button for user name
  //
  // let signIn = createInput("Hi, what's your name?");
  // signIn.position(450, 300)
  // signIn.input(myInputEvent);

}

function draw() {
  // Displays the image at its actual size at point (0,0)
  bg = background(img, 0, 0, width, height);

  //Welcome message
  if (y > 150) {
    y = y - 5
  }
  fill(59, 70, 73);
  if (pageCount === 2) {
  intro = text("Hi there. Welcome to A Stitch in Time, a digital storybook based on the book by Himradi Das and Veena Prasad. Illustrations by Ankitha Kini", 200, y, 800, 300);
};

  if (pageCount === 2) {
    welcomeButton = createButton('Start reading');
    welcomeButton.position(600,300);
    welcomeButton.mouseClicked(changeBg(pageCount));
    //input button for user name

    let signIn = createInput("Hi, what's your name?");
    signIn.position(450, 300)
    signIn.input(myInputEvent);
  }
}

//interactivity functions
function myInputEvent() {
  userName = this.value();
};

function changeBg(count) {
  img = loadImage(`./images/a-stitch-in-time_${pageCount}.png`)
  bg = background(img, 0, 0, width, height);
  removeElements();
  pageCount ++;
};
