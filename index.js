const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 2000

app.get('/', (req, res) => {
    res.send('hello world!!!')
  })

const prehistoricController = require("./prehistoric/prehistoric.controller")
const litograpghyController = require("./litography/litography.controller")
const boatsController = require("./boats/boats.controller")

app.use("/prehistoric", prehistoricController)
app.use("/litography", litograpghyController)
app.use("/boats", boatsController)


app.listen(PORT, () => {
    console.log(`port running at port 8080`)
})


