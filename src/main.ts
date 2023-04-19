import ModelFactory from "./models/factory";
import WebGlLocation from "./utils/webgl/_location";
import WebGlManager from "./utils/webgl/_manager";
import WebGlRenderer from "./utils/webgl/_renderer";
import { SheepAnimation } from "./test/animation/sheep_animation";
import { ChickenAnimation } from "./test/animation/chicken_animation";
import { Man } from "./test/man";
import { Chicken } from "./test/chicken";
import { Sheep } from "./test/sheep";
import { Transformation, backwardSum, forwardSum, negate } from "./models/transformation";
import { ManAnimation } from "./test/animation/man_animation";

import Model from "./models/model";

async function main() {
    const webGlManager = new WebGlManager();
    const webGlLocation = new WebGlLocation(webGlManager);
    const webGlRenderer = new WebGlRenderer(webGlManager);
    
    const modelFactory = new ModelFactory(webGlManager, webGlLocation);
    const selectModel = document.getElementById("texture-choices") as HTMLSelectElement;

    // TODO: Model Change , with Anim
    let model : Model = modelFactory.chicken();
    let baseModel : Model = Chicken;
    let anim : Transformation[][] = ChickenAnimation;


    const totalFrameText = document.getElementById("total-frame-id") as HTMLTextAreaElement;
    totalFrameText.textContent = (anim.length).toString();
    
    let frameIdx = 0;
    const frameText = document.getElementById("cur-frame-id") as HTMLTextAreaElement;
    const firstFrame = document.getElementById("first-frame") as HTMLButtonElement;
    const lastFrame = document.getElementById("last-frame") as HTMLButtonElement;
    const nextFrame = document.getElementById("next-frame") as HTMLButtonElement;
    const prevFrame = document.getElementById("prev-frame") as HTMLButtonElement;

    nextFrame.onclick = () => {
        if (frameIdx < anim.length - 1) {
            frameIdx++;
            model = modelFactory._recursiveTransformationFactory(anim[frameIdx], 0, baseModel)[0];
            frameText.textContent = (frameIdx + 1).toString();
        }
    }
    
    prevFrame.onclick = () => {
        if (frameIdx > 0) {
            model = modelFactory._recursiveTransformationFactory(anim[frameIdx].map((transformation) => negate(transformation)), 0, baseModel)[0];
            frameIdx--;
            frameText.textContent = (frameIdx + 1).toString();
        }
    }

    firstFrame.onclick = () => {
        if (frameIdx > 0) {
            model = modelFactory._recursiveTransformationFactory(
                backwardSum(anim, 0, frameIdx), 0, baseModel)[0];
            frameIdx = 0;
            frameText.textContent = (frameIdx + 1).toString();
        }
    }

    lastFrame.onclick = () => {
        if (frameIdx < anim.length - 1) {
            model = modelFactory._recursiveTransformationFactory(
                forwardSum(anim, frameIdx, anim.length - 1), 0 ,baseModel)[0];
            frameIdx = anim.length - 1;
            frameText.textContent = (frameIdx + 1).toString();
        }
    }

    let isPlaying = false;
    let isPlayingReverse = false;
    let isPlayingLoop = false;

    let speed = 0.2;
    const speedButton = document.getElementById("frame-rate") as HTMLInputElement;
    const speedText = document.getElementById("frame-rate-text") as HTMLTextAreaElement;
    
    const playButton = document.getElementById("play-button") as HTMLButtonElement;
    const reversePlayButton = document.getElementById("reverse-play-button") as HTMLButtonElement;
    const pauseButton = document.getElementById("pause-button") as HTMLButtonElement;
    const loopPlayButton = document.getElementById("loop-play-button") as HTMLButtonElement;

    let startFrame = 0;
    let endFrame = 0;
    const startFrameInput = document.getElementById("start-frame") as HTMLInputElement;
    const endFrameInput = document.getElementById("end-frame") as HTMLInputElement;

    const disableWhilePlaying = () => {
        playButton.disabled = true;
        reversePlayButton.disabled = true;        
        pauseButton.disabled = false;
        firstFrame.disabled = true;
        nextFrame.disabled = true;
        prevFrame.disabled = true;
        lastFrame.disabled = true;
    }

    const enableAfterPlaying = () => {
        playButton.disabled = false;
        reversePlayButton.disabled = false;
        pauseButton.disabled = true;
        firstFrame.disabled = false;
        nextFrame.disabled = false;
        prevFrame.disabled = false;
        lastFrame.disabled = false;
    }

    speedButton.oninput = () => {
        speedText.textContent = speedButton.value;
        speed = parseFloat(speedButton.value);
    }
    
    playButton.onclick = () => {
        isPlaying = true;
        isPlayingReverse = false;
        isPlayingLoop = false;
    }

    reversePlayButton.onclick = () => {
        isPlaying = false;
        isPlayingReverse = true;
        isPlayingLoop = false;
    }

    loopPlayButton.onclick = () => {
        if (startFrameInput.value == "" || endFrameInput.value == ""){
            alert("Please fill start and end frame");
            return;
        }

        if (parseInt(startFrameInput.value) < 1 || parseInt(endFrameInput.value) > anim.length){
            alert("Start frame and end frame must be between 1 and " + anim.length);
            return;
        }

        if (parseInt(startFrameInput.value) >= parseInt(endFrameInput.value)){
            alert("Start frame must be smaller than end frame");
            return;
        }

        startFrame = parseInt(startFrameInput.value) - 1;
        endFrame = parseInt(endFrameInput.value) - 1;

        // reset the model to default using backwardSum
        model = modelFactory._recursiveTransformationFactory(
            backwardSum(anim, 0, frameIdx), 0, baseModel
        )[0];

        // forwardSum to designated start frame
        model = modelFactory._recursiveTransformationFactory(
            forwardSum(anim, 0, startFrame), 0 ,baseModel
        )[0];

        frameText.textContent = (startFrame + 1).toString();
        frameIdx = startFrame;

        isPlaying = false;
        isPlayingReverse = false;
        isPlayingLoop = true;
    }

    pauseButton.onclick = () => {
        isPlaying = false;
        isPlayingReverse = false;
        isPlayingLoop = false;
        enableAfterPlaying();
    }
    
    let globalTimer = 0;
    setInterval(function () {
        globalTimer++;

        // Normal Play
        if(isPlaying){
            if(globalTimer % Math.round(speed * 10) == 0){
                if (frameIdx < anim.length - 1) {
                    frameIdx++;
                    model = modelFactory._recursiveTransformationFactory(anim[frameIdx], 0, baseModel)[0];
                    frameText.textContent = (frameIdx + 1).toString();
                    disableWhilePlaying();
                }
                else{
                    isPlaying = false;
                    enableAfterPlaying();
                }
            };
        }


        // Reverse Play
        if (isPlayingReverse){
            if(globalTimer % Math.round(speed * 10) == 0){
                if (frameIdx > 0) {
                    model = modelFactory._recursiveTransformationFactory(anim[frameIdx].map((transformation) => negate(transformation)), 0, baseModel)[0];
                    frameIdx--;
                    frameText.textContent = (frameIdx + 1).toString();
                    disableWhilePlaying();
                }
                else{
                    isPlayingReverse = false;
                    enableAfterPlaying();
                }
            };
        } 


        // Loop Play
        if (isPlayingLoop){
            if(globalTimer % Math.round(speed * 10) == 0){
                frameIdx = ((frameIdx - startFrame) + 1) % (endFrame - startFrame + 1) + startFrame;
                if (frameIdx == startFrame) {
                    model = modelFactory._recursiveTransformationFactory(backwardSum(anim, startFrame, endFrame), 0, baseModel)[0];
                } else{
                    model = modelFactory._recursiveTransformationFactory(anim[frameIdx], 0, baseModel)[0];
                }
                frameText.textContent = (frameIdx + 1).toString();
                disableWhilePlaying();
            };
        }
    }, 100);

    const selectElement = document.getElementById("texture-choices") as HTMLSelectElement;

    selectElement.addEventListener("change", () => {
        const selectedOption = selectElement.options[selectElement.selectedIndex].value;
        console.log(selectedOption)
        webGlManager.gl.uniform1i(webGlLocation.textureMode, Number(selectedOption))
    });

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
