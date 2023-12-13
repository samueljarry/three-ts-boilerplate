import { MainThree } from "./MainThree";
import { InitCommand } from "./commands/InitCommand";
import '@styles/styles.scss';

export class Main {
  public static async Init() {
    await InitCommand.Init();
    Main.Start();
  }

  public static Start() {
    MainThree.Init();
    
    const canvas = document.querySelector('.webgl') as HTMLCanvasElement;
    
    MainThree.SetCanvasContainer(canvas);
    MainThree.Start();
  }
}

Main.Init();