import { renderSharedLayout } from "./components.js";
import { getCurrentLanguage, initI18n } from "./i18n.js";
import { initNavigation } from "./navigation.js";
import { initArtisanIndicators, initArtisans } from "./artisans.js";
import { initMedia } from "./media.js";
import { initBooking } from "./booking.js";
import { initGalleryCarousels } from "./carousel.js";
import { initEvents } from "./events.js";
import { initReviews } from "./reviews.js";
import { initFaq } from "./faq.js";
import { siteConfig } from "./site-config.js";

initI18n();
renderSharedLayout();
initNavigation();

function renderOpeningHours() {
  const hours = siteConfig.openingHours[getCurrentLanguage()];
  if (!hours) {
    console.error("Horário de funcionamento não configurado para o idioma atual.");
    return;
  }

  document.querySelectorAll("[data-site-hours]").forEach((element) => {
    element.textContent = hours;
  });
}

function renderSiteAddress() {
  document.querySelectorAll("[data-site-address]").forEach((element) => {
    element.textContent = siteConfig.address;
  });
}

document.addEventListener("vila:language-change", renderOpeningHours);
renderOpeningHours();
renderSiteAddress();

initArtisans();
initArtisanIndicators();
initMedia();
initBooking();
initGalleryCarousels();
initEvents();
initReviews();
initFaq();

const galleryItems = document.querySelectorAll('[data-gallery-item]');
const galleryModal = document.getElementById('home-gallery-modal');
const galleryModalImage = document.getElementById('gallery-modal-image');
const galleryModalTitle = document.getElementById('gallery-modal-title');
const galleryModalDescription = document.getElementById('gallery-modal-description');
const galleryModalClose = document.querySelector('.gallery-modal__close');

if (galleryModal && galleryItems.length) {
  const toggleGalleryModal = (item) => {
    const imageNode = item.querySelector('img');
    const image = item.dataset.image || imageNode?.src || '';
    const title = item.dataset.title || 'Detalhe da Vila';
    const description = item.dataset.description || 'Descreva o detalhe da imagem.';
    const alt = item.dataset.alt || title;

    galleryModalImage.src = image;
    galleryModalImage.alt = alt;
    galleryModalTitle.textContent = title;
    galleryModalDescription.textContent = description;
    galleryModal.classList.add('is-open');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeGalleryModal = () => {
    galleryModal.classList.remove('is-open');
    galleryModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  galleryItems.forEach((item) => {
    item.addEventListener('click', () => toggleGalleryModal(item));
  });

  galleryModalClose?.addEventListener('click', closeGalleryModal);

  galleryModal.addEventListener('click', (event) => {
    if (event.target === galleryModal) {
      closeGalleryModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && galleryModal.classList.contains('is-open')) {
      closeGalleryModal();
    }
  });
}
