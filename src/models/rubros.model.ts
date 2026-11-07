import { pool } from "../configs/connectDB.js";
import type { Rubros, RubrosInput } from "../interfaces/rubros.type.js";
import { BaseModel } from "./base.model.js";

export class RubrosModel extends BaseModel<Rubros, RubrosInput>{
    constructor(){
        super(pool, 'rubro', ["nombre"])
    }
}