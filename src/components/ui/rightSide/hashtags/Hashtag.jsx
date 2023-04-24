import { HashtagImage } from './HashtagImage'

/* eslint-disable react/no-unknown-property */
export function Hashtag ({ type, name, amount, image }) {
  return <>
    <div className='container'>
      <div className='dataContainer'>
        <span>{type} · Trending</span>
        <span>{name}</span>
        <span>{amount} Tweets</span>
      </div>
      {
        image?.hasImage && <HashtagImage {...image} />
      }
    </div>
    <style jsx>{`
      .container {
        display: flex;
        transition: background-color .2s;
        cursor: pointer;
        padding: 10px 16px;
      }
      .container:hover {
        background-color: hsla(0,0%,100%,.03);
      }
      .dataContainer {
        display: flex;
        flex-direction: column;
        flex: 1;
        row-gap: 2px;
        color: var(--dateColor);
        font-size: 13px
      }
      .dataContainer span:nth-of-type(2) {
        font-weight: bold;
        font-size: 16px;
        color: var(--mainColor);
        margin-top: -3px
      }
    `}</style>
  </>
}
