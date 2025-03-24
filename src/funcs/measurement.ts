// Function to handle the length measurement functionality

export function LengthMeasurement(lengthBtn, length_component, Container) {
  // Check if the length measurement button is currently active (i.e., the measurement tool is enabled)
  const active = lengthBtn.classList.contains("active");

  // If the button is active, enable the length measurement functionality
  if (active) {
    // Enable the length measurement component
    length_component.visible = true; // Make the measurement tool visible
    length_component.enabled = true; // Enable the measurement tool
    length_component.snapDistance = 1; // Set the snap distance for measurements (e.g., 1 unit)

    // Add a click event listener to the container to create a new measurement when clicked
    Container.onclick = () => length_component.create();

    // Add a keydown event listener to handle keyboard shortcuts
    window.addEventListener("keydown", (event) => {
      if (event.code === "KeyD" || event.code === "Backspace") {
        length_component.delete();
      } else if (event.key === "Escape") {
        length_component.cancelCreation();
      }
    });
    
  } 

}

