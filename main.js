import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new THREE.TextureLoader();
const textures = {
    sun: loader.load('sun.jpg'),
    mercury: loader.load('mercury.jpg'),
    venus: loader.load('venus.jpg'),
    earth: loader.load('earth.jpeg'),
    mars: loader.load('mars.jpg'),
    jupiter: loader.load('jupiter.jpg'),
    saturn: loader.load('saturn.jpg'),
    uranus: loader.load('uranus.jpg'),
    neptune: loader.load('neptune.jpg')
};

const sunGeo = new THREE.SphereGeometry(16, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ map: textures.sun });
const sun = new THREE.Mesh(sunGeo, sunMaterial);
scene.add(sun);

const planetData = [
    { name: 'Mercury', size: 3.2, distance: 20, texture: textures.mercury, orbitSpeed: 0.04, rotationSpeed: 0.004 },
    { name: 'Venus', size: 5.8, distance: 28, texture: textures.venus, orbitSpeed: 0.015, rotationSpeed: 0.002 },
    { name: 'Earth', size: 6, distance: 38, texture: textures.earth, orbitSpeed: 0.01, rotationSpeed: 0.02 },
    { name: 'Mars', size: 4, distance: 50, texture: textures.mars, orbitSpeed: 0.008, rotationSpeed: 0.018 },
    { name: 'Jupiter', size: 12, distance: 70, texture: textures.jupiter, orbitSpeed: 0.002, rotationSpeed: 0.04 },
    { name: 'Saturn', size: 10, distance: 90, texture: textures.saturn, orbitSpeed: 0.0015, rotationSpeed: 0.038 },
    { name: 'Uranus', size: 7, distance: 110, texture: textures.uranus, orbitSpeed: 0.001, rotationSpeed: 0.03 },
    { name: 'Neptune', size: 7, distance: 130, texture: textures.neptune, orbitSpeed: 0.0008, rotationSpeed: 0.032 }
];

const planets = [];

planetData.forEach(p => {
    const geo = new THREE.SphereGeometry(p.size, 32, 32);
    const mat = new THREE.MeshBasicMaterial({ map: p.texture });
    const mesh = new THREE.Mesh(geo, mat);

    const orbitObj = new THREE.Object3D();
    orbitObj.add(mesh);
    mesh.position.x = p.distance;

    scene.add(orbitObj);
    planets.push({ mesh, orbitObj, rotationSpeed: p.rotationSpeed, orbitSpeed: p.orbitSpeed });
});

camera.position.z = 200;

const animate = () => {
    requestAnimationFrame(animate);

    sun.rotateY(0.004);

    planets.forEach(p => {
        p.mesh.rotateY(p.rotationSpeed);    // Planet self-rotation
        p.orbitObj.rotateY(p.orbitSpeed);   // Orbit rotation
    });

    renderer.render(scene, camera);
};

animate();
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
