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

// cube.scale.set(3, 3, 3);
const bbox = new THREE.Box3().setFromObject(cube);
console.log(bbox);
const size = bbox.getSize(new THREE.Vector3());
console.log(size);

cube.position.set(
  -bbox.min.x - size.x / 2,
  -bbox.min.y - size.y / 2,
  -bbox.min.z - size.z / 2
);
// cube.rotation.set(0.5, Math.PI / 4, 0);
cube.receiveShadow = false;
cube.castShadow = false;
console.log(cube);

// scene.add(cube);

const pivotPoint = new THREE.Object3D();

pivotPoint.position.set(1, 1, 0);
pivotPoint.rotation.set(0.5, Math.PI / 4, 0);
pivotPoint.add(cube);

scene.add(pivotPoint);

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
// camera.lookAt(new THREE.Vector3(-2, -2, -2));
scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.shadowMap.enabled = true;

/**
 * Animate
 */

// renderer.render(scene, camera);

const tick = () => {
  // cube.rotateX(0.01);
  // cube.rotateY(0.01);
  // cube.rotateZ(0.01);

  // pivotPoint.rotateX(0.01);
  pivotPoint.rotateY(0.01);
  // pivotPoint.rotateZ(0.01);

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
tick();
