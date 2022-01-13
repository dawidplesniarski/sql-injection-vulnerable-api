const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080

// https://blog.logrocket.com/nodejs-expressjs-postgresql-crud-rest-api-example/

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})

const getUsers = (request, response) => {
    pool.query(`SELECT * FROM users where username='${request.body.username}' and password='${request.body.password}' limit 1`, (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows.length > 0) {
            response.status(200).json(results.rows)
        } else {
            response.status(401).json({ message: 'Invalid credentials' })
        }
    })
}

app.post('/login', getUsers)