/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable semi */
/* eslint-disable quotes */
const app = require("../../index.js");
const request = require("supertest");
const CryptoJS = require("crypto-js");
const path = require("path");
const { Users, sequelize } = require("../../models/index.js");
const { decryptTextPayload } = require("../../utils/decryptPayload.js");
const { hashPassword } = require("../../utils/bcryptPassword.js");
const { queryInterface } = sequelize;

const imageAccept = path.join(__dirname, "./testing.png");

const dummyUser = {
  fullName: CryptoJS.AES.encrypt("newUser", process.env.TOKEN_PAYLOAD).toString(),
  email: CryptoJS.AES.encrypt("newUser@example.com", process.env.TOKEN_PAYLOAD).toString(),
  password: CryptoJS.AES.encrypt("password123", process.env.TOKEN_PAYLOAD).toString(),
  phoneNumber: CryptoJS.AES.encrypt("081807234567", process.env.TOKEN_PAYLOAD).toString(),
};

const dummyAdmin = {
  fullName: "newAdmin",
  email: "newAdmin@example.com",
  password: "password123",
  role: 1,
  phoneNumber: "081807234567",
  image: "https://res.cloudinary.com/dem9rzjbs/image/upload/v1701160219/images/avatar-user.svg",
};

const dummyDriver = {
  fullName: CryptoJS.AES.encrypt("newDriver", process.env.TOKEN_PAYLOAD).toString(),
  email: CryptoJS.AES.encrypt("newDriver@example.com", process.env.TOKEN_PAYLOAD).toString(),
  password: CryptoJS.AES.encrypt("password123", process.env.TOKEN_PAYLOAD).toString(),
  phoneNumber: CryptoJS.AES.encrypt("081807234567", process.env.TOKEN_PAYLOAD).toString(),
  image: "https://res.cloudinary.com/dem9rzjbs/image/upload/v1701160219/images/avatar-user.svg",
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
  } catch (err) {
    console.error(err);
  }
});

afterAll(async () => {
  try {
    await queryInterface.bulkDelete("Users", null, {});
  } catch (err) {
    console.error(err);
  }
});

describe("Register", () => {
  it("should return a joi error for invalid input", async () => {
    let response;
    try {
      response = await request(app)
        .post("/api/auth/register")
        .send({
          fullName: CryptoJS.AES.encrypt("newUser", process.env.TOKEN_PAYLOAD).toString(),
          email: CryptoJS.AES.encrypt("newUser", process.env.TOKEN_PAYLOAD).toString(),
          password: CryptoJS.AES.encrypt("password123", process.env.TOKEN_PAYLOAD).toString(),
          phoneNumber: CryptoJS.AES.encrypt("081807234567", process.env.TOKEN_PAYLOAD).toString(),
        });
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(400);
    expect(response.body.message).toBe("email must be a valid email address.");
  });

  it("should register user with status 201", async () => {
    let response;
    try {
      response = await request(app).post("/api/auth/register").send(dummyUser);
    } catch (err) {
      console.error(err);
    }

    expect(response.status).toBe(201);
  });

  it("should return a 400 error for an existing user", async () => {
    let response;
    try {
      response = await request(app).post("/api/auth/register").send(dummyUser);
    } catch (err) {
      console.error(err);
    }

    expect(response.status).toBe(400);
  });
});

describe("Login", () => {
  it("should return an error for invalid credentials", async () => {
    let response;
    try {
      response = await request(app)
        .post("/api/auth/login")
        .send({
          email: CryptoJS.AES.encrypt("newsa@example.com", process.env.TOKEN_PAYLOAD).toString(),
          password: dummyUser.password,
        });
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User Not Found");
  });
  it("should return a joi validation error", async () => {
    let response;
    try {
      response = await request(app)
        .post("/api/auth/login")
        .send({
          email: CryptoJS.AES.encrypt("newsa", process.env.TOKEN_PAYLOAD).toString(),
          password: dummyUser.password,
        });
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(400);
  });
  it("should successfully log in a user", async () => {
    let response;
    try {
      response = await request(app).post("/api/auth/login").send({
        email: dummyUser.email,
        password: dummyUser.password,
      });
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.message).toBe("success");
  });
});

describe("Forgot Password", () => {
  it("should return a 404 error for unregistered email", async () => {
    let response;
    try {
      response = await request(app).post("/api/auth/forgot-password").send({ email: "fake@gmail.com" });
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User Not Found");
  });
  it("should send reset password link for registered email", async () => {
    let response;
    try {
      const email = decryptTextPayload(dummyUser.email);
      response = await request(app).post("/api/auth/forgot-password").send({ email });
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Success");
  });
});

jest.mock("../../config/cloudinary", () => ({
  uploadToCloudinary: jest.fn().mockImplementation((file, type) => {
    return {
      url: "https://example.com/image.jpg",
      public_id: "public_id_here",
      error: null,
    };
  }),
}));

describe("RegisterDriver", () => {
  it("should return a joi error for invalid input", async () => {
    let response;
    let admin;
    let token;
    try {
      admin = await request(app)
        .post("/api/auth/login")
        .send({
          email: CryptoJS.AES.encrypt(dummyAdmin.email, process.env.TOKEN_PAYLOAD).toString(),
          password: CryptoJS.AES.encrypt(dummyAdmin.password, process.env.TOKEN_PAYLOAD).toString(),
        });
      token = admin.body.data;
      response = await request(app)
        .post("/api/auth/register-driver")
        .set("Authorization", `Bearer ${token}`)
        .send({
          full_name: CryptoJS.AES.encrypt("newDriver", process.env.TOKEN_PAYLOAD).toString(),
          email: CryptoJS.AES.encrypt("newDriver", process.env.TOKEN_PAYLOAD).toString(),
          password: CryptoJS.AES.encrypt("password123", process.env.TOKEN_PAYLOAD).toString(),
          phone_number: CryptoJS.AES.encrypt("081807234567", process.env.TOKEN_PAYLOAD).toString(),
        });
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(400);
  });

  it("should register driver with status 201", async () => {
    let response;
    let admin;
    let token;
    try {
      admin = await request(app)
        .post("/api/auth/login")
        .send({
          email: CryptoJS.AES.encrypt(dummyAdmin.email, process.env.TOKEN_PAYLOAD).toString(),
          password: CryptoJS.AES.encrypt(dummyAdmin.password, process.env.TOKEN_PAYLOAD).toString(),
        });
      token = admin.body.data;
      response = await request(app)
        .post("/api/auth/register-driver")
        .set("Authorization", `Bearer ${token}`)
        .field("fullName", dummyDriver.fullName)
        .field("email", dummyDriver.email)
        .field("password", dummyDriver.password)
        .field("phoneNumber", dummyDriver.phoneNumber)
        .attach("image", imageAccept);
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(201);
  });

  it("should return a 400 error for an existing user", async () => {
    let response;
    let admin;
    let token;
    try {
      admin = await request(app)
        .post("/api/auth/login")
        .send({
          email: CryptoJS.AES.encrypt(dummyAdmin.email, process.env.TOKEN_PAYLOAD).toString(),
          password: CryptoJS.AES.encrypt(dummyAdmin.password, process.env.TOKEN_PAYLOAD).toString(),
        });
      token = admin.body.data;
      response = await request(app).post("/api/auth/register-driver").set("Authorization", `Bearer ${token}`).send({
        fullName: dummyDriver.fullName,
        email: dummyDriver.email,
        password: dummyDriver.password,
        phoneNumber: dummyDriver.phoneNumber,
        image: dummyDriver.image,
      });
    } catch (err) {
      console.error(err);
    }
    expect(response.status).toBe(400);
  });
});
