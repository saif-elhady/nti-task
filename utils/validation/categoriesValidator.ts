import { RequestHandler } from 'express';
import validatorMiddleware from '../../middlewares/validatorMiddleware';
import { param, body, check } from 'express-validator';
import SubCategory from '../../models/subCategories';
import { SubCategories } from '../../interfaces/subCategories';
import subCategoriesModel from '../../models/subCategories';

export const createCategoryValidator: RequestHandler[] = [check('name').notEmpty().withMessage('Category name is required').isLength({ min: 2, max: 50 }), validatorMiddleware];

export const updateCategoryValidator: RequestHandler[] = [check('name').notEmpty().withMessage('category name is required'), validatorMiddleware];

export const getCategoryValidator: RequestHandler[] = [check('id').isMongoId().withMessage('Invalid ID format'), validatorMiddleware];
export const deleteCategoryValidator: RequestHandler[] = [
    param('id')
        .isMongoId()
        .withMessage('wrong Id')
        .custom(async (val) => {
            const subcategories = await SubCategory.find({ category: val });
            if (subcategories.length) {
                subcategories.map(async (subcatrgory: SubCategories) => {
                    await subCategoriesModel.findByIdAndDelete(subcatrgory._id);
                });
                const bulkOption = subcategories.map((subcategory: SubCategories) => ({
                    deleteOne: { filter: { _id: subcategory._id } },
                }));
                await subCategoriesModel.bulkWrite(bulkOption);
            }
        }),
    validatorMiddleware,
];
