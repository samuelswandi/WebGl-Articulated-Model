import { getVectorNormal } from "../math/mat4.js";

function initBuffers(gl, state) {
	const positionBuffer = initPositionBuffer(gl, state);
	const colorBuffer = initColorBuffer(gl, state);
	const indexBuffer = initIndexBuffer(gl, state);
	const normalBuffer = initNormalBuffer(gl, state);

	return {
	  position: positionBuffer,
	  normal: normalBuffer,
	  color: colorBuffer,
	  indices: indexBuffer,
	};
}

function initNormalBuffer(gl, state) {
	const normalBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  
	gl.bufferData(
	  gl.ARRAY_BUFFER,
	  new Float32Array(getVectorNormal(state.shape.vertices)),
	  gl.STATIC_DRAW
	);
  
	return normalBuffer;
  }

function initIndexBuffer(gl, state) {
	const indexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(state.shape.indices), gl.STATIC_DRAW);
	
	return indexBuffer;
}

function initPositionBuffer(gl, state) {
	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(state.shape.vertices), gl.STATIC_DRAW);

	return positionBuffer;
}

function initColorBuffer(gl, state) {
	var colors = [];

	for (var j = 0; j <= state.shape.colors.length/3+1; j+=3) {
		const c0 = state.shape.colors[j];
		const c1 = state.shape.colors[j+1];
		const c2 = state.shape.colors[j+2];
		const c = [c0/255,c1/255,c2/255,1];

		// Repeat each color four times for the four vertices of the face
		colors = colors.concat(c, c, c, c);
	}

	const colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

	return colorBuffer;
}

export { initBuffers };
