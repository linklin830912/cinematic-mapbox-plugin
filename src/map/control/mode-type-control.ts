import { IControl, Map as MapboxMap } from 'mapbox-gl';
import './style.css';
import { ModeType } from './type';
import { ALL_MODE_TYPES } from '../const/control-const';
import { controlStore } from '../store/control-store';

export class ModeTypeControl implements IControl {
  
  private buttonDict: Record<ModeType, HTMLButtonElement> = {} as Record<ModeType, HTMLButtonElement>;
  private map?: MapboxMap;

  onAdd(map: MapboxMap): HTMLElement {
    this.map = map;

    const container = document.createElement('div');
    container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';    

    ALL_MODE_TYPES.forEach((mode, i) => { 
      const button = document.createElement('button');
      button.className = 'draw-button inactive';
      button.type = 'button';
      button.textContent = mode;
      this.buttonDict[mode] = button;
      button.onclick = () => {
        this.toggleDrawing(mode);
      }

      container.appendChild(this.buttonDict[mode]);
    });
    
    return container;
  }

  onRemove(): void {
    if (!this.map) return;
    Object.values(this.buttonDict).forEach((button) => {
      button.remove();
    });
    this.buttonDict = {} as Record<ModeType, HTMLButtonElement>;
    this.map = undefined;
  }

  private toggleDrawing(mode: ModeType) {
    if (!this.map) return;
    if(controlStore.modeType === mode) {      
      this.buttonDict[mode].classList.remove('active');
      this.buttonDict[mode].classList.add('inactive');

      controlStore.setModeType(null);
    } else if (controlStore.modeType === null) {      
      this.buttonDict[mode].classList.remove('inactive');
      this.buttonDict[mode].classList.add('active');

      controlStore.setModeType(mode);
    } else {
      this.buttonDict[controlStore.modeType].classList.remove('active');
      this.buttonDict[controlStore.modeType].classList.add('inactive');  
      this.buttonDict[mode].classList.remove('inactive');
      this.buttonDict[mode].classList.add('active'); 

      controlStore.setModeType(mode);
    }
  }
}