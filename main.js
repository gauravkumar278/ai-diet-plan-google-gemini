import 'dotenv/config';
import ingredients from "./ingredients.js"; // Import your ingredients.js file
import { generateMeal } from "./mealPlanner.js";
// Example user input
const userInput = {
    dietType: "Vegan",
    macrosPerMeal: {
        Lunch: { protein: 57, fat: 26, carbs: 76 },
    },
    availableIngredients: ingredients,
    restrictedIngredients: ["Pork", "Beef"],
    restrictedMeals: ["Smoothie", "Juice"],
    festivalCuisine: {
        enabled: false,
        festival: "Christmas",
        preferredCuisines: [],
    },
    mealTypes: ["Lunch"],
    equipments: [
        'Oven',
        'Stove top',
        'Hot Plate',
        'Air Fryer',
        'Grill',
        'Fryer',
        'Blender',
        'Food Processor',
        'Freezer',
        'Refrigerator',
        'Steamer'
    ]
};

// Run the analysis
(async () => {
    try {
        const result = await generateMeal(userInput);
        //console.log("result", result);
        console.log(JSON.stringify(result, null, 4));
    } catch (error) {
        console.error("Error analyzing macros:", error);
    }
})();