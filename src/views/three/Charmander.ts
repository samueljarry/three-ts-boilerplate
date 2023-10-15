import { ThreeAssetsManager } from "@managers/ThreeAssetsManager";
import { Object3DBase } from "./bases/Object3DBase";
import { ModelsId } from "@constants/ModelsId";
import { OnRenderParams } from "@proxies/RendererProxy";

export class Charmander extends Object3DBase {
  
  constructor() {
    super();

    this._instance = ThreeAssetsManager.GetModel(ModelsId.CHARMANDER).scene;
    this._add(ModelsId.CHARMANDER);
    this._instance.position.set(0, 0, -2);
    this._remove();
  }

  protected override _onResize(event: Event): void {
    console.log(event)
  }

  protected override _onFrame({ delta }: OnRenderParams): void {
    console.log(delta)
    this._instance.rotation.y += delta;
  }
}