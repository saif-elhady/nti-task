import { Router } from 'express';
import { createProductValidator, deleteProductValidator, getProductValidator } from '../utils/validation/productsValidator';
import { updateCategoryValidator } from '../utils/validation/categoriesValidator';
import { createProducts, deleteProduct, getProduct, getProducts, resizeImages, updateProduct, uploadProductImages } from "../controllers/products";
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";
const ProductsRouter: Router = Router();

ProductsRouter.route('/')
    .get(getProducts)
    .post(protectRoutes, checkActive, allowedTo('manager', 'admin'), uploadProductImages, resizeImages, createProductValidator, createProducts);
ProductsRouter.route('/:id')
    .get(getProductValidator, getProduct)
    .put(protectRoutes, checkActive, allowedTo('manager', 'admin'), createProductValidator, updateProduct)
    .delete(protectRoutes, checkActive, allowedTo('manager', 'admin'), deleteProductValidator, deleteProduct);
export default ProductsRouter;
