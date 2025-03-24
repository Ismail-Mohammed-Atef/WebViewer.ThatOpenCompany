// Import necessary libraries and modules
import * as OBC from "@thatopen/components";       // Core library for managing 3D components
import * as OBCF from "@thatopen/components-front"; // Frontend library for rendering and visual effects
import * as THREE from "three";                    // Three.js library for 3D rendering

// Function to set up the 3D environment
export function setup(components, container, World) {
  // Initialize the 3D scene using the SimpleScene component
  World.scene = new OBC.SimpleScene(components);

  // Initialize the renderer with post-processing capabilities
  World.renderer = new OBCF.PostproductionRenderer(components, container);

  // Initialize the camera with orthographic and perspective modes
  World.camera = new OBC.OrthoPerspectiveCamera(components);

  // Initialize all registered components in the components registry
  components.init();

  // Disable general post-processing effects (e.g., bloom, anti-aliasing)
  World.renderer.postproduction.enabled = false;

  // Enable the outline effect for selected objects
  World.renderer.postproduction.customEffects.outlineEnabled = true;

  // Set up the scene (e.g., add default lighting, configure background)
  World.scene.setup();

  // Create an axes helper to visualize the X, Y, and Z axes in the scene
  const axesHelper = new THREE.AxesHelper(6); // 6 is the length of each axis line
  World.scene.three.add(axesHelper); // Add the axes helper to the scene

  // Create a grid system for the 3D scene
  const grids = new OBC.Grids(components);
  grids.create(World); // Add the grid to the World object

  // (Optional) Uncomment this line to manually add the grid to the scene
  // World.scene.three.add(grids);

  // Set the background color of the scene to white
  World.scene.three.background = new THREE.Color("rgb(69, 69, 69)");
}