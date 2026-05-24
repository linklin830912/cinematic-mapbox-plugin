import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { createWebGLLayer } from '../src/map/layer/webgl-layer';
import { ModeTypeControl } from '../src/map/control/mode-type-control';
import { GeometryTypeControl } from '../src/map/control/geometry-type-control';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [25.004, 60.239],
  zoom: 10
});

map.addControl(new ModeTypeControl());
map.addControl(new GeometryTypeControl());
map.on('load', () => {

      const helsinki = mapboxgl.MercatorCoordinate.fromLngLat({ lng: 25.004, lat: 60.239 });
      const berlin  = mapboxgl.MercatorCoordinate.fromLngLat({ lng: 13.403, lat: 52.562 });
      const kyiv = mapboxgl.MercatorCoordinate.fromLngLat({ lng: 30.498, lat: 50.541 });
  
  
  map.addLayer(createWebGLLayer(
    { id: "webgl-layer", renderingMode: "2d", drawType: "face" },
    [helsinki, berlin, kyiv]));
  });
