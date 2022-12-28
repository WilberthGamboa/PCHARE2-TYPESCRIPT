"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Jwt {
    constructor() {
    }
}
Jwt.generarJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jsonwebtoken_1.default.sign(payload, process.env.secretOrPrivateKey || '', {}, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            else {
                resolve(token);
            }
        });
    });
};
exports.default = Jwt;
//# sourceMappingURL=jwt.js.map