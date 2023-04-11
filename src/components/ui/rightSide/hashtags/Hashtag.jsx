/* eslint-disable react/no-unknown-property */
export function Hashtag ({ data }) {
  return <>
    <div className='container'>
      <div>{data.type} · Trending</div>
      <div>{data.name}</div>
      <div>{data.amount} Tweets</div>
    </div>
    <style jsx>{`
      .container {
        display: flex;
        flex-direction: column;
        row-gap: 2px;
        transition: background-color .2s;
        cursor: pointer;
      }
      .container:hover {
        background-color: hsla(0,0%,100%,.03);
      }
      .container * {
        display: flex;
        color: var(--slugColor);
        font-size: 15px
      }
      .container div:nth-of-type(2) {
        font-weight: bold;
        font-size: 16px;
        color: var(--mainColor);
        margin-top: -3px
      }
    `}</style>
  </>
}
