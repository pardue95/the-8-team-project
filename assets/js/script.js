var getCocktail = function(cocktail) {
 
        // format the cocktaildb api url
        var apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'
      
        // make a get request to url
        fetch(apiUrl)
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
  
      getCocktail()