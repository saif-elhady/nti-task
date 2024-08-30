import { FilterData } from "./filterData";
import { Users } from "./users";

declare module "express"{
    interface Request{
        filterDate?: FilterData
        files?: any;
        user?: Users;
    }
}