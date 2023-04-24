/* eslint-disable react/no-unknown-property */
export function HelpEntry ({ children }) {
  return <>

  <span>{children}</span>

  <style jsx>{`
    span {
      cursor: pointer
    }
    span:hover {
      text-decoration: underline
    }
  `}</style>
  </>
}
