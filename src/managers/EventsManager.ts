import { EventsId } from "@constants/EventsId";

type EventsSet = Set<(event?: Event) => void>

export class EventsManager {
  private static _EventsMap = new Map<EventsId, EventsSet>();
  private static _EventsActionsMap = new Map<EventsId, any>();
  
  public static Init() {
    EventsManager._EventsMap.set(EventsId.RESIZE, new Set<(event?: Event) => void>());
    EventsManager._EventsMap.set(EventsId.KEYDOWN, new Set<(event?: Event) => void>());
    
    EventsManager._SetListeners();
  }

  public static AddEventMethod(eventId: EventsId, method: (event?: Event) => void) {
    const event = EventsManager._EventsMap.get(eventId);
    if(!event) {
      throw new Error(`Couldn't add method to ${eventId} event: is its listener set in EventsManager.ts ?`);
    }

    event.add(method);
  }

  public static RemoveEventMethod(eventId: EventsId, method: () => void) {
    const event = EventsManager._EventsMap.get(eventId);
    if(!event) {
      throw new Error(`Couldn't find method to remove in EventsManager.ts`);
    }

    event.delete(method);
  }

  private static _SetListeners() {
    for(const [key, actions] of EventsManager._EventsMap) {
      const func = (event: Event) => {
        for(const action of actions) {
          action(event)
        }
      }

      window.addEventListener(key, func)
      EventsManager._EventsActionsMap.set(key, func)
    }
  }

  public static RemoveListener(listenerId: EventsId) {
    const actions = EventsManager._EventsActionsMap.get(listenerId);
    
    if(!actions) {
      throw new Error(`Couldn't find listener for ${listenerId} events to remove in EventManager.ts`)
    }

    window.removeEventListener(listenerId, actions)
  }
}