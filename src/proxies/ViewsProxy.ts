import { ViewId } from "@constants/ViewId";
import { ViewBase } from "@views/bases/ViewBase";

type ViewConstructor = new () => ViewBase;

export class ViewsProxy {
  private static _ViewsConstructorsMap = new Map<ViewId, ViewConstructor>();
  private static _ViewsMap = new Map<ViewId, ViewBase>();
  
  public static Init(): void {
    this._ViewsMap.clear();
    this._ViewsConstructorsMap.clear();
  }

  public static AddViewConstructor(viewId: ViewId, viewConstructor: ViewConstructor): void {
    this._ViewsConstructorsMap.set(viewId, viewConstructor);
  }

  public static AddView(view: ViewBase): void {
    this._ViewsMap.set(view.viewId, view);
  }

  public static GetView<T extends ViewBase>(viewId: ViewId): T {
    let view: ViewBase;
    if( this._ViewsMap.has(viewId) ) {
      view = this._ViewsMap.get(viewId) as T;
    } else {
      if( !this._ViewsConstructorsMap.has(viewId) ) {
        throw new Error(`ViewsProxy: id ${ viewId } not declared`);
      }

      const viewConstructor = this._ViewsConstructorsMap.get(viewId) as ViewConstructor;
      view = new viewConstructor();
      this._ViewsMap.set(viewId, view);
      view = this._ViewsMap.get(viewId) as T;
    }

    return view as T;
  }

  public static GetViewByPlacement(placement: number): ViewBase[] {
    const tab: ViewBase[] = [];
    for( const view of this._ViewsMap.values() ) {
      if( view.placementId === placement ) {
        tab.push(view);
      }
    }

    return tab;
  }

  public static IsViewInstanced(viewId: ViewId): boolean {
    return this._ViewsMap.has(viewId);
  }
}