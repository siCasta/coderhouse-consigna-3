import productsRoute from './products.routes.js'

function routes(app) {
    app.use('/products', productsRoute)
}

export default routes