import * as THREE from "three";

export default class Ground {
  mesh: THREE.Mesh;

  constructor(size = 4) {
    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(size, size),
      new THREE.MeshBasicMaterial({ color: "#dddddd" })
    );
    this.mesh.rotation.x = -Math.PI / 2;
  }
}
