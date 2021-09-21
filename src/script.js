import './style.css'

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import vertexShaderMoon from './shaders/vertexMoon.glsl';
import fragmentShaderMoon from './shaders/fragmentMoon.glsl';
import imageGlobe from './globe.jpeg'
import imageMoon from './moon.jpeg'
import modelbin  from './scene.bin'
import model from './scene.gltf'



// create scene for model
const scene = new THREE.Scene()

// create scene for space
const scene2 = new THREE.Scene()

// create scene for timeline
const scene3 = new THREE.Scene()


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// // create camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 4000)
camera.position.z = 4

// // create camera
const camera1 = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 4000)
camera1.position.z = 4



// create render for model
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('scene'),
    alpha: true
})
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

// create render por space
const renderer2 = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('scene2'),
    alpha: true
})
renderer2.setClearColor(0x000000, 0);
renderer2.setSize(window.innerWidth, window.innerHeight)
renderer2.setPixelRatio(window.devicePixelRatio)

// create render por timeline
const renderer3 = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('scene3'),
    alpha: true
})
renderer3.setClearColor(0x000000, 0);
renderer3.setSize(window.innerWidth, window.innerHeight)
renderer3.setPixelRatio(window.devicePixelRatio)

// //-------------------------------scene ---------------------------------------------------------

function mdY() {
    if (window.innerWidth < 768) {
        return -2000;
    } else {
        if (window.innerWidth < 992) {
            return -1700;
        } else {
            return -1550;
        }
    }
}

// model

var loader = new GLTFLoader();
        var obj;
        loader.load(model, function (gltf) {
            obj = gltf.scene;
            obj.position.set(0, 0, mdY());
            obj.rotation.y = 2.5;
            scene.add(gltf.scene);
        });
        var light = new THREE.HemisphereLight(0xffffff, 0x000000, 3);
        scene.add(light);

////////////////////// default box
const geometryCube = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
const materialCube = new THREE.MeshBasicMaterial( {color: 0x000000} );
const cube = new THREE.Mesh( geometryCube, materialCube );
scene.add( cube );
// //-------------------------------scene 2---------------------------------------------------------

//sphere
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.8, 50, 50),
new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        globeTexture: {
            value: new THREE.TextureLoader().load(imageGlobe)
        }
    }

})
)
scene2.add(sphere)
sphere.position.x=0

//sphere moon
const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.1, 50, 50),
new THREE.ShaderMaterial({
    vertexShader: vertexShaderMoon,
    fragmentShader: fragmentShaderMoon,
    uniforms: {
        globeTexture: {
            value: new THREE.TextureLoader().load(imageMoon)
        }
    }

})
)
scene2.add(sphere2)
sphere2.position.x=-0
sphere2.position.y=-1.1

////////////////////// circle
const curve = new THREE.EllipseCurve(
    0, 0,            // ax, aY
    1.1, 1.1,           // xRadius, yRadius
    0, 2 * Math.PI,  // aStartAngle, aEndAngle
    false,            // aClockwise
    0                 // aRotation
);

const pointsCircle = curve.getPoints(50);
const geometryCircle = new THREE.BufferGeometry().setFromPoints(pointsCircle);

const materialCircle = new THREE.LineBasicMaterial({ color: 0xffffff });
// Create the final object to add to the scene
const ellipse = new THREE.Line(geometryCircle, materialCircle);
scene2.add(ellipse);


// //-------------------------------scene 3---------------------------------------------------------

////////////////////// circle end
const geometry3 = new THREE.CircleGeometry( 0.02, 32 );
const material3 = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const circle3 = new THREE.Mesh( geometry3, material3 );
circle3.position.x= 2
circle3.position.y= 0
scene3.add( circle3 );

////////////////////// circle start
const geometry2 = new THREE.CircleGeometry( 0.02, 32 );
const material2 = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const circle2 = new THREE.Mesh( geometry2, material2 );
circle2.position.x= -2
circle2.position.y= 0
scene3.add( circle2 );



////////////////// line
const material = new THREE.LineBasicMaterial({
    color: 0xffffff
});

const points = [];
points.push(new THREE.Vector3(-2, 0, 0));
points.push(new THREE.Vector3(2, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);
scene3.add(line);

////////////////////// circle position
const geometry4 = new THREE.CircleGeometry( 0.03, 32 );
const material4 = new THREE.MeshBasicMaterial( { color: 0xffffff } );
const circle4 = new THREE.Mesh( geometry4, material4 );
circle4.position.x= 1
circle4.position.y= 0
scene3.add( circle4 );


//control
const controls = new OrbitControls( camera1, renderer.domElement );
controls.update();

function animate() {
    requestAnimationFrame(animate)
    controls.update();
    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera1)
    renderer2.setSize(sizes.width, sizes.height)
    renderer2.render(scene2, camera)
    renderer3.setSize(sizes.width, sizes.height)
    renderer3.render(scene3, camera)
    sphere.rotation.y += 0.001;
    sphere2.rotation.y += 0.001;
    obj.rotation.y += 0.001;
    //sphere2.position.y += 0.001;
    //sphere2.position.x += 0.001;
}
animate()


