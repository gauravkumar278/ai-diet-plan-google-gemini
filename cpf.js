import ingredients from "./ingredients.js"; // Import your ingredients.js file
import { convertIngredientstoGORML } from './helper.js';
function calculateCPF(stock, ingredientQuantities) {
    let result = [];
    let totalCPF = { carbohydrates: 0, proteins: 0, fats: 0, calories: 0 };

    ingredientQuantities.forEach(ingredient => {
        let stockItem = stock.find(item => item.name === ingredient.name);
        if (stockItem) {
            let factor = parseFloat(ingredient.quantity) / stockItem.quantity;

            let calculatedCPF = {
                name: ingredient.name,
                carbohydrates: Math.round(stockItem.nutritionalInfo.carbohydrates * factor),
                proteins: Math.round(stockItem.nutritionalInfo.proteins * factor),
                fats: Math.round(stockItem.nutritionalInfo.fats * factor),
                calories: Math.round(stockItem.nutritionalInfo.calories * factor)
            };

            totalCPF.carbohydrates += calculatedCPF.carbohydrates;
            totalCPF.proteins += calculatedCPF.proteins;
            totalCPF.fats += calculatedCPF.fats;
            totalCPF.calories += calculatedCPF.calories;

            result.push(calculatedCPF);
        }
    });

    return { ingredients: result, totalCPF };
}

const stock = convertIngredientstoGORML(ingredients);

const ingredientQuantities = [
    {
        "cooked_state": "uncooked",
        "name": "Penne Pasta",
        "nutritionalInfo": {
            "carbs": 55,
            "fat": 1,
            "protein": 10
        },
        "quantity": 100,
        "unit": "g"
    },
    {
        "cooked_state": "uncooked",
        "name": "Virgin Olive Oil",
        "nutritionalInfo": {
            "carbs": 0,
            "fat": 9,
            "protein": 0
        },
        "quantity": 10,
        "unit": "ml"
    },
    {
        "cooked_state": "uncooked",
        "name": "Zucchini",
        "nutritionalInfo": {
            "carbs": 3,
            "fat": 0,
            "protein": 1
        },
        "quantity": 100,
        "unit": "g"
    },
    {
        "cooked_state": "uncooked",
        "name": "Garlic",
        "nutritionalInfo": {
            "carbs": 3,
            "fat": 0,
            "protein": 1
        },
        "quantity": 10,
        "unit": "g"
    },
    {
        "cooked_state": "uncooked",
        "name": "Tofu",
        "nutritionalInfo": {
            "carbs": 1,
            "fat": 4,
            "protein": 7
        },
        "quantity": 100,
        "unit": "g"
    },
    {
        "cooked_state": "uncooked",
        "name": "Pesto Paste",
        "nutritionalInfo": {
            "carbs": 1,
            "fat": 6,
            "protein": 2
        },
        "quantity": 15,
        "unit": "g"
    }
];

console.log(calculateCPF(stock, ingredientQuantities));
