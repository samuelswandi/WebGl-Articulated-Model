export default class Shape {
	positions: number[];
	normals: number[];
	colors: number[];

	constructor(positions: number[], normals: number[], colors: number[]) {
		this.positions = positions;
        this.normals = normals;
		this.colors = colors;
	}
}
