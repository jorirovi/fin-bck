import type { RowDataPacket } from "mysql2"
import type { Rol } from "./perfiles.type.js"

export interface Usuario {
    id: string,
    nombre: string,
    email: string,
    password: string,
    perfil: string,
    fecha_creacion: Date,
    fecha_modifica: Date
}

export type UsuarioPublico = 
    Pick <
        Usuario, "nombre" | "email"
    >

export type UsuarioInput = 
    Pick <
        Usuario, "nombre" | "email" | "password" | "perfil"
    >

export interface UsuarioRol extends UsuarioPublico {
    rol: Rol 
}

export interface usuarioId {
    id: string
}

export interface UsuarioRow extends UsuarioRol, RowDataPacket {}

export interface UsuarioAuth extends RowDataPacket {
    id: string,
    email: string,
    password: string
}

export type UsuarioActulizarInput = 
    Pick <
        Usuario, "nombre" | "email" | "perfil"
    >

export interface UsuarioActualizar extends UsuarioActulizarInput {
    fecha_modifica: Date
}

