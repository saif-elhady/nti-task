import Category from '../models/categories';
import { Categories } from '../interfaces/categories';
import { createOne, deleteOne, getAll, getOne, updateOne } from './refactorHandler';


export const createCategory = createOne<Categories>(Category);

export const getCategories = getAll<Categories>(Category,"Category");

export const getCategory = getOne<Categories>(Category);

export const updateCategory = updateOne<Categories>(Category);

export const deleteCategory = deleteOne<Categories>(Category);
