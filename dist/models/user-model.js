"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UsuarioSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'nombre requerido'],
    },
    lastname: {
        type: String,
        required: [true, 'Apellido requerido']
    },
    username: {
        type: String,
        required: [true, 'user requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'contraseña requerido'],
    },
    email: {
        type: String,
        required: [true, 'email requerido'],
        unique: true
    },
    age: {
        type: Number,
        required: [true, 'Numero'],
    }
});
exports.default = (0, mongoose_1.model)('User');
//# sourceMappingURL=user-model.js.map