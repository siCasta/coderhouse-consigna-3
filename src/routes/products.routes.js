import { Router } from 'express'
import { getProducts, saveProduct } from '../controllers/products.controller.js'

const router = Router()

router.route('/').get(getProducts).post(saveProduct)

export default router