"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'Token no encontrado'
        });
    }
    try {
        const { id } = jsonwebtoken_1.default.verify(token, (process.env.secretOrPrivateKey || ''));
        req.id = id;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "No se puede procesar, token no valido"
        });
    }
};
exports.validarJWT = validarJWT;
//# sourceMappingURL=jwt-middleware.js.map