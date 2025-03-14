import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";

const pane = new Pane();

const scene = new THREE.Scene();

const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: "yellow" });
const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);

const earthMaterial = new THREE.MeshBasicMaterial({ color: "blue" });
const earth = new THREE.Mesh(sphereGeometry, earthMaterial);
earth.position.x = 10;

const moonMaterial = new THREE.MeshBasicMaterial({ color: "gray" });
const moon = new THREE.Mesh(sphereGeometry, moonMaterial);
moon.position.x = 2;
moon.scale.setScalar(0.3);
earth.add(moon);

scene.add(earth);

scene.add(sun);

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
  earth.rotation.y += 0.01;
  sun.rotation.y += 0.005;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
