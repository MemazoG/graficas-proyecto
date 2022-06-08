import * as THREE from 'three'

// Class responsible for creating each planet's mesh
export default class Planet {
    // Constructor with bump map
    constructor(planetRadius, posX, imgRoute, bumpMap) {
        this.planetRadius = planetRadius
        this.posX = posX
        this.imgRoute = imgRoute
        this.bumpMap = bumpMap
    }

    // Creates and returns planet's geometry, texture, material and mesh
    getMesh() {
        if(this.mesh === undefined || this.mesh === null) {
            const geometry = new THREE.SphereGeometry(this.planetRadius, 32, 16)
            const texture = new THREE.TextureLoader().load(this.imgRoute)
            let material = (this.bumpMap === undefined) ? 
                new THREE.MeshStandardMaterial({ map: texture }) :
                new THREE.MeshStandardMaterial({ map: texture, bumpMap: new THREE.TextureLoader().load(this.bumpMap), bumpScale: 0.1 })
            this.mesh = new THREE.Mesh(geometry, material)
            this.mesh.position.x += this.posX
        }
        return this.mesh
    }
}