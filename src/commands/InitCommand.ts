import { EventsManager } from "@managers/EventsManager";
import { ThreeAssetsManager } from "@managers/ThreeAssetsManager";
import { ThreeSceneManager } from "@managers/ThreeSceneManager";
import { Object3DBase } from "@views/three/bases/Object3DBase";

export class InitCommand {
  public static async Init() {
    InitCommand.InitProxies();
  }

  public static async InitProxies() {
    InitCommand.InitManagers();
  }

  public static async InitManagers() {
    ThreeAssetsManager.Init();
    EventsManager.Init();
    new Object3DBase();
  
    InitCommand.LoadAssets();
  }

  public static async LoadAssets() {
    await ThreeAssetsManager.Load();
    ThreeSceneManager.Init(document.querySelector('.webgl') as HTMLCanvasElement);
  }
}