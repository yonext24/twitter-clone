/* eslint-disable react/no-unknown-property */
export function ShowMore () {
  return <>

    <div>
      <span>Show More</span>
    </div>

    <style jsx>{`
    
      div {
        cursor: pointer;
        padding: 12px 20px;
        transition: background-color .2s
      }
      div:hover {
        background-color: hsla(0,0%,100%,.03);
      }
      span {
        color: var(--blue)
      }
    
    `}</style>
  </>
}
