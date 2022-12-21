import { Schema, model } from "mongoose";

const AnimalSchema = new Schema({
  name: { type: String, required: true },
  numberOfLegs: { type: Number, required: true },
  imageUrl: { type: String, required: false },
  rating: { type: Number, required: true },
  filterIds: { type: Array, required: false },
});

const Animal = model("Animal", AnimalSchema);

export default Animal;
