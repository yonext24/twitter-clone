/* eslint-disable react/no-unknown-property */
import { ImageWithPlaceholder } from '../../common/ImageWithPlaceholder'
import { Name } from '../../common/Name'
import { Slug } from '../../common/Slug'

export function WhoFollowPerson ({ name, slug, image }) {
  return <>

    <div className="container">
      <ImageWithPlaceholder height={50} width={50} alt='Image of person' image={image} />
      <div className='dataContainer'>
        <Name>{name}</Name>
        <Slug>@{slug}</Slug>
      </div>
      <div className='buttonContainer'>
        <button>Follow</button>
      </div>
    </div>

    <style jsx>{`
      .container {
        display: flex;
        padding: 12px 16px;
        column-gap: 8px;
        cursor: pointer;
        transition: background-color .2s
      }
      .container:hover {
        background-color: hsla(0,0%,100%,.03);
      }
      .dataContainer {
        display: flex;
        flex-direction: column
      }
      .buttonContainer {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center
      }
      button {
        padding: 8px 13px;
        background-color: var(--mainColor);
        color: black;
        font-size: 14px;
        font-weight: bold;
        border-radius: 9999px;
        cursor: pointer;
      }
    
    `}</style>
  </>
}
