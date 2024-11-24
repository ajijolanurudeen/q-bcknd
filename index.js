const express = require("express");

const cors = require("cors");

const bodyParser = require("body-parser");

const axios = require("axios")

//const controllers = require("../backend/src/controllers/quotes")

const app = express();

app.use(express.json())

require("dotenv").config();

app.use(cors());

app.use(bodyParser.json());

app.all("/", (req, res) => {
    res.status(200).json({ message: "Hello from serverless function!" });
});
//Routes

let favoriteQuotes = []

//Get random quote
const getRandomQoute = async (req,res)=>{
    try{
        const response = await axios.get("http://api.quotable.io/random");
        res.status(200).json(response.data);
    }catch(error){
        console.error("Error fetching quote:", error); // Log the error for debugging
        res.status(500).json({error:"cannot fetch quote", details: error.message});
    }
};

// favorite quote
const saveFavoriteQuote = async(req,res)=>{
    const{quote,author}=req.body;

    if (!quote || !author){
        return res.status(400).json({error:"Author and Quote required"})
    }

    favoriteQuotes.push({quote,author});

    res.json({favoriteQuotes});
    
};
app.get("/quote", getRandomQoute)
app.post("/quote",saveFavoriteQuote)

module.exports = (req, res) => {
    // This wraps your Express app into a serverless function
    app(req, res);
};

const PORT = process.env.PORT || 5000

app.listen(PORT,()=> console.log(`server running on port ${PORT}`))