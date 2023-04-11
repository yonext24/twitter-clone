export const HomeIcon = ({ isSelected, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill='currentColor'
    {...props}
  >
    {
      isSelected
        ? <path d="M12 1.696.622 8.807l1.06 1.696L3 9.679V19.5A2.5 2.5 0 0 0 5.5 22h13a2.5 2.5 0 0 0 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z" />
        : <path d="M12 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1-.001-3.999A2 2 0 0 1 12 15zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5A2.5 2.5 0 0 0 5.5 22h13a2.5 2.5 0 0 0 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V8.429l7-4.375 7 4.375V19.5z" />
    }
  </svg>
)
