import WebGlLocation from "../utils/webgl/_location";
import WebGlManager from "../utils/webgl/_manager";
import Model from "./model";
import { Default } from "../test/default";
import { Cube } from "../test/cube";
import { Man } from "../test/man";
import Shape from "./shape";

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

	man(): Model {
		return this._recursiveObjectFactory(this.manager, this.location, Man);
	}

	_recursiveObjectFactory
	(
		manager : WebGlManager, 
		loc : WebGlLocation, 
		model : Model, 
	) : Model
	{
		let res = new Model(manager, loc, model.shape);
		res.translation = model.translation;
		res.rotation = model.rotation;
		res.scale = model.scale;

		// children
		for (let i = 0 ; i < model.children.length ; i++){
			res.children.push(this._recursiveObjectFactory(manager, loc, model.children[i]));
		}
		return res;
	}
}
