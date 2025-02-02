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
const user_model_1 = __importDefault(require("../models/user-model"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const auth_service_1 = __importDefault(require("../services/auth-service"));
class AuthController {
    constructor() {
        this.authLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                // Verificar si el email existe
                const usuario = yield this.authService.getUser(email);
                if (!usuario) {
                    return res.status(400).json({
                        msg: 'Usuario / Password no son correctos - correo'
                    });
                }
                const validPassword = this.authService.isPasswordValid(password, usuario.password);
                if (!validPassword) {
                    return res.status(400).json({
                        msg: 'Correo / Contraseña no son correctos'
                    });
                }
                const token = yield jwt_1.default.generarJWT(usuario.id);
                // const userSinPassword = delete usuario.password;
                if (usuario.password) {
                    const _a = usuario.toJSON(), { password } = _a, userData = __rest(_a, ["password"]);
                    res.json({
                        userData,
                        token
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    msg: 'Error hable con backend'
                });
            }
        });
        this.authRegister = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, lastname, username, password, email, age } = req.body;
            const user = new user_model_1.default({ name, lastname, username, password, email, age });
            try {
                user.password = this.authService.hashPassword(password);
                const userData = yield this.authService.saveUser(user);
                res.json({
                    userData
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    msg: 'Error hable con backend'
                });
            }
        });
        this.authService = new auth_service_1.default();
    }
}
exports.default = AuthController;
/*

export const authLogin = async (req:Request,res:Response) =>{
   const {email,password}= req.body;

   try {
      
    // Verificar si el email existe
   // const usuario = await User.findOne({ email });
    if ( !usuario ) {
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - correo'
        });
    }


    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync( password, usuario.password );
    if ( !validPassword ) {
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos - password'
        });
    }

    // Generar el JWT
    const token = await Jwt.generarJWT( usuario.id);

    res.json({
        usuario,
        token
    })

} catch (error) {
    console.log(error)
    res.status(500).json({
        msg: 'Hable con el administrador'
    });
}


}

export const authRegister = async (req:Request,res:Response) =>{
    const {name,lastname,username,password,email,age}  = req.body;

    const user = new User({name,lastname,username,password,email,age});

    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password,salt);
    await user.save();
    res.json({
        user
    })
}
*/ 
//# sourceMappingURL=auth-controller.js.map