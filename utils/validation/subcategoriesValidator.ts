import { RequestHandler } from 'express';
import vaildatorMiddleware from '../../middlewares/validatorMiddleware';
import { param, body, check } from 'express-validator';
import Category from '../../models/categories';

export const createSubcategoryValidator: RequestHandler[] = [
    check('name').notEmpty().withMessage('Subcategory name is required').isLength({ min: 2, max: 50 }),
    check('category')
        .notEmpty()
        .withMessage('category  is required')
        .isMongoId()
        .withMessage('category is required')
        .custom(async (val) => {
            const category = await Category.findById(val);
            if (!category) throw new Error('Category not found');
            return true;
        }),
    vaildatorMiddleware,
];

export const updateSubcategoryValidator: RequestHandler[] = [check('name').optional(), check('category').optional().isMongoId().withMessage('category is required'), vaildatorMiddleware];

export const getSubcategoryValidator: RequestHandler[] = [param('id').isMongoId().withMessage('wrong Id'), vaildatorMiddleware];
export const deleteSubcategoryValidator: RequestHandler[] = [param('id').isMongoId().withMessage('wrong Id'), vaildatorMiddleware];
