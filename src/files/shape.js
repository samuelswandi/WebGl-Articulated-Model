export class Shape {
	vertices;
	colors;
	indices;

	fov;

	constructor() {}

	setVertices(vertices) {
		this.vertices = vertices;
	}

	setColors(colors) {
		this.colors = colors;
	}

	setIndices(indices) {
		this.indices = indices
	}

	setFov(fov) {
		this.fov = fov;
	}
}
