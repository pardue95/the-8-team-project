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


const apiUrl = "https://api.boardgameatlas.com/api/search?gt_min_players=2&lt_max_players=4&client_id=XWHzy7jIIr";

let userMsrp = document.querySelector('htmlMsrp'); // how do i know which select option was chosen?
let resultsContainer = document.querySelector('resultContainer');

// 1. Solution 

fetch(apiUrl)
.then(function(response) {
  if (response.ok) {
    response.json().then(function(data) {
      console.log(data);
      return response.json; // not sure about this one
    });
  }
});

// 2. Solution

for (let i=0; i < fetchedArray.length; i++) {
  let arrayMsrp = fetchedArray[i].msrp;
  // all other select options will be declared here as well
  if (userMsrp = arrayMsrp){  // multiple IF conditions will be stated here
    let gameName = fetchedArray[i].name; 
    let heading = document.createElement('h2');
    heading.innerHTML = gameName;
    resultsContainer.appendChild(heading);
  }
}