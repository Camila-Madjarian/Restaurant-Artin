// Importaciones de las dependencias
import express from "express";

// Fix pra __dirname
import path from 'path';
import {fileURLToPath} from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Autenticacion
import {methods as authentication} from "./controllers/authentication.controller.js";

// Autorizacion
import {methods as authorization} from "./middlewares/authorization.js";

// Server
const app = express();
app.set("port", 3000);
app.listen(app.get("port"));
console.log("Hola Julio Cesar, Servidor corriendo en puerto", app.get("port"));

// Configuracion
app.use(express.static(__dirname + "/public"));
app.use(express.json());

// Rutas
app.get("/", authorization.soloPublico, (req,res) => res.sendFile(__dirname + "/pages/login.html"));
app.get("/register", authorization.soloPublico, (req,res) => res.sendFile(__dirname + "/pages/register.html"));
app.get("/admin", authorization.soloAdmin, (req,res) => res.sendFile(__dirname + "/pages/admin/admin.html"));
app.post("/api/login",authentication.login);
app.post("/api/register",authentication.register);