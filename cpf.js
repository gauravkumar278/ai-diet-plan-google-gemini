import ingredients from "./ingredients.js"; // Import your ingredients.js file

function calculateCPF(ingredients, ingredientQuantities) {
    let totalC = 0;
    let totalP = 0;
    let totalF = 0;

    for (const ingredient of ingredients) {
        const quantityData = ingredientQuantities.find(
            (item) => item.name === ingredient.name
        );

        if (quantityData) {
            let ingredientC = 0;
            let ingredientP = 0;
            let ingredientF = 0;

            switch (ingredient.unit) {
                case "kg":
                    ingredientC = ingredient.nutritionalInfo.carbohydrates * (quantityData.quantity / 1000);
                    ingredientP = ingredient.nutritionalInfo.proteins * (quantityData.quantity / 1000);
                    ingredientF = ingredient.nutritionalInfo.fats * (quantityData.quantity / 1000);
                    break;
                case "g":
                    ingredientC = ingredient.nutritionalInfo.carbohydrates * (quantityData.quantity / 100);
                    ingredientP = ingredient.nutritionalInfo.proteins * (quantityData.quantity / 100);
                    ingredientF = ingredient.nutritionalInfo.fats * (quantityData.quantity / 100);
                    break;
                default:
                    console.warn(
                        `Unsupported unit: ${ingredient.unit} for ingredient: ${ingredient.name}`
                    );
                    break;
            }

            totalC += ingredientC;
            totalP += ingredientP;
            totalF += ingredientF;
        }
    }

    return {
        totalC: totalC,
        totalP: totalP,
        totalF: totalF,
        totalCPF: totalC + totalP + totalF,
    };
}

const ingredientQuantities = [{
    "macros": {
        "carbs": 20,
        "fat": 2,
        "protein": 4
    },
    "name": "Quinoa",
    "quantity": 100,
    "unit": "g",
    "state": "uncooked"
},
{
    "macros": {
        "carbs": 5,
        "fat": 5,
        "protein": 0
    },
    "name": "Olive Oil",
    "quantity": 20,
    "unit": "g",
    "state": "uncooked"
},
{
    "macros": {
        "carbs": 5,
        "fat": 0,
        "protein": 1
    },
    "name": "Onion",
    "quantity": 50,
    "unit": "g",
    "state": "uncooked"
},
{
    "macros": {
        "carbs": 20,
        "fat": 1,
        "protein": 10
    },
    "name": "Lentils",
    "quantity": 100,
    "unit": "g",
    "state": "uncooked"
},
{
    "macros": {
        "carbs": 1,
        "fat": 0,
        "protein": 0
    },
    "name": "Vegetable Broth",
    "quantity": 100,
    "unit": "ml",
    "state": "uncooked"
},
{
    "macros": {
        "carbs": 5,
        "fat": 1,
        "protein": 2
    },
    "name": "Curry Powder",
    "quantity": 10,
    "unit": "g",
    "state": "uncooked"
},
{
    "macros": {
        "carbs": 2,
        "fat": 0,
        "protein": 2
    },
    "name": "Spinach",
    "quantity": 50,
    "unit": "g",
    "state": "uncooked"
},
{
    "macros": {
        "carbs": 20,
        "fat": 1,
        "protein": 2
    },
    "name": "Sweet Potatoes",
    "quantity": 150,
    "unit": "g",
    "state": "uncooked"
},
{
    "macros": {
        "carbs": 15,
        "fat": 1,
        "protein": 5
    },
    "name": "Black Beans",
    "quantity": 150,
    "unit": "g",
    "state": "uncooked"
},
{
    "macros": {
        "carbs": 10,
        "fat": 2,
        "protein": 3
    },
    "name": "Breadcrumbs",
    "quantity": 30,
    "unit": "g",
    "state": "uncooked"
},
{
    "macros": {
        "carbs": 2,
        "fat": 1,
        "protein": 2
    },
    "name": "Spices",
    "quantity": 10,
    "unit": "g",
    "state": "uncooked"
}];

const results = calculateCPF(ingredients, ingredientQuantities);
console.log("Total C:", results.totalC);
console.log("Total P:", results.totalP);
console.log("Total F:", results.totalF);
console.log("Total CPF:", results.totalCPF);