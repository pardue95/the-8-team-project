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

   for (var i = 3; i < cocktailRecipe.length; i++) {
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