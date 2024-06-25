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
exports.actualizarPasswd2 = exports.recuperarPasswd = exports.actualizarPasswd = void 0;
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const router = (0, express_1.Router)();
const actualizarPasswd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const tokenOld = data.token;
    const decoded = jsonwebtoken_1.default.verify(tokenOld, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    //const contraUser = await User.findOne({ attributes: ['password'], where: { username: username}})
    const user = yield user_1.User.findOne({ where: { username: username } });
    console.log(user.password);
    const passwordvalid = yield bcrypt_1.default.compare(data.oldPasswd, user.password);
    if (!passwordvalid) {
        return res.status(400).json({
            msg: 'Contraseña antigua incorrecta'
        });
    }
    const hashPassword = yield bcrypt_1.default.hash(data.newPasswd, 10);
    yield user_1.User.update({
        password: hashPassword
    }, {
        where: {
            username: username
        }
    });
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.SECRET_KEY || 'holamundo123');
    res.json(token);
});
exports.actualizarPasswd = actualizarPasswd;
const recuperarPasswd = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const datos = req.body;
    try {
        // Verificar si el email existe en la base de datos
        const user = yield user_1.User.findOne({ where: { email: datos.email } });
        if (!user) {
            return res.status(404).json({ message: 'Email no encontrado' });
        }
        // Generar un token JWT para la recuperación de la contraseña
        const token = jsonwebtoken_1.default.sign({
            username: datos.username
        }, process.env.SECRET_KEY || 'holamundo123');
        // Crear el enlace de recuperación
        const resetLink = `http://localhost:4200/recuperarPasswd2?token=${token}`;
        // Configurar el correo electrónico
        const mailOptions = {
            from: 'asistentenutricionalfitness@gmail.com',
            to: datos.email,
            subject: 'Recuperación de contraseña',
            text: `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetLink}`,
            html: `<p>Haga clic en el siguiente enlace para restablecer su contraseña: <a href="${resetLink}">Restablecer contraseña</a></p>`
        };
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: 'asistentenutricionalfitness@gmail.com',
                pass: 'plho olvi tnjk myij'
            }
        });
        // Enviar el correo electrónico
        yield transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Correo de recuperación enviado', token });
    }
    catch (error) {
        console.error('Error al enviar correo de recuperación:', error);
        res.status(500).json({ message: 'Error al enviar correo de recuperación' });
    }
});
exports.recuperarPasswd = recuperarPasswd;
const actualizarPasswd2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    const tokenOld = data.token;
    const decoded = jsonwebtoken_1.default.verify(tokenOld, process.env.SECRET_KEY || 'holamundo123');
    const username = decoded.username;
    console.log(username);
    //const contraUser = await User.findOne({ attributes: ['password'], where: { username: username}})  
    const hashPassword = yield bcrypt_1.default.hash(data.newPasswd, 10);
    yield user_1.User.update({
        password: hashPassword
    }, {
        where: {
            username: username
        }
    });
    const token = jsonwebtoken_1.default.sign({
        username: username
    }, process.env.SECRET_KEY || 'holamundo123');
    res.json(token);
});
exports.actualizarPasswd2 = actualizarPasswd2;
