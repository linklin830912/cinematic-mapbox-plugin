import { IControl, Map as MapboxMap } from 'mapbox-gl';
import './style.css';
import { GeometryType, ModeType } from './type';
import { ALL_GEOMETRY_TYPES, ALL_MODE_TYPES } from '../../core/const/control-const';
import { controlStore } from '../../core/store/control-store';

export class GeometryTypeControl implements IControl {
  
  private buttonDict: Record<GeometryType, HTMLButtonElement> = {} as Record<GeometryType, HTMLButtonElement>;
  private map?: MapboxMap;

  onAdd(map: MapboxMap): HTMLElement {
    this.map = map;

    const container = document.createElement('div');
    container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';    

    ALL_GEOMETRY_TYPES.forEach((geo, i) => { 
      const button = document.createElement('button');
      button.className = 'draw-button inactive';
      button.type = 'button';
      button.textContent = geo;
      this.buttonDict[geo] = button;
      button.onclick = () => {
        this.toggleDrawing(geo);
        // getCurveFromPoints([{ x: 0, y: 0, z: 0 }, { x: 0.1, y: 0, z: 0 }, { x: 1, y: 1, z: 1 }]);
      }

      container.appendChild(this.buttonDict[geo]);
    });
    
    return container;
  }

  onRemove(): void {
    if (!this.map) return;

    Object.values(this.buttonDict).forEach((button) => {
      button.remove();
    });
    this.buttonDict = {} as Record<GeometryType, HTMLButtonElement>;
    this.map = undefined;
  }

  private toggleDrawing(geo: GeometryType) {
    if (!this.map) return;
    if(controlStore.geometryType === geo) {      
      this.buttonDict[geo].classList.remove('active');
      this.buttonDict[geo].classList.add('inactive');

      controlStore.setGeometryType(null);
    } else if (controlStore.geometryType === null) {      
      this.buttonDict[geo].classList.remove('inactive');
      this.buttonDict[geo].classList.add('active');

      controlStore.setGeometryType(geo);
    } else {
      this.buttonDict[controlStore.geometryType].classList.remove('active');
      this.buttonDict[controlStore.geometryType].classList.add('inactive');  
      this.buttonDict[geo].classList.remove('inactive');
      this.buttonDict[geo].classList.add('active'); 
      
      controlStore.setGeometryType(geo);
    }
  }
}