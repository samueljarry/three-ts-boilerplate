import { ViewId } from "@constants/ViewId";
import { ViewBase } from './ViewBase';
import gsap from 'gsap';

export type ViewAnimations = {
  intro: gsap.core.Timeline;
  outro: gsap.core.Timeline;
}

export class AnimatedViewBase extends ViewBase {
  constructor(viewId: ViewId, placementId: number, { intro, outro } : ViewAnimations) {
    super(viewId, placementId);
    console.log(intro, outro)
  }
}