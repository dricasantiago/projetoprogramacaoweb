const db = require("../database")

class Servico {
    static async listar() {
        try {
            const response = await db.query("select s.*, p.nome  as nome_produto, c.nome as nome_cliente from servico s inner join produto p on p.id = s.produto_id inner join cliente c on c.id = s.cliente_id");
            return response.rows;
        } catch (error) {
            console.log(error)
            return undefined;
        }
    }
    static async adicionar(tipo, total, data_entrega, cliente_id, produto_id) {
        try {
            const response = await db.query("insert into servico (tipo, total, data_entrega, cliente_id , produto_id) values ($1,$2,$3,$4,$5) RETURNING true", [tipo, total, data_entrega, cliente_id, produto_id]);
            return response.rows;
        } catch (error) {
            console.log(error)
            return undefined;

        }
    }

    static async deletar(id) {
        try {
            const response = await db.query("delete from servico where id = $1  RETURNING true", [id]);
            console.log(`response`, response.rows)
            return response.rows;
        } catch (error) {
            console.log("Erro", error)
            return undefined;
        }
    }
    static async buscarServico(id) {
        try {
            const response = await db.query("select * from servico where id = $1", [id]);
            return response.rows[0];
        } catch (error) {
            console.log("Erro", error)
            return undefined;
        }
    }
    static async atualizar(id, tipo, total, data_entrega, cliente_id, produto_id) {
        console.log(`id` + id + "nome : " + nome)
        try {
            const response = await db.query("UPDATE servico SET tipo = $1,total = $2,data_entrega = $3,client_id = $4,produto_id = $5, WHERE id = $2 returning true", [tipo, total, data_entrega, cliente_id, produto_id, id]);
            return response.rows;
        } catch (error) {
            console.log("Erro", error)
            return undefined;
        }
    }


}

module.exports = Servico;