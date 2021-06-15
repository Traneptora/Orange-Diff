function parseURLParams(url) {
	let queryStart = url.indexOf("?") + 1;
	let queryEnd   = url.indexOf("#") + 1 || url.length + 1;
	let query = url.slice(queryStart, queryEnd - 1);
	let pairs = query.split("&");
	let params = {};

	if (query === url || query === "") {
		return [];
	}

	for (let i = 0; i < pairs.length; i++) {
		let eqIndex = pairs[i].indexOf("=");
		if (eqIndex < 0){
			continue;
		}
		let key = decodeURIComponent(pairs[i].slice(0, eqIndex));
		let value = decodeURIComponent(pairs[i].slice(eqIndex + 1));
		params[key] = value;
	}
	return params;
}

function setupDiffLayout(imageAURL, imageBURL){
	let htag = document.createElement('h4');
	htag.appendChild(document.createTextNode('Mouse over for Image B. Mouse Out for Image A.'));
	let imgatag = document.createElement('img');
	imgatag.src = imageAURL;
	imgatag.classList.add('imagea');
	let imgbtag = document.createElement('img');
	imgbtag.src = imageBURL;
	imgbtag.classList.add('imageb');
	let diffcontainer = document.createElement('div');
	diffcontainer.classList.add('diffcontainer');
	diffcontainer.appendChild(imgatag);
	diffcontainer.appendChild(imgbtag);
	let buttonwrapper = document.createElement('p');
	let backbutton = document.createElement('button');
	backbutton.appendChild(document.createTextNode('Go Back'));
	backbutton.addEventListener("click", function(){
		window.location.search = window.location.search + "&nogen=true";
	});
	buttonwrapper.appendChild(backbutton);
	let wrapperdiv = document.createElement('div');
	wrapperdiv.classList.add('wrapperdiv');
	wrapperdiv.appendChild(htag);
	wrapperdiv.appendChild(diffcontainer);
	wrapperdiv.appendChild(buttonwrapper);
	document.body.innerHTML = '';
	document.body.classList.add('imagediff');
	document.body.appendChild(wrapperdiv);
}

function submitDiff(){
	let imageAURL = document.getElementById('imageatextfield').value;
	let imageBURL = document.getElementById('imagebtextfield').value;
	if (imageAURL && imageBURL && imageAURL !== "" && imageBURL !== ""){
		let imageAURLEncoded = encodeURIComponent(imageAURL);
		let imageBURLEncoded = encodeURIComponent(imageBURL);
		window.location.search = "?imagea=" + imageAURLEncoded + "&imageb=" + imageBURLEncoded;
	}
}

function ready(){
	let params = parseURLParams(window.location.search);
	if (params.imagea && params.imageb){
		if (params.nogen && params.nogen === "true"){
			document.getElementById('imageatextfield').value = params.imagea;
			document.getElementById('imagebtextfield').value = params.imageb;
		} else {
			setupDiffLayout(params.imagea, params.imageb);
		}
	}
}

if (document.readyState === 'loading'){
	document.addEventListener("DOMContentLoaded", ready);
} else {
	ready();
}
