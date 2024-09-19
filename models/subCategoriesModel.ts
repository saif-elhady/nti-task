import { Schema, model } from "mongoose";
import { SubCategories } from "../interfaces/subCategories";

const subCategoriesSchema: Schema = new Schema<SubCategories>({
  name: { type: String, required: true, trim: true },
  image: String,
  category: { type: Schema.Types.ObjectId, required: true, ref: 'categories' }
}, { timestamps: true });

// const imageUrl = (document: SubCategories) => {
//   if (document.image) {
//     const imageUrl: string = `${process.env.BASE_URL}/subcategories/${document.image}`;
//     document.image = imageUrl;
//   }
// }

// subCategoriesSchema
//   .post('init', (document: SubCategories) => { imageUrl(document) })
//   .post('save', (document: SubCategories) => { imageUrl(document) })

subCategoriesSchema.pre<SubCategories>(/^find/, function (next) {
  this.populate({ path: 'category', select: 'name' })
  next()
})

export default model<SubCategories>('subCategories', subCategoriesSchema)