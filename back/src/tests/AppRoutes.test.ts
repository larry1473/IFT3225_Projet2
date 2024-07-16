import request from "supertest";
import {Server} from "../Server";

let server:Server = new Server();
describe("should valid the email and the password", () => {

    it("should return pasword  is too  weak", async () => {
        const response = await request(server.app)
            .post("/api/v1/signup")
            .send(
                {
                    name:"leandre",
                    email:"leandre@umontreal.ca",
                    password:"123456"
                });
        expect(response.body.message).toBe("Password is too weak");
        expect(response.status).toBe(400);
    });

    it("should return pasword  is too  weak", async () => {
        const response = await request(server.app)
            .post("/api/v1/signup")
            .send(
                {
                    name:"leandre",
                    email:"leandre@umontreal.ca",
                    password:"#Cherileplus1_7"
                });
        expect(response.body.message).toBe("This email already exists");
        expect(response.status).toBe(409);
    });
});

describe("the return status should be 201", () => {

    it("should return status 200", async () => {
        const response = await request(server.app)
            .post("/api/v1/signin")
            .send(
                {
                    name:"leandre",
                    email:"leandre.van.etongo@umontreal.ca",
                    password:"123456"
                });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User signed in successfully");
    });

    it("should return status 200", async () => {
        const response = await request(server.app)
            .post("/api/v1/signin")
            .send(
                {
                    name:"leandre",
                    email:"leandre.van.etongo@umontreal.ca",
                    password:""
                });
        expect(response.status).toBe(500);
        expect(response.body.message).toBe("Invalid email or password");
    });

    it("should return status 200", async () => {
        const response = await request(server.app)
            .post("/api/v1/signin")
            .send(
                {
                    name:"leandre",
                    email:"leoMbila@gmail.com",
                    password:"123456"
                });
        expect(response.status).toBe(500);
        expect(response.body.message).toBe("Invalid email or password");
    });


    
});

describe("get requests testing ", () => {
    
        it("should return status 200", async () => {
            const response = await request(server.app).get("/api/v1/signin");
            expect(response.status).toBe(200);
        });

        it("should return status 200", async () => {
            const response = await request(server.app).get("/api/v1/signup");
            expect(response.status).toBe(200);
        });

        it("should return status 200", async () => {
            const response = await request(server.app).get("/api/v1/logout");
            expect(response.status).toBe(200);
        });
});