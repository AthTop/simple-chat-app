require("dotenv").config();
const express = require("express");
const cors = require("cors");
const apiRoute = require("./routes/api-routes");
const app = express();

// App setup
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", apiRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`);
});
