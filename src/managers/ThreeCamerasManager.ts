import { CameraControllerBase } from "@bases/cameras/CameraControllerBase";
import { CamerasId } from "@constants/CamerasId";
import { MainThree } from "../MainThree";
import { MainCameraController } from "../controllers/cameras/MainCameraController";

export class ThreeCamerasManager {
  private static _ActiveCamera: CameraControllerBase;
  private static _CamerasMap = new Map<CamerasId, CameraControllerBase>();

  public static Init(): void {
    this.AddCamera(new MainCameraController());
    this.SetActiveCamera(CamerasId.MAIN);
  }

  public static AddCamera(camera: CameraControllerBase): void {
    this._CamerasMap.set(camera.cameraId, camera);
  }

  public static RemoveCamera(cameraId: CamerasId): void {
    this._CamerasMap.delete(cameraId);
  }

  public static SetCanvas(canvas: HTMLCanvasElement): void {
    for(const camera of this._CamerasMap.values()) {
      camera.setCanvas(canvas);
    }
  }

  public static SetActiveCamera(cameraId: CamerasId): void {
    const camera = this._CamerasMap.get(cameraId);
    if(!camera) {
      throw new Error(`No camera found with id: ${cameraId}`)
    }

    this._ActiveCamera = camera;
    MainThree.SetCameraController(this._ActiveCamera);
  }

  public static get ActiveCamera(): Readonly<CameraControllerBase> { return this._ActiveCamera; }
}