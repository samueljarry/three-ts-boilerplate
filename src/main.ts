import { InitCommand } from "./commands/InitCommand";

export class Main {
  public static async Init() {
    await InitCommand.Init();
    Main.Start();
  }

  public static Start() {
    
  }
}

Main.Init();