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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../models/user");
class AuthService {
    /**
     * this function is used to generate a token for a user
     * @param user the user object
     * @returns
     */
    static generateToken(user) {
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h' // Token expires in 1 hour
        });
        return token;
    }
    static signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({ email: email, password: password });
            if (!user) {
                throw new Error('Invalid email or password');
            }
            const token = this.generateToken(user);
            return token;
        });
    }
}
exports.default = AuthService;
