const express = require('express')
const app = express();
const db = require("./queries");

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/api/v1/authors', db.getAuthors)
app.get('/api/v1/authors/:id', db.getAuthorsById)
app.post('/api/v1/authors', db.createAuthors)
app.put('/api/v1/articles/:id', db.updateArticlesById)

app.listen(3000, ()=>{
    console.log('Server Ready')
})