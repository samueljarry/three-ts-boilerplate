import { EventListenersId } from "@constants/EventListenersId";
import { CustomEventsId } from '@constants/CustomEventsId';

type CustomEventCallback = (event: any) => void;
type EventListenerCallback = (event: Event) => void;
type EventsSet = Set<EventListenerCallback>;
type CustomEventsSet = Set<CustomEventCallback>;

export class EventsManager {
  private static _CustomEventsMap = new Map<CustomEventsId, CustomEventsSet>();
  private static _EventListenersMap = new Map<EventListenersId, EventsSet>();
  private static _EventListenersCallbackMap = new Map<EventListenersId, EventListenerCallback>();
  
  public static Init() {
    EventsManager._EventListenersMap.set(EventListenersId.RESIZE, new Set<EventListenerCallback>());
    
    EventsManager._SetEventsListeners();
  }

  // #region EventListeners
  private static _SetEventsListeners(): void {
    for(const [key, actions] of EventsManager._EventListenersMap) {
      if(!EventsManager._EventListenersCallbackMap.get(key)) {
        const func = (event: Event) => {
          for(const action of actions) {
            action(event);
          }
        };
  
        window.addEventListener(key, func);
        EventsManager._EventListenersCallbackMap.set(key, func);
      }
    }
  }

  public static AddEventListenerCallback(eventId: EventListenersId, callback: EventListenerCallback): void {
    const event = EventsManager._EventListenersMap.get(eventId);
    
    if(!event) {
      EventsManager.AddEventListener(eventId);
      const event = EventsManager._EventListenersMap.get(eventId) as EventsSet;
      event.add(callback);

      return;
    }

    event.add(callback);
  }

  public static RemoveEventListenerCallback(eventId: EventListenersId, callback: EventListenerCallback): void {
    const event = EventsManager._EventListenersMap.get(eventId);
    if(!event) {
      throw new Error(`Couldn't find method to remove in EventsManager.ts`);
    }

    event.delete(callback);
  }

  public static RemoveEventListener(listenerId: EventListenersId): void {
    const actions = EventsManager._EventListenersCallbackMap.get(listenerId);
    if(!actions) {
      throw new Error(`Couldn't find listener for ${listenerId} events to remove in EventManager.ts`);
    }

    window.removeEventListener(listenerId, actions);
    EventsManager._EventListenersCallbackMap.delete(listenerId);
    EventsManager._EventListenersMap.delete(listenerId);
  }

  public static AddEventListener(listenerId: EventListenersId): void {
    if(EventsManager._EventListenersMap.get(listenerId)) {
      throw new Error(`${listenerId} listener already exists`);
    };

    EventsManager._EventListenersMap.set(listenerId, new Set<EventListenerCallback>());
    EventsManager._SetEventsListeners();
  }
  // #endregion

  // #region CustomEvents
  public static AddCustomEvent(customEventId: CustomEventsId): void {
    EventsManager._CustomEventsMap.set(customEventId, new Set<CustomEventCallback>());
  }

  public static RemoveCustomEvent(customEventId: CustomEventsId): void {
    EventsManager._CustomEventsMap.delete(customEventId);
  }

  public static AddCustomEventCallback(customEventId: CustomEventsId, callback: CustomEventCallback): void {
    const customEvent = EventsManager._CustomEventsMap.get(customEventId);
    if(!customEvent) {
      throw new Error(`Custom event: ${customEventId} don't exist.`);
    }

    customEvent.add(callback);
  }

  public static RemoveCustomEventCallback(customEventId: CustomEventsId, callback: CustomEventCallback): void {
    const customEvent = EventsManager._CustomEventsMap.get(customEventId);
    if(!customEvent) {
      throw new Error(`Custom event: ${customEventId} don't exist.`);
    }

    customEvent.delete(callback);
  }

  public static DispatchCustomEvent<T>(customEventId: CustomEventsId, params: T): void {
    const actions = EventsManager._CustomEventsMap.get(customEventId);
    if(!actions) {
      throw new Error(`Couldn't find event: ${customEventId}`)
    }
    for( const action of actions) {
      action(params);
    }
  }
  // #endregion
}