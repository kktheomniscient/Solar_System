import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

let isPaused = false;

const keys = {
  a: false,
  d: false,
  w: false,
  s: false,
  space: false,
  shift: false
};

let speedMultipliers = {
  mercury: 100,
  venus: 100,
  earth: 100,
  mars: 100,
  jupiter: 100,
  saturn: 100,
  uranus: 100,
  neptune: 100,
  moon: 100
};

let speeds = {
  mercury: 0.004,
  venus: 0.0035,
  earth: 0.003,
  mars: 0.0025,
  jupiter: 0.002,
  saturn: 0.0015,
  uranus: 0.00125,
  neptune: 0.001,
  moon: 0.02
};

let rotationSpeeds = {
  mercury: 0.0029,
  venus: -0.0007,  
  earth: 0.007,
  mars: 0.007,
  jupiter: 0.045,
  saturn: 0.036,
  uranus: 0.017,
  neptune: 0.017,
  moon: 0.0007
};

let rotationMultipliers = {
  mercury: 10,
  venus: 10,
  earth: 10,
  mars: 10,
  jupiter: 10,
  saturn: 10,
  uranus: 10,
  neptune: 10,
  moon: 10
};

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 200, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#solar_system')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

window.addEventListener('keydown', (e) => {
  switch (e.key.toLowerCase()) {
    case 'a': keys.a = true; break;
    case 'd': keys.d = true; break;
    case 'w': keys.w = true; break;
    case 's': keys.s = true; break;
    case ' ': keys.space = true; break; 
    case 'shift': keys.shift = true; break;
  }
});

window.addEventListener('keyup', (e) => {
  switch (e.key.toLowerCase()) {
    case 'a': keys.a = false; break;
    case 'd': keys.d = false; break;
    case 'w': keys.w = false; break;
    case 's': keys.s = false; break;
    case ' ': keys.space = false; break; 
    case 'shift': keys.shift = false; break;
  }
});

document.getElementById('planet-select').addEventListener('change', (e) => {
  const planet = e.target.value;
  document.getElementById('speed-control').value = speedMultipliers[planet];
});

document.getElementById('speed-control').addEventListener('input', (e) => {
  const planet = document.getElementById('planet-select').value;
  const multiplier = parseFloat(e.target.value);
  speedMultipliers[planet] = multiplier;
});

document.getElementById('rotation-planet-select').addEventListener('change', (e) => {
  const planet = e.target.value;
  document.getElementById('rotation-speed-control').value = rotationMultipliers[planet];
});

document.getElementById('rotation-speed-control').addEventListener('input', (e) => {
  const planet = document.getElementById('rotation-planet-select').value;
  const multiplier = parseFloat(e.target.value);
  rotationMultipliers[planet] = multiplier;
});

document.querySelector('#pauser').addEventListener('click', () => {
  isPaused = !isPaused;
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

const spaceTexture = new THREE.TextureLoader().load('stars_milky_way.jpg');
scene.background = spaceTexture;

//sun
const sunTexture = new THREE.TextureLoader().load('sun.jpg');
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(20, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    emissive: 0xffff00,      
    emissiveIntensity: 1,    
    emissiveMap: sunTexture
  })
);
scene.add(sun);

//mercury
const mercuryTexture = new THREE.TextureLoader().load('mercury.jpg');
const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({
    map: mercuryTexture
  })
);
mercury.position.set(35, 0, 0);
scene.add(mercury);

//venus
const venusTexture = new THREE.TextureLoader().load('venus.jpg');
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(5.7, 32, 32), 
  new THREE.MeshStandardMaterial({
    map: venusTexture
  })
);
venus.position.set(52, 0, 0); 
scene.add(venus);

//earth
const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const earthNormal = new THREE.TextureLoader().load('earth_normal.jpg');
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(6, 32, 32), 
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthNormal
  })
);
//moon
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const moonNormal = new THREE.TextureLoader().load('moon_normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1.6, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonNormal,
    normalScale: new THREE.Vector2(0.5, 0.5), 
    roughness: 0.8,  
    metalness: 0.2
  })
);

const earthSystem = new THREE.Group();
scene.add(earthSystem);

earthSystem.add(earth);
earth.position.set(0, 0, 0);

const moonSystem = new THREE.Group();
earthSystem.add(moonSystem);
moonSystem.add(moon);
moon.position.set(12, 0, 0);

earthSystem.position.set(75, 0, 0);

//mars
const marsTexture = new THREE.TextureLoader().load('mars.jpg');
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(5.2, 32, 32), 
  new THREE.MeshStandardMaterial({
    map: marsTexture
  })
);
mars.position.set(105, 0, 0); 
scene.add(mars);

//jupiter
const jupiterTexture = new THREE.TextureLoader().load('jupiter.jpg');
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(12, 32, 32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture
  })
);
jupiter.position.set(170, 0, 0); 
scene.add(jupiter);

//saturn
const saturnTexture = new THREE.TextureLoader().load('saturn.jpg');
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32), 
  new THREE.MeshStandardMaterial({
    map: saturnTexture
  })
);

//saturn ring
const ringTexture = new THREE.TextureLoader().load('saturn_ring.jpg');
ringTexture.wrapS = THREE.RepeatWrapping;
ringTexture.repeat.x = 2; 

const ringGeometry = new THREE.TorusGeometry(25, 6, 2, 180); 

const uvs = ringGeometry.attributes.uv;
for (let i = 0; i < uvs.count; i++) {
  const u = uvs.getX(i);
  const v = uvs.getY(i);
  uvs.setXY(i, v, u);
}
const ringMaterial = new THREE.MeshStandardMaterial({
  map: ringTexture,
  transparent: true,
  opacity: 0.8
});

const ring = new THREE.Mesh(ringGeometry, ringMaterial);

ring.rotation.x = Math.PI / 2;

const saturnSystem = new THREE.Group();
saturnSystem.add(saturn);
saturnSystem.add(ring);
scene.add(saturnSystem);
saturnSystem.position.set(240, 0, 0);

//uranus
const uranusTexture = new THREE.TextureLoader().load('uranus.jpg');
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(7.5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: uranusTexture
  })
);
uranus.position.set(280, 0, 0); 
scene.add(uranus);

//neptune
const neptuneTexture = new THREE.TextureLoader().load('neptune.jpg');
const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(7, 32, 32), 
  new THREE.MeshStandardMaterial({
    map: neptuneTexture
  })
);
neptune.position.set(320, 0, 0); 
scene.add(neptune);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

function createOrbitRing(radius) {
  const orbitGeometry = new THREE.RingGeometry(radius, radius + 0.5, 128);
  const orbitMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    opacity: 0.3,
    transparent: true
  });
  const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
  orbit.rotation.x = Math.PI / 2; // Make it horizontal
  return orbit;
}

const mercuryOrbit = createOrbitRing(35);
const venusOrbit = createOrbitRing(52);
const earthOrbit = createOrbitRing(75);
const marsOrbit = createOrbitRing(105);
const jupiterOrbit = createOrbitRing(170);
const saturnOrbit = createOrbitRing(240);
const uranusOrbit = createOrbitRing(280);
const neptuneOrbit = createOrbitRing(320);

// Add orbits to scene
scene.add(mercuryOrbit);
scene.add(venusOrbit);
scene.add(earthOrbit);
scene.add(marsOrbit);
scene.add(jupiterOrbit);
scene.add(saturnOrbit);
scene.add(uranusOrbit);
scene.add(neptuneOrbit);

const moonOrbitRadius = 12;
const moonOrbit = createOrbitRing(moonOrbitRadius);
moonOrbit.position.set(75, 0, 0); 
scene.add(moonOrbit);

const particlesGeometry = new THREE.BufferGeometry(); 
const particlesCount = 15000;

const vertices = new Float32Array(particlesCount);

for (let i = 0; i < particlesCount; i++) {
  vertices[i] = (Math.random() - 0.5) * 1000; 
}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(vertices, 3) 
);

// Texture
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('star.png'); 

// Material
const particlesMaterial = new THREE.PointsMaterial({
  map: particleTexture, 
  size: 0.5, 
  sizeAttenuation: true, 
});

const stars = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(stars);

let simulationTime = Math.random() * 1000;

function animate() {
  requestAnimationFrame(animate);

  if (!isPaused) {
    simulationTime += 0.01

    // Mercury orbit
    mercury.position.x = Math.cos(simulationTime * speeds.mercury * speedMultipliers.mercury) * 35;
    mercury.position.z = Math.sin(simulationTime * speeds.mercury * speedMultipliers.mercury) * 35;

    // Venus orbit
    venus.position.x = Math.cos(simulationTime * speeds.venus * speedMultipliers.venus) * 52;
    venus.position.z = Math.sin(simulationTime * speeds.venus * speedMultipliers.venus) * 52;

    // Earth orbit
    earthSystem.position.x = Math.cos(simulationTime * speeds.earth * speedMultipliers.earth) * 75;
    earthSystem.position.z = Math.sin(simulationTime * speeds.earth * speedMultipliers.earth) * 75;

    // Moon rotation 
    moonSystem.rotation.y = simulationTime * speeds.moon * speedMultipliers.moon;

    // Moon orbit
    moonOrbit.position.copy(earthSystem.position);

    // Mars orbit
    mars.position.x = Math.cos(simulationTime * speeds.mars * speedMultipliers.mars) * 105;
    mars.position.z = Math.sin(simulationTime * speeds.mars * speedMultipliers.mars) * 105;

    // Jupiter orbit
    jupiter.position.x = Math.cos(simulationTime * speeds.jupiter * speedMultipliers.jupiter) * 170;
    jupiter.position.z = Math.sin(simulationTime * speeds.jupiter * speedMultipliers.jupiter) * 170;

    // Saturn system orbit
    saturnSystem.position.x = Math.cos(simulationTime * speeds.saturn * speedMultipliers.saturn) * 240;
    saturnSystem.position.z = Math.sin(simulationTime * speeds.saturn * speedMultipliers.saturn) * 240;

    // Uranus orbit
    uranus.position.x = Math.cos(simulationTime * speeds.uranus * speedMultipliers.uranus) * 280;
    uranus.position.z = Math.sin(simulationTime * speeds.uranus * speedMultipliers.uranus) * 280;

    // Neptune orbit
    neptune.position.x = Math.cos(simulationTime * speeds.neptune * speedMultipliers.neptune) * 320;
    neptune.position.z = Math.sin(simulationTime * speeds.neptune * speedMultipliers.neptune) * 320;

    // planet rotations
    mercury.rotation.y += rotationSpeeds.mercury * rotationMultipliers.mercury;
    venus.rotation.y += rotationSpeeds.venus * rotationMultipliers.venus;
    earth.rotation.y += rotationSpeeds.earth * rotationMultipliers.earth;
    mars.rotation.y += rotationSpeeds.mars * rotationMultipliers.mars;
    jupiter.rotation.y += rotationSpeeds.jupiter * rotationMultipliers.jupiter;
    saturn.rotation.y += rotationSpeeds.saturn * rotationMultipliers.saturn;
    uranus.rotation.y += rotationSpeeds.uranus * rotationMultipliers.uranus;
    neptune.rotation.y += rotationSpeeds.neptune * rotationMultipliers.neptune;
    moon.rotation.y += rotationSpeeds.moon * rotationMultipliers.moon;

    stars.rotation.y += -0.0001;
  }

  const moveSpeed = 1.0;
  if (keys.a) camera.position.x -= moveSpeed;
  if (keys.d) camera.position.x += moveSpeed;
  if (keys.w) camera.position.z += moveSpeed; 
  if (keys.s) camera.position.z -= moveSpeed; 
  if (keys.space) camera.position.y += moveSpeed; 
  if (keys.shift) camera.position.y -= moveSpeed;

  directionalLight.position.copy(camera.position);
  directionalLight.position.add(new THREE.Vector3(5, 5, 5));

  controls.update();

  renderer.clear();
  renderer.render(scene, camera);
}

animate()