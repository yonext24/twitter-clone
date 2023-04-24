/* eslint-disable react/no-unknown-property */
export function RightSideContainer ({ children, minHeight = '50px' }) {
  return <>

  <div>
    {
      children
    }
  </div>

  <style jsx>{`
  
    div {
      width: 100%;
      border-radius: 16px;
      background-color: var(--sidebarColor);
      padding: 4px 0 0;
      min-height: ${minHeight}
    }

  `}</style>
  </>
}
