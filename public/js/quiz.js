// Initialize counters
let correctCounter = 0;
let incorrectCounter = 0;

// Function to update the counters
function updateCounters() {
    document.getElementById('correct-counter').textContent = correctCounter;
    document.getElementById('incorrect-counter').textContent = incorrectCounter;
}
// Function to handle option button click
function handleOptionClick(button, correctAnswer) {
    const buttons = button.parentElement.querySelectorAll('.option-button');
    buttons.forEach(btn => btn.disabled = true); // Disable all buttons

    if (button.textContent.includes(correctAnswer)) {
        button.style.backgroundColor = 'green'; // Correct answer
        correctCounter++;
    } else {
        button.style.backgroundColor = 'red'; // Incorrect answer
        incorrectCounter++;
        buttons.forEach(btn => {
            if (btn.textContent.includes(correctAnswer)) {
                btn.style.backgroundColor = 'green'; // Highlight correct answer
            }
        });
    }

    // Update the counters
    updateCounters();
}



// Function to fetch data from the API
function fetchData() {
    const loadingScreen = document.getElementById('loading-screen');
    const responseContainer = document.getElementById('response-container'); // Define responseContainer

    // Show the loading screen
    loadingScreen.style.display = 'flex';
    // Extract URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    const amount = urlParams.get('amount');
    const difficulty = urlParams.get('difficulty');
    
    
    // Construct the API URL with parameters
    const apiUrl = `https://x4f6ezfwiloumemi2tkgozxltu0ufwjn.lambda-url.us-west-2.on.aws/make_quiz?subject=${subject}&questionNum=${amount}&difficulty=${difficulty}`;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Hide the loading screen
            loadingScreen.style.display = 'none';

            // Display the response data
            responseContainer.style.display = 'block';
            displayQuestions(data.questions);

            // Stop the animation
            clearInterval(animationInterval);
        })
        .catch(error => {
            window.location.reload();
            // Hide the loading screen
            loadingScreen.style.display = 'none';

            // Display the error message
            responseContainer.style.display = 'block';
            responseContainer.textContent = 'Error fetching data';
            console.error('Error:', error);

            // Stop the animation
            clearInterval(animationInterval);
        });
}

// Function to display questions as cards
function displayQuestions(questions) {
    const responseContainer = document.getElementById('response-container');
    responseContainer.innerHTML = ''; // Clear any existing content

    questions.forEach(question => {
        const card = document.createElement('div');
        card.className = 'question-card';

        const questionTitle = document.createElement('h2');
        questionTitle.className = 'question-title';
        questionTitle.textContent = question.question;
        card.appendChild(questionTitle);

        const optionsList = document.createElement('div');
        question.options.forEach(option => {
            const optionButton = document.createElement('button');
            optionButton.textContent = option;
            optionButton.className = 'option-button';
            optionButton.addEventListener('click', () => handleOptionClick(optionButton, question.answer));
            optionsList.appendChild(optionButton);
        });
        card.appendChild(optionsList);

        responseContainer.appendChild(card);
    });
     // Add the "New Quiz" button at the end
     const newQuizButton = document.createElement('button');
     newQuizButton.className = 'new-quiz-button';
     newQuizButton.textContent = 'New Quiz';
     newQuizButton.setAttribute('onclick', 'redirectToMakeQuiz()');
     responseContainer.appendChild(newQuizButton);
}


document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const responseContainer = document.getElementById('response-container');  
    fetchData();
});

function redirectToMakeQuiz() {
    window.location.href = 'pickQuiz.html';
}










function animateText() {
    const h1Element = document.querySelector("h1");
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
        h1Element.innerText = h1Element.innerText
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return h1Element.dataset.value[index];
                }

                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");

        if (iteration >= h1Element.dataset.value.length) {
            clearInterval(interval);
        }

        iteration += 1 / 3;
    }, 30);
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let interval = null;

// Run the animation every 3 seconds
const animationInterval = setInterval(animateText, 1500);

const blob = document.getElementById("blob");

window.onpointermove = event => { 
  const { clientX, clientY } = event;
  
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`
  }, { duration: 3000, fill: "forwards" });
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const responseContainer = document.getElementById('response-container');
    const factPlaceholder = document.getElementById('fact-placeholder');

    // Function to fetch data from the API
    function fetchData2() {
        fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en')
            .then(response => response.json())
            .then(data => {
                factPlaceholder.innerText = data.text; // Update the placeholder with the fact
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                factPlaceholder.innerText = 'Failed to load fact.';
            });
    }

    // Call the fetchData function to initiate the API request
    fetchData2();
});





