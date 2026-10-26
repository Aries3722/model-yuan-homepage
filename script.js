const data = window.profileData || {};

const setText = (selector, text) => {
  const node = document.querySelector(selector);
  if (node) {
    node.textContent = text;
  }
};

const renderGallery = () => {
  const gallerySlides = document.getElementById('gallerySlides');
  if (!gallerySlides || !Array.isArray(data.gallery)) return;

  gallerySlides.innerHTML = data.gallery
    .map(
      (slide) => `
        <div class="swiper-slide">
          <img src="${slide.src}" alt="${slide.alt}" />
        </div>
      `
    )
    .join('');
};

const renderSocialLinks = () => {
  const socialLinks = document.getElementById('socialLinks');
  if (!socialLinks || !Array.isArray(data.socials)) return;

  socialLinks.innerHTML = data.socials
    .map(
      (social) => `
        <a href="${social.href}" target="_blank" rel="noreferrer noopener" class="social-link" aria-label="${social.label}">
          ${social.svg}
        </a>
      `
    )
    .join('');
};

const renderProfile = () => {
  setText('#profileName', data.name || '');
  setText('#profileSubName', data.subName || '');

  const profileInfo = document.getElementById('profileInfo');
  if (!profileInfo || !Array.isArray(data.profile)) return;

  profileInfo.innerHTML = data.profile
    .map(
      (item) => `
        <div class="info-row">
          <div class="info-label">${item.label}</div>
          <div class="info-value">${item.value}</div>
        </div>
      `
    )
    .join('');
};

const renderCareerHeader = () => {
  setText('#careerTitle', data.careerTitle || '');
  setText('#careerSubtitle', data.careerSubtitle || '');
  setText('#latestTitle', data.latestTitle || '');
};

const renderCareerAccordion = () => {
  const accordion = document.getElementById('careerAccordion');
  if (!accordion || !Array.isArray(data.careerHistory)) return;

  accordion.innerHTML = data.careerHistory
    .map(
      (group, index) => `
        <div class="accordion-item ${index === 0 ? 'open' : ''}">
          <button class="accordion-header" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">
            <span>${group.title}</span>
            <span class="accordion-indicator">+</span>
          </button>
          <div class="accordion-content">
            <ul>
              ${group.items.map((item) => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        </div>
      `
    )
    .join('');

  const accordionItems = document.querySelectorAll('.accordion-item');
  for (const item of accordionItems) {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      for (const accordionItem of accordionItems) {
        accordionItem.classList.remove('open');
        accordionItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      }

      if (!isOpen) {
        item.classList.add('open');
        header.setAttribute('aria-expanded', 'true');
      }
    });
  }
};

const renderLatestEvents = () => {
  const list = document.getElementById('latestInfoList');
  if (!list || !Array.isArray(data.latestEvents)) return;

  list.innerHTML = data.latestEvents
    .map(
      (event) => `
        <a class="event-card" href="${event.link}" target="_blank" rel="noreferrer noopener">
          <div class="event-topline">
            <h3 class="event-title">${event.title}</h3>
            <span class="event-tag">${event.year}</span>
          </div>
          <div class="event-meta">${event.meta}</div>
        </a>
      `
    )
    .join('');
};

const renderPage = () => {
  document.title = data.siteTitle || 'Profile';
  renderGallery();
  renderSocialLinks();
  renderProfile();
  renderCareerHeader();
  renderCareerAccordion();
  renderLatestEvents();

  const tabButtons = document.querySelectorAll('.tab-button');

  for (const button of tabButtons) {
    button.addEventListener('click', () => {
      const target = button.dataset.target;

      for (const tab of tabButtons) {
        tab.classList.toggle('active', tab === button);
      }

      if (target === 'latest-info') {
        document.getElementById('latest-info').scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      document.getElementById('careerAccordion').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
};

const initSwiper = () => {
  new Swiper('.mySwiper', {
    loop: true,
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    grabCursor: true,
    spaceBetween: 0,
  });
};

renderPage();
initSwiper();
