import mongoose from 'mongoose';

let recipeSchema = mongoose.Schema({
    title: {type: String, required: true},
    tags: Array,
    description: String,
    timeConsume: String,
    energy: String,
    energyUnit: String,
    photo: String,
    ingrediences: [{
        ingredience: String,
        amount: String,
        unit: String
    }],
    userIds: []
});

const Recipe = mongoose.model('Recipe', recipeSchema)

export default Recipe
