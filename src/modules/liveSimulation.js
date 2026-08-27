import { SIMULATION_EVENTS } from '../data/mockData.js';

export class LiveSimulation {
  constructor() {
    this.isRunning = true;
    this.speedMultiplier = 1;
    this.timer = null;
    this.eventIndex = 0;
    this.soundEnabled = true;
    this.audioContext = null;
    this.cityHealthScore = 88.4;
  }

  init() {
    this.initClock();
    this.startSimulationLoop();
    this.attachEventListeners();
    this.renderInitialTicker();
  }

  initClock() {
    const clockEl = document.getElementById('header-live-clock');
    if (!clockEl) return;

    const updateClock = () => {
      const now = new Date();
      const options = { 
        timeZone: 'Asia/Kolkata', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: true 
      };
      const timeString = now.toLocaleTimeString('en-IN', options);
      const dateString = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      clockEl.innerHTML = `<span class="clock-time">${timeString} IST</span><span class="clock-date">${dateString}</span>`;
    };

    updateClock();
    setInterval(updateClock, 1000);
  }

  renderInitialTicker() {
    const tickerContainer = document.getElementById('live-incident-ticker-list');
    if (!tickerContainer) return;

    tickerContainer.innerHTML = SIMULATION_EVENTS.map(ev => `
      <div class="ticker-item">
        <span class="ticker-badge ticker-${ev.type}">${ev.type.toUpperCase()}</span>
        <span class="ticker-text"><strong>${ev.title}:</strong> ${ev.desc}</span>
      </div>
    `).join('');
  }

  startSimulationLoop() {
    if (this.timer) clearInterval(this.timer);

    const interval = Math.max(1200, Math.floor(4000 / this.speedMultiplier));

    this.timer = setInterval(() => {
      if (!this.isRunning) return;

      // Minor fluctuations in City Health Score
      const delta = (Math.random() * 0.4 - 0.2);
      this.cityHealthScore = Math.min(99.0, Math.max(80.0, +(this.cityHealthScore + delta).toFixed(1)));
      
      const scoreEl = document.getElementById('header-health-score-val');
      if (scoreEl) scoreEl.textContent = `${this.cityHealthScore}/100`;

      // Trigger telemetry updates
      this.pushSimulatedEvent();
    }, interval);
  }

  pushSimulatedEvent() {
    const events = [
      { type: 'fleet', title: 'Route Telemetry', desc: 'EV Compactor NMC-EV-0101 completed Ramdaspeth High Street waypoint #42.' },
      { type: 'ai', title: 'AI Classification', desc: 'Mankapur MRF sorter processed 240kg batch with 97.2% purity index.' },
      { type: 'gvp', title: 'GVP Risk Monitor', desc: 'Predictive model updated risk indices for Gandhibagh Commercial Sector.' },
      { type: 'fleet', title: 'Load Sensor Ping', desc: 'Tipper NMC-EV-0102 payload reached 1.68 MT (84.0% capacity).' },
      { type: 'survekshan', title: 'Audit Verification', desc: 'Dharampeth Zone recorded 96.2% door-to-door source segregation rate.' }
    ];

    const ev = events[this.eventIndex % events.length];
    this.eventIndex++;

    const tickerContainer = document.getElementById('live-incident-ticker-list');
    if (tickerContainer) {
      const item = document.createElement('div');
      item.className = 'ticker-item item-slide-in';
      item.innerHTML = `
        <span class="ticker-badge ticker-${ev.type}">${ev.type.toUpperCase()}</span>
        <span class="ticker-text"><strong>${ev.title}:</strong> ${ev.desc}</span>
      `;
      tickerContainer.prepend(item);
      if (tickerContainer.children.length > 8) {
        tickerContainer.removeChild(tickerContainer.lastChild);
      }
    }
  }

  playCivicBeep(frequency = 587.33, duration = 0.12) {
    if (!this.soundEnabled) return;
    try {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }

      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

      gain.gain.setValueAtTime(0.08, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioContext.destination);

      osc.start();
      osc.stop(this.audioContext.currentTime + duration);
    } catch (e) {
      // AudioContext policy
    }
  }

  attachEventListeners() {
    const playPauseBtn = document.getElementById('btn-sim-play-pause');
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', () => {
        this.isRunning = !this.isRunning;
        playPauseBtn.innerHTML = this.isRunning 
          ? '<i data-lucide="pause"></i> <span>Pause Feed</span>' 
          : '<i data-lucide="play"></i> <span>Resume Feed</span>';
        playPauseBtn.classList.toggle('btn-paused', !this.isRunning);
        if (window.lucide) window.lucide.createIcons();
      });
    }

    const speedSelect = document.getElementById('sim-speed-selector');
    if (speedSelect) {
      speedSelect.addEventListener('change', (e) => {
        this.speedMultiplier = parseFloat(e.target.value) || 1;
        this.startSimulationLoop();
      });
    }

    const soundToggle = document.getElementById('btn-toggle-sound');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        this.soundEnabled = !this.soundEnabled;
        soundToggle.innerHTML = this.soundEnabled 
          ? '<i data-lucide="volume-2"></i>' 
          : '<i data-lucide="volume-x"></i>';
        soundToggle.title = this.soundEnabled ? 'Alert Audio On' : 'Alert Audio Muted';
        if (window.lucide) window.lucide.createIcons();
      });
    }
  }
}
