"use strict";
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const produtos = [
    { id: 1, nome: "Notebook", preco: 3500 },
    { id: 2, nome: "Mouse Gamer", preco: 150 },
    { id: 3, nome: "Teclado Mecânico", preco: 400 }
];
app.get("/status", (req, res) => {
    res.json({
        status: "API ONLINE"
    });
});
app.post("/login", (req, res) => {
    const { email, senha } = req.body;
    if (email === "admin@betalents.com" && senha === "1234") {
        return res.json({ msg: "Login realizado" });
    }
    res.status(401).json({ msg: "Credenciais inválidas" });
});
app.get("/produtos", (req, res) => {
    res.json(produtos);
});
app.post("/comprar", (req, res) => {
    const { produtoId, quantidade } = req.body;
    const produto = produtos.find(p => p.id == produtoId);
    if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
    }
    const total = produto.preco * quantidade;
    res.json({
        produto: produto.nome,
        quantidade,
        total
    });
});
app.listen(3000, () => {
    console.log("API rodando em http://localhost:3000");
});
//# sourceMappingURL=server.js.map