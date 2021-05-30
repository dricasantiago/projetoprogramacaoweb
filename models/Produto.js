const  db = require("../database")

class Produto {

    static async  listar (){
        try {
            const response = await db.query("select p.*, c.nome as nome_categoria, c.id as id_categoria from produto p inner join categoria c on p.categoria_id = c.id");
            return response.rows;
        } catch (error) {
            console.log(error)
        }
    }


}

module.exports =  Produto;