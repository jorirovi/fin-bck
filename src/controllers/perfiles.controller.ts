import type { Request, Response } from "express";
import type { PerfilDB, PerfilId } from "../interfaces/perfiles.type.js";
import { PerfilesService } from "../services/perfiles.service.js";

export class PerfilController {
    static async crearPerfil(
        req: Request<{}, {}, PerfilDB>,
        res: Response
    ): Promise<Response> {
        try {
            if (!req.body.nombre) {
                res.status(401).json({
                    message: 'No se han pasado un Perfil'
                });
            }
            const nombre = String(req.body.nombre).toLowerCase().trim();
            const resultado = await PerfilesService.addPerfil(nombre);
            if(!resultado) {
                return res.status(409).json({
                    message: "No se pudo adicionar el Perfil a la BD."
                });
            }
            return res.status(201).json({
                message: `Se adciono el perfil ${nombre} correctamete`
            });
        } catch (err) {
            console.log(err);
            if (err instanceof Error) {
                return res.status(400).json({
                    message: err.message
                })
            }
            return res.status(500).json({
                message: "Error en el Servidor"
            })
        }
    }
    
    static async ObtenerPerfiles(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const resultado = await PerfilesService.getPerfilesAll();
            return res.status(200).json(resultado)
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: "Error en el Servidor"
            });
        }
    }

    static async obtenerPerfilPorId (
        req: Request<PerfilId>,
        res: Response
    ): Promise<Response>{
        try {
            const id = String(req.params.id).trim();
            const perfil = await PerfilesService.getProfileById(id);
            return res.status(200).json(perfil);
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Error en el Servidor'
            })
        }
    }

    static async ActualizarPerfil(
        req: Request<PerfilId, {}, PerfilDB>,
        res: Response
    ): Promise<Response>{
        try {
            const id = String(req.params.id).trim();
            if(!req.body.nombre) {
                return res.status(200).json({
                    message: 'No hay un perfil para actualizar'
                })
            }
            const perfil = String(req.body.nombre).toLocaleLowerCase().trim();
            const resultado = await PerfilesService.updatePerfil(id, perfil);
            if (!resultado) {
                return res.status(401).json({
                    message: "no se pudo Actualizar el registro"
                })
            }
            return res.status(200).json({
                message: 'Perfil Actualizado correctamente'
            });
        } catch (err) {
            console.log(err);
            if (err instanceof Error) {
                return res.status(400).json({
                    message: err.message
                });
            }
            return res.status(500).json({
                message: 'Error en el Servidor'
            });
        }
    }

    static async eliminarPerfil(
        req: Request<PerfilId>,
        res: Response
    ): Promise<Response> {
        try {
            const id = String(req.params.id).trim();
            const resultado = await PerfilesService.removePerfil(id);
            if(!resultado){
                return res.status(401).json({
                    message: 'No se pudo eliminar el Perfil de la BD'
                })
            }
            return res.status(200).json({
                message: "Perfil Elimnado de la BD."
            })
        } catch (err) {
            console.log(err);
            if(err instanceof Error) {
                return res.status(401).json({
                    message: err.message
                })
            }
            return res.status(500).json({
                message: 'Error en el servidor'
            })
        }
        
    }
}