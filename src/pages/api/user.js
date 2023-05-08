import nc from 'next-connect'
import bodyParser from 'body-parser'
import { checkIfUserExists, getBookmarked, handleSlugChange } from '../../../database/controllers/userController'

const handler = nc()

handler.use(bodyParser.json())

handler.patch(checkIfUserExists)
handler.post(handleSlugChange)
handler.get(getBookmarked)

export default handler
