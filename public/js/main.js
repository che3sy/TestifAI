const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');


        }
        else {
            entry.target.classList.remove('show');


        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((element) => {observer.observe(element)});












const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}


document.querySelectorAll(".cards").forEach(cardsContainer => {
  cardsContainer.onmousemove = e => {
    for(const card of cardsContainer.getElementsByClassName("card")) {
      const rect = card.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    }
  };
});


document.getElementById('quiz-button').addEventListener('click', function() {
  window.location.href = 'pickQuiz.html';
});


const animatedImage = document.querySelector('.animated-image');
const imageContainer = document.querySelector('.image-container');

animatedImage.addEventListener('animationend', () => {
  imageContainer.style.animation = 'moveUp 2s forwards';
  
});




{
  const sections = document.querySelectorAll('section');
  const dots = document.querySelectorAll('.dot');

  const updateDotSizes = (activeDot) => {
    dots.forEach(dot => {
      const distance = Math.abs([...dots].indexOf(dot) - [...dots].indexOf(activeDot));
      let scale;
      if (dot === activeDot) {
        scale = 2; // Make the active dot significantly larger
      } else {
        scale = Math.max(0.2, 1 - distance * 0.2); 
      }
      dot.style.transform = `scale(${scale})`;
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const activeDot = document.querySelector(`.dot[data-section="${entry.target.id}"]`);
      if (entry.isIntersecting) {
        activeDot.classList.add('active');
        updateDotSizes(activeDot);
      } else {
        activeDot.classList.remove('active');
      }
    });
  }, {
    threshold: 0.5
  });

  sections.forEach(section => {
    observer.observe(section);
  });

  // Initial update of dot sizes
  const initialActiveDot = document.querySelector('.dot.active');
  if (initialActiveDot) {
    updateDotSizes(initialActiveDot);
  }
}



const animatedstar = document.querySelector('.animated-star');

animatedstar.addEventListener('animationend', () => {
  document.body.classList.remove('no-scroll');
});



document.getElementById('animated-star').addEventListener('click', function() {
  document.getElementById('fifth-section').scrollIntoView({ behavior: 'smooth' });
});