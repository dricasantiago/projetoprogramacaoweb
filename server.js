const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express();
//importa as funç~oes do arquivo que esta dentro de controler  no arquivo home.ejs
const { index, listar_produtos, formulario_produto,
     formulario_categoria, listar_categorias, 
     adiciona_categoria, deletar_categoria, atualizar_categoria,
     adicionar_produto } = require("./controler/home");




//app.use(express.static(path.join(__dirname, 'public')));
app.use("/assets",express.static(__dirname + '/assets'));

app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")

//criação de rotas 
//abre dashboard
app.get("/", index)


// ----------------------- PRODUTO ----------------
// chama a função para listar os produtos
app.get("/listar/produtos?:erro", listar_produtos)
// mostra o formulario para adicionar um produto
app.get("/formulario/produto/adicionar", formulario_produto);
app.post("/produto/adicionar", adicionar_produto);


// -----------------------CATEGORIA ----------------

// mostra o formulario para adicionar uma categoria
app.get("/listar_categorias?:erro", listar_categorias)
// mostra o formulario para adicionar uma categoria
app.get("/formulario/categoria/adicionar", formulario_categoria);
app.get("/formulario/categoria/atualizar/:id", formulario_categoria);
// delete o usuario com base no id da categoria
app.get("/deletar_categoria/:id", deletar_categoria);
// Adiciona a categoria
app.post("/categoria/adicionar", adiciona_categoria);
app.post("/categoria/atualizar/:id", atualizar_categoria);





app.listen(3333)