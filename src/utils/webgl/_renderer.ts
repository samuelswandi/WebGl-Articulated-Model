import { degToRad, m4 } from "../../math/mat4";
import Model from "../../models/model";
import { PROJECTION } from "../../types/proj.d";
import WebGlManager from "./_manager";

export default class WebGlRenderer {
	protected gl: WebGLRenderingContext;
	protected program: WebGLProgram;

	private model: Model | null;
	private projectionMatrix: any[];
	private shading: boolean = true;

	cameraAngle = degToRad(0);
	cameraRadius = 500;

	constructor(manager: WebGlManager) {
		this.gl = manager.gl;
		this.program = manager.program!;
		this.model = null;

		this.projectionMatrix = [];
		this.setProjection(PROJECTION.PERSPECTIVE);
	}

	public attachUI() {
		let shadingControl = document.getElementById("shading") as HTMLInputElement;
		this.shading = shadingControl.checked;

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

	private changeCameraOrtObl() {
		let cAcontrol = document.getElementById(
			"camera-angle"
		) as HTMLInputElement;

		cAcontrol.value = "-180";
	}

	public setModel(model: Model) {
		this.model = model;
	}

	public setShading(shading: boolean) {
		this.shading = shading;
	}

	// TODO: set projection here
	public setProjection(projection: string) {
		// Orthographic projection parameters.
		const left = 0;
		const right = (this.gl.canvas as HTMLCanvasElement).clientWidth;
		const bottom = 0;
		const top = (this.gl.canvas as HTMLCanvasElement).clientHeight;
		const near = 850;
		const far = -850;

		// Perspective projection parameters.
		const fov = degToRad(60);
		const aspect = (this.gl.canvas as HTMLCanvasElement).clientWidth / (this.gl.canvas as HTMLCanvasElement).clientHeight;
		const zNear = 0.1;
		const zFar = 2000;

		// Oblique projection parameters.
		const theta = 45;
		const phi = 45;

        switch(projection) {
            case PROJECTION.PERSPECTIVE:
                this.projectionMatrix = m4.perspective(fov, aspect, zNear, zFar);
                break;

            case PROJECTION.OBLIQUE:
                var ortho = m4.orthographic(right, left, bottom, top, near, far);
                var oblique = m4.oblique(-theta, -phi);
                oblique = m4.multiply(oblique, ortho)
                oblique = m4.translate(oblique, 250, 350, 500);
				this.changeCameraOrtObl();

                this.projectionMatrix = oblique;
                break;

            case PROJECTION.ORTHOGRAPHIC:
                this.projectionMatrix = m4.orthographic(right, left, bottom, top, near, far);
				this.projectionMatrix = m4.translate(this.projectionMatrix, 250, 350, 500);
				this.changeCameraOrtObl();

                break;
        }
	}
	
	render() {
		this.attachUI();
		this.model!.draw!(this.projectionMatrix, this.shading, this.cameraAngle, this.cameraRadius);
	}
}
