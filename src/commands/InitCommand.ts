import { ModelsId } from "@constants/ModelsId";
import { PathId } from "@constants/PathId";
import { TexturesId } from "@constants/TexturesId";
import { DomEventsManager } from "@managers/DomEventsManager";
import { ThreeAssetsManager } from "@managers/ThreeAssetsManager";
import { Ticker } from "../utils/Ticker";
import { ThreeCamerasManager } from "@managers/ThreeCamerasManager";

export class InitCommand {
  public static async Init() {
    await InitCommand.InitProxies();
    await InitCommand.InitManagers();
    
    await InitCommand.LoadAssets();
    await InitCommand.OnLoad();
  }

  public static async InitProxies(): Promise<void> {
  }

  public static async InitManagers(): Promise<void> {
    ThreeAssetsManager.Init();
    DomEventsManager.Init();
    ThreeCamerasManager.Init();
  
    InitCommand.LoadAssets();
  }

  public static async LoadAssets(): Promise<void> {
    // Textures
    ThreeAssetsManager.AddTexture(TexturesId.UV, PathId.TEXTURES + 'uvs.jpg');

    // Models
    ThreeAssetsManager.AddModel(ModelsId.CHARMANDER, PathId.MODELS + 'charmander.glb')

    await ThreeAssetsManager.Load();
  }

  public static async OnLoad(): Promise<void> {
    Ticker.Start();
  }
}