import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // Orbit Controls allow the user to move the camera around
import starsImg from "./images/stars.jpg"
import sunImg from "./images/sun.jpg"
import mercuryImg from "./images/mercury.jpg"
import mercuryBump from "./images/mercuryBump.jpg"
import venusImg from "./images/venus.jpg"
import venusBump from "./images/venusBump.jpg"
import earthImg from "./images/earth.jpg"
import earthBump from "./images/earthBump.jpg"
import marsImg from "./images/mars.jpg"
import marsBump from "./images/marsBump.jpg"
import jupiterImg from "./images/jupiter.jpg"
import jupiterBump from "./images/jupiterBump.jpg"
import saturnImg from "./images/saturn.jpg"
import saturnRingImg from "./images/saturn_ring.png"
import uranusImg from "./images/uranus.jpg"
import neptuneImg from "./images/neptune.jpg"
import Planet from "./Planet" // Class that creates planets
import PlanetPath from "./PlanetPath" // Class that creates the rings representing a planet's path
import environment from "./environmentSetup" // File with default attributes for each element to be modified with dat.gui
import { sizes, distances, rotationSpeed, revolutionSpeed } from './scaleLogic' // File with all the scaling logic data
import { DoubleSide } from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Sizes
 const windowSizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Camera
const camera = new THREE.PerspectiveCamera(75, windowSizes.width / windowSizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 20
camera.position.z = 25
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(windowSizes.width, windowSizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.minDistance = 5
controls.maxDistance = 50

// Lights
const pointLight = new THREE.PointLight(0xffffff, 2.5, 70)
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

// Stars
const starsGeometry = new THREE.SphereGeometry(50, 32, 32)
const starsTexture = new THREE.TextureLoader().load(starsImg)
const starsMaterial = new THREE.MeshBasicMaterial({ map: starsTexture })
const starsMesh = new THREE.Mesh(starsGeometry, starsMaterial)
starsMesh.material.side = THREE.BackSide
solarSystem.add(starsMesh)

// Sun
const sunGeometry = new THREE.SphereGeometry(sizes.sun, 32, 16)
const sunTexture = new THREE.TextureLoader().load(sunImg)
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture })
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
solarSystem.add(sunMesh)

// Mercury
const mercury = new Planet(sizes.mercury, distances.mercury, mercuryImg, mercuryBump)
const mercuryMesh = mercury.getMesh()
mercurySystem.add(mercuryMesh)
const mercuryObj = new THREE.Object3D() // Mercury system will rotate around this object, which is placed at the origin (0, 0, 0)
mercuryObj.add(mercurySystem)

const mercuryPath = new PlanetPath(distances.mercury)
const mercuryPathMesh = mercuryPath.getMesh()
solarSystem.add(mercuryPathMesh)

// Venus
const venus = new Planet(sizes.venus, distances.venus, venusImg, venusBump)
const venusMesh = venus.getMesh()
venusSystem.add(venusMesh)
const venusObj = new THREE.Object3D() // Venus system will rotate around this object, which is placed at the origin (0, 0, 0)
venusObj.add(venusSystem)

const venusPath = new PlanetPath(distances.venus)
const venusPathMesh = venusPath.getMesh()
solarSystem.add(venusPathMesh)

// Earth
const earth = new Planet(sizes.earth, distances.earth, earthImg, earthBump)
const earthMesh = earth.getMesh()
earthSystem.add(earthMesh)
const earthObj = new THREE.Object3D() // Earth system will rotate around this object, which is placed at the origin (0, 0, 0)
earthObj.add(earthSystem)

const earthPath = new PlanetPath(distances.earth)
const earthPathMesh = earthPath.getMesh()
solarSystem.add(earthPathMesh)

// Mars
const mars = new Planet(sizes.mars, distances.mars, marsImg, marsBump)
const marsMesh = mars.getMesh()
marsSystem.add(marsMesh)
const marsObj = new THREE.Object3D() // Mars system will rotate around this object, which is placed at the origin (0, 0, 0)
marsObj.add(marsSystem)

const marsPath = new PlanetPath(distances.mars)
const marsPathMesh = marsPath.getMesh()
solarSystem.add(marsPathMesh)

// Jupiter
const jupiter = new Planet(sizes.jupiter, distances.jupiter, jupiterImg, jupiterBump)
const jupiterMesh = jupiter.getMesh()
jupiterSystem.add(jupiterMesh)
const jupiterObj = new THREE.Object3D() // Jupiter system will rotate around this object, which is placed at the origin (0, 0, 0)
jupiterObj.add(jupiterSystem)

const jupiterPath = new PlanetPath(distances.jupiter)
const jupiterPathMesh = jupiterPath.getMesh()
solarSystem.add(jupiterPathMesh)

// Saturn
const saturn = new Planet(sizes.saturn, distances.saturn, saturnImg, undefined)
const saturnMesh = saturn.getMesh()
saturnSystem.add(saturnMesh)
const saturnObj = new THREE.Object3D() // Saturn system will rotate around this object, which is placed at the origin (0, 0, 0)
saturnObj.add(saturnSystem)

// Saturn - Ring
const saturnRingGeometry = new THREE.RingGeometry(sizes.saturn + 0.5, sizes.saturn + 0.8, 32)
const saturnRingTexture = new THREE.TextureLoader().load(saturnRingImg)
const saturnRingMaterial = new THREE.MeshBasicMaterial({ map: saturnRingTexture, side:DoubleSide })
const saturnRingMesh = new THREE.Mesh(saturnRingGeometry, saturnRingMaterial)
saturnRingMesh.rotateX(Math.PI / 2)
saturnRingMesh.position.x += distances.saturn
saturnSystem.add(saturnRingMesh)

const saturnPath = new PlanetPath(distances.saturn)
const saturnPathMesh = saturnPath.getMesh()
solarSystem.add(saturnPathMesh)

// Uranus
const uranus = new Planet(sizes.uranus, distances.uranus, uranusImg, undefined)
const uranusMesh = uranus.getMesh()
uranusSystem.add(uranusMesh)
const uranusObj = new THREE.Object3D() // Uranus system will rotate around this object, which is placed at the origin (0, 0, 0)
uranusObj.add(uranusSystem)

const uranusPath = new PlanetPath(distances.uranus)
const uranusPathMesh = uranusPath.getMesh()
solarSystem.add(uranusPathMesh)

// Neptune
const neptune = new Planet(sizes.neptune, distances.neptune, neptuneImg, undefined)
const neptuneMesh = neptune.getMesh()
neptuneSystem.add(neptuneMesh)
const neptuneObj = new THREE.Object3D() // Neptune system will rotate around this object, which is placed at the origin (0, 0, 0)
neptuneObj.add(neptuneSystem)

const neptunePath = new PlanetPath(distances.neptune)
const neptunePathMesh = neptunePath.getMesh()
solarSystem.add(neptunePathMesh)


// Add each planet's system and the stars to the solar system group
solarSystem.add(mercuryObj, venusObj, earthObj, marsObj, jupiterObj, saturnObj, uranusObj, neptuneObj)
scene.add(solarSystem)

// =================================================================================================

// Gets called when window's size changes
window.addEventListener('resize', () =>
{
    // Update sizes
    windowSizes.width = window.innerWidth
    windowSizes.height = window.innerHeight

    // Update camera
    camera.aspect = windowSizes.width / windowSizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(windowSizes.width, windowSizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Animate
const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update planet rotations around themselves
     starsMesh.rotation.y = 0.001 * elapsedTime
     sunMesh.rotation.y = 0.005 * elapsedTime
     mercuryMesh.rotation.y = rotationSpeed.mercury * elapsedTime
     venusMesh.rotation.y = rotationSpeed.venus * elapsedTime
     earthMesh.rotation.y = rotationSpeed.earth * elapsedTime
     marsMesh.rotation.y = rotationSpeed.mars * elapsedTime
     jupiterMesh.rotation.y = rotationSpeed.jupiter * elapsedTime
     saturnMesh.rotation.y = rotationSpeed.saturn * elapsedTime
     uranusMesh.rotation.y = rotationSpeed.uranus * elapsedTime
     neptuneMesh.rotation.y = rotationSpeed.neptune * elapsedTime

    // Update planet revolutions around the Sun
    mercuryObj.rotation.y = revolutionSpeed.mercury * elapsedTime
    venusObj.rotation.y = revolutionSpeed.venus * elapsedTime
    earthObj.rotation.y = revolutionSpeed.earth  * elapsedTime
    marsObj.rotation.y = revolutionSpeed.mars * elapsedTime
    jupiterObj.rotation.y = revolutionSpeed.jupiter * elapsedTime
    saturnObj.rotation.y = revolutionSpeed.saturn * elapsedTime
    uranusObj.rotation.y = revolutionSpeed.uranus * elapsedTime
    neptuneObj.rotation.y = revolutionSpeed.neptune * elapsedTime

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


// =================================================================================================
/*
// Debug
const gui = new dat.GUI()
const folders = {
  camera: gui.addFolder("Camera"),
  sun: gui.addFolder("Sun"),
  mercury: gui.addFolder("Mercury"),
  venus: gui.addFolder("Venus"),
  earth: gui.addFolder("Earth"),
  mars: gui.addFolder("Mars"),
  jupiter: gui.addFolder("Jupiter"),
  saturn: gui.addFolder("Saturn"),
  uranus: gui.addFolder("Uranus"),
  neptune: gui.addFolder("Neptune"),
}
// Camera Attributes
folders.camera.add(camera.position, "z", 10, 100)

// Sun Attributes
folders.sun.add(environment.sun, "radius", 1, 50).onChange(() => {
  sunMesh.geometry.dispose()
  sunMesh.geometry = new THREE.SphereGeometry(environment.sun.radius, 32, 16)
})

// Mercury Attributes
folders.mercury.add(environment.planets.mercury, "radius", 1, 50).onChange(() => {
  mercuryMesh.geometry.dispose()
  mercuryMesh.geometry = new THREE.SphereGeometry(environment.planets.mercury.radius, 32, 16)
})

// Venus Attributes
folders.venus.add(environment.planets.venus, "radius", 1, 50).onChange(() => {
  venusMesh.geometry.dispose()
  venusMesh.geometry = new THREE.SphereGeometry(environment.planets.venus.radius, 32, 16)
})

// Earth Attributes
folders.earth.add(environment.planets.earth, "radius", 1, 50).onChange(() => {
  earthMesh.geometry.dispose()
  earthMesh.geometry = new THREE.SphereGeometry(environment.planets.earth.radius, 32, 16)
})

// Mars Attributes
folders.mars.add(environment.planets.mars, "radius", 1, 50).onChange(() => {
  marsMesh.geometry.dispose()
  marsMesh.geometry = new THREE.SphereGeometry(environment.planets.mars.radius, 32, 16)
})

// Jupiter Attributes
folders.jupiter.add(environment.planets.jupiter, "radius", 1, 50).onChange(() => {
  jupiterMesh.geometry.dispose()
  jupiterMesh.geometry = new THREE.SphereGeometry(environment.planets.jupiter.radius, 32, 16)
})

// Saturn Attributes
folders.saturn.add(environment.planets.saturn, "radius", 1, 50).onChange(() => {
  saturnMesh.geometry.dispose()
  saturnMesh.geometry = new THREE.SphereGeometry(environment.planets.saturn.radius, 32, 16)
})

// Uranus Attributes
folders.uranus.add(environment.planets.uranus, "radius", 1, 50).onChange(() => {
  uranusMesh.geometry.dispose()
  uranusMesh.geometry = new THREE.SphereGeometry(environment.planets.uranus.radius, 32, 16)
})

// Neptune Attributes
folders.neptune.add(environment.planets.neptune, "radius", 1, 50).onChange(() => {
  neptuneMesh.geometry.dispose()
  neptuneMesh.geometry = new THREE.SphereGeometry(environment.planets.neptune.radius, 32, 16)
})
*/