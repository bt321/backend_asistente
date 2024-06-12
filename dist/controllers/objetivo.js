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
exports.updateObjetivo = exports.getObjetivo = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const objetivo_1 = require("../models/objetivo");
const getObjetivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autorización no válido' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    try {
        const objetivos = yield objetivo_1.Objetivo.findAll({ where: { username_usuarios: username } });
        console.log(objetivos);
        res.json(objetivos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener Objetivos' });
    }
});
exports.getObjetivo = getObjetivo;
const updateObjetivo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const datos = req.body;
    console.log(datos);
    const token = datos.token;
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    try {
        yield objetivo_1.Objetivo.update({
            tipo_objetivo: datos.data.tipo_objetivo,
            peso_actual: datos.data.peso_actual,
            peso_objetivo: datos.data.peso_objetivo
        }, {
            where: {
                username_usuarios: username
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
exports.updateObjetivo = updateObjetivo;
