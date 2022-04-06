let currentSize;

function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    fontSize: e.target.value
  });
  liveChange(e);
}

const liveChange = async (e) => {
  const tab = await browser.tabs.query({active: true, currentWindow: true});
  browser.tabs.sendMessage(tab[0].id,{fontSize: e.target.value});
  document.getElementById("popup__range--value").innerHTML = `${e.target.value}px`;
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