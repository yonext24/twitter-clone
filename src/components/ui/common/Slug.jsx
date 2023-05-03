/* eslint-disable react/no-unknown-property */
export function Slug ({ children, isStretch }) {
  return <>

    <span style={{ ...(isStretch && { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }) }}>{children}</span>

    <style jsx>{`
    
      span {
        font-size: 16px;
        color: var(--slugColor);
      }
    
    `}</style>
  </>
}
