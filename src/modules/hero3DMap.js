import * as THREE from 'three';

export function initHero3DMap(containerId = 'hero-3d-map-container') {
  const container = document.getElementById(containerId);
  if (!container) return;

  // Clear previous contents if re-initialized
  container.innerHTML = '';

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  // Ambient fog matching vibrant light background translucency
  scene.fog = new THREE.FogExp2(0xf8fafc, 0.015);

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || 500;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 45, 65);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  container.appendChild(renderer.domElement);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0x3b82f6, 1.5);
  dirLight.position.set(30, 50, 40);
  dirLight.castShadow = true;
  scene.add(dirLight);

  const pointLightCyan = new THREE.PointLight(0x06b6d4, 3, 100);
  pointLightCyan.position.set(-20, 20, 10);
  scene.add(pointLightCyan);

  const pointLightIndigo = new THREE.PointLight(0x6366f1, 3, 100);
  pointLightIndigo.position.set(20, 25, -10);
  scene.add(pointLightIndigo);

  // 1. Animated 3D City Grid Terrain Base
  const mapGroup = new THREE.Group();
  scene.add(mapGroup);

  const gridSize = 80;
  const gridDivisions = 40;
  const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x3b82f6, 0xcbdeed);
  gridHelper.position.y = -0.1;
  mapGroup.add(gridHelper);

  // 2. Extruded 3D Building Blocks (Nagpur Ward Grid Simulation)
  const buildingsGroup = new THREE.Group();
  mapGroup.add(buildingsGroup);

  const buildingMaterial = new THREE.MeshPhongMaterial({
    color: 0xebf3fa,
    emissive: 0x1d4ed8,
    emissiveIntensity: 0.05,
    specular: 0xffffff,
    shininess: 30,
    transparent: true,
    opacity: 0.85
  });

  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x93c5fd, linewidth: 1.5 });

  // Generate stylized 3D city blocks
  const blockCoords = [];
  for (let x = -32; x <= 32; x += 8) {
    for (let z = -32; z <= 32; z += 8) {
      if (Math.abs(x) < 4 && Math.abs(z) < 4) continue; // Keep central hub clear
      if (Math.random() > 0.3) {
        const bHeight = 2 + Math.random() * 8;
        const geometry = new THREE.BoxGeometry(5.5, bHeight, 5.5);
        const building = new THREE.Mesh(geometry, buildingMaterial);
        building.position.set(x + (Math.random() * 2 - 1), bHeight / 2, z + (Math.random() * 2 - 1));
        building.castShadow = true;
        building.receiveShadow = true;

        // Wireframe edges for tech look
        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(edges, edgeMaterial);
        building.add(line);

        buildingsGroup.add(building);
        blockCoords.push(building.position.clone());
      }
    }
  }

  // 3. Central Municipal Command Hub Node
  const hubGeometry = new THREE.CylinderGeometry(4, 4.8, 1.5, 32);
  const hubMaterial = new THREE.MeshStandardMaterial({
    color: 0x2563eb,
    roughness: 0.2,
    metalness: 0.8,
    emissive: 0x1e40af,
    emissiveIntensity: 0.6
  });
  const hubMesh = new THREE.Mesh(hubGeometry, hubMaterial);
  hubMesh.position.set(0, 0.75, 0);
  mapGroup.add(hubMesh);

  // Pulsing Ring under Hub
  const ringGeo = new THREE.RingGeometry(5.5, 7, 32);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x06b6d4,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.6
  });
  const pulseRing = new THREE.Mesh(ringGeo, ringMat);
  pulseRing.rotation.x = Math.PI / 2;
  pulseRing.position.y = 0.05;
  mapGroup.add(pulseRing);

  // 4. Floating 3D Waypoint Beacons (Nagpur Key Locations: Sitabuldi, Mahal, Dharampeth, Lakadganj)
  const waypoints = [
    { name: 'Dharampeth Zone', pos: new THREE.Vector3(-18, 5, -12), color: 0x06b6d4 },
    { name: 'Mahal Heritage', pos: new THREE.Vector3(18, 5, 14), color: 0x3b82f6 },
    { name: 'Sitabuldi Hub', pos: new THREE.Vector3(-12, 6, 18), color: 0x10b981 },
    { name: 'Lakadganj Ward', pos: new THREE.Vector3(20, 4, -18), color: 0x8b5cf6 },
    { name: 'Mihan Tech Hub', pos: new THREE.Vector3(0, 7, -25), color: 0xf59e0b }
  ];

  const beaconNodes = [];
  waypoints.forEach((wp) => {
    const group = new THREE.Group();
    group.position.copy(wp.pos);

    // Glowing Sphere
    const sphereGeo = new THREE.SphereGeometry(1.2, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: wp.color,
      emissive: wp.color,
      emissiveIntensity: 0.8,
      roughness: 0.1
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(sphere);

    // Vertical Light Beam
    const beamGeo = new THREE.CylinderGeometry(0.1, 0.4, wp.pos.y * 2, 16);
    const beamMat = new THREE.MeshBasicMaterial({
      color: wp.color,
      transparent: true,
      opacity: 0.35
    });
    const beam = new THREE.Mesh(beamGeo, beamMat);
    beam.position.y = -wp.pos.y / 2;
    group.add(beam);

    mapGroup.add(group);
    beaconNodes.push({ group, basePos: wp.pos.clone(), color: wp.color });
  });

  // 5. 3D Animated Curved Transit Arcs (Data Transfer Lines)
  const arcCurves = [];
  const arcParticles = [];

  beaconNodes.forEach((node) => {
    // Curve connecting hub to waypoint
    const start = new THREE.Vector3(0, 1.5, 0);
    const end = node.basePos.clone();
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.y += 12; // Arched height

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineDashedMaterial({
      color: node.color,
      dashSize: 1,
      gapSize: 0.5,
      opacity: 0.6,
      transparent: true
    });

    const line = new THREE.Line(geometry, material);
    line.computeLineDistances();
    mapGroup.add(line);

    // Floating particle moving along curve
    const particleGeo = new THREE.SphereGeometry(0.5, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({ color: node.color });
    const particle = new THREE.Mesh(particleGeo, particleMat);
    mapGroup.add(particle);

    arcParticles.push({ mesh: particle, curve, progress: Math.random() });
  });

  // 6. Animated GPS Municipal Fleet Trucks (Moving 3D Cubes/Pills)
  const trucks = [];
  const truckGeo = new THREE.BoxGeometry(1.6, 0.9, 2.5);
  const truckColors = [0x2563eb, 0x06b6d4, 0x10b981, 0xf59e0b];

  for (let i = 0; i < 8; i++) {
    const color = truckColors[i % truckColors.length];
    const mat = new THREE.MeshStandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: 0.4
    });
    const truck = new THREE.Mesh(truckGeo, mat);
    mapGroup.add(truck);

    const radius = 10 + Math.random() * 22;
    const speed = (0.2 + Math.random() * 0.4) * (Math.random() > 0.5 ? 1 : -1);
    const angleOffset = Math.random() * Math.PI * 2;

    trucks.push({ mesh: truck, radius, speed, angle: angleOffset });
  }

  // 7. Floating Ambient Data Sparks Particle Cloud
  const particleCount = 60;
  const particleGeometry = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleVelocities = [];

  for (let i = 0; i < particleCount; i++) {
    particlePositions[i * 3] = (Math.random() - 0.5) * 70;
    particlePositions[i * 3 + 1] = Math.random() * 25;
    particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 70;

    particleVelocities.push({
      y: 0.04 + Math.random() * 0.07,
      offset: Math.random() * Math.PI * 2
    });
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x3b82f6,
    size: 0.8,
    transparent: true,
    opacity: 0.75
  });

  const particleCloud = new THREE.Points(particleGeometry, particleMaterial);
  mapGroup.add(particleCloud);

  // Mouse Interactivity (Parallax Tilt)
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;

  const onMouseMove = (event) => {
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    mouseX = (x / rect.width) * 2 - 1;
    mouseY = -(y / rect.height) * 2 + 1;
  };

  window.addEventListener('mousemove', onMouseMove);

  // Resize Handler
  const onResize = () => {
    const newW = container.clientWidth || window.innerWidth;
    const newH = container.clientHeight || 500;
    camera.aspect = newW / newH;
    camera.updateProjectionMatrix();
    renderer.setSize(newW, newH);
  };
  window.addEventListener('resize', onResize);

  // Animation Loop
  const startTime = performance.now();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = (performance.now() - startTime) / 1000;

    // Rotate Map Group slightly
    mapGroup.rotation.y = elapsedTime * 0.04;

    // Smooth Mouse Parallax
    targetRotationY = mouseX * 0.15;
    targetRotationX = mouseY * 0.15;
    camera.position.x += (targetRotationY * 30 - camera.position.x) * 0.05;
    camera.position.y += (45 + targetRotationX * 15 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    // Pulse Ring Animation
    const scale = 1 + Math.sin(elapsedTime * 2.5) * 0.15;
    pulseRing.scale.set(scale, scale, scale);
    pulseRing.material.opacity = 0.5 - (scale - 1) * 2;

    // Animate Floating Beacons
    beaconNodes.forEach((node, idx) => {
      node.group.position.y = node.basePos.y + Math.sin(elapsedTime * 2 + idx) * 0.6;
    });

    // Animate Arc Data Particles
    arcParticles.forEach((ap) => {
      ap.progress += 0.006;
      if (ap.progress > 1) ap.progress = 0;
      const pos = ap.curve.getPoint(ap.progress);
      ap.mesh.position.copy(pos);
    });

    // Animate Floating Ambient Data Sparks
    const positions = particleGeometry.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 1] += particleVelocities[i].y;
      if (positions[i * 3 + 1] > 28) {
        positions[i * 3 + 1] = 0;
      }
    }
    particleGeometry.attributes.position.needsUpdate = true;

    // Animate Fleet Trucks
    trucks.forEach((t) => {
      t.angle += t.speed * 0.02;
      t.mesh.position.x = Math.cos(t.angle) * t.radius;
      t.mesh.position.z = Math.sin(t.angle) * t.radius;
      t.mesh.position.y = 0.5;
      t.mesh.rotation.y = -t.angle + (t.speed > 0 ? Math.PI / 2 : -Math.PI / 2);
    });

    renderer.render(scene, camera);
  }

  animate();
}
