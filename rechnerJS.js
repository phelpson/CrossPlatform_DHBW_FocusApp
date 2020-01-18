window.onload = function () {
    console.log('Dokument geladen');
    $('.carousel').carousel('pause');
    let confirmButton = document.getElementById("confirm-btn");
    let clearButton = document.getElementById("clear-btn");
    let permanentStorage = window.localStorage;
    let tempStorage = window.sessionStorage;
    let errorMessage = 0;
    
    // Session befuellung - MOCK DATA - ausser Alter, wird direkt eingelesen.
    let session = {
        "age": 0,
        "weight": 0,
        "pregnant": false,
        "coffee": 0,
        "tea": 0,
        "mate": 0,
        "energy": 0,
        "cola" : 0      
    }
    // Überprüfen ob session bereits im local storage und Felder mit Werten vorbefüllen
    if (localStorage.getItem("session") !== null) {
        let sessionPrefill = localStorage.getItem("session") 
        let sessionPrefillJSON = JSON.parse(sessionPrefill);
        // alter
        document.getElementById("age_input").value = sessionPrefillJSON.age;
        // gewicht
        document.getElementById("weight_input").value = sessionPrefillJSON.weight;
        // pregnant
        document.getElementById("pregnantCheck").checked = sessionPrefillJSON.pregnant;
        //coffee
        document.getElementById("coffeeCount").innerHTML = sessionPrefillJSON.coffee;
        document.getElementById("coffeeRange").value = sessionPrefillJSON.coffee;
        //tea
        document.getElementById("teaCount").innerHTML = sessionPrefillJSON.tea;
        document.getElementById("teaRange").value = sessionPrefillJSON.tea;
        //energy
        document.getElementById("energyCount").innerHTML = sessionPrefillJSON.energy;
        document.getElementById("energyRange").value = sessionPrefillJSON.energy;
        //cola
        document.getElementById("colaCount").innerHTML = sessionPrefillJSON.cola;
        document.getElementById("colaRange").value = sessionPrefillJSON.cola;
        //mate
        document.getElementById("mateCount").innerHTML = sessionPrefillJSON.mate;
        document.getElementById("mateRange").value = sessionPrefillJSON.mate;
      }
    

    // Button On-Click Event
    confirmButton.onclick = function () {
        // Session wird gefüllt mit Werten aus den Input Feldern
        if(checkForEmptyInput(errorMessage) === true){
            //setze Alter
            session.age = document.getElementById("age_input").value;
            console.log(session.age);
            // Setze Gewicht
            session.weight = document.getElementById("weight_input").value;
            // Setze Schwangerschaftsstatus
            session.pregnant = document.getElementById("pregnantCheck").checked;
            // Setze Kaffee Anzahl
            session.coffee = document.getElementById("coffeeCount").innerHTML;
            // Setze Tee Anzahl
            session.tea = document.getElementById("teaCount").innerHTML;
            // Setze Mate Anzahl
            session.mate = document.getElementById("mateCount").innerHTML;
            // Setze Energy Anzahl
            session.energy = document.getElementById("energyCount").innerHTML;
            console.log(session.energy);
            // Setze Cola Anzahl
            session.cola = document.getElementById("colaCount").innerHTML;

            // Durchführung der Konsumberechnung
            let dResultConsume = calculateConsume (session);
            console.log("Calculate Consum complete." + dResultConsume);


            // Local Storage wird einmalig mit dem Session Objekt befüllt
            localStorage.setItem("session", JSON.stringify(session));   

            window.location = "graph.html";
        }else{
            alert("Ungültige Eingabe. Bitte überprüfe die Eingabefelder!");
        }
    }
    // Clear Button Event
    clearButton.onclick = function(){
        localStorage.removeItem("session");
        location.reload();
    }
}

// ------------ Ausserhalb der Onload Funktion --------------------------

// Update Range State Value
function updateTextInput(id,val) {
    switch(id) {
        case "energyRange": 
            document.getElementById("energyCount").innerHTML = val;
          break;
        case "teaRange":
            document.getElementById("teaCount").innerHTML = val;
          break;
          case "coffeeRange":
            document.getElementById("coffeeCount").innerHTML = val;
          break;
          case "mateRange":
            document.getElementById("mateCount").innerHTML = val;
          break;
          case "colaRange":
            document.getElementById("colaCount").innerHTML = val;
          break;
        default:
          // 
      }
    
  }

// Calculate Funktion
function createModel() {
    let drinkModel = {
        "coffee": 80,
        "tea": 20,
        "mate": 100,
        "cola": 83,
        "energy": 100
    }
    return drinkModel;
}

function calculateConsume (session) {
    let iAge = session.age;
    let iWeight = session.weight;
    let bPregnant = session.pregnant;   // Wert für Pregnant speichern
    let drinkModel = createModel();

    let dMaxConsume = 5.7;              // empfohlener maximaler Tageskonsum pro KG in mg
    let dMaxConsumeAge = 3;             // empfohlener maximaler Tageskonsum pro KG in mg entsprechend dem Alter (<18 oder >65)
    let iMaxPregConsume = 200;          // Maximaler Tageskonsum bei schwangeren Frauen
    let dOverUnderConsume = 0.0;        // Koffein Über- Unterschreitung

    let dIndividualMaxConsume = 0.0;    // Variable fuer maximalen Konsum pro Person (Gewicht * Koffeinwert in mg)
    let dResult = 0.0;                  // Finale Ueber- Unterschreitung in Prozent

    // Alterspruefung. Personen unter 18 sollten nur maximal 3mg pro KG zu sich nehmen
    if (iAge < 18 || iAge > 65) {
        dIndividualMaxConsume = iWeight * dMaxConsumeAge;       // Maximaler Konsum mit aktuellen Eingabewerten Restriktion
        console.log('Alterskonsum:' + dIndividualMaxConsume);
    }
    else {
        dIndividualMaxConsume = iWeight * dMaxConsume;          // Maximaler Konsum ohne Altersrestriktionen
        console.log('Konsum:' + dIndividualMaxConsume);
    }
    
    session.dDailyMaxConsume = parseFloat(dIndividualMaxConsume.toFixed(2));       // Neuen Wert für maximaler Tageskonsum in mg im Session-JSON hinzufügen
   

    // Berechnungen für die unterschiedlichen Getränke
    let dConsumeCoffee  = session.coffee        * drinkModel.coffee;
    let dConsumeTea     = session.tea           * drinkModel.tea;
    let dConsumeMate    = session.mate          * drinkModel.mate;
    let dConsumeCola    = session.cola          * drinkModel.cola;
    let dConsumeEnergy  = session.energy        * drinkModel.energy;

    let dTotalConsume = dConsumeCoffee + dConsumeTea + dConsumeMate + dConsumeCola + dConsumeEnergy;

    // Prozentualer Über- Unterkonsum prüfen
    dOverUnderConsume = parseFloat(pregnantChecker(dTotalConsume).toFixed(2));
    console.log(dOverUnderConsume);

    // Zuweisung zum Session Model durch erstellen eines neuen Key-Value Paares               
    session.dOverUnderConsume = dOverUnderConsume; 

    // Innere Funktion zum Prüfen der Pregnant-Flag
    function pregnantChecker (dTotalConsume){
        if(!bPregnant){ 
            dResult = (dTotalConsume / dIndividualMaxConsume) * 100;
            session.dDailyConsume = parseFloat(dTotalConsume.toFixed(2));;  
            console.log("Pregnant-Flag FALSE");
        }
        else {
            dResult =(dTotalConsume / iMaxPregConsume) * 100;
            session.dDailyConsume = dTotalConsume;  
            session.dDailyMaxConsume = parseFloat(iMaxPregConsume.toFixed(2));     // Ausnahme für schwangere - Max 200mg pro Tag
        }
        return dResult;
    }
}

function checkForEmptyInput(errorMessage){

    let alter = document.getElementById("age_input").value;
    let gewicht = document.getElementById("weight_input").value;
    console.log(typeof(alter));
    console.log(typeof(gewicht));
    console.log(alter + " " + gewicht);
    let bool = true;    // helper bool

    $("#age_input").css("border", "");
    $("#weight_input").css("border", "");
    // prüfe auf Alter ungleich leer, Alter älter als 99 und Alter nicht negativ
    if(!alter || alter>99 || alter <=0){
        $("#age_input").css("border", "1px solid red");     // setze Border auf Input Feld, um User aufmerksam darauf zu machen
        bool = false; 
    }

    // prüfe Gewicht ungleich leer, Gewicht nicht schwerer als 200 und Gewicht nicht negativ
    if (!gewicht || gewicht >200 || gewicht <= 0){
        $("#weight_input").css("border", "1px solid red");  // setze Border auf Input Feld, um User aufmerksam darauf zu machen
        bool = false; 
    }
    return bool;


}

