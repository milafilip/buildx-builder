import * as THREE from "three";

function Moveable() {
  return function(target) {
    target.prototype.move = function() {
      console.log("move!");
    };
  };
}

@Moveable()
export default class BreezeBlock {
  private geometry = new THREE.BoxGeometry(0.44, 0.215, 0.215);
  private material = new THREE.MeshBasicMaterial({
    color: 0x9e9c9b
  });

  mesh: THREE.Mesh;

  constructor() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.mesh.translateY(0.5);
  }
}
