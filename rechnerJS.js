window.onload = function () {
    console.log('Dokument geladen');

    let confirmButton = document.getElementById("confirm-btn");
    let clearButton = document.getElementById("clear-btn");
    let permanentStorage = window.localStorage;
    let tempStorage = window.sessionStorage;

    
    
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

        // Local Storage wird einmalig mit dem Session Objekt befüllt
        window.localStorage.setItem("session", JSON.stringify(session));   

        window.location = "graph.html";
        
        //let dResultConsume = calculateConsume (session);
        //console.log("Calculate Consum complete." + dResultConsume);
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
function calculateConsume (session) {
    let iAge = session.age;
    let iWeight = session.weight;
    let bPregnant = session.pregnant;
    
    let sDrinkQuant = session.drink.quantity;

    let dConsume = 0.0;                 // Zur Berechnung des Konsums in mg
    let sMessage = "";                  // Message-String fuer die Fehlerausgabe
    let dMaxConsume = 5.7;              // empfohlener maximaler Tageskonsum pro KG in mg
    let dMaxConsumeAge = 3;             // empfohlener maximaler Tageskonsum pro KG in mg entsprechend dem Alter (<18 oder >65)
    let iMaxPregConsume = 200;          // Maximaler Tageskonsum bei schwangeren Frauen

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

    // Switch-Case zur Verwaltung der Getraenke
    switch (sDrinkType) {
        case "Coffee": 
            dConsume = sDrinkQuant * 80;
            console.log("Konsum an Kaffee:" + dConsume);
            break;
        case 'Tea':
            dConsume = sDrinkQuant * 20;
            break;
        case 'Energy Drink':
            dConsume = sDrinkQuant * 30;
            break;
        default:
            sMessage = "Es ist ein Fehler aufgetreten.";
            console.log("Fehler. Keiner der angelegten Drinks ausgewaehlt!");
            dConsume = 0.0;
            break;
    }
    
    // Pregnant-Flag beachten zur finalen Konsum Berechnung
    if(!bPregnant)
       { dResult = (dConsume / dIndividualMaxConsume) * 100;
        console.log("Pregnant-Flag FALSE");}
    else 
        dResult =(dConsume / iMaxPregConsume) * 100;


    console.log("Gesamtbewertung:" + dResult);
    // Rueckgabwert fuer die prozentuale Ueber/Unterschreitung
    return dResult;
}

