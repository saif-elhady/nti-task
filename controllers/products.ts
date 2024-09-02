import { createOne, deleteOne, getAll, getOne, updateOne } from './refactorHandler';
import { NextFunction, Request, Response } from "express";
import { Products } from '../interfaces/products';
import Product from '../models/products';
import multer from 'multer';
import ApiErrors from '../utils/apiErrors';
import asyncHandler from 'express-async-handler';
import { uploadMultiImages } from "../middlewares/uploadImages";
import products from '../models/products';
import sharp from 'sharp';


const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        const fileName = `Product-${Date.now()}-cover.${ext}`;
        cb(null, fileName);
    },
});

const multerFilter = (req: Request, file: any, cb: any) => {
    if (file.mimetype.startsWith('image')) cb(null, true);
    else cb(new ApiErrors('Only images allowed', 400), false);
};

export const uploadProductImages = uploadMultiImages([
    { name: 'cover', maxCount: 1 },
    { name: 'images', maxCount: 5 }
])

export const resizeImages = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (req.files) {
    if (req.files.cover) {
        const coverName: string = `Product-${Date.now()}-cover.png`
        await sharp(req.files.cover[0].buffer)
        .toFormat('png')
        .png({ quality: 95 })
        .toFile(`uploads/products/${coverName}`)
        req.body.cover = coverName;
    }
    if (req.files.images) {
        req.body.images = [];
        req.files.images.map(async (img: any, index: number) => {
        const imageName: string = `Product-${Date.now()}N${index + 1}.png`;
        await sharp(img.buffer)
            .toFormat('png')
            .png({ quality: 95 })
            .toFile(`uploads/products/${imageName}`)
        req.body.images.push(imageName)
        })
    }
    }
    next()
})

export const createProducts = createOne<Products>(Product);

export const getProducts = getAll<Products>(Product, 'Product');

export const getProduct = getOne<Products>(Product);

export const updateProduct = updateOne<Products>(Product);

export const deleteProduct = deleteOne<Products>(Product);
