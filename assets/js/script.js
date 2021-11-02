var cocktailFormEl = document.querySelector('#cocktail-form');
var cocktailInputEl = document.querySelector('#cocktail-name');
var cocktailContainerEl = document.querySelector('#cocktail-container');
var cocktailSearchTerm = document.querySelector('#cocktail-search-term');
console.log(cocktailFormEl)

var getCocktail = function(cocktail) {
 
        // format the cocktaildb api url
        var apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + cocktail
      
        // make a get request to url
        fetch(apiUrl)
          .then(function(response) {
            // request was successful
            if (response.ok) {
              console.log(response);
              response.json().then(function(data) {
                console.log(data);
                console.log(data.drinks)
                displayCocktails(data.drinks, cocktail)
              });
            } else {
              alert('Error: ' + response.statusText);
            }
          })
          .catch(function(error) {
            alert('Unable to connect to The Cocktail DB');
          });
      };


  
var formSubmitHandler = function(event) {
        // prevent page from refreshing
        event.preventDefault();
      
        // get value from input element
        var cocktailName = cocktailInputEl.value.trim();
      
        if (cocktailName) {
          getCocktail(cocktailName);
      
          // clear old content
          cocktailContainerEl.textContent = '';
          cocktailInputEl.value = '';
        } else {
          alert('Please enter a cocktail name');
        }
    
};

var displayCocktails = function(cocktailRecipe, cocktail) {
  //check if API returns any cocktails
  if (cocktailRecipe.length === 0) {
    cocktailContainerEl.textContent = "No cocktails found.";
    return;}

    cocktailSearchTerm.textContent = cocktail

   for (var i = 0; i < 2; i++) {
     //format cocktail name
     var cocktailName =cocktailRecipe[i].strDrink
     console.log(cocktailName)

     // create a div for each cocktail
    var cocktailEl = document.querySelector("#cocktail-container");
    var cocktailRecipeEl = document.createElement("li");
    cocktailRecipeEl.textContent = cocktailName;

    cocktailEl.appendChild(cocktailRecipeEl)

   
   }
}

cocktailFormEl.addEventListener("submit", formSubmitHandler);

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

// Alternatively:

// 1. Append results of search criteria to the apiURL

// 2. Return array of applicable elements

// 3. Save data to localStorage

// 4. Generate random game and reroll button to HTM

function api () {
  var apiUrl = "https://api.boardgameatlas.com/api/search?client_id=XWHzy7jIIr";
  
  let userMsrp = document.querySelector('htmlMsrp'); // how do i know which select option was chosen?
  let resultsContainer = document.querySelector('resultContainer');

  // price search parameter
  if (htmlMsrp.value == "under25") {
    apiUrl += "&lt_price=" + 25;
    
  } 
  else if (htmlMsrp.value == "25to50") { 
    apiUrl += "&gt_price=24.99&lt_price=50";

  } 
  else if (htmlMsrp.value == "50to100") {
    apiUrl += "&gt_price=49.99&lt_price=100";

  } 
  else if (htmlMsrp.value == "100andAbove") {
    apiUrl += "&gt_price=99.99";

  } 
  else {
    // remove alert later
    alert("please make a selection");
    return;
  }

  // player count search parameter

  if (htmlPlayers.value == "2to4") {
    apiUrl += "&min_players=2&max_player=4";

  } 
  else if (htmlPlayers.value == "5andMore") {
    apiUrl += "&min_players=5";

  } 
  else {
    // remove alert later
    alert("please make a selection");
    return;
  }
  
  fetch(apiUrl)
  .then(function(response) {
    //clear divs inner html here
    console.log(response);
    if (response.ok) {
      response.json()
      .then(function(data) {
        console.log(data);
        return response.json; // not sure about this one
      });
    }
  });
  
  }
  
  // 2. Solution
  var htmlMsrp = document.getElementById('htmlMsrp');
  let submitBtn = document.getElementById('submitBtn');
  submitBtn.addEventListener('click', api ) 
