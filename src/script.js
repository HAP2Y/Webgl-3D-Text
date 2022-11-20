import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import * as dat from "lil-gui";
import { TorusGeometry } from "three";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();
gui.close()

// Folders
const textGUIFolder = gui.addFolder("Text");

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Axes Helper
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);
axesHelper.visible = false;
// Adding to debug gui
textGUIFolder.add(axesHelper, "visible");

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

const matcap1Texture = textureLoader.load("/textures/matcaps/1.png");
const matcap2Texture = textureLoader.load("/textures/matcaps/2.png");
const matcap3Texture = textureLoader.load("/textures/matcaps/3.png");
const matcap4Texture = textureLoader.load("/textures/matcaps/4.png");
const matcap5Texture = textureLoader.load("/textures/matcaps/5.png");
const matcap6Texture = textureLoader.load("/textures/matcaps/6.png");
const matcap7Texture = textureLoader.load("/textures/matcaps/7.png");
const matcap8Texture = textureLoader.load("/textures/matcaps/8.png");

/**
 * Fonts
 */
const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Happy Patel", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 4,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4,
  });

  textGeometry.computeBoundingBox();
  textGeometry.center();
  console.log(textGeometry.boundingBox);
  //   textGeometry.translate(
  //     -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
  //     -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //     -(textGeometry.boundingBox.max.z - 0.03) * 0.5
  //     // -(textGeometry.boundingBox.max.x + textGeometry.boundingBox.min.x) * 0.5,
  //     // -(textGeometry.boundingBox.max.y + textGeometry.boundingBox.min.y) * 0.5,
  //     // -(textGeometry.boundingBox.max.z + textGeometry.boundingBox.min.z) * 0.5
  //   );

  // Objects
  const material = new THREE.MeshMatcapMaterial();
  material.matcap = matcap8Texture;
  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);

  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  const sphereGeometry = new THREE.SphereGeometry(0.25, 32, 16);
  const isosahedronGeometry = new THREE.IcosahedronGeometry(0.5, 0);
  const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

  for (let i = 0; i < 250; i++) {
    // Random Shape
    const randomShapeNum = Math.floor(Math.random() * 4) + 1;
    const randomShape = new THREE.Mesh();
    switch (randomShapeNum) {
      case 1:
        randomShape.geometry = sphereGeometry;
        break;
      case 2:
        randomShape.geometry = isosahedronGeometry;
        break;
      case 3:
        randomShape.geometry = boxGeometry;
        break;
      default:
        randomShape.geometry = donutGeometry;
    }
    randomShape.material = material;

    // Position, Rotation, Scale
    randomShape.position.x = (Math.random() - 0.5) * 10;
    randomShape.position.y = (Math.random() - 0.5) * 10;
    randomShape.position.z = (Math.random() - 0.5) * 10;

    randomShape.rotation.x = Math.random() * Math.PI;
    randomShape.rotation.y = Math.random() * Math.PI;

    const scale = Math.random();
    randomShape.scale.set(scale, scale, scale);

    // Add to scene
    scene.add(randomShape);
  }

  //   Adding to debug gui
  textGUIFolder.add(material, "matcap", {
    1: matcap1Texture,
    2: matcap2Texture,
    3: matcap3Texture,
    4: matcap4Texture,
    5: matcap5Texture,
    6: matcap6Texture,
    7: matcap7Texture,
    8: matcap8Texture,
  });
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
