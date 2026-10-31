import type { Validaciones } from "../interfaces/errores.type.js";
import type { PerfilActualiza, PerfilRow } from "../interfaces/perfiles.type.js";
import { PerfilesModel } from "../models/perfiles.model.js";
import { ValidaCampos } from "../utils/validaciones.utils.js";


export class PerfilesService {
    static async addPerfil(perfil: string): Promise<boolean> {
        const nombre = perfil;
        const valPerfil: Validaciones = ValidaCampos.nomPerfilVal(nombre);
        if (!valPerfil.estado) {
            throw new Error (valPerfil.error);
        }
        const responder = await PerfilesModel.addPerfil(nombre);
        return responder;
    }

    static async getPerfilesAll(): Promise<PerfilRow[]> {
        const perfiles = await PerfilesModel.getAllPerfiles();
        return perfiles;
    }

    static async getProfileById(id: string): Promise<PerfilRow | null>{
        const perfil = await PerfilesModel.getPerfilById(id);
        return perfil ?? null;
    }

    static async updatePerfil(id: string, perfil: string): Promise<boolean> {
        const nombre = perfil;
        const valPerfil: Validaciones = ValidaCampos.nomPerfilVal(nombre);
        if(!valPerfil.estado) {
            throw new Error (valPerfil.error);
        }
        const valores: PerfilActualiza = {
            nombre: nombre,
            fecha_modifica: new Date()
        }
        const actualizacion = await PerfilesModel.updatePerfil(id, valores);
        return actualizacion;
    }

    static async removePerfil(id: string): Promise<boolean>{
        const perfil = await PerfilesModel.getPerfilById(id);
        if(perfil === null) {
            throw new Error ('El Perfil no existe en la BD');
        }
        const eliminar = await PerfilesModel.removePerfil(id);
        return eliminar;
    }
}