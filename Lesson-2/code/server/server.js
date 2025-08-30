// const express = require("express");
// const cors = require("cors");
// const routes = require("./routes/genai");

import express from "express";
import cors from "cors";
import routes from "./routes/genai.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
