function initScrollFadeSections() {
  const dividers = document.querySelectorAll('.fade-in-divider');
  const headers = document.querySelectorAll('.fade-in-header');
  const sections = document.querySelectorAll('.fade-in-section');

  function update() {
    const windowHeight = window.innerHeight;

    function getProgress(el, endFraction) {
      const rect = el.getBoundingClientRect();
      let start = windowHeight;
      let end = windowHeight * endFraction;
      let fullDistance = start - end;
      let travelledDistance = start - rect.top;
      return Math.max(0, Math.min(1, travelledDistance / fullDistance));
    };

    function updateDivider(el) {
      let progress = Math.sqrt(getProgress(el, 0.5));
      el.style.opacity = progress;
      el.style.transform = `translateY(${25 * (1 - progress)}vh)`;
    };

    function updateHeader(el) {
      let progress = Math.sqrt(getProgress(el, 0.5));
      el.style.opacity = progress > 0.1 ? progress : 0;
      el.style.transform = `translateY(${-15 * (1 - progress)}vh)`;
    };

    function updateSection(el) {
      let progress = Math.sqrt(getProgress(el, 0.5));
      el.style.opacity = progress;
      el.style.transform = `translateY(${25 * (1 - progress)}vh)`;
    };

    dividers.forEach((el) => updateDivider(el));
    headers.forEach((el) => updateHeader(el));
    sections.forEach((el) => updateSection(el))
  }

  window.addEventListener('scroll', update);
  window.addEventListener('resize', update);

  update(); // run once on load

  // Optional cleanup
  return () => {
    window.removeEventListener('scroll', update);
    window.removeEventListener('resize', update);
  };
}

document.addEventListener('DOMContentLoaded', initScrollFadeSections);