import { CamerasId } from "@constants/CamerasId";
import { Object3D, PerspectiveCamera  } from "three";
import { MainThree } from "../../MainThree";

export class CameraControllerBase extends Object3D {
  protected _cameraId: CamerasId;
  protected _camera: PerspectiveCamera;
  protected _cameraContainer: Object3D;
  protected _canvas!: HTMLCanvasElement;

  constructor(cameraId: CamerasId) {
    super();
    
    this._cameraId = cameraId;
    this._camera = new PerspectiveCamera(55, window.innerWidth / window.innerHeight);
    this._cameraContainer = new Object3D()

    this._cameraContainer.add(this._camera);
    this.add(this._cameraContainer);
  }

  public setCanvas(canvas: HTMLCanvasElement): void {
    this._canvas = canvas;
  }

  public updateAspect(): void {
    this._camera.aspect = MainThree.CanvasContainerRect.width / MainThree.CanvasContainerRect.height;
    this._camera.updateProjectionMatrix();
  }

  public get cameraId(): Readonly<CamerasId> { return this._cameraId; }
  public get cameraContainer(): Readonly<Object3D> { return this._cameraContainer; }
  public get camera(): PerspectiveCamera { return this._camera; }
}