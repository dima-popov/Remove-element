
function deleteElmExt(){

var elmCleanList = JSON.parse(localStorage.getItem("elmCleanList")) || [];

elmCleanList.forEach(function (elm1) {
  var tags = document.getElementsByTagName(elm1.tag);

  for (let tag of tags) {
    if (tag.classList.value.trim() == elm1.classList.trim()) {
      if (elm1.bgImage == true) {
        tag.style.backgroundImage = "none";
      } else {
        tag.remove();
      }
    }
  }
});

if (localStorage.getItem("iframeStatus") == "true") {
 
    var iframes = document.getElementsByTagName("iframe");
    for (let iframe of iframes) {
      iframe.remove();
    }
 
    var iframes = document.getElementsByTagName("iframe");
    for (let iframe of iframes) {
      iframe.remove();
    }


}
}

deleteElmExt();

setTimeout(function () {
  deleteElmExt();
}, 1000);

setInterval(function () {
  deleteElmExt();
}, 2000);

