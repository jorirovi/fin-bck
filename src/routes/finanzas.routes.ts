import { Router } from "express";
import { PerfilController } from "../controllers/perfiles.controller.js";
import { UsuarioController } from "../controllers/usuario.controller.js";

export const finanzasRoute = Router();

//Perfiles
finanzasRoute.post('/perfiles', PerfilController.crearPerfil);
finanzasRoute.get('/perfiles', PerfilController.ObtenerPerfiles);
finanzasRoute.get('/perfiles/:id', PerfilController.obtenerPerfilPorId);
finanzasRoute.patch('/perfiles/:id', PerfilController.ActualizarPerfil);
finanzasRoute.delete('/perfiles/:id', PerfilController.eliminarPerfil);

//usuarios
finanzasRoute.post('/usuarios', UsuarioController.adicionarUsuario);
finanzasRoute.get('/usuarios', UsuarioController.obtenerUsuarios);
finanzasRoute.get('/usuarios/:id', UsuarioController.obtenerUsuarioPorId);
finanzasRoute.patch('/usuarios/:id', UsuarioController.actualizarUsuario);
finanzasRoute.delete('/usuarios/:id', UsuarioController.eliminarUsuario);