import "./style.css";
import { OrbitControls, Timer } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

const canvas = document.getElementById("three");
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas: canvas! });

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100,
);

camera.position.x = 2;
camera.position.y = 0.7;
camera.position.z = 6;

/**
 * Objects
 */
const box = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial(),
);

scene.add(box);

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Events
 */
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
 * Controls
 */
const controls = new OrbitControls(camera, canvas!);
controls.enableDamping = true;

const timer = new Timer();

const tick = () => {
	// Timer
	timer.update();
	const elapsedTime = timer.getElapsed();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
