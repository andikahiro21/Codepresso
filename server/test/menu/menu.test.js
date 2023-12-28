/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable semi */
/* eslint-disable quotes */
const app = require("../../index.js");
const request = require("supertest");
const CryptoJS = require("crypto-js");
const path = require("path");
const { Users, sequelize } = require("../../models/index.js");
const { hashPassword } = require("../../utils/bcryptPassword.js");
const { queryInterface } = sequelize;
const Redis = require("ioredis");

const imageAccept = path.join(__dirname, "./testing.png");

const dummyUser = {
  fullName: CryptoJS.AES.encrypt("newUser", process.env.TOKEN_PAYLOAD).toString(),
  email: CryptoJS.AES.encrypt("newUser@example.com", process.env.TOKEN_PAYLOAD).toString(),
  password: CryptoJS.AES.encrypt("password123", process.env.TOKEN_PAYLOAD).toString(),
  phoneNumber: CryptoJS.AES.encrypt("081807234567", process.env.TOKEN_PAYLOAD).toString(),
};

const dummyAdmin = {
  fullName: CryptoJS.AES.encrypt("newAdmin", process.env.TOKEN_PAYLOAD).toString(),
  email: CryptoJS.AES.encrypt("newAdmin@example.com", process.env.TOKEN_PAYLOAD).toString(),
  password: CryptoJS.AES.encrypt("password123", process.env.TOKEN_PAYLOAD).toString(),
  phoneNumber: CryptoJS.AES.encrypt("081807234567", process.env.TOKEN_PAYLOAD).toString(),
};

beforeAll(async () => {
  try {
    await Users.create({
      full_name: "newAdmin",
      email: "newAdmin@example.com",
      password: hashPassword("password123"),
      role: 1,
      phone_number: "081807234567",
      image: "https://res.cloudinary.com/dem9rzjbs/image/upload/v1701160219/images/avatar-user.svg",
    });
    await request(app).post("/api/auth/register").send(dummyUser);
  } catch (err) {
    console.error(err);
  }
});

afterAll(async () => {
  try {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Sugars", null, {});
    await queryInterface.bulkDelete("Sizes", null, {});
    await queryInterface.bulkDelete("Milk", null, {});
    await queryInterface.bulkDelete("Beans", null, {});
    await queryInterface.bulkDelete("Menus", null, {});
  } catch (err) {
    console.error(err);
  }
});

const redisClientMock = new Redis();
jest.mock("ioredis", () => require("ioredis-mock"));

jest.mock("../../config/cloudinary", () => ({
  uploadToCloudinary: jest.fn().mockImplementation((file, type) => {
    return {
      url: "https://example.com/image.jpg",
      public_id: "public_id_here",
      error: null,
    };
  }),
}));

describe("CreateMenu", () => {
  beforeEach(async () => {
    redisClientMock.flushall();
  });
  it("should return an error for invalid credentials", async () => {
    let response;
    let user;
    let token;
    try {
      user = await request(app).post("/api/auth/login").send({
        email: dummyUser.email,
        password: dummyUser.password,
      });
      token = user.body.data;
      response = await request(app)
        .post("/api/menu")
        .set("Authorization", `Bearer ${token}`)
        .field("name", "Hazelnut Latte")
        .field("category_id", 1)
        .field("description", "description testing")
        .field("type", "Beverage")
        .field("price", 32000)
        .field("size", true)
        .field("beans", true)
        .field("milk", true)
        .field("sugar", true)
        .attach("image", imageAccept);
    } catch (err) {
      console.error(err);
    }
    console.log(response, "<<response");
    console.log(token, "<<<token");
    expect(response.status).toBe(403);
    expect(response.body.message).toBe("You are not an admin");
  });
  it("should return a joi error for invalid input", async () => {
    let response;
    let user;
    let token;
    try {
      user = await request(app).post("/api/auth/login").send({
        email: dummyAdmin.email,
        password: dummyAdmin.password,
      });
      token = user.body.data;
      response = await request(app)
        .post("/api/menu")
        .set("Authorization", `Bearer ${token}`)
        .field("name", "")
        .field("category_id", 1)
        .field("description", "description testing")
        .field("type", "Beverage")
        .field("price", 32000)
        .field("sizes", true)
        .field("beans", true)
        .field("milk", true)
        .field("sugars", true)
        .attach("image", imageAccept);
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"name" is not allowed to be empty');
  });
  it("should successfully create menu", async () => {
    let response;
    let user;
    let token;
    try {
      user = await request(app).post("/api/auth/login").send({
        email: dummyAdmin.email,
        password: dummyAdmin.password,
      });
      token = user.body.data;
      response = await request(app)
        .post("/api/menu")
        .set("Authorization", `Bearer ${token}`)
        .field("name", "HazelnutLatte")
        .field("category_id", 1)
        .field("description", "description testing")
        .field("type", "Beverage")
        .field("price", 32000)
        .field("sizes", true)
        .field("beans", true)
        .field("milk", true)
        .field("sugars", true)
        .attach("image", imageAccept);
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Menu Created");
  });
  it("should return a 400 error for an existing menu", async () => {
    let response;
    let user;
    let token;
    try {
      user = await request(app).post("/api/auth/login").send({
        email: dummyAdmin.email,
        password: dummyAdmin.password,
      });
      token = user.body.data;
      response = await request(app)
        .post("/api/menu")
        .set("Authorization", `Bearer ${token}`)
        .field("name", "HazelnutLatte")
        .field("category_id", 1)
        .field("description", "description testing")
        .field("type", "Beverage")
        .field("price", 32000)
        .field("sizes", true)
        .field("beans", true)
        .field("milk", true)
        .field("sugars", true)
        .attach("image", imageAccept);
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Menu with name HazelnutLatte already exists.");
  });
});

describe("GetMenu", () => {
  beforeEach(async () => {
    redisClientMock.flushall();
  });
  it("should return an result list menu", async () => {
    let response;
    try {
      response = await request(app).get("/api/menu");
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("GetSpesificMenu", () => {
  beforeEach(async () => {
    redisClientMock.flushall();
  });
  it("should return an result list menu", async () => {
    let menus;
    let response;
    try {
      menus = await request(app).get("/api/menu");
      response = await request(app).get(`/api/menu/${menus.body.data[0].id}`);
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("GetSpesificMenu", () => {
  beforeEach(async () => {
    redisClientMock.flushall();
  });
  it("should return an result list menu", async () => {
    let menus;
    let response;
    try {
      menus = await request(app).get("/api/menu");
      response = await request(app).get(`/api/menu/${menus.body.data[0].id}`);
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("EnableMenu", () => {
  beforeEach(async () => {
    redisClientMock.flushall();
  });
  it("should return an error not finding menu", async () => {
    let response;
    let user;
    let token;
    try {
      user = await request(app).post("/api/auth/login").send({
        email: dummyAdmin.email,
        password: dummyAdmin.password,
      });
      token = user.body.data;
      response = await request(app).put(`/api/menu/enable/12121212112`).set("Authorization", `Bearer ${token}`);
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Menu with ID 12121212112 not found.");
  });
  it("should return an successfull enable menu", async () => {
    let response;
    let menus;
    let user;
    let token;
    try {
      user = await request(app).post("/api/auth/login").send({
        email: dummyAdmin.email,
        password: dummyAdmin.password,
      });
      token = user.body.data;
      menus = await request(app).get("/api/menu");
      response = await request(app).put(`/api/menu/enable/${menus.body.data[0].id}`).set("Authorization", `Bearer ${token}`);
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Menu Updated");
  });
});

describe("DisableMenu", () => {
  beforeEach(async () => {
    redisClientMock.flushall();
  });
  it("should return an error not finding menu", async () => {
    let response;
    let user;
    let token;
    try {
      user = await request(app).post("/api/auth/login").send({
        email: dummyAdmin.email,
        password: dummyAdmin.password,
      });
      token = user.body.data;
      response = await request(app).put(`/api/menu/disable/12121212112`).set("Authorization", `Bearer ${token}`);
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Menu with ID 12121212112 not found.");
  });
  it("should return an successfull disable menu", async () => {
    let response;
    let menus;
    let user;
    let token;
    try {
      user = await request(app).post("/api/auth/login").send({
        email: dummyAdmin.email,
        password: dummyAdmin.password,
      });
      token = user.body.data;
      menus = await request(app).get("/api/menu");
      response = await request(app).put(`/api/menu/disable/${menus.body.data[0].id}`).set("Authorization", `Bearer ${token}`);
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Menu Updated");
  });
});
