export class DrawEvent {
    isMouseDown: boolean = false;
    isDragging: boolean = false;
    sourceId: string = '';

    onMouseDown (map: mapboxgl.Map, event: MouseEvent) {
        this.isMouseDown = true;
    }

    onMouseMove (map: mapboxgl.Map, event: MouseEvent){
        if(this.isMouseDown) {
            this.isDragging = true;
        }
    }

    onMouseUp (map: mapboxgl.Map, event: MouseEvent){
        this.isMouseDown = false;
        this.isDragging = false;
    }
}

const onClick = (e: mapboxgl.MapMouseEvent) => {
  console.log('drawing...');
};

export function enableDraw(map : mapboxgl.Map) {
  map.on('click', onClick);
}

export function disableDraw(map : mapboxgl.Map) {
  map.off('click', onClick);
}