import * as THREE from "three";

export default class Entity {
  private geometry = new THREE.BoxGeometry(1, 1, 1);
  private material = new THREE.MeshBasicMaterial({
    color: "red",
    wireframe: true
  });
  mesh;

  constructor() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }
}
