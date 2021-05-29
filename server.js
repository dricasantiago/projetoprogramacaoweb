const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();
//importa as funç~oes do arquivo que esta dentro de controler  no arquivo home.ejs
const { index, listar_produtos, formulario_produto, formulario_categoria, listar_categorias, adiciona_categoria, deletar_categoria } = require("./controler/home");




app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets',express.static('assets'));
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

//criação de rotas 
//abre dashboard
app.get("/", index)


// ----------------------- PRODUTO ----------------
// chama a função para listar os produtos
app.get("/listar_produtos", listar_produtos)
// mostra o formulario para adicionar um produto
app.get("/formulario_produto", formulario_produto);

// -----------------------CATEGORIA ----------------

// mostra o formulario para adicionar uma categoria
app.get("/listar_categorias?:erro", listar_categorias)
// mostra o formulario para adicionar uma categoria
app.get("/formulario_categoria", formulario_categoria);
app.get("/deletar_categoria/:id", deletar_categoria);
app.post("/adicionar_categoria", adiciona_categoria);





app.listen(3333)