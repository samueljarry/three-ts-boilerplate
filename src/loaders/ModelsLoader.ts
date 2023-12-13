import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';

import { ModelsExtensionsId } from '@constants/ModelsExtensionsId';
import { type Model } from '@managers/ThreeAssetsManager';

type Model3DLoader = GLTFLoader | OBJLoader | FBXLoader

export class ModelsLoader {
  private static _GLTFLoader = new GLTFLoader();
  private static _OBJLoader = new OBJLoader();
  private static _FBXLoader = new FBXLoader()

  private static _ModelsLoadersMap = new Map<ModelsExtensionsId, Model3DLoader>();
  
  public static Init() {
    ModelsLoader._ModelsLoadersMap.set(ModelsExtensionsId.GLB, ModelsLoader._GLTFLoader);
    ModelsLoader._ModelsLoadersMap.set(ModelsExtensionsId.GLTF, ModelsLoader._GLTFLoader);
    ModelsLoader._ModelsLoadersMap.set(ModelsExtensionsId.OBJ, ModelsLoader._OBJLoader);
    ModelsLoader._ModelsLoadersMap.set(ModelsExtensionsId.FBX, ModelsLoader._FBXLoader);
  }

  public static async Load(type: ModelsExtensionsId, path: string): Promise<Model> {
    const loader = ModelsLoader._ModelsLoadersMap.get(type) as Model3DLoader;
    
    return new Promise((resolve) => {
      loader.load(path, (model: Model) => {
        resolve(model);
      })
    })
  }
}