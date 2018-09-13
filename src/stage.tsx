import * as React from "react";
import * as THREE from "three";
import Entity from "./entity";
import Ground from "./ground";

export default class Stage extends React.Component {
  private container;
  private camera;
  private renderer;
  private scene = new THREE.Scene();
  private raycaster = new THREE.Raycaster();
  private width = window.innerWidth;
  private height = window.innerHeight;
  private mouseX;
  private mouseY;

  componentDidMount() {
    this.camera = new THREE.PerspectiveCamera(
      90,
      this.width / this.height,
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

    this.scene.add(new Ground().mesh);
    this.scene.add(new Entity().mesh);

    window.addEventListener("resize", this.handleResize.bind(this));
    this.handleResize.bind(this);
  }

  handleResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
    this.renderer.render(this.scene, this.camera);
  }

  handleMouseMove({ clientX, clientY }) {
    this.mouseX = clientX;
    this.mouseY = clientY;
    console.log(this.mouseX, this.mouseY);
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
