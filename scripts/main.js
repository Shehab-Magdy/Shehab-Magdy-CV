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

// Toast Notification for Contact Form
document.getElementById('gform').addEventListener('submit', function(e) {
    // Assuming the form submits successfully, show toast
    // In real implementation, check for success response
    setTimeout(function() {
        showToast('Message sent successfully!');
    }, 1000);
});

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    toast.style.display = 'block';
    setTimeout(function() {
        toast.style.display = 'none';
        document.body.removeChild(toast);
    }, 3000);
}

// Testimonials Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');

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

// Auto slide every 5 seconds
setInterval(nextSlide, 5000);
