import type { RowDataPacket } from "mysql2";

export interface PerfilDB {
    nombre: string;
}

export interface PerfilActualiza extends PerfilDB {
    fecha_modifica: Date
}

export interface PerfilCreado extends PerfilDB {
    id: string,
    fecha_creacion: Date,
    fecha_modifica: Date
}

export interface PerfilRow extends PerfilCreado, RowDataPacket {}

export type PerfilId = 
    Pick <
        PerfilCreado, "id"
    >

export interface Rol {
    id: string,
    nombre: string,
}