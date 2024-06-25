"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../controllers/user");
const validate_token_1 = __importDefault(require("./validate-token"));
const router = (0, express_1.Router)();
router.post('/', user_1.newUser);
router.post('/login', user_1.loginUser);
router.post('/comprobarUser', user_1.comprobarUser);
router.post('/updateDescanso', user_1.updateDescanso);
router.post('/updateMusculos', user_1.updateMusculos);
router.post('/updateTipoEjer', user_1.updateTipoEjer);
router.get('/getDatosPersonales', validate_token_1.default, user_1.getDatosPersonales);
router.post('/updateDatosPersonales', user_1.updateDatosPersonales);
exports.default = router;
