import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Base
 */
// Canvas
const canvas = document.getElementById("canvas");

// Scene
const scene = new THREE.Scene();

// Axes helper
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Resources
const resources = [];

const loadResources = () => {
  return new Promise((resolve) => {
    const loader = new GLTFLoader();

    loader.load("/src/assets/models/Cube.glb", (gltf) => {
      resources.push(gltf);
      resolve();
    });
  });
};

await loadResources();

const cube = resources[0].scene;

// cube.position.copy(new THREE.Vector3(4, 0, 0));
cube.position.set(0, 0, 0);
cube.scale.set(3, 3, 3);
cube.receiveShadow = false;
cube.castShadow = false;
// console.log(cube.position)

console.log(cube);
scene.add(cube);

/**
 * Base + Box
 */
// const cube = new THREE.BoxGeometry(1, 1, 1);
// const cubeMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
// cubeMat.roughness = 0.4;
// const cubeMesh = new THREE.Mesh(cube, cubeMat);
// cubeMesh.castShadow = true;
// scene.add(cubeMesh);

// const base = new THREE.PlaneGeometry(5, 5);
// const baseMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
// baseMat.roughness = 0.4;
// const baseMesh = new THREE.Mesh(base, baseMat);
// baseMesh.receiveShadow = true;
// baseMesh.translateY(-1.0);
// baseMesh.rotateX(-Math.PI / 2);

// scene.add(baseMesh);

/**
 * Sizes
 */
const sizes = {
  width: 1024,
  height: 510,
};

/**
 * lights
 */

const lights = [];

// lights[0] = new THREE.PointLight({ color: 0xffffff }, 5);
// lights[0].position.set(-2, 1, 4);
// // lights[0].castShadow = true;
// // lights[0].shadow.mapSize.width = 1024;
// // lights[0].shadow.mapSize.height = 510;
// // lights[0].shadow.radius = 5;
// scene.add(lights[0]);
//
// lights[1] = new THREE.PointLight({ color: 0xffffff }, 3);
// lights[1].position.set(3, -1, 3);
// // lights[1].castShadow = true;
// // lights[1].shadow.mapSize.width = 1024;
// // lights[1].shadow.mapSize.height = 510;
// // lights[1].shadow.radius = 5;
// scene.add(lights[1]);
//
// lights[2] = new THREE.PointLight({ color: 0xffffff }, 3);
// lights[2].position.set(3, 1, 3);
// // lights[2].castShadow = true;
// // lights[2].shadow.mapSize.width = 1024;
// // lights[2].shadow.mapSize.height = 510;
// // lights[2].shadow.radius = 5;
// scene.add(lights[2]);

// left
lights[0] = new THREE.PointLight({ color: 0xffffff }, 3);
lights[0].position.set(-4, 0, 3);
scene.add(lights[0]);

// right
lights[1] = new THREE.PointLight({ color: 0xffffff }, 2);
lights[1].position.set(4, 0, 3);
scene.add(lights[1]);

// Top
lights[2] = new THREE.PointLight({ color: 0xffffff }, 2);
lights[2].position.set(0, 4, 3);
scene.add(lights[2]);

// Bottom
lights[3] = new THREE.PointLight({ color: 0xffffff }, 2);
lights[3].position.set(0, -4, 3);
scene.add(lights[3]);

/**
 * Camera
 */
const camFactor = 0.005;
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
const camera = new THREE.OrthographicCamera(
  -sizes.width * camFactor,
  sizes.width * camFactor,
  sizes.height * camFactor,
  -sizes.height * camFactor
);
camera.position.x = 0;
camera.position.z = 5;
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(sizes.width, sizes.height);
// renderer.shadowMap.enabled = true;
// renderer.setClearColor("0xffffff");

/**
 * Animate
 */

// renderer.render(scene, camera);

const tick = () => {
  cube.rotateX(0.01);
  cube.rotateY(0.01);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
