import ModelFactory from "./models/factory";
import WebGlLocation from "./utils/webgl/_location";
import WebGlManager from "./utils/webgl/_manager";
import WebGlRenderer from "./utils/webgl/_renderer";
import { ManAnimation } from "./test/animation/man_animation";
import { Man } from "./test/man";
import { Transformation, negate } from "./models/transformation";

async function main() {
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
    // const firstFrame = document.getElementById("first-frame") as HTMLButtonElement;
    // const lastFrame = document.getElementById("last-frame") as HTMLButtonElement;
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

    // firstFrame.onclick = () => {
        // if (frameIdx > 0) {
        //     let sumTr : Transformation[] =  anim[0];
        //     for (let i = 1; i <= frameIdx; i++) {
        //         for (let j = 0 ; j < sumTr.length; j++) {
        //             sumTr[j].translation[0] -= anim[i][j].translation[0];
        //             sumTr[j].translation[1] -= anim[i][j].translation[1];
        //             sumTr[j].translation[2] -= anim[i][j].translation[2];

        //             sumTr[j].rotation[0] -= anim[i][j].rotation[0];
        //             sumTr[j].rotation[1] -= anim[i][j].rotation[1];
        //             sumTr[j].rotation[2] -= anim[i][j].rotation[2];

        //             sumTr[j].scale[0] /= anim[i][j].scale[0];
        //             sumTr[j].scale[1] /= anim[i][j].scale[1];
        //             sumTr[j].scale[2] /= anim[i][j].scale[2];
        //         }
        //     }
            
        //     model = modelFactory._recursiveTransformationFactory(sumTr, 0, Man);
        //     frameIdx = 0;
        //     frameText.textContent = (frameIdx + 1).toString();
        // }
    // }

    // lastFrame.onclick = () => {
    //     if (frameIdx < anim.length - 1) {

    //     }
    // }

    let isPlaying = false;
    const speed = 0.2;
    const playButton = document.getElementById("play-button") as HTMLButtonElement;
    const pauseButton = document.getElementById("pause-button") as HTMLButtonElement;
    const resetButton = document.getElementById("reset-button") as HTMLButtonElement;

    
    playButton.onclick = () => {
        isPlaying = true;
    }

    pauseButton.onclick = () => {
        isPlaying = false;
    }

    resetButton.onclick = () => {
        frameIdx = 0;
        frameText.textContent = (frameIdx + 1).toString();
        isPlaying = false;
    }
    
    let globalTimer = 0;
    setInterval(function () {
        globalTimer++;
        if(isPlaying){
            if(globalTimer % Math.round(speed * 10) == 0){
                if (frameIdx < anim.length - 1) {
                    frameIdx++;
                    model = modelFactory._recursiveTransformationFactory(anim[frameIdx], 0, Man);
                    frameText.textContent = (frameIdx + 1).toString();
                }
                else{
                    isPlaying = false;
                }
            };
        }
    }, 100);

    
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
