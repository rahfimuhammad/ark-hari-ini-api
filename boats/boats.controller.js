const express = require("express")
const router = express.Router()

const { getBoats } = require("./boats.service")

router.get("/", async (req, res) => {
    try {
        const boats = await getBoats()
        res.status(200).send({message: "success get boats", data: boats})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})


module.exports = router

