import { createIcons, icons } from 'lucide';
import { SegregationClassifier } from './modules/segregationClassifier.js';
import { FleetTracker } from './modules/fleetTracker.js';
import { GVPPredictor } from './modules/gvpPredictor.js';
import { EvidenceGenerator } from './modules/evidenceGenerator.js';
import { LiveSimulation } from './modules/liveSimulation.js';
import { initHero3DMap } from './modules/hero3DMap.js';

// Expose lucide to window for dynamic module renders
window.lucide = { createIcons: () => createIcons({ icons }) };

class App {
  constructor() {
    this.segregationClassifier = null;
    this.fleetTracker = null;
    this.gvpPredictor = null;
    this.evidenceGenerator = null;
    this.liveSimulation = null;
  }

  init() {
    // 1. Initialize Lucide Icons
    window.lucide.createIcons();

    // 2. Initialize 3D Animated Hero Map
    try {
      initHero3DMap('hero-3d-map-container');
    } catch (e) {
      console.warn('3D Map initialization warning:', e);
    }

    // 3. Initialize Core Submodules
    this.segregationClassifier = new SegregationClassifier();
    this.segregationClassifier.init();

    this.fleetTracker = new FleetTracker();
    this.fleetTracker.init();

    this.gvpPredictor = new GVPPredictor();
    this.gvpPredictor.init();

    this.evidenceGenerator = new EvidenceGenerator();
    this.evidenceGenerator.init();

    this.liveSimulation = new LiveSimulation();
    this.liveSimulation.init();

    // 4. Global Listeners & Interactions
    this.attachThemeToggle();
    this.attachScrollSpy();

    console.log('🚀 Swachh Intelligence initialized successfully with 3D Map and Vibrant White Theme.');
  }

  attachThemeToggle() {
    const themeBtn = document.getElementById('btn-theme-toggle');
    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
      document.body.classList.toggle('theme-light');
      const isLight = document.body.classList.contains('theme-light');
      themeBtn.innerHTML = isLight ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
      themeBtn.title = isLight ? 'Switch to Dark Command Center' : 'Switch to Light Theme';
      window.lucide.createIcons();
    });
  }

  attachScrollSpy() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPos = window.scrollY + 180;

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    });
  }
}

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
