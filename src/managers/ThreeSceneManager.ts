import { CamerasProxy } from '@proxies/CamerasProxy';
import { RendererProxy } from '@proxies/RendererProxy';
import * as THREE from 'three';
import { Charmander } from '@views/three/Charmander';
import { ModelsId } from '@constants/ModelsId';
import { Objects3DId } from '@constants/Objects3DId';

export class ThreeSceneManager {
  public static Canvas: HTMLCanvasElement; 
  public static Scene = new THREE.Scene();
  private static _SceneObjectsMap = new Map<ModelsId | Objects3DId, THREE.Object3D>();
  private static _isCreated: boolean = false;

  public static async Init(canvas: HTMLCanvasElement) {
    ThreeSceneManager.Canvas = canvas;
    CamerasProxy.Init('perspective');
    RendererProxy.Init();

    new Charmander();
    ThreeSceneManager.CreateScene();
  }

  public static AddObject(id: ModelsId | Objects3DId, object: THREE.Object3D): void {
    ThreeSceneManager._SceneObjectsMap.set(id, object);

    if(ThreeSceneManager._isCreated) {
      ThreeSceneManager._UpdateScene(object, 'add');
    }
  }

  public static RemoveObject(id: ModelsId | Objects3DId): void {
    const object = ThreeSceneManager._SceneObjectsMap.get(id) as THREE.Object3D;
    ThreeSceneManager._SceneObjectsMap.delete(id);

    ThreeSceneManager._UpdateScene(object, 'remove');
  }

  public static CreateScene(): void {
    for(const [_, value] of ThreeSceneManager._SceneObjectsMap) {
      ThreeSceneManager.Scene.add(value)
    }

    ThreeSceneManager._isCreated = true;
  }

  private static _UpdateScene(object: THREE.Object3D, addOrRemove: 'remove' | 'add') {
    ThreeSceneManager.Scene[addOrRemove](object);
  }
}