// importar a dependencia do sqlite
const sqlite3 = require("sqlite3").verbose()

// iniciar o objeto que ira fazer operacoes no banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
// utilizar o objeto do banco de dados para nossas operacoes
// db.serialize(() => {
//     //criar uma tabela com comandos sql
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     // inserir dados na tabela
//     const query = `
//     INSERT INTO places (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items 
//     ) VALUES (?,?,?,?,?,?,?);
// `

//     const values = [
//         "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//         "Colectoria",
//         "Guilherme Gemballa, Jardim América",
//         "Nº 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         }
//         else {
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//         }
//     }

//     // db.run(query, values, afterInsertData)

//     // consultar os dados da tabela
//     db.all(`SELECT * FROM places`, function(err, rows) {
//         if(err) {
//             return console.log(err)
//         }
//         else {
//             console.log("Aqui estao os seus registros")
//             console.log(rows)
//         }
//     })

    // deletar um dado da tabela
//     db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
//         if(err) {
//             return console.log(err)
//         }
//         else {
//             console.log("Registro deletado com sucesso")
//         }
//     })
// })