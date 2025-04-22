
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuIcon = document.getElementById('menu-icon');
    const navMenu = document.getElementById('nav-menu');
    
    menuIcon.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('bx-x');
    });
    
    // Close menu when clicking on nav links
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuIcon.classList.remove('bx-x');
        });
    });
    
    // Dark/Light Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                       (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    function setTheme(theme) {
      // Add transition class to body
      document.body.classList.add('theme-transition');
      
      document.documentElement.setAttribute('data-theme', theme);
      if (theme === 'dark') {
          themeIcon.classList.remove('bx-moon');
          themeIcon.classList.add('bx-sun');
      } else {
          themeIcon.classList.remove('bx-sun');
          themeIcon.classList.add('bx-moon');
      }
      
      // Remove transition class after animation completes
      setTimeout(() => {
          document.body.classList.remove('theme-transition');
      }, 500);
  }
    
    // Scroll Reveal Animation
    const scrollReveal = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1000,
        delay: 200,
        reset: true
    });
    
    scrollReveal.reveal('.home-text, .home-img, .about-img, .about-content, .heading, .service-box', {
        interval: 200
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to navbar links on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.navbar a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.reveal');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initialize on load
});

// Dynamic star rating behavior
document.querySelectorAll('.star-rating-input').forEach(container => {
    const stars = container.querySelectorAll('.star');
    let rating = parseInt(container.getAttribute('data-rating')) || 0;
  
    stars.forEach(star => {
      star.addEventListener('mouseover', () => {
        highlightStars(stars, parseInt(star.dataset.value));
      });
  
      star.addEventListener('mouseout', () => {
        highlightStars(stars, rating);
      });
  
      star.addEventListener('click', () => {
        rating = parseInt(star.dataset.value);
        container.setAttribute('data-rating', rating);
        highlightStars(stars, rating);
      });
    });
  
    function highlightStars(stars, value) {
      stars.forEach(s => {
        s.classList.toggle('filled', parseInt(s.dataset.value) <= value);
      });
    }
  
    highlightStars(stars, rating);
  });
  
  // Handle review submission
  document.getElementById('reviewForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const name = document.getElementById('reviewerName').value;
    const text = document.getElementById('reviewText').value;
    const rating = parseInt(document.getElementById('userRating').getAttribute('data-rating'));
  
    if (!name || !text || rating === 0) {
      alert("Please fill all fields and select a rating.");
      return;
    }
  
    const newReview = document.createElement('div');
    newReview.classList.add('review-card');
    newReview.innerHTML = `
      <p class="review-text">"${text}"</p>
      <div class="star-rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</div>
      <div class="reviewer-info">
        <img src="https://randomuser.me/api/portraits/lego/${Math.floor(Math.random()*10)}.jpg" alt="${name}" />
        <div>
          <p class="reviewer-name">${name}</p>
          <p class="reviewer-location">Guest</p>
        </div>
      </div>
    `;
  
    document.getElementById('reviewsGrid').appendChild(newReview);
  
    // Reset form
    this.reset();
    document.getElementById('userRating').setAttribute('data-rating', 0);
    const userStars = document.querySelectorAll('#userRating .star');
    userStars.forEach(s => s.classList.remove('filled'));
  });
 
  