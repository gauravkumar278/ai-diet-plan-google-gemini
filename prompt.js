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

  return `You are a professional chef and expert nutritionist specializing in creating recipes for a meal plan company. Your goal is to generate delicious, nutritionally balanced meals according to user macros.
  
  **Constraints:**
  ${constraints.join('\n\n ')}
  
   **Ingredients:**
   - Select from the available **${dietType.toLowerCase()} ${mealType.toLowerCase()} ingredients** provided in the list.  // Dynamic dietType and mealType
   - Use only **uncooked ingredient quantities** in recipe calculations and add cooked or uncooked state.
   - Ingredients should be **diverse** across recipes (avoid overuse of one ingredient).

   **Macronutrient Matching:**
   - **Each ingredient macronutrient calculation need to use nutritionalInfo from specific ingredient and adjust ingredient quantity accordingly.
   - **Round CPF values to whole numbers** (No decimals).
   - Calculate **total macronutrients per serving** and display in the output.
   - **Strictly match the total macronutrient breakdown of the generated recipe to the user's required macros**
   - **Adjust ingredient quantities in the recipe to ensure total macronutrient breakdown of the recipe matches the user's required macros**

   **Cooking Instructions:**
   - Provide step-by-step cooking instructions, similar to those found in cookbooks.
   - **Avoid overly technical terms.**
   - Include precise ingredient measurements in grams or milliliters and provide uncooked quantities of each ingredient.
   - Break down complex steps into **manageable sub-steps**.

   **Recipe Output Format:**
   - Generate **5 different ${dietType.toLowerCase()} ${mealType.toLowerCase()} recipes**. // Dynamic dietType and mealType
   - **Diversity in recipes** (try to avoid avoid repeating similar ingredients in multiple recipes).
   - Use **different cooking methods** in each recipe.
   - Include **total macronutrient breakdown (Carbohydrates, Protein, Fat, Calories)**.
   - Include **each ingredient macronutrient breakdown (Carbohydrates, Protein, Fat, Calories)**.

** Your task is to generate 5 ${dietType.toLowerCase()} ${mealType.toLowerCase()} recipes based on these constraints and the user's macros request.**
  `;
}

const generateUserPrompt = (dietType, mealType, cpf) => {
  let prompt = `Generate 5 different delicious and palatable ${dietType} ${mealType} recipes for 1 person that meet the following criteria:\n\n`;

  prompt += `**Macronutrient Targets for ${mealType}**\n`;
  prompt += `\t- Carbohydrates: ${cpf.carbs}g\n`;
  prompt += `\t- Protein: ${cpf.protein}g\n`;
  prompt += `\t- Fat: ${cpf.fat}g\n\n`;

  prompt += "**Meal Requirements**\n";
  prompt += `\t- Use **only ${dietType.toLowerCase()} ingredients** from the provided list.\n\n`;

  prompt += "🔹 **Output Requirements**\n";
  prompt += `\t- Provide a **step-by-step cooking guide**.\n`;
  prompt += `\t- Specify **exact ingredient uncooked quantities (in grams/milliliters)**.\n`;
  prompt += `\t- Display the total macronutrient breakdown and calories of each dish you generate \n\n`;

  prompt += `**Your goal is to generate high-quality, well-balanced ${dietType} ${mealType} meals that are delicious!**`;  // Keep the target message

  return prompt;
};

export {
  generateSystemPrompt,
  generateUserPrompt
}