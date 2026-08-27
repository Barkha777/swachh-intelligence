import { SWACHH_SURVEKSHAN_AUDIT_DATA } from '../data/mockData.js';
import { Chart, registerables } from 'chart.js';
import confetti from 'canvas-confetti';

Chart.register(...registerables);

export class EvidenceGenerator {
  constructor() {
    this.charts = {};
  }

  init() {
    this.renderInlineTrendCharts();
    this.attachEventListeners();
  }

  renderInlineTrendCharts() {
    this.renderSegregationChart();
    this.renderRouteChart();
    this.renderGVPChart();
  }

  renderSegregationChart() {
    const ctx = document.getElementById('chart-segregation-trend');
    if (!ctx) return;

    if (this.charts.segregation) this.charts.segregation.destroy();

    this.charts.segregation = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026 (Current)'],
        datasets: [
          {
            label: 'Overall Segregation %',
            data: [78.4, 81.2, 84.6, 88.0, 91.5, 94.6],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointBackgroundColor: '#10b981',
            pointRadius: 4
          },
          {
            label: 'Target Accuracy Benchmark (85%)',
            data: [85, 85, 85, 85, 85, 85],
            borderColor: '#f59e0b',
            borderDash: [6, 6],
            borderWidth: 2,
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }
          }
        },
        scales: {
          y: {
            min: 70,
            max: 100,
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: { color: '#94a3b8', callback: (v) => v + '%' }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8' }
          }
        }
      }
    });
  }

  renderRouteChart() {
    const ctx = document.getElementById('chart-route-coverage-trend');
    if (!ctx) return;

    if (this.charts.route) this.charts.route.destroy();

    this.charts.route = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current Week'],
        datasets: [
          {
            label: 'Route Adherence %',
            data: [88.5, 91.0, 92.4, 93.8, 95.2],
            backgroundColor: '#06b6d4',
            borderRadius: 6
          },
          {
            label: 'Daily Coverage %',
            data: [86.2, 89.4, 90.8, 93.1, 94.8],
            backgroundColor: '#3b82f6',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }
          }
        },
        scales: {
          y: {
            min: 75,
            max: 100,
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: { color: '#94a3b8', callback: (v) => v + '%' }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8' }
          }
        }
      }
    });
  }

  renderGVPChart() {
    const ctx = document.getElementById('chart-gvp-risk-trend');
    if (!ctx) return;

    if (this.charts.gvp) this.charts.gvp.destroy();

    this.charts.gvp = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mar 2026', 'Apr 2026', 'May 2026', 'Jun 2026', 'Jul 2026', 'Aug 2026'],
        datasets: [
          {
            label: 'Active High-Risk GVPs (Nagpur City)',
            data: [94, 78, 62, 45, 28, 14],
            borderColor: '#ef4444',
            backgroundColor: 'rgba(239, 68, 68, 0.12)',
            fill: true,
            tension: 0.35,
            borderWidth: 3,
            pointBackgroundColor: '#ef4444',
            pointRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: '#94a3b8', font: { family: 'Inter', size: 11 } }
          }
        },
        scales: {
          y: {
            min: 0,
            max: 110,
            grid: { color: 'rgba(255,255,255,0.06)' },
            ticks: { color: '#94a3b8' }
          },
          x: {
            grid: { display: false },
            ticks: { color: '#94a3b8' }
          }
        }
      }
    });
  }

  generateEvidencePackModal() {
    const modal = document.getElementById('evidence-pack-modal');
    const content = document.getElementById('evidence-modal-body');
    if (!modal || !content) return;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect');
    }

    const audit = SWACHH_SURVEKSHAN_AUDIT_DATA;

    content.innerHTML = `
      <div class="dossier-document" id="dossier-print-area">
        <!-- Official Municipal Header -->
        <div class="dossier-header">
          <div class="dossier-emblem-row">
            <div class="dossier-emblems">
              <img src="/assets/logo.png" alt="NMC Logo" class="dossier-logo" />
              <div class="dossier-titles">
                <h2>NAGPUR MUNICIPAL CORPORATION</h2>
                <h3>SOLID WASTE MANAGEMENT & SWACHH BHARAT MISSION CELL</h3>
                <p>Civil Lines, Nagpur, Maharashtra - 440001 | MoHUA Urban Body Code: MH-NGP-01</p>
              </div>
            </div>
            <div class="dossier-qr-box">
              <div class="qr-mock">
                <svg viewBox="0 0 100 100" class="qr-svg">
                  <rect width="100" height="100" fill="#ffffff"/>
                  <rect x="10" y="10" width="25" height="25" fill="#0f172a"/>
                  <rect x="15" y="15" width="15" height="15" fill="#ffffff"/>
                  <rect x="18" y="18" width="9" height="9" fill="#0f172a"/>
                  
                  <rect x="65" y="10" width="25" height="25" fill="#0f172a"/>
                  <rect x="70" y="15" width="15" height="15" fill="#ffffff"/>
                  <rect x="73" y="18" width="9" height="9" fill="#0f172a"/>

                  <rect x="10" y="65" width="25" height="25" fill="#0f172a"/>
                  <rect x="15" y="70" width="15" height="15" fill="#ffffff"/>
                  <rect x="18" y="73" width="9" height="9" fill="#0f172a"/>

                  <rect x="45" y="15" width="10" height="10" fill="#0f172a"/>
                  <rect x="45" y="35" width="15" height="10" fill="#0f172a"/>
                  <rect x="45" y="55" width="10" height="15" fill="#0f172a"/>
                  <rect x="65" y="55" width="25" height="10" fill="#0f172a"/>
                  <rect x="65" y="75" width="10" height="15" fill="#0f172a"/>
                  <rect x="80" y="75" width="10" height="15" fill="#0f172a"/>
                </svg>
              </div>
              <span class="qr-lbl">MoHUA Audit Hash: <br><code>SHA256: 8f9b..e421</code></span>
            </div>
          </div>

          <div class="dossier-cert-ribbon">
            <span>OFFICIAL SWACHH SURVEKSHAN 2026 COMPLIANCE DOSSIER</span>
            <span>AUDIT WINDOW: ${audit.auditWindow.toUpperCase()}</span>
          </div>
        </div>

        <!-- Executive Summary Matrix -->
        <div class="dossier-kpi-band">
          <div class="dkpi-item">
            <span class="dkpi-lbl">Overall Audit Score</span>
            <h3 class="dkpi-val text-success">${audit.overallCityScore} / 100</h3>
            <span class="dkpi-status">Grade A+ (Exemplary)</span>
          </div>
          <div class="dkpi-item">
            <span class="dkpi-lbl">Total Marks Earned</span>
            <h3 class="dkpi-val">${audit.totalMarksEarned.toLocaleString('en-IN')} / ${audit.totalMarksMax.toLocaleString('en-IN')}</h3>
            <span class="dkpi-status">${audit.percentage}% Total Realization</span>
          </div>
          <div class="dkpi-item">
            <span class="dkpi-lbl">GFC Star Rating Target</span>
            <h3 class="dkpi-val text-amber">${audit.starRatingTarget}</h3>
            <span class="dkpi-status">Audit Verification Passed</span>
          </div>
          <div class="dkpi-item">
            <span class="dkpi-lbl">AI Segregation Accuracy</span>
            <h3 class="dkpi-val text-cyan">92.4%</h3>
            <span class="dkpi-status">Target (>85%) Met</span>
          </div>
        </div>

        <!-- Detailed Indicators Table -->
        <div class="dossier-section">
          <h4 class="dossier-sec-title">1. Key Performance Indicators Verification (MoHUA Framework)</h4>
          <table class="dossier-table">
            <thead>
              <tr>
                <th>Compliance Indicator & Scope</th>
                <th>Prescribed Target</th>
                <th>Field AI Validated Achievement</th>
                <th>Marks Earned</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${audit.metrics.map(m => `
                <tr>
                  <td><strong>${m.indicator}</strong></td>
                  <td>${m.target}</td>
                  <td><span class="font-bold text-success">${m.achieved}</span></td>
                  <td><strong>${m.marksEarned}</strong> / ${m.marksMax}</td>
                  <td><span class="badge ${m.status === 'Exemplary' ? 'badge-success' : 'badge-cyan'}">${m.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Geospatial & Operational Evidence Summary -->
        <div class="dossier-section">
          <h4 class="dossier-sec-title">2. Operational & Geospatial Evidence Logs</h4>
          <div class="dossier-evidence-grid">
            <div class="dev-card">
              <h5>📍 Route Adherence & Fleet Coverage</h5>
              <ul>
                <li>Total Monitored Collection Vehicles: <strong>18 Active Smart EV Units</strong></li>
                <li>Daily Geo-Route Adherence: <strong>94.8%</strong> (Zero Critical Gaps)</li>
                <li>Pilot Zones Covered: <strong>Dharampeth (Zone 2) & Laxmi Nagar (Zone 1)</strong></li>
                <li>Automated Skipped-Street Rerouting: <strong>100% Resolved within 3 hours</strong></li>
              </ul>
            </div>
            <div class="dev-card">
              <h5>🔍 AI Waste Classification & Source Segregation</h5>
              <ul>
                <li>Multi-Spectral Ingestion Points: <strong>Bhandewadi & Mankapur MRF</strong></li>
                <li>Tested Waste Streams: <strong>Wet (Green), Dry (Blue), Hazardous (Red), C&D</strong></li>
                <li>Average Contamination Detection Rate: <strong>2.4%</strong> (Well within SBM 5% limit)</li>
                <li>Active Citizen Citations Generated: <strong>12 Wards notified</strong></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Signatures & Authentication -->
        <div class="dossier-signatures-row">
          <div class="sig-box">
            <div class="sig-line">Dr. Gajendra S. Mahalle</div>
            <span>Deputy Municipal Commissioner (SWM)</span>
            <span>Nagpur Municipal Corporation</span>
          </div>
          <div class="sig-box">
            <div class="sig-line">Dr. Abhijit Chaudhari, IAS</div>
            <span>Municipal Commissioner & CEO</span>
            <span>Nagpur Smart & Sustainable City Corp.</span>
          </div>
          <div class="sig-box">
            <div class="sig-stamp">
              <span class="stamp-circle">NMC SBM 2026<br>VERIFIED</span>
            </div>
            <span>Official Digital Stamp</span>
          </div>
        </div>
      </div>

      <div class="dossier-modal-actions">
        <button class="btn btn-outline" id="btn-close-evidence-modal">Close Window</button>
        <button class="btn btn-secondary" id="btn-print-evidence-pdf"><i data-lucide="printer"></i> Print / Save as PDF</button>
        <button class="btn btn-primary" id="btn-download-evidence-zip"><i data-lucide="download"></i> Download Audit Dossier (.PDF)</button>
      </div>
    `;

    modal.classList.add('active');
    if (window.lucide) window.lucide.createIcons();
  }

  attachEventListeners() {
    document.addEventListener('click', (e) => {
      // Generate Evidence Pack button
      if (e.target.id === 'btn-generate-evidence-pack' || e.target.closest('#btn-generate-evidence-pack')) {
        this.generateEvidencePackModal();
      }

      // Close modal
      if (e.target.id === 'btn-close-evidence-modal' || e.target.closest('#btn-close-evidence-modal') || (e.target.classList.contains('modal-backdrop') && e.target.id === 'evidence-pack-modal')) {
        const modal = document.getElementById('evidence-pack-modal');
        if (modal) modal.classList.remove('active');
      }

      // Print / PDF
      if (e.target.id === 'btn-print-evidence-pdf' || e.target.closest('#btn-print-evidence-pdf') || e.target.id === 'btn-download-evidence-zip' || e.target.closest('#btn-download-evidence-zip')) {
        window.print();
      }
    });
  }
}
