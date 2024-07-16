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
exports.AppService = void 0;
const user_1 = require("../models/user");
const Database_1 = __importDefault(require("./Database"));
const validator_1 = __importDefault(require("validator"));
const zxcvbn_1 = __importDefault(require("zxcvbn"));
const AuthService_1 = __importDefault(require("./AuthService"));
class AppService {
    constructor() { }
    validateEmail(email) {
        return validator_1.default.isEmail(email);
    }
    validatePassword(password) {
        return (0, zxcvbn_1.default)(password).score >= 3;
    }
    signUp(name, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.database = yield Database_1.default.getInstance("users");
            try {
                // Validate email format
                if (!this.validateEmail(email)) {
                    return { success: false, message: 'Invalid email format' };
                }
                // Validate password strength
                if (!this.validatePassword(password)) {
                    return { success: false, message: 'Password is too weak' };
                }
                // check if the user email  already exists
                const existingUser = yield user_1.User.findOne({ email });
                if (existingUser) {
                    return { success: false, message: "This email already exists" };
                }
                else {
                    const user = new user_1.User({ name, email, password });
                    yield user.save();
                    return { success: true, message: "User signed up successfully" };
                }
            }
            catch (err) {
                return { success: false, message: 'An error occurred during sign up' };
                console.error("An error occured during the signUp", err);
            }
            finally {
                yield this.database.close();
            }
        });
    }
    signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.database = yield Database_1.default.getInstance("users");
            try {
                const token = yield AuthService_1.default.signIn(email, password);
                return { success: true, message: 'User signed in successfully', token };
            }
            catch (err) {
                const error = err;
                return { success: false, message: error.message };
                console.error("An error occured during the signIn", error);
            }
            finally {
                yield this.database.close();
            }
        });
    }
}
exports.AppService = AppService;
