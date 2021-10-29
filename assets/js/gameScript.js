var getGame = function() {
  // Board Game Atlas API call
    var gameApiUrl = "https://api.boardgameatlas.com/api/search?gt_min_players=2&lt_max_players=4&client_id=XWHzy7jIIr";
    // make a get request to url
    fetch(gameApiUrl)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          console.log(response);
          response.json().then(function(data) {
            console.log(data);
            
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function(error) {
        alert('Unable to connect to The Cocktail DB');
      });
  };

  
getGame();