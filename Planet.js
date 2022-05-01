import * as THREE from 'three'

// Class responsible for creating each planet's mesh
export default class Planet {
    // Constructor
    constructor(planetRadius, posX, imgRoute) {
        this.planetRadius = planetRadius
        this.posX = posX
        this.imgRoute = imgRoute
    }

    // Creates and returns planet's geometry, texture, material and mesh
    getMesh() {
        if(this.mesh === undefined || this.mesh === null) {
            const geometry = new THREE.SphereGeometry(this.planetRadius)
            const texture = new THREE.TextureLoader().load(this.imgRoute)
            const material = new THREE.MeshBasicMaterial({ map: texture })
            this.mesh = new THREE.Mesh(geometry, material)
            this.mesh.position.x += this.posX
        }
        return this.mesh
    }
}