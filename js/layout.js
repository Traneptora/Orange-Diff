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
		let value = decodeURIComponent(keyvalue[1]);
		parms[n] = v;
	}
	return parms;
}

function setupDiffLayout(imageAURL, imageBURL){
	var $wrapperdiv = $("<div></div>");
	$wrapperdiv.css({
		"margin-left": "25px",
		"margin-right": "25px",
		"margin-top": "25px",
		"margin-bottom": "25px",
		"border": "0px",
		"padding": "0px"
	});
	var $htag = $("<h4>Image A<br>Mouse over for Image B. Wait for it to load.</h4>");
	var $imgtag = $("<img>");
	$imgtag.css({
		"border": "0px",
		"padding": "0px",
		"margin": "0px"
	});
	$imgtag.prop("src", imageAURL);
	$imgtag.on("mouseover", function(){
		$(this).prop("src", imageBURL);
		$htag.prop("innerHTML", "Image B<br>Mouse out for Image A. Wait for it to load.");
	});
	$imgtag.on("mouseout", function(){
		$(this).prop("src", imageAURL);
		$htag.prop("innerHTML", "Image A<br>Mouse over for Image B. Wait for it to load.");
	});
	$wrapperdiv.append($htag);
	$wrapperdiv.append($imgtag);
	var $backbutton = $('<p><button>Go Back</button></p>');
	$backbutton.on("click", function(){
		window.location.search = window.location.search + "&nogen=true";
	});
	$wrapperdiv.append($backbutton);
	$(document.body).css({
		"padding": "0px",
		"margin": "0px",
		"border": "0px",
		"text-align": "left"
	});
	document.body.innerHTML = "";
	$(document.body).append($wrapperdiv);
}

function submitDiff(){
	var imageAURL = $("#imageatextfield").prop("value");
	var imageBURL = $("#imagebtextfield").prop("value");
	if (imageAURL && imageBURL && imageAURL !== "" && imageBURL !== ""){
		var imageAURLEncoded = encodeURIComponent(imageAURL);
		var imageBURLEncoded = encodeURIComponent(imageBURL);
		window.location.search = "?imagea=" + imageAURLEncoded + "&imageb=" + imageBURLEncoded;
	}
}

$(function(){
	var params = parseURLParams(window.location.search);
	if (params.imagea && params.imageb){
		if (params.nogen && params.nogen === "true"){
			$("#imageatextfield").prop("value", params.imagea);
			$("#imagebtextfield").prop("value", params.imageb);
		} else {
			setupDiffLayout(params.imagea, params.imageb);
		}
	}
});
