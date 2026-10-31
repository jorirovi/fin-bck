import type { Validaciones } from "../interfaces/errores.type.js";
import type { UsuarioActualizar, UsuarioActulizarInput, UsuarioInput, UsuarioRow } from "../interfaces/usuarios.type.js";
import bcrypt from 'bcrypt'
import { ValidaCampos } from "../utils/validaciones.utils.js";
import { UsuarioModel } from "../models/usuarios.model.js";
import { PerfilesModel } from "../models/perfiles.model.js";

export class UsuarioService {
    static async addUsuario(input: UsuarioInput): Promise<boolean> {
        const passVal: Validaciones = ValidaCampos.passVal(input.password);
        const nomVal: Validaciones = ValidaCampos.nomPerfilVal(input.nombre);
        const emailVal: Validaciones = ValidaCampos.emailVal(input.email);
        if(!passVal.estado) {
            throw new Error(passVal.error)
        };
        if(!nomVal.estado) {
            throw new Error(nomVal.error)
        };
        if(!emailVal.estado){
            throw new Error(emailVal.error)
        };
        const usuarioExiste = await UsuarioModel.getUsuarioByEmail(input.email);
        if (usuarioExiste !== null) {
            throw new Error('Usuario ya existe en la bd')
        }
        const rolExiste = await PerfilesModel.getPerfilById(input.perfil);
        if (rolExiste === null){
            throw new Error('El Rol seleccionado no existe')
        }
        const passHash = await bcrypt.hash(input.password, 10);
        const usuario: UsuarioInput = {
            ...input,
            password: passHash
        }
        const crearUsuario = await UsuarioModel.addUsuario(usuario);
        return crearUsuario;
    }

    static async getUsuarios(): Promise<UsuarioRow[]> {
        const usuarios = await UsuarioModel.getAllUsuarios();
        return usuarios
    } 

    static async getUsuarioById(id: string): Promise<UsuarioRow | null> {
        if(!id){
            throw new Error ('No hay ID para buscar.');
        }
        const usuario = await UsuarioModel.getUsuarioById(id);
        return usuario ?? null
    }

    static async updateUsuario(id: string, input: UsuarioActulizarInput): Promise<boolean>{
        const nomVal: Validaciones = ValidaCampos.nomPerfilVal(input.nombre);
        const emailVal: Validaciones = ValidaCampos.emailVal(input.email);
        if(!nomVal.estado) {
            throw new Error(nomVal.error)
        };
        if(!emailVal.estado){
            throw new Error(emailVal.error)
        };
        const usuarioExiste = await UsuarioModel.getUsuarioByEmail(input.email);
        if (usuarioExiste !== null) {
            throw new Error('Usuario ya existe en la bd')
        }
        const rolExiste = await PerfilesModel.getPerfilById(input.perfil);
        if (rolExiste === null){
            throw new Error('El Rol seleccionado no existe')
        }
        const usuarioModificar: UsuarioActualizar = {
            ...input,
            fecha_modifica: new Date()
        }
        const usuarioModificado = await UsuarioModel.UpdateUsuario(id, usuarioModificar);
        return usuarioModificado;
    }

    static async removeUser(id: string): Promise<boolean>{
        const usuarioExiste = await UsuarioModel.getUsuarioById(id);
        if(usuarioExiste === null) {
            throw new Error ('Usuario no existe en la DB.');
        }
        const elminarUSuario = await UsuarioModel.RemoveUsuario(id);
        return elminarUSuario;
    }
}