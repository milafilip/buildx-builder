import * as React from "react";
import * as THREE from "three";
import Ground from "./ground";
import Model from "./model";

export default class Stage extends React.Component {
  private container;
  private camera;
  private renderer;
  private scene = new THREE.Scene();
  private raycaster = new THREE.Raycaster();
  private width = window.innerWidth;
  private height = window.innerHeight;
  private mousePosition = new THREE.Vector2();
  private model = new Model().mesh;

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
    this.scene.add(this.model);

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
    this.mousePosition.x = (clientX / this.width) * 2 - 1;
    this.mousePosition.y = (clientY / this.height) * 2 - 1;

    this.raycaster.setFromCamera(this.mousePosition, this.camera);

    let intersects = this.raycaster.intersectObject(this.model);
    if (intersects.length > 0) {
      console.log("INTERSECTION");
    } else {
      console.log("NO INTERSECTION");
    }
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
