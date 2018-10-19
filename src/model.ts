import * as THREE from "three";

export default class Model {
  private geometry = new THREE.BoxGeometry(1, 2, 1);
  private material = new THREE.MeshBasicMaterial({
    color: "red",
    wireframe: false
    // side: THREE.DoubleSide,
    // opacity: 0.4,
    // transparent: true
  });

  mesh: THREE.Mesh;

  constructor() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.mesh.translateY(0.5);
  }
}
