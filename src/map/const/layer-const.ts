import { DRAW_SOURCE_ID } from "./source-const";

const POINT_LAYER_ID = 'point-layer';
const LINE_LAYER_ID = 'line-layer';
const POLYGON_LAYER_ID = 'polygon-layer';

export const POINT_LAYER = {
  id: POINT_LAYER_ID,
  type: 'circle' as const,
  source: DRAW_SOURCE_ID,
  filter: ['==', '$type', 'Point']
}

export const LINE_LAYER = {
  id: LINE_LAYER_ID,
  type: 'line' as const,
  source: DRAW_SOURCE_ID,
  filter: ['==', '$type', 'LineString']
}

export const POLYGON_LAYER = {
  id: POLYGON_LAYER_ID,
  type: 'fill' as const,
  source: DRAW_SOURCE_ID,
  filter: ['==', '$type', 'Polygon']
}