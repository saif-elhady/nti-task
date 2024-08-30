import { Router } from 'express';
import { createProductsValidator, deleteProductsValidator, getProductsValidator } from '../utils/validation/productsValidator';
import { updateCategoryValidator } from '../utils/validation/categoriesValidator';
import { createProducts, deleteProduct, getProduct, getProducts, resizeImages, updateProduct, uploadProductImages } from "../controllers/products";
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";
const ProductsRouter: Router = Router();

ProductsRouter.route('/')
    .get(getProducts)
    .post(protectRoutes, checkActive, allowedTo('manager', 'admin'), uploadProductImages, resizeImages, createProductsValidator, createProducts);
ProductsRouter.route('/:id')
    .get(getProductsValidator, getProduct)
    .put(protectRoutes, checkActive, allowedTo('manager', 'admin'), createProductsValidator, updateProduct)
    .delete(protectRoutes, checkActive, allowedTo('manager', 'admin'), deleteProductsValidator, deleteProduct);
export default ProductsRouter;
