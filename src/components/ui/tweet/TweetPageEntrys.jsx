/* eslint-disable react/no-unknown-property */
export function TweetPageEntrys ({ replies, likes, bookmarks }) {
  if (likes < 1 && replies.length < 1) return null
  return <>

  <section>
    {
      likes > 0 && <div className='entryContainer'>
        <span>{likes}</span>
        <p>{likes === 1 ? 'Like' : 'Likes'}</p>
      </div>
    }
    {
      replies.length >= 1 && <div className='entryContainer'>
        <span>{replies.length || ''}</span>
        <p>{replies.length === 1 ? 'Reply' : 'Replies'}</p>
      </div>
    }
    {
      bookmarks > 0 && <div className='entryContainer'>
      <span>{bookmarks}</span>
      <p>{bookmarks === 1 ? 'Bookmark' : 'Bookmarks'}</p>
    </div>
    }

  </section>

    <style jsx>{`

      section {
        width: calc(100% - 20px);
        margin: 0 auto;
        border-top: 1px solid var(--borderColor);
        padding: 12px 0;
        display: flex;
        column-gap: 20px;
        color: var(--mainColor)
      }
      .entryContainer {
        display: flex;
        column-gap: 3px;
        font-size: 14px
      }
      .entryContainer span {
        font-weight: bold;
      }
      .entryContainer p {
        color: var(--dateColor)
      }
    `}</style>
  </>
}
