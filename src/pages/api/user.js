import nc from 'next-connect'
import bodyParser from 'body-parser'
import { checkIfUserExists, handleSlugChange } from '../../../database/controllers/userController'

const handler = nc()

handler.use(bodyParser.json())

handler.patch(checkIfUserExists)
handler.post(handleSlugChange)

export default handler
