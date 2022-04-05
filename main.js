const toggleSearchInput = () => {
  const inputGroup = document.querySelector('.input-group')
  if (inputGroup.style.display == 'block') {
    inputGroup.style.display = 'none'
  } else {
    inputGroup.style.display = 'block'
  }
}
