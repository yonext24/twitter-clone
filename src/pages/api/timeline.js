import nc from 'next-connect'
import bodyParser from 'body-parser'
import { getTimelineTweets } from '../../../database/controllers/tweetController'

const handler = nc()

handler.use(bodyParser.json())

handler.get(getTimelineTweets)

export default handler
