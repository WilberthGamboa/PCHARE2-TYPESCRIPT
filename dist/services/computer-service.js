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
const subir_archivos_1 = require("../helpers/subir-archivos");
const computer_model_1 = __importDefault(require("../models/computer-model"));
class ComputerService {
    constructor() {
    }
    getComputers(limite, desde, busqueda) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = new RegExp(busqueda.toString());
            const myComputers = yield computer_model_1.default.find({
                nombre: regex
            })
                .skip(Number(Number(desde) * 5))
                .limit(Number(limite));
            return myComputers;
        });
    }
    getMyComputers(limite, desde, busqueda, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = new RegExp(busqueda.toString(), 'i');
            const myComputers = yield computer_model_1.default.find({
                user: idUser,
                nombre: regex
            })
                .skip(Number(desde))
                .limit(Number(limite));
            return myComputers;
        });
    }
    getMyImgComputer(idUser, idComputer) {
        return __awaiter(this, void 0, void 0, function* () {
            const myComputerImg = yield computer_model_1.default.findOne({
                user: idUser,
                _id: idComputer
            });
            return myComputerImg;
        });
    }
    getMyComputer(limite, desde, busqueda, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = new RegExp(busqueda.toString(), 'i');
            const myComputers = yield computer_model_1.default.find({
                user: idUser,
                nombre: regex
            })
                .skip(Number(desde))
                .limit(Number(limite));
            return myComputers;
        });
    }
    getMyComputerByName(limite, desde, idUser, nameComputer) {
        return __awaiter(this, void 0, void 0, function* () {
            const myComputer = yield computer_model_1.default.findOne({
                user: idUser,
                nombre: nameComputer
            }) // filtra las publicaciones por el id del usuario
                .populate('user') // reemplaza la propiedad `user` por los datos completos del usuario
                .skip(Number(desde))
                .limit(Number(limite));
            return myComputer;
        });
    }
    saveMyComputer(reqBodyComputer, reqFiles, reqIdUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, procesador, tarjetaDeVideo, tarjetaMadre, gabinete, almacenamiento, } = reqBodyComputer;
            const urlFoto = yield (0, subir_archivos_1.subirArchivo)(reqFiles);
            const computerSaved = new computer_model_1.default({ nombre, procesador, tarjetaDeVideo, tarjetaMadre, gabinete, almacenamiento, urlFoto, reqIdUser });
            yield computerSaved.save();
            return computerSaved;
        });
    }
    findOneComputer(idComputer, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const computerExist = yield computer_model_1.default.findOne({ _id: idComputer, user: idUser });
            return computerExist;
        });
    }
}
exports.default = ComputerService;
//# sourceMappingURL=computer-service.js.map