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
		this.gl.useProgram(program);
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
