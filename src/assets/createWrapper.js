export function createWrapper (wrapperId) {
  let modalsContainer = document.getElementById('modals-container')
  if (!modalsContainer) {
    modalsContainer = document.createElement('div')
    modalsContainer.setAttribute('id', 'modals-container')
    document.body.appendChild(modalsContainer)
  }
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  modalsContainer.appendChild(wrapperElement)
  return wrapperElement
}
