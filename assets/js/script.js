var cocktailFormEl = document.querySelector('.random-cocktail-btn');
var cocktailInputEl = document.querySelector('#cocktail-name');
var cocktailContainerEl = document.querySelector('#cocktail');
var cocktailSearchTerm = document.querySelector('#cocktail-search-term');
var cocktailImage = document.querySelector("#drinkImage")

var gameName = document.querySelector('#gameName');
var gameImage = document.querySelector('#gameImage');
var gameDesc = document.querySelector('#gameDesc');

let htmlMsrp = document.getElementById('htmlMsrp');
let searchBtn = document.getElementById('searchBtn');
 

var gameApi = function() {
  var apiUrl = "https://api.boardgameatlas.com/api/search?client_id=XWHzy7jIIr&fields=name,description,image_url";

  // price search parameter
  if (htmlMsrp.value == "under25") {
    apiUrl += "&lt_price=25";
    
  } 
  else if (htmlMsrp.value == "25to50") { 
    apiUrl += "&gt_price=24.99&lt_price=50";

  } 
  else if (htmlMsrp.value == "50andAbove") {
    apiUrl += "&gt_price=49.99";

  } 

  // player count search parameter

  if (htmlPlayers.value == "2to4") {
    apiUrl += "&min_players=2&max_player=4";

  } 
  else if (htmlPlayers.value == "3to6") {
    apiUrl += "&min_players=3&max_player=6";

  } 

  // minimum age search parameter
  if (htmlAge.value == "min6") {
    apiUrl += "&gt_min_age=5";

  } 
  else if (htmlAge.value == "min12") {
    apiUrl += "&gt_min_age=11";

  } 

  else if (htmlAge.value == "min18") {
    apiUrl += "&gt_min_age=17";

  } 
  
  fetch(apiUrl)
  .then(function(response) {
    //clear divs inner html here
    console.log(response);
    if (response.ok) {
      response.json()
      .then(function(data) {
        window.localStorage.setItem('game', JSON.stringify(data["games"]));
        gameName.innerHTML = data["games"][0]["name"];
        gameImage.src = data["games"][0]["image_url"];
        gameDesc.innerHTML = data["games"][0]["description"];
        getCocktail()
      });
    }
  });
  
  }


//Begin random cocktail generator
  
  var getCocktail = function() {
      // format the cocktaildb api url
  
      var apiUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  
      fetch(apiUrl)
          .then((response) => {
              if (response.ok) {
                  return response.json();
              } else {
                  throw new Error("NETWORK RESPONSE ERROR");
              }
          })
          .then(data => {
              console.log(data);
  
              displayCocktail(data)
              getInstruction(data.drinks[0].strInstructions)
          })
          .catch((error) => console.error("FETCH ERROR:", error));
  
      function displayCocktail(data) {
  
          const cocktail = data.drinks[0];
          console.log(cocktail)
          const cocktailDiv = document.getElementById("cocktail");
          // clears cocktail container
          cocktailContainerEl.innerHTML = ""
          const cocktailName = cocktail.strDrink;
          cocktailDiv.innerHTML = cocktailName
  
          console.log(cocktailDiv)
          const heading = document.createElement("h1");
  
          // heading.innerHTML = cocktailName;
          cocktailDiv.appendChild(heading)
          // get the image
          // const cocktailImg = document.createElement("img");
          console.log(cocktailImage)
          cocktailImage.src = cocktail.strDrinkThumb;
          cocktailDiv.appendChild(cocktailImage);
         
  
  
          // get ingredients
          const cocktailIngredients = document.createElement("ul");
          cocktailDiv.appendChild(cocktailIngredients);
  
          const getIngredients = Object.keys(cocktail)
  
              .filter(function(ingredient) {
                  return ingredient.indexOf("strIngredient") == 0;
              })
              .reduce(function(ingredients, ingredient) {
                  if (cocktail[ingredient] != null) {
                      ingredients[ingredient] = cocktail[ingredient];
                  }
  
                  return ingredients;
              }, {});
  
          for (let key in getIngredients) {
              let value = getIngredients[key];
              listItem = document.createElement("li");
              listItem.innerHTML = value;
  
              cocktailIngredients.appendChild(listItem);
  
          }
  
          const getMeasurements = Object.keys(cocktail)
  
              .filter(function(measurement) {
                  return measurement.indexOf("strMeasure") == 0;
              })
              .reduce(function(measurements, measurement) {
                  if (cocktail[measurement] != null) {
                      measurements[measurement] = cocktail[measurement];
                  }
  
                  return measurements;
              }, {});
  
          for (let key in getMeasurements) {
              let value = getMeasurements[key];
              cocktailMeasurements = document.createElement("li");
              cocktailMeasurements.innerHTML = value;
              // console.log(value)
              cocktailMeasurements.appendChild(listItem);
  
  
  
  
          }
      }
  
      const getInstruction = function(instructions) {
          // console.log(instructions)
          const cocktailDiv = document.getElementById("cocktailInstructions");
          cocktailDiv.innerHTML = ""
          var instructionsEl = document.createElement('p')
          instructionsEl.innerHTML = instructions
          cocktailDiv.appendChild(instructionsEl)
  
      }
  }

  // cocktailFormEl.addEventListener("click", getCocktail);
  searchBtn.addEventListener('click', gameApi );
  // getCocktail();
