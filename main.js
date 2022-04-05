const sidebar = document.querySelector('.side-bar')
const sidebarOverlay = document.querySelector('.overlay')

const toggleSearchInput = () => {
  const inputGroup = document.querySelector('.input-group')
  if (inputGroup.style.display == 'block') {
    inputGroup.style.display = 'none'
  } else {
    inputGroup.style.display = 'block'
  }
}

const openSidebar = () => {
  sidebar.style.width = '50vw'
  sidebarOverlay.style.display = 'block'
}

const closeSidebar = () => {
  sidebar.style.width = '0'
  sidebarOverlay.style.display = 'none'
}
