	const onError = (error) => {
		console.log(`Error: ${error}`);
	}

	const changeFontSize = (size) => {
		document.querySelector(".sizeCursor").style.fontSize = `${size}px`;
		document.querySelector("#str_in").style.fontSize = `${size}px`;
		document.querySelector("#str_out").style.fontSize = `${size}px`;
	}

	const onGot = (item) => {
		size = item.fontSize || 24;
		document.querySelector(".fCursor").classList.add("sizeCursor");
		document.querySelector(".sizeCursor").style.fontSize = `${size}px`;
		document.querySelector("#str_in").style.fontSize = `${size}px`;
		document.querySelector("#str_out").style.fontSize = `${size}px`;
	}

	var getting = browser.storage.sync.get("fontSize");
	getting.then(onGot, onError);

	(function() {
		/**
		 * On vérifie et on initialise une variable globale
		 * permettant de s'assurer que le script ne fera rien
		 * s'il est injecté plusieurs fois sur la page.
		 */
		if (window.hasRun) {
			return;
		}
		window.hasRun = true;


	
		/**
		 * On écoute les messages du script d'arrière-plan pour
		 * déclencher "insertBeast()" ou "removeExistingBeasts()".
		 */
		browser.runtime.onMessage.addListener((message) => {
			console.log(message.fontSize);
			changeFontSize(message.fontSize);
		});
	})();
