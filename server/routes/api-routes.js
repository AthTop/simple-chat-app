const { Router } = require("express");
const userRoute = require("./user-route");
const api = Router();

api.use("/api", userRoute);

module.exports = api;
