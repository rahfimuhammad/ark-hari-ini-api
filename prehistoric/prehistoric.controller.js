const express = require("express")
const router = express.Router()

const { getPrehistoric } = require("./prehistoric.service")

router.get("/", async (req, res) => {
    try {
        const data = await getPrehistoric()
        res.status(200).send({message: "success get data", data: data})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})


module.exports = router