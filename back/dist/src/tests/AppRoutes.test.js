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
const supertest_1 = __importDefault(require("supertest"));
const Server_1 = require("../Server");
describe("should valid the email and the password", () => {
    it("should return pasword  is too  weak", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(Server_1.server.app)
            .post("/api/v1/signup")
            .send({
            name: "leandre",
            email: "leandre@umontreal.ca",
            password: "123456"
        });
        expect(response.body.message).toBe("Password is too weak");
        expect(response.status).toBe(400);
    }));
    it("should return pasword  is too  weak", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(Server_1.server.app)
            .post("/api/v1/signup")
            .send({
            name: "leandre",
            email: "leandre@umontreal.ca",
            password: "#Cherileplus1_7"
        });
        expect(response.body.message).toBe("User signed up successfully");
        expect(response.status).toBe(201);
    }));
});
describe("the return status should be 201", () => {
    it("should return status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(Server_1.server.app)
            .post("/api/v1/signin")
            .send({
            name: "leandre",
            email: "leandre.van.etongo@umontreal.ca",
            password: "123456"
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User signed in successfully");
    }));
    it("should return status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(Server_1.server.app)
            .post("/api/v1/signin")
            .send({
            name: "leandre",
            email: "leandre.van.etongo@umontreal.ca",
            password: ""
        });
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Wrong password");
    }));
    it("should return status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(Server_1.server.app)
            .post("/api/v1/signin")
            .send({
            name: "leandre",
            email: "leoMbila@gmail.com",
            password: "123456"
        });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("This email does not exist");
    }));
});
