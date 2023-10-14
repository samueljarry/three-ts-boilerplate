import { EventsManager } from "@managers/EventsManager";
import { ThreeAssetsManager } from "@managers/ThreeAssetsManager";
import { ThreeSceneManager } from "@managers/ThreeSceneManager";

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
  
    InitCommand.LoadAssets();
  }

  public static async LoadAssets() {
    await ThreeAssetsManager.Load();
    ThreeSceneManager.Init(document.querySelector('.webgl') as HTMLCanvasElement);
  }
}