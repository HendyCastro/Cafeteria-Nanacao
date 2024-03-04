const express = require('express');
const app = express();
const cafes = require("./cafes.json");

app.use(express.json());

app.get("/cafes", (req, res) => {
    res.status(200).json(cafes);
});

app.get("/cafes/:id", (req, res) => {
    const { id } = req.params;
    const cafe = cafes.find(cafe => cafe.id === parseInt(id));
    if (cafe) {
        res.status(200).json(cafe);
    } else {
        res.status(404).json({ message: "No se encontró ningún café con ese id" });
    }
});

app.post("/cafes", (req, res) => {
    const newCafe = req.body;
    const { id } = newCafe;
    const existeCafe = cafes.some(cafe => cafe.id === id);
    if (existeCafe) {
        res.status(400).json({ message: "Ya existe un café con ese id" });
    } else {
        cafes.push(newCafe);
        res.status(201).json(cafes);
    }
});

app.put("/cafes/:id", (req, res) => {
    const { id } = req.params;
    const updatedCafe = req.body;
    if (id !== updatedCafe.id) {
        return res.status(400).json({ message: "El id del parámetro no coincide con el id del café recibido" });
    }
    const cafeIndex = cafes.findIndex(cafe => cafe.id === parseInt(id));
    if (cafeIndex !== -1) {
        cafes[cafeIndex] = updatedCafe;
        res.json(cafes);
    } else {
        res.status(404).json({ message: "No se encontró ningún café con ese id" });
    }
});

app.delete("/cafes/:id", (req, res) => {
    const { id } = req.params;
    const cafeIndex = cafes.findIndex(cafe => cafe.id === parseInt(id));
    if (cafeIndex !== -1) {
        cafes.splice(cafeIndex, 1);
        res.json(cafes);
    } else {
        res.status(404).json({ message: "No se encontró ningún café con ese id" });
    }
});

app.use("*", (req, res) => {
    res.status(404).json({ message: "La ruta que intenta consultar no existe" });
});

const server = app.listen(3000, () => {
    console.log("SERVER ON");
});

module.exports = server;
