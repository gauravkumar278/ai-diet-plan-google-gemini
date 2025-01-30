const generateSystemPrompt = (
  dietType,
  mealType,
  ingredientsJSON,
  festivalCuisine,
  equipment,
  restrictedIngredients,
  restrictedMeals
) => {
  const constraints = [];

  if (ingredientsJSON && ingredientsJSON.length > 0) {
    constraints.push(`* **Ingredients:** ${ingredientsJSON}`);
  }

  if (equipment && equipment.length > 0) {
    constraints.push(`* **Equipments Available::** ${equipment.join(', ')}`);
  }

  if (restrictedIngredients && restrictedIngredients.length > 0) {
    constraints.push(`* **Restricted Ingredients:** ${restrictedIngredients.join(', ')}`);
  }

  if (restrictedMeals && restrictedMeals.length > 0) {
    constraints.push(`* **Restricted Meals:** ${restrictedMeals.join(', ')}`);
  }

  if (festivalCuisine.enabled) {
    constraints.push(`* **Festival:** ${festivalCuisine.festival}`);
    if (festivalCuisine.preferredCuisines.length > 0) {
      constraints.push(`* **Preferred Cuisines:** ${festivalCuisine.preferredCuisines.join(', ')}`);
    }
    constraints.push(`* **Festival Theme:** Generate recipes appropriate for the ${festivalCuisine.festival} festival, using only the available ingredients.`);
  }

  return `You are a professional chef and nutritionist assistant specializing in creating recipes for a meal plan company. Given the following constraints.
  
  **Constraints:**
  ${constraints.join('\n ')}
  
   **Ingredients:**
   - Select from the available **${dietType.toLowerCase()} ${mealType.toLowerCase()} ingredients** provided in the list.  // Dynamic dietType and mealType
   - Use only **uncooked ingredient quantities** in recipe calculations and add cooked or uncooked state.
   - Ingredients should be **diverse** across recipes (avoid overuse of one ingredient).

   **Macronutrient Matching:**
   - **Strictly match CPF values within a ±2% margin**.
   - **Round CPF values to whole numbers** (No decimals).
   - Calculate **total macronutrients per serving** and display in the output.

   **Cooking Instructions:**
   - Use **simple, easy-to-follow steps** for home cooks.
   - **Avoid overly technical terms.**
   - Include **precise ingredient measurements** in grams or milliliters.
   - Provide **time estimates** for preparation and cooking.
   - Break down complex steps into **manageable sub-steps**.

   **Instructions Format:**
   - List all ingredients with quantities (grams or milliliters).
   - Use clear, step-by-step cooking instructions that include preparation, cooking, and serving steps.
   - Ensure each step is easy to follow for home cooks.
   - Mention specific cooking times for soaking, boiling, frying, or baking.
   - Add nutritional breakdown (carbs, protein, fat, calories) per serving.
   - Avoid unnecessary complexity - keep the steps short and precise.

   **Recipe Output Format:**
   - Generate **5 unique ${dietType.toLowerCase()} ${mealType.toLowerCase()} recipes**. // Dynamic dietType and mealType
   - **Diversity in recipes** (avoid repeating similar ingredients in multiple recipes).
   - Use **different cooking methods** in each recipe.
   - Include **total macronutrient breakdown (Carbohydrates, Protein, Fat, Calories)**.

** Your task is to generate 5 ${dietType.toLowerCase()} ${mealType.toLowerCase()} recipes based on these constraints and the user's CPF request.**
  `;
}

const generateUserPrompt = (dietType, mealType, cpf) => {
  let prompt = `Generate 5 unique ${dietType} ${mealType} recipes that meet the following criteria:\n\n`;

  prompt += "🔹 **Macronutrient Targets (Per Serving)**\n";
  prompt += `\t- Carbohydrates: ${cpf.carbs}g\n`;
  prompt += `\t- Protein: ${cpf.protein}g\n`;
  prompt += `\t- Fat: ${cpf.fat}g\n\n`;

  prompt += "🔹 **Meal Requirements**\n";
  prompt += `\t- Use **only ${dietType.toLowerCase()} ingredients** from the provided list.\n`;
  prompt += `\t- Recipes should be **diverse** (avoid using the same key ingredients in multiple recipes).\n`;
  prompt += `\t- **Strictly match macronutrient targets within a ±5% range**.\n`;
  prompt += `\t- Each recipe should be **for 1 serving**.\n\n`;

  // prompt += "🔹 **Cooking Preferences**\n";
  // prompt += `\t- Use **different cooking methods** across recipes (${cookingPreferences.join(', ')}).\n`; // Make dynamic
  // prompt += `\t- **Avoid overly complex techniques**—keep it simple and beginner-friendly.\n\n`;

  prompt += "🔹 **Output Requirements**\n";
  prompt += `\t- Provide a **step-by-step cooking guide**.\n`;
  prompt += `\t- Specify **exact ingredient quantities (in grams/milliliters)**.\n`;
  prompt += `\t- Include **estimated cooking time**.\n`;
  prompt += `\t- Display the **total macronutrient breakdown** per serving.\n\n`;

  prompt += `**Your goal is to generate high-quality, well-balanced ${dietType} ${mealType} meals that are easy to prepare!**`;  // Keep the target message

  return prompt;
};

export {
  generateSystemPrompt,
  generateUserPrompt
}