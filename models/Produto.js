const  db = require("../database")

class Produto {

    static async  listar (){
        try {
            const response = await db.query("select p.*, c.nome as nome_categoria, c.id as id_categoria from produto p left join categoria c on p.categoria_id = c.id");
            return response.rows;
        } catch (error) {
            console.log(error)
            return undefined
        }
    }
    static async  adicionar (nome, marca, valor, categoria_id){
        try {
            const response = await db.query("insert into produto (nome, marca, valor, categoria_id) values ($1,$2,$3,$4)",[nome, marca, valor, categoria_id]);
            return response.rows;
        } catch (error) {
            console.log(error)
            return undefined
        }
    }



}

module.exports =  Produto;