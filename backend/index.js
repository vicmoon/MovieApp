// backend/index.js
//https://www.freecodecamp.org/news/hide-api-keys-in-frontend-apps-using-netlify-functions/
//https://pixabay.com/api/docs/
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static("public")); // Serve static files from the 'public' directory

app.get("/api/movies", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${process.env.API_KEY}&total_pages=5`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to search movies" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
