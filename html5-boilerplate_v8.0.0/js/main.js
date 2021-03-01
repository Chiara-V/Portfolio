
//************SLIDESHOWS**************//

var slideIndex = [1,1,1,1, 1];
var slideId = ["slide", "slideb", "slidec", "slided", "slidef"]
showSlides(1, 0);
showSlides(1, 1);
showSlides(1,2);
showSlides(1, 3);
showSlides(1,4);

// Next/previous controls
function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  var i;
  var x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {slideIndex[no] = 1}
  if (n < 1) {slideIndex[no] = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex[no]-1].style.display = "block";
}

//**********changing language***************//
//if switching-language = "eng" --> html lang= "en"; else if switching-language = "ita" --> html lang="it"//
var mlCodes = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "it",
    name: "Italian",
  }
];

var MLstrings = [
    {
        English: "WORKS",
        Italian: "LAVORI",
    },
    {
        English: "ABOUT",
        Italian: "CHI SONO",
      },
      {
          English: "CONTACT",
          Italian: "CONTATTI",
];


// Global var :(
var mlrLangInUse;

var mlr = function({
    dropID = "lang-switch",
    stringAttribute = "data-mlr-text",
    chosenLang = "English",
    mLstrings = MLstrings,
    countryCodes = false,
    countryCodeData = [],
} = {}) {
    const root = document.documentElement;

    var listOfLanguages = Object.keys(mLstrings[0]);
    mlrLangInUse = chosenLang;

    (function createMLDrop() {
        var lang-switch = document.getElementById(dropID);
        // Reset the menu
        lang-switch.innerHTML = "";
        // Now build the options
        listOfLanguages.forEach((lang, langidx) => {
            let HTMLoption = document.createElement("option");
            HTMLoption.value = lang;
            HTMLoption.textContent = lang;
            lang-switch.appendChild(HTMLoption);
            if (lang === chosenLang) {
                lang-switch.value = lang;
            }
        });
        lang-switch.addEventListener("change", function(e) {
            mlrLangInUse = lang-switch[lang-switch.selectedIndex].value;
            resolveAllMLStrings();
            // Here we update the 2-digit lang attribute if required
            if (countryCodes === true) {
                if (!Array.isArray(countryCodeData) || !countryCodeData.length) {
                    console.warn("Cannot access strings for language codes");
                    return;
                }
                root.setAttribute("lang", updateCountryCodeOnHTML().code);
            }
        });
    })();

    function updateCountryCodeOnHTML() {
        return countryCodeData.find(this2Digit => this2Digit.name === mlrLangInUse);
    }

    function resolveAllMLStrings() {
        let stringsToBeResolved = document.querySelectorAll(`[${stringAttribute}]`);
        stringsToBeResolved.forEach(stringToBeResolved => {
            let originaltextContent = stringToBeResolved.textContent;
            let resolvedText = resolveMLString(originaltextContent, mLstrings);
            stringToBeResolved.textContent = resolvedText;
        });
    }
};

function resolveMLString(stringToBeResolved: string, mLstrings) {
    var matchingStringIndex = mLstrings.find(function(stringObj) {
        // Create an array of the objects values:
        let stringValues = Object.values(stringObj);
        // Now return if we can find that string anywhere in there
        return stringValues.includes(stringToBeResolved);
    });
    if (matchingStringIndex) {
        return matchingStringIndex[mlrLangInUse];
    } else {
        // If we don't have a match in our language strings, return the original
        return stringToBeResolved;
    }
}

mlr({
    dropID: "mbPOCControlsLangDrop",
    stringAttribute: "data-mlr-text",
    chosenLang: "English",
    mLstrings: MLstrings,
    countryCodes: true,
    countryCodeData: mlCodes,
});
