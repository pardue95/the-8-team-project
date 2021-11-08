// Game render elements
let gameDisplayContainer = document.querySelector('#gameDisplayContainer');
let gameName = document.querySelector('#gameName');
let gameImage = document.querySelector('#gameImage');
let gameDesc = document.querySelector('#gameDesc');

// Drink render elements
let drinkDisplayContainer = document.querySelector('#drinkDisplayContainer');
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
let searchBtn = document.querySelector('#searchBtn');

// declaring local storage array
let storedData = [];

// API variables delcared globally
let apiUrlGame = "https://api.boardgameatlas.com/api/search?client_id=XWHzy7jIIr&fields=name,description,image_url";
let apiUrlDrink = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

// Functions 

// Function that checks if user selected a search criteria input 
let checkSelection = function() {
if (htmlMsrp.value==="" || htmlAge.value ==="" || htmlPlayers==="" || htmlDrinks.value==="") {
  // This needs to be changed to a modal? 
  modal()
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
  gameDisplayContainer.classList.remove('hide');
  // API call (modified base on search criteria)
  fetch(apiUrlGame)
  .then(function(response) {
    if (response.ok) {
      response.json()
      .then(function(data) {
        window.localStorage.setItem('game', JSON.stringify(data["games"]));
        // Storing returned API data in an array
        storedData = data["games"];
        // Choose a random element from the stored array
        for (let i=0; i<storedData.length; i++) {
        randomGame = Math.floor(Math.random() * storedData.length);
        gameName.innerHTML = storedData[randomGame].name;
        gameImage.src = storedData[randomGame].image_url;
        gameDesc.innerHTML = storedData[randomGame].description;
        }
         getCocktail();
      });
    }
    else {
      throw new Error("NETWORK RESPONSE ERROR");
  }
  });

// Drink randomizer function
  
  let getCocktail = function() {
    // Checking to see if random drink is selected
    if (htmlDrinks.value === "No") {
      // Drink card stays hidden
      // For testing purposes
      console.log("No drink");
    } 
    else {
      drinkDisplayContainer.classList.remove('hide');
      fetch(apiUrlDrink)
          .then((response) => {
              if (response.ok) {
                  return response.json();
              } else {
                  throw new Error("NETWORK RESPONSE ERROR");
              }
          })
          .then(data => {
              // Storing returned API data in an array
              window.localStorage.setItem('drink', JSON.stringify(data["drinks"]));
           // storedData = data["drinks"];
        drinkName.innerHTML = data["drinks"][0]["strDrink"];
        drinkImage.src = data["drinks"][0]["strDrinkThumb"];
        drinkDesc.innerHTML = data["drinks"][0]["strInstructions"];
          })
          .catch((error) => console.error("FETCH ERROR:", error));
        }
      }
      }

      const modal = function() {
        // Get the modal
        var modal = document.getElementById("myModal");
      
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];
      
        // When the user makes invalid selection show modal
      
        modal.style.display = "block";
      
      
        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
        }
      
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            };
        };
      };
// Event Listener 
searchBtn.addEventListener('click', checkSelection );