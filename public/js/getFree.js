document.addEventListener("DOMContentLoaded", function () {
  const inputBox = document.querySelector(".overlay-input");
  const buttons = document.querySelectorAll(".rectangle-button");
  const submitButton = document.querySelector(".submit-card"); // Make sure to select the submit button

  if (buttons.length > 0) {
    buttons.forEach((button) => {
      button.addEventListener("click", function (event) {
        const buttonValue = button.textContent;

        // Get the parent div of the clicked button
        const parentDiv = button.closest(".button-overlay");

        // Add focused class to the clicked button within the same parent div
        const sectionButtons = parentDiv.querySelectorAll(".rectangle-button");
        sectionButtons.forEach((btn) => btn.classList.remove("focused"));
        button.classList.add("focused");

        // Stop propagation to prevent global click listener from removing focus
        event.stopPropagation();

        // Check if form is completely filled
        checkFormCompletion();
      });
    });
  } else {
    console.error("Buttons not found");
  }

  // Global click listener to remove focus from input box when clicking elsewhere
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".overlay-input")) {
      if (inputBox) {
        inputBox.classList.remove("focused");
      }
    }
  });

  // Add input event listener to the input box
  inputBox.addEventListener("input", checkFormCompletion);

  // Add submit button event listener
  submitButton.addEventListener("click", () => {
    const inputValue = inputBox.value.trim();
    const selectedButtons = document.querySelectorAll(
      ".rectangle-button.focused",
    );

    const selectedValues = Array.from(selectedButtons).map((button) =>
      button.textContent.trim(),
    );

    // Check if form is completely filled
    if (!inputValue || selectedValues.length < 2) {
      alert("Please fill out all fields before continuing.");
      return;
    }

    // Build URL with form data
    const urlParams = new URLSearchParams({
      subject: inputValue,
      length: selectedValues[0], // Length is the first selected value
      difficulty: selectedValues[1], // Difficulty is the second selected value
    });

    // Redirect to free.html with the built query string
    window.location = `free.html?${urlParams.toString()}`;
  });

  const checkFormCompletion = () => {
    const inputBox = document.querySelector(".overlay-input");
    const selectedButtons = document.querySelectorAll(
      ".rectangle-button.focused",
    );

    const inputValue = inputBox.value.trim();
    const selectedValues = Array.from(selectedButtons).map((button) =>
      button.textContent.trim(),
    );

    if (inputValue && selectedValues.length === 2) {
      createSubtitle("press to create test!");
      submitButton.classList.add("clickable");
    } else {
      createSubtitle("fill out form");
      submitButton.classList.remove("clickable");
    }
  };

  // Initial check to set the correct state of the submit button
  checkFormCompletion();
});
