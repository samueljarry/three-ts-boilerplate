import { ViewsProxy } from "@proxies/ViewsProxy";

export class InitViewsCommand {
  private static _IsInstanced = false;

  public static Init() {
    if(InitViewsCommand._IsInstanced) return;

    ViewsProxy.Init();
  }
}