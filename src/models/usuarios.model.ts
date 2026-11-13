import { pool } from "../configs/connectDB.js"
import type {  Usuario, UsuarioInput, UsuarioRol } from "../interfaces/usuarios.type.js"
import { BaseModel } from "./base.model.js"

export class UsuarioModel extends BaseModel<Usuario, UsuarioInput> {
    constructor(){
        super(pool, 'usuarios', ["nombre", "email", "password", "perfil"])
    }

    async getByEmail(email: string): Promise<Usuario | null> {
        const sql = `
            SELECT *
            FROM usuarios
            WHERE email = ?
            LIMIT 1
        `;

        const [rows] = await this.db.execute<Usuario[]>(sql, [email]);
        return rows[0] ?? null;
    }

    async getAllUsuarioPublico(): Promise<UsuarioRol[]> {
        const sql = `
            SELECT *
            FROM usuarios_rol
        `;
        const [rows] = await this.db.execute<UsuarioRol[]>(sql);
        return rows;
    }

    async getUsuarioPublicoByID(id: string): Promise<UsuarioRol | null> {
        const sql = `
            SELECT *
            FROM usuarios_rol
            WHERE id = ?
            LIMIT 1
        `;
        const [rows] = await this.db.execute<UsuarioRol[]>(sql, [id]);
        return rows[0] ?? null
    }
}