const express = require('express')
const cors = require('cors')

const AdminsRouter = require('./src/routes/AdminsRoutes')
require('./src/db/runDB')()

const app = express()


app.use(express.json())


const corsOptions = {
    credentials: true,
    origin: "http://localhost:5147"
}
app.use(cors(corsOptions))

app.use('/admin', AdminsRouter)

const port = 1992

app.listen(port, () => console.log(`Servidor rodando na Porta ${port}`))


//[verzel@123]