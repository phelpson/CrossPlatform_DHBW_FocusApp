window.onload = function () {
    console.log('Dokument geladen');
    
    let confirmButton = document.getElementById("confirm-btn");
    let permanentStorage = window.localStorage;
    let tempStorage = window.sessionStorage;

    // Einmalig die Session aus dem Local Storage holen
    let session = window.localStorage.getItem("session");
    let sessionJSON = JSON.parse(session);

    // Variablen befüllen
    setVariables();
    
    //Graph erzeugen
    setGraph ();
}

// ------------ Ausserhalb der Onload Funktion --------------------------


// Funktion zur Erstellung des Graphen
function setGraph () {
    console.log("Graph initialisiert");
    var ctx = document.getElementById('myChart');
    var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Kaffee', 'Tee', 'Energy Drink', 'Cola', 'Mate'],
            datasets: [{
                data: [kaffeeMenge,teeMenge, energyMenge, colaMenge, mateMenge],
                backgroundColor:'rgba(255, 0, 0, 0.25)',
                borderColor: 'rgba(128, 0, 0, 0.25)',
                pointBackgroundColor: 'rgba(0, 0, 0, 0.25)',
                //hoverbackgroundColor: 'rgba(255, 0, 0, 0.4)'

            }]
        }
    });
}

// Funktion zum Befüllen der Variablen
function setVariables () {
    let kaffeeMenge = JSON.parse(window.localStorage,getItem("kaffee"));
    let teeMenge    = JSON.parse(window.localStorage,getItem("tee"));
    let energyMenge = JSON.parse(window.localStorage,getItem("energy"));
    let colaMenge   = JSON.parse(window.localStorage,getItem("cola"));
    let mateMenge   = JSON.parse(window.localStorage,getItem("mate"));
}


