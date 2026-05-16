import { IControl, Map as MapboxMap, ControlPosition } from 'mapbox-gl';

export class SimpleControl implements IControl {
  private container?: HTMLElement;

  onAdd(map: MapboxMap): HTMLElement {
    this.container = document.createElement('button');
    this.container.textContent = 'My Control';
    this.container.className = 'mapboxgl-ctrl-icon';
    this.container.style.padding = '8px';
    this.container.style.background = '#fff';
    this.container.onclick = () => {
      alert('Control clicked!');
    };
    return this.container;
  }

  onRemove(): void {
    this.container?.remove();
    this.container = undefined;
  }

  getDefaultPosition(): ControlPosition {
    return 'top-right';
  }
}
