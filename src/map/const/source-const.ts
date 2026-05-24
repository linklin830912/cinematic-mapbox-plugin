export const DRAW_SOURCE_ID = 'point-source';

export const DRAW_SOURCE = {
    type: 'geojson' as const,
    data: {
        type: 'FeatureCollection' as const,
        features: []
    }
}
