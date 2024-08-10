

let id;


function fetchData() {
    const loadingScreen = document.getElementById('loading-screen');
    const responseContainer = document.getElementById('response-container');

    // Show the loading screen
    loadingScreen.style.display = 'flex';

    // Extract URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    const length = urlParams.get('length');
    const difficulty = urlParams.get('difficulty');

    // Construct the API URL with parameters
    const apiUrl = `https://x4f6ezfwiloumemi2tkgozxltu0ufwjn.lambda-url.us-west-2.on.aws/make_free_response?type=${length}&subject=${subject}&difficulty=${difficulty}`;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            id = data.id;
            
            // Hide the loading screen
            loadingScreen.style.display = 'none';

            // Display the response data
            responseContainer.style.display = 'block';
            displayQuestion(data);

            // Stop the animation
            clearInterval(animationInterval);
        })
        .catch(error => {
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

// Function to display a single question
function displayQuestion(data) {
    const responseContainer = document.getElementById('response-container');
    responseContainer.innerHTML = ''; // Clear any existing content
    
    const card = document.createElement('div');
    card.className = 'question-card';
    
    if (!data.question) {
        window.location.reload();
        return;
    }

    const questionTitle = document.createElement('h2');
    questionTitle.className = 'question-title';
    questionTitle.textContent = data.question;
    card.appendChild(questionTitle);

    const answerArea = document.createElement('textarea');
    answerArea.className = 'answer-area';
    card.appendChild(answerArea);

    const gradeButton = document.createElement('button');
    gradeButton.textContent = 'Grade';
    gradeButton.className = 'grade-button';
    gradeButton.addEventListener('click', () => gradeAnswer(answerArea.value, answerArea, gradeButton));
    card.appendChild(gradeButton);

    const rubricContainer = document.createElement('div');
    rubricContainer.className = 'rubric-container';
    rubricContainer.style.display = 'none';


    const rubricTitle = document.createElement('h3');
    rubricTitle.className = 'rubric-title';
    rubricTitle.textContent = 'Rubric:';
    rubricContainer.appendChild(rubricTitle);

    const rubricText = document.createElement('p');
    rubricText.textContent = data.rubric;
    rubricContainer.appendChild(rubricText);

    card.appendChild(rubricContainer);
    responseContainer.appendChild(card);
    

    const answertArea = document.querySelector('.answer-area');
    answertArea.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
}

async function updateUserResponse(newResponse) {
    const { data, error } = await _supabase
        .from('Quiz')
        .update({ Useranswer: newResponse})
        .eq('id', id)

}


async function gradeAnswer(userAnswer, answerArea, gradeButton) {
    const responseContainer = document.getElementById('response-container');
    answerArea.setAttribute('readonly', true);


    gradeButton.setAttribute('disabled', true);
    gradeButton.classList.add('shut');
    const rubricContainer = document.querySelector('.rubric-container');
    rubricContainer.style.display = 'block';

    const loadingElement = document.createElement('div');
    loadingElement.className = 'loading-animation';
    loadingElement.textContent = 'Loading...';
    rubricContainer.appendChild(loadingElement);

    await updateUserResponse(userAnswer);


    try {
        const response = await fetch(`https://x4f6ezfwiloumemi2tkgozxltu0ufwjn.lambda-url.us-west-2.on.aws/grade?id=${id}`);
        const gradeInfo = await response.json();



        rubricContainer.removeChild(loadingElement);

        const gradeElement = document.createElement('p');
        gradeElement.className = 'grade-text'; 
        gradeElement.textContent = `Grade: ${gradeInfo.grade}`;
        rubricContainer.appendChild(gradeElement);

        const feedbackElement = document.createElement('p');
        feedbackElement.className = 'feedback-text';
        feedbackElement.textContent = `Feedback: ${gradeInfo.feedback}`;
        rubricContainer.appendChild(feedbackElement);
        
        const newQuizButton = document.createElement('button');
        newQuizButton.className = 'new-quiz-button';
        newQuizButton.textContent = 'New Quiz';
        newQuizButton.setAttribute('onclick', 'redirectToMakeQuiz()');
        responseContainer.appendChild(newQuizButton);

    } catch (error) {
        console.error('Error fetching grade information:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
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

const { createClient } = supabase
const _supabase = createClient('https://llhpftmlgrgmosegssmr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsaHBmdG1sZ3JnbW9zZWdzc21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjMwMTU1NDksImV4cCI6MjAzODU5MTU0OX0.Xmdjm4t5w9CBr0yKHjx_yP1nhGyoeqPZVKJXzfvfF4g')



