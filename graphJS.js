window.onload = function () {
    console.log('Dokument geladen');
    

    let confirmButton = document.getElementById("confirm-btn");
    let permanentStorage = window.localStorage;
    let tempStorage = window.sessionStorage;

    // Einmalig die Session aus dem Local Storage holen
    let session = window.localStorage.getItem("session");
    console.log(session);
    let sessionJSON = JSON.parse(session);
    console.log(sessionJSON);
    // Variablen befüllen
    let age = sessionJSON.age;
    console.log(age);
    // let weight
    
    setGraph (age);
}



// ------------ Ausserhalb der Onload Funktion --------------------------


// Funktion zur Berechnung 
function calculateConsume () {

}

// Funktion zur Erstellung des Graphen
function setGraph (age) {
    var ctx = document.getElementById('myChart');
    var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: data,
        options: options
    });
}

