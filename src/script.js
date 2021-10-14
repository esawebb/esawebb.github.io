import './style.css'
import './countdown.js'
import './audio.js'

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import vertexShaderMoon from './shaders/vertexMoon.glsl';
import fragmentShaderMoon from './shaders/fragmentMoon.glsl';
import imageGlobe from './globe.jpeg'
import imageSun from './sun.jpeg'
import imageMoon from './moon.jpeg'
import imageJWST from './jwst.png'
import imageParticle from './1.png'
import imageOrbit from './orbit.png'
import modelbin from './scene.bin'
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

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth,
        sizes.height = window.innerHeight,

        camera.aspect = sizes.width / sizes.height,
        camera1.aspect = sizes.width / sizes.height,
        camera2.aspect = sizes.width / sizes.height,

        camera.updateProjectionMatrix(),
        camera1.updateProjectionMatrix(),
        camera2.updateProjectionMatrix(),

        renderer.setSize(sizes.width, sizes.height),
        renderer2.setSize(sizes.width, sizes.height),
        renderer3.setSize(sizes.width, sizes.height)
})

// // create camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 4000)
camera.position.z = 4

// // create camera
const camera1 = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 4000)
camera1.position.set(0, 0, 5)

// // create camera
const camera2 = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 4000)
camera2.position.z = 8



// create render for model
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('scene'),
    alpha: true
})
renderer.setClearColor(0x000000, 0);
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(window.devicePixelRatio)

// create render por space
const renderer2 = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('scene2'),
    alpha: true
})
renderer2.setClearColor(0x000000, 0);
renderer2.setSize(sizes.width, sizes.height)
renderer2.setPixelRatio(window.devicePixelRatio)

// create render por timeline
const renderer3 = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('scene3'),
    alpha: true
})
renderer3.setClearColor(0x000000, 0);
renderer3.setSize(sizes.width, sizes.height)
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

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(0.01, 0.01),
    new THREE.MeshStandardMaterial({

        metalness: 0,
        roughness: 0.5
    })
)
floor.receiveShadow = true
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

// model

var loader = new GLTFLoader();
var obj;
var obj2;
loader.load(model, function (gltf) {
    obj = gltf.scene
    obj.scale.set(0.0025, 0.0025, 0.0025)
    obj.position.set(0, 0, 0);
    obj.rotation.y = 3.0;
    scene.add(obj);
});
var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
scene.add(light);

// Cursor
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
    //console.log(cursor.x, cursor.y)
})
const controls = new OrbitControls(camera1, renderer.domElement);
controls.enableZoom = false;
//camera1.lookAt(gltf.asset)
controls.update();

// //////////////////// default box
// const geometryCube = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
// const materialCube = new THREE.MeshBasicMaterial( {color: 0x000000} );
// const cube = new THREE.Mesh( geometryCube, materialCube );
// scene.add( cube );
// //-------------------------------scene 2---------------------------------------------------------

//sphere Globe
const sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 100, 100),
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
sphere.position.x = 1

//sphere sun
const sphereSun = new THREE.Mesh(new THREE.SphereGeometry(2, 100, 100),
    new THREE.ShaderMaterial({
        vertexShader: vertexShaderMoon,
        fragmentShader: fragmentShaderMoon,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load(imageSun)
            }
        }

    })
)
scene2.add(sphereSun)
sphereSun.position.x = -5

////////////////////// circle
const curve = new THREE.EllipseCurve(
    0, 0,            // ax, aY
    1.1, 1.1,           // xRadius, yRadius
    0, 2 * Math.PI,  // aStartAngle, aEndAngle
    false,            // aClockwise
    0                 // aRotation
);



//////////////////// Position start
// const geometryJWST = new THREE.PlaneGeometry(0.5,0.5);
// const materialJWST = new THREE.MeshBasicMaterial( { color: 0xffffff,map: new THREE.TextureLoader().load(imageJWST ), } );
// const circleJWST = new THREE.Mesh( geometryJWST, materialJWST );
// circleJWST.position.x= 2
// circleJWST.position.y= 2
// scene2.add( circleJWST );

// model

var loader2 = new GLTFLoader();
var obj2;
loader.load(model, function (gltf) {
    obj2 = gltf.scene;
    obj2.position.set(5, 0, 0);
    obj2.rotation.y = 3.6
    obj2.rotation.x = 0.1
    obj2.scale.set(0.0005, 0.0005, 0.0005)
    scene2.add(obj2);
});
var light2 = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
scene2.add(light2);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load(imageParticle)

// Geometry
const particlesGeometry = new THREE.BufferGeometry()
const count = 500

const positions = new Float32Array(count * 3)


for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10

}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

// Material
const particlesMaterial = new THREE.PointsMaterial()

particlesMaterial.size = 0.05
//particlesMaterial.sizeAttenuation = true

//particlesMaterial.color = new THREE.Color('#000000')

particlesMaterial.transparent = true
particlesMaterial.alphaMap = particleTexture

//particlesMaterial.depthWrite = false
particlesMaterial.blending = THREE.AdditiveBlending

//particlesMaterial.vertexColors = true

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene2.add(particles)

const controls2 = new OrbitControls(camera2, renderer2.domElement);
controls2.enableZoom = false;
controls2.enableRotate = false;
controls2.update();

// //-------------------------------scene 3---------------------------------------------------------



////////////////////// circle end
const geometry3 = new THREE.CircleGeometry(0.05, 32);
const material3 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const circle3 = new THREE.Mesh(geometry3, material3);
circle3.position.x = 3
circle3.position.y = 0
scene3.add(circle3);

////////////////////// circle start
const geometry2 = new THREE.CircleGeometry(0.05, 32);
const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const circle2 = new THREE.Mesh(geometry2, material2);
circle2.position.x = -1
circle2.position.y = 0
scene3.add(circle2);

////////////////////// planet start
const circlePlanet = new THREE.Mesh(new THREE.SphereGeometry(1.5, 50, 50),
    new THREE.ShaderMaterial({
        vertexShader: vertexShaderMoon,
        fragmentShader: fragmentShaderMoon,
        uniforms: {
            globeTexture: {
                value: new THREE.TextureLoader().load(imageGlobe)
            }
        }

    })
)

circlePlanet.position.x = -3
circlePlanet.position.y = 0
scene3.add(circlePlanet);

////////////////////// Position start
const geometryPosition = new THREE.PlaneGeometry(0.5, 0.5);
const materialPosition = new THREE.MeshBasicMaterial({ color: 0xffffff, map: new THREE.TextureLoader().load(imageJWST), });
const circlePosition = new THREE.Mesh(geometryPosition, materialPosition);
circlePosition.position.x = 1
circlePosition.position.y = 0.3
scene3.add(circlePosition);

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
scene3.add(sphere2)
sphere2.position.x = 1.1
sphere2.position.y = 0

////////////////// line
const material = new THREE.LineBasicMaterial({
    color: 0xffffff
});

const points = [];
points.push(new THREE.Vector3(-1, 0, 0));
points.push(new THREE.Vector3(3, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);
scene3.add(line);

////////////////////// circle position
const geometry4 = new THREE.CircleGeometry(0.03, 32);
const material4 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const circle4 = new THREE.Mesh(geometry4, material4);
circle4.position.x = 1
circle4.position.y = 0
scene3.add(circle4);


const clock = new THREE.Clock()


document.getElementById("zoomOne").addEventListener("click", () => {
    camera1.position.z -= 0.5;
    camera1.updateProjectionMatrix();
})

document.getElementById("zoomTwo").addEventListener("click", () => {
    camera1.position.z += 0.5;
    camera1.updateProjectionMatrix();
})

function animate() {
    requestAnimationFrame(animate)
    const elapsedTime = clock.getElapsedTime()
    controls.update();
    controls2.update();

    renderer.setSize(sizes.width, sizes.height)
    renderer.render(scene, camera1)
    renderer2.setSize(sizes.width, sizes.height)
    renderer2.render(scene2, camera2)
    renderer3.setSize(sizes.width, sizes.height)
    renderer3.render(scene3, camera)

    sphere.rotation.y += 0.001;
    sphereSun.rotation.y += 0.001;
    particles.rotation.y += 0.001;
    //sphere2.rotation.y += 0.005;
    circlePlanet.rotation.y += 0.005;

    // if (cursor.x>0.05){
    //     obj.rotation.y += 0.003;
    // } else if (cursor.x<-0.05){
    //     obj.rotation.y -= 0.003;
    // }

    //obj.rotation.y += 0.001;
    //obj.position.z = Math.sin(elapsedTime/2) * 0.5;

    // sphere2.position.x = Math.cos(elapsedTime / 3) * 1.1;
    // sphere2.position.z = Math.sin(elapsedTime / 3) * 1.1;

    // camera2.position.x = Math.cos(elapsedTime / 10) * 4
    // camera2.position.z = Math.sin(elapsedTime / 10) * 4

    //obj2.rotation.y -= 0.004;
    //obj2.position.x = - Math.cos(elapsedTime /3) * 4;
    //obj2.position.z = Math.sin(elapsedTime /3) * 1.2


}
animate()


