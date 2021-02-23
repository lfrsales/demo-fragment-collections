var divElement = document.getElementById("tableauFragmentRoot");

var vizElement = divElement.getElementsByTagName("object")[0];

vizElement.style.width = "100%";
vizElement.style.height = divElement.offsetWidth * 0.75 + "px";

var scriptElement = document.createElement("script");

scriptElement.src = configuration.hostUrl + "/javascripts/api/viz_v1.js";

vizElement.parentNode.insertBefore(scriptElement, vizElement);

// Improving the behaviour while editing
var editing = !!document.getElementsByClassName('fragments-editor').length;
var editDiv = document.getElementsByClassName('edit')[0];
if (editing && !!editDiv) {
    editDiv.classList.remove("invisible");
} else {
    editDiv.classList.add("invisible");
}