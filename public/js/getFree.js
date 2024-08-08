document.addEventListener('DOMContentLoaded', function() {
    const inputBox = document.querySelector('.overlay-input');
    const buttons = document.querySelectorAll('.rectangle-button');

    console.log('Input Box:', inputBox);
    console.log('Buttons:', buttons);



    if (buttons.length > 0) {
        buttons.forEach(button => {
            button.addEventListener('click', function(event) {
                const buttonValue = button.textContent;
                console.log('Button Value:', buttonValue);
    
                // Get the parent div of the clicked button
                const parentDiv = button.closest('.button-overlay');
    
                // Add focused class to the clicked button within the same parent div
                const sectionButtons = parentDiv.querySelectorAll('.rectangle-button');
                sectionButtons.forEach(btn => btn.classList.remove('focused'));
                button.classList.add('focused');
    
                // Stop propagation to prevent global click listener from removing focus
                event.stopPropagation();
            });
        });
    } else {
        console.error('Buttons not found');
    }
    // Add a global click listener to remove focus from input box when clicking elsewhere
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.overlay-input')) {
            if (inputBox) {
                inputBox.classList.remove('focused');
            }
        }
    });
});

// Define the handleButtonClick function
function handleButtonClick(buttonId) {
    console.log('Button clicked:', buttonId);
}


submitButton.addEventListener('click', () => {
    if (submitButton.classList.contains("clickable")) {
        const inputBox = document.querySelector('.overlay-input');
        const selectedButtons = document.querySelectorAll('.rectangle-button.focused');
  
        const inputValue = inputBox.value.trim();
        const selectedValues = Array.from(selectedButtons).map(button => button.textContent.trim());
  
        const urlParams = new URLSearchParams({
            subject: inputValue,
            length: selectedValues[0],
            difficulty: selectedValues[1]
        });
  
        window.location.href = `free.html?${urlParams.toString()}`;
    }
  });
  

fetch('https://x4f6ezfwiloumemi2tkgozxltu0ufwjn.lambda-url.us-west-2.on.aws/make_quiz?subject=math&questionNum=5&difficulty=easy')