import { EventsId } from "@constants/EventsId";

type EventFunction = (event?: Event) => void
type EventsSet = Set<EventFunction>

export class EventsManager {
  private static _EventsMap = new Map<EventsId, EventsSet>();
  private static _EventsActionsMap = new Map<EventsId, any>();
  
  public static Init() {
    EventsManager._EventsMap.set(EventsId.RESIZE, new Set<EventFunction>());
    EventsManager._SetListeners();
  }

  private static _SetListeners() {
    for(const [key, actions] of EventsManager._EventsMap) {
      if(!EventsManager._EventsActionsMap.get(key)) {
        const func = (event: Event) => {
          for(const action of actions) {
            action(event)
          }
        };
  
        window.addEventListener(key, func);
        EventsManager._EventsActionsMap.set(key, func);
      }
    }
  }

  public static AddEventMethod(eventId: EventsId, method: EventFunction) {
    const event = EventsManager._EventsMap.get(eventId);
    
    if(!event) {
      EventsManager.AddEventListener(eventId);
      const event = EventsManager._EventsMap.get(eventId) as EventsSet;
      event.add(method);

      return;
    }

    event.add(method);
  }

  public static RemoveEventMethod(eventId: EventsId, method: EventFunction) {
    const event = EventsManager._EventsMap.get(eventId);
    if(!event) {
      throw new Error(`Couldn't find method to remove in EventsManager.ts`);
    }

    event.delete(method);
  }

  public static RemoveEventListener(listenerId: EventsId) {
    const actions = EventsManager._EventsActionsMap.get(listenerId);
    
    if(!actions) {
      throw new Error(`Couldn't find listener for ${listenerId} events to remove in EventManager.ts`);
    }

    window.removeEventListener(listenerId, actions);
    EventsManager._EventsActionsMap.delete(listenerId);
    EventsManager._EventsMap.delete(listenerId);
  }

  public static AddEventListener(listenerId: EventsId) {
    if(EventsManager._EventsMap.get(listenerId)) {
      throw new Error(`${listenerId} listener already exists`);
    };

    EventsManager._EventsMap.set(listenerId, new Set<EventFunction>());
    EventsManager._SetListeners();
  }
}