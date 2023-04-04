import { degToRad, mat4 } from "../math/mat4.js";

function drawScenes(webGlManager) {
	var gl = webGlManager.gl;
	var programInfo = webGlManager.programInfo;
	var buffers = webGlManager.buffers;
	var states = webGlManager.states;
	
	gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
	gl.clearDepth(1.0); // Clear everything
	gl.enable(gl.DEPTH_TEST); // Enable depth testing
	gl.depthFunc(gl.LEQUAL); // Near things obscure far things
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// const i = 0
	for (let i = 0 ; i < states.length ; i++) {
		const projectionMatrix = getProjectedMatrix(states[i], gl);
		const modelViewMatrix = getTransformedMVMatrix(states[i]);
		const normalMatrix = getTransformedNMatrix(states[i], modelViewMatrix);
	
		setPositionAttribute(gl, buffers[i], programInfo);
		setColorAttribute(gl, buffers[i], programInfo);
		setNormalAttribute(gl, buffers[i], programInfo);
	
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers[i].indices);
		gl.useProgram(programInfo.program);
		gl.uniformMatrix4fv(
			programInfo.uniformLocations.projectionMatrix,
			false,
			new Float32Array(projectionMatrix)
		);
		gl.uniformMatrix4fv(
			programInfo.uniformLocations.modelViewMatrix,
			false,
			new Float32Array(modelViewMatrix)
		);
		gl.uniformMatrix4fv(
			programInfo.uniformLocations.normalMatrix,
			false,
			normalMatrix,
			new Float32Array(normalMatrix)
		);
	
		gl.uniform1i(programInfo.uniformLocations.shadingLocation, states[i].isShading);
		{
			const vertexCount = states[i].shape.indices.length;
			const type = gl.UNSIGNED_SHORT;
			const offset = 0;
			gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
		}
	}
}

function drawScene(webGlManager) {
	var gl = webGlManager.gl;
	var programInfo = webGlManager.programInfo;
	var buffers = webGlManager.buffers;
	var state = webGlManager.state;

	gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
	gl.clearDepth(1.0); // Clear everything
	gl.enable(gl.DEPTH_TEST); // Enable depth testing
	gl.depthFunc(gl.LEQUAL); // Near things obscure far things
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	const projectionMatrix = getProjectedMatrix(state, gl);
	const modelViewMatrix = getTransformedMVMatrix(state);
	const normalMatrix = getTransformedNMatrix(state, modelViewMatrix);

	setPositionAttribute(gl, buffers, programInfo);
	setColorAttribute(gl, buffers, programInfo);
	setNormalAttribute(gl, buffers, programInfo);

	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
	gl.useProgram(programInfo.program);
	gl.uniformMatrix4fv(
		programInfo.uniformLocations.projectionMatrix,
		false,
		new Float32Array(projectionMatrix)
	);
	gl.uniformMatrix4fv(
		programInfo.uniformLocations.modelViewMatrix,
		false,
		new Float32Array(modelViewMatrix)
	);
	gl.uniformMatrix4fv(
		programInfo.uniformLocations.normalMatrix,
		false,
		normalMatrix,
		new Float32Array(normalMatrix)
	);

	gl.uniform1i(programInfo.uniformLocations.shadingLocation, state.isShading);
	{
		const vertexCount = state.shape.indices.length;
		const type = gl.UNSIGNED_SHORT;
		const offset = 0;
		gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
	}
}

// get projected matrix (pers, orth, obl)
function getProjectedMatrix(state, gl) {
	var projectionMatrix = mat4.identity();

	const left = -3;
	const right = 3;
	const bottom = -3;
	const top = 3;
	const zNear = 0.1;
	const zFar = 100;
	const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
	const fieldOfView = degToRad(state.shape.fov);

	switch (state.projectionType) {
		case "perspective":
			projectionMatrix = mat4.perspective(fieldOfView, aspect, zNear, zFar);
			break;

		case "oblique":
			projectionMatrix = mat4.oblique(left, right, bottom, top, zNear, zFar);
			break;

		case "orthographic":
			projectionMatrix = mat4.orthographic(
				left,
				right,
				bottom,
				top,
				zNear,
				zFar
			);
			break;

		default:
			projectionMatrix = mat4.perspective(fieldOfView, aspect, zNear, zFar);
			break;
	}

	return projectionMatrix;
}

// Get normal matrix that has been transformed
function getTransformedNMatrix(state, modelViewMatrix) {
	var normalMatrix = mat4.transpose(mat4.inverse(modelViewMatrix));
	normalMatrix = mat4.xRotate(
		normalMatrix,
		degToRad(-state.transformation.cameraRotation[0]),
	);
	normalMatrix = mat4.yRotate(
		normalMatrix,
		degToRad(-state.transformation.cameraRotation[1]),
	);

	return normalMatrix;
}

// Get model view matrix that has been transformed
function getTransformedMVMatrix(state) {
	var modelViewMatrix = mat4.translate(
		mat4.identity(),
		state.transformation.translation[0],
		state.transformation.translation[1],
		state.transformation.translation[2]
	);

	modelViewMatrix = mat4.xRotate(
		modelViewMatrix, // matrix to rotate
		degToRad(
			state.transformation.rotation[0] +
				state.transformation.cameraRotation[0]
		) // amount to rotate in radians
	);

	modelViewMatrix = mat4.yRotate(
		modelViewMatrix, // matrix to rotate
		degToRad(
			state.transformation.rotation[1] +
				state.transformation.cameraRotation[1]
		) // amount to rotate in radians
	);

	modelViewMatrix = mat4.zRotate(
		modelViewMatrix, // matrix to rotate
		degToRad(state.transformation.rotation[2]) // amount to rotate in radians
	);

	// scale
	modelViewMatrix = mat4.scale(
		modelViewMatrix,
		state.transformation.scale[0],
		state.transformation.scale[1],
		state.transformation.scale[2]
	);

	return modelViewMatrix;
}

// Tell WebGL how to pull out the normals from
// the normal buffer into the vertexNormal attribute.
function setNormalAttribute(gl, buffers, programInfo) {
	const numComponents = 3;
	const type = gl.FLOAT;
	const normalize = false;
	const stride = 0;
	const offset = 0;
	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
	gl.vertexAttribPointer(
		programInfo.attribLocations.vertexNormal,
		numComponents,
		type,
		normalize,
		stride,
		offset
	);
	gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
}

// Tell WebGL how to pull out the positions from the position
// buffer into the vertexPosition attribute.
function setPositionAttribute(gl, buffers, programInfo) {
	const numComponents = 3; // pull out 3 values per iteration
	const type = gl.FLOAT; // the data in the buffer is 32bit floats
	const normalize = false; // don't normalize
	const stride = 0; // how many bytes to get from one set of values to the next
	// 0 = use type and numComponents above
	const offset = 0; // how many bytes inside the buffer to start from
	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
	gl.vertexAttribPointer(
		programInfo.attribLocations.vertexPosition,
		numComponents,
		type,
		normalize,
		stride,
		offset
	);
	gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
}

// Tell WebGL how to pull out the colors from the color buffer
// into the vertexColor attribute.
function setColorAttribute(gl, buffers, programInfo) {
	const numComponents = 4;
	const type = gl.FLOAT;
	const normalize = false;
	const stride = 0;
	const offset = 0;
	gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
	gl.vertexAttribPointer(
		programInfo.attribLocations.vertexColor,
		numComponents,
		type,
		normalize,
		stride,
		offset
	);
	gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
}

export { drawScene, drawScenes };
