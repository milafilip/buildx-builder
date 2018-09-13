import * as React from "react";
import { render } from "react-dom";
import * as THREE from "three";

class App extends React.Component {
  private container;
  private camera;
  private renderer;

  componentDidMount() {
    const scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    this.renderer.setClearColor(0xcccccc);
    this.container.appendChild(this.renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: "red" });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    this.camera.position.set(3, 3, 3);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer.render(scene, this.camera);

    window.addEventListener("resize", this.handleResize.bind(this));
    this.handleResize.bind(this);
  }

  handleResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  render() {
    return <div ref={el => (this.container = el)} />;
  }
}

render(<App />, document.getElementById("app"));
