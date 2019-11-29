window.onload = function () {
    console.log('Dokument geladen');

    let confirmButton = document.getElementById("confirm-btn");
    let permanentStorage = window.localStorage;
    let tempStorage = window.sessionStorage;
    
    let session = {
        "age": 0,
        "weight": 0,
        "pregnant": false,
        "drink": {
            "type": "Coffee",
            "quantity": 10
        }
    }
    //let sessionJSON = JSON.stringify(session);

    confirmButton.onclick = function () {
        // Session wird gefüllt mit Werten aus den Input Feldern
        session.age = document.getElementById("age_input").value;
        console.log(session.age);

        // Local Storage wird einmalig mit dem Session Objekt befüllt
        window.localStorage.setItem("session", JSON.stringify(session));
        
    }
}
