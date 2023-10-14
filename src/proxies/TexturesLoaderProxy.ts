import * as THREE from 'three';

export class TexturesLoaderProxy {
  private static _TextureLoader: THREE.TextureLoader;

  public static Init() {
    TexturesLoaderProxy._TextureLoader = new THREE.TextureLoader();
  }

  public static async Load(path: string): Promise<THREE.Texture> {
    return new Promise((resolve) => {
      TexturesLoaderProxy._TextureLoader.load(path,
        (texture) => {
          resolve(texture)
        })
    });
  }
}