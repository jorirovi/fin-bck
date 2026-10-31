import type { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../configs/connectDB.js";
import type { PerfilActualiza, PerfilRow } from "../interfaces/perfiles.type.js";

export class PerfilesModel {
    static db = pool;

    static async addPerfil(perfil: string): Promise<boolean> {
        const sqlQuery = "INSERT INTO perfiles (nombre) VALUES (?)";
        const [nuevoPerfil] = await this.db.execute<ResultSetHeader>(sqlQuery, [perfil]);
        return nuevoPerfil.affectedRows === 1;
    }

    static async getAllPerfiles(): Promise<PerfilRow[]> {
        const sqlQuery = "SELECT * FROM perfiles";
        const [perfiles] = await this.db.execute<PerfilRow[]>(sqlQuery);
        return perfiles
    }

    static async getPerfilById(id: string): Promise<PerfilRow | null> {
        const sqlQuery = "SELECT * FROM perdiales AS p WHERE p.id = ?";
        const [perfil] = await this.db.execute<PerfilRow[]>(sqlQuery, [id]);
        return perfil[0] ?? null;
    }

    static async updatePerfil(id: string, input: PerfilActualiza): Promise<boolean> {
        const sqlQuery = "UPDTAE perfiles AS p SET p.nombre = ?, p.fecha_modifica = ? WHERE p.id = ?";
        const perfilActualizado = await this.db.execute<ResultSetHeader>(sqlQuery,[input.nombre, input.fecha_modifica, id])
        return perfilActualizado[0].affectedRows === 1;
    }

    static async removePerfil(id: string): Promise<boolean>{
        const sqlQuery = "DELETE FROM perfiles AS p WHERE p.id = ?";
        const perfilRemovido = await this.db.execute<ResultSetHeader>(sqlQuery, [id]);
        return perfilRemovido[0].affectedRows === 1;
    }
}