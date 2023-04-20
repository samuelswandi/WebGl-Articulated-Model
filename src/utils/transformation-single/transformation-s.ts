import Model from "../../models/model";

export function addComponentButtonListener (document: Document, div: HTMLElement, model: Model) {
  const transformator = document.getElementById("transformation-single");
  const inputs = transformator?.getElementsByTagName("input");
  const title = document.getElementById("component-title")

  var xsControl = document.getElementById("translate-x-s") as HTMLInputElement;
  var ysControl = document.getElementById("translate-y-s") as HTMLInputElement;
  var zsControl = document.getElementById("translate-z-s") as HTMLInputElement;

  var xsScale = document.getElementById("scale-x-s") as HTMLInputElement;
  var ysScale = document.getElementById("scale-y-s") as HTMLInputElement;
  var zsScale = document.getElementById("scale-z-s") as HTMLInputElement;

  var xsRotate = document.getElementById("rotate-x-s") as HTMLInputElement;
  var ysRotate = document.getElementById("rotate-y-s") as HTMLInputElement;
  var zsRotate = document.getElementById("rotate-z-s") as HTMLInputElement;

  var isShadingChildren = document.getElementById("shading-children") as HTMLInputElement;
  var texturesChoicesParents = document.getElementById("texture-choices-children") as HTMLSelectElement;

  var reset = document.getElementById("reset") as HTMLButtonElement;

  div.addEventListener("click", (e) => {

    e.preventDefault()

    // set to model value
    console.log(model)
    xsControl.value = model.translation[0].toString();
    ysControl.value = model.translation[1].toString();
    zsControl.value = model.translation[2].toString();

    xsScale.value = model.scale[0].toString()
    ysScale.value = model.scale[1].toString()
    zsScale.value = model.scale[2].toString()

    xsRotate.value = model.rotation[0].toString()
    ysRotate.value = model.rotation[1].toString()
    zsRotate.value = model.rotation[2].toString()

    isShadingChildren.checked = model.shading!
    texturesChoicesParents.selectedIndex = model.textureType!

    title!.innerHTML = div.innerText

    reset.onclick = () => {
      console.log(model)
      xsControl.value = "0";
      ysControl.value = "0";
      zsControl.value = "0";

      xsScale.value = "1";
      ysScale.value = "1";
      zsScale.value = "1";

      xsRotate.value = "0";
      ysRotate.value = "0";
      zsRotate.value = "0";

      isShadingChildren.checked = false
      texturesChoicesParents.selectedIndex = 0

    }
    
    // toggleInput(inputs!)
  })
}


const toggleInput = (inputs: HTMLCollectionOf<HTMLInputElement>) => {
  for (let i = 0; i < inputs?.length!; i ++){
    inputs[i].setAttribute("disabled", "false");
  }
}