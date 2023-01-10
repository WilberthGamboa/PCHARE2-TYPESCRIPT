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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user-model"));
class AuthService {
    getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield user_model_1.default.findOne({ email });
            return usuario;
        });
    }
    isPasswordValid(reqPassword, dbPassword) {
        const validation = bcryptjs_1.default.compareSync(reqPassword, dbPassword);
        return validation;
    }
    hashPassword(reqPassword) {
        const salt = bcryptjs_1.default.genSaltSync(10);
        const hashedPassword = bcryptjs_1.default.hashSync(reqPassword, salt);
        return hashedPassword;
    }
    saveUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSaved = yield user.save();
            return userSaved;
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=auth-service.js.map