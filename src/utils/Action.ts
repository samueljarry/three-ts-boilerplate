type FuncType<TArgs extends any[], TResult> = (...args: TArgs) => TResult;
type ActionType<TArgs extends any[]> = FuncType<TArgs, any>

export class Action<T extends any[]> {
  private _funcList = new Set<ActionType<T>>();

  public add(func: ActionType<T>): void {
    this._funcList.add(func);
  }

  public remove(func: ActionType<T>): void {
    this._funcList.delete(func);
  }

  public execute(...args: T): void {
    for( const func of this._funcList) {
      func(...args);
    }
  }
}