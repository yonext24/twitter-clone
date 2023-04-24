/* eslint-disable react/no-unknown-property */
export function Spinner (props) {
  return (
    <>
      <div {...props} ></div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg)
          }
        }
        div {
          border: 3px solid rgba(29, 155, 240, .2);
          border-bottom: 3px solid var(--blue);
          height: 25px;
          width: 25px;
          animation: spin 2s linear infinite;
          border-radius: 50%;
        }
      `}</style>
    </>
  )
}
