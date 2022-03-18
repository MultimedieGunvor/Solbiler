//Hent data fra url og gem den i sessionStorage

const URL = window.location.search; // Henter/returnerer query-delen af en URL (altså det, der kommer efter den "almindelige" URL, og som ender på .com og lignende).
const URLDATA = new URLSearchParams(URL); // Erklærer variablen URLDATA og fylder den med de data, vi har lagret i URL'en.
const LEJEASIDE = document.getElementById("lejeoplysninger"); // Erklærer variablen LEJEASIDE, og kæder den til html-elementet med id'et "lejeoplysninger", så vores adjacentHTML bliver fyldt i den.

LEJEASIDE.insertAdjacentHTML("beforeend", "<br><h3>" + URLDATA.get('bil') + "</h3>"); // Udskriver overskriften med biltypen.
LEJEASIDE.insertAdjacentHTML("beforeend", `<br>Afhentningsdato: ${URLDATA.get('afhentning')}`); // Udskriver afhentningsdatoen.
LEJEASIDE.insertAdjacentHTML("beforeend", `<br>Afleveringsdato: ${URLDATA.get('aflevering')}`); // Udskriver afleveringsdatoen.
LEJEASIDE.insertAdjacentHTML("beforeend", `<br>Antal dage: ${URLDATA.get('lejedage')}`); // Udskriver antal dage.
LEJEASIDE.insertAdjacentHTML("beforeend", `<br><br><h3>Billeje i alt ${parseFloat(URLDATA.get('lejeudgift')).toLocaleString('da-DK', {style: 'currency', currency: 'DKK'})}</h3>inkl. moms`); // Udskriver overskrift med billeje i alt. 
// ParseFloat konverterer string-værdier til tal, som kan bruges til beregning. ToLocaleString bruges her til at style prisen efter danske konventioner (f.eks med komma som decimalseparator i stedet for punktum).

sessionStorage.setItem("bil", URLDATA.get('bil')); // Gemmer biltypen i sessionStorage.
sessionStorage.setItem("afhentningsdato", URLDATA.get('afhentning')); // Gemmer afhentningsdatoen i sessionStorage.
sessionStorage.setItem("afleveringsdato", URLDATA.get('aflevering')); // Gemmer afleveringsdatoen i sessionStorage.
sessionStorage.setItem("lejedage", URLDATA.get('lejedage'));  // Gemmer antal lejedage i sessionStorage.
sessionStorage.setItem("lejeudgift", parseFloat(URLDATA.get('lejeudgift')).toLocaleString('da-DK', {style: 'currency', currency: 'DKK'}));  // Gemmer lejeudgiften i danske kroner (og skrevet efter danske konventioner) i sessionStorage.

let TOTAL = parseFloat(URLDATA.get('lejeudgift')); // Erklærer variablen TOTAL og fylder den med lejeudgiften i danske kroner.
let UDSTYRSUDGIFT = 0.00; // Erklærer variablen UDSTYRSUDGIFT og nulstiller den.

const TOTALASIDE = document.getElementById("totalindhold"); // Erklærer variablen TOTALASIDE og kæder den til html-elementet med id'et "totalindhold" (den lille boks yderst til højre).
visTotal(); // Kalder funktionen visTotal.

const CHECKBOKSE = document.getElementsByClassName("checkboks"); // Erklærer variablen CHECKBOKSE og kæder den til html-elementerne med class'en "checkboks".

for (const CHECKBOKS of CHECKBOKSE) { // Skaber en løkke, der gennemløber alle værdierne i variablen CHECKBOKSE, et element (CHECKBOKS) ad gangen.
    CHECKBOKS.addEventListener("change", function () { // Lytter efter forandringer (såsom checked eller unchecked)
        if (this.checked===true) { // Hvis en checkbox er klikket til, eksekverer vi følgende:
            TOTAL = Math.abs(TOTAL + parseFloat(this.value)); // Lægger checkboksens value til variablen TOTAL (beregner den totale udgift)
            UDSTYRSUDGIFT = Math.abs(UDSTYRSUDGIFT + parseFloat(this.value)); // Lægger checkboksens value til variablen UDSTYRSUDGIFT (beregner den sammenlagte udgift for udstyr)
        }
        else { // Hvis en checkbox IKKE er blevet klikket til, og der stadig er sket en forandring, er den jo klikket fra. Så eksekverer vi følgende:
            TOTAL = Math.abs(TOTAL - parseFloat(this.value)); // Trækker checkboksens value fra variablen TOTAL.
            UDSTYRSUDGIFT = Math.abs(UDSTYRSUDGIFT - parseFloat(this.value)); // Trækker checkboksens value fra variablen UDSTYRSUDGIFT.
        }
        visTotal(); // Kalder funktionen visTotal
    })
}


//Slideshow
function gaaFremad() {
    if (billedIndeks < billedliste.length - 1) {
        billedIndeks++;
    } else {
        billedIndeks = 0;
    }

    const slidefoto = document.getElementById("slidebillede");
    slidefoto.src = billedliste[billedIndeks];
}

function gaaTilbage() {
    if (billedIndeks > 0) {
        billedIndeks--;
    } else {
        billedIndeks = billedliste.length - 1;
    }

    const slidefoto = document.getElementById("slidebillede");
    slidefoto.src = billedliste[billedIndeks];
}

// ------- Hovedprogram ---------
const billedliste = ["/billeder/booster-seat.jpg", "/billeder/driver.jpg", "/billeder/gps.jpg", "/billeder/snow-chains.jpg", "/billeder/tow-truck.jpg"]; //Global variabel
let billedIndeks = 0; //Global variabel

const fremad = document.getElementById("frem");
fremad.addEventListener("click", function () {
    gaaFremad();
})

const tilbage = document.getElementById("tilbage");
tilbage.addEventListener("click", function () {
    gaaTilbage();
})


//Gem udstyr i sessionStorage

const FORMULAR = document.getElementById("formular"); // Erklærer variablen FORMULAR og kæder den sammen med html-elementet "formular".
FORMULAR.addEventListener("submit", gemValgtUdstyr);  // Lytter efter submit-events (= er der nogen, der trykker på Gem-knappen), og kalder så funktionen gemValgtUdstyr.
function gemValgtUdstyr() { // Erklærer funktionen gemValgtUdstyr.
    let udstyrsliste = []; // Erklærer den (foreløbigt) tomme variabel "udstyrsliste".
    for (const CHECKBOKS of CHECKBOKSE) { // Skaber en løkke, der gennemløber alle værdierne i variablen CHECKBOKSE, et element (CHECKBOKS) ad gangen.
        if (CHECKBOKS.checked === true) { // Hvis en checkboks er klikket til...
            let price = parseFloat(CHECKBOKS.value).toLocaleString('da-DK', { style: 'currency', currency: 'DKK'});
            udstyrsliste.push(CHECKBOKS.dataset.udstyr + " " + price); // Tilføjes dens data til vores ...array?
        }
    }
    sessionStorage.setItem("udstyrsliste", JSON.stringify(udstyrsliste)); // Gemmer udstyrslisten som en string i sessionStorage (dvs. at data slettes når fanen lukkes).
    sessionStorage.setItem("udstyrsudgift", UDSTYRSUDGIFT.toLocaleString('da-DK', { style: 'currency', currency: 'DKK'})); // Gemmer udstyrsudgiften i rette valutaenhed i sessionStorage.
    sessionStorage.setItem("total", TOTAL.toLocaleString('da-DK', { style: 'currency', currency: 'DKK'})); // Gemmer den totale udgift i rette valutaenhed i sessionStorage.
}
function visTotal() { // Erklærer funktionen visTotal.
    TOTALASIDE.innerHTML = `<br><h3>TOTAL ${TOTAL.toLocaleString('da-DK', { style:'currency', currency: 'DKK'})}</h3>inkl. moms`; // Udskriver den samlede pris i dansk valuta.
}