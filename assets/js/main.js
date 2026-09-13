// Marks the nav tab for the section currently in view.
function initScrollSpy() {
  const tabs = [...document.querySelectorAll('.tab[href^="#"]')];
  const sections = tabs.map((tab) => document.querySelector(tab.getAttribute('href')));
  if (!tabs.length || sections.includes(null)) return;

  const setActive = (index) => {
    tabs.forEach((tab, i) => {
      if (i === index) tab.setAttribute('aria-current', 'true');
      else tab.removeAttribute('aria-current');
    });
  };

  const update = () => {
    const probe = window.innerHeight * 0.35;
    const scrolled = window.scrollY > 0;
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

    let active = 0;
    sections.forEach((section, i) => {
      if (section.getBoundingClientRect().top <= probe) active = i;
    });
    setActive(scrolled && atBottom ? sections.length - 1 : active);
  };

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
}

// Falls back to the initials placeholder when no portrait image is present.
function initPortraitFallback() {
  const img = document.querySelector('.portrait img');
  if (!img) return;

  const hide = () => { img.hidden = true; };
  if (img.complete && img.naturalWidth === 0) hide();
  else img.addEventListener('error', hide);
}

initScrollSpy();
initPortraitFallback();
