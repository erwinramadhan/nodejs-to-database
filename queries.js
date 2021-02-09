const { Client } = require('pg');
const client = new Client({
    user: 'erwinramadhan',
    host: 'localhost',
    database: 'nodedb',
    password: 'kmzway87aa',
    port: 5432
})
client.connect()

const getArticles = (req, res) =>{
    client.query('SELECT * FROM articles ORDER BY id DESC', (err, results) =>{
        if (err)
            throw(err)
        res.status(200).json(results.rows)
    })
}

const getArticlesById = (req, res) => {
    const id = parseInt(req.params.id);
    client.query('SELECT * FROM articles WHERE id = $1', [id], (err, results)=>{
        if (err)
        throw(err)
        res.status(200).json(results.rows)
    })
}

const updateArticlesById = (req, res) =>{
    // console.log(req.body)
    // return false
    const id = parseInt(req.params.id);
    const { title, content, author} = req.body; //destruckturing, supaya key title content dan author kita destrukturing dulu biar kita bisa dapetin dari body
    client.query('UPDATE articles SET title = $1, content = $2, author = $3 WHERE id = $4', [title, content, author, id], (err, results)=>{
        if(err)
            throw(err)
        res.status(200).json('Databerhasil di Update by ID')
    })
}

const getAuthors = (req, res) =>{
    client.query('SELECT * FROM authors ORDER BY id DESC', (err, results)=>{
        if (err)
            throw(err)
        res.status(200).json(results.rows)
    })
}

const getAuthorsById = (req, res) =>{
    const id = parseInt(req.params.id);
    client.query('SELECT * FROM authors WHERE id = $1', [id], (err, results)=>{
        if (err)
            throw(err)
        res.status(200).json(results.rows)
    })
}

const createAuthors = (req, res)=>{
    const { name, email } = req.body; //menredustruing name email
    client.query('INSERT INTO authors (name, email) VALUES ($1, $2)', [name, email], (err, results)=>{
        if (err)
            throw(err)
        res.status(200).json('Berhasil menambah data')
    })
}

module.exports = { getAuthors, getAuthorsById, createAuthors, updateArticlesById }