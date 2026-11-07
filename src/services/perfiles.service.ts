import type { PerfilDB, PerfilRow } from "../interfaces/perfiles.type.js";
import type { PerfilesModel } from "../models/perfiles.model.js";
import { BaseService } from "./base.service.js";

export class PerfilesService extends BaseService<PerfilRow, PerfilDB> {
    constructor (model: PerfilesModel){
        super(model);
    }
}