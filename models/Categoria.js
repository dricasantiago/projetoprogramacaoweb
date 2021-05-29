const  db = require("../database")

class Categoria {
    static async  listar (){
        try {
            const response = await db.query("select * from categoria");
            return response.rows;
        } catch (error) {
            console.log(error)
            return undefined;
        }
    }
    static async  adicionar (nome){
        try {
            const response = await db.query("insert into categoria (nome) values ($1) RETURNING true", [nome]);
            return response.rows;
        } catch (error) {
            console.log(error)
            return undefined;
            
        }
    }

    static async  deletar (id){
        try {
            const response = await db.query("delete from categoria where id = $1  RETURNING true", [id]);
            return response.rows;
        } catch (error) {
            console.log("Erro", error)
            return undefined;
        }
    }


}

module.exports =  Categoria;