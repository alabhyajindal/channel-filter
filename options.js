function saveOptions(e) {
  e.preventDefault()
  browser.storage.sync.set({
    channels: document.querySelector('#channels').value,
  })
  console.log(document.querySelector('#channels'))
  notice.innerHTML = '<p>Saved, refresh existing YouTube tabs</p>'
  setTimeout(() => {
    notice.innerHTML = ''
  }, 1000)
}

function restoreOptions() {
  let getting = browser.storage.sync.get('channels')
  getting.then(
    (options) => {
      document.querySelector('#channels').value = options.channels || ''
    },
    (err) => console.error(err)
  )
}

const notice = document.querySelector('#notice')
document.addEventListener('DOMContentLoaded', restoreOptions)
document.querySelector('form').addEventListener('submit', saveOptions)
