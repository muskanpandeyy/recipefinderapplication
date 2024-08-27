const apiKey = '1f9f4a4467e942c2aa48ad6b20e5d2a1'; 

document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value;
    if (!query) {
        alert('Please enter a search term.');
        return;
    }

    try {
        const searchUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;
        const response = await fetch(searchUrl);
        const data = await response.json();
        if (data.results) {
            displayRecipes(data.results);
        } else {
            alert('No recipes found.');
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
});

async function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = '';

    for (const recipe of recipes) {
        try {
            const recipeDetails = await fetchRecipeDetails(recipe.id);
            const recipeCard = createRecipeCard(recipeDetails);
            recipesContainer.appendChild(recipeCard);
        } catch (error) {
            console.error('Error fetching recipe details:', error);
        }
    }
}

async function fetchRecipeDetails(recipeId) {
    try {
        const detailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;
        const response = await fetch(detailsUrl);
        return await response.json();
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}

function createRecipeCard(recipe) {
    const card = document.createElement('div');
    card.classList.add('recipe-card');

    const title = document.createElement('h2');
    title.textContent = recipe.title;
    card.appendChild(title);

    if (recipe.image) {
        const img = document.createElement('img');
        img.src = recipe.image;
        img.alt = recipe.title;
        card.appendChild(img);
    }

    const ingredientsList = document.createElement('ul');
    for (const ingredient of recipe.extendedIngredients) {
        const li = document.createElement('li');
        li.textContent = ingredient.original;
        ingredientsList.appendChild(li);
    }
    card.appendChild(ingredientsList);

    const instructions = document.createElement('p');
    instructions.textContent = recipe.instructions || 'No instructions available.';
    card.appendChild(instructions);

    return card;
}
