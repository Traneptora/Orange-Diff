function setupDiffLayout(imageAURL, imageBURL) {
    document.getElementById('imagea').src = imageAURL;
    document.getElementById('imageb').src = imageBURL;
    document.getElementById('entryside').style.display = 'none';
    document.getElementById('viewside').style.display = 'block';
    document.body.classList.add('imagediff');
}

function submitDiff(){
    const imageAURL = document.getElementById('imageatextfield').value;
    const imageBURL = document.getElementById('imagebtextfield').value;
    if (imageAURL && imageBURL && imageAURL !== "" && imageBURL !== ""){
        const url = new URL(window.location.href);
        url.searchParams.set('imagea', imageAURL);
        url.searchParams.set('imageb', imageBURL);
        url.searchParams.delete('nogen');
        window.history.replaceState(null, "", url)
        setupDiffLayout(imageAURL, imageBURL);
    }
}

function ready(){
    const params = new URLSearchParams(window.location.search);
    const imagea = params.get('imagea');
    const imageb = params.get('imageb');
    const nogen = params.get('nogen');
    if (imagea && imageb) {
        if (nogen === 'true'){
            document.getElementById('imageatextfield').value = imagea;
            document.getElementById('imagebtextfield').value = imageb;
            document.body.classList.remove('imagediff');
            document.getElementById('viewside').style.display = 'none';
            document.getElementById('entryside').style.display = 'block';
        } else {
            setupDiffLayout(imagea, imageb);
        }
    }
}

document.addEventListener("DOMContentLoaded", ready);
document.getElementById('backbutton').addEventListener('click', () => {
    const url = new URL(window.location.href);
    url.searchParams.set('nogen', 'true');
    window.history.replaceState(null, "", url);
    ready();
});
