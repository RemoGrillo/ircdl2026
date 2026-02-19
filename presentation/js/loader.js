/**
 * Slide Loader for Reveal.js
 * Fetches individual slide HTML fragments and injects them into the deck,
 * then initialises Reveal.js.
 */

const SLIDE_FILES = [
  'slides/01-title.html',
  'slides/02-problem.html',
  'slides/03-evangelisti.html',
  'slides/04-bodi-ontology.html',
  'slides/05-researchspace.html',
  'slides/06-standard-tree.html',
  'slides/07-semantic-tree-advanced.html',
  'slides/07b-sta-fullscreen.html',
  'slides/08-contextual-search.html',
  'slides/09-horizontal-navigation.html',
  'slides/10-why-it-matters.html',
  'slides/11-performance.html',
  'slides/12-conclusions.html',
  'slides/13-thank-you.html'
];

async function loadSlides() {
  const container = document.getElementById('slides-container');

  for (const file of SLIDE_FILES) {
    try {
      const response = await fetch(file);
      if (!response.ok) throw new Error(`Failed to load ${file}`);
      const html = await response.text();
      container.insertAdjacentHTML('beforeend', html);
    } catch (err) {
      console.warn(`⚠ Could not load slide: ${file}`, err);
      container.insertAdjacentHTML(
        'beforeend',
        `<section><h2 style="color:#ef4444;">Slide not found</h2><p>${file}</p></section>`
      );
    }
  }

  // Initialise Reveal.js after all slides are injected
  Reveal.initialize({
    hash: true,
    slideNumber: 'c/t',
    showSlideNumber: 'all',
    width: 1920,
    height: 1080,
    margin: 0.02,
    minScale: 0.1,
    maxScale: 1.5,
    center: true,
    disableLayout: false,
    progress: true,
    transition: 'fade',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',
    controls: true,
    controlsTutorial: false,
    keyboard: true,
    overview: true,
    touch: true,
  });
}

// Start loading when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadSlides);
} else {
  loadSlides();
}
