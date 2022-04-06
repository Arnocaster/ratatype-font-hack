	const onError = (error) => {
		console.log(`Error: ${error}`);
	}

	const changeFontSize = () => {
		document.getElementById("str_in").style.fontSize = size;
	}

	const onGot = (item) => {
		console.log(item.fontSize)
			size = item.fontSize || 24;
		document.getElementById("str_in").style.fontSize = `${size}px`;
	}

	var getting = browser.storage.sync.get("fontSize");
	getting.then(onGot, onError);

