
const normalizeIngredients = (ingredients, mealType) => {
    const filteredIngredients = filterIngredientsByMealType(ingredients, mealType);
    const newIngredients = convertIngredientstoGORML(filteredIngredients);
    const ingredientsJSON = formatIngredients(newIngredients);
    return ingredientsJSON;
}

const formatIngredients = (normalizeIngredient) => {
    const ingredientJSON = JSON.stringify(
        normalizeIngredient.map((ingredient) => ({
            name: ingredient.name,
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            nutritionalInfo: ingredient.nutritionalInfo,
            price: ingredient.price,
            mealType: ingredient.mealType[0]
        }))
    );
    return ingredientJSON;
}

const convertIngredientstoGORML = (ingredients) => {
    return ingredients.map(item => {
        // Determine the multiplier based on the original unit
        let multiplier = 1;
        if (item.unit === "kg") {
            multiplier = 1000; // Convert kg to g
        } else if (item.unit === "l") {
            multiplier = 1000; // Convert liters to ml
        }

        // Normalize the ingredient
        const normalizedItem = { ...item };
        normalizedItem.unit = item.unit === "kg" || item.unit === "g" ? "g" : "ml";
        normalizedItem.quantity = item.quantity * multiplier;

        // Calculate price per unit
        normalizedItem.pricePerUnit = +(item.price / multiplier).toFixed(4);

        return normalizedItem;
    });
}

const filterIngredientsByMealType = (ingredients, mealType) => {
    /**
       * Filters ingredients based on the specified mealType.
       * 
       * @param {Array} ingredients - Array of ingredient objects.
       * @param {String} mealType - The meal type to filter by (e.g., "Breakfast", "Lunch/Dinner").
       * @returns {Array} - Array of filtered ingredients matching the mealType.
       */
    if (mealType == "Lunch" || "Dinner") {
        mealType = "Lunch/Dinner";
    }

    return ingredients.filter(ingredient =>
        ingredient.mealType && ingredient.mealType.includes(mealType)
    );
}

export {
    normalizeIngredients
}