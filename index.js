const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('hello world!!!')
  })

const prehistoricController = require("./prehistoric/prehistoric.controller")
const litograpghyController = require("./litography/litography.controller")

app.use("/prehistoric", prehistoricController)
app.use("/litography", litograpghyController)


app.listen(5000, () => {
    console.log(`port running at port 5000`)
})


