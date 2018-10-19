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

var lineMaterial = new THREE.LineBasicMaterial({
  color: 0x0000ff
});
var lineGeometry = new THREE.Geometry();
lineGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
lineGeometry.vertices.push(new THREE.Vector3(1, 1, 0));
lineGeometry.vertices.push(new THREE.Vector3(0, 1, 0));

var line = new THREE.Line(lineGeometry, lineMaterial);

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
  private intersections = [];

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
    this.scene.add(line);

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

    this.intersections = this.raycaster.intersectObject(this.model);
    if (this.intersections.length > 0) {
      const {
        point,
        face,
        object: {
          geometry: { vertices }
        }
      } = this.intersections[0];

      line.geometry.vertices[0] = vertices[face.a];
      line.geometry.vertices[1] = vertices[face.b];
      line.geometry.vertices[2] = vertices[face.c];

      line.geometry.verticesNeedUpdate = true;
      this.renderer.render(this.scene, this.camera);
      // console.log(
      //   vertices[face.a].clone().multiplyScalar(face.normal.x),
      //   vertices[face.b].clone().multiplyScalar(face.normal.y),
      //   vertices[face.c].clone().multiplyScalar(face.normal.z)
      // );
      // console.log(this.intersections[0]);
      // console.log({ face, vertices });
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
