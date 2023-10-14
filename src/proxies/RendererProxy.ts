import { ThreeSceneManager } from '@managers/ThreeSceneManager';
import * as THREE from 'three';

export class RendererProxy {
  private static _Renderer: THREE.WebGLRenderer;

  public static Init() {
    const canvas = ThreeSceneManager.GetCanvas();

    RendererProxy._Renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: false,
    })
    RendererProxy._Renderer.outputColorSpace = THREE.SRGBColorSpace;
    RendererProxy._Renderer.toneMapping = THREE.ACESFilmicToneMapping;
  }
}

