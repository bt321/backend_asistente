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
exports.getDatosUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const musculosentreno_1 = require("../models/musculosentreno");
const objetivo_1 = require("../models/objetivo");
const tipoejercicio_1 = require("../models/tipoejercicio");
const user_1 = require("../models/user");
const diasdescanso_1 = require("../models/diasdescanso");
const getDatosUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`aqui estoy :${req.headers.authorization}`);
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autorización no válido' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    console.log(`aqui estoy :${username}`);
    try {
        const MusculoEntreno = yield musculosentreno_1.MusculosEntreno.findAll({ where: { username_usuario: username } });
        console.log(MusculoEntreno);
        const tipoEjercicios = yield tipoejercicio_1.TipoEjercicio.findAll({ where: { username_usuario: username } });
        console.log(tipoEjercicios);
        const user = yield user_1.User.findAll({ where: { username: username } });
        console.log(user);
        const objetivos = yield objetivo_1.Objetivo.findAll({ where: { username_usuarios: username } });
        console.log(objetivos);
        const diasDescanso = yield diasdescanso_1.DiasDescanso.findAll({ where: { username_usuario: username } });
        console.log(diasDescanso);
        const DatosUser = {
            MusculoEntreno: MusculoEntreno,
            tipoEjercicios: tipoEjercicios,
            user: user,
            objetivos: objetivos,
            diasDescanso: diasDescanso
        };
        res.json(DatosUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener las rutinas' });
    }
});
exports.getDatosUser = getDatosUser;
