import { ModelLoaderProxy } from "../proxies/ModelLoaderProxy";
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { OBJ } from 'three/examples/jsm/loaders/OBJLoader';
import { FBX } from 'three/examples/jsm/loaders/FBXLoader';
import { ModelsId } from "../constants/ModelsId";
import { PathId } from "../constants/PathId";

enum Extensions {
  GLB = 'glb',
  GLTF = 'gltf',
  OBJ = 'obj',
  FBX = 'fbx',
};

type Models = GLTF | OBJ | FBX;

type LoadingQueueDatas = {
  name: string;
  path: string;
  isModel: boolean;
};

export class LoadersManager {
  private static _LoadingQueue: Map<string, LoadingQueueDatas>;
  private static _ModelsMap: Map<string, Models>;
  
  public static Init() {
    LoadersManager._LoadingQueue = new Map<string, LoadingQueueDatas>();
    LoadersManager._ModelsMap = new Map<string, Models>();
    
    ModelLoaderProxy.Init();
    LoadersManager.AddModelsToQueue();
  }

  public static AddModelsToQueue() {
    for(const k in ModelsId ) {
      const key = k as keyof typeof ModelsId;
      const name = ModelsId[key];
      const loadingQueueDatas: LoadingQueueDatas = {
        name,
        path: PathId.MODELS + name,
        isModel: true,
      }

      LoadersManager._LoadingQueue.set(name, loadingQueueDatas);
    }
  }

  public static async Load() {
    for(const [_, resource] of LoadersManager._LoadingQueue) {
      if(resource.isModel) {
        if(resource.path.includes(Extensions.GLB) || resource.path.includes(Extensions.GLTF)) {
          const model = await ModelLoaderProxy.LoadGLTF(resource.path);
          LoadersManager._ModelsMap.set(resource.name, model);
          console.log(LoadersManager._ModelsMap.get(ModelsId.CHARMANDER))
        }
      }
    }
  }
}