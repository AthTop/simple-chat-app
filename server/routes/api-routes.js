const { Router } = require("express");
const userRoute = require("./user-route");
const authRoute = require("./auth-routes");
const api = Router();

api.use("/api", userRoute);
api.use("/api", authRoute);

module.exports = api;
