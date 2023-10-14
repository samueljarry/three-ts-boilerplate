import * as THREE from 'three';
import { ThreeSceneManager } from "@managers/ThreeSceneManager"

export class CamerasProxy {
  private static readonly _FOV = 45;
  private static readonly _NEAR = 1;
  private static readonly _FAR = 1000;
  private static _Camera: THREE.OrthographicCamera | THREE.PerspectiveCamera;

  public static Init(type: 'orthographic'): THREE.OrthographicCamera
  public static Init(type: 'perspective'): THREE.PerspectiveCamera
  public static Init(type: string) {
    switch(type) {
      case 'orthographic':
        CamerasProxy._Camera = CamerasProxy._CreateOrthographicCamera();
        break;
      case 'perspective':
        CamerasProxy._Camera = CamerasProxy._CreatePerspectiveCamera();
        break;
      default:
        throw new Error(`Camera type ${type} is not supported by CameraProxy.ts`);
    }

    return CamerasProxy._Camera;
  }

  private static _CreateOrthographicCamera(): THREE.OrthographicCamera {
    const canvas = ThreeSceneManager.GetCanvas();

    return new THREE.OrthographicCamera(
      canvas.offsetWidth / -2,
      canvas.offsetWidth / 2,
      canvas.offsetHeight / 2,
      canvas.offsetHeight / -2,
      CamerasProxy._NEAR,
      CamerasProxy._FAR
    )
  }

  private static _CreatePerspectiveCamera(): THREE.PerspectiveCamera {
    const canvas = ThreeSceneManager.GetCanvas();

    return new THREE.PerspectiveCamera(
      CamerasProxy._FOV,
      canvas.offsetWidth / canvas.offsetHeight,
      CamerasProxy._NEAR,
      CamerasProxy._FAR
    )
  }
}