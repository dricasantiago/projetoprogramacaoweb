const db = require("../database")

class Cliente {
    static async listar() {
        try {
            const response = await db.query("select * from cliente");
            return response.rows;
        } catch (error) {
            console.log(error)
            return undefined;
        }
    }
    static async adicionar(nome, endereco, cpf,email ) {
        try {
            const response = await db.query("insert into cliente (nome, endereco, cpf,email ) values ($1, $2, $3, $4) RETURNING true", [nome, endereco, cpf,email ]);
            return response.rows;
        } catch (error) {
            console.log(error)
            return undefined;

        }
    }

    static async deletar(id) {
        try {
            const response = await db.query("delete from cliente where id = $1  RETURNING true", [id]);
            return response.rows;
        } catch (error) {
            console.log("Erro", error)
            return undefined;
        }
    }
    static async buscarCategoria(id) {
        try {
            const response = await db.query("select * from cliente where id = $1", [id]);
            return response.rows[0];
        } catch (error) {
            console.log("Erro", error)
            return undefined;
        }
    }
    static async atualizar(id, nome, endereco, cpf,email ) {
        try {
            const response = await db.query("UPDATE cliente SET nome = $1,endereco = $2,cpf = $3,email = $4 WHERE id = $5 returning true", [nome, endereco, cpf,email , id]);
            return response.rows;
        } catch (error) {
            console.log("Erro", error)
            return undefined;
        }
    }


}

module.exports = Cliente;