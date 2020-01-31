
import Test from './scenes/test/test.js'

    let canvas = document.getElementById('renderCanvas');
    // Load the 3D engine
    let engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });

    
    let scene = Test(engine, canvas);

    // run the render loop
    engine.runRenderLoop(function() {
        scene.render();
    });
    // the canvas/window resize event handler
    window.addEventListener('resize', function() {
        engine.resize();
    });