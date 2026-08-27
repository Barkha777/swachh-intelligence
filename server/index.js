import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Swachh Intelligence Backend API',
    timestamp: new Date().toISOString()
  });
});

// 2. Segregation Classification API endpoint
app.post('/api/classify', (req, res) => {
  const { imageType, confidenceScore } = req.body;
  const categories = ['Dry Waste', 'Wet Waste', 'E-Waste', 'Hazardous'];
  const detectedCategory = categories[Math.floor(Math.random() * categories.length)];
  
  res.json({
    success: true,
    category: detectedCategory,
    confidence: confidenceScore || (88 + Math.floor(Math.random() * 10)),
    timestamp: new Date().toISOString(),
    recommendation: `Route to ${detectedCategory} processing facility.`
  });
});

// 3. Fleet tracking data endpoint
app.get('/api/fleet', (req, res) => {
  res.json({
    success: true,
    totalVehicles: 48,
    activeRoutes: 42,
    efficiencyScore: '94.2%',
    vehicles: [
      { id: 'V-101', status: 'ON_ROUTE', battery: '88%', location: 'Zone 4 - Indiranagar' },
      { id: 'V-102', status: 'COLLECTING', battery: '65%', location: 'Zone 2 - Koramangala' },
      { id: 'V-103', status: 'DEPOT', battery: '100%', location: 'Central Hub Depot' },
      { id: 'V-104', status: 'ON_ROUTE', battery: '79%', location: 'Zone 7 - Whitefield' }
    ]
  });
});

// 4. Garbage Vulnerable Points (GVP) prediction endpoint
app.get('/api/gvp', (req, res) => {
  res.json({
    success: true,
    highRiskZones: 6,
    predictedIncidents: 14,
    hotspots: [
      { id: 'GVP-01', location: 'Market Street Junction', riskLevel: 'HIGH', probability: '92%' },
      { id: 'GVP-02', location: 'Sector 5 Railway Crossing', riskLevel: 'CRITICAL', probability: '97%' },
      { id: 'GVP-03', location: 'North Avenue Commercial Hub', riskLevel: 'MEDIUM', probability: '74%' }
    ]
  });
});

// 5. Digital Evidence Challan generator endpoint
app.post('/api/evidence', (req, res) => {
  const { offenderId, violationType, location } = req.body;
  const challanId = 'CHAL-' + Math.floor(100000 + Math.random() * 900000);
  
  res.json({
    success: true,
    challanId,
    violation: violationType || 'Unauthorized Waste Dumping',
    location: location || 'GVP Hotspot #3',
    fineAmount: '₹2,500',
    issuedAt: new Date().toISOString(),
    status: 'ISSUED'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Swachh Intelligence Backend running on http://localhost:${PORT}`);
});
