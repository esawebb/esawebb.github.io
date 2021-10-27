import './style.css'
import './countdown.js'
import './audio.js'

import * as THREE from "three";
import { gsap } from 'gsap'
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
import imageHubble from './hubble.png'
import imageParticle from './1.png'
import imageOrbit from './orbit.png'
import modelbin from './scene.bin'
import model from './model/scene.gltf'


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
camera2.position.z = 15
camera2.position.y = 15
camera2.position.x = -5


// create render for model
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: document.getElementById('scene'),
    alpha: true
})
renderer.setClearColor(0x000000, 0);
renderer.physicallyCorrectLights = true
renderer.outputEncoding = THREE.sRGBEncoding
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
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

/**
 * Loaders
 */
const loadingBarElement = document.querySelector('.loading-bar')
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () =>
    {
        // Wait a little
        window.setTimeout(() =>
        {
            // Animate overlay
            gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })

            // Update loadingBarElement
            loadingBarElement.classList.add('ended')
            loadingBarElement.style.transform = ''
        }, 500)
    },

    // Progress
    (itemUrl, itemsLoaded, itemsTotal) =>
    {
        // Calculate the progress and update the loadingBarElement
        const progressRatio = itemsLoaded / itemsTotal
        loadingBarElement.style.transform = `scaleX(${progressRatio})`
    }
)

const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)

// model

var loader = new GLTFLoader(loadingManager);
var obj;
var obj2;
loader.load(model, function (gltf) {
    obj = gltf.scene
    obj.scale.set(0.30, 0.30, 0.30)
    obj.position.set(0, -1, 0);
    obj.rotation.y = 3.0;
    scene.add(obj);
});
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(- 2, 2, 0)
scene.add(directionalLight)

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight2.castShadow = true
directionalLight2.shadow.mapSize.set(1024, 1024)
directionalLight2.shadow.camera.far = 15
directionalLight2.shadow.camera.left = - 7
directionalLight2.shadow.camera.top = 7
directionalLight2.shadow.camera.right = 7
directionalLight2.shadow.camera.bottom = - 7
directionalLight2.position.set( 2, 2, 0)
scene.add(directionalLight2)

const directionalLight3 = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight3.castShadow = true
directionalLight3.shadow.mapSize.set(1024, 1024)
directionalLight3.shadow.camera.far = 15
directionalLight3.shadow.camera.left = - 7
directionalLight3.shadow.camera.top = 7
directionalLight3.shadow.camera.right = 7
directionalLight3.shadow.camera.bottom = - 7
directionalLight3.position.set( 0, -1, 0)
scene.add(directionalLight3)

const directionalLight4 = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight4.castShadow = true
directionalLight4.shadow.mapSize.set(1024, 1024)
directionalLight4.shadow.camera.far = 15
directionalLight4.shadow.camera.left = - 7
directionalLight4.shadow.camera.top = 7
directionalLight4.shadow.camera.right = 7
directionalLight4.shadow.camera.bottom = - 7
directionalLight4.position.set(- 2, 2, -2)
scene.add(directionalLight4)

const directionalLight5 = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight5.castShadow = true
directionalLight5.shadow.mapSize.set(1024, 1024)
directionalLight5.shadow.camera.far = 15
directionalLight5.shadow.camera.left = - 7
directionalLight5.shadow.camera.top = 7
directionalLight5.shadow.camera.right = 7
directionalLight5.shadow.camera.bottom = - 7
directionalLight5.position.set( 2, 2, 2)
scene.add(directionalLight5)

const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
const overlayMaterial = new THREE.ShaderMaterial({
    // wireframe: true,
    transparent: true,
    uniforms:
    {
        uAlpha: { value: 1 }
    },
    vertexShader: `
        void main()
        {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float uAlpha;

        void main()
        {
            gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
    `
})
const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
scene.add(overlay)

const pointsModel = [
    {
        //                            z   y  x
        position: new THREE.Vector3(-0.4, 1, 0.5),
        element: document.querySelector('.point-0')
    },
    {
        position: new THREE.Vector3(-0.3, 1.6, - 0.6),
        element: document.querySelector('.point-1')
    },
    {
        position: new THREE.Vector3(0.5, 1.2, - 0.4),
        element: document.querySelector('.point-2')
    },
    {
        position: new THREE.Vector3(-2.4, 0.9, -0.3),
        element: document.querySelector('.point-3')
    },
    {
        position: new THREE.Vector3(2, 0.4, -0.3),
        element: document.querySelector('.point-4')
    },
    {
        position: new THREE.Vector3(0.2, -0.9, -0.4),
        element: document.querySelector('.point-5')
    },
    {
        position: new THREE.Vector3(-0.4, -0.9, 0.3),
        element: document.querySelector('.point-6')
    }

]

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
//controls.enabled = false;
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
sphere.position.x = 3

//sphere sun
const sphereSun = new THREE.Mesh(new THREE.SphereGeometry(4, 100, 100),
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
sphereSun.position.x = -10

////////////////////// circle
const curve = new THREE.EllipseCurve(
	0,  0,            // ax, aY
	2, 2,           // xRadius, yRadius
	0,  2 * Math.PI,  // aStartAngle, aEndAngle
	false,            // aClockwise
	0               // aRotation
);
const pointsCurve = curve.getPoints( 50 );
const geometryCurve = new THREE.BufferGeometry().setFromPoints( pointsCurve );
const materialCurve = new THREE.LineBasicMaterial( { color : 0xffffff } );
// Create the final object to add to the scene
const ellipse = new THREE.Line( geometryCurve, materialCurve );
ellipse.position.x = 10;
ellipse.rotation.y = 1.5;
scene2.add(ellipse)

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
    obj2.position.set(10, 0, 0);
    obj2.rotation.z = -1
    obj2.rotation.x = 1.8
    obj2.scale.set(0.05, 0.05, 0.05)
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
const count = 2000

const positions = new Float32Array(count * 3)


for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 85

}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 4))

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
particles.position.set(-5, 0, 0)
scene2.add(particles)

const controls2 = new OrbitControls(camera2, renderer2.domElement);
controls2.enableZoom = false;
controls2.enableRotate = false;
controls2.update();

// //-------------------------------scene 3---------------------------------------------------------



////////////////////// circle hubble start
const geometry3 = new THREE.CircleGeometry(0.03, 32);
const material3 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const circle3 = new THREE.Mesh(geometry3, material3);
circle3.position.x = -1.8
circle3.position.y = 0.3
scene3.add(circle3);

////////////////////// circle moon start
const geometry2 = new THREE.CircleGeometry(0.03, 32);
const material2 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const circle2 = new THREE.Mesh(geometry2, material2);
circle2.position.x = -1.8
circle2.position.y = 0
scene3.add(circle2);

// ////////////////////// circle L2 start
const geometryL2 = new THREE.CircleGeometry(0.03, 32);
const materialL2 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const circleL2 = new THREE.Mesh(geometryL2, materialL2);
circleL2.position.x = -1.8
circleL2.position.y = -0.3
scene3.add(circleL2);

////////////////////// planet start
const circlePlanet = new THREE.Mesh(new THREE.SphereGeometry(0.6, 50, 50),
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

circlePlanet.position.x = -2.7
circlePlanet.position.y = 0
scene3.add(circlePlanet);

////////////////////// JWST 
const geometryPosition = new THREE.PlaneGeometry(0.5, 0.5);
const materialPosition = new THREE.MeshBasicMaterial({ color: 0xffffff, map: new THREE.TextureLoader().load(imageJWST), });
const circlePosition = new THREE.Mesh(geometryPosition, materialPosition);
circlePosition.position.x = 1
circlePosition.position.y = -0.7
scene3.add(circlePosition);

////////////////////// Hubble
const geometryHubblePosition = new THREE.PlaneGeometry(0.4, 0.4);
const materialHubblePosition = new THREE.MeshBasicMaterial({ color: 0xffffff, map: new THREE.TextureLoader().load(imageHubble), });
const circleHubblePosition = new THREE.Mesh(geometryHubblePosition, materialHubblePosition);
circleHubblePosition.position.x = -0.9
circleHubblePosition.position.y = 0.3
scene3.add(circleHubblePosition);

//sphere moon
const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.15, 50, 50),
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
sphere2.position.x = -0.2
sphere2.position.y = 0

////////////////// line L2
const material = new THREE.LineBasicMaterial({
    color: 0xffffff
});

const points = [];
points.push(new THREE.Vector3(-1.8, -0.3, 0));
points.push(new THREE.Vector3(2.5, -0.3, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);
scene3.add(line);

////////////////// line Moon
const materialMoon = new THREE.LineBasicMaterial({
    color: 0xffffff
});

const pointsMoon = [];
pointsMoon.push(new THREE.Vector3(-1.8, 0, 0));
pointsMoon.push(new THREE.Vector3(-0.5, 0, 0));

const geometryMoon = new THREE.BufferGeometry().setFromPoints(pointsMoon);

const lineMoon = new THREE.Line(geometryMoon, materialMoon);
scene3.add(lineMoon);

////////////////// line Hubble
const materialHubble = new THREE.LineBasicMaterial({
    color: 0xffffff
});

const pointsHubble = [];
pointsHubble.push(new THREE.Vector3(-1.8, 0.3, 0));
pointsHubble.push(new THREE.Vector3(-1.3, 0.3, 0));

const geometryHubble = new THREE.BufferGeometry().setFromPoints(pointsHubble);

const lineHubble = new THREE.Line(geometryHubble, materialHubble);
scene3.add(lineHubble);

////////////////////// circle position
const geometry4 = new THREE.CircleGeometry(0.04, 32);
const material4 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const circle4 = new THREE.Mesh(geometry4, material4);
circle4.position.x = 1
circle4.position.y = -0.3
scene3.add(circle4);

////////////////////// cone hubble
const geometryConeHubble = new THREE.ConeGeometry(0.05, 0.1, 32);
const materialConeHubble = new THREE.MeshBasicMaterial({ color: 0xffffff });
const coneHubble = new THREE.Mesh(geometryConeHubble, materialConeHubble);
coneHubble.rotation.z = -1.55
coneHubble.position.x = - 1.3
coneHubble.position.y = 0.3
scene3.add(coneHubble);

////////////////////// cone Moon
const geometryConeMoon = new THREE.ConeGeometry(0.05, 0.1, 32);
const materialConeMoon = new THREE.MeshBasicMaterial({ color: 0xffffff });
const coneMoon = new THREE.Mesh(geometryConeMoon, materialConeMoon);
coneMoon.rotation.z = -1.55
coneMoon.position.x = - 0.5
coneMoon.position.y = 0
scene3.add(coneMoon);

////////////////////// cone L2
const geometryConeL2 = new THREE.ConeGeometry(0.05, 0.1, 32);
const materialConeL2 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const coneL2 = new THREE.Mesh(geometryConeL2, materialConeL2);
coneL2.rotation.z = -1.55
coneL2.position.x = 2.5
coneL2.position.y = -0.3
scene3.add(coneL2);


const clock = new THREE.Clock()


// document.getElementById("zoomOne").addEventListener("click", () => {
//     camera1.position.z -= 0.5;
//     camera1.updateProjectionMatrix();
// })

// document.getElementById("zoomTwo").addEventListener("click", () => {
//     camera1.position.z += 0.5;
//     camera1.updateProjectionMatrix();
// })

var timeOut = false;

document.getElementById("timeOut").addEventListener("click", () => {

    var playTimeOut = document.getElementById('timeOut');

    if (timeOut == true){
        timeOut = false;
        playTimeOut.innerHTML = `<ion-icon name="play" size="large"></ion-icon>`;

    } else {
        timeOut = true;
        playTimeOut.innerHTML = `<ion-icon name="undo" size="large"></ion-icon>`;

    }

    
})

var rotationModel = false;

document.getElementById("rotationModel").addEventListener("click", () => {

    var playRotationModel = document.getElementById('rotationModel');

    if (rotationModel == true){
        rotationModel = false;
        playRotationModel.innerHTML = `<ion-icon name="play" size="large"></ion-icon>`;

    } else {
        rotationModel = true;
        playRotationModel.innerHTML = `<ion-icon name="pause" size="large"></ion-icon>`;

    }

    
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

    sphere.rotation.y += 0.002;
    sphereSun.rotation.y += 0.001;
    particles.rotation.y += 0.001;
    sphere2.rotation.y += 0.003;
    circlePlanet.rotation.y += 0.001;

    obj2.position.y = Math.cos(elapsedTime / 2) * 2;
    obj2.position.z = Math.sin(elapsedTime / 2) * 2;

    if (camera2.position.x < 20 && timeOut == true) {
        camera2.position.x += 0.1;
        camera2.position.z -= 0.06;
        camera2.position.y = 0
    }

    if (camera2.position.x > 0 && timeOut == false) {
        camera2.position.x -= 0.1;
        camera2.position.z += 0.06;
        camera2.position.y = 12
    }

    if (rotationModel == true) {
        obj.rotation.y += 0.001;
        //obj.position.z = Math.sin(elapsedTime/2) * 0.5;
    }

    controls.update()

    for(const pointModel of pointsModel)
    {
        const screenPosition = pointModel.position.clone()
        screenPosition.project(camera1)

        const translateX = screenPosition.x * sizes.width * 0.5
        const translateY = - screenPosition.y * sizes.height * 0.5
        pointModel.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        
    }
    // if (cursor.y>0.05){
    //     obj.rotation.x += 0.001;
    // } else if (cursor.y<-0.05){
    //     obj.rotation.x -= 0.001;
    // }

    // obj.rotation.y += 0.001;
    // obj.position.z = Math.sin(elapsedTime/2) * 0.5;

    // sphere2.position.x = Math.cos(elapsedTime / 3) * 1.1;
    // sphere2.position.z = Math.sin(elapsedTime / 3) * 1.1;

    // camera2.position.x = Math.cos(elapsedTime / 10) * 4
    // camera2.position.z = Math.sin(elapsedTime / 10) * 4

    //obj2.rotation.y -= 0.004;
    //obj2.position.x = - Math.cos(elapsedTime /3) * 4;
    //obj2.position.z = Math.sin(elapsedTime /3) * 1.2


}
animate()


