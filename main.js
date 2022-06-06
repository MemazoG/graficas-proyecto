import './style.css'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls' // Orbit Controls allow the user to move the camera around
import starsImg from "./images/stars.jpg"
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
import Planet from "./Planet" // Class that creates planets
import environment from "./environmentSetup" // File with default attributes for each element to be modified with dat.gui
import { sunSize, mercurySize, venusSize, earthSize, marsSize, jupiterSize, saturnSize, uranusSize, neptuneSize } from './scaleLogic'
import { mercuryDist, venusDist, earthDist, marsDist, jupiterDist, saturnDist, uranusDist, neptuneDist } from './scaleLogic'
import { mercuryRotSpeed, venusRotSpeed, earthRotSpeed, marsRotSpeed, jupiterRotSpeed, saturnRotSpeed, uranusRotSpeed, neptuneRotSpeed } from './scaleLogic'
import { mercuryRevSpeed, venusRevSpeed, earthRevSpeed, marsRevSpeed, jupiterRevSpeed, saturnRevSpeed, uranusRevSpeed, neptuneRevSpeed } from './scaleLogic'

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

// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true
controls.minDistance = 5
controls.maxDistance = 50

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

// Stars
const starsGeometry = new THREE.SphereGeometry(50, 32, 32)
const starsTexture = new THREE.TextureLoader().load(starsImg)
const starsMaterial = new THREE.MeshBasicMaterial({ map: starsTexture })
const starsMesh = new THREE.Mesh(starsGeometry, starsMaterial)
starsMesh.material.side = THREE.BackSide
solarSystem.add(starsMesh)

// Sun
const sunGeometry = new THREE.SphereGeometry(sunSize, 32, 16)
const sunTexture = new THREE.TextureLoader().load(sunImg)
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture })
const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial)
solarSystem.add(sunMesh)

// Mercury
const mercury = new Planet(mercurySize, mercuryDist, mercuryImg)
const mercuryMesh = mercury.getMesh()
mercurySystem.add(mercuryMesh)
const mercuryObj = new THREE.Object3D(); // Mercury system will rotate around this object, which is placed at the origin (0, 0, 0)
mercuryObj.add(mercurySystem)

// Venus
const venus = new Planet(venusSize, venusDist, venusImg)
const venusMesh = venus.getMesh()
venusSystem.add(venusMesh)
const venusObj = new THREE.Object3D() // Venus system will rotate around this object, which is placed at the origin (0, 0, 0)
venusObj.add(venusSystem)

// Earth
const earth = new Planet(earthSize, earthDist, earthImg)
const earthMesh = earth.getMesh()
earthSystem.add(earthMesh)
const earthObj = new THREE.Object3D() // Earth system will rotate around this object, which is placed at the origin (0, 0, 0)
earthObj.add(earthSystem)

// Mars
const mars = new Planet(marsSize, marsDist, marsImg)
const marsMesh = mars.getMesh()
marsSystem.add(marsMesh)
const marsObj = new THREE.Object3D() // Mars system will rotate around this object, which is placed at the origin (0, 0, 0)
marsObj.add(marsSystem)

// Jupiter
const jupiter = new Planet(jupiterSize, jupiterDist, jupiterImg)
const jupiterMesh = jupiter.getMesh()
jupiterSystem.add(jupiterMesh)
const jupiterObj = new THREE.Object3D() // Jupiter system will rotate around this object, which is placed at the origin (0, 0, 0)
jupiterObj.add(jupiterSystem)

// Saturn
const saturn = new Planet(saturnSize, saturnDist, saturnImg)
const saturnMesh = saturn.getMesh()
saturnSystem.add(saturnMesh)
const saturnObj = new THREE.Object3D() // Saturn system will rotate around this object, which is placed at the origin (0, 0, 0)
saturnObj.add(saturnSystem)

// Uranus
const uranus = new Planet(uranusSize, uranusDist, uranusImg)
const uranusMesh = uranus.getMesh()
uranusSystem.add(uranusMesh)
const uranusObj = new THREE.Object3D() // Uranus system will rotate around this object, which is placed at the origin (0, 0, 0)
uranusObj.add(uranusSystem)

// Neptune
const neptune = new Planet(neptuneSize, neptuneDist, neptuneImg)
const neptuneMesh = neptune.getMesh()
neptuneSystem.add(neptuneMesh)
const neptuneObj = new THREE.Object3D() // Neptune system will rotate around this object, which is placed at the origin (0, 0, 0)
neptuneObj.add(neptuneSystem)


// Add each planet's system and the stars to the solar system group
//solarSystem.add(mercurySystem, venusSystem, earthSystem, marsSystem, jupiterSystem, saturnSystem, uranusSystem, neptuneSystem)
solarSystem.add(mercuryObj, venusObj, earthObj, marsObj, jupiterObj, saturnObj, uranusObj, neptuneObj)
scene.add(solarSystem)

// =================================================================================================
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

// Animate
const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update planet rotations around themselves
     starsMesh.rotation.y = 0.001 * elapsedTime
     sunMesh.rotation.y = 0.005 * elapsedTime
     mercuryMesh.rotation.y = mercuryRotSpeed * elapsedTime
     venusMesh.rotation.y = venusRotSpeed * elapsedTime
     earthMesh.rotation.y = earthRotSpeed * elapsedTime
     marsMesh.rotation.y = marsRotSpeed * elapsedTime
     jupiterMesh.rotation.y = jupiterRotSpeed * elapsedTime
     saturnMesh.rotation.y = saturnRotSpeed * elapsedTime
     uranusMesh.rotation.y = uranusRotSpeed * elapsedTime
     neptuneMesh.rotation.y = neptuneRotSpeed * elapsedTime

    // Update planet revolutions around the Sun
    mercuryObj.rotation.y = mercuryRevSpeed * elapsedTime
    venusObj.rotation.y = venusRevSpeed * elapsedTime
    earthObj.rotation.y = earthRevSpeed  * elapsedTime
    marsObj.rotation.y = marsRevSpeed * elapsedTime
    jupiterObj.rotation.y = jupiterRevSpeed * elapsedTime
    saturnObj.rotation.y = saturnRevSpeed * elapsedTime
    uranusObj.rotation.y = uranusRevSpeed * elapsedTime
    neptuneObj.rotation.y = neptuneRevSpeed * elapsedTime

    // Update Orbital Controls
     controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
