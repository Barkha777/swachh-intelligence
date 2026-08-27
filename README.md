# 🧹 Swachh Intelligence | Smart Waste Command Center

> **Next-Generation AI & Geospatial Municipal Waste Management Platform**

[![Live Demo (Vercel)](https://img.shields.io/badge/Live%20Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://swachh-intelligence.vercel.app)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Express.js](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)

---

## 🌐 Live Application Link

- ⚡ **Live Production Deployment (Vercel)**:  
  👉 **[https://swachh-intelligence.vercel.app](https://swachh-intelligence.vercel.app)** *(Full-stack Vite + Serverless API)*

---

## 📌 Project Overview

**Swachh Intelligence** is a comprehensive, data-driven Smart Waste Command Center platform designed for urban municipal corporations (e.g., Nagpur Municipal Corporation). The platform integrates **3D geospatial visualization**, **AI-assisted waste segregation analysis**, **fleet telemetry tracking**, **Garbage Vulnerable Point (GVP) risk prediction**, and **digital violation enforcement** into a unified real-time dashboard.

---

## ✨ Key Features & Core Modules

### 🗺️ 1. 3D Geospatial Hero Map & Command Center
- Built using **Three.js** and **Leaflet** for interactive city map visualization.
- Real-time rendering of municipal sectors, collection hotspots, and route paths.

### ♻️ 2. AI Waste Segregation Classifier
- Interactive sample inspection for multiple waste streams:
  - **Dry Plastic Waste**
  - **Wet Organic Waste**
  - **Electronic Waste (E-Waste)**
  - **Hazardous & Medical Waste**
  - **Construction & Demolition (C&D) Debris**
- Generates real-time confidence scores and recommended facility routing advice.

### 🚚 3. Real-Time Fleet Tracker
- Tracks municipal collection vehicle routes, active status (`ON_ROUTE`, `COLLECTING`, `DEPOT`), battery telemetry, and zone assignments across municipal sectors.

### ⚠️ 4. Garbage Vulnerable Point (GVP) Predictor
- Predicts high-risk illegal dumping locations and vulnerability probabilities to help municipal teams deploy preventative measures before overflow occurs.

### 📜 5. Digital Evidence & Enforcement Engine
- Generates official digital violation challans with instant tracking IDs, fine amounts, location tags, and violation logs for municipal enforcement officers.

### ⚡ 6. Unified REST & Serverless API Backend
Provides backend endpoints for both standalone Node/Express servers and Vercel Serverless Functions:
- `GET /api/health` — System health and status telemetry.
- `POST /api/classify` — Automated waste classification evaluation.
- `GET /api/fleet` — Live collection vehicle telemetry feed.
- `GET /api/gvp` — Hotspot risk evaluation and incident prediction data.
- `POST /api/evidence` — Digital enforcement challan generation.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: JavaScript (ES Modules), HTML5, CSS3 (Custom Glassmorphism Design System)
- **3D & Maps**: Three.js, Leaflet.js
- **UI Components & Icons**: Lucide Icons, Chart.js, Canvas-Confetti, html2canvas, jsPDF
- **Build Tool**: Vite 8
- **Backend API**: Express.js (Local API server) + Vercel Serverless Functions (`api/index.js`)
- **Deployment**: Vercel (Primary) + GitHub Actions & Pages (Backup)

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18+) & npm

### Installation Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Barkha777/swachh-intelligence.git
   cd swachh-intelligence
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Frontend Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Run Express Backend API Server**:
   ```bash
   npm run server
   ```
   Backend will run at `http://localhost:3000/api/health`.

5. **Run Both Frontend & Backend Concurrently**:
   ```bash
   npm run dev:all
   ```

---

## 📦 Deployment Architecture

### Vercel Deployment (Production)
Configured with zero-config rewrites in [`vercel.json`](vercel.json) and serverless function entrypoint at [`api/index.js`](api/index.js).
- Pushing to `main` automatically triggers production builds on Vercel at **[swachh-intelligence.vercel.app](https://swachh-intelligence.vercel.app)**.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
