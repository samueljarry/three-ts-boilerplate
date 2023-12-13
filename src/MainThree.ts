import { CameraControllerBase } from "@bases/cameras/CameraControllerBase";
import { ACESFilmicToneMapping, PerspectiveCamera, SRGBColorSpace, Scene, WebGLRenderer } from "three";
import { Ticker } from "./utils/Ticker";

export class MainThree {
  private static _Scene: Scene;
  private static _Renderer: WebGLRenderer;
  private static _CanvasContainer: HTMLElement;
  private static _CanvasContainerRect: DOMRect;
  private static _CameraController: CameraControllerBase;

  private static _LastTimeRendering = 0;
  private static _FPS = Math.floor(1000 / 60);
  private static _Started = false;

  public static Init() {
    this._CreateScene();
  }

  public static Start(): void {
    this._Started = true;
    Ticker.Add(this._Render);
  }

  public static Stop(): void {
    this._Started = false;
    Ticker.Remove(this._Render);
  }

  private static _CreateScene(): void {
    this._Scene = new Scene();

    this._Renderer = new WebGLRenderer({
      preserveDrawingBuffer: false,
      antialias: false,
    });

    this._Renderer.outputColorSpace = SRGBColorSpace;
    this._Renderer.toneMapping = ACESFilmicToneMapping;
    this._Renderer.setPixelRatio(window.devicePixelRatio);
  }

  public static SetCanvasContainer(canvasContainer: HTMLElement): void {
    this._CanvasContainer = canvasContainer;
    this._CanvasContainerRect = this._CanvasContainer.getBoundingClientRect();
    this._CanvasContainer.appendChild(this._Renderer.domElement);

    this._Resize();
  }

  public static SetCameraController(cameraController: CameraControllerBase): void {
    this._CameraController = cameraController;
    if(this._Scene) {
      this._Scene.add(this._CameraController);
    }
  }

  private static _Render = (): void => {
    if (!this._CameraController) return;
    const dt = Ticker.CurrentTime - this._LastTimeRendering;

    if (dt >= this._FPS) {
        this._LastTimeRendering = Ticker.CurrentTime;
        this._Renderer.render(this._Scene, this._CameraController.camera);
    }
  }

  private static _Resize = (): void => {
    this._ResizeScene();
  }

  private static _ResizeScene(): void {
    this._CanvasContainerRect = this._CanvasContainer.getBoundingClientRect();
    this._Renderer.setSize(
      this._CanvasContainerRect.width, 
      this._CanvasContainerRect.height
    );

    if(this._CameraController.camera instanceof PerspectiveCamera) {
      this._CameraController.updateAspect();
    }
  }

  public static get Scene(): Readonly<Scene> { return this._Scene; }
  public static get Renderer(): Readonly<WebGLRenderer> { return this._Renderer; }
  public static get Started(): Readonly<boolean> { return this._Started; }
  public static get Canvas(): Readonly<HTMLCanvasElement> { return this._Renderer.domElement; }
  public static get CanvasContainerRect(): Readonly<DOMRect> { return this._CanvasContainerRect; }
}