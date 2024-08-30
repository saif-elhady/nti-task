import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import ApiErrors from '../utils/apiErrors';
import mongoose from 'mongoose';
import { FilterData } from '../interfaces/filterData';
import Features from '../utils/features';

export const getAll = <modelType>(model: mongoose.Model<any>, modelName: string) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        let filterData: FilterData = {};
        let searchLength: number = 0;
        if (req.filterDate) filterData = req.filterDate;
        if(req.query){
            const searchRessult: Features = new Features(model.find(filterData), req.query).filter().search(modelName);
            const searchData:modelType[] = await searchRessult.mongooseQuery ;
            searchLength=searchData.length
        }
        const countDocuments: number = searchLength||await model.find(filterData).countDocuments();
        const apiFeatures: Features = new Features(model.find(filterData), req.query).filter().sort().limitFields().search(modelName).pagination(countDocuments);
        const { mongooseQuery, paginationResult } = apiFeatures;
        const documents: modelType[] = await mongooseQuery;
        res.status(200).json({ length: documents.length, pagination: paginationResult, data: documents })
})
export const getOne = <modelType>(model: mongoose.Model<any>) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await model.findById(req.params.id);
        if (!doc) return next(new ApiErrors('Document not found', 404));
        res.status(200).json({ data: doc });
    });

export const createOne = <modelType>(model: mongoose.Model<any>) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const doc: modelType = await model.create(req.body);
        res.status(200).json({ data: doc });
    });

export const updateOne = <modelType>(model: mongoose.Model<any>) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!doc) return next(new ApiErrors('Document not found', 404));
        res.status(200).json({ data: doc });
    });

export const deleteOne = <modelType>(model: mongoose.Model<any>) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const doc = await model.findByIdAndDelete(req.params.id);
        if (!doc) return next(new ApiErrors('Document not found', 404));
        res.status(204).json({ data: doc });
    });
