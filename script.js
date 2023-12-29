const MUTED_CHANNELS = [
  '@codedamn',
  '@ThePrimeTimeagen',
  '@ThePrimeagen',
  '@t3dotgg',
  '@joshtriedcoding',
  '@IshanSharma7390',
]

function removeVideo(video) {
  const videoChannelUrl = video.querySelector('.ytd-channel-name > a').href
  const videoChannelId = videoChannelUrl.slice(videoChannelUrl.indexOf('@'))
  if (MUTED_CHANNELS.includes(videoChannelId)) {
    console.log(videoChannelId)
    video.classList.add('muted-channel')
  } else {
    video.classList.remove('muted-channel')
  }
}

function updateUI() {
  console.log('extension running 🗣️🗣️🗣️')
  const videos = document.querySelectorAll('ytd-video-renderer')
  videos.forEach((video) => {
    removeVideo(video)
  })
}

function onSearchPage() {
  const url = new URL(window.location)
  if (url.pathname.includes('/results')) {
    return true
  }
}

function main() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      onSearchPage() && updateUI()
    })
  })

  const config = { attributes: true, childList: true, characterData: true }

  observer.observe(document.body, config)
}

main()
