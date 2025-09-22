document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function showNextSlide() {
        // Hide the current slide
        slides[currentSlide].classList.remove('active');

        // Move to the next slide, looping back to the start if at the end
        currentSlide = (currentSlide + 1) % slides.length;

        // Show the new current slide
        slides[currentSlide].classList.add('active');
    }

    // Set the slideshow to change every 5 seconds (5000 milliseconds)
    setInterval(showNextSlide, 5000);
});
