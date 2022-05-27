var cleanBtn = document.getElementById("cleanBtn");
cleanBtn.addEventListener("click", async function () {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: mouseMove,
    args: [true],
  });
});

chrome.storage.sync.get("startBtnStatus", ({ startBtnStatus }) => {
  if (startBtnStatus) {
    document.getElementById("startBtn").checked = startBtnStatus;
  }
});

var startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", function () {
  var startBtnStatus = document.getElementById("startBtn").checked;
  chrome.storage.sync.set({ startBtnStatus });
  init();
});

chrome.storage.sync.get("bgBtnStatus", ({ bgBtnStatus }) => {
  if (bgBtnStatus) {
    document.getElementById("bgBtn").checked = bgBtnStatus;
  }
});

var bgBtn = document.getElementById("bgBtn");

bgBtn.addEventListener("click", function () {
  var bgBtnStatus = document.getElementById("bgBtn").checked;
  chrome.storage.sync.set({ bgBtnStatus });
  init();
});

chrome.storage.sync.get("iframeBtnStatus", ({ iframeBtnStatus }) => {
  if (iframeBtnStatus) {
    document.getElementById("iframeBtn").checked = iframeBtnStatus;
  }
});

var iframeBtn = document.getElementById("iframeBtn");

iframeBtn.addEventListener("click", function () {
  var iframeBtnStatus = document.getElementById("iframeBtn").checked;
  chrome.storage.sync.set({ iframeBtnStatus });
  init();
});

async function init() {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: mouseMove,
  });
}

init();

function mouseMove(arg1) {
  var elmCleanList = JSON.parse(localStorage.getItem("elmCleanList")) || [];

  if (arg1) {
    localStorage.setItem("elmCleanList", JSON.stringify([]));
  }
  chrome.storage.sync.get("iframeBtnStatus", ({ iframeBtnStatus }) => {
    localStorage.setItem("iframeStatus", iframeBtnStatus);
  });

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

  chrome.storage.sync.get("iframeBtnStatus", ({ iframeBtnStatus }) => {
    if (iframeBtnStatus) {
      var iframes = document.getElementsByTagName("iframe");
      for (let iframe of iframes) {
        iframe.remove();
      }
    }
  });

  if (window.event1 == undefined) {
    window.event1 = function (e) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
      var elems = document.querySelectorAll(".selectedToDel");
      [].forEach.call(elems, function (el) {
        el.classList.remove("selectedToDel");
      });

      e.target.classList.add("selectedToDel");
    };
  }
  if (window.event2 == undefined) {
    window.event2 = function (e) {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
      //e.target.style.display = "none";

      chrome.storage.sync.get("bgBtnStatus", ({ bgBtnStatus }) => {
        var selectedElm = {
          tag: e.target.tagName,
          classList: e.target.classList.value.replace("selectedToDel", ""),
          bgImage: bgBtnStatus,
        };
        elmCleanList.push(selectedElm);
        if (bgBtnStatus == true) {
          e.target.style.backgroundImage = "none";
        } else {
          e.target.remove();
        }

        localStorage.setItem("elmCleanList", JSON.stringify(elmCleanList));
      });
    };
  }
  chrome.storage.sync.get("startBtnStatus", ({ startBtnStatus }) => {
    if (startBtnStatus === true) {
      document.addEventListener("mousemove", window.event1);
      document.addEventListener("click", window.event2);
    } else {
      document.removeEventListener("mousemove", window.event1);
      document.removeEventListener("click", window.event2);
      var elems = document.querySelectorAll(".selectedToDel");

      [].forEach.call(elems, function (el) {
        el.classList.remove("selectedToDel");
      });
    }
  });
}
