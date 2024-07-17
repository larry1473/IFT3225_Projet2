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
            expect(response.status).toBe(401);
        });
});


describe(" project  endponts  testing", () => {
  

    it("should return status 200", async () => {
        const response = await request(server.app)
        .post("/api/v1/projects")
        .send(
            {
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
              }
              
        );
        expect(response.status).toBe(401);
    });

    it("should return status 401 ", async () => {
        const response = await request(server.app).get("/api/v1/projects");
        expect(response.status).toBe(401);
        //expect(response.body.projects).toBeDefined();
    });

    it("should return status 401", async () => {
        const response = await request(server.app).delete("/api/v1/projects/6697102fe1c7fec793a63442");
        expect(response.status).toBe(401);
    });

    it("should return status 401", async () => {
        const response = await request(server.app).get("/api/v1/projects/66971535b9b62a2dcde209dd/tasks");
        expect(response.status).toBe(401);
    });

    it("should return status 401", async () => {
        const response = await request(server.app)
        .post("/api/v1/projects/66971535b9b62a2dcde209dd")
        .send(
            
                {
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
                }
            
            );
        expect(response.status).toBe(401);
    });

    it("should return status 401", async () => {
        const response = await request(server.app).delete("/api/v1/projects/66971535b9b62a2dcde209dd/tasks/66972037c7ac20116be798f5");
        expect(response.status).toBe(401);
    });

    it("should return a specific task given the task id when token provided", async () => {
        const response = await request(server.app).get("/api/v1/projects/66971535b9b62a2dcde209dd/tasks/6697297e420bc7487ef7231c");
        expect(response.status).toBe(401);
    });

});