/* eslint-disable react/no-unknown-property */
export function Name ({ children, isStretch }) {
  return <>

    <h5 style={{ ...(isStretch && { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }) }}>{children}</h5>

    <style jsx>{`
    
      h5 {
        font-size: 15px;
        font-weight: bold;
      }
    
    `}</style>
  </>
}
