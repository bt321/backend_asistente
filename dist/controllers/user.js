"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDatosPersonales = exports.getDatosPersonales = exports.updateTipoEjer = exports.updateMusculos = exports.updateDescanso = exports.loginUser = exports.newUser = exports.comprobarUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const objetivo_1 = require("../models/objetivo");
const diasdescanso_1 = require("../models/diasdescanso");
const musculosentreno_1 = require("../models/musculosentreno");
const tipoejercicio_1 = require("../models/tipoejercicio");
//funcion para comprobar si el usuario ya esta registrado
const comprobarUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, nombre, apellidos, genero, altura, nivel_experiencia, dias_entreno } = req.body;
    //comprobamos que el usuario existe en la base de datos
    const user = yield user_1.User.findOne({ where: { username: username } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el mismo nombre ${username}`
        });
    }
    else {
        res.json({
            msg: `Usuario ${username} creado con exito`
        });
    }
});
exports.comprobarUser = comprobarUser;
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //const {username, password, nombre, apellidos, genero, altura, nivel_experiencia, dias_entreno, musculo_desarrollo} = req.body;
    const { datosPersonales, musculoentreno, objetivo, diasDescanso, tipoEjercicios } = req.body;
    //comprobamos que el usuario existe en la base de datos
    const user = yield user_1.User.findOne({ where: { username: datosPersonales.username } });
    if (user) {
        return res.status(400).json({
            msg: `Ya existe un usuario con el mismo nombre ${datosPersonales.username}`
        });
    }
    const hashPassword = yield bcrypt_1.default.hash(datosPersonales.password, 10);
    try {
        //guardamos el usuario dentro de la base de datos
        yield user_1.User.create({
            username: datosPersonales.username,
            nombre: datosPersonales.nombre,
            apellidos: datosPersonales.apellidos,
            password: hashPassword,
            email: datosPersonales.email,
            genero: datosPersonales.genero,
            altura: datosPersonales.altura,
            nivel_experiencia: datosPersonales.nivel_experiencia
        });
        yield objetivo_1.Objetivo.create({
            tipo_objetivo: objetivo.tipo_objetivo,
            peso_actual: objetivo.peso_actual,
            peso_objetivo: objetivo.peso_objetivo,
            username_usuarios: datosPersonales.username
        });
        yield musculosentreno_1.MusculosEntreno.create({
            musculo_desarrollo: musculoentreno.musculo_desarrollo,
            musculo_fuerte: musculoentreno.musculo_fuerte,
            otros_musculos: musculoentreno.otros_musculos,
            username_usuario: datosPersonales.username
        });
        yield diasdescanso_1.DiasDescanso.create({
            dias_semana: diasDescanso.dias_semana,
            username_usuario: datosPersonales.username
        });
        yield tipoejercicio_1.TipoEjercicio.create({
            tipoEjercicio: tipoEjercicios,
            username_usuario: datosPersonales.username
        });
        res.json({
            msg: `Usuario ${datosPersonales.username} creado con exito`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `ups ocurrio un error ${datosPersonales.username}`,
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //comprobamos que el usuario existe en la base de datos
    const user = yield user_1.User.findOne({ where: { username: username } });
    if (!user)
        return res.status(400).json({
            msg: `No existe un usuario con el nombre ${username} en la base de datos`
        });
    //validamos la contraseña
    const passwordvalid = yield bcrypt_1.default.compare(password, user.password);
    console.log(passwordvalid);
    if (!passwordvalid) {
        return res.status(400).json({
            msg: 'Contraseña incorrecta'
        });
    }
    //generamos token
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.SECRET_KEY || 'holamundo123');
    res.json(token);
});
exports.loginUser = loginUser;
const updateDescanso = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const datos = req.body;
    const token = datos.token;
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    try {
        yield diasdescanso_1.DiasDescanso.update({
            dias_semana: datos.dias_descanso
        }, {
            where: {
                username_usuario: username
            }
        });
        res.json({
            msg: `Usuario ${datos.username} creado con exito`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `ups ocurrio un error al actualizar dias de descanso ${datos.username}`,
            error
        });
    }
});
exports.updateDescanso = updateDescanso;
const updateMusculos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const datos = req.body;
    const token = datos.token;
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    console.log(username);
    try {
        yield musculosentreno_1.MusculosEntreno.update({
            musculo_desarrollo: datos.data.musculo_desarrollo,
            musculo_fuerte: datos.data.musculo_fuerte,
            otros_musculos: datos.data.otros_musculos
        }, {
            where: {
                username_usuario: username
            }
        });
        res.json({
            msg: `Usuario ${datos.username} creado con exito`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `ups ocurrio un error al actualizar dias de descanso ${datos.username}`,
            error
        });
    }
});
exports.updateMusculos = updateMusculos;
const updateTipoEjer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const datos = req.body;
    const token = datos.token;
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    console.log(username);
    console.log(datos);
    try {
        yield tipoejercicio_1.TipoEjercicio.update({
            tipoEjercicio: datos.data,
        }, {
            where: {
                username_usuario: username
            }
        });
        res.json({
            msg: `Usuario ${datos.username} creado con exito`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: `ups ocurrio un error al actualizar tipo de ejercicios ${datos.username}`,
            error
        });
    }
});
exports.updateTipoEjer = updateTipoEjer;
const getDatosPersonales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autorización no válido' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    try {
        const datosPersonales = yield user_1.User.findAll({ where: { username: username } });
        console.log(datosPersonales);
        res.json(datosPersonales);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener las rutinas' });
    }
});
exports.getDatosPersonales = getDatosPersonales;
const updateDatosPersonales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const datos = req.body;
    console.log(datos);
    const token = datos.token;
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    try {
        yield user_1.User.update({
            nombre: datos.data.nombre,
            apellidos: datos.data.apellidos,
            altura: datos.data.altura,
            genero: datos.data.genero,
            nivel_experiencia: datos.data.nivel_experiencia,
            email: datos.data.email
        }, {
            where: {
                username: username
            }
        });
        res.json({
            msg: `Usuario ${datos.username} creado con exito`
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener las rutinas' });
    }
});
exports.updateDatosPersonales = updateDatosPersonales;
