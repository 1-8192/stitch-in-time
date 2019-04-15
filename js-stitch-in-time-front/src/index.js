function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  img = loadImage('./images/cover.png');
  textSize(36);
  textFont("Courier New");
}

function draw() {
  // Displays the image at its actual size at point (0,0)
  background(img, 0, 0, width, height);


  //Welcome message
  let x= text("Hi there. Welcome to A Stitch in Time, a digital storybook based on the book by Himradi Das and Veena Prasad. Illustrations by Ankitha Kini", 200, 200, 800, 300);

  function mousePressed() {
    if (x) {
      x = text("What's your name?", 200, 200, 800, 300);
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {

});
