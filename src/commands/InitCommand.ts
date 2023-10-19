import { EventsManager } from "@managers/EventsManager";
import { ThreeAssetsManager } from "@managers/ThreeAssetsManager";
import { Object3DBase } from "@views/three/bases/Object3DBase";
import { InitViewsCommand } from "./InitViewsCommand";
import { CamerasProxy } from "@proxies/CamerasProxy";
import { RendererProxy } from "@proxies/RendererProxy";

export class InitCommand {
  public static async Init() {
    await InitCommand.InitCommands();
    await InitCommand.InitProxies();
    await InitCommand.InitManagers();
    await InitCommand.LoadAssets();
  }

  public static async InitCommands(): Promise<void> {
    InitViewsCommand.Init();
  }

  public static async InitProxies(): Promise<void> {
  }

  public static async InitManagers(): Promise<void> {
    ThreeAssetsManager.Init();
    EventsManager.Init();
    new Object3DBase();
  
    InitCommand.LoadAssets();
  }

  public static async LoadAssets(): Promise<void> {
    await ThreeAssetsManager.Load();
  }
}