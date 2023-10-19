import { CamerasProxy } from '@proxies/CamerasProxy';
import { RendererProxy } from '@proxies/RendererProxy';
import * as THREE from 'three';
import { ModelsId } from '@constants/ModelsId';
import { Objects3DId } from '@constants/Objects3DId';

export class ThreeSceneProxy {
  public static Canvas: HTMLCanvasElement; 
  public static Scene = new THREE.Scene();
  private static _SceneObjectsMap = new Map<ModelsId | Objects3DId, THREE.Object3D>();
  private static _isCreated: boolean = false;

  public static async Init(canvas: HTMLCanvasElement) {
    ThreeSceneProxy.Canvas = canvas;
  }

  public static AddObject(id: ModelsId | Objects3DId, object: THREE.Object3D): void {
    ThreeSceneProxy._SceneObjectsMap.set(id, object);

    if(ThreeSceneProxy._isCreated) {
      ThreeSceneProxy._UpdateScene(object, 'add');
    }
  }

  public static RemoveObject(id: ModelsId | Objects3DId): void {
    const object = ThreeSceneProxy._SceneObjectsMap.get(id) as THREE.Object3D;
    ThreeSceneProxy._SceneObjectsMap.delete(id);

    ThreeSceneProxy._UpdateScene(object, 'remove');
  }

  public static CreateScene(): void {
    for(const [_, value] of ThreeSceneProxy._SceneObjectsMap) {
      ThreeSceneProxy.Scene.add(value)
    }

    ThreeSceneProxy._isCreated = true;
  }

  private static _UpdateScene(object: THREE.Object3D, addOrRemove: 'remove' | 'add') {
    ThreeSceneProxy.Scene[addOrRemove](object);
  }
}