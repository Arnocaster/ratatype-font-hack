let currentSize;

function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    fontSize: e.target.value
  });
  liveChange(e);
}

const liveChange = (e) => {
  document.getElementById("popup__range--value").innerHTML = `${e.target.value}px`;
  const resetStyle = `#str_in, #str_out,.fCursor{font-size : ${currentSize}px}`
  browser.tabs.removeCSS({code: resetStyle});
  const style = `#str_in, #str_out,.fCursor{font-size : ${e.target.value}px}`
  browser.tabs.insertCSS({code: style});
  currentSize = e.target.value;
}

function restoreOptions() {

  function setCurrentChoice(result) {
    console.log(result.fontSize);
    document.getElementById("popup__range--value").innerHTML =  `${result.fontSize}px`;
    document.getElementById("popup__range").value = result.fontSize;
    const style = `#str_in, #str_out,.fCursor{font-size : ${e.target.value}px}`
    browser.tabs.insertCSS({code: style});
    currentSize = e.target.value;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.sync.get("fontSize");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);

document.getElementById("popup__range").addEventListener("input",liveChange);
document.getElementById("popup__range").addEventListener("change",saveOptions);