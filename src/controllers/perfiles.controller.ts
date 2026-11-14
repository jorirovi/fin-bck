import type { PerfilesService } from "../services/perfiles.service.js";
import type { Request, Response } from "express";

export class PerfilesController {
    constructor(
        private readonly perfilesService: PerfilesService
    ){}

    obtenerPerfiles = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            const perfiles = await this.perfilesService.getAll();
            return res.status(200).json(perfiles);
        } catch (err) {
            console.log(err);
            if(err instanceof Error) {
                return res.status(404).json({
                    message: err.message
                });
            }
            return res.status(500).json({
                message: 'Error en el Servidor'
            });
        }
    }
}