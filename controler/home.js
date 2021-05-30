
const path = require("path")
const produto = require("../models/Produto.js")
const categoria = require("../models/Categoria.js")

// mostra a pagina principal do site
const index = (req, res) => {
    res.render(`${process.cwd()}/views/index.ejs`)
}


// --------------------------------------- PRODUTOS --------------------------------------

// lista os produtos e envia para a pagina listar dentro da pasta produtos
const listar_produtos = async (req, res) => {
    const { erro = null } = req.query;
    let produtos = await produto.listar();
    let categorias = await categoria.listar()
 
    if (erro) {
        res.render(`${process.cwd()}/views/produtos/listar.ejs`, { produtos: produtos, categorias: categorias, erro: true, msg: 'Algum erro ocorreu, tente novamente' })
    } else {
        res.render(`${process.cwd()}/views/produtos/listar.ejs`, { produtos: produtos,  erro: false, msg: '' })
    }
    

}
//função para mostrar a pagina de adicionar produto
const formulario_produto = async (req, res) => {
    res.render(`${process.cwd()}/views/produtos/adicionar.ejs`)
}
const adiciona_produto = async (req, res) => {
    res.render(`${process.cwd()}/views/produtos/adicionar.ejs`)
}

// --------------------------------------- CATEGORIA -------------------------------------- 

// lista as categorias  e envia para a pagina listar.ejs dentro da pasta categoria
const listar_categorias = async (req, res, next) => {
    const { erro } = req.query;
    let categorias = await categoria.listar();
    console.log("VISHHHH", erro)
    if (erro == undefined) {
        res.render(`${process.cwd()}/views/categoria/listar.ejs`, { categorias: categorias, erro: false, msg: '' })
    } else {
        res.render(`${process.cwd()}/views/categoria/listar.ejs`, { categorias: categorias, erro: true, msg: 'Algum erro ocorreu, tente novamente' })
    }
}
//função para mostrar a pagina de adicionar Categoria
const formulario_categoria = async (req, res) => {
    const { id } = req.params;
    console.log(`id`, id)
    if (id) {
        let result = await categoria.buscarCategoria(id);
        res.render(`${process.cwd()}/views/categoria/atualizar.ejs`, { msg: '', erro: false, categoria:result })
    } else {
        res.render(`${process.cwd()}/views/categoria/adicionar.ejs`, { msg: '', erro: false })
    }

}
//função para mostrar a pagina de adicionar Categoria
const mostrar_formulario = async (req, res) => {
    res.render(`${process.cwd()}/views/categoria/adicionar.ejs`, { msg: '', erro: false })

}

// Cadastra uma categoria no banco e valida os campos
const adiciona_categoria = async (req, res) => {
    const { nome } = req.body
    if (Object.keys(req.body).length > 0) {
        if (nome == '') {
            res.render(`${process.cwd()}/views/categoria/adicionar.ejs`, { msg: 'Campo nome vazio', erro: true })
        } else {
            const resultado = await categoria.adicionar(nome)
            if (resultado != undefined) {
                res.render(`${process.cwd()}/views/categoria/adicionar.ejs`, {
                    msg: 'Categoria adicionada com sucesso', erro: false
                })
            } else {
                res.render(`${process.cwd()}/views/categoria/adicionar.ejs`, {
                    msg: 'Algum erro aconteceu ', erro: true
                })
            }
        }
    } else {
        res.render(`${process.cwd()}/views/categoria/adicionar.ejs`, { msg: '', erro: null })
    }
}
const deletar_categoria = async (req, res) => {
    const { id } = req.params
    try {
        if (id) {
            const resultado = await categoria.deletar(id);
            if (resultado != undefined) {
                res.redirect("/listar_categorias")
            } else {
                throw true
            }
        } else {
            res.redirect('/listar_categorias?erro')
        }
    } catch (error) {
        res.redirect('/listar_categorias?erro')
    }

}
const atualizar_categoria = async (req, res) => {
    const { nome } = req.body
    const { id } = req.params
    console.log("Atualizar : ", nome)
    try {
        if (id && nome) {
            const resultado = await categoria.atualizar(id, nome);
            if (resultado != undefined) {
                res.redirect("/listar_categorias")
            } else {
                throw true
            }
        } else {
            res.redirect('/listar_categorias?erro')
        }
    } catch (error) {
        res.redirect('/listar_categorias?erro')
    }

}



//exporta as funções para serem usadas em outros lugares 
module.exports = {
    index,
    listar_produtos,
    formulario_produto,
    formulario_categoria,
    listar_categorias,
    adiciona_categoria,
    deletar_categoria,
    atualizar_categoria
}