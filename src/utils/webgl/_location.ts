import WebGlManager from "./_manager";

export default class WebGlLocation {
	protected gl: WebGLRenderingContext;
	protected program: WebGLProgram;

	public position: number;
	public normal: number;
	public texture: number;

	// public resolution: WebGLUniformLocation;
	public shading: WebGLUniformLocation;
	public matrix: WebGLUniformLocation;
	public color: WebGLUniformLocation;
	public light: WebGLUniformLocation;
	public world: WebGLUniformLocation;
	public worldView: WebGLUniformLocation;
	public textureU: WebGLUniformLocation;

	constructor(manager: WebGlManager) {
		this.gl = manager.gl;
		this.program = manager.program!;

		this.position = this.gl.getAttribLocation(this.program, "a_position");
		this.normal = this.gl.getAttribLocation(this.program, "a_normal");
		this.texture = this.gl.getAttribLocation(this.program, "a_texcoord");

		// this.resolution = this.gl.getUniformLocation(this.program, "u_resolution")!;
		this.shading = this.gl.getUniformLocation(this.program, "u_shading")!;
		this.matrix = this.gl.getUniformLocation(this.program, "u_matrix")!;
		this.color = this.gl.getUniformLocation(this.program, "u_color")!;
		this.light = this.gl.getUniformLocation(this.program, "u_reverseLightDirection")!;
		this.world = this.gl.getUniformLocation(this.program, "u_world")!;
		this.worldView = this.gl.getUniformLocation(this.program, "u_worldViewProjection")!;
		this.textureU = this.gl.getUniformLocation(this.program, "u_texture")!;
	}
}
