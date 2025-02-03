import mongoose from "mongoose";

const ingredientSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, default: null },
        nutritionalInfo: {
            carbohydrates: { type: Number, default: 0 },
            proteins: { type: Number, default: 0 },
            fats: { type: Number, default: 0 },
            calories: { type: Number, default: 0 },
        },
        price: { type: Number, default: 0 }, // Price per unit
        unit: { type: String },
        quantity: { type: Number }, // Quantifiable amount
        brands: { type: String },
        availability: {
            type: String,
            enum: ['inStock', 'outOfStock'],
        },
        mealType: { type: [String], default: ['Breakfast'] },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;
