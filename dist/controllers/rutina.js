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
exports.actualizarRutina = exports.getRutina = exports.generarRutina = void 0;
const express_1 = require("express");
const rutina_1 = require("../models/rutina");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const musculosentreno_1 = require("../models/musculosentreno");
const diasdescanso_1 = require("../models/diasdescanso");
const tipoejercicio_1 = require("../models/tipoejercicio");
const axios = require('axios');
const router = (0, express_1.Router)();
const datosRegistro = {
    datosPersonales: {},
    objetivo: {},
    diasDescanso: {},
    musculoentreno: {},
    musculo_desarrollo: '',
    parteFuerte: '',
    otrasPartes: '',
    tipoEjercicios: {}
};
const generarRutina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { datosPersonales, musculoentreno, objetivo, diasDescanso, tipoEjercicios } = req.body;
    const diasArray = diasDescanso.dias_semana.split(', ').map((dia) => dia.trim());
    const tipoEjercicioArray = tipoEjercicios.split(', ').map((tipo) => tipo.trim());
    const otrasPartesArray = musculoentreno.otros_musculos.split(', ').map((tipo) => tipo.trim());
    console.log(diasArray);
    console.log(tipoEjercicioArray);
    console.log('ESTOY AQUIIIIIIIIII');
    let dias_entreno = diasArray.length === 0 ? 7 : 7 - diasArray.length;
    const datosRutina = {
        parte_desarrollo: musculoentreno.musculo_desarrollo,
        parte_fuerte: musculoentreno.musculo_fuerte,
        otras_partes: otrasPartesArray,
        dias_entreno: dias_entreno,
        level: datosPersonales.nivel_experiencia,
        tipo_ejercicio: tipoEjercicioArray
    };
    console.log(datosRutina);
    try {
        const response = yield axios.post('http://127.0.0.1:5000/rutina', datosRutina);
        res.json(response.data);
        const rutinas = response.data;
        const dias_smn = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
        let dias_entreno = dias_smn.filter(dia => !diasArray.includes(dia));
        for (let i = 0; i < rutinas.length; i++) {
            const rutina = rutinas[i];
            const dia = dias_entreno[i];
            yield rutina_1.Rutina.create({
                username_usuario: datosPersonales.username,
                rutina_dia: rutina,
                dias_semana: dia
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'no se pudo acceder a flask' });
    }
});
exports.generarRutina = generarRutina;
const getRutina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`aqui estoy :${req.headers.authorization}`);
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autorización no válido' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    console.log(`aqui estoy :${username}`);
    try {
        const listRutina = yield rutina_1.Rutina.findAll({ where: { username_usuario: username } });
        console.log(listRutina);
        res.json(listRutina);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener las rutinas' });
    }
});
exports.getRutina = getRutina;
const actualizarRutina = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`aqui estoy :${req.headers.authorization}`);
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autorización no válido' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    console.log(`aqui estoy :${username}`);
    try {
        const parte_desarrollo = yield musculosentreno_1.MusculosEntreno.findAll({ attributes: ['musculo_desarrollo'], where: { username_usuario: username } });
        const musculo_fuerte = yield musculosentreno_1.MusculosEntreno.findAll({ attributes: ['musculo_fuerte'], where: { username_usuario: username } });
        const otros_musculos = yield musculosentreno_1.MusculosEntreno.findAll({ attributes: ['otros_musculos'], where: { username_usuario: username } });
        const diasDescanso = yield diasdescanso_1.DiasDescanso.findAll({ attributes: ['dias_semana'], where: { username_usuario: username } });
        const level = yield user_1.User.findAll({ attributes: ['nivel_experiencia'], where: { username: username } });
        const routine = yield rutina_1.Rutina.findAll({ attributes: ['rutina_id'], where: { username_usuario: username } });
        const tipoEjercicio = yield tipoejercicio_1.TipoEjercicio.findAll({ attributes: ['tipoEjercicio'], where: { username_usuario: username } });
        const diasDescanso2 = diasDescanso.map(diasDescanso => diasDescanso.dataValues.dias_semana).flatMap(dias => dias.split(', '));
        const tipoEjercicio2 = tipoEjercicio.map(tipoEjercicio => tipoEjercicio.dataValues.tipoEjercicio).flatMap(tipo => tipo.split(', '));
        const otraspartes2 = otros_musculos.map(otros_musculos => otros_musculos.dataValues.otros_musculos).flatMap(otro => otro.split(', '));
        const routine2 = routine.map(routine => routine.dataValues.rutina_id);
        let dias_entreno2 = diasDescanso2.length === 0 ? 7 : 7 - diasDescanso2.length;
        console.log(`Hola soy los dias de descanso: ${diasDescanso2}`);
        const datosRutina = {
            parte_desarrollo: parte_desarrollo.map(parte_desarrollo => parte_desarrollo.dataValues.musculo_desarrollo),
            parte_fuerte: musculo_fuerte.map(musculo_fuerte => musculo_fuerte.dataValues.musculo_fuerte),
            otras_partes: otraspartes2,
            dias_entreno: dias_entreno2,
            level: level.map(level => level.dataValues.nivel_experiencia),
            tipo_ejercicio: tipoEjercicio2
        };
        console.log(datosRutina);
        console.log(routine2);
        const response = yield axios.post('http://127.0.0.1:5000/rutinaActualizar', datosRutina);
        res.json(response.data);
        console.log(response.data);
        const rutinas = response.data;
        const dias_smn = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
        let dias_entreno = dias_smn.filter(dia => !diasDescanso2.includes(dia));
        console.log(dias_entreno);
        yield rutina_1.Rutina.destroy({
            where: { username_usuario: username }
        });
        for (let i = 0; i < rutinas.length; i++) {
            const rutina = rutinas[i];
            const dia = dias_entreno[i];
            const id = routine2[i];
            yield rutina_1.Rutina.create({
                rutina_dia: rutina,
                dias_semana: dia,
                username_usuario: username
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener las rutinas' });
    }
});
exports.actualizarRutina = actualizarRutina;
