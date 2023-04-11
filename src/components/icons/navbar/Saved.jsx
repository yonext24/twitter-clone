export const SavedIcon = ({ isSelected, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="r-1kihuf0 r-1nao33i r-4qtqp9 r-yyyyoo r-1q142lx r-1472mwg r-mbgqwd r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-lrsllp"
    data-testid="icon"
    fill="currentColor"
    {...props}
  >
    {
      isSelected
        ? <path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5z"></path>
        : <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2h11A2.5 2.5 0 0 1 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z" />
    }
  </svg>
)
