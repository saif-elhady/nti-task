import { model, Schema } from 'mongoose';
import { Products } from '../interfaces/products';

const ProductsSchema: Schema = new Schema<Products>(
    {
        name: { type: String, required: true, trim: true },
        description: { type: String, required: true, trim: true, minlength: 10, maxlength: 500 },
        price: { type: Number, required: true, min: 1, max: 1000000 },
        priceAfterDiscount: { type: Number, required: true, min: 1, max: 1000000 },
        quantity: { type: Number, default: 0, min: 0 },
        sold: { type: Number, default: 0 },
        cover: { type: String, default: '' },
        images: [String], 
        ratingAverage: { type: Number, min:0, max: 5 },
        ratingCount: { type: Number, default: 0, min: 0 },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
        subcategory: { type: Schema.Types.ObjectId, required: true, ref: 'SubCategory' },
    },
    { timestamps: true }
);
const imageUrl = (document: Products) => {
    if (document.cover) {
        const imageUrl: string = `${process.env.BASE_URL}/products/${document.cover}`;
        document.cover = imageUrl;
    }
    if (document.images) {
        const imageList: string[] = [];
        document.images.forEach(image => {
            const imageUrl: string = `${process.env.BASE_URL}/products/${image}`
            imageList.push(imageUrl);
        });
        document.images = imageList;
    }
}

ProductsSchema
    .post('init', (document: Products) => { imageUrl(document) })
    .post('save', (document: Products) => { imageUrl(document) })
const imageurl = (document: Products) => {
    if (document.cover) {
        const imageUrl = `${process.env.BASE_URl}/products`;
        document.cover = imageUrl;
    }
    if (document.images) {
        const imageList:string[] = [];
        document.images.forEach(image => {
            const imageUrl = `${process.env.BASE_URl}/products`;
            imageList.push(imageUrl);
        });
        document.images = imageList;
    }
}

ProductsSchema.post('init', (document: Products) => { imageurl(document) })
    .post('save', (document: Products) => { imageurl(document) });

ProductsSchema.pre<Products>(/^find/, function (next) {
    this.populate({
        path: 'category',
        select: 'name -_id',
    });
    next();
});

export default model<Products>('Products', ProductsSchema);
