import type { UsuarioInput } from "../interfaces/usuarios.type.js";
import type { Request, Response } from "express"
import { UsuarioService } from "../services/usuarios.service.js";

export class UsuarioController {
    static async adicionarUsuario(
        req: Request<{}, {}, UsuarioInput>,
        res: Response
    ): Promise<Response> {
        try {
            if(!req.body.nombre) {
            return res.status(409).json({
                message: "debe indicar un Nombre"
            });
            }
            if(!req.body.email) {
                return res.status(409).json({
                    message: "debe indicar un Email"
                });
            }
            if(!req.body.password) {
                return res.status(409).json({
                    message: "debe indicar un Password"
                });
            }
            if(!req.body.perfil) {
                return res.status(409).json({
                    message: "debe indicar un Rol"
                });
            }

            const input: UsuarioInput = {
                nombre: String(req.body.nombre).trim(),
                email: String(req.body.email).trim(),
                password: String(req.body.password).trim(),
                perfil: String(req.body.perfil).trim()
            };
            const resultado = await UsuarioService.addUsuario(input);
            if(!resultado){
                return res.status(404).json({
                    message: "El usuario no pudo ser adicionado a la BD."
                })
            }
            return res.status(200).json({
                message: 'Usuario Adicionado con Exito a la BD.'
            })
        } catch (err) {
            console.log(err);
            if (err instanceof Error) {
                return res.status(404).json({
                    message: err.message
                })
            }
            return res.status(500).json({
                message: "Error en el Servidor."
            })
        }
    }

    static async ObtenerUsuarios(
        req: Request,
        res: Response
    ): Promise<Response> {
        try {
            const usuarios = await UsuarioService.getUsuarios();
            return res.status(200).json(usuarios);
        } catch(err) {
            console.log(err)
            return res.status(500).json({
                message: 'Error en el Sevidor.'
            })
        }
        
    }
}