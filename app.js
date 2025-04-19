const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

// API Route
app.post('/api/recipe', async (req, res) => {
    const { cuisineType, diet, dishType } = req.body;

    try {
        let query = "food"; // default generic query

        const response = await axios.get('https://api.edamam.com/api/recipes/v2', {
            params: {
                type: 'public',
                app_id: process.env.EDAMAM_APP_ID,
                app_key: process.env.EDAMAM_APP_KEY,
                q: query,
                cuisineType: cuisineType || undefined,
                diet: diet !== 'No Diet Restriction' ? diet : undefined,
                dishType: dishType || undefined
            },
            headers: {
                'Edamam-Account-User': process.env.EDAMAM_USER_ID
            }
        });

        const hits = response.data.hits;
        if (hits.length === 0) {
            return res.status(404).json({ error: 'No recipes found' });
        }

        const recipe = hits[Math.floor(Math.random() * hits.length)].recipe;
        res.json({
            name: recipe.label,
            image: recipe.image,
            cuisineType: recipe.cuisineType ? recipe.cuisineType[0] : 'Various'
        });

    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get('/api/trivia', async (req, res) => {
    try {
        const response = await axios.get('https://api.spoonacular.com/food/trivia/random', {
            params: {
                apiKey: process.env.SPOONACULAR_API_KEY
            }
        });
        res.json({ fact: response.data.text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch trivia' });
    }
});



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
