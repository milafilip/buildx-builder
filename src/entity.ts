import * as THREE from "three";

export default class Entity {
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshBasicMaterial({
    color: "red",
    wireframe: true
  });

  mesh: THREE.Mesh;

  constructor() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.translateY(0.5);
  }
}
