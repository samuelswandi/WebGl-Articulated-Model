import WebGlLocation from "../utils/webgl/_location";
import WebGlManager from "../utils/webgl/_manager";
import Model from "./model";
import { Default } from "../test/default";
import { Cube } from "../test/cube";

export default class ModelFactory {
	manager: WebGlManager;
	location: WebGlLocation;

	constructor(manager: WebGlManager, location: WebGlLocation) {
		this.manager = manager;
		this.location = location;
	}

	default(): Model {
		var model = new Model(this.manager, this.location, Default);
		return model;
	}

	cube(): Model {
		var model = new Model(this.manager, this.location, Cube);
		return model;
	}
}
