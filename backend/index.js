const express = require('express')
const cors = require('cors')

const runDB = require('./src/db/runDB')()

const adminRoutes = require('./src/routes/adminRoutes')

const app = express()

app.use(express.json())


const corsOptions = {
    credentials: true,
    origin: "http://localhost:5147"
}

app.use(cors(corsOptions))


app.use('/admin', adminRoutes)

const port = 1992

app.listen(port, () => console.log(`Servidor rodando na Porta ${port}`))