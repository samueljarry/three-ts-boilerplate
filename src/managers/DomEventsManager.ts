import { DomEventsId } from "@constants/DomEventsId";

type EventCallback<T extends Event> = (event: T) => void;
type EventsSet<T extends Event> = Set<EventCallback<T>>;

export class DomEventsManager {
  private static _EventMap = new Map<DomEventsId, EventsSet<any>>();
  private static _EventCallbackMap = new Map<DomEventsId, EventCallback<any>>();
  
  public static Init() {
    DomEventsManager._EventMap.set(DomEventsId.RESIZE, new Set<(event: UIEvent) => void>());
    DomEventsManager._EventMap.set(DomEventsId.RESIZE, new Set<(event: UIEvent) => void>());

    DomEventsManager._SetEventsListeners();
  }

  private static _SetEventsListeners(): void {
    for(const [key, actions] of DomEventsManager._EventMap) {
      if(DomEventsManager._EventCallbackMap.get(key)) continue;
      
      const func = (event: Event) => {
        for(const action of actions) {
          action(event);
        }
      };

      window.addEventListener(key, func);
      DomEventsManager._EventCallbackMap.set(key, func);
    }
  }

  public static AddCallback(eventId: DomEventsId, callback: EventCallback<any>): void {
    const event = DomEventsManager._EventMap.get(eventId);
    
    if(!event) {
      DomEventsManager.AddEvent(eventId);
      const event = DomEventsManager._EventMap.get(eventId) as EventsSet<any>;
      event.add(callback);

      return;
    }

    event.add(callback);
  }

  public static RemoveCallback(eventId: DomEventsId, callback: EventCallback<any>): void {
    const event = DomEventsManager._EventMap.get(eventId);
    if(!event) {
      throw new Error(`Couldn't find method to remove in EventsManager.ts`);
    }

    event.delete(callback);
  }

  public static RemoveEvent(eventId: DomEventsId): void {
    const actions = DomEventsManager._EventCallbackMap.get(eventId);
    if(!actions) {
      throw new Error(`Couldn't find listener for ${eventId} events to remove in EventManager.ts`);
    }

    window.removeEventListener(eventId, actions);
    DomEventsManager._EventCallbackMap.delete(eventId);
    DomEventsManager._EventMap.delete(eventId);
  }

  public static AddEvent(listenerId: DomEventsId): void {
    if(DomEventsManager._EventMap.get(listenerId)) {
      throw new Error(`${listenerId} listener already exists`);
    };

    DomEventsManager._EventMap.set(listenerId, new Set<EventCallback<any>>());
    DomEventsManager._SetEventsListeners();
  }

  public static AddEventToElement(element: HTMLElement, eventId: DomEventsId, action: any): void {
    element.addEventListener(eventId, action);
  }

  public static RemoveEventFromElement(element: HTMLElement, eventId: DomEventsId, action: any): void {
    element.removeEventListener(eventId, action);
  }
}