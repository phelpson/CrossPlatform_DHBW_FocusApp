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
                data: [10, 10, 4, 2, 8],
                backgroundColor:'rgba(255, 0, 0, 0.25)',
                borderColor: 'rgba(128, 0, 0, 0.25)',
                pointBackgroundColor: 'rgba(0, 0, 0, 0.25)',
                //hoverbackgroundColor: 'rgba(255, 0, 0, 0.4)'

            }]
        }
    });
}


