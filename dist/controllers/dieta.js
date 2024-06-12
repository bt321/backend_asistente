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
exports.actualizarDieta = exports.getDieta = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const objetivo_1 = require("../models/objetivo");
const dieta_1 = require("../models/dieta");
const getDieta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`aqui estoy :${req.headers.authorization}`);
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autorización no válido' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    const objetivos = yield objetivo_1.Objetivo.findAll({ attributes: ['tipo_objetivo'], where: { username_usuarios: username } });
    const tipo_objetivo = objetivos.map(objetivos => objetivos.dataValues.tipo_objetivo).flatMap(tipo => tipo.split(', '));
    //funcion para seleccionar 7 elementos de forma aleatoria
    function getRandomElements(sourceArray, count) {
        return sourceArray
            .sort(() => 0.5 - Math.random()) // Ordenar la lista aleatoriamente
            .slice(0, count); // Tomar los primeros 'count' elementos
    }
    try {
        const dietas_disponibles = yield dieta_1.Dieta.findAll({ where: { tipo_objetivo: tipo_objetivo } });
        //const listaDieta = getRandomElements(dietas_disponibles,7)
        console.log(dietas_disponibles);
        res.json(dietas_disponibles);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener las dietas' });
    }
});
exports.getDieta = getDieta;
const actualizarDieta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`aqui estoy :${req.headers.authorization}`);
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token de autorización no válido' });
    }
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    const objetivos = yield objetivo_1.Objetivo.findAll({ attributes: ['tipo_objetivo'], where: { username_usuarios: username } });
    const tipo_objetivo = objetivos.map(objetivos => objetivos.dataValues.tipo_objetivo).flatMap(tipo => tipo.split(', '));
    //funcion para seleccionar 7 elementos de forma aleatoria
    function getRandomElements(sourceArray, count) {
        return sourceArray
            .sort(() => 0.5 - Math.random()) // Ordenar la lista aleatoriamente
            .slice(0, count); // Tomar los primeros 'count' elementos
    }
    try {
        const dietas_disponibles = yield dieta_1.Dieta.findAll({ where: { tipo_objetivo: tipo_objetivo } });
        const listaDieta = getRandomElements(dietas_disponibles, 7);
        console.log(listaDieta);
        res.json(listaDieta);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener las dietas' });
    }
});
exports.actualizarDieta = actualizarDieta;
