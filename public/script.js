let mealChoice = "";
let dietChoice = "";
let dishChoice = "";


function updateResult() {
    dishChoice = mapDishType(dishChoice)
    getTrivia()
    if (mealChoice && dietChoice && dishChoice) {
        fetch('/api/recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cuisineType: mealChoice,
                diet: dietChoice,
                dishType: dishChoice
            })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('cuisine-type').textContent = data.cuisineType + " Cuisine";
            document.getElementById('food-suggestion').textContent = data.name;
            document.getElementById('food-image-img').src = data.image;
            document.getElementById('result').classList.remove('hidden');
        })
        .catch(error => {
            console.error('Error fetching recipe:', error);
        });
    }
}

document.querySelectorAll(".meal-choice").forEach(button => {
    button.addEventListener("click", function() {
        mealChoice = button.getAttribute("data-choice");
        document.getElementById("question-1").classList.add("hidden");
        document.getElementById("question-2").classList.remove("hidden");
    });
});

document.querySelectorAll(".diet-choice").forEach(button => {
    button.addEventListener("click", function() {
        dietChoice = button.getAttribute("data-choice");
        document.getElementById("question-2").classList.add("hidden");
        document.getElementById("question-3").classList.remove("hidden");
    });
});

document.querySelectorAll(".dish-choice").forEach(button => {
    button.addEventListener("click", function() {
        dishChoice = button.getAttribute("data-choice");
        updateResult();
        document.getElementById("question-3").classList.add("hidden");
    });
});

async function getTrivia() {
    const response = await fetch('/api/trivia');
    const data = await response.json();
    document.getElementById('trivia').innerText = data.fact;
}


function mapDishType(dish) {
    const mapping = {
        "Snacking": "Snack",
        "Big meal": "Main course"
    };
    return mapping[dish] || dish;
}
