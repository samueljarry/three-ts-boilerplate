import { ThreeSceneManager } from '@managers/ThreeSceneManager';
import * as THREE from 'three';
import { CamerasProxy } from './CamerasProxy';
import { EventsManager } from '@managers/EventsManager';
import { EventsId } from '@constants/EventsId';

type OnRenderCallback = () => void;

export class RendererProxy {
  private static _Renderer: THREE.WebGLRenderer;
  private static _OnRenderCallbacks = new Set<OnRenderCallback>;

  public static Init(): void {
    RendererProxy._Renderer = new THREE.WebGLRenderer({
      canvas: ThreeSceneManager.Canvas,
      alpha: true,
      antialias: true,
    });

    RendererProxy._Renderer.outputColorSpace = THREE.SRGBColorSpace;
    RendererProxy._Renderer.toneMapping = THREE.ACESFilmicToneMapping;
    RendererProxy._Renderer.setPixelRatio(window.devicePixelRatio);
    RendererProxy._Renderer.setSize(window.innerWidth, window.innerHeight);

    EventsManager.AddEventCallback(EventsId.RESIZE, RendererProxy._OnResize);
    RendererProxy._Render();
  }

  private static _OnResize(): void {
    RendererProxy._Renderer.setSize(window.innerWidth, window.innerHeight);
    RendererProxy._Renderer.setPixelRatio(window.devicePixelRatio);
  }

  public static AddOnRenderCallback(callback: OnRenderCallback): void {
    RendererProxy._OnRenderCallbacks.add(callback)
  }

  public static RemoveOnRenderCallback(callback: OnRenderCallback): void {
    RendererProxy._OnRenderCallbacks.delete(callback)
  }

  private static _Render(): void {
    RendererProxy._Renderer.render(ThreeSceneManager.Scene, CamerasProxy.Camera)

    for(const callback of RendererProxy._OnRenderCallbacks ) {
      callback()
    }
    
    window.requestAnimationFrame(RendererProxy._Render.bind(this))
  }
}