import type { RubrosId, RubrosInput } from "../interfaces/rubros.type.js";
import type { RubrosService } from "../services/rubros.service.js";
import type { Request, Response } from "express";
export class RubrosController {
    constructor(
        private readonly rubrosService: RubrosService
    ) {}

    obtenerRubros = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const rubros = await this.rubrosService.getAll();
            res.status(200).json(rubros);
        } catch (err){
            console.log(err)
            res.status(500).json({
                message: "Error al Obtener Rubros."
            })
        }
    }

    obtenerRubrosPorId = async (
        req: Request<RubrosId>,
        res: Response
    ): Promise<void> => {
        try {
            const id = req.params.id;
            const rubro = await this.rubrosService.getById(id);
            res.status(200).json(rubro)
        } catch (err) {
            console.log(err) 
            if(err instanceof Error) {
                res.status(404).json({
                    message: err.message
                });
            }
            res.status(500).json({
                message: "Error en el Servidor"
            })
        }
    }

    eliminarRubro = async(
        req: Request<RubrosId>,
        res: Response 
    ): Promise<void> => {
        try {
            const id = req.params.id;
            const resultado = await this.rubrosService.delete(id);
            if (!resultado) {
                res.status(404).json({
                    message: 'No se pudo eliminar el Rubro'
                });
            }
            res.status(200).json({
                message: 'Rubro Eliminado de la BD.'
            })
        } catch (err) {
            console.log(err);
            if (err instanceof Error) {
                res.status(404).json({
                    message: err.message
                });
            }
            res.status(500).json({
                message: 'Error en el servidor'
            });
        }
    }

    adicionarRubro = async (
        req: Request<{}, {}, RubrosInput>,
        res: Response
    ): Promise<void> => {
        try {
            const { nombre } = req.body;

            if (
                typeof nombre !== "string" ||
                nombre.trim() === ""
            ) {
                res.status(400).json({
                    message: "El nombre es obligatorio"
                });
                return;
            }

            const creado = await this.rubrosService.create({
                nombre: nombre.trim()
            });

            if (!creado) {
                res.status(500).json({
                    message: "No se pudo crear el rubro"
                });
                return;
            }

            res.status(201).json({
                message: "Rubro creado correctamente"
            });

        } catch (error) {
            res.status(500).json({
                message: "Error al crear el rubro"
            });
        }
    }

    actualizarRubro = async (
        req: Request<RubrosId, {}, RubrosInput>,
        res: Response
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const { nombre } = req.body;

            if (
                nombre !== undefined &&
                (typeof nombre !== "string" || nombre.trim() === "")
            ) {
                res.status(400).json({
                    message: "El nombre no es válido"
                });
                return;
            }

            if (nombre === undefined) {
                res.status(400).json({
                    message: "No se enviaron campos para actualizar"
                });
                return;
            }

            const actualizado = await this.rubrosService.update(
                id,
                { nombre: nombre.trim() }
            );

            if (!actualizado) {
                res.status(404).json({
                    message: "Rubro no encontrado o sin cambios"
                });
                return;
            }

            res.status(200).json({
                message: "Rubro actualizado correctamente"
            });

        } catch (error) {
            res.status(500).json({
                message: "Error al actualizar el rubro"
            });
        }
    }
}