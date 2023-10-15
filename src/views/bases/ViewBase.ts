import { ViewId } from "@constants/ViewId";
import { ViewStateId } from "@constants/ViewStateId";

export class ViewBase {
  protected _viewid: ViewId;
  protected _placementId: number;
  protected _viewState: ViewStateId;
  protected _removeFromParentAtOutroFinish = true;
  protected _addInParent = true;

  public readonly onStateChangeAction = new Set<(view: ViewBase, state: ViewStateId) => void>();

  constructor(viewId: ViewId, placementId: number) {
    this._viewid = viewId;
    this._placementId = placementId;
    this._viewState = ViewStateId.OFF
  } 

  public init(): void {
    this._setViewState(ViewStateId.INIT);
  }

  public playIntro(): void {
    this._setViewState(ViewStateId.PLAYING_INTRO);
  }

  protected _introFinish(): void {
    this._setViewState(ViewStateId.LIVE);
  }

  public playOutro(): void {
    this._setViewState(ViewStateId.PLAYING_INTRO);
  }

  public outroFinish(): void {
    this._outroFinish();
  }

  protected _outroFinish(): void {
    this._setViewState(ViewStateId.OFF);
    
  }

  private _setViewState(viewState: ViewStateId): void {
    this._viewState = viewState;

    for( const func of this.onStateChangeAction) {
      func(this, viewState);
    }
  }

  // #region getter/setter
  public get viewId(): ViewId { return this._viewid; };
  public get placementId(): number { return this._placementId };
  public get viewState(): ViewStateId { return this._viewState };
  public get addInParent(): boolean { return this._addInParent };
  public get removeFromParentAtOutroFinish(): boolean { return this._removeFromParentAtOutroFinish };
  // #endregion
}