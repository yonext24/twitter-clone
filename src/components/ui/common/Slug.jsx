/* eslint-disable react/no-unknown-property */
export function Slug ({ children, size, styles }) {
  return <>

    <span style={styles}>{children}</span>

    <style jsx>{`
    
      span {
        font-size: ${size || '16px'};
        color: var(--slugColor);
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        max-height: 24px;
      }
    
    `}</style>
  </>
}
