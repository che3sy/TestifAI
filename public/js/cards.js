document.getElementById("cards").onmousemove = (e) => {
  for (const card of document.getElementsByClassName("card")) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  }
};

const subtitle = document.getElementsByClassName("submit-card-subtitle")[0];
const submitButton = document.querySelector(".submit-card");

const createWord = (text, index) => {
  const word = document.createElement("span");
  word.innerHTML = `${text} `;
  word.classList.add("submit-card-subtitle-word");
  word.style.transitionDelay = `${index * 40}ms`;
  return word;
};

const addWord = (text, index) => subtitle.appendChild(createWord(text, index));

const createSubtitle = (text) => {
  subtitle.innerHTML = "";
  text.split(" ").map(addWord);
};

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

// Add event listener to the input box to check form completion on input
document
  .querySelector(".overlay-input")
  .addEventListener("input", checkFormCompletion);

// Add event listeners to the buttons to check form completion on click
document.querySelectorAll(".rectangle-button").forEach((button) => {
  button.addEventListener("click", () => {
    // Ensure only one button per section is focused
    const parentDiv = button.closest(".button-overlay");
    const sectionButtons = parentDiv.querySelectorAll(".rectangle-button");
    sectionButtons.forEach((btn) => btn.classList.remove("focused"));
    button.classList.add("focused");

    checkFormCompletion();
  });
});

// Initial check to set the correct state of the submit button
checkFormCompletion();

createSubtitle("fill out form");
