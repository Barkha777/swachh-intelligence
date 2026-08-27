/**
 * Swachh Intelligence - Nagpur Municipal Corporation (NMC) Mock Datasets
 * Problem Statement 04 - Smart City Theme (Manthan4Yuva)
 */

export const NMC_ZONES = [
  { id: 'all', name: 'All Zones (Nagpur City)', wardsCount: 30, activeVehicles: 18, gvpCount: 42, avgSegregation: 91.2 },
  { id: 'zone-1', name: 'Zone 1: Laxmi Nagar (Pilot Zone A)', wardsCount: 4, activeVehicles: 4, gvpCount: 5, avgSegregation: 94.6 },
  { id: 'zone-2', name: 'Zone 2: Dharampeth (Pilot Zone B)', wardsCount: 4, activeVehicles: 4, gvpCount: 4, avgSegregation: 93.8 },
  { id: 'zone-3', name: 'Zone 3: Hanuman Nagar', wardsCount: 3, activeVehicles: 2, gvpCount: 4, avgSegregation: 89.2 },
  { id: 'zone-4', name: 'Zone 4: Dhantoli', wardsCount: 3, activeVehicles: 2, gvpCount: 3, avgSegregation: 92.0 },
  { id: 'zone-5', name: 'Zone 5: Nehru Nagar', wardsCount: 3, activeVehicles: 1, gvpCount: 5, avgSegregation: 86.4 },
  { id: 'zone-6', name: 'Zone 6: Gandhibagh', wardsCount: 3, activeVehicles: 2, gvpCount: 6, avgSegregation: 84.1 },
  { id: 'zone-7', name: 'Zone 7: Satranjipura', wardsCount: 3, activeVehicles: 1, gvpCount: 5, avgSegregation: 82.5 },
  { id: 'zone-8', name: 'Zone 8: Lakadganj', wardsCount: 3, activeVehicles: 2, gvpCount: 6, avgSegregation: 85.0 },
  { id: 'zone-9', name: 'Zone 9: Ashi Nagar', wardsCount: 2, activeVehicles: 1, gvpCount: 5, avgSegregation: 81.3 },
  { id: 'zone-10', name: 'Zone 10: Mangalwari', wardsCount: 2, activeVehicles: 1, gvpCount: 4, avgSegregation: 88.7 }
];

export const AI_SAMPLE_PRESETS = [
  {
    id: 'wet-organic',
    title: 'Wet / Organic Kitchen Waste',
    subtitle: 'Vegetable peels, fruit rinds, food scraps',
    image: '/assets/samples/wet_organic.png',
    primaryClass: 'Wet / Organic Biodegradable',
    targetBin: 'Green Bin (Wet Waste)',
    binColor: '#16a34a',
    binIcon: 'trash-2',
    confidence: 96.4,
    contaminationScore: 2.1,
    contaminationGrade: 'Grade A (Pristine)',
    penaltyFlag: false,
    composition: [
      { name: 'Vegetable & Fruit Peels', percent: 64 },
      { name: 'Cooked Food Remnants', percent: 28 },
      { name: 'Tea Leaves & Coffee Grounds', percent: 6 },
      { name: 'Inert/Paper Moisture Wrap', percent: 2 }
    ],
    boundingBoxes: [
      { label: 'Organic: Vegetable Peels (97%)', x: 20, y: 25, w: 45, h: 40, color: '#16a34a' },
      { label: 'Organic: Fruit Rinds (95%)', x: 55, y: 45, w: 35, h: 35, color: '#16a34a' }
    ],
    protocol: 'Route directly to Bhandewadi Bio-Methanation & Waste-to-Energy Plant for rapid composting.',
    targetAccuracyRef: '96.4% AI Match vs 85.0% SBM Minimum Mandate'
  },
  {
    id: 'dry-plastic',
    title: 'Clean Dry Recyclables',
    subtitle: 'Crushed PET bottles, aluminum cans, cardboard',
    image: '/assets/samples/dry_plastic.png',
    primaryClass: 'Dry Recyclable (Plastics & Metals)',
    targetBin: 'Blue Bin (Dry Recyclables)',
    binColor: '#2563eb',
    binIcon: 'recycle',
    confidence: 97.8,
    contaminationScore: 1.4,
    contaminationGrade: 'Grade A (High Value)',
    penaltyFlag: false,
    composition: [
      { name: 'PET Bottle Grade-1 Polymer', percent: 58 },
      { name: 'Aluminum Beverage Cans', percent: 26 },
      { name: 'Corrugated Paper Cardboard', percent: 14 },
      { name: 'Moisture / Dust Residue', percent: 2 }
    ],
    boundingBoxes: [
      { label: 'Polymer: PET Bottle #1 (99%)', x: 18, y: 20, w: 40, h: 50, color: '#2563eb' },
      { label: 'Metal: Aluminum Can (97%)', x: 52, y: 35, w: 38, h: 42, color: '#2563eb' }
    ],
    protocol: 'Route to Mankapur Material Recovery Facility (MRF) Automated Optical Sorter Line 1.',
    targetAccuracyRef: '97.8% AI Match vs 85.0% SBM Minimum Mandate'
  },
  {
    id: 'medical-hazard',
    title: 'Domestic Biomedical / Hazardous Waste',
    subtitle: 'Syringes, surgical masks, expired blister packs',
    image: '/assets/samples/medical_hazard.png',
    primaryClass: 'Domestic Biomedical & Hazardous Waste',
    targetBin: 'Red Bin (Hazardous / Sanitary)',
    binColor: '#dc2626',
    binIcon: 'alert-triangle',
    confidence: 98.1,
    contaminationScore: 0.8,
    contaminationGrade: 'Grade S (Critical Bio-Hazard)',
    penaltyFlag: true,
    composition: [
      { name: 'Sterilized Plastic Syringes', percent: 45 },
      { name: 'Disposable 3-Ply Masks', percent: 32 },
      { name: 'Pharmaceutical Blister Packs', percent: 18 },
      { name: 'Sharps / Needles Indicator', percent: 5 }
    ],
    boundingBoxes: [
      { label: 'Biohazard: Syringe Sharps (98%)', x: 22, y: 15, w: 38, h: 45, color: '#dc2626' },
      { label: 'Sanitary: Clinical Mask (97%)', x: 48, y: 38, w: 42, h: 42, color: '#dc2626' }
    ],
    protocol: 'STRICT PROTOCOL: Dispatch sealed yellow hazardous container to Super Speciality Hospital Incinerator Facility.',
    targetAccuracyRef: '98.1% AI Match vs 85.0% SBM Minimum Mandate'
  },
  {
    id: 'cd-debris',
    title: 'Construction & Demolition (C&D) Waste',
    subtitle: 'Bricks, broken concrete, mortar rubble, plaster',
    image: '/assets/samples/cd_debris.png',
    primaryClass: 'Construction & Demolition (C&D) Debris',
    targetBin: 'Designated C&D Yellow/Grey Drop Station',
    binColor: '#64748b',
    binIcon: 'hard-hat',
    confidence: 95.7,
    contaminationScore: 3.2,
    contaminationGrade: 'Grade A (Recyclable Aggregates)',
    penaltyFlag: false,
    composition: [
      { name: 'Concrete Slab Rubble', percent: 52 },
      { name: 'Burnt Clay Red Brick Bats', percent: 30 },
      { name: 'Cement Mortar Plaster', percent: 15 },
      { name: 'Reinforced Steel Offcuts', percent: 3 }
    ],
    boundingBoxes: [
      { label: 'C&D: Concrete Rubble (96%)', x: 15, y: 25, w: 48, h: 45, color: '#eab308' },
      { label: 'C&D: Red Brick Bat (95%)', x: 50, y: 30, w: 38, h: 45, color: '#eab308' }
    ],
    protocol: 'Designated Heavy Tipper pickup required -> Divert to NMC Bhandewadi C&D Recycling & Paver Block Plant.',
    targetAccuracyRef: '95.7% AI Match vs 85.0% SBM Minimum Mandate'
  },
  {
    id: 'mixed-contaminated',
    title: 'Contaminated Mixed Waste (Unsegregated)',
    subtitle: 'Oily food waste mixed with single-use plastic wrap',
    image: '/assets/samples/mixed_contaminated.png',
    primaryClass: 'Severely Contaminated Non-Segregated Mix',
    targetBin: 'Requires Manual Sorting / High Contamination Penalty',
    binColor: '#f97316',
    binIcon: 'x-circle',
    confidence: 92.4,
    contaminationScore: 48.6,
    contaminationGrade: 'Grade D (Segregation Breach)',
    penaltyFlag: true,
    composition: [
      { name: 'Oily Cooked Gravy / Vegetable Peels', percent: 46 },
      { name: 'Contaminated Single-Use LDPE Bags', percent: 32 },
      { name: 'Polystyrene / Styrofoam Cups', percent: 14 },
      { name: 'Non-Recyclable Multilayer Plastics', percent: 8 }
    ],
    boundingBoxes: [
      { label: 'Contaminant: Food-Soiled Plastic (94%)', x: 15, y: 15, w: 45, h: 45, color: '#f97316' },
      { label: 'Wet Waste: Decomposed Food (91%)', x: 45, y: 35, w: 45, h: 48, color: '#ef4444' }
    ],
    protocol: 'ISSUE CITATION: Citizen QR warning flagged on Swachhata App. Route to Trommel Secondary Segregation Screen.',
    targetAccuracyRef: '92.4% Detection Accuracy - Penalty Notice Generated'
  },
  {
    id: 'ewaste-battery',
    title: 'Domestic E-Waste & Batteries',
    subtitle: 'Lithium phone cells, AA batteries, broken cables',
    image: '/assets/samples/ewaste_battery.png',
    primaryClass: 'Domestic Electronic & Toxic E-Waste',
    targetBin: 'Red Bin (Toxic Electronic Component Drop)',
    binColor: '#dc2626',
    binIcon: 'battery-charging',
    confidence: 94.5,
    contaminationScore: 1.8,
    contaminationGrade: 'Grade S (Heavy Metal Toxic Hazard)',
    penaltyFlag: true,
    composition: [
      { name: 'Lithium-Ion Polymer Battery Cells', percent: 48 },
      { name: 'Alkaline Zinc-Carbon Cylinders', percent: 28 },
      { name: 'Copper Core Insulated Wiring', percent: 18 },
      { name: 'PCB Circuit Board Scrap', percent: 6 }
    ],
    boundingBoxes: [
      { label: 'Toxic: Li-Ion Cell (96%)', x: 20, y: 22, w: 42, h: 42, color: '#dc2626' },
      { label: 'Hazard: Alkaline AA Batteries (93%)', x: 50, y: 40, w: 35, h: 38, color: '#dc2626' }
    ],
    protocol: 'PROHIBITED IN GENERAL STREAM: Divert to Authorized E-Waste Dismantler (Maha-Pollution Board Partner).',
    targetAccuracyRef: '94.5% AI Match vs 85.0% SBM Minimum Mandate'
  }
];

export const WARD_SCORECARD_DATA = [
  { id: 101, wardNumber: 12, name: 'Ramdaspeth - Shankar Nagar', zoneId: 'zone-2', zoneName: 'Dharampeth', complianceScore: 96.2, trend: '+3.4%', wetDryRatio: '68:32', contaminationRate: '2.1%', households: 14200, status: 'Exemplary', inspector: 'S. K. Deshmukh', phone: '+91 98230 44101' },
  { id: 102, wardNumber: 13, name: 'Gokulpeth - VIP Road', zoneId: 'zone-2', zoneName: 'Dharampeth', complianceScore: 94.8, trend: '+2.1%', wetDryRatio: '65:35', contaminationRate: '2.8%', households: 15800, status: 'Exemplary', inspector: 'M. V. Joshi', phone: '+91 98230 44102' },
  { id: 103, wardNumber: 14, name: 'Shivaji Nagar - Traffic Park', zoneId: 'zone-2', zoneName: 'Dharampeth', complianceScore: 92.5, trend: '+1.5%', wetDryRatio: '62:38', contaminationRate: '4.2%', households: 13100, status: 'Compliant', inspector: 'P. R. Thakre', phone: '+91 98230 44103' },
  { id: 104, wardNumber: 15, name: 'Lendhra - Hill Road', zoneId: 'zone-2', zoneName: 'Dharampeth', complianceScore: 91.7, trend: '+0.8%', wetDryRatio: '60:40', contaminationRate: '4.9%', households: 12400, status: 'Compliant', inspector: 'A. G. Wankhede', phone: '+91 98230 44104' },
  
  { id: 105, wardNumber: 16, name: 'Bajaj Nagar - VNIT Enclave', zoneId: 'zone-1', zoneName: 'Laxmi Nagar', complianceScore: 97.1, trend: '+4.0%', wetDryRatio: '70:30', contaminationRate: '1.6%', households: 16500, status: 'Exemplary', inspector: 'Dr. V. N. Patil', phone: '+91 98230 44105' },
  { id: 106, wardNumber: 17, name: 'Pratap Nagar - Khamla Square', zoneId: 'zone-1', zoneName: 'Laxmi Nagar', complianceScore: 95.4, trend: '+2.8%', wetDryRatio: '66:34', contaminationRate: '2.5%', households: 18200, status: 'Exemplary', inspector: 'R. B. Meshram', phone: '+91 98230 44106' },
  { id: 107, wardNumber: 18, name: 'Tatya Tope Nagar - Telecom Nagar', zoneId: 'zone-1', zoneName: 'Laxmi Nagar', complianceScore: 93.6, trend: '+1.9%', wetDryRatio: '63:37', contaminationRate: '3.6%', households: 14900, status: 'Compliant', inspector: 'S. D. Kulkarni', phone: '+91 98230 44107' },
  { id: 108, wardNumber: 19, name: 'Deo Nagar - Trimurti Nagar', zoneId: 'zone-1', zoneName: 'Laxmi Nagar', complianceScore: 92.3, trend: '+0.4%', wetDryRatio: '61:39', contaminationRate: '4.5%', households: 15400, status: 'Compliant', inspector: 'N. T. Bhende', phone: '+91 98230 44108' },
  
  { id: 109, wardNumber: 20, name: 'Reshimbagh - Medical Square', zoneId: 'zone-3', zoneName: 'Hanuman Nagar', complianceScore: 89.8, trend: '+1.1%', wetDryRatio: '58:42', contaminationRate: '6.2%', households: 17600, status: 'Compliant', inspector: 'K. L. Raut', phone: '+91 98230 44109' },
  { id: 110, wardNumber: 21, name: 'Sakkardara Lake Environs', zoneId: 'zone-3', zoneName: 'Hanuman Nagar', complianceScore: 88.4, trend: '-0.9%', wetDryRatio: '57:43', contaminationRate: '7.1%', households: 19400, status: 'Needs Improvement', inspector: 'D. C. Gaikwad', phone: '+91 98230 44110' },
  { id: 111, wardNumber: 22, name: 'Ayodhya Nagar - Raghuji Nagar', zoneId: 'zone-3', zoneName: 'Hanuman Nagar', complianceScore: 89.4, trend: '+0.5%', wetDryRatio: '59:41', contaminationRate: '6.5%', households: 16100, status: 'Compliant', inspector: 'H. S. Sawarkar', phone: '+91 98230 44111' },

  { id: 112, wardNumber: 24, name: 'Dhantoli Garden - Mehadia Square', zoneId: 'zone-4', zoneName: 'Dhantoli', complianceScore: 93.4, trend: '+2.2%', wetDryRatio: '64:36', contaminationRate: '3.8%', households: 13800, status: 'Compliant', inspector: 'A. P. Mohod', phone: '+91 98230 44112' },
  { id: 113, wardNumber: 25, name: 'Congress Nagar - Tikekar Road', zoneId: 'zone-4', zoneName: 'Dhantoli', complianceScore: 91.8, trend: '+1.4%', wetDryRatio: '61:39', contaminationRate: '4.6%', households: 12200, status: 'Compliant', inspector: 'G. M. Gedam', phone: '+91 98230 44113' },
  { id: 114, wardNumber: 26, name: 'Rahate Colony - Wardha Road', zoneId: 'zone-4', zoneName: 'Dhantoli', complianceScore: 90.9, trend: '+0.7%', wetDryRatio: '60:40', contaminationRate: '5.2%', households: 14500, status: 'Compliant', inspector: 'T. V. Narwade', phone: '+91 98230 44114' },

  { id: 115, wardNumber: 28, name: 'Nandanvan Colony - KDK College', zoneId: 'zone-5', zoneName: 'Nehru Nagar', complianceScore: 87.2, trend: '+0.3%', wetDryRatio: '56:44', contaminationRate: '7.8%', households: 21200, status: 'Needs Improvement', inspector: 'U. B. Shinde', phone: '+91 98230 44115' },
  { id: 116, wardNumber: 29, name: 'Hasanbagh - Tajbagh Corridor', zoneId: 'zone-5', zoneName: 'Nehru Nagar', complianceScore: 84.9, trend: '-1.4%', wetDryRatio: '54:46', contaminationRate: '9.2%', households: 22800, status: 'Needs Improvement', inspector: 'I. K. Khan', phone: '+91 98230 44116' },
  { id: 117, wardNumber: 30, name: 'Nehru Nagar - Dighori Naka', zoneId: 'zone-5', zoneName: 'Nehru Nagar', complianceScore: 87.1, trend: '+1.0%', wetDryRatio: '55:45', contaminationRate: '8.0%', households: 19700, status: 'Needs Improvement', inspector: 'V. S. Charde', phone: '+91 98230 44117' },

  { id: 118, wardNumber: 32, name: 'Sitabuldi Main Market - Variety Sq', zoneId: 'zone-6', zoneName: 'Gandhibagh', complianceScore: 84.6, trend: '-2.0%', wetDryRatio: '52:48', contaminationRate: '9.8%', households: 11400, status: 'Needs Improvement', inspector: 'C. P. Agrawal', phone: '+91 98230 44118' },
  { id: 119, wardNumber: 33, name: 'Itwari Sarafa & Grain Market', zoneId: 'zone-6', zoneName: 'Gandhibagh', complianceScore: 83.1, trend: '-1.6%', wetDryRatio: '51:49', contaminationRate: '10.5%', households: 13900, status: 'Non-Compliant', inspector: 'L. N. Gupta', phone: '+91 98230 44119' },
  { id: 120, wardNumber: 34, name: 'Mahal - Gandhi Gate - Tilak Statue', zoneId: 'zone-6', zoneName: 'Gandhibagh', complianceScore: 84.7, trend: '+0.2%', wetDryRatio: '53:47', contaminationRate: '9.4%', households: 16800, status: 'Needs Improvement', inspector: 'S. S. Bhoyar', phone: '+91 98230 44120' },

  { id: 121, wardNumber: 36, name: 'Shanti Nagar - Golibar Chowk', zoneId: 'zone-7', zoneName: 'Satranjipura', complianceScore: 81.9, trend: '-0.8%', wetDryRatio: '50:50', contaminationRate: '11.4%', households: 18500, status: 'Non-Compliant', inspector: 'K. R. Tiwari', phone: '+91 98230 44121' },
  { id: 122, wardNumber: 37, name: 'Satranjipura Main - Maskasath', zoneId: 'zone-7', zoneName: 'Satranjipura', complianceScore: 82.8, trend: '+0.6%', wetDryRatio: '51:49', contaminationRate: '10.8%', households: 17200, status: 'Non-Compliant', inspector: 'B. M. Muley', phone: '+91 98230 44122' },
  { id: 123, wardNumber: 38, name: 'Nal Saheb Chowk - Hansapuri', zoneId: 'zone-7', zoneName: 'Satranjipura', complianceScore: 82.9, trend: '-0.4%', wetDryRatio: '52:48', contaminationRate: '10.6%', households: 16900, status: 'Non-Compliant', inspector: 'R. K. Pandey', phone: '+91 98230 44123' },

  { id: 124, wardNumber: 40, name: 'Lakadganj Timber Market - Garoba', zoneId: 'zone-8', zoneName: 'Lakadganj', complianceScore: 85.6, trend: '+1.3%', wetDryRatio: '54:46', contaminationRate: '8.8%', households: 15300, status: 'Needs Improvement', inspector: 'P. S. Sonwane', phone: '+91 98230 44124' },
  { id: 125, wardNumber: 41, name: 'Small Factory Area - Bagadganj', zoneId: 'zone-8', zoneName: 'Lakadganj', complianceScore: 84.2, trend: '-1.1%', wetDryRatio: '53:47', contaminationRate: '9.6%', households: 14600, status: 'Needs Improvement', inspector: 'A. T. Borikar', phone: '+91 98230 44125' },
  { id: 126, wardNumber: 42, name: 'Bhandewadi Treatment Perimeter', zoneId: 'zone-8', zoneName: 'Lakadganj', complianceScore: 85.3, trend: '+0.9%', wetDryRatio: '55:45', contaminationRate: '8.9%', households: 13900, status: 'Needs Improvement', inspector: 'M. L. Bhagat', phone: '+91 98230 44126' },

  { id: 127, wardNumber: 44, name: 'Teka Naka - Lashkaribagh', zoneId: 'zone-9', zoneName: 'Ashi Nagar', complianceScore: 80.8, trend: '-1.8%', wetDryRatio: '49:51', contaminationRate: '12.1%', households: 24100, status: 'Non-Compliant', inspector: 'F. A. Siddiqui', phone: '+91 98230 44127' },
  { id: 128, wardNumber: 45, name: 'Kamal Chowk - Panchpaoli', zoneId: 'zone-9', zoneName: 'Ashi Nagar', complianceScore: 81.7, trend: '+0.5%', wetDryRatio: '50:50', contaminationRate: '11.5%', households: 22600, status: 'Non-Compliant', inspector: 'S. N. Ramteke', phone: '+91 98230 44128' },

  { id: 129, wardNumber: 48, name: 'Jaripatka - Mankapur Ring Rd', zoneId: 'zone-10', zoneName: 'Mangalwari', complianceScore: 89.1, trend: '+1.6%', wetDryRatio: '58:42', contaminationRate: '6.7%', households: 19800, status: 'Compliant', inspector: 'J. K. Chawla', phone: '+91 98230 44129' },
  { id: 130, wardNumber: 49, name: 'Sadar Residency Road - Chaoni', zoneId: 'zone-10', zoneName: 'Mangalwari', complianceScore: 88.3, trend: '+0.7%', wetDryRatio: '57:43', contaminationRate: '7.3%', households: 17400, status: 'Compliant', inspector: 'V. R. Dixit', phone: '+91 98230 44130' }
];

export const FLEET_VEHICLES = [
  {
    id: 'NMC-EV-0101',
    type: 'Hydraulic EV Compactor',
    driver: 'Rajesh S. Wanjari',
    phone: '+91 98231 11001',
    zoneId: 'zone-2',
    zoneName: 'Dharampeth (Pilot Zone B)',
    routeId: 'RT-DHP-01 (Ramdaspeth High Street)',
    status: 'moving',
    speedKmH: 18.4,
    dailyCoverage: 94.2,
    odometerKm: 38.6,
    batteryPercent: 78,
    fuelType: 'Electric 72V',
    loadWeightKg: 2420,
    loadCapacityKg: 3000,
    loadPercent: 80.7,
    safetyScore: 98,
    scheduledStart: '06:00 AM',
    actualStart: '06:02 AM',
    currentStop: 'Ramdaspeth Canal Rd, Bin #42',
    varianceMinutes: 2,
    varianceStatus: 'On-Time',
    skippedStreets: [],
    waypoints: [
      [21.1378, 79.0680],
      [21.1398, 79.0712],
      [21.1415, 79.0735],
      [21.1432, 79.0760],
      [21.1448, 79.0788],
      [21.1465, 79.0815],
      [21.1480, 79.0840],
      [21.1450, 79.0865],
      [21.1420, 79.0880],
      [21.1395, 79.0850],
      [21.1378, 79.0680]
    ]
  },
  {
    id: 'NMC-EV-0102',
    type: 'Tipper Micro-Truck',
    driver: 'Anil K. Bisen',
    phone: '+91 98231 11002',
    zoneId: 'zone-2',
    zoneName: 'Dharampeth (Pilot Zone B)',
    routeId: 'RT-DHP-02 (Shankar Nagar - VIP Rd)',
    status: 'moving',
    speedKmH: 14.2,
    dailyCoverage: 88.5,
    odometerKm: 31.4,
    batteryPercent: 64,
    fuelType: 'Electric 72V',
    loadWeightKg: 1680,
    loadCapacityKg: 2000,
    loadPercent: 84.0,
    safetyScore: 95,
    scheduledStart: '06:15 AM',
    actualStart: '06:23 AM',
    currentStop: 'Shankar Nagar Square, Lane 4',
    varianceMinutes: 8,
    varianceStatus: 'Minor Delay (+8m)',
    skippedStreets: [
      { name: 'Khare Town Lane 2 (Behind Law College)', reason: 'Construction Road Blockade', householdsMissed: 48, coords: [21.1455, 79.0665] }
    ],
    waypoints: [
      [21.1420, 79.0640],
      [21.1440, 79.0670],
      [21.1460, 79.0700],
      [21.1480, 79.0730],
      [21.1455, 79.0690],
      [21.1430, 79.0655],
      [21.1420, 79.0640]
    ]
  },
  {
    id: 'NMC-TR-0103',
    type: 'Battery Smart Micro-Trolley',
    driver: 'Sunita P. Meshram',
    phone: '+91 98231 11003',
    zoneId: 'zone-2',
    zoneName: 'Dharampeth (Pilot Zone B)',
    routeId: 'RT-DHP-03 (Shivaji Nagar Park Loop)',
    status: 'moving',
    speedKmH: 8.5,
    dailyCoverage: 96.8,
    odometerKm: 18.2,
    batteryPercent: 82,
    fuelType: 'Li-Ion Micro',
    loadWeightKg: 420,
    loadCapacityKg: 500,
    loadPercent: 84.0,
    safetyScore: 99,
    scheduledStart: '06:30 AM',
    actualStart: '06:28 AM',
    currentStop: 'Traffic Park Gate 2',
    varianceMinutes: -2,
    varianceStatus: 'Ahead (-2m)',
    skippedStreets: [],
    waypoints: [
      [21.1460, 79.0760],
      [21.1475, 79.0785],
      [21.1490, 79.0805],
      [21.1480, 79.0820],
      [21.1465, 79.0790],
      [21.1460, 79.0760]
    ]
  },
  {
    id: 'NMC-EV-0104',
    type: 'Hydraulic EV Compactor',
    driver: 'Vijay M. Dhurve',
    phone: '+91 98231 11004',
    zoneId: 'zone-1',
    zoneName: 'Laxmi Nagar (Pilot Zone A)',
    routeId: 'RT-LXN-01 (Bajaj Nagar - VNIT Perimeter)',
    status: 'moving',
    speedKmH: 22.0,
    dailyCoverage: 97.4,
    odometerKm: 42.1,
    batteryPercent: 71,
    fuelType: 'Electric 72V',
    loadWeightKg: 2810,
    loadCapacityKg: 3000,
    loadPercent: 93.7,
    safetyScore: 96,
    scheduledStart: '06:00 AM',
    actualStart: '06:01 AM',
    currentStop: 'VNIT Gate 3 Faculty Quarters',
    varianceMinutes: 1,
    varianceStatus: 'On-Time',
    skippedStreets: [],
    waypoints: [
      [21.1270, 79.0550],
      [21.1295, 79.0585],
      [21.1320, 79.0620],
      [21.1345, 79.0655],
      [21.1315, 79.0610],
      [21.1285, 79.0570],
      [21.1270, 79.0550]
    ]
  },
  {
    id: 'NMC-EV-0105',
    type: 'Tipper Micro-Truck',
    driver: 'Pradeep R. Sahare',
    phone: '+91 98231 11005',
    zoneId: 'zone-1',
    zoneName: 'Laxmi Nagar (Pilot Zone A)',
    routeId: 'RT-LXN-02 (Pratap Nagar - Khamla Market)',
    status: 'delayed',
    speedKmH: 9.8,
    dailyCoverage: 81.2,
    odometerKm: 27.5,
    batteryPercent: 55,
    fuelType: 'Electric 72V',
    loadWeightKg: 1910,
    loadCapacityKg: 2000,
    loadPercent: 95.5,
    safetyScore: 91,
    scheduledStart: '06:15 AM',
    actualStart: '06:31 AM',
    currentStop: 'Khamla Veg Market Backlane',
    varianceMinutes: 16,
    varianceStatus: 'Delayed (+16m)',
    skippedStreets: [
      { name: 'Khamla Sindhi Hindi School Road', reason: 'High Commercial Loading Bottleneck', householdsMissed: 62, coords: [21.1220, 79.0625] },
      { name: 'Tatya Tope Nagar Galli 3', reason: 'Water Pipe Excavation', householdsMissed: 35, coords: [21.1245, 79.0580] }
    ],
    waypoints: [
      [21.1190, 79.0590],
      [21.1215, 79.0620],
      [21.1240, 79.0650],
      [21.1265, 79.0680],
      [21.1235, 79.0635],
      [21.1205, 79.0605],
      [21.1190, 79.0590]
    ]
  },
  {
    id: 'NMC-TR-0106',
    type: 'Battery Smart Micro-Trolley',
    driver: 'Kavita D. Zade',
    phone: '+91 98231 11006',
    zoneId: 'zone-1',
    zoneName: 'Laxmi Nagar (Pilot Zone A)',
    routeId: 'RT-LXN-03 (Deo Nagar Residential Grid)',
    status: 'moving',
    speedKmH: 7.8,
    dailyCoverage: 95.0,
    odometerKm: 16.9,
    batteryPercent: 88,
    fuelType: 'Li-Ion Micro',
    loadWeightKg: 390,
    loadCapacityKg: 500,
    loadPercent: 78.0,
    safetyScore: 98,
    scheduledStart: '06:30 AM',
    actualStart: '06:30 AM',
    currentStop: 'Deo Nagar Garden Square',
    varianceMinutes: 0,
    varianceStatus: 'On-Time',
    skippedStreets: [],
    waypoints: [
      [21.1230, 79.0720],
      [21.1250, 79.0745],
      [21.1270, 79.0770],
      [21.1255, 79.0750],
      [21.1230, 79.0720]
    ]
  },
  {
    id: 'NMC-EV-0107',
    type: 'Hydraulic EV Compactor',
    driver: 'Sanjay G. Kohale',
    phone: '+91 98231 11007',
    zoneId: 'zone-4',
    zoneName: 'Dhantoli',
    routeId: 'RT-DHN-01 (Congress Nagar - Mehadia)',
    status: 'moving',
    speedKmH: 16.5,
    dailyCoverage: 91.8,
    odometerKm: 34.2,
    batteryPercent: 68,
    fuelType: 'Electric 72V',
    loadWeightKg: 2150,
    loadCapacityKg: 3000,
    loadPercent: 71.7,
    safetyScore: 97,
    scheduledStart: '06:00 AM',
    actualStart: '06:04 AM',
    currentStop: 'Mehadia Square Wardha Rd',
    varianceMinutes: 4,
    varianceStatus: 'On-Time (+4m)',
    skippedStreets: [],
    waypoints: [
      [21.1350, 79.0800],
      [21.1375, 79.0830],
      [21.1400, 79.0860],
      [21.1380, 79.0835],
      [21.1350, 79.0800]
    ]
  },
  {
    id: 'NMC-EV-0108',
    type: 'Tipper Micro-Truck',
    driver: 'Ramesh H. Bawankar',
    phone: '+91 98231 11008',
    zoneId: 'zone-3',
    zoneName: 'Hanuman Nagar',
    routeId: 'RT-HMN-01 (Medical Sq - Reshimbagh)',
    status: 'stationary',
    speedKmH: 0.0,
    dailyCoverage: 86.4,
    odometerKm: 29.8,
    batteryPercent: 62,
    fuelType: 'Electric 72V',
    loadWeightKg: 1850,
    loadCapacityKg: 2000,
    loadPercent: 92.5,
    safetyScore: 94,
    scheduledStart: '06:15 AM',
    actualStart: '06:22 AM',
    currentStop: 'Medical Square Secondary Transfer Depot (Offloading)',
    varianceMinutes: 7,
    varianceStatus: 'Transfer Pause (+7m)',
    skippedStreets: [],
    waypoints: [
      [21.1310, 79.0950],
      [21.1335, 79.0980],
      [21.1360, 79.1010],
      [21.1330, 79.0975],
      [21.1310, 79.0950]
    ]
  }
];

export const SKIPPED_STREETS_CATALOG = [
  {
    id: 'SKP-01',
    streetName: 'Khare Town Lane 2 (Behind Law College)',
    wardNumber: 12,
    zoneName: 'Dharampeth',
    reason: 'Construction Road Blockade / Paver Excavation',
    householdsAffected: 48,
    reportedBy: 'Vehicle NMC-EV-0102 Telemetry',
    timestamp: '07:18 AM IST',
    actionStatus: 'Reroute Assigned to Micro-Trolley NMC-TR-0103',
    coords: [21.1455, 79.0665]
  },
  {
    id: 'SKP-02',
    streetName: 'Khamla Sindhi Hindi School Backroad',
    wardNumber: 17,
    zoneName: 'Laxmi Nagar',
    reason: 'Heavy Market Loading Bottleneck',
    householdsAffected: 62,
    reportedBy: 'Vehicle NMC-EV-0105 Telemetry',
    timestamp: '07:42 AM IST',
    actionStatus: 'Pending Secondary Sweep at 11:30 AM',
    coords: [21.1220, 79.0625]
  },
  {
    id: 'SKP-03',
    streetName: 'Tatya Tope Nagar Galli 3',
    wardNumber: 18,
    zoneName: 'Laxmi Nagar',
    reason: 'Mahanagar Gas Pipeline Trench',
    householdsAffected: 35,
    reportedBy: 'Vehicle NMC-EV-0105 Telemetry',
    timestamp: '08:05 AM IST',
    actionStatus: 'Pedestrian Trolley Sweeper Dispatched',
    coords: [21.1245, 79.0580]
  },
  {
    id: 'SKP-04',
    streetName: 'Sitabuldi Cotton Market South Alley',
    wardNumber: 32,
    zoneName: 'Gandhibagh',
    reason: 'Illegal Wholesale Vegetable Truck Parking',
    householdsAffected: 74,
    reportedBy: 'Vehicle NMC-TR-0108 Telemetry',
    timestamp: '08:14 AM IST',
    actionStatus: 'Traffic Police Citation Issued',
    coords: [21.1440, 79.0870]
  }
];

// Generate Top 100 GVP dataset with realistic Nagpur locations
export const GVP_TOP_100 = [
  { rank: 1, id: 'GVP-NGP-001', location: 'Sitabuldi Cotton Market Backgate (Near Railway Siding)', ward: 'Ward 32', zone: 'Gandhibagh', riskScore: 96.4, trend: '+18.2%', trendDir: 'up', predictedWasteKgDay: 1850, lastCleared: '38 mins ago', status: 'Critical Breach', inspector: 'C. P. Agrawal', phone: '+91 98230 44118', lat: 21.1448, lng: 79.0885 },
  { rank: 2, id: 'GVP-NGP-002', location: 'Itwari Grain Mandi & Teen Nal Chowk Corner', ward: 'Ward 33', zone: 'Gandhibagh', riskScore: 94.8, trend: '+14.5%', trendDir: 'up', predictedWasteKgDay: 1620, lastCleared: '1h 15m ago', status: 'Critical Breach', inspector: 'L. N. Gupta', phone: '+91 98230 44119', lat: 21.1520, lng: 79.1090 },
  { rank: 3, id: 'GVP-NGP-003', location: 'Sakkardara Lake South Promenade Footpath', ward: 'Ward 21', zone: 'Hanuman Nagar', riskScore: 93.1, trend: '+11.8%', trendDir: 'up', predictedWasteKgDay: 1410, lastCleared: '2h 10m ago', status: 'Critical Breach', inspector: 'D. C. Gaikwad', phone: '+91 98230 44110', lat: 21.1210, lng: 79.1120 },
  { rank: 4, id: 'GVP-NGP-004', location: 'Teka Naka Flyover Pier #14 Open Plot', ward: 'Ward 44', zone: 'Ashi Nagar', riskScore: 92.5, trend: '+9.4%', trendDir: 'up', predictedWasteKgDay: 1350, lastCleared: '3h 05m ago', status: 'Critical Breach', inspector: 'F. A. Siddiqui', phone: '+91 98230 44127', lat: 21.1820, lng: 79.0980 },
  { rank: 5, id: 'GVP-NGP-005', location: 'Hasanbagh Main Road Nullah Bridge Corner', ward: 'Ward 29', zone: 'Nehru Nagar', riskScore: 91.7, trend: '+8.1%', trendDir: 'up', predictedWasteKgDay: 1280, lastCleared: '1h 45m ago', status: 'Critical Breach', inspector: 'I. K. Khan', phone: '+91 98230 44116', lat: 21.1250, lng: 79.1290 },
  { rank: 6, id: 'GVP-NGP-006', location: 'Medical Square Blood Bank Wall Perimeter', ward: 'Ward 20', zone: 'Hanuman Nagar', riskScore: 89.9, trend: '-3.2%', trendDir: 'down', predictedWasteKgDay: 1190, lastCleared: '45 mins ago', status: 'High Risk', inspector: 'K. L. Raut', phone: '+91 98230 44109', lat: 21.1340, lng: 79.0990 },
  { rank: 7, id: 'GVP-NGP-007', location: 'Khamla Vegetable Market North Waste Sump', ward: 'Ward 17', zone: 'Laxmi Nagar', riskScore: 88.6, trend: '+6.4%', trendDir: 'up', predictedWasteKgDay: 1120, lastCleared: '2h 30m ago', status: 'High Risk', inspector: 'R. B. Meshram', phone: '+91 98230 44106', lat: 21.1215, lng: 79.0620 },
  { rank: 8, id: 'GVP-NGP-008', location: 'Traffic Park Backgate (Shivaji Nagar Corner)', ward: 'Ward 14', zone: 'Dharampeth', riskScore: 87.4, trend: '-6.5%', trendDir: 'down', predictedWasteKgDay: 980, lastCleared: '50 mins ago', status: 'High Risk', inspector: 'P. R. Thakre', phone: '+91 98230 44103', lat: 21.1470, lng: 79.0780 },
  { rank: 9, id: 'GVP-NGP-009', location: 'Golibar Chowk Hansapuri Market Siding', ward: 'Ward 36', zone: 'Satranjipura', riskScore: 86.8, trend: '+4.3%', trendDir: 'up', predictedWasteKgDay: 1040, lastCleared: '3h 15m ago', status: 'High Risk', inspector: 'K. R. Tiwari', phone: '+91 98230 44121', lat: 21.1570, lng: 79.1020 },
  { rank: 10, id: 'GVP-NGP-010', location: 'Lakadganj Garoba Maidan South Gate', ward: 'Ward 40', zone: 'Lakadganj', riskScore: 85.9, trend: '-2.1%', trendDir: 'down', predictedWasteKgDay: 920, lastCleared: '1h 20m ago', status: 'High Risk', inspector: 'P. S. Sonwane', phone: '+91 98230 44124', lat: 21.1480, lng: 79.1240 },
  { rank: 11, id: 'GVP-NGP-011', location: 'Gandhisagar Lake West Embankment Road', ward: 'Ward 34', zone: 'Gandhibagh', riskScore: 84.5, trend: '-4.8%', trendDir: 'down', predictedWasteKgDay: 880, lastCleared: '1h 05m ago', status: 'Monitored', inspector: 'S. S. Bhoyar', phone: '+91 98230 44120', lat: 21.1420, lng: 79.0940 },
  { rank: 12, id: 'GVP-NGP-012', location: 'Jaripatka Ring Road Canal Junction', ward: 'Ward 48', zone: 'Mangalwari', riskScore: 83.2, trend: '+2.9%', trendDir: 'up', predictedWasteKgDay: 840, lastCleared: '2h 45m ago', status: 'Monitored', inspector: 'J. K. Chawla', phone: '+91 98230 44129', lat: 21.1760, lng: 79.0820 },
  { rank: 13, id: 'GVP-NGP-013', location: 'Dhantoli Garden East Wall (Near Mehadia)', ward: 'Ward 24', zone: 'Dhantoli', riskScore: 81.0, trend: '-7.2%', trendDir: 'down', predictedWasteKgDay: 760, lastCleared: '40 mins ago', status: 'Monitored', inspector: 'A. P. Mohod', phone: '+91 98230 44112', lat: 21.1360, lng: 79.0820 },
  { rank: 14, id: 'GVP-NGP-014', location: 'Panchpaoli Bridge Underpass East Bay', ward: 'Ward 45', zone: 'Ashi Nagar', riskScore: 80.4, trend: '+1.8%', trendDir: 'up', predictedWasteKgDay: 790, lastCleared: '3h 30m ago', status: 'Monitored', inspector: 'S. N. Ramteke', phone: '+91 98230 44128', lat: 21.1640, lng: 79.1080 },
  { rank: 15, id: 'GVP-NGP-015', location: 'Nandanvan KDK College Canal Bend', ward: 'Ward 28', zone: 'Nehru Nagar', riskScore: 78.6, trend: '-3.9%', trendDir: 'down', predictedWasteKgDay: 710, lastCleared: '1h 50m ago', status: 'Monitored', inspector: 'U. B. Shinde', phone: '+91 98230 44115', lat: 21.1300, lng: 79.1340 },
  { rank: 16, id: 'GVP-NGP-016', location: 'Reshimbagh Ground North Perimeter Fence', ward: 'Ward 20', zone: 'Hanuman Nagar', riskScore: 77.2, trend: '-5.1%', trendDir: 'down', predictedWasteKgDay: 680, lastCleared: '1h 10m ago', status: 'Monitored', inspector: 'K. L. Raut', phone: '+91 98230 44109', lat: 21.1290, lng: 79.1020 },
  { rank: 17, id: 'GVP-NGP-017', location: 'Gokulpeth Market Vegetable Platform', ward: 'Ward 13', zone: 'Dharampeth', riskScore: 75.8, trend: '-8.6%', trendDir: 'down', predictedWasteKgDay: 620, lastCleared: '25 mins ago', status: 'Monitored', inspector: 'M. V. Joshi', phone: '+91 98230 44102', lat: 21.1440, lng: 79.0680 },
  { rank: 18, id: 'GVP-NGP-018', location: 'Trimurti Nagar Square Auto Stand Corner', ward: 'Ward 19', zone: 'Laxmi Nagar', riskScore: 74.3, trend: '-6.4%', trendDir: 'down', predictedWasteKgDay: 590, lastCleared: '35 mins ago', status: 'Monitored', inspector: 'N. T. Bhende', phone: '+91 98230 44108', lat: 21.1180, lng: 79.0510 },
  { rank: 19, id: 'GVP-NGP-019', location: 'Sadar Residency Road Old Octroi Post', ward: 'Ward 49', zone: 'Mangalwari', riskScore: 72.9, trend: '-4.2%', trendDir: 'down', predictedWasteKgDay: 540, lastCleared: '55 mins ago', status: 'Monitored', inspector: 'V. R. Dixit', phone: '+91 98230 44130', lat: 21.1610, lng: 79.0780 },
  { rank: 20, id: 'GVP-NGP-020', location: 'Bagadganj Small Factory Area Lane #5', ward: 'Ward 41', zone: 'Lakadganj', riskScore: 71.5, trend: '+3.1%', trendDir: 'up', predictedWasteKgDay: 580, lastCleared: '4h 00m ago', status: 'Monitored', inspector: 'A. T. Borikar', phone: '+91 98230 44125', lat: 21.1460, lng: 79.1310 }
];

// Dynamically generate remaining up to 100 GVP points with rich realistic entries
const nagpurLocalities = [
  'Futala Lake Chowpatty West', 'Mahal Gandhi Gate Siding', 'Dharampeth Coffee House Lane', 'Laxmi Nagar Water Tank Sump',
  'VNIT North Campus Boundary', 'Deo Nagar Ring Road Culvert', 'Pratap Nagar Orange City Hospital Alley', 'Ayodhya Nagar Bus Terminus',
  'Raghuji Nagar Hospital Compound', 'Rahate Colony Wardha Rd Crossing', 'Congress Nagar Railway Foot Overbridge', 'Dighori Toll Naka Junction',
  'Tajbagh Dargah Gate 3', 'Maskasath Cloth Market Lane', 'Nal Saheb Chowk Meat Market', 'Bhandewadi Dump Yard Boundary Wall',
  'Small Factory Area Substation Corner', 'Lashkaribagh Tanneries Lane', 'Kamal Chowk Wholesale Depot', 'Chaoni Army Cantonment Outer Wall',
  'Mankapur Sports Complex Gate 4', 'Kadbi Chowk Central Avenue', 'Dosar Vaishya Bhavan Crossing', 'Mayo Hospital Mortuary Gate Road',
  'Super Speciality Hospital Backlane', 'Ganeshpeth Central Bus Station Bay', 'Empress Mall Back Canal Wall', 'Subhash Nagar Metro Station Underpass',
  'Bansi Nagar Metro Pillar #48', 'Lokmat Square North Alley', 'Chhatrapati Square Ring Road Flyover', 'Manewada Besa Road Chowk',
  'Omkar Nagar Power House', 'Somalwada Old Airport Perimeter', 'Ujjwal Nagar Railway Crossing', 'Khamla Sindhi Colony Galli 4',
  'Surendra Nagar Telephone Exchange', 'Friends Colony Katol Road', 'Gorewada Zoo Link Road', 'Borgaon Meghe Smruti Nagar',
  'Seminary Hills Forest Nursery Wall', 'Ravinagar CPWD Quarters Gate', 'Telangkhedi Hanuman Temple Road', 'Ambazari Garden Spillway Corner',
  'Baji Prabhu Nagar Park Boundary', 'Hill Top Ramnagar Road', 'Gitti Khadan Stone Crusher Junction', 'Zingabai Takli Gorewada Road',
  'Koradi Naka Godhni Road', 'Indora 10 No. Pulia North'
];

for (let i = 21; i <= 100; i++) {
  const locIndex = (i - 21) % nagpurLocalities.length;
  const zoneIndex = (i % 10) + 1;
  const zoneObj = NMC_ZONES.find(z => z.id === `zone-${zoneIndex}`) || NMC_ZONES[1];
  const risk = Math.max(38, Math.round((90 - (i * 0.55) + (Math.sin(i) * 6)) * 10) / 10);
  const trendDir = i % 3 === 0 ? 'up' : 'down';
  const trendVal = ((i * 13) % 15 + 1.2).toFixed(1);
  const wasteKg = Math.round(1200 * (risk / 100) + (i % 7) * 25);
  const clearedMins = (i * 7) % 240 + 15;
  const status = risk >= 85 ? 'Critical Breach' : risk >= 70 ? 'High Risk' : risk >= 55 ? 'Monitored' : 'Low Risk';

  GVP_TOP_100.push({
    rank: i,
    id: `GVP-NGP-${String(i).padStart(3, '0')}`,
    location: `${nagpurLocalities[locIndex]} (Point #${i})`,
    ward: `Ward ${10 + (i % 40)}`,
    zone: zoneObj.name.replace('Zone ' + zoneIndex + ': ', '').split(' (')[0],
    riskScore: risk,
    trend: `${trendDir === 'up' ? '+' : '-'}${trendVal}%`,
    trendDir: trendDir,
    predictedWasteKgDay: wasteKg,
    lastCleared: clearedMins > 60 ? `${Math.floor(clearedMins / 60)}h ${clearedMins % 60}m ago` : `${clearedMins} mins ago`,
    status: status,
    inspector: `Sanitary Inspector W-${10 + (i % 40)}`,
    phone: `+91 98230 ${44100 + i}`,
    lat: 21.1400 + ((i % 10) - 5) * 0.008 + (Math.cos(i) * 0.004),
    lng: 79.0800 + ((i % 10) - 5) * 0.009 + (Math.sin(i) * 0.005)
  });
}

export const SWACHH_SURVEKSHAN_AUDIT_DATA = {
  cycle: 'Swachh Survekshan 2026',
  corporation: 'Nagpur Municipal Corporation (NMC), Maharashtra',
  nodalOfficer: 'Dr. Gajendra S. Mahalle (Deputy Municipal Commissioner - SWM)',
  auditWindow: 'August 2026 Monthly Compliance Verification',
  overallCityScore: 88.4,
  starRatingTarget: '7-Star Garbage Free City (GFC)',
  metrics: [
    { indicator: 'Door-to-Door Segregated Collection at Source', target: '100%', achieved: '94.6%', marksMax: 1200, marksEarned: 1135, status: 'Compliant' },
    { indicator: 'Segregation Scoring Accuracy (AI Validated)', target: '85.0%', achieved: '92.4%', marksMax: 1000, marksEarned: 960, status: 'Exemplary' },
    { indicator: 'GVP Elimination & Rapid Clearance Adherence', target: '90.0%', achieved: '86.2%', marksMax: 1000, marksEarned: 862, status: 'Compliant' },
    { indicator: 'GPS Fleet Tracking & Route-Adherence Rate', target: '95.0%', achieved: '94.8%', marksMax: 800, marksEarned: 798, status: 'Exemplary' },
    { indicator: 'C&D and Biomedical Hazardous Waste Protocol', target: '100%', achieved: '98.1%', marksMax: 600, marksEarned: 588, status: 'Exemplary' },
    { indicator: 'Citizen Grievance Resolution (Swachhata App)', target: '95.0%', achieved: '93.5%', marksMax: 900, marksEarned: 841, status: 'Compliant' }
  ],
  totalMarksMax: 5500,
  totalMarksEarned: 5184,
  percentage: 94.25
};

export const SIMULATION_EVENTS = [
  { time: '00:01', type: 'fleet', title: 'Route Milestone', desc: 'EV Compactor NMC-EV-0104 completed VNIT sector with 97.4% adherence.' },
  { time: '00:02', type: 'ai', title: 'AI Classification', desc: 'Dharampeth MRF line flagged 96.4% wet waste purity in morning batch.' },
  { time: '00:03', type: 'gvp', title: 'GVP Surge Alert', desc: 'Risk surge detected at Sitabuldi Cotton Market (96.4 Index). Notification sent.' },
  { time: '00:04', type: 'route', title: 'Skipped Street Reroute', desc: 'Auto-dispatch assigned backup micro-trolley to Khare Town Lane 2.' },
  { time: '00:05', type: 'survekshan', title: 'Survekshan Benchmark', desc: 'Laxmi Nagar Zone achieved 94.6% source segregation benchmark.' }
];
