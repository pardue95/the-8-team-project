// I want to:

// 1. turn the result of the fetch request into a variable 
// (a variable thats an array of objects that I can iterate through)

// 2. iterate through that array of objects based on a specific key/value match
// example: each object in the array has a key called 'MSRP'. I want to compare that key's value inside each object in the array
// to the one that I get from HTML select element. 
// Out of the array elements that match the search criteria (assuming they are few) I want to randomly select one
// and display it's name, picture, msrp and description in a HTML container.

// 3. once the search result is generated and displayed,
// saved data has to be persistent (i.e if the user refreshes the page, the result stays)

// 4. each time Roll the dice button is pressed, step 2 repeats.

function api () {
const apiUrl = "https://api.boardgameatlas.com/api/search?gt_min_players=2&lt_max_players=4&client_id=XWHzy7jIIr";

let userMsrp = document.querySelector('htmlMsrp'); // how do i know which select option was chosen?
let resultsContainer = document.querySelector('resultContainer');

fetch(apiUrl)
.then(function(response) {
  //clear divs inner html here
  console.log(response);
  if (response.ok) {
    response.json()
    .then(function(data) {
      console.log(data);
      let fetchedArray = data.games;
      // iterating through the array and comparing to user selected criteria
      for (let i = 0; i < fetchedArray.length; i++) {
        fetchedArray[i].msrp;
        console.log (htmlMsrp.value);

        let matchedArray = [];

        if (htmlMsrp.value == "under25" && condition2) {
          if (fetchedArray[i].msrp >= 0 && fetchedArray[i].msrp <= 25) {
            console.log("in 0 - 25 range", fetchedArray[i]);
            matchedArray.push(fetchedArray[i]);
          }
        } else if (htmlMsrp.value == "25to50") { 
          if (fetchedArray[i].msrp >= 25 && fetchedArray[i].msrp <= 50) {
          console.log("in 25 - 50 range");
        }

        } else if (htmlMsrp.value == "50to100") {
          if (fetchedArray[i].msrp >= 50 && fetchedArray[i].msrp <= 100) {
            //console.log("in 50 - 100 range");
          }

        } else if (htmlMsrp.value == "100andAbove") {
          if (fetchedArray[i].msrp >= 100) {
            //console.log("in 100+ range");
          }

        } else {
          alert("please make a selectuion");
          return;
        }

        //create a math.random function to generate a number between 0 and the length of the array 
        //matchedArray[randomNumber]
        //var element = document.getElementById || document.createElement("h2")
        //append element to main div
        //element.innerHTML || element.value = matchedArray[randomNumber].title;
      }

      console.log(fetchedArray);
      return response.json; // not sure about this one
    });
  }
});

}

// 2. Solution
var htmlMsrp = document.getElementById('htmlMsrp');
let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', api ) 

