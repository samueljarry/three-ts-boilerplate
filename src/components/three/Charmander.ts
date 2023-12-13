import * as THREE from 'three';
import { ThreeAssetsManager } from "@managers/ThreeAssetsManager";
import { Object3DBase } from "../../bases/Object3DBase";
import { ModelsId } from "@constants/ModelsId";
import { OnRenderParams } from "@proxies/RendererProxy";

export class Charmander extends Object3DBase {
  private _charmander: THREE.Object3D;
  constructor() {
    super();

    this._charmander = ThreeAssetsManager.GetModel(ModelsId.CHARMANDER).scene;
    this._instance = this._charmander;
    this._instance.position.set(0, 0, -4);
    
    this._add(ModelsId.CHARMANDER);
    this._instance.add(new THREE.AmbientLight())
  }

  protected override _onResize(event: Event): void {
    console.log(event)
  }

  protected override _onFrame({ delta }: OnRenderParams): void {
    this._instance.rotation.y += delta;
  }
}