import ModelFactory from "./models/factory";
import WebGlLocation from "./utils/webgl/_location";
import WebGlManager from "./utils/webgl/_manager";
import WebGlRenderer from "./utils/webgl/_renderer";
import { ManAnimation } from "./test/animation/man_animation";
import { Man } from "./test/man";
import { Transformation, backwardSum, forwardSum, negate } from "./models/transformation";

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
    const firstFrame = document.getElementById("first-frame") as HTMLButtonElement;
    const lastFrame = document.getElementById("last-frame") as HTMLButtonElement;
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

    firstFrame.onclick = () => {
        if (frameIdx > 0) {
            model = modelFactory._recursiveTransformationFactory(
                backwardSum(anim, frameIdx), 0, Man);
            frameIdx = 0;
            frameText.textContent = (frameIdx + 1).toString();
        }
    }

    lastFrame.onclick = () => {
        if (frameIdx < anim.length - 1) {
            model = modelFactory._recursiveTransformationFactory(
                forwardSum(anim, frameIdx), 0 ,Man);
            frameIdx = anim.length - 1;
            frameText.textContent = (frameIdx + 1).toString();
        }
    }

    let isPlaying = false;
    let isPlayingReverse = false;
    const speed = 0.2;
    const playButton = document.getElementById("play-button") as HTMLButtonElement;
    const reversePlayButton = document.getElementById("reverse-play-button") as HTMLButtonElement;
    const pauseButton = document.getElementById("pause-button") as HTMLButtonElement;

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
    
    playButton.onclick = () => {
        isPlaying = true;
        isPlayingReverse = false;
    }

    reversePlayButton.onclick = () => {
        isPlaying = false;
        isPlayingReverse = true;
    }

    pauseButton.onclick = () => {
        isPlaying = false;
        isPlayingReverse = false;
        enableAfterPlaying();
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
                    disableWhilePlaying();
                }
                else{
                    isPlaying = false;
                    enableAfterPlaying();
                }
            };
        }

        if (isPlayingReverse){
            if(globalTimer % Math.round(speed * 10) == 0){
                if (frameIdx > 0) {
                    model = modelFactory._recursiveTransformationFactory(anim[frameIdx].map((transformation) => negate(transformation)), 0, Man);
                    frameIdx--;
                    frameText.textContent = (frameIdx + 1).toString();
                    disableWhilePlaying();
                }
                else{
                    isPlaying = false;
                    enableAfterPlaying();
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
