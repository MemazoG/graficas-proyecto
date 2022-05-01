import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import sunImg from "./images/sun.jpg"
import mercuryImg from "./images/mercury.jpg"
import venusImg from "./images/venus.jpg"
import earthImg from "./images/earth.jpg"
import marsImg from "./images/mars.jpg"
import jupiterImg from "./images/jupiter.jpg"
import saturnImg from "./images/saturn.jpg"
import saturnRing from "./images/saturn_ring.png"
import uranusImg from "./images/uranus.jpg"
import neptuneImg from "./images/neptune.jpg"
import Planet from "./Planet"

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Sizes
 const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x =12
camera.position.y = 0
camera.position.z = 15
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// =================================================================================================

// Group where all planets and sun will be added
const solarSystem = new THREE.Group()

// Individual group for each planet's system (in case I add more things to each one)
const mercurySystem = new THREE.Group()
const venusSystem = new THREE.Group()
const earthSystem = new THREE.Group()
const marsSystem = new THREE.Group()
const jupiterSystem = new THREE.Group()
const saturnSystem = new THREE.Group()
const uranusSystem = new THREE.Group()
const neptuneSystem = new THREE.Group()

// Sun
const sunGeometry = new THREE.SphereGeometry(4)
const sunTexture = new THREE.TextureLoader().load(sunImg)
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture })
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
solarSystem.add(sunMesh)

// mercury
const mercury = new Planet(1, 7, mercuryImg)
const mercuryMesh = mercury.getMesh()
mercurySystem.add(mercuryMesh)

// Venus
const venus = new Planet(1, 10, venusImg)
const venusMesh = venus.getMesh()
venusSystem.add(venusMesh)

// Earth
const earth = new Planet(1, 13, earthImg)
const earthMesh = earth.getMesh()
earthSystem.add(earthMesh)

// Mars
const mars = new Planet(1, 16, marsImg)
const marsMesh = mars.getMesh()
marsSystem.add(marsMesh)

// Jupiter
const jupiter = new Planet(1, 19, jupiterImg)
const jupiterMesh = jupiter.getMesh()
jupiterSystem.add(jupiterMesh)

// Saturn
const saturn = new Planet(1, 22, saturnImg)
const saturnMesh = saturn.getMesh()
saturnSystem.add(saturnMesh)

// Uranus
const uranus = new Planet(1, 25, uranusImg)
const uranusMesh = uranus.getMesh()
uranusSystem.add(uranusMesh)

// Neptune
const neptune = new Planet(1, 28, neptuneImg)
const neptuneMesh = neptune.getMesh()
neptuneSystem.add(neptuneMesh)

// Add each planet's system to the solar system group
solarSystem.add(mercurySystem, venusSystem, earthSystem, marsSystem, jupiterSystem, saturnSystem, uranusSystem, neptuneSystem)

scene.add(solarSystem)

// =================================================================================================

// Gets called when window's size changes
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

// Animate
const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
     sunMesh.rotation.y = .5 * elapsedTime
     mercuryMesh.rotation.y = .5 * elapsedTime
     venusMesh.rotation.y = .5 * elapsedTime
     earthMesh.rotation.y = .5 * elapsedTime
     marsMesh.rotation.y = .5 * elapsedTime
     jupiterMesh.rotation.y = .5 * elapsedTime
     saturnMesh.rotation.y = .5 * elapsedTime
     uranusMesh.rotation.y = .5 * elapsedTime
     neptuneMesh.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
