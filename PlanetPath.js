import * as THREE from 'three'

// Class responsible for creating each planet's path ring
export default class PlanetPath {
    // Constructor
    constructor(dist) {
        this.dist = dist
    }

    // Creates and returns path's geometry, material and mesh
    getMesh() {
        if(this.mesh === undefined || this.mesh === null) {
            const geometry = new THREE.RingGeometry(this.dist - 0.05, this.dist + 0.05, 40)
            const material = new THREE.MeshBasicMaterial({ color: 0x767676, side: THREE.DoubleSide, transparent: true, opacity: 0.4 })
            this.mesh = new THREE.Mesh(geometry, material)
            this.mesh.rotateX(Math.PI / 2)
        }
        return this.mesh
    }
}