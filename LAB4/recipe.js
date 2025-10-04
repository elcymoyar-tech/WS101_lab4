const recipes = [
    { title: "Adobo", ingredients: ["chicken", "soy sauce", "vinegar", "garlic"], category: "Ulam", cookingTime: 45 },
    { title: "Sinigang", ingredients: ["pork", "tamarind", "vegetables"], category: "Ulam", cookingTime: 60 },
    { title: "Pancit Canton", ingredients: ["noodles", "vegetables", "soy sauce"], category: "Pasta/Noodles", cookingTime: 25 },
    { title: "Halo-Halo", ingredients: ["ice", "milk", "fruits", "leche flan"], category: "Dessert", cookingTime: 15 },
    { title: "Lumpiang Shanghai", ingredients: ["ground pork", "wrapper", "carrots"], category: "Appetizer", cookingTime: 30 }
];

function countRecipes() {
    return recipes.length;
}

function filterByCategory(category) {
    return recipes.filter(r => r.category.toLowerCase() === category.toLowerCase());
}

function longestCookingRecipe() {
    return recipes.reduce((max, r) => r.cookingTime > max.cookingTime ? r : max);
}

function groupByCookingTime() {
    return {
        quick: recipes.filter(r => r.cookingTime < 20),
        medium: recipes.filter(r => r.cookingTime >= 20 && r.cookingTime <= 40),
        long: recipes.filter(r => r.cookingTime > 40)
    };
}

function fetchNewRecipes() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([{ title: "Kare-Kare", ingredients: ["oxtail", "peanut sauce"], category: "Ulam", cookingTime: 90 }]);
        }, 2000);
    });
}

console.log("Total recipes:", countRecipes());
console.log("Category: Ulam", filterByCategory("Ulam"));
console.log("Longest cooking recipe:", longestCookingRecipe());
console.log("Grouped recipes:", groupByCookingTime());

fetchNewRecipes().then(newData => console.log("Fetched new recipes:", newData));
