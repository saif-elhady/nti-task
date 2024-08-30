import mongoose from 'mongoose';

const database = () => {
    mongoose
        .connect(process.env.DB!)
        .then(() => console.log('Connected to database'))
        .catch((err: Error) => console.log(err));
};

export default database;
