import { GVP_TOP_100 } from '../data/mockData.js';

export class GVPPredictor {
  constructor() {
    this.gvps = JSON.parse(JSON.stringify(GVP_TOP_100));
    this.currentPage = 1;
    this.pageSize = 10;
    this.filterRiskTier = 'all'; // all | critical | high | moderate | low
    this.filterZone = 'all';
    this.searchQuery = '';
    this.sortField = 'riskScore';
    this.sortOrder = 'desc';
    this.activeAlertGVP = this.gvps.find(g => g.riskScore >= 95) || this.gvps[0];
  }

  init() {
    this.renderAlarmingPanel();
    this.renderTable();
    this.initRefreshCountdown();
    this.attachEventListeners();
  }

  renderAlarmingPanel() {
    const container = document.getElementById('gvp-alarm-panel-container');
    if (!container) return;

    const gvp = this.activeAlertGVP;
    if (!gvp) return;

    container.innerHTML = `
      <div class="gvp-critical-banner">
        <div class="gvp-banner-left">
          <div class="siren-pulse-box">
            <span class="siren-ring"></span>
            <i data-lucide="alert-octagon" class="siren-icon"></i>
          </div>
          <div class="gvp-alert-info">
            <div class="gvp-alert-badge-row">
              <span class="badge badge-danger">CRITICAL THRESHOLD BREACH (>85 RISK)</span>
              <span class="alert-pulse-tag">AI Sentinel Active</span>
            </div>
            <h3 class="gvp-alert-location">${gvp.location}</h3>
            <p class="gvp-alert-meta">
              <strong>${gvp.ward} (${gvp.zone} Zone)</strong> • Predicted Accumulation: <span class="text-danger font-bold">${gvp.predictedWasteKgDay} kg/day</span> • Last Cleared: ${gvp.lastCleared}
            </p>
          </div>
        </div>

        <div class="gvp-banner-right">
          <div class="risk-meter-display">
            <span class="rm-score text-danger">${gvp.riskScore}</span>
            <span class="rm-max">/100</span>
            <span class="rm-trend text-danger"><i data-lucide="trending-up"></i> ${gvp.trend}</span>
          </div>
        </div>
      </div>

      <!-- Mass Communication / Instant Dispatch Modal Mock Bubble -->
      <div class="mass-comm-card">
        <div class="comm-header">
          <div class="comm-header-title">
            <i data-lucide="message-square"></i>
            <h4>Simulated Field Ops Dispatch & Notification Stream</h4>
          </div>
          <span class="comm-protocol">Protocol: SBM MoHUA Section 4.2 Auto-Escalation</span>
        </div>

        <div class="comm-chat-bubble-box">
          <div class="chat-avatar"><i data-lucide="shield-alert"></i></div>
          <div class="chat-bubble">
            <div class="chat-bubble-header">
              <strong>NMC Swachh Intelligence Dispatch Bot</strong>
              <span class="chat-time">Just now • Automated SMS / WhatsApp Gateway</span>
            </div>
            <div class="chat-body">
              <p class="msg-en">
                🚨 <strong>[URGENT SWACHH DISPATCH]</strong> Zonal Sanitary Inspector <u>${gvp.inspector}</u> (${gvp.phone}): AI Risk Index at <strong>${gvp.location}</strong> has reached <strong>${gvp.riskScore}/100 (Critical)</strong>. Estimated <strong>${gvp.predictedWasteKgDay} kg</strong> waste accumulated. Nearest EV Compactor (NMC-EV-0104) has been prioritized. Clearance proof required within 60 mins.
              </p>
              <p class="msg-mr">
                📢 <strong>[तात्काळ स्वच्छता संदेश]</strong> प्रभाग ${gvp.ward} चे स्वच्छता निरीक्षक: ${gvp.location} येथे कचरा साचण्याचा धोका वाढला आहे (${gvp.riskScore}%). त्वरित स्वच्छता पथक रवाना करा.
              </p>
            </div>
            <div class="chat-bubble-footer">
              <span class="dispatch-sent-status"><i data-lucide="check-check"></i> Delivered to Inspector & Zonal Head (${gvp.phone})</span>
            </div>
          </div>
        </div>

        <div class="comm-action-bar">
          <div class="comm-status-indicator">
            <span class="pulse-dot bg-danger"></span>
            <span>Squad Deployment Pending Verification</span>
          </div>
          <button class="btn btn-primary btn-dispatch-squad" id="btn-dispatch-rapid-squad" data-gvp-id="${gvp.id}">
            <i data-lucide="truck"></i> Trigger Rapid Clearance Squad (1-Click Auto-Dispatch)
          </button>
        </div>
      </div>
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  getFilteredData() {
    let list = [...this.gvps];

    if (this.filterRiskTier !== 'all') {
      if (this.filterRiskTier === 'critical') list = list.filter(g => g.riskScore >= 85);
      else if (this.filterRiskTier === 'high') list = list.filter(g => g.riskScore >= 70 && g.riskScore < 85);
      else if (this.filterRiskTier === 'moderate') list = list.filter(g => g.riskScore >= 50 && g.riskScore < 70);
      else if (this.filterRiskTier === 'low') list = list.filter(g => g.riskScore < 50);
    }

    if (this.filterZone !== 'all') {
      list = list.filter(g => g.zone.toLowerCase().includes(this.filterZone.replace('zone-', '').toLowerCase()) || g.zone.toLowerCase().includes(this.filterZone.toLowerCase()));
    }

    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      list = list.filter(g => 
        g.location.toLowerCase().includes(q) || 
        g.ward.toLowerCase().includes(q) || 
        g.zone.toLowerCase().includes(q) ||
        g.id.toLowerCase().includes(q)
      );
    }

    list.sort((a, b) => {
      let valA = a[this.sortField];
      let valB = b[this.sortField];

      if (this.sortField === 'trend') {
        valA = parseFloat(a.trend.replace('+', '').replace('-', '')) * (a.trendDir === 'up' ? 1 : -1);
        valB = parseFloat(b.trend.replace('+', '').replace('-', '')) * (b.trendDir === 'up' ? 1 : -1);
      }

      if (this.sortOrder === 'desc') {
        return valB > valA ? 1 : -1;
      } else {
        return valA > valB ? 1 : -1;
      }
    });

    return list;
  }

  renderTable() {
    const tbody = document.getElementById('gvp-table-body');
    const paginationContainer = document.getElementById('gvp-pagination-bar');
    const counterEl = document.getElementById('gvp-table-count-label');
    if (!tbody) return;

    const filtered = this.getFilteredData();
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / this.pageSize) || 1;

    if (this.currentPage > totalPages) this.currentPage = totalPages;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const pageItems = filtered.slice(startIndex, startIndex + this.pageSize);

    if (counterEl) {
      counterEl.textContent = `Showing ${startIndex + 1}-${Math.min(startIndex + this.pageSize, totalItems)} of ${totalItems} Vulnerable Points (Top 100)`;
    }

    if (pageItems.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-8 text-muted">
            <i data-lucide="search-x" style="font-size:2rem; display:block; margin:0 auto 8px;"></i>
            No GVP locations matched your search filter.
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = pageItems.map(g => {
        let badgeClass = 'badge-success';
        let scoreClass = 'text-success';
        if (g.riskScore >= 85) {
          badgeClass = 'badge-danger';
          scoreClass = 'text-danger';
        } else if (g.riskScore >= 70) {
          badgeClass = 'badge-amber';
          scoreClass = 'text-amber';
        } else if (g.riskScore >= 55) {
          badgeClass = 'badge-cyan';
          scoreClass = 'text-cyan';
        }

        const isAlertGvp = this.activeAlertGVP && this.activeAlertGVP.id === g.id;

        return `
          <tr class="${isAlertGvp ? 'row-highlight-danger' : ''}" data-gvp-id="${g.id}">
            <td><strong class="rank-num">#${g.rank}</strong></td>
            <td>
              <div class="gvp-loc-cell">
                <span class="gvp-loc-title">${g.location}</span>
                <span class="gvp-loc-id">${g.id}</span>
              </div>
            </td>
            <td>
              <strong>${g.ward}</strong>
              <span class="sub-text">${g.zone}</span>
            </td>
            <td>
              <div class="risk-score-cell">
                <span class="risk-val ${scoreClass}">${g.riskScore}</span>
                <div class="progress-bar-bg mini" style="width:60px">
                  <div class="progress-bar-fill ${g.riskScore >= 85 ? 'bg-danger' : (g.riskScore >= 70 ? 'bg-amber' : 'bg-emerald')}" style="width:${g.riskScore}%"></div>
                </div>
              </div>
            </td>
            <td>
              <span class="trend-pill ${g.trendDir === 'up' ? 'text-danger' : 'text-success'}">
                <i data-lucide="${g.trendDir === 'up' ? 'arrow-up-right' : 'arrow-down-right'}"></i> ${g.trend}
              </span>
            </td>
            <td><strong>${g.predictedWasteKgDay.toLocaleString('en-IN')} kg/day</strong></td>
            <td><span class="text-muted">${g.lastCleared}</span></td>
            <td>
              <div class="action-cell-btns">
                <span class="badge ${badgeClass}">${g.status}</span>
                <button class="btn btn-xs btn-outline btn-select-gvp" data-gvp-id="${g.id}" title="Simulate Alarm Trigger">
                  <i data-lucide="bell"></i> Alert
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    if (paginationContainer) {
      paginationContainer.innerHTML = `
        <div class="pag-info">Page ${this.currentPage} of ${totalPages}</div>
        <div class="pag-btn-group">
          <button class="btn btn-xs btn-outline btn-pag-prev" ${this.currentPage === 1 ? 'disabled' : ''}>
            <i data-lucide="chevron-left"></i> Prev
          </button>
          ${Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const p = i + 1;
            return `
              <button class="btn btn-xs ${p === this.currentPage ? 'btn-primary' : 'btn-outline'} btn-pag-page" data-page="${p}">${p}</button>
            `;
          }).join('')}
          <button class="btn btn-xs btn-outline btn-pag-next" ${this.currentPage === totalPages ? 'disabled' : ''}>
            Next <i data-lucide="chevron-right"></i>
          </button>
        </div>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  }

  exportCSV() {
    const filtered = this.getFilteredData();
    const headers = ['Rank', 'GVP_ID', 'Location', 'Ward', 'Zone', 'Risk_Score', 'Trend_7Day', 'Predicted_Accumulation_Kg_Day', 'Last_Cleared', 'Status', 'Inspector_Assigned', 'Contact_Number'];
    
    const rows = filtered.map(g => [
      g.rank,
      `"${g.id}"`,
      `"${g.location.replace(/"/g, '""')}"`,
      `"${g.ward}"`,
      `"${g.zone}"`,
      g.riskScore,
      `"${g.trend}"`,
      g.predictedWasteKgDay,
      `"${g.lastCleared}"`,
      `"${g.status}"`,
      `"${g.inspector}"`,
      `"${g.phone}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `NMC_GVP_Top100_Risk_Matrix_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show Toast Notification
    const toast = document.createElement('div');
    toast.className = 'toast-alert toast-success';
    toast.innerHTML = `
      <i data-lucide="download-cloud"></i>
      <div>
        <strong>Export Complete!</strong>
        <p>Top-100 GVP Risk Action Matrix successfully exported as CSV.</p>
      </div>
    `;
    document.body.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();
    setTimeout(() => toast.remove(), 4000);
  }

  printRoster() {
    window.print();
  }

  initRefreshCountdown() {
    const el = document.getElementById('gvp-refresh-countdown');
    if (!el) return;

    let totalSeconds = 3 * 86400 + 14 * 3600 + 22 * 60 + 45; // 3d 14h 22m 45s

    setInterval(() => {
      totalSeconds--;
      if (totalSeconds < 0) totalSeconds = 7 * 86400;

      const d = Math.floor(totalSeconds / 86400);
      const h = Math.floor((totalSeconds % 86400) / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      el.textContent = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);
  }

  attachEventListeners() {
    document.addEventListener('click', (e) => {
      const selectBtn = e.target.closest('.btn-select-gvp') || e.target.closest('tr[data-gvp-id]');
      if (selectBtn && !e.target.closest('.btn-select-gvp') && !e.target.closest('.btn')) {
        const gid = selectBtn.dataset.gvpId;
        const found = this.gvps.find(g => g.id === gid);
        if (found) {
          this.activeAlertGVP = found;
          this.renderAlarmingPanel();
          this.renderTable();
        }
      } else if (e.target.closest('.btn-select-gvp')) {
        const gid = e.target.closest('.btn-select-gvp').dataset.gvpId;
        const found = this.gvps.find(g => g.id === gid);
        if (found) {
          this.activeAlertGVP = found;
          this.renderAlarmingPanel();
          this.renderTable();
          // Smooth scroll to top of GVP section
          document.getElementById('module-gvp')?.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Dispatch squad button
      if (e.target.id === 'btn-dispatch-rapid-squad' || e.target.closest('#btn-dispatch-rapid-squad')) {
        this.handleSquadDispatch();
      }

      // Pagination
      if (e.target.closest('.btn-pag-prev')) {
        if (this.currentPage > 1) {
          this.currentPage--;
          this.renderTable();
        }
      }
      if (e.target.closest('.btn-pag-next')) {
        const totalPages = Math.ceil(this.getFilteredData().length / this.pageSize);
        if (this.currentPage < totalPages) {
          this.currentPage++;
          this.renderTable();
        }
      }
      if (e.target.closest('.btn-pag-page')) {
        this.currentPage = parseInt(e.target.closest('.btn-pag-page').dataset.page);
        this.renderTable();
      }
    });

    // Export button
    const exportBtn = document.getElementById('btn-export-gvp-csv');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => this.exportCSV());
    }

    const printBtn = document.getElementById('btn-print-gvp-roster');
    if (printBtn) {
      printBtn.addEventListener('click', () => this.printRoster());
    }

    // Filters
    const riskTierSelect = document.getElementById('gvp-risk-tier-filter');
    if (riskTierSelect) {
      riskTierSelect.addEventListener('change', (e) => {
        this.filterRiskTier = e.target.value;
        this.currentPage = 1;
        this.renderTable();
      });
    }

    const zoneSelect = document.getElementById('gvp-zone-filter');
    if (zoneSelect) {
      zoneSelect.addEventListener('change', (e) => {
        this.filterZone = e.target.value;
        this.currentPage = 1;
        this.renderTable();
      });
    }

    const searchInput = document.getElementById('gvp-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.currentPage = 1;
        this.renderTable();
      });
    }

    // Sort buttons in table header
    const sortHeaders = document.querySelectorAll('th[data-sort-field]');
    sortHeaders.forEach(th => {
      th.addEventListener('click', () => {
        const field = th.dataset.sortField;
        if (this.sortField === field) {
          this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
        } else {
          this.sortField = field;
          this.sortOrder = 'desc';
        }
        this.renderTable();
      });
    });
  }

  handleSquadDispatch() {
    const gvp = this.activeAlertGVP;
    if (!gvp) return;

    gvp.status = 'Squad Dispatched';
    gvp.riskScore = Math.max(25, Math.round(gvp.riskScore * 0.45));
    gvp.lastCleared = 'Just now (In Progress)';
    gvp.trend = '-35.0%';
    gvp.trendDir = 'down';

    this.renderAlarmingPanel();
    this.renderTable();

    // Show confirmation Toast
    const toast = document.createElement('div');
    toast.className = 'toast-alert toast-success';
    toast.innerHTML = `
      <i data-lucide="check-circle-2"></i>
      <div>
        <strong>Rapid Clearance Squad Dispatched!</strong>
        <p>EV Compactor NMC-EV-0104 rerouted to ${gvp.location}. SMS notification confirmed with Sanitary Inspector ${gvp.inspector}.</p>
      </div>
    `;
    document.body.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();
    setTimeout(() => toast.remove(), 4500);
  }
}
