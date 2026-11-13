import type { Usuario, UsuarioInput, UsuarioPublico, UsuarioRol } from "../interfaces/usuarios.type.js";
import type { PerfilesModel } from "../models/perfiles.model.js";
import { UsuarioModel } from "../models/usuarios.model.js";
import { ValidaCampos } from "../utils/validaciones.utils.js";
import { BaseService } from "./base.service.js";
import bcrypt from 'bcrypt'

export class UsuariosService extends BaseService<Usuario, UsuarioInput, UsuarioModel> {
    constructor(
        model: UsuarioModel, 
        private readonly perfilModel: PerfilesModel
    ){
        super(model)
    }

    override async create(input: UsuarioInput): Promise<boolean> {
        const validaPass = ValidaCampos.passVal(input.password);
        const validaNombre = ValidaCampos.nomVal(input.nombre);
        const validaEmail = ValidaCampos.emailVal(input.email);
        if (!validaEmail.estado) {
            throw new Error(validaEmail.error);
        }
        if (!validaPass.estado) {
            throw new Error(validaPass.error);
        }
        if (!validaNombre.estado) {
            throw new Error(validaNombre.error);
        }
        const perfilExciste = await this.perfilModel.getById(input.perfil);
        if (perfilExciste === null) {
            throw new Error ("El Perfil indicado no existe.")
        }
        const usuarioExiste = await this.getByEmail(input.email);
        if (usuarioExiste !== null) {
            throw new Error ('El email ya existe en la BD.');
        }
        const passHash = await bcrypt.hash(input.password, 10);
        const usuario: UsuarioInput = {
            ...input,
            password: passHash
        };
        return super.create(usuario);
    }

    override async update(id: string, input: UsuarioInput): Promise<boolean> {
        const existeUsuario =  await this.model.getById(id);
        if (existeUsuario === null) {
            throw new Error('Usuario no existe en la BD.');
        }
        const validaPass = ValidaCampos.passVal(input.password);
        const validaNombre = ValidaCampos.nomVal(input.nombre);
        const validaEmail = ValidaCampos.emailVal(input.email);
        if (!validaEmail.estado) {
            throw new Error(validaEmail.error);
        }
        if (!validaPass.estado) {
            throw new Error(validaPass.error);
        }
        if (!validaNombre.estado) {
            throw new Error(validaNombre.error);
        }
        const passHash = await bcrypt.hash(input.password, 10);
        const usuario: UsuarioInput = {
            ...input,
            password: passHash
        }
        return super.update(id, usuario);
    }

    async getByEmail(email: string): Promise<Usuario | null> {
        const validaEmail = ValidaCampos.emailVal(email);
        if (!validaEmail.estado) {
            throw new Error(validaEmail.error);
        }
        return this.model.getByEmail(email);
    }

    async getAllUsuarioPublico(): Promise<UsuarioRol[]> {
        const usuarios = await this.model.getAllUsuarioPublico();
        return usuarios;
    }

    async getUsuarioPublicoById(id: string): Promise<UsuarioRol | null> {
        const usuario = await this.model.getUsuarioPublicoByID(id);
        return usuario ?? null;
    }
}
