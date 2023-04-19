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
	public normalMatrix: WebGLUniformLocation;
	
	public textureImage: WebGLUniformLocation;
	public textureBump: WebGLUniformLocation;
	public textureEnvironment : WebGLUniformLocation;
	public tangent: number;
	public bitangent: number;

	public textureMode: WebGLUniformLocation;

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
	
		this.normalMatrix = this.gl.getUniformLocation(this.program, "u_normalMatrix")!;
		
		this.textureImage = this.gl.getUniformLocation(this.program, "u_texture_image")!;
		this.textureBump = this.gl.getUniformLocation(this.program, "u_texture_bump")!;
		this.textureEnvironment = this.gl.getUniformLocation(this.program, "u_texture_environment")!;
		

		this.tangent = this.gl.getAttribLocation(this.program, "a_tangent");
    this.bitangent = this.gl.getAttribLocation(this.program, "a_bitangent");

		this.textureMode = this.gl.getUniformLocation(this.program, "u_textureMode")!;
	
	}
}
