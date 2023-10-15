import { ViewId } from "@constants/ViewId";
import { ViewStateId } from "@constants/ViewStateId";
import { ViewsProxy } from "@proxies/ViewsProxy";
import { ViewBase } from "@views/bases/ViewBase";

export class ViewsManager {
  public static readonly OnShowView = new Set<(view: ViewBase) => void>();
  public static readonly OnRemoveView = new Set<(view: ViewBase) => void>();
  private static _CurrentViewsList: ViewBase[] = [];

  public static Init() {
    this._CurrentViewsList.length = 0;
  }

  public static ShowById(viewId: ViewId) {
    const view = ViewsProxy.GetView(viewId);
    this.Show(view);
  }

  public static Show(view: ViewBase) {
    if(this._CurrentViewsList.indexOf(view) > -1) return;

    for( const oldView of this._CurrentViewsList ) {
      if( oldView.placementId === view.placementId && oldView.placementId > -1 ) oldView.playOutro();
    }

    view.init();
    this._CurrentViewsList.push(view);
    this._CurrentViewsList.sort(this._SortViewByPlacementId);
    for( const func of this.OnShowView ) {
      func(view);
    }
    view.playIntro();
  }

  private static _SortViewByPlacementId(a: ViewBase, b: ViewBase): number {
    if(a.placementId < b.placementId) return -1;
    if(a.placementId > b.placementId) return 1;

    return 0;
  }

  public static HideById(viewId: ViewId): void {
    const view = ViewsProxy.GetView(viewId);
    if(!view) {
      throw new Error(`Couldn't find view: ${ viewId }`);
    }

    this.Hide(view);
  }

  public static Hide(view: ViewBase): void {
    let t = '';
    for( const v of this._CurrentViewsList ) t += v.viewId + '  ';
    const index = this._CurrentViewsList.indexOf(view);
    if( index > -1 ) this._CurrentViewsList.splice(this._CurrentViewsList.indexOf(view), 1);
    if( view.viewState !== ViewStateId.OFF ) {
      view.playOutro();
    }
  }

  public static Remove(view: ViewBase): void {
    if( view.viewState !== ViewStateId.OFF ) {
      view.outroFinish();
      return;
    }

    const index = this._CurrentViewsList.indexOf(view);
    if( index > -1 ) this._CurrentViewsList.splice(this._CurrentViewsList.indexOf(view), 1);
    for( const func of this.OnRemoveView ) {
      func(view);
    }
  }

  public static IsInCurrentView(viewId: ViewId): boolean {
    if(!ViewsProxy.IsViewInstanced(viewId)) return false;

    const view = ViewsProxy.GetView(viewId);
    return this._CurrentViewsList.indexOf(view) > -1;
  }

  // #region getter/setter
  public static get CurrentViewsList() { return this._CurrentViewsList };
  // #endregion
}