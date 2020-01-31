
const Loader = (scene,taskName,root,fileName,finishFnc) => {
    let assetsManager = new BABYLON.AssetsManager(scene);

    let payload = assetsManager.addMeshTask(taskName, "", root, fileName);

    payload.onSuccess = function(task) {
        console.log(task.loadedMeshes)
    }

    payload.onError = function(task, message, exception) {
        console.log(message, exception);
    }

    assetsManager.load();
    
    assetsManager.onFinish = finishFnc
}

export default Loader
