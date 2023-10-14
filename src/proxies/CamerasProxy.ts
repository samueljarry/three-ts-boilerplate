import * as THREE from 'three';
import { ThreeSceneManager } from "@managers/ThreeSceneManager"
import { EventsManager } from '@managers/EventsManager';
import { EventsId } from '@constants/EventsId';

export class CamerasProxy {
  private static readonly _FOV = 45;
  private static readonly _NEAR = 1;
  private static readonly _FAR = 1000;
  public static Camera: THREE.OrthographicCamera | THREE.PerspectiveCamera;

  public static async Init(type: 'orthographic'): Promise<THREE.OrthographicCamera>;
  public static async Init(type: 'perspective'): Promise<THREE.PerspectiveCamera>;
  public static async Init(type: string) {
    switch(type) {
      case 'orthographic':
        CamerasProxy.Camera = CamerasProxy._CreateOrthographicCamera();
        break;
      case 'perspective':
        CamerasProxy.Camera = CamerasProxy._CreatePerspectiveCamera();
        break;
      default:
        throw new Error(`Camera type ${type} is not supported by CameraProxy.ts`);
    }

    ThreeSceneManager.AddObject('Camera', CamerasProxy.Camera);
    EventsManager.AddEventCallback(EventsId.RESIZE, CamerasProxy._OnResize);

    return CamerasProxy.Camera;
  }

  private static _CreateOrthographicCamera(): THREE.OrthographicCamera {
    return new THREE.OrthographicCamera(
      -1,
      1,
      1,
      -1,
      CamerasProxy._NEAR,
      CamerasProxy._FAR
    );
  }

  private static _CreatePerspectiveCamera(): THREE.PerspectiveCamera {

    return new THREE.PerspectiveCamera(
      CamerasProxy._FOV,
      window.innerWidth / window.innerHeight,
      CamerasProxy._NEAR,
      CamerasProxy._FAR
    );
  }

  public static GetCamera(): THREE.PerspectiveCamera | THREE.OrthographicCamera {
    if(CamerasProxy.Camera instanceof THREE.PerspectiveCamera) {
      return CamerasProxy.Camera as THREE.PerspectiveCamera;
    }
    if(CamerasProxy.Camera instanceof THREE.OrthographicCamera) {
      return CamerasProxy.Camera as THREE.OrthographicCamera;
    }

    throw new Error('Camera is either not supported or inexistant');
  }

  private static _OnResize(): void {
    if(CamerasProxy.Camera instanceof THREE.PerspectiveCamera) {
      CamerasProxy.Camera.aspect = window.innerWidth / window.innerHeight;
    }
    
    else if(CamerasProxy.Camera instanceof THREE.OrthographicCamera) {
      CamerasProxy.Camera.left = -1;
      CamerasProxy.Camera.right = 1;
      CamerasProxy.Camera.top = 1;
      CamerasProxy.Camera.bottom = -1;
    }

    CamerasProxy.Camera.updateProjectionMatrix();
  }
}