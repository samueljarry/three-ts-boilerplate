import { AnimationsId } from "@constants/AnimationsId";

export class AnimationsProxy {
  private static _AnimationsMap = new Map<AnimationsId, gsap.core.Timeline>();

  public static Init() {

  }

  public static AddAnimation(animationId: AnimationsId, timeline: gsap.core.Timeline) {
    AnimationsProxy._AnimationsMap.set(animationId, timeline);
  }

  public static GetAnimation(animationId: AnimationsId): gsap.core.Timeline {
    const animation = AnimationsProxy._AnimationsMap.get(animationId);
    
    if(!animation) {
      throw new Error(`No animation found for id: ${animationId}`)
    }

    return animation;
  }
}