import Loader from '../../utils/loader.js';
import { KeyboardMovement } from '../../utils/controls.js';
import PlayerConfig from '../../configs/player.js';



const Test = function(engine, canvas) { 
    
        let loaded = false;
        // Create a basic BJS Scene object
        let scene = new BABYLON.Scene(engine);
        // Create a FreeCamera, and set its position to {x: 0, y: 5, z: -10}
        let camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), scene);
        // Target the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        // Attach the camera to the canvas
        camera.attachControl(canvas, false);
        
         Loader(scene, 'ground', '/poc/poc1/scenes/test/assets/', 'ground.babylon', () => {});
         Loader(scene, 'player', '/poc/poc1/scenes/test/assets/', 'player.babylon', () => {
             start();
         });
        
        // Main Scene Listener
        let start = () => {
            
            let light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), scene);
            let player = scene.getMeshByName('player');
            let ground = scene.getMeshByName('ground');
            
            player.isPickable = false;
            
           
            //Player Movement
            
            KeyboardMovement(scene,player,PlayerConfig)
            
            
            
        };
        
        
        return scene;
        
}

export default Test;