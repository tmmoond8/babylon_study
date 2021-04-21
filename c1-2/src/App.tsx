import React from 'react';
import './App.css';
import * as BABYLON from 'babylonjs';

function App() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  React.useEffect(() => {
    if (canvasRef.current) {
      createScene(canvasRef.current);
    }
  }, [])
  return (
    <div className="App">
      <canvas ref={canvasRef} className="Canvas" />
    </div>
  );
}

export default App;

function createScene(canvas: any) {
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);

  const camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0), scene);
  camera.attachControl(canvas, true);

  const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene);

  BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "both_houses_scene.babylon").then((result) => {
    const house1 = scene.getMeshByName("detached_house");
    house1!.position!.y = 2;
    const house2 = result.meshes[2];
    house2.position.y = 1;
  });

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener('resize', () => {
    engine.resize();
  });

  return scene;
}