import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { createWebGLLayer } from '../src/map/layer/webgl-layer';
import { ModeTypeControl } from '../src/map/control/mode-type-control';
import { GeometryTypeControl } from '../src/map/control/geometry-type-control';
import { DRAW_SOURCE, DRAW_SOURCE_ID } from '../src/map/const/source-const';
import { LINE_LAYER, POINT_LAYER, POLYGON_LAYER } from '../src/map/const/layer-const';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [151.21, -33.87],
  zoom: 20
});

map.addControl(new ModeTypeControl());
map.addControl(new GeometryTypeControl());
map.on('load', () => {

  // const helsinki = mapboxgl.MercatorCoordinate.fromLngLat({ lng: 25.004, lat: 60.239 });
  // const berlin  = mapboxgl.MercatorCoordinate.fromLngLat({ lng: 13.403, lat: 52.562 });
  // const kyiv = mapboxgl.MercatorCoordinate.fromLngLat({ lng: 30.498, lat: 50.541 });
  
  // map.addLayer(createWebGLLayer(
  //   { id: "webgl-layer", renderingMode: "2d", drawType: "face" },
  //   [helsinki, berlin, kyiv]
  // ));

  map.addSource(DRAW_SOURCE_ID, DRAW_SOURCE);
  map.addLayer(POINT_LAYER);
  map.addLayer(LINE_LAYER);
  map.addLayer(POLYGON_LAYER);




  const triangle = {
  type: 'Feature'as const,
  id: 'triangle-1',
  properties: {},
  geometry: {
    type: 'Polygon'as const,
    coordinates: [[
      [151.20, -33.87],
      [151.21, -33.87],
      [151.205, -33.86],
      [151.20, -33.87] // must close ring
    ]]
  }
  };
  
  const source = map.getSource(DRAW_SOURCE_ID) as mapboxgl.GeoJSONSource;

source.setData({
  type: 'FeatureCollection',
  features: [triangle]
});


});
