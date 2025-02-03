import connectMongoDB from "./db/index.js";
import Ingredient from "./models/Ingredient.js";

const getIngredients = async (mealType) => {
    await connectMongoDB();
    if (mealType == "Lunch" || "Dinner") {
        mealType = "Lunch/Dinner";
    }
    const ingredientsList = await Ingredient.find({ mealType: { $in: [mealType] } }).lean();
    return ingredientsList;
}

export default getIngredients;



