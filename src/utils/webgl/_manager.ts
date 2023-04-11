import { fsSource } from "../shader/_fragment";
import { vsSource } from "../shader/_vertex";

export default class WebGlManager {
	public gl: WebGLRenderingContext;
	public program: WebGLProgram | undefined;

	constructor() {
		var canvas = document.querySelector("#canvas") as HTMLCanvasElement;
		this.gl = canvas.getContext("webgl") as WebGLRenderingContext;
		if (!this.gl) {
			alert(
				"Unable to initialize WebGL. Your browser or machine may not support it."
			);
			return;
		}
		this.init();
	}

	init() {
		var program = this.gl.createProgram() as WebGLProgram;
		const vertexShader = this.shader(this.gl.VERTEX_SHADER, vsSource);
		const fragmentShader = this.shader(this.gl.FRAGMENT_SHADER, fsSource);

		this.gl.attachShader(program, vertexShader);
		this.gl.attachShader(program, fragmentShader);
		this.gl.linkProgram(program);

		if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
			alert(
				`Unable to initialize the shader program: ${this.gl.getProgramInfoLog(
					program
				)}`
			);
			console.log(this.gl.getProgramInfoLog(program));
			return;
		}

		this.program = program;
		this.setUniformVariable(program, "u_resolution", this.gl.canvas.width, this.gl.canvas.height);
		this.gl.useProgram(program);
	}

	setUniformVariable(
		program: WebGLProgram,
		uniformName: string,
		...uniformData: number[]
	) {
		// Get the location of the uniform.
		const uniformLocation = this.gl.getUniformLocation(program, uniformName);

		// Set the uniform based on length of the data.
		switch (uniformData.length) {
		  case 1:
			this.gl.uniform1f(uniformLocation, uniformData[0]);
			break;
		  case 2:
			this.gl.uniform2f(uniformLocation, uniformData[0], uniformData[1]);
			break;
		  case 3:
			this.gl.uniform3f(uniformLocation, uniformData[0], uniformData[1], uniformData[2]);
			break;
		  case 4:
			this.gl.uniform4f(uniformLocation, uniformData[0], uniformData[1], uniformData[2], uniformData[3]);
			break;
		  default:
			throw "Invalid uniform data length.";
		}
	}

	shader(type: number, source: string): WebGLShader {
		var shader = this.gl.createShader(type) as WebGLShader;
		this.gl.shaderSource(shader, source);
		this.gl.compileShader(shader);
		if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
			alert(
				`Unable to initialize the shader program: ${this.gl.getShaderInfoLog(
					shader
				)}`
			);
			console.log(this.gl.getShaderInfoLog(shader));
			this.gl.deleteShader(shader);
		}

		return shader;
	}
}
