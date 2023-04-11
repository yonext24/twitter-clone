export function ModalBackground ({ closeModal, styles = {} }) {
  return <div onClick={ closeModal } style={{ ...styles, zIndex: 1000, height: '100%', width: '100%', position: 'fixed', top: 0, left: 0, cursor: 'default' }}></div>
}
