const prisma = require("../db")

const getBoats = async () => {
    try {
        const boats = await prisma.boats.findMany()
        return boats
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getBoats
}