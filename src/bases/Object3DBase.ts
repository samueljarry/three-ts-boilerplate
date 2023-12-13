import { Object3D } from "three";

export class Object3DBase extends Object3D {
  
  
  public init(): void {
    for(const child of this.children) {
      if(child instanceof Object3DBase) {
        child.init();
      }
    }
  }

  public update(delta: number): void {
    for(const child of this.children) {
      if(child instanceof Object3DBase) {
        child.update(delta);
      }
    }
  }

  public resize(width: number, height: number): void {
    for(const child of this.children) {
      if(child instanceof Object3DBase) {
        child.resize(width, height);
      }
    }
  }
}