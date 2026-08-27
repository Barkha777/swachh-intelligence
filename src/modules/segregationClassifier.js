import { AI_SAMPLE_PRESETS, WARD_SCORECARD_DATA } from '../data/mockData.js';

export class SegregationClassifier {
  constructor() {
    this.currentPreset = AI_SAMPLE_PRESETS[0];
    this.customImage = null;
    this.isScanning = false;
    this.filterZone = 'all';
    this.sortField = 'complianceScore';
    this.sortOrder = 'desc';
    this.searchQuery = '';
  }

  init() {
    this.renderPresets();
    this.renderInferenceResult(this.currentPreset);
    this.renderWardScorecard();
    this.attachEventListeners();
  }

  renderPresets() {
    const container = document.getElementById('preset-selector-grid');
    if (!container) return;

    container.innerHTML = AI_SAMPLE_PRESETS.map((preset, index) => `
      <button class="preset-card-btn ${preset.id === this.currentPreset.id ? 'active' : ''}" data-preset-id="${preset.id}">
        <div class="preset-thumb-wrap">
          <img src="${preset.image}" alt="${preset.title}" loading="lazy" />
          <span class="preset-badge" style="background:${preset.binColor}">${preset.targetBin.split(' ')[0]}</span>
        </div>
        <div class="preset-meta">
          <span class="preset-title">${preset.title}</span>
          <span class="preset-sub">${preset.confidence}% Acc. Target</span>
        </div>
      </button>
    `).join('');
  }

  selectPreset(presetId) {
    const found = AI_SAMPLE_PRESETS.find(p => p.id === presetId);
    if (!found) return;
    this.currentPreset = found;
    this.customImage = null;
    this.renderPresets();
    this.triggerScanAnimation(this.currentPreset);
  }

  handleCustomUpload(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.customImage = e.target.result;
      
      // Compute intelligent simulated classification for custom image
      const isSuspectedOrganic = file.name.toLowerCase().includes('food') || file.name.toLowerCase().includes('wet') || file.name.toLowerCase().includes('fruit') || file.name.toLowerCase().includes('leaf');
      const isSuspectedMedical = file.name.toLowerCase().includes('med') || file.name.toLowerCase().includes('mask') || file.name.toLowerCase().includes('syringe') || file.name.toLowerCase().includes('hazard');
      const isSuspectedCD = file.name.toLowerCase().includes('brick') || file.name.toLowerCase().includes('debris') || file.name.toLowerCase().includes('concrete') || file.name.toLowerCase().includes('sand');

      let customResult;
      if (isSuspectedOrganic) {
        customResult = {
          id: 'custom-organic',
          title: `Uploaded Sample: ${file.name.substring(0, 24)}`,
          subtitle: 'Organic & Food Stream (Custom Ingest)',
          image: this.customImage,
          primaryClass: 'Wet / Organic Kitchen Waste',
          targetBin: 'Green Bin (Wet Waste)',
          binColor: '#16a34a',
          binIcon: 'trash-2',
          confidence: (94.0 + Math.random() * 4).toFixed(1),
          contaminationScore: (2.0 + Math.random() * 3).toFixed(1),
          contaminationGrade: 'Grade A (Pristine Organic)',
          penaltyFlag: false,
          composition: [
            { name: 'Organic Biomass Fraction', percent: 84 },
            { name: 'Moisture / Bound Liquids', percent: 14 },
            { name: 'Inert Fiber Wrap', percent: 2 }
          ],
          boundingBoxes: [
            { label: 'Organic Fraction (97%)', x: 22, y: 20, w: 55, h: 50, color: '#16a34a' }
          ],
          protocol: 'Route directly to Bhandewadi Biomethanation Digester Unit 3.',
          targetAccuracyRef: '95.2% AI Accuracy Match'
        };
      } else if (isSuspectedMedical) {
        customResult = {
          id: 'custom-medical',
          title: `Uploaded Sample: ${file.name.substring(0, 24)}`,
          subtitle: 'Biomedical Stream (Custom Ingest)',
          image: this.customImage,
          primaryClass: 'Domestic Biomedical Hazard',
          targetBin: 'Red Bin (Hazardous / Sanitary)',
          binColor: '#dc2626',
          binIcon: 'alert-triangle',
          confidence: (96.0 + Math.random() * 3).toFixed(1),
          contaminationScore: (1.2 + Math.random() * 2).toFixed(1),
          contaminationGrade: 'Grade S (Biohazard Stream)',
          penaltyFlag: true,
          composition: [
            { name: 'Sanitary / Clinical Polymer', percent: 68 },
            { name: 'Protective Fibers & Blisters', percent: 28 },
            { name: 'Sharps / Contaminant', percent: 4 }
          ],
          boundingBoxes: [
            { label: 'Biohazard Item (98%)', x: 25, y: 25, w: 50, h: 45, color: '#dc2626' }
          ],
          protocol: 'STRICT PROTOCOL: Sealed incinerator transfer required under SBM 2026 guidelines.',
          targetAccuracyRef: '97.5% AI Accuracy Match'
        };
      } else if (isSuspectedCD) {
        customResult = {
          id: 'custom-cd',
          title: `Uploaded Sample: ${file.name.substring(0, 24)}`,
          subtitle: 'C&D Debris Stream (Custom Ingest)',
          image: this.customImage,
          primaryClass: 'Construction & Demolition Debris',
          targetBin: 'Designated C&D Drop Station',
          binColor: '#64748b',
          binIcon: 'hard-hat',
          confidence: (95.0 + Math.random() * 3).toFixed(1),
          contaminationScore: (3.0 + Math.random() * 2).toFixed(1),
          contaminationGrade: 'Grade A (Inert Aggregates)',
          penaltyFlag: false,
          composition: [
            { name: 'Concrete / Plaster Rubble', percent: 72 },
            { name: 'Masonry Brick Aggregate', percent: 24 },
            { name: 'Mineral Dust', percent: 4 }
          ],
          boundingBoxes: [
            { label: 'C&D Aggregate (96%)', x: 20, y: 20, w: 60, h: 55, color: '#eab308' }
          ],
          protocol: 'Divert to Bhandewadi Paver Block & Aggregate Recovery Plant.',
          targetAccuracyRef: '95.8% AI Accuracy Match'
        };
      } else {
        customResult = {
          id: 'custom-dry',
          title: `Uploaded Sample: ${file.name.substring(0, 24)}`,
          subtitle: 'Dry Recyclables & Packaging',
          image: this.customImage,
          primaryClass: 'Dry Recyclable (Plastics/Cardboard/Metals)',
          targetBin: 'Blue Bin (Dry Recyclables)',
          binColor: '#2563eb',
          binIcon: 'recycle',
          confidence: (94.5 + Math.random() * 4).toFixed(1),
          contaminationScore: (3.5 + Math.random() * 4).toFixed(1),
          contaminationGrade: 'Grade A (Recyclable Commercial)',
          penaltyFlag: false,
          composition: [
            { name: 'Dry Recyclable Polymer', percent: 62 },
            { name: 'Cellulose Cardboard / Paper', percent: 26 },
            { name: 'Light Aluminium Foil / Metal', percent: 12 }
          ],
          boundingBoxes: [
            { label: 'Dry Recyclable (96%)', x: 18, y: 18, w: 58, h: 58, color: '#2563eb' }
          ],
          protocol: 'Route to Mankapur Material Recovery Facility (MRF) Optical Sorter.',
          targetAccuracyRef: '96.2% AI Accuracy Match'
        };
      }

      this.currentPreset = customResult;
      this.triggerScanAnimation(this.currentPreset);
    };
    reader.readAsDataURL(file);
  }

  triggerScanAnimation(preset) {
    const scanContainer = document.getElementById('classifier-scan-viewport');
    const scanLaser = document.getElementById('classifier-scan-laser');
    const bboxOverlay = document.getElementById('classifier-bbox-overlay');
    
    if (!scanContainer) return;
    this.isScanning = true;

    // Reset overlay
    if (bboxOverlay) bboxOverlay.innerHTML = '';
    if (scanLaser) scanLaser.classList.add('active');

    // Update image
    const imgEl = document.getElementById('classifier-main-img');
    if (imgEl) {
      imgEl.src = preset.image;
      imgEl.alt = preset.title;
    }

    // After simulated inference delay (800ms)
    setTimeout(() => {
      if (scanLaser) scanLaser.classList.remove('active');
      this.isScanning = false;

      // Draw bounding boxes
      if (bboxOverlay && preset.boundingBoxes) {
        bboxOverlay.innerHTML = preset.boundingBoxes.map(box => `
          <div class="ai-bbox" style="left:${box.x}%; top:${box.y}%; width:${box.w}%; height:${box.h}%; border-color:${box.color}">
            <span class="ai-bbox-tag" style="background:${box.color}">${box.label}</span>
          </div>
        `).join('');
      }

      this.renderInferenceResult(preset);
      this.highlightBin(preset);
    }, 700);
  }

  renderInferenceResult(preset) {
    const resultPanel = document.getElementById('classifier-results-panel');
    if (!resultPanel) return;

    resultPanel.innerHTML = `
      <div class="inference-header">
        <div class="inf-badge-row">
          <span class="status-pill status-pill-success">
            <span class="pulse-dot"></span> SBM Mandate: >85% Met
          </span>
          <span class="inf-latency"><i data-lucide="zap"></i> Latency: 142ms</span>
        </div>
        <h3 class="inf-class-title" style="color: ${preset.binColor}">${preset.primaryClass}</h3>
        <p class="inf-subtitle">${preset.subtitle}</p>
      </div>

      <div class="inf-score-grid">
        <div class="score-card-mini">
          <span class="score-label">AI Confidence</span>
          <div class="score-val-wrap">
            <span class="score-val" style="color:${preset.binColor}">${preset.confidence}%</span>
            <span class="score-benchmark">Target: 85%+</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${preset.confidence}%; background: ${preset.binColor}"></div>
          </div>
        </div>

        <div class="score-card-mini">
          <span class="score-label">Contamination Index</span>
          <div class="score-val-wrap">
            <span class="score-val ${preset.contaminationScore > 15 ? 'text-danger' : 'text-success'}">${preset.contaminationScore}%</span>
            <span class="score-grade">${preset.contaminationGrade}</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill ${preset.contaminationScore > 15 ? 'bg-danger' : 'bg-emerald'}" style="width: ${Math.min(100, preset.contaminationScore * 2)}%"></div>
          </div>
        </div>
      </div>

      <!-- Recommended Bin Visualization -->
      <div class="recommended-bin-box" style="border-left-color: ${preset.binColor}">
        <div class="rec-bin-icon-wrap" style="background: ${preset.binColor}20; color: ${preset.binColor}">
          <i data-lucide="${preset.binIcon || 'trash-2'}"></i>
        </div>
        <div class="rec-bin-text">
          <span class="rec-bin-label">Recommended Destination:</span>
          <h4 class="rec-bin-title">${preset.targetBin}</h4>
          <p class="rec-bin-desc">${preset.protocol}</p>
        </div>
      </div>

      <!-- Composition Breakdown -->
      <div class="composition-section">
        <div class="comp-title-row">
          <span class="comp-title">Multi-Spectral Material Breakdown</span>
          <span class="comp-count">${preset.composition ? preset.composition.length : 0} Fractions Detected</span>
        </div>
        <div class="comp-bars-list">
          ${preset.composition ? preset.composition.map(item => `
            <div class="comp-item">
              <div class="comp-item-header">
                <span class="comp-name">${item.name}</span>
                <span class="comp-pct">${item.percent}%</span>
              </div>
              <div class="progress-bar-bg mini">
                <div class="progress-bar-fill" style="width: ${item.percent}%; background: ${preset.binColor}"></div>
              </div>
            </div>
          `).join('') : ''}
        </div>
      </div>
    `;

    // Re-initialize Lucide icons if available
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  highlightBin(preset) {
    const bins = document.querySelectorAll('.visual-bin-card');
    bins.forEach(bin => {
      bin.classList.remove('highlighted', 'pulse-glow');
      const binType = bin.dataset.binType;
      if (
        (binType === 'green' && preset.targetBin.includes('Green')) ||
        (binType === 'blue' && preset.targetBin.includes('Blue')) ||
        (binType === 'red' && preset.targetBin.includes('Red')) ||
        (binType === 'grey' && (preset.targetBin.includes('C&D') || preset.targetBin.includes('Drop')))
      ) {
        bin.classList.add('highlighted', 'pulse-glow');
      }
    });
  }

  renderWardScorecard() {
    const grid = document.getElementById('ward-scorecard-grid');
    if (!grid) return;

    let filtered = [...WARD_SCORECARD_DATA];

    if (this.filterZone !== 'all') {
      filtered = filtered.filter(w => w.zoneId === this.filterZone);
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(w => 
        w.name.toLowerCase().includes(q) || 
        w.zoneName.toLowerCase().includes(q) || 
        String(w.wardNumber).includes(q)
      );
    }

    filtered.sort((a, b) => {
      let valA = a[this.sortField];
      let valB = b[this.sortField];
      if (typeof valA === 'string') valA = parseFloat(valA) || valA;
      if (typeof valB === 'string') valB = parseFloat(valB) || valB;

      if (this.sortOrder === 'desc') {
        return valB > valA ? 1 : -1;
      } else {
        return valA > valB ? 1 : -1;
      }
    });

    // Update count summary
    const countEl = document.getElementById('scorecard-ward-count');
    if (countEl) countEl.textContent = `Showing ${filtered.length} of ${WARD_SCORECARD_DATA.length} Wards`;

    grid.innerHTML = filtered.map(ward => {
      const score = ward.complianceScore;
      let badgeClass = 'badge-success';
      let borderGlow = 'border-green';
      if (score < 84) {
        badgeClass = 'badge-danger';
        borderGlow = 'border-red';
      } else if (score < 90) {
        badgeClass = 'badge-amber';
        borderGlow = 'border-amber';
      }

      return `
        <div class="ward-card ${borderGlow}" data-ward-id="${ward.id}">
          <div class="ward-card-header">
            <div class="ward-num-badge">Ward ${ward.wardNumber}</div>
            <span class="badge ${badgeClass}">${ward.complianceScore}%</span>
          </div>
          <h4 class="ward-title">${ward.name}</h4>
          <span class="ward-zone-tag"><i data-lucide="map-pin"></i> ${ward.zoneName} Zone</span>

          <div class="ward-metrics-row">
            <div class="ward-metric">
              <span class="wm-lbl">Wet:Dry Ratio</span>
              <span class="wm-val">${ward.wetDryRatio}</span>
            </div>
            <div class="ward-metric">
              <span class="wm-lbl">Contamination</span>
              <span class="wm-val">${ward.contaminationRate}</span>
            </div>
            <div class="ward-metric">
              <span class="wm-lbl">7-Day Trend</span>
              <span class="wm-val ${ward.trend.startsWith('+') ? 'text-success' : 'text-danger'}">${ward.trend}</span>
            </div>
          </div>

          <div class="ward-card-footer">
            <span class="ward-inspector"><i data-lucide="user-check"></i> ${ward.inspector}</span>
            <button class="btn-ward-drilldown" data-ward-id="${ward.id}" title="Inspect Ward Metrics">
              Inspect <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  showWardModal(wardId) {
    const ward = WARD_SCORECARD_DATA.find(w => w.id === parseInt(wardId));
    if (!ward) return;

    const modal = document.getElementById('ward-drilldown-modal');
    const modalBody = document.getElementById('ward-modal-content');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
      <div class="modal-ward-header">
        <div class="m-ward-badge">Ward #${ward.wardNumber} (${ward.zoneName} Zone)</div>
        <h2>${ward.name}</h2>
        <p class="m-ward-sub">Administrative Solid Waste Management & Segregation Profile</p>
      </div>

      <div class="modal-kpi-grid">
        <div class="m-kpi-card">
          <span class="m-lbl">Segregation Compliance</span>
          <h3 class="m-val text-success">${ward.complianceScore}%</h3>
          <span class="m-sub">${ward.status} (Target: >85%)</span>
        </div>
        <div class="m-kpi-card">
          <span class="m-lbl">Total Households</span>
          <h3 class="m-val">${ward.households.toLocaleString('en-IN')}</h3>
          <span class="m-sub">100% Geo-tagged bins</span>
        </div>
        <div class="m-kpi-card">
          <span class="m-lbl">Contamination Rate</span>
          <h3 class="m-val text-amber">${ward.contaminationRate}</h3>
          <span class="m-sub">Avg. 1.2 breaches/day</span>
        </div>
        <div class="m-kpi-card">
          <span class="m-lbl">Zonal Inspector</span>
          <h3 class="m-val text-primary" style="font-size:1.1rem">${ward.inspector}</h3>
          <span class="m-sub">${ward.phone}</span>
        </div>
      </div>

      <div class="modal-section-card">
        <h4>30-Day Segregation Compliance Trajectory</h4>
        <div class="modal-chart-container" style="height: 180px; position: relative;">
          <canvas id="wardModalTrendChart"></canvas>
        </div>
      </div>

      <div class="modal-actions-row">
        <button class="btn btn-outline" id="btn-close-ward-modal">Close Window</button>
        <a href="tel:${ward.phone}" class="btn btn-primary"><i data-lucide="phone"></i> Contact Inspector</a>
      </div>
    `;

    modal.classList.add('active');
    if (window.lucide) window.lucide.createIcons();

    // Render modal chart
    if (window.Chart) {
      setTimeout(() => {
        const canvas = document.getElementById('wardModalTrendChart');
        if (canvas) {
          new window.Chart(canvas, {
            type: 'line',
            data: {
              labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'],
              datasets: [{
                label: 'Compliance %',
                data: [
                  Math.max(70, ward.complianceScore - 4.5),
                  Math.max(72, ward.complianceScore - 2.8),
                  Math.max(75, ward.complianceScore - 1.2),
                  Math.max(76, ward.complianceScore - 0.5),
                  ward.complianceScore
                ],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                tension: 0.35,
                fill: true,
                borderWidth: 2
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { min: 70, max: 100, grid: { color: 'rgba(255,255,255,0.06)' } },
                x: { grid: { display: false } }
              }
            }
          });
        }
      }, 100);
    }
  }

  attachEventListeners() {
    // Preset buttons
    document.addEventListener('click', (e) => {
      const presetBtn = e.target.closest('.preset-card-btn');
      if (presetBtn) {
        const pid = presetBtn.dataset.presetId;
        this.selectPreset(pid);
      }

      const drilldownBtn = e.target.closest('.btn-ward-drilldown') || e.target.closest('.ward-card');
      if (drilldownBtn && !e.target.closest('.btn-ward-drilldown')) {
        const wid = drilldownBtn.dataset.wardId;
        if (wid) this.showWardModal(wid);
      } else if (drilldownBtn && e.target.closest('.btn-ward-drilldown')) {
        const wid = e.target.closest('.btn-ward-drilldown').dataset.wardId;
        if (wid) this.showWardModal(wid);
      }

      if (e.target.id === 'btn-close-ward-modal' || e.target.closest('#btn-close-ward-modal') || e.target.classList.contains('modal-backdrop')) {
        const modal = document.getElementById('ward-drilldown-modal');
        if (modal) modal.classList.remove('active');
      }
    });

    // File upload
    const fileInput = document.getElementById('classifier-file-input');
    const uploadDropzone = document.getElementById('classifier-upload-dropzone');

    if (uploadDropzone && fileInput) {
      uploadDropzone.addEventListener('click', () => fileInput.click());
      
      uploadDropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadDropzone.classList.add('drag-over');
      });

      uploadDropzone.addEventListener('dragleave', () => {
        uploadDropzone.classList.remove('drag-over');
      });

      uploadDropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadDropzone.classList.remove('drag-over');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.handleCustomUpload(e.dataTransfer.files[0]);
        }
      });

      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          this.handleCustomUpload(e.target.files[0]);
        }
      });
    }

    // Ward scorecard filters
    const zoneSelect = document.getElementById('scorecard-zone-filter');
    if (zoneSelect) {
      zoneSelect.addEventListener('change', (e) => {
        this.filterZone = e.target.value;
        this.renderWardScorecard();
      });
    }

    const sortSelect = document.getElementById('scorecard-sort-filter');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        const [field, order] = e.target.value.split('-');
        this.sortField = field;
        this.sortOrder = order || 'desc';
        this.renderWardScorecard();
      });
    }

    const searchInput = document.getElementById('scorecard-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.renderWardScorecard();
      });
    }
  }
}
