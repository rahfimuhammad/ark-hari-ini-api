const express = require("express")
const router = express.Router()

const { getArtwork, getArtworkById, getArtworkByAuthor, getAuthor, getauthorById, getTotalPages, getTotalPagesByCategory } = require("./litography.service")

router.get("/artwork", async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.size) || 10;

    try {
        const category = req.query.category
        const search = req.query.search
        const totalPages = await getTotalPages(category, pageSize);
        const artworks = await getArtwork(category, search, page, pageSize)
        res.status(200).send({message: "success get artworks", data: {artworks, page, totalPages}})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})

router.get("/artworkbyauthor/:authorId", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.size) || 10;
    const authorId = req.params.authorId
    const category = req.query.category

    try {
        const totalPages = await getTotalPagesByCategory(category, pageSize, authorId);
        const artworks = await getArtworkByAuthor(authorId, category)
        res.status(200).send({message: "success get artwork", data: {artworks, page, totalPages}})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})

router.get("/artworkbyid/:artworkId", async (req, res) => {
    try {
        const artworkId = req.params.artworkId
        const artwork = await getArtworkById(artworkId)
        res.status(200).send({message: "success get artwork", data: artwork})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})

router.get("/authors", async (req, res) => {
    try {
        const authors = await getAuthor()
        res.status(200).send({message: "success get authors", data: authors})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})

router.get("/author/:authorId", async (req, res) => {
    try {
        const authorId = req.params.authorId
        const author = await getauthorById(authorId)
        res.status(200).send({message: "success get author", data: author})
    } catch (error) {
        res.status(404).send({message: error.message})
    }
})

module.exports = router