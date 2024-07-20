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
let server = new Server_1.Server();
describe("should valid the email and the password", () => {
    it("should return pasword  is too  weak", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.app)
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
        const response = yield (0, supertest_1.default)(server.app)
            .post("/api/v1/signup")
            .send({
            name: "leandre",
            email: "leandre@umontreal.ca",
            password: "#Cherileplus1_7"
        });
        expect(response.body.message).toBe("This email already exists");
        expect(response.status).toBe(409);
    }));
});
describe("the return status should be 201", () => {
    it("should return status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.app)
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
        const response = yield (0, supertest_1.default)(server.app)
            .post("/api/v1/signin")
            .send({
            name: "leandre",
            email: "leandre.van.etongo@umontreal.ca",
            password: ""
        });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User signed in successfully");
    }));
    it("should return status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.app)
            .post("/api/v1/signin")
            .send({
            name: "leandre",
            email: "leoMbila@gmail.com",
            password: "123456"
        });
        expect(response.status).toBe(500);
        expect(response.body.message).toBe("Invalid email or password");
    }));
});
describe("get requests testing ", () => {
    it("should return status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.app).get("/api/v1/signin");
        expect(response.status).toBe(200);
    }));
    it("should return status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.app).get("/api/v1/signup");
        expect(response.status).toBe(200);
    }));
    it("should return status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.app).get("/api/v1/logout");
        expect(response.status).toBe(401);
    }));
});
describe(" project  endponts  testing", () => {
    it("should return status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.app)
            .post("/api/v1/projects")
            .send({
            "name": "Project Alpha",
            "hostId": "6691ef102862bfc95c58160f",
            "gestId": [
                "6691ef8f31e7549043fbce81",
                "6692bc662b50be241e51cbda"
            ],
            "description": "This project is aimed at developing a new software solution.",
            "createDate": "2024-07-16T00:00:00.000Z",
            "targetDate": "2024-12-31T00:00:00.000Z",
            "endDate": "2025-01-31T00:00:00.000Z",
            "requestJoin": [
                "requester1",
                "requester2"
            ],
            "tasks": [
                {
                    "title": "Initial Planning",
                    "description": "Conduct initial planning and requirement gathering.",
                    "hostId": "6691ef102862bfc95c58160f",
                    "guestId": [
                        "6691ef8f31e7549043fbce81",
                        "6692bc662b50be241e51cbda"
                    ],
                    "endDate": "2024-08-15T00:00:00.000Z",
                    "createdDate": "2024-07-16T00:00:00.000Z",
                    "targetDate": "2024-08-01T00:00:00.000Z"
                },
            ]
        });
        expect(response.status).toBe(401);
    }));
    it("should return status 401 ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.app).get("/api/v1/projects");
        expect(response.status).toBe(200);
        //expect(response.body.projects).toBeDefined();
    }));
    it("should return status 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.app).delete("/api/v1/projects/6697102fe1c7fec793a63442");
        expect(response.status).toBe(401);
    }));
    it("should return status 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.app).get("/api/v1/projects/66971535b9b62a2dcde209dd/tasks");
        expect(response.status).toBe(401);
    }));
    it("should return status 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.app)
            .post("/api/v1/projects/66971535b9b62a2dcde209dd")
            .send({
            "title": "Design Phase",
            "description": "Design the architecture and UI for the software.",
            "hostId": "6691ef102862bfc95c58160f",
            "guestId": [
                "6691ef8f31e7549043fbce81",
                "6692bc662b50be241e51cbda"
            ],
            "endDate": "2024-10-15T00:00:00.000Z",
            "createdDate": "2024-07-16T00:00:00.000Z",
            "targetDate": "2024-10-01T00:00:00.000Z"
        });
        expect(response.status).toBe(401);
    }));
    it("should return status 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.app).delete("/api/v1/projects/66971535b9b62a2dcde209dd/tasks/66972037c7ac20116be798f5");
        expect(response.status).toBe(401);
    }));
    it("should return a specific task given the task id when token provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.app).get("/api/v1/projects/66971535b9b62a2dcde209dd/tasks/6697297e420bc7487ef7231c");
        expect(response.status).toBe(401);
    }));
    it("shlould return the guest of a project ", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.app).get("/api/v1/projects/66971535b9b62a2dcde209dd/guests");
        expect(response.body.guests).toBeDefined();
    }));
});
