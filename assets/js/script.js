var cocktailFormEl = document.querySelector('#cocktail-form');
var cocktailInputEl = document.querySelector('#cocktail-name');
var cocktailContainerEl = document.querySelector('#cocktail-container');
var cocktailSearchTerm = document.querySelector('#cocktail-search-term');

let htmlMsrp = document.getElementById('htmlMsrp');
let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', api ) 

function api () {
  var apiUrl = "https://api.boardgameatlas.com/api/search?client_id=XWHzy7jIIr";
  
  let userMsrp = document.querySelector('htmlMsrp'); 
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