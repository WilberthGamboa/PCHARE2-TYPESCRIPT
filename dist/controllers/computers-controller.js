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
exports.deleteComputer = exports.updateComputer = exports.postComputer = exports.getMyImgComputer = exports.getMyComputers = exports.getComputers = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const subir_archivos_1 = require("../helpers/subir-archivos");
const computer_model_1 = __importDefault(require("../models/computer-model"));
const getComputers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0, busqueda = '' } = req.query;
    const regex = new RegExp(busqueda.toString());
    const myComputers = yield computer_model_1.default.find({
        //nombre:'wilberth1'
        nombre: regex
        /*
        nombre:{
          $regex:busqueda
        }
        */
    })
        .skip(Number(Number(desde) * 5))
        .limit(Number(limite));
    res.json({
        myComputers
    });
});
exports.getComputers = getComputers;
const getMyComputers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limite = 5, desde = 0, busqueda = '' } = req.query;
    const regex = new RegExp(busqueda.toString(), 'i');
    const myComputers = yield computer_model_1.default.find({
        user: req.id,
        nombre: regex
    })
        .skip(Number(desde))
        .limit(Number(limite));
    res.json({
        myComputers
    });
});
exports.getMyComputers = getMyComputers;
const getMyImgComputer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const myComputers = yield computer_model_1.default.findOne({
        user: req.id,
        _id: id
    });
    if (!myComputers) {
        return res.status(404).json({
            msg: "No existe pc con el id " + id,
        });
    }
    if (myComputers.urlFoto === undefined) {
    }
    else {
        const pathFoto = path_1.default.join(__dirname, '../uploads/', myComputers.urlFoto);
        res.download(pathFoto);
    }
});
exports.getMyImgComputer = getMyImgComputer;
const postComputer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const { nombre, procesador, tarjetaDeVideo, tarjetaMadre, gabinete, almacenamiento, } = req.body;
    console.log(req.id);
    const { limite = 5, desde = 0 } = req.query;
    const x = yield computer_model_1.default.findOne({
        user: req.id,
        nombre: nombre
    }) // filtra las publicaciones por el id del usuario
        .populate('user') // reemplaza la propiedad `user` por los datos completos del usuario
        .skip(Number(desde))
        .limit(Number(limite));
    if (x) {
        return res.status(400).json({
            msg: "ya existe"
        });
    }
    const urlFoto = yield (0, subir_archivos_1.subirArchivo)(req.files);
    const user = req.id;
    const computer = new computer_model_1.default({ nombre, procesador, tarjetaDeVideo, tarjetaMadre, gabinete, almacenamiento, urlFoto, user });
    yield computer.save();
    res.json({
        computer,
    });
});
exports.postComputer = postComputer;
const updateComputer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const computerExist = yield computer_model_1.default.findOne({ _id: id, user: req.id, });
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
});
exports.updateComputer = updateComputer;
const deleteComputer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.deleteComputer = deleteComputer;
//# sourceMappingURL=computers-controller.js.map