import type { Pool, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import type { crudRepository, SqlValue } from "../interfaces/crud.type.js";

export class BaseModel<T extends RowDataPacket, TInput extends object> implements crudRepository<T, TInput>{
    constructor (
        protected readonly db: Pool,
        protected readonly tabla: string,
        protected readonly columnas: readonly (keyof TInput & string)[]
    ) {
         // Solo permitimos identificadores SQL sencillos.
        const identificador = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

        if (!identificador.test(tabla) ||
            columnas.some(col => !identificador.test(col))) {
            throw new Error("Identificador SQL no válido");
        }
    }

    private obtenerValores(
    input: Partial<TInput>,
    columnas: readonly (keyof TInput & string)[]
    ): SqlValue[] {

        return columnas.map(columna => {
            const valor: unknown = input[columna];

            if (
                valor === null ||
                typeof valor === "string" ||
                typeof valor === "number" ||
                typeof valor === "boolean" ||
                valor instanceof Date ||
                Buffer.isBuffer(valor)
            ) {
                return valor;
            }

            throw new Error(`Valor no válido para ${columna}`);
        });
    }

    async create(input: TInput): Promise<boolean> {
        const columnas = this.columnas.filter(
            col => Object.prototype.hasOwnProperty.call(input, col)
        );

        columnas.forEach((item) => {
            console.log('CAMPOS REQUERIDOS: ', item);
        });

        if (columnas.length === 0) {
            throw new Error("No hay campos para insertar");
        }

        const campos = columnas.map(col => `\`${col}\``).join(", ");
        const placeholders = columnas.map(() => "?").join(", ");
        const valores = this.obtenerValores(input, columnas)

        const sql = `
            INSERT INTO \`${this.tabla}\` (${campos})
            VALUES (${placeholders})
        `;

        const [result] = await this.db.execute<ResultSetHeader>(sql, valores);

        return result.affectedRows === 1;
    }

    async update(id: string, input: TInput): Promise<boolean> {
        const columnas = this.columnas.filter(
            col => Object.prototype.hasOwnProperty.call(input, col)
        );

        if (columnas.length === 0) {
            throw new Error("No hay campos para actualizar");
        }

        const campos = columnas
            .map(col => `\`${col}\` = ?`)
            .join(", ");

        const valores = this.obtenerValores(input, columnas);

        const sql = `
            UPDATE \`${this.tabla}\`
            SET ${campos}
            WHERE id = ?
        `;

        const [result] = await this.db.execute<ResultSetHeader>(
            sql,
            [...valores, id]
        );

        return result.affectedRows === 1;
    }

    async getAll(): Promise<T[]> {
        const sql = `SELECT * FROM \`${this.tabla}\``;
        const [rows] = await this.db.execute<T[]>(sql);
        return rows;
    }

    async getById(id: string): Promise<T | null> {
        const sql = `SELECT * FROM \`${this.tabla}\` WHERE id = ?`;
        const [rows] = await this.db.execute<T[]>(sql, id);
        return rows[0] ?? null;
    }

    async delete(id: string): Promise<boolean> {
        const sql = `DELETE FROM \`${this.tabla}\` WHERE id = ?`;
        const [result] = await this.db.execute<ResultSetHeader>(sql, id);
        return result.affectedRows === 1;
    }
    
}