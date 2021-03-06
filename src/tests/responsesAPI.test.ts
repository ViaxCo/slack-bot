import mongoose from "mongoose";
// In-memory MongoDB database for testing
import { MongoMemoryServer } from "mongodb-memory-server-core";
let mongoServer: MongoMemoryServer;
jest.setTimeout(600000); // 10 minutes timeout to allow MongoDB binaries download

import { UserResponse } from "../models";
import supertest from "supertest";
import app from "../app";

const request = supertest(app);

describe("UserResponse", () => {
  beforeAll(async () => {
    // Initiate connection to databse
    mongoServer = new MongoMemoryServer();
    const uri = await mongoServer.getUri();
    const conn = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`CONNECTED to database on: ${conn.connection.host}`);
  });

  afterAll(async () => {
    await UserResponse.db.close();
    await mongoServer.stop();
  });

  describe("GET /api/user-responses", () => {
    it("should return an array of each user and their responses", async () => {
      const res = await request.get("/api/user-responses");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      // expect(res.body.length).toBeGreaterThan(0);
    });
  });
});
