// Carrossel de fotografias (Sobre a Vila e página inicial).
export function initGalleryCarousels() {
  document.querySelectorAll('[data-gallery-carousel]').forEach(initCarousel);
}

function initCarousel(carousel) {
  const track = carousel.querySelector('.about-gallery__track');
  const slides = Array.from(track.querySelectorAll('.about-gallery__slide'));
  const dots = Array.from(carousel.parentElement.querySelectorAll('.about-gallery__dot'));
  const prevButton = carousel.querySelector('.about-gallery__nav--prev');
  const nextButton = carousel.querySelector('.about-gallery__nav--next');
  let currentIndex = slides.findIndex((slide) => slide.classList.contains('is-active'));
  if (currentIndex < 0) currentIndex = 0;

  const updateTrackHeight = () => {
    requestAnimationFrame(() => {
      const activeHeight = slides[currentIndex].getBoundingClientRect().height;
      if (activeHeight > 0) {
        track.style.height = `${Math.ceil(activeHeight + 2)}px`;
      }
    });
  };

  const showSlide = (index) => {
    currentIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.hidden = i !== currentIndex;
      slide.classList.toggle('is-active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });

    updateTrackHeight();
  };

  prevButton?.addEventListener('click', () => showSlide(currentIndex - 1));
  nextButton?.addEventListener('click', () => showSlide(currentIndex + 1));

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  carousel.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showSlide(currentIndex - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(currentIndex + 1);
    }
  });

  slides.forEach((slide) => {
    slide.querySelector('img')?.addEventListener('load', updateTrackHeight);
  });
  window.addEventListener('resize', updateTrackHeight, { passive: true });
  updateTrackHeight();}
