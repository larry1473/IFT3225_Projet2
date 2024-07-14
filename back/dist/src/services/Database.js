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
const mongoose_1 = __importDefault(require("mongoose"));
class Database {
    constructor(dbName) {
        this.client = mongoose_1.default.connection;
    }
    static getInstance(dbName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Database.instance) {
                Database.instance = new Database(dbName);
                yield Database.instance.connect();
            }
            if (!Database._connectionFlag) {
                yield Database.instance.connect();
            }
            return Database.instance;
        });
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(Database.URI);
                Database._connectionFlag = true;
                console.log('Connected to MongoDB');
            }
            catch (error) {
                console.error('Error connecting to MongoDB:', error);
            }
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (Database._connectionFlag) {
                try {
                    yield mongoose_1.default.disconnect();
                    Database._connectionFlag = false;
                    console.log('Disconnected from MongoDB');
                }
                catch (error) {
                    console.error('Failed to disconnect from MongoDB:', error);
                }
            }
        });
    }
    get connectionFlag() {
        return Database._connectionFlag;
    }
}
//private db: Db;
Database.URI = process.env.MONGODB_URI;
Database._connectionFlag = false;
exports.default = Database;
