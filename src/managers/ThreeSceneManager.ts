import { CamerasProxy } from '@proxies/CamerasProxy';
import { RendererProxy } from '@proxies/RendererProxy';
import * as THREE from 'three';

export class ThreeSceneManager {
  public static Canvas: HTMLCanvasElement; 
  public static Scene = new THREE.Scene();
  private static _SceneObjectsMap = new Map<string, THREE.Object3D>();

  public static async Init(canvas: HTMLCanvasElement) {
    ThreeSceneManager.Canvas = canvas;
    CamerasProxy.Init('perspective');
    RendererProxy.Init();

    const mesh =  new THREE.Mesh(
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshBasicMaterial({ color:'red' })
    )
    mesh.position.z = -5;

    const callback = () => {
      mesh.rotation.y += 0.1
    }

    RendererProxy.AddOnRenderCallback(callback)

    ThreeSceneManager.AddObject('cube', mesh)
    ThreeSceneManager.CreateScene();
  }

  public static AddObject(id: string, object: THREE.Object3D): void {
    ThreeSceneManager._SceneObjectsMap.set(id, object);
  }

  public static CreateScene(): void {
    for(const [_, value] of ThreeSceneManager._SceneObjectsMap) {
      ThreeSceneManager.Scene.add(value)
    }
  }
}