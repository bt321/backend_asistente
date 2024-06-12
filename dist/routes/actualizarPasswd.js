"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actualizarPasswd_1 = require("../controllers/actualizarPasswd");
const router = (0, express_1.Router)();
router.post('/', actualizarPasswd_1.actualizarPasswd);
router.post('/recuperarPasswd', actualizarPasswd_1.recuperarPasswd);
router.post('/updatePasswd', actualizarPasswd_1.actualizarPasswd2);
exports.default = router;
