import { ModelsLoader } from "../loaders/ModelsLoader";
import { ModelsId } from "@constants/ModelsId";
import { ModelsExtensionsId } from "@constants/ModelsExtensionsId";
import { TexturesId } from "@constants/TexturesId";
import { TexturesLoader } from "@loaders/TexturesLoader";
import { Group, Object3DEventMap } from "three";
import { GLTF } from 'three/addons/loaders/GLTFLoader.js'

export type Model = Group<Object3DEventMap> | GLTF;

type LoadingQueueDatas = {
  type?: keyof typeof ModelsExtensionsId;
  name: string;
  path: string;
  isModel: boolean;
};

export class ThreeAssetsManager {
  private static _LoadingQueue = new Map<string, LoadingQueueDatas>();
  private static _ModelsMap = new Map<ModelsId, Model>();
  private static _TexturesMap = new Map<TexturesId, THREE.Texture>();
  
  public static Init() {
    ModelsLoader.Init();
    TexturesLoader.Init();
  }

  public static AddTexture(textureId: TexturesId, path: string) {
    const name = textureId;

    const loadingQueueDatas: LoadingQueueDatas = {
      name,
      path,
      isModel: false
    }

    ThreeAssetsManager._LoadingQueue.set(name, loadingQueueDatas)
  }

  public static GetTexture(textureId: TexturesId): THREE.Texture {
    return ThreeAssetsManager._TexturesMap.get(textureId) as THREE.Texture;
  }

  public static GetAllTextures(): Map<TexturesId, THREE.Texture> {
    return ThreeAssetsManager._TexturesMap;
  }

  public static AddModel(modelId: ModelsId, path: string) {
    const name = modelId;
    const type = name.split('.')[1].toUpperCase() as keyof typeof ModelsExtensionsId;

    const loadingQueueDatas: LoadingQueueDatas = {
      type,
      name,
      path,
      isModel: true,
    }

    ThreeAssetsManager._LoadingQueue.set(name, loadingQueueDatas);
  }

  public static GetModel(modelId: ModelsId): Model {
    return ThreeAssetsManager._ModelsMap.get(modelId) as Model;
  }

  public static GetAllModels(): ReadonlyMap<ModelsId, Model> {
    return ThreeAssetsManager._ModelsMap;
  }

  public static async Load(): Promise<void> {
    for(const [_, resource] of ThreeAssetsManager._LoadingQueue) {
      // Load models
      if(resource.isModel) {
        const type = resource.type as keyof typeof ModelsExtensionsId;
        const model = await ModelsLoader.Load(ModelsExtensionsId[type], resource.path);
        ThreeAssetsManager._ModelsMap.set(resource.name as ModelsId, model);
      }

      // Load textures
      else {
        const texture = await TexturesLoader.Load(resource.path);
        ThreeAssetsManager._TexturesMap.set(resource.name as TexturesId, texture);
      }
      
    }
  }
}