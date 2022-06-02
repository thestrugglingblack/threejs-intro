import './style.css'

import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

/*
* Things that are needed...
* 1. Scene - A container that holds all of the objects
* 2. Camera - To view objects in a scene, there needs to be a camera. This serves as our eyes in the virtual space
* 3. Renderer
* */


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000) // args -> field of view, aspect ratio,  view frustrum, view frustrum

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30) // set the position of the camera along the z-axis

/*
* To create a 3D object it consist of these components
* 1. Shape
* 2. Material (Skin)
* 3. Mesh - combines shape with material
*
* */
const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
const loader = new THREE.TextureLoader();
const texture = loader.load('./img/ocean.jpeg')
const material =  new THREE.MeshBasicMaterial( { map: texture } );
const torus = new THREE.Mesh(geometry, material)

scene.add(torus) // adds newly created 3D object to the scene

const pointLight = new THREE.PointLight(0xffffff) // adds light to the scene
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff) // adds a flood light to the scene
scene.add(pointLight, ambientLight)


/*
* For logging out where the light is located THREE.js has a light helper
* that will show where the light is positioned in the scene.
*
* For logging out where the 3D object stay in a scene this is a grid helper
* */

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement) // adds movement to mouse within the scene

/*
* A method to randomly generate 3D objects and place them in the scene
* */
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);



    const material = new THREE.MeshStandardMaterial({ color: '#FFFF8F' });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);
}
Array(3000).fill().forEach(addStar)



const spaceTexture = new THREE.TextureLoader().load('./img/pasture.jpeg') // set background of the scene
scene.background = spaceTexture;

/*
* Texture Mapping is the process of taking 2 dimensional pixels and mapping that to a 3D object
* */
const lokiTexture = new THREE.TextureLoader().load('./img/loki.jpeg')
const loki = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({ map: lokiTexture})
)

scene.add(loki)

const skarletTexture = new THREE.TextureLoader().load('./img/skarlet.jpeg')
const normalTexture = new THREE.TextureLoader().load('./img/polka.png')

const skarlet = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
        map: skarletTexture,
        normalMap: normalTexture
    })
)

scene.add(skarlet)

skarlet.position.z = 30;
skarlet.position.setX(-10)

loki.position.z = -5
loki.position.x = 18

function moveCamera(){
    const t = document.body.getBoundingClientRect().top; // => let us know where the user cursor is located

    skarlet.rotation.x += 0.05;
    skarlet.rotation.y += 0.075;
    skarlet.rotation.z += 0.05;

    loki.rotation.y += 0.01;
    loki.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera;
moveCamera()


function animate() {
    requestAnimationFrame(animate)

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01

    controls.update()

    renderer.render(scene, camera)
}
animate()
