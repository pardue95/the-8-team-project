var cocktailFormEl = document.querySelector('.random-cocktail-btn');
var cocktailInputEl = document.querySelector('#cocktail-name');
var cocktailContainerEl = document.querySelector('#cocktail');
var cocktailSearchTerm = document.querySelector('#cocktail-search-term');
console.log(cocktailContainerEl)

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

        console.log(cocktailDiv)
        const heading = document.createElement("h1");

        heading.innerHTML = cocktailName;
        cocktailDiv.appendChild(heading)
        // get the image
        const cocktailImg = document.createElement("img");
        console.log(cocktailImg)
        cocktailImg.src = cocktail.strDrinkThumb;
        cocktailDiv.appendChild(cocktailImg);
        // document.body.style.backgroundImage = "url('" + cocktail.strDrinkThumb + "')";  


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
            console.log(value)
            cocktailMeasurements.appendChild(listItem);




        }
    }

    const getInstruction = function(instructions) {
        console.log(instructions)
        const cocktailDiv = document.getElementById("cocktail");
        var instructionsEl = document.createElement('p')
        instructionsEl.innerHTML = instructions
        cocktailDiv.appendChild(instructionsEl)

    }
}


cocktailFormEl.addEventListener("click", getCocktail);