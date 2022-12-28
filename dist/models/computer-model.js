"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ComputerSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la computadora es obligatorio'],
        unique: true
    },
    procesador: {
        type: String,
        required: [true, 'El nombre del procesador es obligatorio'],
    },
    tarjetaDeVideo: {
        type: String,
        required: [true, 'El nombre de la tarjeta de video es obligatorio'],
    },
    tarjetaMadre: {
        type: String,
        required: [true, 'El nombre de la tarjeta madre es obligatorio'],
    },
    gabinete: {
        type: String,
        required: [true, 'El nombre del gabinete es obligatorio'],
    },
    almacenamiento: {
        type: String,
        required: [true, 'El almacenamiento es obligatorio'],
    },
    urlFoto: {
        type: String,
        required: [false],
    }
});
//ComputerSchema.index({ username: 1 }, { unique: true, partialFilterExpression: { company: companyId } });
/*
 usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }
*/
ComputerSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, data = __rest(_a, ["__v"]);
    return data;
};
exports.default = (0, mongoose_1.model)('Computers', ComputerSchema);
//# sourceMappingURL=computer-model.js.map