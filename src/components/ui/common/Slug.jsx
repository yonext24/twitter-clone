/* eslint-disable react/no-unknown-property */
export function Slug ({ children, isStretch, size }) {
  return <>

    <span style={{ ...(isStretch && { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }) }}>{children}</span>

    <style jsx>{`
    
      span {
        font-size: ${size || '16px'};
        color: var(--slugColor);
      }
    
    `}</style>
  </>
}
