import type { PerfilesService } from "../services/perfiles.service.js";
import type { Request, Response } from "express";

export class PerfilesController {
    constructor(
        private readonly perfilesService: PerfilesService
    ){}

    obtenerPerfiles = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const perfiles = await this.perfilesService.getAll();
            res.status(200).json(perfiles);
        } catch (err) {
            console.log(err);
            if(err instanceof Error) {
                res.status(404).json({
                    message: err.message
                });
            }
            res.status(500).json({
                message: 'Error en el Servidor'
            });
        }
    }
}