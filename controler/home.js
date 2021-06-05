
const path = require("path")
const produto = require("../models/Produto.js")
const categoria = require("../models/Categoria.js")
const servico = require("../models/Servico.js")
const cliente = require("../models/Cliente")

// mostra a pagina principal do site
const index = (req, res) => {
    res.render(`${process.cwd()}/views/index.ejs`)
}


// --------------------------------------- PRODUTOS --------------------------------------

// lista os produtos e envia para a pagina listar dentro da pasta produtos
const listar_produtos = async (req, res) => {
    const { erro = null } = req.query;
    let produtos = await produto.listar();
    console.log("Produtos", produtos)

    if (erro) {
        res.render(`${process.cwd()}/views/produto/listar.ejs`, { produtos: produtos, erro: true, msg: 'Algum erro ocorreu, tente novamente' })
    } else {
        res.render(`${process.cwd()}/views/produto/listar.ejs`, { produtos: produtos, erro: false, msg: '' })
    }
}

//função para mostrar a pagina de adicionar produto
const formulario_produto = async (req, res) => {
    categorias = await categoria.listar();
    const { id } = req.params;


    if (id) {
        const resultado = await produto.buscarProduto(id);
        if (resultado != undefined) {
            res.render(`${process.cwd()}/views/produto/atualizar.ejs`, { categorias: categorias, produto: resultado, msg: '', erro: false })
        }
    } else {
        res.render(`${process.cwd()}/views/produto/adicionar.ejs`, { categorias: categorias, msg: '', erro: false })

    }
}
//função para adicionar um novo produto 
const adicionar_produto = async (req, res) => {
    const { nome, marca, valor, categoria_id } = req.body
    try {
        if (nome != '' && marca != '' && valor != '' && categoria_id != '') {
            const resultado = await produto.adicionar(nome, marca, valor, categoria_id)
            const categorias = await categoria.listar();
            if (resultado != undefined) {
                res.render(`${process.cwd()}/views/produto/adicionar.ejs`, {
                    msg: 'Produto adicionado com sucesso', erro: false, categorias
                })
            } else {
                throw true
            }
        }
    } catch (error) {
        res.redirect("/listar/produtos?erro")
    }

}

const deletar_produto = async (req, res) => {
    const { id } = req.params
    try {
        if (id) {
            const resultado = await produto.deletar(id);
            if (resultado != undefined) {
                res.redirect("/listar/produtos")
            } else {
                throw true
            }
        } else {
            res.redirect('/listar/produtos?erro')
        }
    } catch (error) {
        res.redirect('/listar/produtos?erro')
    }

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
        res.render(`${process.cwd()}/views/categoria/atualizar.ejs`, { msg: '', erro: false, categoria: result })
    } else {
        res.render(`${process.cwd()}/views/categoria/adicionar.ejs`, { msg: '', erro: false })
    }

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
const atualizar_produto = async (req, res) => {
    const { nome, marca, valor, categoria_id } = req.body
    const { id } = req.params
    try {
        if (id && nome && marca && valor && categoria_id) {
            console.log(`req.body`, req.body)
            const resultado = await produto.atualizar(id, nome, valor, marca, categoria_id);
            if (resultado != undefined) {
                res.redirect("/listar/produtos")
            } else {
                throw true
            }
        } else {
            res.redirect('/listar/produtos?erro')
        }
    } catch (error) {
        res.redirect('/listar/produtos?erro')
    }
}

// --------------------------------------- Serviços -------------------------------------- 

// lista as categorias  e envia para a pagina listar.ejs dentro da pasta categoria
const listar_servicos = async (req, res, next) => {
    const { erro } = req.query;
    let servicos = await servico.listar();

    if (erro == undefined) {
        res.render(`${process.cwd()}/views/servico/listar.ejs`, { servicos: servicos, erro: false, msg: '' })
    } else {
        res.render(`${process.cwd()}/views/servico/listar.ejs`, { servicos: servicos, erro: true, msg: 'Algum erro ocorreu, tente novamente' })
    }
}
//função para mostrar a pagina de adicionar Categoria
const formulario_servico = async (req, res) => {
    const { id } = req.params;
    const clientes = await cliente.listar();
    const produtos = await produto.listar();

    if (id) {
        let result = await servico.buscarServico(id);
        res.render(`${process.cwd()}/views/servico/atualizar.ejs`, { msg: '', erro: false, servico: result, produtos: produtos, clientes: clientes })
    } else {
        res.render(`${process.cwd()}/views/servico/adicionar.ejs`, { msg: '', erro: false, produtos: produtos, clientes: clientes })
    }

}

// // Cadastra uma categoria no banco e valida os campos
const adiciona_servico = async (req, res) => {
    const { tipo, total, data_entrega, cliente_id, produto_id } = req.body
    const produtos = produto.listar()
    const clientes = []
    console.log(`req.body`, req.body)
    if (Object.keys(req.body).length > 0) {
        if (tipo == '' || total == '' || data_entrega == '' || cliente_id == '' || produto_id == '') {
            res.render(`${process.cwd()}/views/servico/adicionar.ejs`, { msg: 'Campo nome vazio', erro: true, produtos, clientes })
        } else {
            const resultado = await servico.adicionar(tipo, total, data_entrega, cliente_id, produto_id)
            if (resultado != undefined) {
                res.render(`${process.cwd()}/views/servico/adicionar.ejs`, {
                    msg: 'Serviço adicionada com sucesso', erro: false, produtos, clientes
                })
            } else {
                res.render(`${process.cwd()}/views/servico/adicionar.ejs`, {
                    msg: 'Algum erro aconteceu ', erro: true, produtos: produtos, clientes: clientes
                })
            }
        }
    } else {
        res.render(`${process.cwd()}/views/servico/adicionar.ejs`, { msg: '', erro: null, produtos, clientes })
    }
}
const deletar_servico = async (req, res) => {
    const { id } = req.params

    try {
        if (id) {

            const resultado = await servico.deletar(id);
            if (resultado != undefined) {
                res.redirect("/listar/servicos")
            } else {
                throw true
            }
        } else {
            res.redirect('/listar/servicos?erro')
        }
    } catch (error) {
        console.log(`error`, error)
        res.redirect('/listar/servicos?erro')
    }

}

const atualizar_servico = async (req, res) => {
    const { tipo, total, data_entrega, cliente_id, produto_id } = req.body
    const { id } = req.params
    console.log(`req.body`, req.body)
    try {
        if (id && tipo && total && data_entrega && cliente_id && produto_id) {
            console.log(`req.body`, req.body)
            const resultado = await servico.atualizar(id, tipo, total, data_entrega, cliente_id, produto_id);
            if (resultado != undefined) {
                res.redirect("/listar/servicos")
            } else {
                throw true
            }
        } else {
            res.redirect('/listar/servicos?erro')
        }
    } catch (error) {
        res.redirect('/listar/servicos?erro')
    }
}

// -------------------------------- Clientes ----------------------
const listar_clientes = async (req, res, next) => {
    const { erro } = req.query;
    let clientes = await cliente.listar();
    if (erro == undefined) {
        res.render(`${process.cwd()}/views/cliente/listar.ejs`, { clientes: clientes, erro: false, msg: '' })
    } else {
        res.render(`${process.cwd()}/views/cliente/listar.ejs`, { clientes: clientes, erro: true, msg: 'Algum erro ocorreu, tente novamente' })
    }
}

const deletar_cliente = async (req, res) => {
    const { id } = req.params

    try {
        if (id) {

            const resultado = await cliente.deletar(id);
            if (resultado != undefined) {
                res.redirect("/listar/clientes")
            } else {
                throw true
            }
        } else {
            res.redirect('/listar/clientes?erro')
        }
    } catch (error) {
        console.log(`error`, error)
        res.redirect('/listar/clientes?erro')
    }

}

const formulario_cliente = async (req, res) => {
    const { id } = req.params;
    if (id) {
        let result = await cliente.buscarCategoria(id);
        res.render(`${process.cwd()}/views/cliente/atualizar.ejs`, { msg: '', erro: false, cliente: result })
    } else {
        res.render(`${process.cwd()}/views/cliente/adicionar.ejs`, { msg: '', erro: false })
    }

}

const adiciona_cliente = async (req, res) => {
    const { nome, endereco, cpf, email } = req.body
    if (Object.keys(req.body).length > 0) {
        if (nome == '' || endereco == '' || cpf == '' || email == '') {
            res.render(`${process.cwd()}/views/cliente/adicionar.ejs`, { msg: 'Campo nome vazio', erro: true })
        } else {
            const resultado = await cliente.adicionar(nome, endereco, cpf, email)
            if (resultado != undefined) {
                res.render(`${process.cwd()}/views/cliente/adicionar.ejs`, {
                    msg: 'Cliente adicionado com sucesso', erro: false
                })
            } else {
                res.render(`${process.cwd()}/views/cliente/adicionar.ejs`, {
                    msg: 'Algum erro aconteceu ', erro: true
                })
            }
        }
    } else {
        res.render(`${process.cwd()}/views/cliente/adicionar.ejs`, { msg: '', erro: null })
    }
}

const atualizar_cliente = async (req, res) => {
    const { nome, endereco, cpf, email } = req.body
    const { id } = req.params

    try {
        if (id && nome && endereco && cpf && email) {

            const resultado = await cliente.atualizar(id, nome, endereco, cpf, email);
            if (resultado != undefined) {
                res.redirect("/listar/clientes")
            } else {
                throw true
            }
        } else {
            res.redirect('/listar/clientes?erro')
        }
    } catch (error) {
        res.redirect('/listar/clientes?erro')
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
    atualizar_categoria,
    adicionar_produto,
    deletar_produto,
    atualizar_produto,
    listar_servicos,
    formulario_servico,
    deletar_servico,
    adiciona_servico,
    listar_clientes,
    deletar_cliente,
    formulario_cliente,
    adiciona_cliente,
    atualizar_cliente,
    atualizar_servico

}