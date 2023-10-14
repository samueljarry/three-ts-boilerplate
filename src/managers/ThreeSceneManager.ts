import { CamerasProxy } from '@proxies/CamerasProxy';
import { RendererProxy } from '@proxies/RendererProxy';
import * as THREE from 'three';

export class ThreeSceneManager {
  private static _Canvas: HTMLCanvasElement; 
  private static _Scene = new THREE.Scene();
  private static _SceneObjectsMap = new Map<string, THREE.Object3D>();

  public static Init(canvas: HTMLCanvasElement) {
    ThreeSceneManager._Canvas = canvas;
    CamerasProxy.Init('perspective');
    RendererProxy.Init();
    
    // const charmander = ThreeAssetsManager.GetModel(ModelsId.CHARMANDER);
    // ThreeSceneManager.AddObject(ModelsId.CHARMANDER, charmander.scene)
  }

  public static GetCanvas(): HTMLCanvasElement {
    return ThreeSceneManager._Canvas;
  }

  public static AddObject(id: string, object: THREE.Object3D): void {
    ThreeSceneManager._SceneObjectsMap.set(id, object);
  }

  public static CreateScene(): void {
    for(const [_, value] of ThreeSceneManager._SceneObjectsMap) {
      ThreeSceneManager._Scene.add(value)
    }
  }
}