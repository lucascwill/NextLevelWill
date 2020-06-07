// npm init -y
// npm install express
// npm instal nunjucks

const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

// configurar pasta publica
server.use(express.static("public"))

// habilitar o uso do req.body na aplicacao
server.use(express.urlencoded({ extended: true }))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true 
})

// configurar caminhos da minha aplicacao
// pagina inicial
// req = requisicao
// res = resposta
server.get("/", (req, res) => {
    return res.render("index.html", {title: "Seu Marketplace de coleta de residuos"})
}) 

server.get("/create-point", (req, res) => {
    // req.query: Query Strings da nossa url
    // console.log(req.query)
    return res.render("create-point.html", {saved: true})
}) 

server.post("/savepoint", (req, res) => {
    //req.body: corpo do nosso formulario
    // console.log(req.body)
    //inserir dados no banco de dados
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items 
    ) VALUES (?,?,?,?,?,?,?);
`

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro")
        }
        else {
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html")
        }
    }

    db.run(query, values, afterInsertData)

}) 

server.get("/search-results", (req, res) => {
    //pesquisa vazia
    const search = req.query.search
    if(search == "") {
        return res.render("search-results.html", { total: 0})
}


    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        else {
            const total = rows.length
        // mostrar a pagina html com os dados do banco de dados
            return res.render("search-results.html", {places: rows, total: total})
        }
    })

}) 


// ligar o servidor
server.listen(3000)
