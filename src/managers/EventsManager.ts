import { EventsId } from "@constants/EventsId";

type EventCallback = (event: Event) => void
type EventsSet = Set<EventCallback>

export class EventsManager {
  private static _EventsMap = new Map<EventsId, EventsSet>();
  private static _EventsCallbacksMap = new Map<EventsId, EventCallback>();
  
  public static Init() {
    EventsManager._EventsMap.set(EventsId.RESIZE, new Set<EventCallback>());
    EventsManager._SetListeners();
  }

  private static _SetListeners() {
    for(const [key, actions] of EventsManager._EventsMap) {
      if(!EventsManager._EventsCallbacksMap.get(key)) {
        const func = (event: Event) => {
          for(const action of actions) {
            action(event)
          }
        };
  
        window.addEventListener(key, func);
        EventsManager._EventsCallbacksMap.set(key, func);
      }
    }
  }

  public static AddEventCallback(eventId: EventsId, callback: EventCallback) {
    const event = EventsManager._EventsMap.get(eventId);
    
    if(!event) {
      EventsManager.AddEventListener(eventId);
      const event = EventsManager._EventsMap.get(eventId) as EventsSet;
      event.add(callback);

      return;
    }

    event.add(callback);
  }

  public static RemoveEventCallback(eventId: EventsId, callback: EventCallback) {
    const event = EventsManager._EventsMap.get(eventId);
    if(!event) {
      throw new Error(`Couldn't find method to remove in EventsManager.ts`);
    }

    event.delete(callback);
  }

  public static RemoveEventListener(listenerId: EventsId) {
    const actions = EventsManager._EventsCallbacksMap.get(listenerId);
    
    if(!actions) {
      throw new Error(`Couldn't find listener for ${listenerId} events to remove in EventManager.ts`);
    }

    window.removeEventListener(listenerId, actions);
    EventsManager._EventsCallbacksMap.delete(listenerId);
    EventsManager._EventsMap.delete(listenerId);
  }

  public static AddEventListener(listenerId: EventsId) {
    if(EventsManager._EventsMap.get(listenerId)) {
      throw new Error(`${listenerId} listener already exists`);
    };

    EventsManager._EventsMap.set(listenerId, new Set<EventCallback>());
    EventsManager._SetListeners();
  }
}