import * as THREE from 'three';

export class TexturesLoader {
  private static _TextureLoader: THREE.TextureLoader;

  public static Init() {
    TexturesLoader._TextureLoader = new THREE.TextureLoader();
  }

  public static async Load(path: string): Promise<THREE.Texture> {
    return new Promise((resolve) => {
      TexturesLoader._TextureLoader.load(path,
        (texture) => {
          resolve(texture)
        })
    });
  }
}