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
const express_1 = __importDefault(require("express"));
const rutina_1 = __importDefault(require("../routes/rutina"));
const user_1 = __importDefault(require("../routes/user"));
const actualizarPasswd_1 = __importDefault(require("../routes/actualizarPasswd"));
const objetivo_1 = __importDefault(require("../routes/objetivo"));
const home_1 = __importDefault(require("../routes/home"));
const dieta_1 = __importDefault(require("../routes/dieta"));
const connection_1 = __importDefault(require("../db/connection"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        console.log();
        this.midlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('App corriendo en el puerto ' + this.port);
        });
    }
    routes() {
        this.app.use('/api/rutina', rutina_1.default);
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/passwd', actualizarPasswd_1.default);
        this.app.use('/api/objetivo', objetivo_1.default);
        this.app.use('/api/home', home_1.default);
        this.app.use('/api/dieta', dieta_1.default);
    }
    midlewares() {
        this.app.use(express_1.default.json());
        //CORS
        this.app.use((0, cors_1.default)());
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Base de datos conectada');
            }
            catch (error) {
                console.error('no se ha podido conectar a la base de datos: ', error);
            }
        });
    }
}
exports.default = Server;
