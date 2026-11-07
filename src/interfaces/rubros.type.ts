import type { RowDataPacket } from "mysql2"

export interface Rubros extends RowDataPacket {
    id: string,
    nombre: string,
    fecha_creacion: Date,
    fecha_modifica: Date
}

export type RubrosInput = 
    Pick <
        Rubros,"nombre"
    >

export type RubrosId =
    Pick <
        Rubros, "id"
    >