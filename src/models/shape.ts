import { cross, normalize, subtractVectors } from "../math/mat4";

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


	public getTangent(): number[] {
		let vertexTangents: number[] = [];
		for (let i = 0; i < this.positions.length; i += 18) {
			const p1 = [this.positions[i], this.positions[i+1], this.positions[i+2]];
			const p2 = [this.positions[i+3], this.positions[i+4], this.positions[i+5]];
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
		for (let i = 0; i < this.positions.length; i += 18) {
			const p1 = [this.positions[i], this.positions[i+1], this.positions[i+2]];
			const p3 = [this.positions[i+6], this.positions[i+7], this.positions[i+8]];
			const vec = subtractVectors(p3, p1);
			const vecBitangent = normalize(vec);

			for (let j = 0; j < 6; j++){
				vertexBitangents = vertexBitangents.concat(vecBitangent);
			}
		}
		return vertexBitangents;
	}

	public getNormal() : number[] {
		let vertexNormals: number[] = [];
		for (let i = 0; i < this.positions.length; i += 18) {
			const p1 = [this.positions[i], this.positions[i+1], this.positions[i+2]];
			const p2 = [this.positions[i+3], this.positions[i+4], this.positions[i+5]];
			const p3 = [this.positions[i+6], this.positions[i+7], this.positions[i+8]];
			const vec1 = subtractVectors(p2, p1);
			const vec2 = subtractVectors(p3, p1);
			const normalDirection = cross(vec1, vec2);
			const vecNormal  = normalize(normalDirection);
			for (let j = 0; j < 6; j++){
				vertexNormals = vertexNormals.concat(vecNormal);
			}
		}
		return vertexNormals;
	}
}
