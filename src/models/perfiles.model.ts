import { pool } from "../configs/connectDB.js";
import type { PerfilDB, PerfilRow } from "../interfaces/perfiles.type.js";
import { BaseModel } from "./base.model.js";

export class PerfilesModel extends BaseModel<PerfilRow, PerfilDB>{
    constructor(){
        super(pool, 'perfiles', ["nombre"])
    }
}