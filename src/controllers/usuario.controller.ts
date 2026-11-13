import type { usuarioId, UsuarioInput, UsuarioPublico } from "../interfaces/usuarios.type.js";
import type { UsuariosService } from "../services/usuarios.service.js";
import type { Request, Response } from 'express';

export class UsuariosController {
    constructor(
        private readonly usuariosService: UsuariosService
    ){}

    crearUsuario = async (
        req: Request<{}, {}, UsuarioInput>,
        res: Response
    ): Promise<Response> => {
        try {
            if (!req.body.nombre) {
                return res.status(400).json({
                    message: 'Debe indicar un nombre.'
                });
            }
            if (!req.body.email) {
                return res.status(400).json({
                    message: 'Debe indicar un email.'
                });
            }
            if(!req.body.password){
                return res.status(400).json({
                    message: 'Debe indicar un password.'
                });
            }
            if (!req.body.perfil) {
                return res.status(400).json({
                    message: 'Debe indicar un Rol'
                })
            }
            const input: UsuarioInput = {
                nombre: String(req.body.nombre).trim(),
                email: String(req.body.email).trim(),
                password: String(req.body.password).trim(),
                perfil: String(req.body.perfil).trim()
            }   
            const resultado = await this.usuariosService.create(input);
            if(!resultado){
                return res.status(400).json({
                    message: 'El usario no pudo ser creado en BD.'
                });
            }
            return res.status(201).json({
                message: 'Usuario Creado con Exito en la BD.'
            })
        } catch (err) {
            console.log(err);
            if (err instanceof Error) {
                return res.status(404).json({
                    message: err.message
                });
            }
            return res.status(500).json({
                message: "Error en el Servicor."
            });
        }
    }

    actualizarUSuario = async (
        req: Request<usuarioId, {}, UsuarioInput>,
        res: Response
    ): Promise<Response> => {
        try {
            if(!req.params.id){
                return res.status(400).json({
                    message: 'Debe indicar un usuario'
                });
            }
            const id = String(req.params.id).trim();
            if (!req.body.nombre) {
                return res.status(400).json({
                    message: 'Debe indicar un nombre.'
                });
            }
            if (!req.body.email) {
                return res.status(400).json({
                    message: 'Debe indicar un email.'
                });
            }
            if(!req.body.password){
                return res.status(400).json({
                    message: 'Debe indicar un password.'
                });
            }
            if (!req.body.perfil) {
                return res.status(400).json({
                    message: 'Debe indicar un Rol'
                })
            }
            const input: UsuarioInput = {
                nombre: String(req.body.nombre).trim(),
                email: String(req.body.email).trim(),
                password: String(req.body.password).trim(),
                perfil: String(req.body.perfil).trim()
            }   
            const resultado = await this.usuariosService.update(id, input);
            if(!resultado) {
                return res.status(400).json({
                    message: 'El Usuario no se pudo Actualizar.'
                });
            }
            return res.status(200).json({
                message: 'Usuario actualizado con exito'
            })
        } catch (err) {
            console.log(err);
            if(err instanceof Error) {
                return res.status(400).json({
                    message: err.message
                });
            }
            return res.status(500).json({
                message: 'Error en el Servidor'
            });
        }
    }

    obtenerUsuarios = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            const usuarios = await this.usuariosService.getAllUsuarioPublico();
            return res.status(200).json(usuarios);
        } catch (err) {
            console.log(err);
            if (err instanceof Error) {
                return res.status(400).json({
                    message: err.message
                });
            }
            return res.status(500).json({
                message: "Error del servidor."
            })
        }
    }

    obtenerUsuarioPorId = async (
        req: Request<usuarioId>,
        res: Response
    ): Promise<Response> => {
        try {
            if (!req.params.id) {
                return res.status(400).json({
                    mesaage: 'Debe indicar el id del usuario'
                });
            }
            const id = String(req.params.id).trim();
            const usuario = await this.usuariosService.getUsuarioPublicoById(id);
            return res.status(200).json(usuario);
        } catch (err) {
            console.log(err);
            if (err instanceof Error) {
                return res.status(400).json({
                    message: err.message
                });
            }
            return res.status(500).json({
                message: 'Error en el Servidor.'
            })
        }
    }

    eliminarUsuario = async (
        req: Request<usuarioId>,
        res: Response
    ): Promise<Response> => {
        try {
            if(!req.params.id) {
                return res.status(400).json({
                    message: 'Debe indicar el ID de un usuario'
                });
            }
            const id = String(req.params.id).trim();
            const resultado = await this.usuariosService.delete(id);
            if (!resultado) {
                return res.status(400).json({
                    message: 'El usuario no pudo ser eliinado de la BD'
                });
            }
            return res.status(200).json({
                message: 'Usuario Eliminado de la BD.'
            });
        } catch (err) {
            console.log(err);
            if(err instanceof Error) {
                return res.status(400).json({
                    message: err.message
                });
            }
            return res.status(500).json({
                message: 'Error en el Servidor.'
            })
        }
    }
}