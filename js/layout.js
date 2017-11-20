function parseURLParams(url) {
	var queryStart = url.indexOf("?") + 1,
		queryEnd   = url.indexOf("#") + 1 || url.length + 1,
		query = url.slice(queryStart, queryEnd - 1),
		pairs = query.split("&"),
		parms = {}, i, n, v, nv;

	if (query === url || query === "") {
		return [];
	}

	for (i = 0; i < pairs.length; i++) {
		nv = pairs[i].split("=");
		if (nv.length !== 2){
			continue;
		}
		n = decodeURIComponent(nv[0]);
		v = decodeURIComponent(nv[1]);
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
	var $htag = $("<p><h4>Image A</h4></p>");
	var $imgtag = $("<img>");
	$imgtag.css({
		"border": "0px",
		"padding": "0px",
		"margin": "0px"
	});
	$imgtag.prop("src", imageAURL);
	$imgtag.on("mouseover", function(){
		$(this).prop("src", imageBURL);
		$htag.prop("innerHTML", "Image B");
	});
	$imgtag.on("mouseout", function(){
		$(this).prop("src", imageAURL);
		$htag.prop("innerHTML", "Image A");
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

document.addEventListener("DOMContentLoaded", function(){
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
