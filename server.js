const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();
const { index, listar_produtos, formulario_produto } = require("./controler/home")



app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets',express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

app.get("/", index)
app.get("/listar_produtos", listar_produtos)
app.get("/formulario_produto", formulario_produto);





app.listen(3333)