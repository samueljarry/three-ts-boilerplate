import { LoadersManager } from "../managers/LoadersManager";
import { ModelLoaderProxy } from "../proxies/ModelLoaderProxy";

export class InitCommand {
  public static async Init() {
    InitCommand.InitProxies();
  }

  public static async InitProxies() {
    ModelLoaderProxy.Init();
    InitCommand.InitManagers();
  }

  public static async InitManagers() {
    LoadersManager.Init();
    InitCommand.LoadAssets();
  }

  public static LoadAssets() {
    LoadersManager.Load();
  }
}