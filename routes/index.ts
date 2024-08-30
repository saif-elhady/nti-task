import * as all from '../interfaces';
import { Application, NextFunction, Request, Response } from 'express';
import CategoriesRouter from './categories';
import SubCategoriesRouter from './subcategories';
import ApiErrors from '../utils/apiErrors';
import globalError from '../middlewares/globalErrors';
import ProductsRouter from './products';
import usersRoute from './users';
import authRoute from './auth';

const mountRoutes = (app: Application): void => {
    app.use('/api/v1/categories', CategoriesRouter);
    app.use('/api/v1/subcategories', SubCategoriesRouter);
    app.use('/api/v1/products', ProductsRouter);
    app.use('/api/v1/users', usersRoute);
    app.use('/api/v1/auth', authRoute);
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        next(new ApiErrors(`The router ${req.originalUrl}`, 400));
    });
    app.use(globalError);
};

export default mountRoutes;
