export const NotifIcon = ({ isSelected, ...props }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="r-1nao33i r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e"
    fill="currentColor"
    {...props}
  >
    {
      isSelected
        ? <g><path d="M11.996 2c-4.062 0-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958C19.48 5.017 16.054 2 11.996 2zM9.171 18h5.658c-.412 1.165-1.523 2-2.829 2s-2.417-.835-2.829-2z"></path></g>
        : <path d="M19.993 9.042a8.062 8.062 0 0 0-15.996.009L2.866 18H7.1a5.002 5.002 0 0 0 9.8 0h4.236l-1.143-8.958zM12 20a3.001 3.001 0 0 1-2.829-2h5.658A3.001 3.001 0 0 1 12 20zm-6.866-4 .847-6.698a6.062 6.062 0 0 1 12.028-.007L18.864 16H5.134z" />
    }
  </svg>
)
