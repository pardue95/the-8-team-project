let cocktailFormEl = document.querySelector('.random-cocktail-btn');
let cocktailInputEl = document.querySelector('#cocktail-name');
let cocktailContainerEl = document.querySelector('#cocktail');

// Game render elements
let gameName = document.querySelector('#gameName');
let gameImage = document.querySelector('#gameImage');
let gameDesc = document.querySelector('#gameDesc');

// Drink render elements
let drinkName = document.querySelector('#drinkName');
let drinkImage = document.querySelector('#drinkImage');
let drinkDesc = document.querySelector('#drinkDesc');

// Game search criteria
let htmlAge = document.querySelector('#htmlAge');
let htmlPlayers = document.querySelector('#htmlPlayers');
let htmlMsrp = document.querySelector('#htmlMsrp');

// Drink random criteria
let htmlDrinks = document.querySelector('#htmlDrinks');

// Search 'Roll the Dice' button
let searchBtn = document.getElementById('searchBtn');

// declaring local storage array
let storedData = [];

// API variables delcared globally
let apiUrlGame = "https://api.boardgameatlas.com/api/search?client_id=XWHzy7jIIr&fields=name,description,image_url";
let apiUrlDrink = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

// Random Game
var randomGame = 0;

// Functions 

// Function that checks if user selected a search criteria input 
let checkSelection = function() {
if (htmlMsrp.value==="" || htmlAge.value ==="" || htmlPlayers==="" || htmlDrinks.value==="") {
  // This needs to be changed to a modal? 
  console.log ('please make a valid selection');
}
else {
  appendApi();
}
}

// Function that appends the board game API based on user selected criteria
var appendApi = function () {
  if (htmlMsrp.value == "under25") {
    apiUrlGame += "&lt_price=25";
  } 
  else if (htmlMsrp.value == "25to50") { 
    apiUrlGame += "&gt_price=24.99&lt_price=50";
  } 
  else if (htmlMsrp.value == "50andAbove") {
    apiUrlGame += "&gt_price=49.99";
  } 
  // player count search parameter
  if (htmlPlayers.value == "2to4") {
    apiUrlGame += "&min_players=2&max_player=4";
  } 
  else if (htmlPlayers.value == "3to6") {
    apiUrlGame += "&min_players=3&max_player=6";
  } 
  // minimum age search parameter
  if (htmlAge.value == "min6") {
    apiUrlGame += "&gt_min_age=5";
  } 
  else if (htmlAge.value == "min12") {
    apiUrlGame += "&gt_min_age=11";
  } 
  else if (htmlAge.value == "min18") {
    apiUrlGame += "&gt_min_age=17";
  } 
  gameApi();
}
// Board Game select function
var gameApi = function() { 

  // API call (modified base on search criteria)
  fetch(apiUrlGame)
  .then(function(response) {
    // for testing purposes
    console.log(response);
    if (response.ok) {
      response.json()
      .then(function(data) {
        window.localStorage.setItem('game', JSON.stringify(data["games"]));
        storedData = data["games"];
        console.log(storedData);
        for (let i=0; i<storedData.length; i++) {
          randomGame = Math.floor(Math.random() * storedData.length);
        }
        //gameName.innerHTML = storeData["games"][randomGame]["name"];
        gameName.innerHTML = storedData[randomGame].name;
        gameImage.src = storedData[randomGame].image_url;
        gameDesc.innerHTML = storedData[randomGame].description;
        // gameImage.src = data["games"][randomGame]["image_url"];
        // gameDesc.innerHTML = data["games"][randomGame]["description"];
        // getCocktail()
      });
    }
    else {
      throw new Error("NETWORK RESPONSE ERROR");
  }
  });
// Drink randomizer function
  
  var getCocktail = function() {
    if (htmlDrinks.value === "No") {
      // drink card stays hidden
      console.log("No drink");
    } 
    else {
      fetch(apiUrlDrink)
          .then((response) => {
              if (response.ok) {
                  return response.json();
              } else {
                  throw new Error("NETWORK RESPONSE ERROR");
              }
          })
          .then(data => {
              // for testing purposes
              console.log(data);
          })
          .catch((error) => console.error("FETCH ERROR:", error));
        }
      // function displayCocktail(data) {
  
      //     const cocktail = data.drinks[0];
      //     console.log(cocktail)
      //     const cocktailDiv = document.getElementById("cocktail");
      //     // clears cocktail container
      //     cocktailContainerEl.innerHTML = ""
      //     const cocktailName = cocktail.strDrink;
      //     cocktailDiv.innerHTML = cocktailName
  
      //     console.log(cocktailDiv)
      //     const heading = document.createElement("h1");
  
      //     // heading.innerHTML = cocktailName;
      //     cocktailDiv.appendChild(heading)
      //     // get the image
      //     // const cocktailImg = document.createElement("img");
      //     console.log(cocktailImage)
      //     cocktailImage.src = cocktail.strDrinkThumb;
      //     cocktailDiv.appendChild(cocktailImage);
         
  
  
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
// Event Listener 
searchBtn.addEventListener('click', checkSelection );

