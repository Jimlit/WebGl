
/*
------------ WASD MOVEMENT --------------
*/

export const KeyboardMovement = (scene, target, config) => {

    let rightVect, leftVect, downVect, upVect;


    scene.onBeforeRenderObservable.add(function() {

        rightVect = new BABYLON.Vector3(target.position.x + 0.2, target.position.y, target.position.z);
        leftVect = new BABYLON.Vector3(target.position.x - 0.2, target.position.y, target.position.z);
        upVect = new BABYLON.Vector3(target.position.x, target.position.y, target.position.z + 0.2);
        downVect = new BABYLON.Vector3(target.position.x, target.position.y, target.position.z - 0.2);

    });


    const move = (direction) => {

        let rayDirection = new BABYLON.Vector3(0, -1, 0);

        let moveRayGround = new BABYLON.Ray(direction, rayDirection);
        let hit = scene.pickWithRay(moveRayGround);

        BABYLON.RayHelper.CreateAndShow(moveRayGround, scene, new BABYLON.Color3(1, 1, 0.1));

        target.position = new BABYLON.Vector3(hit.pickedPoint.x, hit.pickedPoint.y + target.scaling.y, hit.pickedPoint.z);
    }


    /****************************Key Control Multiple Keys************************************************/

    var map = {}; //object for multiple key presses
    
    scene.actionManager = new BABYLON.ActionManager(scene);

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function(evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));

    scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function(evt) {
        map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
    }));


    /****************************Move Target******************************************************/

    scene.registerAfterRender(function() {

        if ((map["w"] || map["W"])) {
             move(upVect);
        };

        if ((map["d"] || map["D"])) {
             move(rightVect);
        };

        if ((map["a"] || map["A"])) {
            move(leftVect);
        };

        if ((map["s"] || map["S"])) {
            move(downVect);
        };

    });
}
