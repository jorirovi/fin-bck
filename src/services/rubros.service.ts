import type { Rubros, RubrosInput } from "../interfaces/rubros.type.js";
import { RubrosModel } from "../models/rubros.model.js";
import { BaseService } from "./base.service.js";

export class RubrosService extends BaseService<Rubros, RubrosInput>{
    constructor(model: RubrosModel) {
        super(model);
    }
}