import request from "supertest";
import {server} from "../src/Server";

describe("the return status should be 200", () => {

    it("should return status 200", async () => {
        const response = await request(server.app).post("/api/v1/signin");
        expect(response.status).toBe(200);
    });
});

