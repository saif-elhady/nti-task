import { Request, Response, NextFunction } from 'express';
import SubCategory from '../models/subCategories';
import asyncHandler from 'express-async-handler';
import { SubCategories } from '../interfaces/subCategories';
import ApiErrors from '../utils/apiErrors';
import { FilterData } from '../interfaces/filterData';

export const filterData = (req: Request, res: Response, next: NextFunction) => {
    let filterData: FilterData = {};
    if (req.params.categoryId) filterData.category = req.params.categoryId;
    req.filterDate = filterData;
    next();
};

export const createSubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const subcategory: SubCategories = await SubCategory.create(req.body);
    res.status(201).json({ data: subcategory });
});

export const getsubCategories = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let filterData: FilterData = {};
    if (req.params.categoryId) filterData.category = req.params.categoryId;
    const subcategories = await SubCategory.find(filterData);
    res.status(200).json({ data: subcategories });
});

export const getSubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const subcategory = await SubCategory.findById(req.params.id);
    if (!subcategory) return next(new ApiErrors('subcategory not found', 404));
    res.status(200).json({ data: subcategory });
});

export const updateSubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const subcategory = await SubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subcategory) return next(new ApiErrors('subcategory not found', 404));
    res.status(200).json({ data: subcategory });
});

export const deleteSubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const subcategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subcategory) return next(new ApiErrors('subcategory not found', 404));
    res.status(204);
});
