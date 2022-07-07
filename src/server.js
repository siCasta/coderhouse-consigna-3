import app from './settings.js'

(async () => {
    await app.listen(app.get('port'))
    console.log(`Server running at http://localhost:${app.get('port')}`)
})()