
const path = require("path")
const produto = require("../models/Produto.js")

const index = (req, res) => {
    console.log(`${process.cwd()}/views/index.ejs`)
    res.render(`${process.cwd()}/views/index.ejs`)
}

const listar_produtos = async (req, res) => {
    let produtos = await produto.listar();
    res.render(`${process.cwd()}/views/produtos/listar.ejs`, { produtos: produtos })
}

module.exports = {
    index,
    listar_produtos
}