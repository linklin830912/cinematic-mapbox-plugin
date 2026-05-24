import { MercatorCoordinate } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { DrawType, RenderModeType } from './type';

export type WebGLLayer = mapboxgl.CustomLayerInterface & {
  drawType: DrawType,
};

export type WebGLLayerProps = {
  id: string,
  renderingMode: RenderModeType,
  drawType: DrawType
}

export function createWebGLLayer(props: WebGLLayerProps, vertices: MercatorCoordinate[]): WebGLLayer {
  let program = null as WebGLProgram | null;
  let buffer = null as WebGLBuffer | null;
  let aPos = -1 as number;

  return {
    id: props.id,
    type: 'custom',
    renderingMode: props.renderingMode,
    drawType: props.drawType,

    onAdd(map: mapboxgl.Map, gl: WebGLRenderingContext) {
      const vertexSource = `
        uniform mat4 u_matrix;
        attribute vec2 a_pos;
        void main() {
          gl_Position = u_matrix * vec4(a_pos, 0.0, 1.0);

          gl_PointSize = 60.0;
        }`;

      const fragmentSource = `
        void main() {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 0.5);
        }`;

      const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
      gl.shaderSource(vertexShader, vertexSource);
      gl.compileShader(vertexShader);

      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
      gl.shaderSource(fragmentShader, fragmentSource);
      gl.compileShader(fragmentShader);

      program = gl.createProgram()!;
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      aPos = gl.getAttribLocation(program, 'a_pos');

      const arr = new Float32Array(vertices.length * 2);
      vertices.forEach((x, i) => {
        arr[i * 2] = x.x;
        arr[i * 2 + 1] = x.y;
      });
      
      buffer = gl.createBuffer()!;
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        arr,
        gl.STATIC_DRAW
      );
    },

    render(gl: WebGLRenderingContext, matrix: number[]) {
      if (!program || !buffer) return;
      gl.useProgram(program);
      gl.uniformMatrix4fv(
        gl.getUniformLocation(program, 'u_matrix'),
        false,
        matrix
      );
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      drawCall(props.drawType, gl);
    }
  };
}

function drawCall(drawType: DrawType, gl: WebGLRenderingContext) {    
  switch (drawType) {
    case 'point':
      gl.drawArrays(gl.POINTS, 0, 3);
      break;
    case 'polyline':
      gl.drawArrays(gl.LINE_STRIP, 0, 3);
      break;
    case 'face':
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      break;
  }
}