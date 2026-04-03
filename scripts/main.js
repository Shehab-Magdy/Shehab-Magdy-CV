// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function() {
  AOS.init( {
    // uncomment below for on-scroll animations to played only once
    // once: true  
  }); // initialize animate on scroll library
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});

// Project filter functionality
$(document).ready(function() {
    $('.filter-btn').on('click', function() {
        var filter = $(this).data('filter');
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        if (filter === 'all') {
            $('.project-card').show();
        } else {
            $('.project-card').hide();
            $('.project-card[data-category*="' + filter + '"]').show();
        }
    });
});

// Scroll Progress Bar
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('progress-bar').style.width = scrollPercent + '%';
});

// Loader and Fade-in
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    const body = document.body;
    
    setTimeout(function() {
        loader.style.display = 'none';
        body.classList.add('fade-in');
    }, 500); // Small delay for smooth transition
});

// Dark Mode Toggle
(function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const htmlElement = document.documentElement;
    
    // Load dark mode preference from localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
    if (isDarkMode) {
        htmlElement.classList.add('dark-mode');
        updateDarkModeIcon();
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', function() {
        htmlElement.classList.toggle('dark-mode');
        const isEnabled = htmlElement.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isEnabled ? 'enabled' : 'disabled');
        updateDarkModeIcon();
    });

    function updateDarkModeIcon() {
        const icon = document.querySelector('#dark-mode-toggle i');
        if (!icon) return;
        if (htmlElement.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
})();

// EmailJS Integration
(function() {
    // Initialize EmailJS - Replace with your actual service ID and public key
    emailjs.init("No0RCJM1X6MzncePv");
    
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('contact-submit-btn') || (contactForm ? contactForm.querySelector('button[type="submit"]') : null);
    let lastSubmitTime = 0;
    const submitCooldown = 5000; // 5 seconds cooldown
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Rate limiting check
        const now = Date.now();
        if (now - lastSubmitTime < submitCooldown) {
            showToast('Please wait before sending another message', 'warning');
            return;
        }
        
        // Spam protection - check honeypot field if needed
        const honeypot = document.getElementById('website'); // hidden field
        if (honeypot && honeypot.value) {
            console.log('Spam detected');
            return;
        }
        
        // Disable submit button to prevent double submission
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
        }
        
        // Send email via EmailJS
        emailjs.sendForm('service_bvfw35i', 'contact_form', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                lastSubmitTime = now;

                if (typeof gtag === 'function') {
                    gtag('event', 'contact_form_submit', {
                        'status': 'success'
                    });
                }
            }, function(error) {
                console.log('FAILED...', error);
                showToast('Failed to send message. Please try again.', 'error');

                if (typeof gtag === 'function') {
                    gtag('event', 'contact_form_submit', {
                        'status': 'error'
                    });
                }
            })
            .finally(function() {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send';
                }
            });
    });
    
    // Add hidden honeypot field for spam protection
    const honeypot = document.createElement('input');
    honeypot.type = 'hidden';
    honeypot.id = 'website';
    honeypot.name = 'website';
    contactForm.appendChild(honeypot);
})();



function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    if (type === 'error') {
        toast.style.backgroundColor = '#f44336';
    } else if (type === 'warning') {
        toast.style.backgroundColor = '#ff9800';
    }
    toast.textContent = message;
    document.body.appendChild(toast);
    
    toast.style.display = 'block';
    setTimeout(function() {
        toast.style.display = 'none';
        document.body.removeChild(toast);
    }, 3000);
}

// Testimonials Slider
document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');

    if (!slides.length) {
        return;
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Expose global names for backward compatibility with inline controls
    window.nextSlide = nextSlide;
    window.prevSlide = prevSlide;

    // Buttons for manual control (if available)
    const nextBtn = document.getElementById('testimonial-next');
    const prevBtn = document.getElementById('testimonial-prev');

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    showSlide(currentSlide);

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
});
