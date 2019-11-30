window.onload = function () {
    console.log('Dokument geladen');

    let confirmButton = document.getElementById("confirm-btn");
    let permanentStorage = window.localStorage;
    let tempStorage = window.sessionStorage;
    
    // Session befuellung - MOCK DATA - ausser Alter, wird direkt eingelesen.
    let session = {
        "age": 0,
        "weight": 65,
        "pregnant": false,
        "drink": {
            "type": "Energy Drink",
            "quantity": 8
        }
    }
    //let sessionJSON = JSON.stringify(session);


    // Button On-Click Event
    confirmButton.onclick = function () {
        // Session wird gefüllt mit Werten aus den Input Feldern
        session.age = document.getElementById("age_input").value;
        console.log(session.age);

        // Local Storage wird einmalig mit dem Session Objekt befüllt
        window.localStorage.setItem("session", JSON.stringify(session));   
        
        let dResultConsume = calculateConsume (session);
        console.log("Calculate Consum complete." + dResultConsume);
    }
}

// ------------ Ausserhalb der Onload Funktion --------------------------


// Calculate Funktion
function calculateConsume (session) {
    let iAge = session.age;
    let iWeight = session.weight;
    let bPregnant = session.pregnant;
    let sDrinkType = session.drink.type;
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
