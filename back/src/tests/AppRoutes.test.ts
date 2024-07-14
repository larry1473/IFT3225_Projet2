import request from "supertest";
import {server} from "../Server";

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
        expect(response.body.message).toBe("User signed up successfully");
        expect(response.status).toBe(201);
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
        expect(response.status).toBe(401);
        expect(response.body.message).toBe("Wrong password");
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
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("This email does not exist");
    });


    
});