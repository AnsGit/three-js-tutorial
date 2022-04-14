import "./styles.scss";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as TWEEN from "tween";

/**
 * Base
 */
// Canvas
const canvas = document.getElementById("canvas");

// Scene
const scene = new THREE.Scene();

// Axes helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// Resources
const resources = [];

const loadResources = () => {
  return new Promise((resolve) => {
    const loader = new GLTFLoader();

    loader.load("/src/assets/models/cube.glb", (gltf) => {
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
// cube.receiveShadow = false;
// cube.castShadow = false;
console.log(cube);

// scene.add(cube);

const pivotPoint = new THREE.Object3D();

pivotPoint.position.set(0, -size.y / 2, 0);
// pivotPoint.rotation.set(0.5, Math.PI / 4, 0);
pivotPoint.add(cube);
// scene.add(pivotPoint);

const pivotPoint1 = pivotPoint.clone();
pivotPoint1.position.y += size.y;
// scene.add(pivotPoint1);

const pivotPointsGroup = new THREE.Object3D();
pivotPointsGroup.position.set(1, 1, 1);

pivotPointsGroup.add(pivotPoint);
pivotPointsGroup.add(pivotPoint1);
scene.add(pivotPointsGroup);

// Set transparent
pivotPointsGroup.traverse((node) => {
  if (node.isMesh) {
    // node.material.opacity = 0.5;
    node.material.transparent = true;

    const color = node.material.color.getHex();
    // console.log(node.material.color);

    node.material.color.lerp(new THREE.Color(0xff0505), 0.4);
    node.material.color.lerp(new THREE.Color(color), 1);
  }
});

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

lights[0] = new THREE.DirectionalLight(0xffffff, 3);
lights[0].position.set(0, 0, 10);

lights[1] = new THREE.DirectionalLight(0xffffff, 3);
lights[1].position.set(10, 10, 10);

lights[2] = new THREE.DirectionalLight(0xffffff, 2);
lights[2].position.set(0, 10, 0);

lights[3] = new THREE.DirectionalLight(0xffffff, 1);
lights[3].position.set(10, 0, 0);
scene.add(...lights);

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
// camera.position.x = 0;
// camera.position.z = 5;
camera.position.set(10, 10, 10); // all components equal
camera.lookAt(scene.position);
scene.add(camera);
console.log(scene.position);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.shadowMap.enabled = true;

/**
 * Animate
 */

renderer.render(scene, camera);

let requestID;

const tick = () => {
  // pivotPoint.rotateX(0.01);
  // pivotPoint.rotateY(0.01);
  // pivotPoint.rotateZ(0.01);

  // pivotPoint1.rotateX(0.01);
  // pivotPoint1.rotateY(0.01);
  // pivotPoint1.rotateZ(0.01);

  pivotPointsGroup.rotateX(0.01);
  pivotPointsGroup.rotateY(0.01);
  pivotPointsGroup.rotateZ(0.01);

  // Render
  renderer.render(scene, camera);
  TWEEN.update();

  // Call tick again on the next frame
  requestID = window.requestAnimationFrame(tick);
};
tick();

// setTimeout(() => {
//   window.cancelAnimationFrame(requestID);
// }, 2000);

console.log("BEFORE ANIMATION");

await new Promise((resolve) => {
  new TWEEN.Tween()
    .to({}, 1000)
    .delay(1000)
    .easing(TWEEN.Easing.Linear.None)
    .onUpdate((now) => {
      pivotPointsGroup.traverse((node) => {
        if (node.isMesh) {
          node.material.opacity = 1.5 - now;
          // node.material.transparent = true;
        }
      });
    })
    .onComplete(resolve)
    .start();
});

console.log("AFTER ANIMATION");
