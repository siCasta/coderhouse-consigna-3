import fs from 'fs'
const fsPromises = fs.promises
import { v4 as uuidv4 } from 'uuid'

class ORMdb {
    constructor(pathFile, table) {
        this.pathFile = pathFile
        this.table = table
    }

    async getData() {
        try {
            const data = await fsPromises.readFile(this.pathFile, 'utf8')
            const parsedData = JSON.parse(data)

            if (!parsedData[this.table]) parsedData[this.table] = []

            return parsedData

        } catch (err) {
            console.log(err)
        }
    }

    async save(object) {
        try {
            const newObject = { ...object, id: uuidv4(), thumbnail: `https://picsum.photos/200?image=${Math.floor(Math.random() * 1000)}` }
            const data = await this.getData()
            data[this.table].push(newObject)
            await fsPromises.writeFile(this.pathFile, JSON.stringify(data, null, 4))

            return newObject
        } catch (err) {
            console.log(err)
        }
    }

    async getById(id) {
        try {
            const data = await this.getData()
            const item = data[this.table].find(dato => dato.id === id) || null
            return item
        } catch (err) {
            console.log(err)
        }
    }

    async getAll() {
        try {
            const data = await this.getData()
            return data[this.table]
        } catch (err) {
            console.log(err)
        }
    }

    async deleteById(id) {
        try {
            const data = await this.getData()
            const item = data[this.table].find(dato => dato.id === id) || null
            if (item) {
                data[this.table] = data[this.table].filter(dato => dato.id !== id)
                await fsPromises.writeFile(this.pathFile, JSON.stringify(data))
            }
            return item
        } catch (err) {
            console.log(err)
        }
    }

    async deleteAll() {
        try {
            const data = await this.getData()
            data[this.table] = []
            await fsPromises.writeFile(this.pathFile, JSON.stringify(data))
        } catch (err) {
            console.log(err)
        }
    }
}

export default ORMdb