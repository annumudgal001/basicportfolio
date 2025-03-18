document.addEventListener('DOMContentLoaded', function() {
    // Dynamic Text Changing (e.g., Freelancer, Developer, etc.)
    let dynamicTextElement = document.getElementById("dynamic-text");

    if (dynamicTextElement) {
        let words = ["Freelancer", "Developer", "Student", "Learner", "Problem Solver"];
        let i = 0;

        setInterval(function() {
            dynamicTextElement.textContent = words[i];
            i = (i + 1) % words.length; // Loop through words array
        }, 3000); // Change every 3 seconds
    }

    // Fade-in animation for the main heading (Hello, I'm Annu Mudgal)
    let heading = document.querySelector(".heading");
    if (heading) {
        heading.classList.add("fade-in-up");
    }

    // Optional: Mobile Sidebar toggle functionality
    let sidebar = document.querySelector('.sidebar');
    let menuToggle = document.querySelector('.menu-toggle');
    let closeBtn = document.querySelector('.close-btn');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.add('open');
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            sidebar.classList.remove('open');
        });
    }

    // Optional: Scroll to top functionality when the button is clicked (if you have such a button)
    let scrollToTopButton = document.getElementById('scroll-to-top-btn');
    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Optional: Apply a smooth scrolling effect for anchor links
    let anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function(anchorLink) {
        anchorLink.addEventListener('click', function(event) {
            event.preventDefault();
            let targetId = this.getAttribute('href').substring(1);
            let targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
