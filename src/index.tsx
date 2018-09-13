import * as React from "react";
import { render } from "react-dom";
import * as THREE from "three";

class App extends React.Component {
  private container;

  componentDidMount() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0xcccccc);
    this.container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
  }

  render() {
    return <div ref={el => (this.container = el)} />;
  }
}

render(<App />, document.getElementById("app"));
