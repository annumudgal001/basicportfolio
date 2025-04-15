document.addEventListener('DOMContentLoaded', function() {
    // Dynamic Text Changing
    const dynamicTextElement = document.getElementById('dynamic-text');
    if (dynamicTextElement) {
        const words = ['Freelancer', 'Developer', 'Student', 'Learner', 'Problem Solver'];
        let i = 0;
        setInterval(() => {
            dynamicTextElement.textContent = words[i];
            i = (i + 1) % words.length;
        }, 3000);
    }

    // Mobile Sidebar Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    if (menuToggle && navContainer) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navContainer.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.querySelector('i').classList.toggle('fa-bars');
            menuToggle.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Profile Image Zoom
    const profileImage = document.getElementById('profile-image');
    const zoomOverlay = document.getElementById('image-zoom-overlay');
    if (profileImage && zoomOverlay) {
        profileImage.addEventListener('click', () => {
            const img = zoomOverlay.querySelector('.zoomed-image');
            img.src = '/images/IMG_2694.png';
            img.onerror = () => {
                console.error('Failed to load zoom image: /images/IMG_2694.png');
                img.src = '/images/fallback.png'; // Optional fallback
            };
            img.onload = () => {
                zoomOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            };
        });
        zoomOverlay.addEventListener('click', (e) => {
            if (e.target === zoomOverlay || e.target.classList.contains('zoomed-image')) {
                zoomOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && zoomOverlay.classList.contains('active')) {
                zoomOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.warn('Profile image or zoom overlay not found');
    }

    // Scroll-to-Top Button
    const scrollToTopButton = document.getElementById('scroll-to-top-btn');
    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            scrollToTopButton.classList.toggle('visible', window.scrollY > 300);
        });
        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(anchorLink => {
        anchorLink.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});
// Dynamic Text Rotation
const dynamicText = document.getElementById('dynamic-text');
const roles = ['Developer', 'Engineer', 'Innovator', 'Problem Solver'];
let roleIndex = 0;

function rotateText() {
  dynamicText.style.opacity = 0;
  setTimeout(() => {
    dynamicText.textContent = roles[roleIndex];
    dynamicText.style.opacity = 1;
    roleIndex = (roleIndex + 1) % roles.length;
  }, 300);
}

setInterval(rotateText, 3000);
rotateText();

// Scroll-to-Top Button
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
