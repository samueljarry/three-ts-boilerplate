import { CamerasId } from "@constants/CamerasId";
import { CameraControllerBase } from "../../bases/cameras/CameraControllerBase";

export class MainCameraController extends CameraControllerBase {
  constructor() {
    super(CamerasId.MAIN);

    this._camera.rotation.y = Math.PI;
    this.position.set(0, 5, 4)
    this.lookAt(0, -3, -1);
  }
}