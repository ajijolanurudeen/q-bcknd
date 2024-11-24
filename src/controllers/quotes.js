const axios = require("axios")

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

module.exports = {
    getRandomQoute,saveFavoriteQuote
}