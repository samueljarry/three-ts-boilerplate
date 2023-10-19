import { CamerasProxy } from "@proxies/CamerasProxy";
import { ThreeSceneProxy } from "@proxies/ThreeSceneProxy";
import { RendererProxy } from "@proxies/RendererProxy";


export class MainThree {
  public static Init() {
    ThreeSceneProxy.Init(document.querySelector('.webgl') as HTMLCanvasElement);
    CamerasProxy.Init('perspective');
    RendererProxy.Init();
  }
}