import { importBaseShape } from "./files/import.js";
import { drawScene, drawScenes } from "./webgl/draw.js";
import { WebGlManager } from "./webgl/webgl.js";
// import { Man } from "./test/man.js";
import { Sheep } from "./test/sheep.js";

var states = [];

const drawModel = (gl, model) => {
	if (model.length == 0) {
		return;
	}

	let state = {
		// animation: true, idk if this exist
		projectionType: model["projection"],
		isShading: true,
		shape: importBaseShape(model["shape"]),
		transformation: {
			translation: model["trans_obj"],
			rotation: model["rot_obj"],
			scale: model["scale_obj"],
			cameraRotation: [0,0],
		},
	};

	states.push(state);

	for (let i = 0 ; i < model["children"].length ; i++) {
		drawModel(gl, model["children"][i])
	}
	
}

function main() {
    const canvas = document.querySelector("#canvas");
	const gl = canvas.getContext("webgl");
	if (gl === null) {
		alert(
			"Unable to initialize WebGL. Your browser or machine may not support it."
		);
		return;
	}

	drawModel(gl, Sheep);

    var webGlManager = new WebGlManager(gl, states)
    webGlManager.init()

	function render() {
		drawScenes(webGlManager);
		requestAnimationFrame(render);
	}
	requestAnimationFrame(render);
}

main();
