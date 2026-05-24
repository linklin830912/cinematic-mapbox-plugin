import { IControl, Map as MapboxMap } from 'mapbox-gl';
import './style.css';
import { GeometryType } from './type';
import { ALL_GEOMETRY_TYPES } from '../const/control-const';
import { controlStore } from '../store/control-store';
import { GEOMETRY_TYPE_CHANGED, MODE_TYPE_CHANGED } from '../const/store-const';

export class GeometryTypeControl implements IControl {
  
    private buttonDict: Record<GeometryType, HTMLButtonElement> = {} as Record<GeometryType, HTMLButtonElement>;
    private map?: MapboxMap;
    private container?: HTMLElement;

    onAdd(map: MapboxMap): HTMLElement {
        this.map = map;
        const container = document.createElement('div');
        container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';
  
        this.container = container;
        controlStore.addEventListener(MODE_TYPE_CHANGED, (e : any) => {
            this.toggleVisibility();
            if (e.detail === 'draw') this.enableDrawEvents();
            else this.disableDrawEvents();
        });

        ALL_GEOMETRY_TYPES.forEach((geo) => { 
            const button = document.createElement('button');
            button.className = 'draw-button inactive';
            button.type = 'button';
            button.textContent = geo;
            this.buttonDict[geo] = button;
            button.onclick = () => {
                this.toggleType(geo);
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

    private toggleType(geo: GeometryType) {
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
        
    private toggleVisibility() {
        if (!this.map || !this.container) return;
        
        if (controlStore.modeType === 'draw') { 
            console.log(controlStore.modeType);
            this.container.classList.remove('hidden');
        } else {
            this.container.classList.add('hidden');
        }
    }






    private mouseDownHandler = (e: any) => {
        if(!this.map) return;
        controlStore.drawEvent?.onMouseDown(this.map, e.originalEvent);
    };
    private mouseMoveHandler = (e: any) => {
        if(!this.map) return;
        controlStore.drawEvent?.onMouseMove(this.map, e.originalEvent);
    };
    private mouseUpHandler = (e: any) => {
        if(!this.map) return;
        controlStore.drawEvent?.onMouseUp(this.map, e.originalEvent);
    };
    private enableDrawEvents() {
        this.map?.on('mousedown', this.mouseDownHandler);
        this.map?.on('mousemove', this.mouseMoveHandler);
        this.map?.on('mouseup', this.mouseUpHandler);
    }
    private disableDrawEvents() {
        this.map?.off('mousedown', this.mouseDownHandler);
        this.map?.off('mousemove', this.mouseMoveHandler);
        this.map?.off('mouseup', this.mouseUpHandler);
    }
}