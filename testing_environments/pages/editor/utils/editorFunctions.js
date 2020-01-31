// Sets up the grid Arrays

export const CreateGrid = (tileSize, meshSize) => {
    
    let grid = [];
    let locationX = -meshSize.x  + tileSize;
    let locationZ = -meshSize.z + tileSize;
    let rows = (meshSize.x / tileSize * 2 - 1);
    let cols = (meshSize.z / tileSize * 2 - 1);

    for(let r=0; r < rows; r++){
       
            if(locationX <= meshSize.x && r != 0){
                locationX = locationX + tileSize;
            } else {
                locationX = -(meshSize.x) + tileSize;
            }
        
       let row = []
        
        for(let c=0; c < cols; c++){
            
            if(locationZ <= meshSize.z && c != 0){
                locationZ = locationZ + tileSize;
            } else {
                locationZ = -(meshSize.z) + tileSize;
            }

            
            let location = new BABYLON.Vector3(locationX,0,locationZ);
            
            row.push({
                id: r+'_'+c,
                loc: location
            })
        }
        
        grid.push(row)
    }
    console.log(grid)
    return grid;
    
}


// Creates Boxes

export const GenBoxes = (scene, parent, grid, rayTarget) => {
    
    let box = BABYLON.Mesh.CreateBox("box", 0.45, scene);
    box.isVisible = false;
    box.parent = parent;
    
    var mat_block = new BABYLON.StandardMaterial("mat", scene);
    mat_block.emissiveColor = new BABYLON.Color3(1, 0, 0);
     mat_block.alpha = 0.5;
    
    box.material = mat_block;
    
          for(let r=0; r < grid.length; r++){
            
            for(let c=0; c < grid[r].length; c++){
                
                
                let parentSize = parent.getBoundingInfo().boundingBox.extendSize;    
                let rayVector = new BABYLON.Vector3(grid[r][c].loc.x, 5, grid[r][c].loc.z)
                let rayDirection = new BABYLON.Vector3(0, -1, 0);
                let gridRay = new BABYLON.Ray(rayVector, rayDirection);
                let hit = scene.pickWithRay(gridRay)
                
                //BABYLON.RayHelper.CreateAndShow(gridRay, scene, new BABYLON.Color3(1, 1, 0.1));
                
                var boxInstance = box.createInstance(grid[r][c].id);
                boxInstance.updatable = false;
                boxInstance.position = new BABYLON.Vector3(hit.pickedPoint.x, hit.pickedPoint.y, hit.pickedPoint.z);
            }
            
        }
}