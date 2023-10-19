import { ModelsId } from "@constants/ModelsId";
import { Objects3DId } from "@constants/Objects3DId";
import { EventsManager } from "@managers/EventsManager";
import { ThreeSceneProxy } from "@proxies/ThreeSceneProxy";
import { OnRenderParams } from "@proxies/RendererProxy";
import { CustomEventsId } from '@constants/CustomEventsId';
import { EventListenersId } from '@constants/EventListenersId';

export class Object3DBase {
  protected _onResize(event: Event): void {};
  protected _onFrame(params: OnRenderParams): void {};
  protected _instance!: THREE.Object3D;
  protected _instanceId!: ModelsId | Objects3DId;
  protected _isInstanced: boolean = false;
  private _eventListenersMap = new Map<EventListenersId, (event: Event) => void>();
  private _customEventsMap = new Map<CustomEventsId, (params: any) => void>();

  constructor() {
    this._eventListenersMap.set(EventListenersId.RESIZE, this._onResize.bind(this));
    this._customEventsMap.set(CustomEventsId.RENDER, this._onFrame.bind(this));
  }

  protected _add(objectId: ModelsId | Objects3DId): void {
    if(!this._instance) {
      throw new Error("Couldn't add _Instance to the scene as it is undefined, please make sure you declare it before adding it to the scene.");
    }

    this._instanceId = objectId;
    ThreeSceneProxy.AddObject(objectId, this._instance)
    
    this._isInstanced = true;
    this._onInstancedStateChange();
  }

  protected _remove(): void {
    if(!this._instance) {
      throw new Error("Couldn't remove _Instance from scene as it is undefined");
    }

    ThreeSceneProxy.RemoveObject(this._instanceId);
    
    this._isInstanced = false;
    this._onInstancedStateChange();
  }

  private _initEventsBasedCallbacks(): void {
    for( const [eventId, callback] of this._eventListenersMap ) {
      EventsManager.AddEventListenerCallback(eventId, callback)
    }

    for( const [eventId, callback] of this._customEventsMap) {
      EventsManager.AddCustomEventCallback(eventId, callback)
    }
  }

  private _removeEventsBasedCallbacks(): void {
    for( const [eventId, callback] of this._eventListenersMap ) {
      EventsManager.RemoveEventListenerCallback(eventId, callback)
    }

    for( const [eventId, callback] of this._customEventsMap) {
      EventsManager.RemoveCustomEventCallback(eventId, callback)
    }
  }

  private _onInstancedStateChange(): void {
    if(this._isInstanced) {
      this._initEventsBasedCallbacks();
    } else {
      this._removeEventsBasedCallbacks();
    }
  }
}