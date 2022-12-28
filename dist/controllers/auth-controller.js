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
exports.authRegister = exports.authLogin = void 0;
const user_model_1 = __importDefault(require("../models/user-model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const authLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verificar si el email existe
        const usuario = yield user_model_1.default.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }
        // Verificar la contraseña
        const validPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        // Generar el JWT
        const token = yield jwt_1.default.generarJWT(usuario.id);
        res.json({
            usuario,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
});
exports.authLogin = authLogin;
const authRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, lastname, username, password, email, age } = req.body;
    const user = new user_model_1.default({ name, lastname, username, password, email, age });
    const salt = bcryptjs_1.default.genSaltSync(10);
    user.password = bcryptjs_1.default.hashSync(password, salt);
    yield user.save();
    res.json({
        user
    });
});
exports.authRegister = authRegister;
//# sourceMappingURL=auth-controller.js.map