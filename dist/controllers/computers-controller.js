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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const subir_archivos_1 = require("../helpers/subir-archivos");
const computer_model_1 = __importDefault(require("../models/computer-model"));
const computer_service_1 = __importDefault(require("../services/computer-service"));
class ComputerController {
    constructor() {
        this.computerService = new computer_service_1.default();
    }
    getComputers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limite = 5, desde = 0, busqueda = '' } = req.query;
            if (isNaN(Number(limite)) || isNaN(Number(desde))) {
                res.status(401).json({
                    "msg": "Req query params invalid"
                });
            }
            try {
                const computers = yield this.computerService.getComputers(Number(limite), Number(desde), busqueda.toString());
                res.json({
                    computers
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    "msg": "Llame al de backend"
                });
            }
        });
    }
    getMyComputers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limite = 5, desde = 0, busqueda = '' } = req.query;
            if (isNaN(Number(limite)) || isNaN(Number(desde))) {
                res.status(401).json({
                    "msg": "Req query params invalid"
                });
            }
            try {
                const myComputers = yield this.computerService.getMyComputers(Number(limite), Number(desde), busqueda.toString(), req.id);
                res.json({
                    myComputers
                });
            }
            catch (error) {
            }
        });
    }
    getMyImgComputer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const myImgComputer = yield this.computerService.getMyImgComputer(req.id, id);
                if (!myImgComputer) {
                    return res.status(404).json({
                        msg: "No existe pc con el id " + id,
                    });
                }
                if (myImgComputer.urlFoto === undefined) {
                }
                else {
                    const pathFoto = path_1.default.join(__dirname, '../uploads/', myImgComputer.urlFoto);
                    res.download(pathFoto);
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    "msg": "Error llamen al backend"
                });
            }
        });
    }
    postComputer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.files || Object.keys(req.files).length === 0) {
                res.status(400).json("No se ha subido ningún archivo");
                return;
            }
            if (!req.files.archivo) {
                res.status(400).json("No se ha subido ningún archivo");
                return;
            }
            if (Array.isArray(req.files.archivo) || Object.keys(req.files).length > 1) {
                res.status(400).json("Máximo un archivo");
                return;
            }
            const { limite = 5, desde = 0 } = req.query;
            const { nombre, procesador, tarjetaDeVideo, tarjetaMadre, gabinete, almacenamiento, } = req.body;
            try {
                const computerExist = yield this.computerService.getMyComputerByName(Number(limite), Number(desde), req.id, nombre);
                if (computerExist) {
                    return res.status(400).json({
                        msg: "ya existe"
                    });
                }
                const user = req.id;
                const computerSaved = this.computerService.saveMyComputer(req.body, req.files, req.id);
                //
                // const computer = new Computers({nombre,procesador,tarjetaDeVideo,tarjetaMadre,gabinete,almacenamiento,urlFoto,user});
                // await computer.save();
                res.json({
                    computerSaved
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    "msg": "Error llamen al backend"
                });
            }
        });
    }
    updateComputer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const computerExist = yield this.computerService.findOneComputer(id, req.id);
                const _a = req.body, { user } = _a, data = __rest(_a, ["user"]);
                if (!computerExist) {
                    res.status(400).json({
                        msg: "No existe la computadora"
                    });
                    return;
                }
                if (!req.files || Object.keys(req.files).length === 0) {
                    const myComputers = yield computer_model_1.default.findByIdAndUpdate(id, data, { new: true });
                    return res.json({
                        myComputers
                    });
                }
                else {
                    if (Array.isArray(req.files.archivo) || Object.keys(req.files).length > 1) {
                        res.status(400).json("No se puede subir mas de un archivo");
                        return;
                    }
                    else {
                        if (computerExist.urlFoto) {
                            const pathImagen = path_1.default.join(__dirname, '../uploads/', computerExist.urlFoto);
                            console.log(pathImagen);
                            if (fs_1.default.existsSync(pathImagen)) {
                                console.log(pathImagen);
                                fs_1.default.unlinkSync(pathImagen);
                            }
                        }
                        const urlFoto = yield (0, subir_archivos_1.subirArchivo)(req.files);
                        data.urlFoto = urlFoto;
                        // const consultaBody = req.body;
                        //const urlFotoObj = {urlFoto};
                        const myComputers = yield computer_model_1.default.findByIdAndUpdate(id, data, { new: true });
                        res.json({
                            myComputers
                        });
                    }
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    "msg": "Error llamen al backend"
                });
            }
        });
    }
    deleteComputer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const computerExist = yield computer_model_1.default.findOne({ _id: id, user: req.id, });
            if (!computerExist) {
                res.status(400).json({
                    msg: "No existe la computadora"
                });
                return;
            }
            const deleteComputer = yield computer_model_1.default.findByIdAndDelete(id, { new: true });
            //const deleteComputer = await Computers.deleteOne({computerExist})
            if (computerExist.urlFoto) {
                const pathImagen = path_1.default.join(__dirname, '../uploads/', computerExist.urlFoto);
                console.log(pathImagen);
                if (fs_1.default.existsSync(pathImagen)) {
                    console.log(pathImagen);
                    fs_1.default.unlinkSync(pathImagen);
                }
            }
            console.log(deleteComputer);
            res.json({
                deleteComputer
            });
        });
    }
}
exports.default = ComputerController;
//# sourceMappingURL=computers-controller.js.map