import React, { Component } from "react";
import * as BABYLON from "babylonjs";

var scene;
/**
 * Example temnplate of using Babylon JS with React
 */
class Engine extends Component { 
  constructor(props) {
    super(props);
    this.state = { useWireFrame: false, shouldAnimate: false };
  }

  componentDidMount = () => {
    // start ENGINE
    this.engine = new BABYLON.Engine(this.canvas, true);
    //Create Scene
    scene = new BABYLON.Scene(this.engine);
    
    this.addCamera()
    this.addLight()

    // Render Loop
    this.engine.runRenderLoop(() => {
      scene.render();
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize, false);
  }

  onWindowResize = event => {
    this.engine.resize();
  };
  
  /**
   * Add Lights
   */
  addLight = () => {
    //---------- LIGHT---------------------
    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 10, 0),
      scene
    );
  };

    /**
   * Add Camera
   */
  addCamera = () => {
    // ---------------ArcRotateCamera or Orbit Control----------
    var camera = new BABYLON.ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 4,
      4,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.inertia = 0;
    camera.angularSensibilityX = 250;
    camera.angularSensibilityY = 250;

    // This attaches the camera to the canvas
    camera.attachControl(this.canvas, true);
    camera.setPosition(new BABYLON.Vector3(5, 5, 5));
  };


  render() {
    return (
      <canvas
        style={{ width: window.innerWidth, height: window.innerHeight }}
        ref={canvas => {
          this.canvas = canvas;
        }}
      />
    );
  }
}

export default Engine;