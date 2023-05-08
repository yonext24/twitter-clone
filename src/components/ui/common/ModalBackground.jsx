export function ModalBackground ({ children, closeModal, blueBackground = false, styles = {} }) {
  return <div onClick={ closeModal } style={{ zIndex: 1000, height: '100%', width: '100%', position: 'fixed', top: 0, left: 0, cursor: 'default', backgroundColor: blueBackground ? 'rgba(91, 112, 131, 0.4)' : 'transparent', ...styles }}>
    {children && children}
  </div>
}
