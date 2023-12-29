const MUTED_CHANNELS = [
  '@codedamn',
  '@ThePrimeTimeagen',
  '@ThePrimeagen',
  '@t3dotgg',
  '@joshtriedcoding',
  '@IshanSharma7390',
]

let color

function removeVideo(video) {
  const videoChannelUrl = video.querySelector('.ytd-channel-name > a').href
  const videoChannelId = videoChannelUrl.slice(videoChannelUrl.indexOf('@'))
  if (MUTED_CHANNELS.includes(videoChannelId)) {
    video.classList.add('muted-channel')
  } else {
    video.classList.remove('muted-channel')
  }
}

function updateUI() {
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
      console.log(color)
      onSearchPage() && updateUI()
    })
  })

  const config = { attributes: true, childList: true, characterData: true }

  observer.observe(document.body, config)
}

const getOptions = browser.storage.sync.get('color')

getOptions.then(
  (options) => {
    color = options.color
    main()
  },
  (error) => console.log(error)
)
