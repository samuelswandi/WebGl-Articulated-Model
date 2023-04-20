import Model from "../../models/model";
import { Transformation } from "../../models/transformation";

export const Save = (model: Model, baseModel: Model, anim: Transformation[][]) => {
    let translateX = document.getElementById("translate-x") as HTMLInputElement
	let translateY = document.getElementById("translate-y") as HTMLInputElement
	let translateZ = document.getElementById("translate-z") as HTMLInputElement

	let scaleXControl = document.getElementById("scale-x") as HTMLInputElement
	let scaleYControl = document.getElementById("scale-y") as HTMLInputElement
	let scaleZControl = document.getElementById("scale-z") as HTMLInputElement
    let changeModel = document.getElementById("model") as HTMLButtonElement;

/* 	let rotateXControl = document.getElementById(
		"rotate-x"
	) as HTMLInputElement
	let rotateYControl = document.getElementById(
		"rotate-y"
	) as HTMLInputElement
	let rotateZControl = document.getElementById(
		"rotate-z"
	) as HTMLInputElement */

	let shading = document.getElementById(
		"shading"
	) as HTMLInputElement
	let cameraAngle = document.getElementById(
		"camera-angle"
	) as HTMLInputElement

	let cameraRadius = document.getElementById(
		"camera-radius"
	) as HTMLInputElement

    const selectElement = document.getElementById("texture-choices") as HTMLSelectElement;
    
    let dataJson = {
        "model": model,
        "baseModel": baseModel,
        "anim": anim,
        "translateX": translateX.value,
        "translateY": translateY.value,
        "translateZ": translateZ.value,
        "scaleX": scaleXControl.value,
        "scaleY": scaleYControl.value,
        "scaleZ": scaleZControl.value,
/*         "rotateX": rotateXControl.value,
        "rotateY": rotateYControl.value,
        "rotateZ": rotateZControl.value, */
        "shading": shading.value,
        "cameraAngleControl": cameraAngle.value,
        "cameraRadiusControl": cameraRadius.value,
        "type": changeModel.value,
        "element": selectElement.options[selectElement.selectedIndex].value,
    }

	const exportedData = JSON.stringify(dataJson);
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(exportedData);
    //var save = document.getElementById('save') as HTMLButtonElement;
    var save = document.createElement('a');
    save.setAttribute("href",     dataStr     );
    save.setAttribute("download", "scene.json");
    save.click();
    
	return exportedData;
}