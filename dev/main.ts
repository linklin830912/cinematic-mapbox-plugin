import mapboxgl from 'mapbox-gl';
import { SimpleControl } from '../src';

import 'mapbox-gl/dist/mapbox-gl.css';

console.log("!!!",import.meta.env);
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || '';
console.log("Using Mapbox token:", mapboxgl.accessToken);
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v12',
  center: [151.2093, -33.8688],
  zoom: 10
});

map.addControl(new SimpleControl());