import { Router } from "express";
import { PerfilesController } from "../controllers/perfiles.controller.js";
import { RubrosModel } from "../models/rubros.model.js";
import { RubrosService } from "../services/rubros.service.js";
import { RubrosController } from "../controllers/rubros.controller.js";
import { PerfilesModel } from "../models/perfiles.model.js";
import { PerfilesService } from "../services/perfiles.service.js";
import { UsuarioModel } from "../models/usuarios.model.js";
import { UsuariosService } from "../services/usuarios.service.js";
import { UsuariosController } from "../controllers/usuario.controller.js";

export const finanzasRoute = Router();

//Instancias para Rubro
const rubrosModel = new RubrosModel();
const rubrosService = new RubrosService(rubrosModel);
const rubrosController = new RubrosController(rubrosService);

//Instacias para Roles
const perfilesModel = new PerfilesModel();
const perfilesService = new PerfilesService(perfilesModel);
const perfilesController = new PerfilesController(perfilesService);

//intsnacia Usuarios
const usuarioModel = new UsuarioModel();
const usuarioService = new UsuariosService(usuarioModel, perfilesModel);
const usuarioController = new UsuariosController(usuarioService);

//Perfiles
finanzasRoute.get('/perfiles', perfilesController.obtenerPerfiles);

//usuarios
finanzasRoute.post('/usuarios', usuarioController.crearUsuario);
finanzasRoute.patch('/usuarios/:id', usuarioController.actualizarUSuario);
finanzasRoute.get('/usuarios', usuarioController.obtenerUsuarios);
finanzasRoute.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);
finanzasRoute.delete('/usuarios/:id', usuarioController.eliminarUsuario);

//Rubros (implementacion con instancias)
finanzasRoute.get('/rubros', rubrosController.obtenerRubros);
finanzasRoute.get('/rubros/:id', rubrosController.obtenerRubrosPorId);
finanzasRoute.delete('/rubros/:id', rubrosController.eliminarRubro);
finanzasRoute.post('/rubros', rubrosController.adicionarRubro);
finanzasRoute.patch('/rubros/:id', rubrosController.actualizarRubro);