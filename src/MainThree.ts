import { Scene, WebGLRenderer } from "three";

export class MainThree {
  private static _Scene: Scene;
  private static _Renderer: WebGLRenderer;

  public static Init() {
    this._CreateScene();
  }

  private static _CreateScene(): void {
    this._Scene = new Scene();
    this._Renderer = new WebGLRenderer({
      alpha: true,
      preserveDrawingBuffer: false,
      antialias: false,
    })

    
  }
}