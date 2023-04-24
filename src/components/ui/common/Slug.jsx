/* eslint-disable react/no-unknown-property */
export function Slug ({ children }) {
  return <>

    <span>{children}</span>

    <style jsx>{`
    
      span {
        font-size: 16px;
        color: var(--slugColor);
      }
    
    `}</style>
  </>
}
