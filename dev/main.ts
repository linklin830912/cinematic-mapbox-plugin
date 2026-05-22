import mapboxgl from 'mapbox-gl';
import { DrawLineControl } from '../src/control';

import 'mapbox-gl/dist/mapbox-gl.css';
import { createWebGLLayer } from '../src/layer/webgl-layer';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';
console.log('Mapbox Access Token:', mapboxgl.accessToken);
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [25.004, 60.239],
  zoom: 10
});

map.addControl(new DrawLineControl());
map.on('load', () => {

      const helsinki = mapboxgl.MercatorCoordinate.fromLngLat({ lng: 25.004, lat: 60.239 });
      const berlin  = mapboxgl.MercatorCoordinate.fromLngLat({ lng: 13.403, lat: 52.562 });
      const kyiv = mapboxgl.MercatorCoordinate.fromLngLat({ lng: 30.498, lat: 50.541 });
  
  
  map.addLayer(createWebGLLayer(
    { id: "webgl-layer", renderingMode: "2d", drawType: "face" },
    [helsinki, berlin, kyiv]));
  });
