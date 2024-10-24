document.addEventListener("DOMContentLoaded", function () {
  const inputBox = document.querySelector(".overlay-input");
  const buttons = document.querySelectorAll(".rectangle-button");
  const submitButton = document.querySelector(".submit-card");

  let selectedLength = ""; // Store the selected length value
  let selectedDifficulty = ""; // Store the selected difficulty value

  // Button click listener for selecting length/difficulty
  if (buttons.length > 0) {
    buttons.forEach((button) => {
      button.addEventListener("click", function (event) {
        // Get the parent div of the clicked button
        const parentDiv = button.closest(".button-overlay");

        // Add focused class to the clicked button within the same parent div
        const sectionButtons = parentDiv.querySelectorAll(".rectangle-button");
        sectionButtons.forEach((btn) => btn.classList.remove("focused"));
        button.classList.add("focused");

        // Check if it's a length button or difficulty button
        if (
          button.closest(".card").querySelector("h3").textContent === "Length"
        ) {
          selectedLength = button.textContent.trim(); // Set selected length
        } else {
          selectedDifficulty = button.textContent.trim(); // Set selected difficulty
        }

        // Stop propagation to prevent global click listener from removing focus
        event.stopPropagation();
      });
    });
  } else {
    console.error("Buttons not found");
  }

  // Submit button listener to validate and redirect
  submitButton.addEventListener("click", () => {
    const inputValue = inputBox.value.trim();

    if (inputValue && selectedLength && selectedDifficulty) {
      const urlParams = new URLSearchParams({
        subject: inputValue,
        length: selectedLength,
        difficulty: selectedDifficulty,
      });

      const useAltEndpoint =
        new URLSearchParams(window.location.search).get("altEndpoint") ===
        "true";
      urlParams.set("altEndpoint", useAltEndpoint);

      // Redirect with the query parameters
      window.location.href = `free.html?${urlParams.toString()}`;
    } else {
      // If form is incomplete, alert the user
      alert("Please fill out the form completely.");
    }
  });

  // Add a global click listener to remove focus from input box when clicking elsewhere
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".overlay-input")) {
      if (inputBox) {
        inputBox.classList.remove("focused");
      }
    }
  });

  // Toggle altEndpoint based on checkbox
  document
    .getElementById("endpointSwitch")
    .addEventListener("change", function () {
      const useAltEndpoint = this.checked;
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("altEndpoint", useAltEndpoint ? "true" : "false");
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}?${urlParams}`,
      );
    });
});
