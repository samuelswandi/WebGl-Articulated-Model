import WebGlLocation from "../utils/webgl/_location";
import WebGlManager from "../utils/webgl/_manager";
import Model from "./model";
import { Default } from "../test/default";
import { Cube } from "../test/cube";
import { Man } from "../test/man";
import { Sheep } from "../test/sheep";
import { ManAnimation } from "../test/animation/man_animation";
import { Transformation } from "./transformation";
import { Chicken } from "../test/chicken";
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

	sheep(): Model {
		return this._recursiveObjectFactory(this.manager, this.location, Sheep);
	}

	chicken() : Model {
		return this._recursiveObjectFactory(this.manager, this.location, Chicken);
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

	_recursiveTransformationFactory
	(
		trs : Transformation[],
		idx : number,
		model : Model,
	) : [Model, number]
	{
		console.log(model.name)
		model.translation[0] += trs[idx].translation[0];
		model.translation[1] += trs[idx].translation[1];
		model.translation[2] += trs[idx].translation[2];

		model.rotation[0] += trs[idx].rotation[0];
		model.rotation[1] += trs[idx].rotation[1];
		model.rotation[2] += trs[idx].rotation[2];

		model.scale[0] *= trs[idx].scale[0];
		model.scale[1] *= trs[idx].scale[1];
		model.scale[2] *= trs[idx].scale[2];

		idx++;
		// children
		for (let i = 0 ; i < model.children.length ; i++){
			[model.children[i], idx] = this._recursiveTransformationFactory(trs, idx, model.children[i]);
		}

		console.log(model)
		return [model, idx];
	}
}
