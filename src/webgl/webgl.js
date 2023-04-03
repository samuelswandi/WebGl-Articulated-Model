import { initBuffers } from "./buffer.js";
import { initShaderProgram } from "./shader.js";

export class WebGlManager {
	gl;
	state;
	program;
	buffers;
	programInfo;

	constructor(gl, state) {
		this.gl = gl;
		this.state = state;
	}

	init() {
		this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT);

		var shaderProgram = initShaderProgram(this.gl);
		this.programInfo = {
			program: shaderProgram,
			attribLocations: {
				vertexPosition: this.gl.getAttribLocation(
					shaderProgram,
					"aVertexPosition"
				),
				vertexNormal: this.gl.getAttribLocation(
					shaderProgram,
					"aVertexNormal"
				),
				vertexColor: this.gl.getAttribLocation(
					shaderProgram,
					"aVertexColor"
				),
			},
			uniformLocations: {
				projectionMatrix: this.gl.getUniformLocation(
					shaderProgram,
					"uProjectionMatrix"
				),
				modelViewMatrix: this.gl.getUniformLocation(
					shaderProgram,
					"uModelViewMatrix"
				),
				normalMatrix: this.gl.getUniformLocation(
					shaderProgram,
					"uNormalMatrix"
				),
				shadingLocation: this.gl.getUniformLocation(
					shaderProgram,
					"uShading"
				),
			},
		};

		this.buffers = initBuffers(this.gl, this.state);
	}
}
