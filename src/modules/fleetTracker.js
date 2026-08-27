import { FLEET_VEHICLES, SKIPPED_STREETS_CATALOG } from '../data/mockData.js';
import L from 'leaflet';

export class FleetTracker {
  constructor() {
    this.map = null;
    this.vehicles = JSON.parse(JSON.stringify(FLEET_VEHICLES));
    this.skippedStreets = JSON.parse(JSON.stringify(SKIPPED_STREETS_CATALOG));
    this.selectedVehicleId = this.vehicles[0].id;
    this.activeZoneFilter = 'all';
    this.markers = {};
    this.routePolylines = [];
    this.skippedOverlays = [];
    this.vehicleAnimationIndex = {};
    this.animationTimer = null;
    this.showSkippedOnly = false;
  }

  init() {
    this.initMap();
    this.renderVehicleList();
    this.renderTimingTable();
    this.renderMileageAndLoadPanel();
    this.renderSkippedStreetsPanel();
    this.attachEventListeners();
    this.startLiveSimulation();
  }

  initMap() {
    const mapContainer = document.getElementById('fleet-leaflet-map');
    if (!mapContainer) return;

    // Nagpur Pilot Zones Center (between Dharampeth & Laxmi Nagar)
    this.map = L.map('fleet-leaflet-map', {
      center: [21.1350, 79.0720],
      zoom: 14,
      zoomControl: true,
      attributionControl: false
    });

    // Dark sleek CartoDB / OSM basemap tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(this.map);

    // Pilot Zone Boundaries Polygon Overlays
    const dharampethBounds = [
      [21.1490, 79.0600],
      [21.1520, 79.0830],
      [21.1380, 79.0860],
      [21.1360, 79.0640]
    ];
    L.polygon(dharampethBounds, {
      color: '#10b981',
      weight: 2,
      fillColor: '#10b981',
      fillOpacity: 0.07,
      dashArray: '4, 4'
    }).addTo(this.map).bindTooltip('Pilot Zone B: Dharampeth', { permanent: false, direction: 'center' });

    const laxmiNagarBounds = [
      [21.1360, 79.0500],
      [21.1380, 79.0780],
      [21.1160, 79.0790],
      [21.1140, 79.0520]
    ];
    L.polygon(laxmiNagarBounds, {
      color: '#3b82f6',
      weight: 2,
      fillColor: '#3b82f6',
      fillOpacity: 0.07,
      dashArray: '4, 4'
    }).addTo(this.map).bindTooltip('Pilot Zone A: Laxmi Nagar', { permanent: false, direction: 'center' });

    // Render routes and markers
    this.renderMapEntities();
  }

  renderMapEntities() {
    if (!this.map) return;

    // Clear old layers
    this.routePolylines.forEach(l => this.map.removeLayer(l));
    this.routePolylines = [];
    this.skippedOverlays.forEach(l => this.map.removeLayer(l));
    this.skippedOverlays = [];

    // Filter vehicles
    let filteredVehicles = this.vehicles;
    if (this.activeZoneFilter !== 'all') {
      filteredVehicles = this.vehicles.filter(v => v.zoneId === this.activeZoneFilter);
    }

    // Render Routes
    if (!this.showSkippedOnly) {
      filteredVehicles.forEach(vehicle => {
        const isSelected = vehicle.id === this.selectedVehicleId;
        const curIndex = this.vehicleAnimationIndex[vehicle.id] || 0;

        // Route polyline points
        const completedPoints = vehicle.waypoints.slice(0, curIndex + 1);
        const remainingPoints = vehicle.waypoints.slice(curIndex);

        // Active/Completed polyline (solid glowing line)
        if (completedPoints.length > 1) {
          const polyCompleted = L.polyline(completedPoints, {
            color: isSelected ? '#2563eb' : '#059669',
            weight: isSelected ? 5 : 4,
            opacity: 0.9,
            lineCap: 'round',
            lineJoin: 'round'
          }).addTo(this.map);
          this.routePolylines.push(polyCompleted);
        }

        // Remaining polyline (dashed line)
        if (remainingPoints.length > 1) {
          const polyRemaining = L.polyline(remainingPoints, {
            color: isSelected ? '#0284c7' : '#94a3b8',
            weight: isSelected ? 4 : 2,
            dashArray: '6, 8',
            opacity: 0.7
          }).addTo(this.map);
          this.routePolylines.push(polyRemaining);
        }
      });
    }

    // Render Skipped Streets Overlay
    this.skippedStreets.forEach(skipped => {
      const circle = L.circle(skipped.coords, {
        color: '#ef4444',
        fillColor: '#ef4444',
        fillOpacity: 0.35,
        radius: 120,
        weight: 2,
        dashArray: '5, 5',
        className: 'pulsing-skipped-circle'
      }).addTo(this.map);

      circle.bindPopup(`
        <div class="map-popup-card">
          <div class="popup-badge badge-danger">SKIPPED STREET ALERT</div>
          <h4>${skipped.streetName}</h4>
          <p><strong>Reason:</strong> ${skipped.reason}</p>
          <p><strong>Households Missed:</strong> ${skipped.householdsAffected}</p>
          <p><strong>Status:</strong> ${skipped.actionStatus}</p>
        </div>
      `);

      this.skippedOverlays.push(circle);
    });

    // Render Vehicle Markers
    filteredVehicles.forEach(vehicle => {
      const isSelected = vehicle.id === this.selectedVehicleId;
      const curIndex = this.vehicleAnimationIndex[vehicle.id] || 0;
      const curPos = vehicle.waypoints[curIndex] || vehicle.waypoints[0];

      // Custom HTML Marker
      const iconHtml = `
        <div class="custom-vehicle-marker ${vehicle.status} ${isSelected ? 'selected' : ''}" data-vehicle-id="${vehicle.id}">
          <div class="marker-pulse"></div>
          <div class="marker-icon-box">
            <i class="v-icon">${vehicle.type.includes('Trolley') ? '🛒' : (vehicle.type.includes('Compactor') ? '🚛' : '🚚')}</i>
          </div>
          <span class="marker-label">${vehicle.id.split('-').slice(1).join('-')}</span>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'vehicle-div-icon',
        html: iconHtml,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      if (this.markers[vehicle.id]) {
        this.markers[vehicle.id].setLatLng(curPos);
        this.markers[vehicle.id].setIcon(customIcon);
      } else {
        const marker = L.marker(curPos, { icon: customIcon }).addTo(this.map);
        marker.on('click', () => {
          this.selectVehicle(vehicle.id);
        });
        this.markers[vehicle.id] = marker;
      }
    });
  }

  selectVehicle(vehicleId) {
    this.selectedVehicleId = vehicleId;
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;

    // Pan map to vehicle
    const curIndex = this.vehicleAnimationIndex[vehicle.id] || 0;
    const curPos = vehicle.waypoints[curIndex] || vehicle.waypoints[0];
    if (this.map) {
      this.map.flyTo(curPos, 15, { duration: 0.8 });
    }

    this.renderMapEntities();
    this.renderVehicleList();
    this.renderSelectedTelemetryCard(vehicle);
    this.renderMileageAndLoadPanel();
  }

  renderVehicleList() {
    const listContainer = document.getElementById('fleet-vehicles-scroll-list');
    if (!listContainer) return;

    let filtered = this.vehicles;
    if (this.activeZoneFilter !== 'all') {
      filtered = this.vehicles.filter(v => v.zoneId === this.activeZoneFilter);
    }

    listContainer.innerHTML = filtered.map(vehicle => {
      const isSelected = vehicle.id === this.selectedVehicleId;
      const statusBadge = vehicle.status === 'moving' 
        ? '<span class="status-pill status-pill-success"><span class="pulse-dot"></span> On-Route</span>' 
        : (vehicle.status === 'delayed' 
          ? '<span class="status-pill status-pill-amber"><span class="pulse-dot"></span> Delayed</span>' 
          : '<span class="status-pill status-pill-neutral">Offloading</span>');

      return `
        <div class="fleet-v-card ${isSelected ? 'active' : ''}" data-vehicle-id="${vehicle.id}">
          <div class="fvc-header">
            <div class="fvc-id-wrap">
              <span class="fvc-id">${vehicle.id}</span>
              <span class="fvc-type">${vehicle.type}</span>
            </div>
            ${statusBadge}
          </div>

          <div class="fvc-route-name"><i data-lucide="navigation"></i> ${vehicle.routeId}</div>

          <div class="fvc-metrics-row">
            <div class="fvc-m-col">
              <span class="fvc-m-lbl">Coverage</span>
              <span class="fvc-m-val text-cyan">${vehicle.dailyCoverage}%</span>
            </div>
            <div class="fvc-m-col">
              <span class="fvc-m-lbl">Load Cell</span>
              <span class="fvc-m-val ${vehicle.loadPercent > 90 ? 'text-danger' : 'text-emerald'}">${vehicle.loadPercent}% (${(vehicle.loadWeightKg/1000).toFixed(1)} MT)</span>
            </div>
            <div class="fvc-m-col">
              <span class="fvc-m-lbl">Battery/Fuel</span>
              <span class="fvc-m-val">${vehicle.batteryPercent}%</span>
            </div>
          </div>

          <div class="fvc-footer">
            <span class="fvc-driver"><i data-lucide="user"></i> ${vehicle.driver}</span>
            <span class="fvc-variance ${vehicle.varianceStatus.includes('Delayed') ? 'text-danger' : 'text-success'}">${vehicle.varianceStatus}</span>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();

    // Render telemetry card for active vehicle
    const activeV = this.vehicles.find(v => v.id === this.selectedVehicleId) || this.vehicles[0];
    this.renderSelectedTelemetryCard(activeV);
  }

  renderSelectedTelemetryCard(vehicle) {
    const card = document.getElementById('fleet-active-telemetry-card');
    if (!card || !vehicle) return;

    card.innerHTML = `
      <div class="tele-top-bar">
        <div class="tele-id-group">
          <span class="tele-badge">${vehicle.zoneName}</span>
          <h3>${vehicle.id}</h3>
          <span class="tele-vtype">${vehicle.type}</span>
        </div>
        <div class="tele-speed-meter">
          <span class="speed-num">${vehicle.speedKmH}</span>
          <span class="speed-unit">km/h</span>
        </div>
      </div>

      <div class="tele-driver-row">
        <div class="tele-driver-info">
          <span class="tele-lbl">Operator / Pilot</span>
          <strong>${vehicle.driver}</strong>
          <span class="tele-phone">${vehicle.phone}</span>
        </div>
        <div class="tele-coverage-box">
          <span class="tele-lbl">Daily Route Coverage</span>
          <strong class="text-cyan">${vehicle.dailyCoverage}%</strong>
          <div class="progress-bar-bg mini">
            <div class="progress-bar-fill bg-cyan" style="width:${vehicle.dailyCoverage}%"></div>
          </div>
        </div>
      </div>

      <div class="tele-grid-4">
        <div class="tele-cell">
          <span class="tele-lbl">Current Waypoint / Stop</span>
          <span class="tele-val-sm">${vehicle.currentStop}</span>
        </div>
        <div class="tele-cell">
          <span class="tele-lbl">Schedule Variance</span>
          <span class="tele-val-sm ${vehicle.varianceStatus.includes('Delayed') ? 'text-danger' : 'text-success'}">${vehicle.varianceStatus}</span>
        </div>
        <div class="tele-cell">
          <span class="tele-lbl">Odometer Log</span>
          <span class="tele-val-sm">${vehicle.odometerKm} km</span>
        </div>
        <div class="tele-cell">
          <span class="tele-lbl">Safety Telemetry Score</span>
          <span class="tele-val-sm text-emerald">${vehicle.safetyScore}/100</span>
        </div>
      </div>

      ${vehicle.skippedStreets && vehicle.skippedStreets.length > 0 ? `
        <div class="tele-skipped-alert">
          <div class="skipped-alert-header">
            <i data-lucide="alert-octagon"></i>
            <strong>Skipped Street Flagged (${vehicle.skippedStreets.length})</strong>
          </div>
          <p>${vehicle.skippedStreets[0].name} - <em>${vehicle.skippedStreets[0].reason}</em></p>
          <button class="btn-dispatch-reroute" data-vehicle-id="${vehicle.id}">
            <i data-lucide="corner-up-right"></i> Trigger Auto-Reroute Dispatch
          </button>
        </div>
      ` : ''}
    `;

    if (window.lucide) window.lucide.createIcons();
  }

  renderTimingTable() {
    const tbody = document.getElementById('fleet-timing-table-body');
    if (!tbody) return;

    tbody.innerHTML = this.vehicles.map(v => {
      let badgeClass = 'badge-success';
      if (v.varianceMinutes > 10) badgeClass = 'badge-danger';
      else if (v.varianceMinutes > 3) badgeClass = 'badge-amber';

      return `
        <tr>
          <td>
            <strong>${v.id}</strong>
            <span class="sub-text">${v.zoneName.split(' ')[0]}</span>
          </td>
          <td>${v.routeId.split(' ')[0]}</td>
          <td>${v.driver}</td>
          <td>${v.scheduledStart}</td>
          <td>${v.actualStart}</td>
          <td><span class="badge ${badgeClass}">${v.varianceStatus}</span></td>
          <td>${v.currentStop}</td>
        </tr>
      `;
    }).join('');
  }

  renderMileageAndLoadPanel() {
    const totalKm = this.vehicles.reduce((acc, v) => acc + v.odometerKm, 0).toFixed(1);
    const totalLoadKg = this.vehicles.reduce((acc, v) => acc + v.loadWeightKg, 0);
    const totalLoadMT = (totalLoadKg / 1000).toFixed(2);
    const avgCoverage = (this.vehicles.reduce((acc, v) => acc + v.dailyCoverage, 0) / this.vehicles.length).toFixed(1);

    const kmEl = document.getElementById('fleet-total-mileage');
    if (kmEl) kmEl.textContent = `${totalKm} km`;

    const loadEl = document.getElementById('fleet-total-load');
    if (loadEl) loadEl.textContent = `${totalLoadMT} MT`;

    const covEl = document.getElementById('fleet-avg-coverage');
    if (covEl) covEl.textContent = `${avgCoverage}%`;

    const activeCountEl = document.getElementById('fleet-active-count');
    if (activeCountEl) activeCountEl.textContent = `${this.vehicles.filter(v => v.status === 'moving').length}/${this.vehicles.length}`;
  }

  renderSkippedStreetsPanel() {
    const container = document.getElementById('fleet-skipped-streets-list');
    if (!container) return;

    container.innerHTML = this.skippedStreets.map(skp => `
      <div class="skipped-item-card" data-skipped-id="${skp.id}">
        <div class="skp-top">
          <span class="badge badge-danger"><i data-lucide="alert-triangle"></i> Missed Street</span>
          <span class="skp-time">${skp.timestamp}</span>
        </div>
        <h4 class="skp-name">${skp.streetName}</h4>
        <div class="skp-meta">
          <span><strong>Ward ${skp.wardNumber}</strong> (${skp.zoneName})</span>
          <span><i data-lucide="home"></i> ${skp.householdsAffected} Homes</span>
        </div>
        <p class="skp-reason"><strong>Cause:</strong> ${skp.reason}</p>
        <div class="skp-action-row">
          <span class="skp-status-pill">${skp.actionStatus}</span>
          <button class="btn btn-xs btn-primary btn-zoom-skipped" data-lat="${skp.coords[0]}" data-lng="${skp.coords[1]}">
            <i data-lucide="crosshair"></i> Locate
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  startLiveSimulation() {
    if (this.animationTimer) clearInterval(this.animationTimer);

    this.animationTimer = setInterval(() => {
      this.vehicles.forEach(vehicle => {
        if (vehicle.status !== 'moving') return;

        let curIndex = this.vehicleAnimationIndex[vehicle.id] || 0;
        curIndex = (curIndex + 1) % vehicle.waypoints.length;
        this.vehicleAnimationIndex[vehicle.id] = curIndex;

        const nextPos = vehicle.waypoints[curIndex];

        // Increment minor mileage & load
        vehicle.odometerKm = +(vehicle.odometerKm + 0.05).toFixed(2);
        if (vehicle.loadWeightKg < vehicle.loadCapacityKg) {
          vehicle.loadWeightKg = Math.min(vehicle.loadCapacityKg, vehicle.loadWeightKg + 5);
          vehicle.loadPercent = +((vehicle.loadWeightKg / vehicle.loadCapacityKg) * 100).toFixed(1);
        }

        if (this.markers[vehicle.id]) {
          this.markers[vehicle.id].setLatLng(nextPos);
        }
      });

      // Update map route polylines & telemetry readouts smoothly
      this.renderMapEntities();
      this.renderMileageAndLoadPanel();
    }, 1400);
  }

  attachEventListeners() {
    document.addEventListener('click', (e) => {
      const vCard = e.target.closest('.fleet-v-card');
      if (vCard) {
        const vid = vCard.dataset.vehicleId;
        if (vid) this.selectVehicle(vid);
      }

      const locateBtn = e.target.closest('.btn-zoom-skipped');
      if (locateBtn) {
        const lat = parseFloat(locateBtn.dataset.lat);
        const lng = parseFloat(locateBtn.dataset.lng);
        if (this.map && !isNaN(lat) && !isNaN(lng)) {
          this.map.flyTo([lat, lng], 17, { duration: 1.0 });
        }
      }

      const rerouteBtn = e.target.closest('.btn-dispatch-reroute');
      if (rerouteBtn) {
        const vid = rerouteBtn.dataset.vehicleId;
        this.triggerRerouteAction(vid);
      }
    });

    const zoneFilter = document.getElementById('fleet-zone-filter');
    if (zoneFilter) {
      zoneFilter.addEventListener('change', (e) => {
        this.activeZoneFilter = e.target.value;
        this.renderMapEntities();
        this.renderVehicleList();
      });
    }

    const skippedToggle = document.getElementById('toggle-skipped-streets');
    if (skippedToggle) {
      skippedToggle.addEventListener('change', (e) => {
        this.showSkippedOnly = e.target.checked;
        this.renderMapEntities();
      });
    }
  }

  triggerRerouteAction(vehicleId) {
    const vehicle = this.vehicles.find(v => v.id === vehicleId);
    if (!vehicle) return;

    vehicle.skippedStreets = [];
    this.renderSelectedTelemetryCard(vehicle);
    this.renderVehicleList();

    const toast = document.createElement('div');
    toast.className = 'toast-alert toast-success';
    toast.innerHTML = `
      <i data-lucide="check-circle-2"></i>
      <div>
        <strong>Auto-Reroute Assigned!</strong>
        <p>Micro-trolley squad dispatched to clear skipped sector for ${vehicle.id}.</p>
      </div>
    `;
    document.body.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => toast.remove(), 4000);
  }
}
