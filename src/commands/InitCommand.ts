import { ThreeAssetsManager } from "@managers/ThreeAssetsManager";

export class InitCommand {
  public static async Init() {
    InitCommand.InitProxies();
  }

  public static async InitProxies() {
    InitCommand.InitManagers();
  }

  public static async InitManagers() {
    ThreeAssetsManager.Init();
    InitCommand.LoadAssets();
  }

  public static LoadAssets() {
    ThreeAssetsManager.Load();
  }
}