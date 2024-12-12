// Get the santa-cam div
const santaCam = document.getElementById("santa-cam");

// Create an img element for the sleigh
const sleigh = document.createElement("img");
sleigh.src = "/static/assets/sleigh.png";
sleigh.style.position = "absolute";
sleigh.style.height = "100px"; // Adjust size as needed
sleigh.style.left = "-200px"; // Start off-screen
sleigh.style.top = "50%"; // Center vertically
sleigh.style.transform = "translateY(-50%)";

// Add the sleigh to the container
santaCam.appendChild(sleigh);

// Animation
function animate() {
  // Get current position
  let currentLeft = parseInt(sleigh.style.left);

  // Move right
  currentLeft += 2; // Adjust speed by changing this number

  // Reset position when off screen
  if (currentLeft > santaCam.offsetWidth) {
    currentLeft = -200; // Reset to start
  }

  // Update position
  sleigh.style.left = currentLeft + "px";

  // Continue animation
  requestAnimationFrame(animate);
}

// Start animation
animate();
