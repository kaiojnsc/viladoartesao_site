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

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // direction: 1 = próxima, -1 = anterior, 0 = sem animação.
  const showSlide = (index, direction = 0) => {
    const nextIndex = (index + slides.length) % slides.length;
    if (nextIndex === currentIndex) return;
    currentIndex = nextIndex;

    slides.forEach((slide, i) => {
      slide.hidden = i !== currentIndex;
      slide.classList.toggle('is-active', i === currentIndex);
      slide.classList.remove('is-entering-next', 'is-entering-prev');
    });

    if (direction !== 0 && !reduceMotion.matches) {
      const slide = slides[currentIndex];
      void slide.offsetWidth;
      slide.classList.add(direction > 0 ? 'is-entering-next' : 'is-entering-prev');
    }

    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }
    });

    updateTrackHeight();
  };

  prevButton?.addEventListener('click', () => showSlide(currentIndex - 1, -1));
  nextButton?.addEventListener('click', () => showSlide(currentIndex + 1, 1));

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index, Math.sign(index - currentIndex)));
  });

  carousel.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showSlide(currentIndex - 1, -1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      showSlide(currentIndex + 1, 1);
    }
  });

  // Arrastar com o dedo (celular e tablet).
  const SWIPE_MIN_DISTANCE = 40;
  let touchStart = null;

  track.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
  }, { passive: true });

  track.addEventListener('touchend', (event) => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    touchStart = null;

    if (Math.abs(deltaX) < SWIPE_MIN_DISTANCE || Math.abs(deltaX) < Math.abs(deltaY)) return;
    if (deltaX < 0) {
      showSlide(currentIndex + 1, 1);
    } else {
      showSlide(currentIndex - 1, -1);
    }
  }, { passive: true });

  track.addEventListener('touchcancel', () => {
    touchStart = null;
  }, { passive: true });

  slides.forEach((slide) => {
    slide.querySelector('img')?.addEventListener('load', updateTrackHeight);
  });
  window.addEventListener('resize', updateTrackHeight, { passive: true });
  updateTrackHeight();}
