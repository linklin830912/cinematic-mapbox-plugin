import express from "express";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    const html = fs.readFileSync("./index.html", "utf-8");

    const injected = html.replace(
        "__MAPBOX_TOKEN__",
        process.env.MAPBOX_TOKEN ?? ""
    );

    res.send(injected);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});