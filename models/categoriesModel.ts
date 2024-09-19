import { Schema, model } from "mongoose";
import { Categories } from "../interfaces/categories";

const categoriesSchema: Schema = new Schema<Categories>({
  name: { type: String, required: true, trim: true, unique: true },
  image: String,
}, { timestamps: true });

// const imageUrl = (document: Categories) => {
//   if (document.image) {
//     const imageUrl: string = `${process.env.BASE_URL}/categories/${document.image}`;
//     document.image = imageUrl;
//   }
// }

// categoriesSchema
//   .post('init', (document: Categories) => { imageUrl(document) })
//   .post('save', (document: Categories) => { imageUrl(document) })

export default model<Categories>('categories', categoriesSchema)