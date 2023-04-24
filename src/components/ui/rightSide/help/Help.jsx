import { HelpEntry } from './HelpEntry'

const entrys = [
  { text: 'Terms of service' },
  { text: 'Privacy Policy' },
  { text: 'Cookie policy' },
  { text: 'Accessibility' },
  { text: 'Ads info' },
  { text: 'More' },
  { text: '© 2023 X Corp.' }
]

/* eslint-disable react/no-unknown-property */
export function Help () {
  return <>

  <div>
    {
      entrys.map(({ text }) => <HelpEntry key={text}>{text}</HelpEntry>)
    }
  </div>

  <style jsx>{`
  
  div {
    display: flex;
    flex-wrap: wrap;
    column-gap: 8px;
    font-size: 13px;
    justify-content: center;
    color: var(--slugColor);
    position: sticky;
    top: 60px;
  }
  
  `}</style>
  </>
}
