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
import { initReveal } from "./reveal.js";
import { initImageFade } from "./image-fade.js";
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
initReveal();
initImageFade();
