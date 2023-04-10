import ModelFactory from "./models/factory";
import WebGlLocation from "./utils/webgl/_location";
import WebGlManager from "./utils/webgl/_manager";
import WebGlRenderer from "./utils/webgl/_renderer";


function main() {
    const webGlManager = new WebGlManager();
    const webGlLocation = new WebGlLocation(webGlManager);

    const modelFactory = new ModelFactory(webGlManager, webGlLocation);
    const defaultModel = modelFactory.default();
    const webGlRenderer = new WebGlRenderer(webGlManager);

    var img = new Image();
    img.src = "creeper.jpg";
    img.onload = () => {
        defaultModel.texture = img;
        webGlRenderer.setModel(defaultModel);
        webGlRenderer.render();
        requestAnimationFrame(render);
    }

    function render() {
        webGlRenderer.render();
        requestAnimationFrame(render);
    }
}

main();
