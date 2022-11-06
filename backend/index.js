const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())


const corsOptions = {
    credentials: true,
    origin: "http://localhost:5147"
}

app.use(cors(corsOptions))


app.get('/', (req, res) => {
    res.status(200).json({
        msg: "ok"
    })
})


const port = 1992

app.listen(port, () => console.log(`Servidor rodando na Porta ${port}`))