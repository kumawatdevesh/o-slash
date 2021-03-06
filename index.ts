import * as dotenv from 'dotenv'
import path from 'path'
import {app} from './app'

dotenv.config({path: path.join(__dirname, './env')})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})