/* eslint-disable react/no-unknown-property */
export function Name ({ children }) {
  return <>

    <h5>{children}</h5>

    <style jsx>{`
    
      h5 {
        font-size: 15px;
        font-weight: bold;
      }
    
    `}</style>
  </>
}
