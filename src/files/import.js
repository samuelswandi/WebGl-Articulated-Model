import { hollowCube } from "../test/hollow-cube.js";
import { hollowHypercube } from "../test/hollow-hypercube.js";
import { hollowPrism } from "../test/hollow-prism.js";
import { complex } from "../test/complex.js";
import { Shape } from "./shape.js";

/**
 * Import base shape of square
 * @returns {Shape}
 */
export function importBaseShape(type) {
	var shape = new Shape();
	var parsedData;

	if (type == "hollow-cube") {
		parsedData = JSON.parse(hollowCube);

		shape.vertices = parsedData["vertices"];
		shape.colors = parsedData["colors"];
		shape.indices = parsedData["indices"];
		shape.setFov("30");
		return shape;
	} else if (type == "hollow-hypercube") {
		parsedData = JSON.parse(hollowHypercube);

		shape.vertices = parsedData["vertices"];
		shape.colors = parsedData["colors"];
		shape.indices = parsedData["indices"];
		shape.setFov("30");
		return shape;
	} else if (type == "hollow-prism") {
		parsedData = JSON.parse(hollowPrism);

		shape.vertices = parsedData["vertices"];
		shape.colors = parsedData["colors"];
		shape.indices = parsedData["indices"];
		shape.setFov("30");
		return shape;
	}  else if (type == "complex") {
		parsedData = JSON.parse(complex);

		shape.vertices = parsedData["vertices"];
		shape.colors = parsedData["colors"];
		shape.indices = parsedData["indices"];
		shape.setFov("30");
		return shape;
	}
}
