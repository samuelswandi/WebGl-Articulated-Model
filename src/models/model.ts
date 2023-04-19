import { degToRad, isPowerOf2, m4, normalize, subtractVectors } from "../math/mat4";
import WebGlLocation from "../utils/webgl/_location";
import WebGlManager from "../utils/webgl/_manager";
import Shape from "./shape";
import { TextureFactory } from "./textureFactory";

export default class Model {
	gl?: WebGLRenderingContext;
	program?: WebGLProgram;
	location?: WebGlLocation;

	name: string = "Model";
	// shape for vertices etc
	shape: Shape;
	texture?: HTMLImageElement = new Image();

	// buffer
	positionBuffer?: WebGLBuffer;
	normalBuffer?: WebGLBuffer;
	textureBuffer?: WebGLBuffer;

	// initial transformation
	translation: [number, number, number] = [0, 0, 0];
	scale: [number, number, number] = [1, 1, 1];
	rotation: [number, number, number] = [0, 0, 0];
	
	// UI movement
	deltaTranslation?: [number, number, number] = [0, 0, 0];
	deltaScale?: [number, number, number] = [1, 1, 1];
	cameraAngle? = degToRad(0);
	cameraRadius? = 500;
	
	// mouse rot
	mouse?: [number, number] = [0,0];
	mouseRot?: [number, number] = [0,0];
	mouseDown?: boolean = false;

	// Child models
	children: Model[] = [];

	textures: WebGLTexture[];

	tangentBuffer?: WebGLBuffer;
	bitangentBuffer?: WebGLBuffer;

	constructor(manager: WebGlManager, location: WebGlLocation, shape: Shape) {
		this.location = location;
		this.gl = manager.gl;
		this.program = manager.program!;

		this.shape = shape;

		this.positionBuffer = this.gl.createBuffer()!;
		this.normalBuffer = this.gl.createBuffer()!;
		this.textureBuffer = this.gl.createBuffer()!;


		const bumpTexture = TextureFactory.getInstance(manager)!.getBumpTexture()!
		this.textures = [bumpTexture];
		this.initMouse!();
	}

	// rotation
	initMouse?() {
		document.getElementById("canvas")!.addEventListener("mousemove", (e: MouseEvent) => {
			if (this.mouseDown) {
				var mouseDelta = [(+e.clientX - this.mouse![0]) * 0.3, (+e.clientY - this.mouse![1]) * 0.3];

				this.rotation[0] += degToRad(mouseDelta[1]);
				this.rotation[1] += degToRad(mouseDelta[0]);

				this.mouse = [e.clientX, e.clientY];
			}
		})

		document.getElementById("canvas")!.addEventListener("mousedown", (e: MouseEvent) => {
			this.mouseDown = true;
			this.mouse = [e.clientX, e.clientY];
		})

		document.getElementById("canvas")!.addEventListener("mouseup", () => {
			this.mouseDown = false;
		})
	}

	attachUI?() {
		// UI translation & scale
		var xControl = document.getElementById("translate-x") as HTMLInputElement;
		var yControl = document.getElementById("translate-y") as HTMLInputElement;
		var zControl = document.getElementById("translate-z") as HTMLInputElement;

		this.deltaTranslation = [+xControl.value, +yControl.value, +zControl.value];

		var xScale = document.getElementById("scale-x") as HTMLInputElement;
		var yScale = document.getElementById("scale-y") as HTMLInputElement;
		var zScale = document.getElementById("scale-z") as HTMLInputElement;

		this.deltaScale = [+xScale.value, +yScale.value, +zScale.value];

		// camera
		let cRcontrol = document.getElementById(
			"camera-radius"
		) as HTMLInputElement;
		let cAcontrol = document.getElementById(
			"camera-angle"
		) as HTMLInputElement;

		this.cameraAngle = degToRad(+cAcontrol.value);
		this.cameraRadius = +cRcontrol.value;
	}

	bind?() {
		this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, this.positionBuffer!);
		this.setGeometry!();

		this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, this.normalBuffer!);
		this.setNormals!();

		this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, this.textureBuffer!);
		this.setTexture!();

		var texture = this.gl!.createTexture();
		this.gl!.bindTexture(this.gl!.TEXTURE_2D, texture);

		this.gl!.texImage2D(
			this.gl!.TEXTURE_2D,
			0,
			this.gl!.RGBA,
			1,
			1,
			0,
			this.gl!.RGBA,
			this.gl!.UNSIGNED_BYTE,
			new Uint8Array([0, 0, 255, 255])
		);

		// Now that the image has loaded make copy it to the texture.
		this.gl!.bindTexture(this.gl!.TEXTURE_2D, texture);
		this.gl!.texImage2D(
			this.gl!.TEXTURE_2D,
			0,
			this.gl!.RGBA,
			this.gl!.RGBA,
			this.gl!.UNSIGNED_BYTE,
			this.texture!
		);

		// Check if the image is a power of 2 in both dimensions.
		if (isPowerOf2(this.texture!.width) && isPowerOf2(this.texture!.height)) {
			// Yes, it's a power of 2. Generate mips.
			this.gl!.generateMipmap(this.gl!.TEXTURE_2D);
		} else {
			// No, it's not a power of 2. Turn of mips and set wrapping to clamp to edge
			this.gl!.texParameteri(
				this.gl!.TEXTURE_2D,
				this.gl!.TEXTURE_WRAP_S,
				this.gl!.CLAMP_TO_EDGE
			);
			this.gl!.texParameteri(
				this.gl!.TEXTURE_2D,
				this.gl!.TEXTURE_WRAP_T,
				this.gl!.CLAMP_TO_EDGE
			);
			this.gl!.texParameteri(
				this.gl!.TEXTURE_2D,
				this.gl!.TEXTURE_MIN_FILTER,
				this.gl!.LINEAR
			);
		}

		// Start binding the tangent buffers.
		this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, this.tangentBuffer!);
		// Set the tangent.
		this.gl!.bufferData(this.gl!.ARRAY_BUFFER, new Float32Array(this.getTangent()), this.gl!.STATIC_DRAW);
		
		// Start binding the bitangent buffers.
		this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, this.bitangentBuffer!);
		// Set the bitangent.
		this.gl!.bufferData(this.gl!.ARRAY_BUFFER, new Float32Array(this.getBitangent()), this.gl!.STATIC_DRAW);
	}

	buffers?() {
		this.gl!.enableVertexAttribArray(this.location!.position);
		this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, this.positionBuffer!);

		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		var size = 3; // 3 components per iteration
		var type = this.gl!.FLOAT; // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0; // start at the beginning of the buffer
		this.gl!.vertexAttribPointer(
			this.location!.position,
			size,
			type,
			normalize,
			stride,
			offset
		);

		this.gl!.enableVertexAttribArray(this.location!.normal);
		this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, this.normalBuffer!);

		// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
		var size = 3; // 3 components per iteration
		var type = this.gl!.FLOAT; // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0; // start at the beginning of the buffer
		this.gl!.vertexAttribPointer(
			this.location!.normal,
			size,
			type,
			normalize,
			stride,
			offset
		);

		// Turn on the texcoord attribute
		this.gl!.enableVertexAttribArray(this.location!.texture);

		// bind the texcoord buffer.
		this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, this.textureBuffer!);

		// Tell the texcoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
		var size = 2; // 2 components per iteration
		var type = this.gl!.FLOAT; // the data is 32bit floats
		var normalize = false; // don't normalize the data
		var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
		var offset = 0; // start at the beginning of the buffer
		this.gl!.vertexAttribPointer(
			this.location!.texture,
			size,
			type,
			normalize,
			stride,
			offset
		);

		// TANGENT.
    // Turn on the tangent attribute
    this.gl!.enableVertexAttribArray(this.location!.tangent);

    // Bind the tangent buffer.
    this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, this.tangentBuffer!);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 3;          // 3 components per iteration
    var type = this.gl!.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    this.gl!.vertexAttribPointer(
      this.location!.tangent, size, type, normalize, stride, offset);

    // BITANGENT.
    // Turn on the bitangent attribute
    this.gl!.enableVertexAttribArray(this.location!.bitangent);

    // Bind the bitangent buffer.
    this.gl!.bindBuffer(this.gl!.ARRAY_BUFFER, this.bitangentBuffer!);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 3;          // 3 components per iteration
    var type = this.gl!.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    this.gl!.vertexAttribPointer(
      this.location!.bitangent, size, type, normalize, stride, offset);
	}

	uniforms?(projectionMatrix: number[], shading: boolean) {
		// Use matrix math to compute a position on a circle where the camera is
		let cameraMatrix = m4.identity();
		cameraMatrix = m4.yRotate(cameraMatrix, this.cameraAngle);
		cameraMatrix = m4.translate(cameraMatrix, 0, 0, this.cameraRadius);

		// Get the camera's position from the matrix we computed
		var cameraPosition = [
			cameraMatrix[12],
			cameraMatrix[13],
			cameraMatrix[14],
		];
		var target = [0, 0, 0];
		var up = [0, 1, 0];

		// Compute the camera's matrix using look at.
		cameraMatrix = m4.lookAt(cameraPosition, target, up);

		// Make a view matrix from the camera matrix.
		var viewMatrix = m4.inverse(cameraMatrix);

		// Compute a view projection matrix
		var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

		var worldMatrix = m4.yRotation(this.rotation[1]);
		worldMatrix = m4.xRotate(worldMatrix, this.rotation[0]);
		worldMatrix = m4.zRotate(worldMatrix, this.rotation[2]);

		worldMatrix = m4.translate(
			worldMatrix, 
			this.translation[0] + this.deltaTranslation![0], 
			this.translation[1] + this.deltaTranslation![1], 
			this.translation[2] + this.deltaTranslation![2]
		);
		worldMatrix = m4.scale(
			worldMatrix, 
			this.scale[0] * this.deltaScale![0], 
			this.scale[1] * this.deltaScale![1], 
			this.scale[2] * this.deltaScale![2]
		);

		// Multiply the matrices.
		var worldViewProjectionMatrix = m4.multiply(
			viewProjectionMatrix,
			worldMatrix
		);

		this.gl!.uniformMatrix4fv(
			this.location!.worldView,
			false,
			worldViewProjectionMatrix
		);
		this.gl!.uniformMatrix4fv(this.location!.world, false, worldMatrix);

		// Set the color to use
		this.gl!.uniform4fv(this.location!.color, [1, 1, 1, 1]); // green

		// set the light direction.
		this.gl!.uniform3fv(this.location!.light, normalize([0.5, 0.7, 1]));

		// Tell the shader to use texture unit 0 for u_texture
		this.gl!.uniform1i(this.location!.textureU, 0);

		// set shading
		this.gl!.uniform1i(this.location!.shading, Number(shading));

		// set normal matrix
		const viewModelMatrix = m4.multiply(viewMatrix, this.shape.positions);
		const normalMatrix = m4.inverseTranspose(viewModelMatrix);
		this.gl!.uniformMatrix4fv(this.location!.normalMatrix, false, normalMatrix)

		this.gl!.uniform1i(this.location!.textureBump, 2);
		this.gl!.activeTexture(this.gl!.TEXTURE2);
		this.gl!.bindTexture(this.gl!.TEXTURE_2D, this.textures[0]);
	}

	setGeometry?() {
		var positions = new Float32Array(this.shape.positions);
		var matrix = m4.xRotation(Math.PI);
		matrix = m4.translate(matrix, -50, -50, -15);

		for (var ii = 0; ii < positions.length; ii += 3) {
			var vector = m4.transformPoint(
				matrix,
				[positions[ii + 0], positions[ii + 1], positions[ii + 2], 1],
				vector
			);
			positions[ii + 0] = vector[0];
			positions[ii + 1] = vector[1];
			positions[ii + 2] = vector[2];
		}

		this.gl!.bufferData(
			this.gl!.ARRAY_BUFFER,
			positions,
			this.gl!.STATIC_DRAW
		);
	}

	setNormals?() {
		var normals = new Float32Array(this.shape.normals);
		this.gl!.bufferData(this.gl!.ARRAY_BUFFER, normals, this.gl!.STATIC_DRAW);
	}

	setTexture?() {
		this.gl!.bufferData(
			this.gl!.ARRAY_BUFFER,
			new Float32Array(this.shape.textureCoord),
			this.gl!.STATIC_DRAW
		);
	}

	_recursiveDraw?(projectionMatrix: number[], shading: boolean) {
		this.attachUI!();
		this.bind!();
		this.buffers!();
		this.uniforms!(projectionMatrix, shading);
		
		// draw
		var primitiveType = this.gl!.TRIANGLES;
		var offset = 0;
		var count = this.shape.num_vertices;
		this.gl!.drawArrays(primitiveType, offset, count);

		// draw children
		this.children.forEach((child) => {
			child.texture = this.texture;  // TODO : Gotta edit this if want to change specific single texture
			child._recursiveDraw!(projectionMatrix, shading);
		});
	}

	draw?(projectionMatrix: number[], shading: boolean) {
		// Tell WebGL how to convert from clip space to pixels
		this.gl!.viewport(0, 0, this.gl!.canvas.width, this.gl!.canvas.height);

		// Clear the canvas
		this.gl!.clearColor(0.0, 0.0, 0.0, 0.0);
		this.gl!.clear(this.gl!.COLOR_BUFFER_BIT);

		// Turn on culling. By default backfacing triangles
		// will be culled.
		this.gl!.enable(this.gl!.CULL_FACE);

		// Enable the depth buffer
		this.gl!.enable(this.gl!.DEPTH_TEST);
		
		this._recursiveDraw!(projectionMatrix, shading);
	}

	public getTangent(): number[] {
		let vertexTangents: number[] = [];
		for (let i = 0; i < this.shape.positions.length; i += 18) {
			const p1 = [this.shape.positions[i], this.shape.positions[i+1], this.shape.positions[i+2]];
			const p2 = [this.shape.positions[i+3], this.shape.positions[i+4], this.shape.positions[i+5]];
			const vec1 = subtractVectors(p2, p1);
			const vecTangent = normalize(vec1);

			for (let j = 0; j < 6; j++){
				vertexTangents = vertexTangents.concat(vecTangent);
			}
		}
		return vertexTangents;
	}

	public getBitangent() : number[] {
		let vertexBitangents: number[] = [];
		for (let i = 0; i < this.shape.positions.length; i += 18) {
			const p1 = [this.shape.positions[i], this.shape.positions[i+1], this.shape.positions[i+2]];
			const p3 = [this.shape.positions[i+6], this.shape.positions[i+7], this.shape.positions[i+8]];
			const vec = subtractVectors(p3, p1);
			const vecBitangent = normalize(vec);

			for (let j = 0; j < 6; j++){
				vertexBitangents = vertexBitangents.concat(vecBitangent);
			}
		}
		return vertexBitangents;
	}
}
