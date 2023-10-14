import { ModelsLoadersProxy } from "@proxies/ModelsLoadersProxy";
import { ModelsId } from "@constants/ModelsId";
import { PathId } from "@constants/PathId";
import { ModelsExtensionsId } from "@constants/ModelsExtensionsId";
import { TexturesId } from "@constants/TexturesId";
import { TexturesLoaderProxy } from "@proxies/TexturesLoaderProxy";
import { type GLTF } from 'three-stdlib';

export type Model = GLTF;

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
    ModelsLoadersProxy.Init();
    TexturesLoaderProxy.Init();

    ThreeAssetsManager.AddModelsToQueue();
    ThreeAssetsManager.AddTexturesToQueue();
  }

  public static AddTexturesToQueue() {
    for(const k in TexturesId) {
      const key = k as keyof typeof TexturesId;
      const name = TexturesId[key];

      const loadingQueueDatas: LoadingQueueDatas = {
        name,
        path: PathId.TEXTURES + name,
        isModel: false
      }

      ThreeAssetsManager._LoadingQueue.set(name, loadingQueueDatas)
    }
  }

  public static GetTexture(textureId: TexturesId): THREE.Texture {
    return ThreeAssetsManager._TexturesMap.get(textureId) as THREE.Texture;
  }

  public static GetAllTextures(): Map<TexturesId, THREE.Texture> {
    return ThreeAssetsManager._TexturesMap;
  }

  public static AddModelsToQueue() {
    for(const k in ModelsId ) {
      const key = k as keyof typeof ModelsId;
      const name = ModelsId[key];
      const type = name.split('.')[1].toUpperCase() as keyof typeof ModelsExtensionsId;

      const loadingQueueDatas: LoadingQueueDatas = {
        type,
        name,
        path: PathId.MODELS + name,
        isModel: true,
      }

      ThreeAssetsManager._LoadingQueue.set(name, loadingQueueDatas);
    }
  }

  public static GetModel(modelId: ModelsId): Model {
    return ThreeAssetsManager._ModelsMap.get(modelId) as Model;
  }

  public static GetAllModels(): Map<ModelsId, Model> {
    return ThreeAssetsManager._ModelsMap;
  }

  public static async Load(): Promise<void> {
    for(const [_, resource] of ThreeAssetsManager._LoadingQueue) {
      // Load textures
      if(resource.isModel) {
        const type = resource.type as keyof typeof ModelsExtensionsId;
        const model = await ModelsLoadersProxy.Load(ModelsExtensionsId[type], resource.path);
        ThreeAssetsManager._ModelsMap.set(resource.name as ModelsId, model);
      }

      // Load textures
      else {
        const texture = await TexturesLoaderProxy.Load(resource.path);
        ThreeAssetsManager._TexturesMap.set(resource.name as TexturesId, texture);
      }
      
    }
  }
}