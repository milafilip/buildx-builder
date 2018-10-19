import * as React from "react";
import * as THREE from "three";
import Model from "./model";

type IProps = {
  bgColor: number | string;
  antialias: boolean;
  cameraFOV: number;
  cameraNear: number;
  cameraFar: number;
};
export default class Stage extends React.Component<IProps> {
  static defaultProps: IProps = {
    antialias: true,
    bgColor: 0xcccccc,
    cameraFar: 1000,
    cameraFOV: 90,
    cameraNear: 0.1
  };

  private camera;
  private container;
  private height = window.innerHeight;
  private model = new Model().mesh;
  private mousePosition = new THREE.Vector2();
  private raycaster = new THREE.Raycaster();
  private renderer;
  private scene = new THREE.Scene();
  private width = window.innerWidth;

  constructor(props, defaultProps) {
    super(props, defaultProps);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.camera = new THREE.PerspectiveCamera(
      this.props.cameraFOV,
      this.width / this.height,
      this.props.cameraNear,
      this.props.cameraFar
    );
    this.camera.position.set(3, 3, 3);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    this.renderer = new THREE.WebGLRenderer({
      antialias: this.props.antialias
    });
    this.renderer.setClearColor(this.props.bgColor);

    this.container.appendChild(this.renderer.domElement);

    this.scene.add(this.model);

    window.addEventListener("resize", this.handleResize);
    this.handleResize();
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
