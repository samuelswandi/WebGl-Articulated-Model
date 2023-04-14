import ModelFactory from "./models/factory";
import WebGlLocation from "./utils/webgl/_location";
import WebGlManager from "./utils/webgl/_manager";
import WebGlRenderer from "./utils/webgl/_renderer";
import { ManAnimation } from "./test/animation/man_animation";
import { Man } from "./test/man";
import { negate } from "./models/transformation";

function main() {
    const webGlManager = new WebGlManager();
    const webGlLocation = new WebGlLocation(webGlManager);

    const modelFactory = new ModelFactory(webGlManager, webGlLocation);

    // TODO : Conditional by selected model (UI blm)
    let model = modelFactory.man();
    const webGlRenderer = new WebGlRenderer(webGlManager);

    // TODO : Animation unpack conditional by selected model (UI blm)
    const anim = ManAnimation;
    const totalFrameText = document.getElementById("total-frame-id") as HTMLTextAreaElement;
    totalFrameText.textContent = (anim.length).toString();
    
    let frameIdx = 0;
    const frameText = document.getElementById("cur-frame-id") as HTMLTextAreaElement;
    const nextFrame = document.getElementById("next-frame") as HTMLButtonElement;
    const prevFrame = document.getElementById("prev-frame") as HTMLButtonElement;

    nextFrame.onclick = () => {
        if (frameIdx < anim.length - 1) {
            frameIdx++;
            model = modelFactory._recursiveTransformationFactory(anim[frameIdx], 0, Man);
            frameText.textContent = (frameIdx + 1).toString();
        }
    }
    
    prevFrame.onclick = () => {
        if (frameIdx > 0) {
            model = modelFactory._recursiveTransformationFactory(anim[frameIdx].map((transformation) => negate(transformation)), 0, Man);
            frameIdx--;
            frameText.textContent = (frameIdx + 1).toString();
        }
    }
    
    var img = new Image();
    img.src = "creeper.jpg";
    img.onload = () => {
        // model.texture = img;
        webGlRenderer.setModel(model);
        webGlRenderer.render();
        requestAnimationFrame(render);
    }

    function render() {
        webGlRenderer.render();
        requestAnimationFrame(render);
    }
}

main();
