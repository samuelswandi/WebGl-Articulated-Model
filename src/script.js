import { importBaseShape } from "./files/import.js";
import { drawScene } from "./webgl/draw.js";
import { WebGlManager } from "./webgl/webgl.js";

var state = {
	// animation: true, idk if this exist
	cubeRotation: 0.0,
	projectionType: "perspective", // Projection type
	isShading: true,
	shape: importBaseShape("hollow-cube"),
	transformation: {
		translation: [-0.0, 0.0, -10.0],
		rotation: [0, 0, (Math.PI / 180) * 30],
		scale: [1,1,1],
		cameraRotation: [0,0],
	},
};

function main() {
    const canvas = document.querySelector("#canvas");
	const gl = canvas.getContext("webgl");
	if (gl === null) {
		alert(
			"Unable to initialize WebGL. Your browser or machine may not support it."
		);
		return;
	}

    // ini web gl manager
    var webGlManager = new WebGlManager(gl, state)
    webGlManager.init()

	function render() {
		drawScene(webGlManager);
		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}

main();
