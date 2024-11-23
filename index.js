const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const controllers = require("../backend/controllers/quotes")

const app = express();

require("dotenv").config();

app.use(cors());

app.use(bodyParser.json());

//Routes
app.get("/quote", controllers.getRandomQoute)
app.post("/quote",controllers.saveFavoriteQuote)

const PORT = process.env.PORT || 5000

app.listen(PORT,()=> console.log(`server running on port ${PORT}`))