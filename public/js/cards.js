document.getElementById("cards").onmousemove = e => {
  for(const card of document.getElementsByClassName("card")) {
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
  };
}

const subtitle = document.getElementsByClassName("submit-card-subtitle")[0];
const submitButton = document.querySelector(".submit-card");

const createWord = (text, index) => {
  const word = document.createElement("span");
  word.innerHTML = `${text} `;
  word.classList.add("submit-card-subtitle-word");
  word.style.transitionDelay = `${index * 40}ms`;
  return word;
}

const addWord = (text, index) => subtitle.appendChild(createWord(text, index));

const createSubtitle = text => {
  subtitle.innerHTML = ''; // Clear existing subtitle
  text.split(" ").map(addWord);
}

const checkFormCompletion = () => {
  const inputBox = document.querySelector('.overlay-input');
  const selectedButtons = document.querySelectorAll('.rectangle-button.focused');

  const inputValue = inputBox.value.trim();
  const selectedValues = Array.from(selectedButtons).map(button => button.textContent.trim());

  if (inputValue && selectedValues.length === 2) {
      console.log('You can now click');
      createSubtitle("press to create test!");
      submitButton.classList.add("clickable");
  } else {
      createSubtitle("fill out form");
      submitButton.classList.remove("clickable");
  }
}

// Add event listeners for real-time form validation
document.querySelector('.overlay-input').addEventListener('input', checkFormCompletion);
document.querySelectorAll('.rectangle-button').forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('focused');
    checkFormCompletion();
  });
});

submitButton.addEventListener('click', () => {
  if (submitButton.classList.contains("clickable")) {
      const inputBox = document.querySelector('.overlay-input');
      const selectedButtons = document.querySelectorAll('.rectangle-button.focused');

      const inputValue = inputBox.value.trim();
      const selectedValues = Array.from(selectedButtons).map(button => button.textContent.trim());

      const urlParams = new URLSearchParams({
          subject: inputValue,
          amount: selectedValues[0],
          difficulty: selectedValues[1]
      });

      window.location.href = `quiz.html?${urlParams.toString()}`;
  }
});

createSubtitle("fill out form");