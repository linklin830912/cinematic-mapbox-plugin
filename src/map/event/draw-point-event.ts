import { DRAW_SOURCE_ID } from "../const/source-const";
import { DrawEvent } from "./type";

export class DrawPointEvent extends DrawEvent {

    sourceId = DRAW_SOURCE_ID;
    
    override onMouseDown(map: mapboxgl.Map, event: MouseEvent) {
        super.onMouseDown(map, event);
        const lngLat = map.unproject([event.offsetX, event.offsetY]);
        console.log('point drawn at: ', lngLat);
        const pointFeature = {
            type: 'Feature' as const,
            geometry: {
                type: 'Point' as const,
                coordinates: [lngLat.lng, lngLat.lat],                
            },
            properties: {}
        };
        const source = map.getSource(this.sourceId) as mapboxgl.GeoJSONSource;
        if (source) {
            source.setData({
                type: 'FeatureCollection' as const,
                features: [pointFeature]
            });
        }
    }
    override onMouseMove(map: mapboxgl.Map, event: MouseEvent) {
        super.onMouseMove(map, event);
    }
    override onMouseUp(map: mapboxgl.Map, event: MouseEvent) {
        super.onMouseUp(map, event);
    }
}