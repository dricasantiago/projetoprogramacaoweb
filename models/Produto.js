const  db = require("../database")

class Produto {

    static async  listar (){
        try {
            const response = await db.query("select * from produto");
            console.log(response.rows)
        } catch (error) {
            console.log(error)
        }
    }

    
}

module.exports =  Produto;