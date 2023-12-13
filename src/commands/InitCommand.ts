import { ModelsId } from "@constants/ModelsId";
import { PathId } from "@constants/PathId";
import { TexturesId } from "@constants/TexturesId";
import { EventsManager } from "@managers/EventsManager";
import { ThreeAssetsManager } from "@managers/ThreeAssetsManager";

export class InitCommand {
  public static async Init() {
    await InitCommand.InitProxies();
    await InitCommand.InitManagers();
    
    await InitCommand.LoadAssets();
  }

  public static async InitProxies(): Promise<void> {
  }

  public static async InitManagers(): Promise<void> {
    ThreeAssetsManager.Init();
    EventsManager.Init();
  
    InitCommand.LoadAssets();
  }

  public static async LoadAssets(): Promise<void> {
    // Textures
    ThreeAssetsManager.AddTexture(TexturesId.UV, PathId.TEXTURES + 'uvs.jpg');

    // Models
    ThreeAssetsManager.AddModel(ModelsId.CHARMANDER, PathId.MODELS + 'charmander.glb')

    await ThreeAssetsManager.Load();
  }
}