import type { ResultSetHeader } from "mysql2";
import { pool } from "../configs/connectDB.js";
import type { UsuarioActualizar, UsuarioAuth, UsuarioInput, UsuarioRow } from "../interfaces/usuarios.type.js";

export class UsuarioModel {
    static db = pool;

    static async addUsuario (input: UsuarioInput): Promise<boolean> {
        const {
            nombre,
            email,
            password,
            perfil
        } = input;
        const sqlQuery = `INSERT INTO usuarios (nombre, email, password, perfil)
                          VALUES (?, ?, ?, ?)`
        const addUsuario = await this.db.execute<ResultSetHeader>(sqlQuery, [nombre, email, password, perfil]);
        return addUsuario[0].affectedRows === 1;
    }

    static async getAllUsuarios(): Promise<UsuarioRow[]> {
        const sqlQuery = 'SELECT * FROM usuarios_rol';
        const usuarios = await this.db.execute<UsuarioRow[]>(sqlQuery);
        return usuarios[0]
    }

    static async getUsuarioByEmail(email: string): Promise<UsuarioAuth | null> {
        const sqlQuey = 'SELECT u.id, u.email, u.password FROM usuarios AS u WHERE u.email = ?';
        const [usuarioAuth] = await this.db.execute<UsuarioAuth[]>(sqlQuey, [email]);
        return usuarioAuth[0] ?? null;
    }

    static async getUsuarioById(id: string): Promise<UsuarioRow | null> {
        const sqlQuery = 'SELECT * FROM usuarios_rol AS u WHERE u.id = ?';
        const [usuario] = await this.db.execute<UsuarioRow[]>(sqlQuery, [id]);
        return usuario[0] ?? null;
    }

    static async UpdateUsuario(id: string, input: UsuarioActualizar): Promise<boolean> {
        const {
            nombre,
            email,
            perfil,
            fecha_modifica
        } = input
        const sqlQuery = `UPDATE usuarios AS u
                          SET 
                            u.nombre = ?,
                            u.email  = ?,
                            u.perfil = ?,
                            u.fecha_modifica = ?
                          WHERE u.id = ?`
        const usuarioActualizado = await this.db.execute<ResultSetHeader>(sqlQuery, [nombre, email, perfil, fecha_modifica, id]);
        return usuarioActualizado[0].affectedRows === 1
    }

    static async RemoveUsuario(id: string): Promise<boolean>{
        const sqlQuery = 'DELETE FROM usuarios AS u WHERE u.id = ?'
        const eliminaUsuario = await this.db.execute<ResultSetHeader>(sqlQuery, [id]);
        return eliminaUsuario[0].affectedRows === 1;
    }
}