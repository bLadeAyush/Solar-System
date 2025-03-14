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

const moonTexture = textureLoader.load("/textures/moon.jpg");

const mercuryMaterial = new THREE.MeshStandardMaterial({ map: mercuryTexture });

const venusMaterial = new THREE.MeshStandardMaterial({ map: venusTexture });

const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });

const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });

const marsMaterial = new THREE.MeshStandardMaterial({ map: marsTexture });

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
  color: 0xffaa00, // Orange glow
});

const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);

scene.add(sun);

const planets = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
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
console.log(planetMeshes);
const pointLight = new THREE.PointLight(0xffffff, 1000, 500);

scene.add(pointLight);

const AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(AmbientLight);

const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
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
controls.maxDistance = 200;
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
