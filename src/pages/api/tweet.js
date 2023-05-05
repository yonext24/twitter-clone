import { bookmarkTweet, createTweet, deleteTweet, getSingleTweet, likeTweet } from '../../../database/controllers/tweetController'
import nc from 'next-connect'
import bodyParser from 'body-parser'

const handler = nc()

handler.use(bodyParser.json())

handler.get(getSingleTweet)
handler.post(createTweet)
handler.put(likeTweet)
handler.delete(deleteTweet)
handler.patch(bookmarkTweet)

export default handler
