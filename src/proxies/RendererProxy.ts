import { ThreeSceneProxy } from '@proxies/ThreeSceneProxy';
import * as THREE from 'three';
import { CamerasProxy } from './CamerasProxy';
import { EventsManager } from '@managers/EventsManager';
import { EventListenersId } from '@constants/EventListenersId';
import { CustomEventsId } from '@constants/CustomEventsId';

export type OnRenderParams = {
  delta: number;
  elapsed: number;
}

export type OnRenderCallback = (params: OnRenderParams) => void

export class RendererProxy {
  private static _Renderer: THREE.WebGLRenderer;
  private static _Clock = new THREE.Clock();
  private static _Delta = 0;
  private static _Elapsed = 0;

  public static Init(): void {
    RendererProxy._Renderer = new THREE.WebGLRenderer({
      canvas: ThreeSceneProxy.Canvas,
      alpha: true,
      antialias: true,
    });

    RendererProxy._Renderer.outputColorSpace = THREE.SRGBColorSpace;
    RendererProxy._Renderer.toneMapping = THREE.ACESFilmicToneMapping;
    RendererProxy._Renderer.setPixelRatio(window.devicePixelRatio);
    RendererProxy._Renderer.setSize(window.innerWidth, window.innerHeight);

    EventsManager.AddEventListenerCallback(EventListenersId.RESIZE, RendererProxy._OnResize);
    EventsManager.AddCustomEvent(CustomEventsId.RENDER);
    RendererProxy._Render();
  }

  private static _OnResize(): void {
    RendererProxy._Renderer.setSize(window.innerWidth, window.innerHeight);
    RendererProxy._Renderer.setPixelRatio(window.devicePixelRatio);
  }

  private static _Render(): void {
    const previousTime = RendererProxy._Elapsed;
    RendererProxy._Elapsed = RendererProxy._Clock.getElapsedTime();
    RendererProxy._Delta = RendererProxy._Elapsed - previousTime;

    EventsManager.DispatchCustomEvent<OnRenderParams>(CustomEventsId.RENDER, {
      delta: RendererProxy._Delta,
      elapsed: RendererProxy._Elapsed,
    });

    RendererProxy._Renderer.render(ThreeSceneProxy.Scene, CamerasProxy.Camera)
    window.requestAnimationFrame(RendererProxy._Render.bind(this))
  }
}