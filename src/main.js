import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { cubeTexture } from "three/tsl";
import { Pane } from "tweakpane";

const pane = new Pane();

const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath("/textures/cube/");

const sunTexture = textureLoader.load("../textures/sun.jpg");
const mercuryTexture = textureLoader.load("/textures/mercury.jpg");
const venusTexture = textureLoader.load("/textures/venus.jpg");
const earthTexture = textureLoader.load("/textures/earth.jpg");
const marsTexture = textureLoader.load("/textures/mars.jpg");
const jupiterTexture = textureLoader.load("/textures/jupiter.jpg");
const saturnTexture = textureLoader.load("/textures/saturn.jpg");
const uranusTexture = textureLoader.load("/textures/uranus.jpg");
const neptuneTexture = textureLoader.load("/textures/neptune.jpg");
const saturnRingTexture = textureLoader.load("/textures/saturn-ring.png");
const astroidTexture = textureLoader.load("/textures/astroid.jpg");

const moonTexture = textureLoader.load("/textures/moon.jpg");

const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture });

const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });

const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });

const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });

const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });

const jupiterMaterial = new THREE.MeshStandardMaterial({
  map: jupiterTexture,
});

const saturnMaterial = new THREE.MeshStandardMaterial({
  map: saturnTexture,
});

const uranusMaterial = new THREE.MeshStandardMaterial({
  map: uranusTexture,
});

const neptuneMaterial = new THREE.MeshStandardMaterial({
  map: neptuneTexture,
});

const astroidMaterial = new THREE.MeshStandardMaterial({
  map: astroidTexture,
});

const background = cubeTextureLoader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);
scene.background = background;

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshStandardMaterial({
  map: sunTexture,
});

const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(8);

scene.add(sun);

const planets = [
  {
    name: "Mercury",
    radius: 0.38,
    distance: 13,
    speed: 0.02,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.95,
    distance: 16,
    speed: 0.015,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 23,
    speed: 0.01,
    material: earthMaterial,
    moons: [{ name: "Moon", radius: 0.27, distance: 3.5, speed: 0.02 }],
  },
  {
    name: "Mars",
    radius: 0.53,
    distance: 35,
    speed: 0.008,
    material: marsMaterial,
    moons: [
      { name: "Phobos", radius: 0.06, distance: 2.5, speed: 0.03 },
      { name: "Deimos", radius: 0.03, distance: 4, speed: 0.025 },
    ],
  },
  {
    name: "Jupiter",
    radius: 5,
    distance: 150,
    speed: 0.0025,
    material: jupiterMaterial,
    moons: [
      { name: "Io", radius: 0.28, distance: 2, speed: 0.022 },
      { name: "Europa", radius: 0.25, distance: 5, speed: 0.02 },
      { name: "Ganymede", radius: 0.41, distance: 7, speed: 0.018 },
      { name: "Callisto", radius: 0.38, distance: 8, speed: 0.016 },
    ],
  },
  {
    name: "Saturn",
    radius: 4.57,
    distance: 195,
    speed: 0.0018,
    material: saturnMaterial,
    moons: [
      { name: "Titan", radius: 0.4, distance: 18, speed: 0.014 },
      { name: "Rhea", radius: 0.12, distance: 22, speed: 0.012 },
    ],
  },
  {
    name: "Uranus",
    radius: 2.8,
    distance: 390,
    speed: 0.0012,
    material: uranusMaterial,
    moons: [
      { name: "Titania", radius: 0.09, distance: 10, speed: 0.01 },
      { name: "Oberon", radius: 0.08, distance: 12, speed: 0.009 },
    ],
  },
  {
    name: "Neptune",
    radius: 2.7,
    distance: 510,
    speed: 0.0008,
    material: neptuneMaterial,
    moons: [{ name: "Triton", radius: 0.21, distance: 16, speed: 0.007 }],
  },
];

const planetMeshes = planets.map((planet) => {
  const mesh = new THREE.Mesh(sphereGeometry, planet.material);
  mesh.scale.setScalar(planet.radius);
  mesh.position.set(planet.distance, 0, 0);
  scene.add(mesh);
  planet.moons.forEach((moon) => {
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.setScalar(moon.radius);
    moonMesh.position.set(moon.distance, 0, 0);
    mesh.add(moonMesh);
  });
  return mesh;
});
const asteroidGeometry = new THREE.SphereGeometry(1, 6, 6);
const asteroidMaterial = new THREE.MeshStandardMaterial({
  map: astroidTexture,
});

for (let i = 0; i < 500; i++) {
  const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);
  const distance = THREE.MathUtils.randFloat(50, 90);
  const angle = Math.random() * Math.PI * 2;
  asteroid.position.set(
    distance * Math.cos(angle),
    THREE.MathUtils.randFloat(-10, 10),
    distance * Math.sin(angle)
  );
  asteroid.scale.setScalar(Math.random() * 0.5);
  scene.add(asteroid);
}
console.log(planetMeshes);
const pointLight = new THREE.PointLight(0xffffff, 2000, 1000);

scene.add(pointLight);

const AmbientLight = new THREE.AmbientLight(0xffffff);

scene.add(AmbientLight);

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  1200
);
camera.position.z = 100;
camera.position.y = 5;

const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
scene.add(camera);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 1000;
controls.minDistance = 20;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const renderloop = () => {
  planetMeshes.forEach((planet, index) => {
    planet.rotation.y += planets[index].speed;
    planet.position.x = planets[index].distance * Math.cos(planet.rotation.y);
    planet.position.z = planets[index].distance * Math.sin(planet.rotation.y);
    planet.children.forEach((moon, moonIndex) => {
      moon.rotation.y += planets[index].moons[moonIndex].speed;
      moon.position.x =
        planets[index].moons[moonIndex].distance * Math.cos(moon.rotation.y);
      moon.position.z =
        planets[index].moons[moonIndex].distance * Math.sin(moon.rotation.y);
    });
  });
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
