import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class ModelLoaderProxy {
  private static _GLTFLoader: GLTFLoader;
  
  public static Init() {
    ModelLoaderProxy._GLTFLoader = new GLTFLoader();
  }

  public static async LoadGLTF(path: string) {
    return await ModelLoaderProxy._GLTFLoader.loadAsync(path);
  }
}