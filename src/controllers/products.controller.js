import db from '../db/index.js'

const Products = new db('./src/db/data.json', 'products')

export const getProducts = async (req, res) => {
    try {
        const products = await Products.getAll()

        if (req.query.random) {
            return res.json(products[Math.floor(Math.random() * products.length)])
        }

        return res.json(products)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const saveProduct = async (req, res) => {
    try {
        console.log(req.body)
        const product = await Products.save(req.body)
        res.json(product)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}