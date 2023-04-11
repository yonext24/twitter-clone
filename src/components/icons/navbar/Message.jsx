export const MessageIcon = ({ isSelected, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
    fill="currentColor"
    {...props}
  >
    {
      isSelected
        ? <g><path d="M1.998 4.499c0-.828.671-1.499 1.5-1.499h17c.828 0 1.5.671 1.5 1.499v2.858l-10 4.545-10-4.547V4.499zm0 5.053V19.5c0 .828.671 1.5 1.5 1.5h17c.828 0 1.5-.672 1.5-1.5V9.554l-10 4.545-10-4.547z"></path></g>
        : <path d="M1.998 5.5a2.5 2.5 0 0 1 2.5-2.5h15a2.5 2.5 0 0 1 2.5 2.5v13a2.5 2.5 0 0 1-2.5 2.5h-15a2.5 2.5 0 0 1-2.5-2.5v-13zm2.5-.5a.5.5 0 0 0-.5.5v2.764l8 3.638 8-3.636V5.5a.5.5 0 0 0-.5-.5h-15zm15.5 5.463-8 3.636-8-3.638V18.5a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5v-8.037z" />
    }
  </svg>
)
