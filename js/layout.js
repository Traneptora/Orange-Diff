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
	let $wrapperdiv = $('<div class="wrapperdiv"></div>');
	let $diffcontainer = $('<div class="diffcontainer"></div>');
	let $htag = $("<h4>Mouse over for Image B. Mouse Out for Image A.</h4>");
	let $imgatag = $('<img class="imagea">');
	$imgatag.prop("src", imageAURL);
	let $imgbtag = $('<img class="imageb">');
	$imgbtag.prop("src", imageBURL);
	$diffcontainer.append($imgatag);
	$diffcontainer.append($imgbtag);
	let $backbutton = $('<p><button>Go Back</button></p>');
	$backbutton.on("click", function(){
		window.location.search = window.location.search + "&nogen=true";
	});
	$wrapperdiv.append($htag);
	$wrapperdiv.append($diffcontainer);
	$wrapperdiv.append($backbutton);
	document.body.innerHTML = "";
	$(document.body).css({
		"padding": "0px",
		"margin": "0px",
		"border": "0px",
		"text-align": "left"
	});
	$(document.body).append($wrapperdiv);
}

function submitDiff(){
	let imageAURL = $("#imageatextfield").prop("value");
	let imageBURL = $("#imagebtextfield").prop("value");
	if (imageAURL && imageBURL && imageAURL !== "" && imageBURL !== ""){
		let imageAURLEncoded = encodeURIComponent(imageAURL);
		let imageBURLEncoded = encodeURIComponent(imageBURL);
		window.location.search = "?imagea=" + imageAURLEncoded + "&imageb=" + imageBURLEncoded;
	}
}

$(function(){
	let params = parseURLParams(window.location.search);
	if (params.imagea && params.imageb){
		if (params.nogen && params.nogen === "true"){
			$("#imageatextfield").prop("value", params.imagea);
			$("#imagebtextfield").prop("value", params.imageb);
		} else {
			setupDiffLayout(params.imagea, params.imageb);
		}
	}
});
