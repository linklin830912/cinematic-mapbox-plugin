import { IControl, Map as MapboxMap, ControlPosition } from 'mapbox-gl';

export class DrawLineControl implements IControl {
  private container?: HTMLButtonElement;
  private map?: MapboxMap;

  private enabled = false;
  private coordinates: [number, number][] = [];

  private sourceId = 'line-draw-source';
  private layerId = 'line-draw-layer';

  onAdd(map: MapboxMap): HTMLElement {
    this.map = map;

    const container = document.createElement('div');
    container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

    this.container = document.createElement('button');
    this.container.type = 'button';
    this.container.textContent = 'Draw Line';

    this.container.style.padding = '6px 10px';
    this.container.style.cursor = 'pointer';
    this.container.style.background = '#fff';
    this.container.style.border = 'none';

    this.container.onclick = () => this.toggleDrawing();

    container.appendChild(this.container);
    return container;
  }

  private toggleDrawing() {
    if (!this.map) return;

    this.enabled = !this.enabled;
    this.container!.style.background = this.enabled ? '#d0f0ff' : 'red';

    if (this.enabled) {
      this.activate();
    } else {
      this.deactivate();
    }
  }

  private activate() {
    if (!this.map) return;

    // Add source if not exists
    if (!this.map.getSource(this.sourceId)) {
      this.map.addSource(this.sourceId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: [],
          },
          properties: {},
        },
      });

      this.map.addLayer({
        id: this.layerId,
        type: 'line',
        source: this.sourceId,
        paint: {
          'line-color': '#ff0000',
          'line-width': 3,
        },
      });
    }

    this.map.on('click', this.onMapClick);
  }

  private deactivate() {
    if (!this.map) return;
    this.map.off('click', this.onMapClick);
    this.coordinates = [];
    this.updateLine();
  }

  private onMapClick = (e: mapboxgl.MapMouseEvent) => {
    if (!this.enabled || !this.map) return;

    this.coordinates.push([e.lngLat.lng, e.lngLat.lat]);
    this.updateLine();
  };

  private updateLine() {
    if (!this.map) return;

    const source = this.map.getSource(this.sourceId) as mapboxgl.GeoJSONSource;

    const data: GeoJSON.Feature = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: this.coordinates,
      },
      properties: {},
    };

    source.setData(data);
  }

  onRemove(): void {
    if (!this.map) return;

    this.map.off('click', this.onMapClick);

    if (this.map.getLayer(this.layerId)) {
      this.map.removeLayer(this.layerId);
    }

    if (this.map.getSource(this.sourceId)) {
      this.map.removeSource(this.sourceId);
    }

    this.container?.remove();
    this.container = undefined;
    this.map = undefined;
  }

  getDefaultPosition(): ControlPosition {
    return 'top-right';
  }
}