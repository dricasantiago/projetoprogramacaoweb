const db = require("../database")

class Produto {

    static async listar() {
        try {
            const response = await db.query("select p.*, c.nome as nome_categoria, c.id as id_categoria from produto p left join categoria c on p.categoria_id = c.id");
            return response.rows;
        } catch (error) {
            console.log(error)
            return undefined
        }
    }
    static async adicionar(nome, marca, valor, categoria_id) {
        try {
            const response = await db.query("insert into produto (nome, marca, valor, categoria_id) values ($1,$2,$3,$4)", [nome, marca, valor, categoria_id]);
            return response.rows;
        } catch (error) {
            console.log(error)
            return undefined
        }
    }

    static async buscarProduto(id) {
        try {
            const response = await db.query("select * from produto where id = $1", [id]);
            return response.rows[0];
        } catch (error) {
            console.log("Erro", error)
            return undefined;
        }
    }
    static async deletar(id) {
        
        try {
            const response = await db.query("delete from produto where id = $1  RETURNING true", [id]);
            return response.rows;
        } catch (error) {
            console.log("Erro", error)
            return undefined;
        }
    }

    static async atualizar(id, nome, valor, marca, categoria_id) {

        try {
            const response = await db.query("UPDATE produto SET nome = $1, valor = $2,marca = $3,categoria_id = $4 WHERE id = $5 returning true", [nome, valor, marca, categoria_id, id]);
            return response.rows;
        } catch (error) {
            console.log("Erro", error)
            return undefined;
        }
    }





}

module.exports = Produto;