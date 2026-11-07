import { Router } from "express";
import { PerfilesController } from "../controllers/perfiles.controller.js";
import { UsuarioController } from "../controllers/usuario.controller.js";
import { RubrosModel } from "../models/rubros.model.js";
import { RubrosService } from "../services/rubros.service.js";
import { RubrosController } from "../controllers/rubros.controller.js";
import { PerfilesModel } from "../models/perfiles.model.js";
import { PerfilesService } from "../services/perfiles.service.js";

export const finanzasRoute = Router();

//Instancias para Rubro
const rubrosModel = new RubrosModel();
const rubrosService = new RubrosService(rubrosModel);
const rubrosController = new RubrosController(rubrosService);

//Instacias para Roles
const perfilesModel = new PerfilesModel();
const perfilesService = new PerfilesService(perfilesModel);
const perfilesController = new PerfilesController(perfilesService);

//Perfiles
finanzasRoute.get('/perfiles', perfilesController.obtenerPerfiles);

//usuarios
finanzasRoute.post('/usuarios', UsuarioController.adicionarUsuario);
finanzasRoute.get('/usuarios', UsuarioController.obtenerUsuarios);
finanzasRoute.get('/usuarios/:id', UsuarioController.obtenerUsuarioPorId);
finanzasRoute.patch('/usuarios/:id', UsuarioController.actualizarUsuario);
finanzasRoute.delete('/usuarios/:id', UsuarioController.eliminarUsuario);
finanzasRoute.patch('/usuarios/:email/password', UsuarioController.actualizaPassword);

//Rubros (implementacion con instancias)
finanzasRoute.get('/rubros', rubrosController.obtenerRubros);
finanzasRoute.get('/rubros/:id', rubrosController.obtenerRubrosPorId);
finanzasRoute.delete('/rubros/:id', rubrosController.eliminarRubro);
finanzasRoute.post('/rubros', rubrosController.adicionarRubro);
finanzasRoute.patch('/rubros/:id', rubrosController.actualizarRubro);