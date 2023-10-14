import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import { ModelsExtensionsId } from '@constants/ModelsExtensionsId';
import { type Model } from '@managers/ThreeAssetsManager';

type ModelLoader = GLTFLoader | OBJLoader | FBXLoader

export class ModelsLoadersProxy {
  private static _GLTFLoader = new GLTFLoader();
  private static _OBJLoader = new OBJLoader();
  private static _FBXLoader = new FBXLoader()

  private static _ModelsLoadersMap = new Map<ModelsExtensionsId, ModelLoader>();
  
  public static Init() {
    ModelsLoadersProxy._ModelsLoadersMap.set(ModelsExtensionsId.GLB, ModelsLoadersProxy._GLTFLoader);
    ModelsLoadersProxy._ModelsLoadersMap.set(ModelsExtensionsId.GLTF, ModelsLoadersProxy._GLTFLoader);
    ModelsLoadersProxy._ModelsLoadersMap.set(ModelsExtensionsId.OBJ, ModelsLoadersProxy._OBJLoader);
    ModelsLoadersProxy._ModelsLoadersMap.set(ModelsExtensionsId.FBX, ModelsLoadersProxy._FBXLoader);
  }

  public static async Load(type: ModelsExtensionsId, path: string): Promise<Model> {
    const loader = ModelsLoadersProxy._ModelsLoadersMap.get(type);
    
    return new Promise((resolve) => {
      loader.load(path, (model: Model) => {
        resolve(model);
      })
    })
  }
}