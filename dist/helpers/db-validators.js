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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user-model"));
class DbValidators {
    constructor() {
    }
}
_a = DbValidators;
DbValidators.emailExists = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExists = yield user_model_1.default.findOne({ email });
    if (emailExists) {
        throw new Error(`El correo: ${emailExists.email}, ya está registrado`);
    }
});
DbValidators.usernameExists = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const usernameExists = yield user_model_1.default.findOne({ username });
    if (usernameExists) {
        throw new Error(`El usuario: ${usernameExists.username}, ya está registrado`);
    }
});
exports.default = DbValidators;
//# sourceMappingURL=db-validators.js.map