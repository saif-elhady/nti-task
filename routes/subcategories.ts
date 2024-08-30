import { Router } from 'express';
import { createSubCategory, getSubCategory, getsubCategories, updateSubCategory, deleteSubCategory, filterData } from '../controllers/subCategories';
import { createSubcategoryValidator, deleteSubcategoryValidator, getSubcategoryValidator, updateSubcategoryValidator } from '../utils/validation/subcategoriesValidator';
import { allowedTo, checkActive, protectRoutes } from "../controllers/auth";

const SubCategoriesRouter: Router = Router({ mergeParams: true });

SubCategoriesRouter.route('/')
    .get(filterData, getsubCategories)
    .post(protectRoutes, checkActive, allowedTo('manager', 'admin'), createSubcategoryValidator, createSubCategory);
SubCategoriesRouter.route('/:id')
    .get(getSubcategoryValidator, getSubCategory)
    .put(protectRoutes, checkActive, allowedTo('manager', 'admin'), updateSubcategoryValidator, updateSubCategory)
    .delete(protectRoutes, checkActive, allowedTo('manager', 'admin'), deleteSubcategoryValidator, deleteSubCategory);

export default SubCategoriesRouter;
