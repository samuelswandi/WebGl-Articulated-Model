export default class Shape {
	num_vertices: number;
	positions: number[];
	normals: number[];
	colors: number[];
	textureCoord: number[];

	constructor(positions: number[], normals: number[], colors: number[], textureCoord: number[]) {
		this.positions = positions;
		this.normals = normals;
		this.colors = colors;
		this.textureCoord = textureCoord;

		this.num_vertices = this.positions.length/3;
	}
}
