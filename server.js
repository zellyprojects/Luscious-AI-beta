import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({

    baseURL: "https://openrouter.ai/api/v1",

    apiKey: process.env.OPENROUTER_API_KEY,

});

app.post("/chat", async (req, res) => {

    try{

        const userMessage = req.body.message;

        const completion = await client.chat.completions.create({

            model: "nvidia/nemotron-3-super-120b-a12b:free",

           messages: [

    {
    role: "system",
    content: "You are a futuristic AI assistant named Nova. Reply in a friendly, cool and smart way. Keep replies short to medium length unless the user asks for a detailed answer."
},
    {
        role: "user",
        content: userMessage
    }

]
        });

        res.json({
            reply: completion.choices[0].message.content
        });

    }catch(error){

        console.log(error);

        res.json({
            reply: "Error happened"
        });

    }

});

app.listen(3000, () => {

    console.log("Server running on port 3000");

});