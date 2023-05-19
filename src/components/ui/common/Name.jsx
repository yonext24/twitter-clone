/* eslint-disable react/no-unknown-property */
export function Name ({ children, styles }) {
  return <>

    <h5 style={styles}>{children}</h5>

    <style jsx>{`
    
      h5 {
        font-size: 15px;
        font-weight: bold;
        overflow: hidden; 
        text-overflow: ellipsis;
        max-height: 24px;
        word-break: break-all
      }
    
    `}</style>
  </>
}
