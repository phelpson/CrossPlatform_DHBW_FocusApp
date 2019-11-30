window.onload = function () {
    console.log('Dokument geladen');
    
    let confirmButton = document.getElementById("confirm-btn");
    let permanentStorage = window.localStorage;
    let tempStorage = window.sessionStorage;

    // Einmalig die Session aus dem Local Storage holen
    let session = window.localStorage.getItem("session");
    let sessionJSON = JSON.parse(session);

    // Variablen intitialisieren und deklarieren
    var kaffeeMenge;
    var teeMenge;
    var mateMenge;
    var colaMenge;
    var energyMenge;
    var biggest;
    var tagesMenge;
    var tagesMax;
    var deltaResult;
    setGraphVariables(sessionJSON);
    getBlockVariables();
    
    //Graph erzeugen
    setGraph (sessionJSON);
}

// ------------ Ausserhalb der Onload Funktion --------------------------


// Funktion zur Erstellung des Graphen
function setGraph (sessionJSON) {
    console.log("Graph initialisiert");    
    var ctx = document.getElementById('myChart');
    var myRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Kaffee', 'Tee', 'Mate', 'Energy Drink', 'Cola'],
            datasets: [{
                label: 'Dein Verbrauch',
                data: [kaffeeMenge, teeMenge, mateMenge, energyMenge, colaMenge],
                backgroundColor:'rgba(255, 0, 0, 0.25)',
                borderColor: 'rgba(128, 0, 0, 0.25)',
                pointBackgroundColor: 'rgba(0, 0, 0, 0.25)'              
            }]
        },      
        options: {
            scale: {
                ticks: {
                    suggestedMin: 0,
                    suggestedMax: (biggest + 1)
                }
            }
        }
    });

    myRadarChart.Tooltip.positioners.custom = function(elements, eventPosition) {
        /** @type {Chart.Tooltip} */
        var tooltip = this;
    
        /* ... */
    
        return {
            x: 0,
            y: 0
        };
    };
}

// Funktion zum Befüllen der Graphen Variablen
function setGraphVariables (sessionJSON) {
    console.log("Variablen befüllt");
    kaffeeMenge = sessionJSON.coffee;
    teeMenge    = sessionJSON.tea;
    mateMenge   = sessionJSON.mate;
    energyMenge = sessionJSON.energy; 
    colaMenge   = sessionJSON.cola;
    biggest     = Math.max(kaffeeMenge, teeMenge, mateMenge, energyMenge, colaMenge);
}

//Funktion zum Befüllen der Berechneten Werte
function getBlockVariables () {
    console.log("Variablen 2 gesetzt");
    /*tagesMenge  = ;                                                             //Berechnete Tagesdosis
    tagesMax = ;                                                                  //Berechnete maximale Tagesdosis
    deltaResult =                                                                 //Über-/ Unterschreitung vom Tagesbedarf
    */
}    

//Funktion zum Befüllen der HTML-Strucktur
function setBlockVariables(){
    console.log("Variablen 2 befüllt");
    
}




