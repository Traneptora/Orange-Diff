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
    document.getElementById('img-a').src = imageAURL;
    document.getElementById('img-b').src = imageBURL;
    document.getElementById('wrapper').style.display = "none";
    document.getElementById('post-diff-wrapper').style.display = "block";
}

function submitDiff(){
    let imageAURL = document.getElementById('img-txt-a').value;
    let imageBURL = document.getElementById('img-txt-b').value;
    if (imageAURL && imageBURL && imageAURL !== "" && imageBURL !== ""){
        let imageAURLEncoded = encodeURIComponent(imageAURL);
        let imageBURLEncoded = encodeURIComponent(imageBURL);
        window.location.search = "?imagea=" + imageAURLEncoded + "&imageb=" + imageBURLEncoded;
    }
}

function ready(){
    let params = parseURLParams(window.location.search);
    if (params.imagea && params.imageb){
        if (params.nogen === "true"){
            document.getElementById('img-txt-a').value = params.imagea;
            document.getElementById('img-txt-b').value = params.imageb;
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
