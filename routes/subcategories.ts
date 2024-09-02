import { Router } from 'express';
import { createSubcategory, getSubcategory, getSubcategories, updateSubcategory, deleteSubcategory, filterData } from '../controllers/subCategories';
import { createSubcategoryValidator, deleteSubcategoryValidator, getSubcategoryValidator, updateSubcategoryValidator } from '../utils/validation/subcategoriesValidator';
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";

const SubCategoriesRouter: Router = Router({ mergeParams: true });

SubCategoriesRouter.route('/')
    .get(filterData, getSubcategories)
    .post(protectRoutes, checkActive, allowedTo('manager', 'admin'), createSubcategoryValidator, createSubcategory);
SubCategoriesRouter.route('/:id')
    .get(getSubcategoryValidator, getSubcategory)
    .put(protectRoutes, checkActive, allowedTo('manager', 'admin'), updateSubcategoryValidator, updateSubcategory)
    .delete(protectRoutes, checkActive, allowedTo('manager', 'admin'), deleteSubcategoryValidator, deleteSubcategory);

export default SubCategoriesRouter;
