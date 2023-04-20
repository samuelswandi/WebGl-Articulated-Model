import ModelFactory from "./models/factory";
import WebGlLocation from "./utils/webgl/_location";
import WebGlManager from "./utils/webgl/_manager";
import WebGlRenderer from "./utils/webgl/_renderer";
import {Save} from "./utils/save-load/save";
import {Load} from "./utils/save-load/load"
import { SheepAnimation } from "./test/animation/sheep_animation";
import { ChickenAnimation } from "./test/animation/chicken_animation";
import { Man } from "./test/man";
import { Chicken } from "./test/chicken";
import { Sheep } from "./test/sheep";
import { Transformation, backwardSum, forwardSum, negate } from "./models/transformation";
import { ManAnimation } from "./test/animation/man_animation";
import { Fly } from "./test/fly";

import Model from "./models/model";
import { FlyAnimation } from "./test/animation/fly_animation";
import { addComponentButtonListener } from "./utils/transformation-single/transformation-s";

async function main() {
    let webGlManager = new WebGlManager();
    let webGlLocation = new WebGlLocation(webGlManager);
    let webGlRenderer = new WebGlRenderer(webGlManager);
    
    const modelFactory = new ModelFactory(webGlManager, webGlLocation);

    // TODO: Model Change , with Anim
    let model : Model = modelFactory.chicken();
    let baseModel : Model = Chicken;
    let anim : Transformation[][] = ChickenAnimation;

    const totalFrameText = document.getElementById("total-frame-id") as HTMLTextAreaElement;
    
    let frameIdx = 0;
    const frameText = document.getElementById("cur-frame-id") as HTMLTextAreaElement;
    const firstFrame = document.getElementById("first-frame") as HTMLButtonElement;
    const lastFrame = document.getElementById("last-frame") as HTMLButtonElement;
    const nextFrame = document.getElementById("next-frame") as HTMLButtonElement;
    const prevFrame = document.getElementById("prev-frame") as HTMLButtonElement;
    const compSubTree = document.getElementById("comp-sub-tree") as HTMLButtonElement;
    const save = document.getElementById("save") as HTMLInputElement;
    const load = document.getElementById("load") as HTMLInputElement;
    const changeModel = document.getElementById("model") as HTMLSelectElement;

    save.onclick = () => {
        Save(model, baseModel, anim);
    }

    load.onclick = () => {
        var load = document.getElementById("load") as HTMLInputElement;
	    load.onchange = function () {
            var file = load!.files![0] as File;
            var reader = new FileReader();
            reader.onload = function (e) {
                webGlRenderer = new WebGlRenderer(webGlManager);
                var content = String(e!.target!.result);
                var parsedData = JSON.parse(content);
                var xControl = document.getElementById("translate-x") as HTMLInputElement;
                var yControl = document.getElementById("translate-y") as HTMLInputElement;
                var zControl = document.getElementById("translate-z") as HTMLInputElement;

                var xScale = document.getElementById("scale-x") as HTMLInputElement;
                var yScale = document.getElementById("scale-y") as HTMLInputElement;
                var zScale = document.getElementById("scale-z") as HTMLInputElement;

                let cRcontrol = document.getElementById(
                    "camera-radius"
                ) as HTMLInputElement;
                let cAcontrol = document.getElementById(
                    "camera-angle"
                ) as HTMLInputElement;
                let shading = document.getElementById(
                    "shading"
                ) as HTMLInputElement

                const selectElement = document.getElementById("texture-choices") as HTMLSelectElement;
                selectElement.selectedIndex = parsedData.element
                webGlManager.gl.uniform1i(webGlLocation.textureMode, Number(parsedData.element))

                xControl.value = parsedData.translateX;
                yControl.value = parsedData.translateY;
                zControl.value = parsedData.translateZ;
                xScale.value = parsedData.scaleX;
                yScale.value = parsedData.scaleY;
                zScale.value = parsedData.scaleZ;
                cRcontrol.value = parsedData.cameraRadiusControl;
                cAcontrol.value = (+parsedData.cameraAngleControl).toString();
                shading.checked = "on" == parsedData.shading ? true : false;

                model = modelFactory.custom(parsedData.model);
                baseModel = parsedData.baseModel;
                anim = parsedData.anim;

                if(parsedData.type == "chicken") {
                    changeModel.selectedIndex = 0
                } else if(parsedData.type == "man") {
                    changeModel.selectedIndex = 1
                } else if (parsedData.type == "sheep") {
                    changeModel.selectedIndex = 2
                } else if (parsedData.type == "fly") {
                    changeModel.selectedIndex = 3
                }
                reload();
            };
            reader.readAsText(file);
        };
    }

    const reload = () => {
        const modelFactory = new ModelFactory(webGlManager, webGlLocation);
        totalFrameText.textContent = (anim.length).toString();

        compSubTree.innerHTML = "";
        let component = document.createElement("div");
        component.innerText = model.nameComponent!;
        component.classList.add("square")
        component.classList.add("ml-1")
        compSubTree.appendChild(component)

        addComponentButtonListener(document, component, model)
        for(let i = 0; i < model.children.length; i++) {
            let component = document.createElement("div");
            component.innerText = model.children[i].nameComponent!;
            component.classList.add("square")
            component.classList.add("ml-2")
            compSubTree.appendChild(component)
            addComponentButtonListener(document, component, model.children[i])

            for(let j = 0; j < model.children[i].children.length; j++) {
                let component = document.createElement("div");
                component.innerText = model.children[i].children[j].nameComponent!;
                component.classList.add("square")
                component.classList.add("ml-3")
                compSubTree.appendChild(component)
                addComponentButtonListener(document, component, model.children[i].children[j])

                for(let k = 0; k < model.children[i].children[j].children.length; k++) {
                    let component = document.createElement("div");
                    component.innerText = model.children[i].children[j].children[k].nameComponent!;
                    component.classList.add("square")
                    component.classList.add("ml-4")
                    compSubTree.appendChild(component)
                    addComponentButtonListener(document, component, model.children[i].children[j].children[k])
                }
            }
        }

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

    changeModel.onchange = () => {
        webGlRenderer = new WebGlRenderer(webGlManager);
        // reset active component
        document.getElementById("component-title")!.innerText = "choose a component";
        if(changeModel.value === "chicken") {
            model = modelFactory.chicken();
            baseModel = Chicken;
            anim = ChickenAnimation;
        } else if (changeModel.value === "man") {
            model = modelFactory.man();
            baseModel = Man;
            anim = ManAnimation;
        } else if (changeModel.value === "sheep") {
            model = modelFactory.sheep();
            baseModel = Sheep;
            anim = SheepAnimation;
        } else if (changeModel.value === "fly") {
            model = modelFactory.fly();
            baseModel = Fly;
            anim = FlyAnimation;
        }
        reload();
    }

    reload();
}

main();
