import * as React from "react";
import * as THREE from "three";
import Entity from "./entity";

export default class Stage extends React.Component {
  private container;
  private camera;
  private renderer;
  private scene = new THREE.Scene();

  componentDidMount() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(3, 3, 3);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setClearColor(0xcccccc);

    this.container.appendChild(this.renderer.domElement);

    this.scene.add(new Entity().mesh);

    window.addEventListener("resize", this.handleResize.bind(this));
    this.handleResize.bind(this);
  }

  handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer.render(this.scene, this.camera);
  }

  handleMouseMove({ clientX: x, clientY: y }) {
    console.log({ x, y });
  }

  render() {
    return (
      <div
        ref={el => (this.container = el)}
        onMouseMove={this.handleMouseMove.bind(this)}
      />
    );
  }
}
