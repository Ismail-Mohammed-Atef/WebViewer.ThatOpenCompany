export async function active_clipper(
  clipper,       // The clipper component responsible for creating and managing clipping planes
  edges,         // The edges component responsible for styling and rendering clipping plane edges
  world,         // The 3D world object containing the scene, camera, and renderer
  clipping_btn,  // The button element used to toggle the clipping functionality
  OBCF,          // The Open BIM Components Front library (for types and utilities)
  THREE          // The Three.js library (for creating materials and working with 3D objects)
) {
  // Check if the clipping button is currently active (i.e., the clipping functionality is enabled)
  const active = clipping_btn.classList.contains("active");

  // If the button is active, enable the clipping functionality
  if (active) {
    // Enable the clipper component
    clipper.enabled = true;

    // Set the type of clipping plane to use (e.g., EdgesPlane for visible edges)
    clipper.Type = OBCF.EdgesPlane;

    // Create materials for the clipping plane edges:
    // - blueFill: A red material for the filled area of the clipping plane
    const blueFill = new THREE.MeshBasicMaterial({ color: "red", side: 2 });

    // - blueLine: A black material for the lines of the clipping plane
    const blueLine = new THREE.LineBasicMaterial({ color: "black" });

    // - blueOutline: A semi-transparent blue material for the outline of the clipping plane
    const blueOutline = new THREE.MeshBasicMaterial({
      color: "blue",
      opacity: 0.5,
      side: 2,
      transparent: true,
    });

    // Apply the materials to the clipping plane edges using the edges.styles.create method
    edges.styles.create(
      "Red lines",  // Name of the style (used for identification)
      world.meshes, // The meshes in the 3D world to which the style will be applied
      world,        // The 3D world object
      blueLine,     // Material for the lines
      blueFill,     // Material for the filled area
      blueOutline   // Material for the outline
    );

    // Update the edges to apply the new styles
    await edges.update(true);
  } 
  // If the button is not active, disable the clipping functionality
  else {
    // Disable the clipper component
    clipper.enabled = false;

    // Remove the "active" class from the button to update its appearance
    clipping_btn.classList.remove("active");

    // Delete all existing clipping planes from the scene
    clipper.deleteAll();
  }
}