window.onload = function () {
    console.log('Dokument geladen');
    let backButton = document.getElementById("back-btn");

// Zurück Button Event
backButton.onclick = function(){
    window.location = "index.html";
}
}

