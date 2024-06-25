"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_token_1 = __importDefault(require("./validate-token"));
const home_1 = require("../controllers/home");
const router = (0, express_1.Router)();
router.get('/', validate_token_1.default, home_1.getDatosUser);
exports.default = router;
