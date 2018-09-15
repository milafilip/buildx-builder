import * as THREE from "three";

export default function Brick() {
  const geometry = new THREE.BoxGeometry(0.44, 0.215, 0.215);
  const material = new THREE.MeshBasicMaterial({
    color: "brown"
  });
  return {
    move,
    mesh: new THREE.Mesh(geometry, material)
  };
}

// Brick.prototype.move = function() {
//   console.log("move brick!");
// };

function move() {
  console.log("move brick!");
}
