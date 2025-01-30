import { GoogleGenerativeAI } from '@google/generative-ai';
import { normalizeIngredients } from './helper.js';
import { generateSystemPrompt, generateUserPrompt } from './prompt.js';
// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Define the response schema
const responseSchema = {
    "type": "object",
    "properties": {
        "mealType": {
            "type": "string",
            "description": "The meal type (e.g., Breakfast, Lunch, Dinner)"
        },
        "meals": {
            "type": "array",
            "description": "List of meal combinations for the specified meal type",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "The name or title of the meal"
                    },
                    "ingredients": {
                        "type": "array",
                        "description": "List of ingredients used in the meal",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name": {
                                    "type": "string",
                                    "description": "The name of the ingredient"
                                },
                                "quantity": {
                                    "type": "number",
                                    "description": "The quantity of the ingredient used"
                                },
                                "unit": {
                                    "type": "string",
                                    "description": "The unit of measurement for the ingredient (e.g., 'g', 'kg', 'unit', 'dozen')"
                                },
                                "state": {
                                    "type": "string",
                                    "enum": [
                                        "cooked",
                                        "uncooked"
                                    ],
                                    "description": "The state of the ingredient (cooked or uncooked)"
                                },
                                "macros": {
                                    "type": "object",
                                    "description": "Macro breakdown for the ingredient",
                                    "properties": {
                                        "protein": { "type": "number", "description": "Protein content in grams" },
                                        "fat": { "type": "number", "description": "Fat content in grams" },
                                        "carbs": { "type": "number", "description": "Carbohydrate content in grams" }
                                    },
                                    "required": ["protein", "fat", "carbs"]
                                }
                            },
                            "required": ["name", "quantity", "unit", "macros"]
                        }
                    },
                    "macros": {
                        "type": "object",
                        "description": "Total macro breakdown for the meal",
                        "properties": {
                            "protein": { "type": "number", "description": "Total protein content in grams" },
                            "fat": { "type": "number", "description": "Total fat content in grams" },
                            "carbs": { "type": "number", "description": "Total carbohydrate content in grams" }
                        },
                        "required": ["protein", "fat", "carbs"]
                    },
                    "cookingInstructions": {
                        "type": "array",
                        "description": "General cooking tips or instructions for the meal",
                        "items": {
                            "type": "string",
                            "description": "A single cooking tip or instruction"
                        }
                    }
                },
                "required": ["name", "ingredients", "macros", "cookingInstructions"]
            }
        }
    },
    "required": ["mealType", "meals"]
};

async function generateMeal(userInput) {
    try {
        const {
            dietType,
            macrosPerMeal,
            mealTypes,
            availableIngredients,
            restrictedIngredients,
            restrictedMeals,
            festivalCuisine,
            equipments
        } = userInput;

        const mealType = mealTypes[0]; // Single meal type

        const cpf = macrosPerMeal[mealType];
        const normalizeIngredient = normalizeIngredients(availableIngredients, mealType);

        const systemPrompt = generateSystemPrompt(
            dietType,
            mealType,
            normalizeIngredient,
            festivalCuisine,
            equipments,
            restrictedIngredients,
            restrictedMeals
        );

        console.log("systemPrompt", systemPrompt);

        const userPrompt = generateUserPrompt(dietType, mealType, cpf);

        console.log("userPrompt", userPrompt);

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: systemPrompt
        });

        const generationConfig = {
            temperature: 0.7,   // More balance (not too random, not too rigid)
            topP: 0.9,         // Keeps creativity but reduces randomness
            topK: 50,
            //maxOutputTokens: 8192,
            responseMimeType: "application/json",
            responseSchema: responseSchema
        }

        // const result = await model.generateContent({
        //     contents: [
        //         {
        //             role: 'user',
        //             parts: [
        //                 {
        //                     text: userPrompt,
        //                 }
        //             ],
        //         }
        //     ],
        //     generationConfig: generationConfig
        // });

        const chat = model.startChat({
            generationConfig,
            history: [],
        });

        let result = await chat.sendMessage(userPrompt);
        //console.log("result", result);
        const generatedMeals = JSON.parse(result.response.text());
        //console.log("generatedMeals", generatedMeals);
        return generatedMeals;
    } catch (error) {
        console.error("Error in macro analysis:", error);
        throw error;
    }
}

export {
    generateMeal
}


