let mic;
let currentColor;
let targetColor;
let transitionSpeed = 0.0018; // Speed of color transition

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('sketch-container'); // Set parent to the sketch container
    colorMode(RGB);

    mic = new p5.AudioIn();
    mic.start();
  
    // Initialize currentColor to a starting color
    currentColor = color(31, 70, 255); // Starting color, blue
    targetColor = currentColor; // Initially, the target color is the same as the current color

    // Resize canvas when window is resized
    window.addEventListener('resize', function() {
        resizeCanvas(windowWidth, windowHeight);
    });

    // Add click event listener to canvas
    canvas.mousePressed(toggleFullScreen);
}

function draw() {
    let vol = mic.getLevel();
  
    // Map volume to target color
    if (vol > 0.009) {
        // Orange
        targetColor = color(252, 165, 11);
    } else {
        // Blue
        targetColor = color(31, 70, 255);
    }
  
    // Gradually transition the current color towards the target color
    currentColor = transitionColor(currentColor, targetColor, transitionSpeed);
  
    background(currentColor); // Change background color based on smoothed sound level
}

function transitionColor(current, target, speed) {
    // Calculate the difference between each color component
    let deltaRed = red(target) - red(current);
    let deltaGreen = green(target) - green(current);
    let deltaBlue = blue(target) - blue(current);
  
    // Gradually adjust each color component towards the target color
    let newRed = red(current) + deltaRed * speed;
    let newGreen = green(current) + deltaGreen * speed;
    let newBlue = blue(current) + deltaBlue * speed;
  
    // Return the new color
    return color(newRed, newGreen, newBlue);
}

function toggleFullScreen() {
    let fs = fullscreen(this.canvas); // Toggle full-screen mode for the canvas element
    fullscreen(this.canvas, !fs);
}

function mousePressed() {
    userStartAudio();
}
