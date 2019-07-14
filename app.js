const app = () => {

  const song = document.querySelector(".song")
  const play = document.querySelector(".play")
  const outline = document.querySelector(".moving-outline circle")
  const video = document.querySelector(".vid-container video")



  // Sounds
  const sounds = document.querySelectorAll(".sound-picker button")

  // Time buttons
  const timeSelect = document.querySelectorAll(".time-select button")

  // Display Time
  const timeDisplay = document.querySelector(".time-display")
  
  // Get length of outline
  const outlineLength = outline.getTotalLength();
  console.log(outlineLength)

  // Durations
  let fakeDuration = 120

  outline.style.strokeDasharray = outlineLength
  outline.style.strokeDashoffset = outlineLength


  // Pick different sounds
  sounds.forEach(sound => {
    sound.addEventListener('click', function(){
      song.src = this.getAttribute('data-sound')
      video.src = this.getAttribute('data-video')
      checkPlaying(song)
    })
  })


  // Play sound
  play.addEventListener('click', () => {
    checkPlaying(song)
  })

  const checkPlaying = song => {
    if (song.paused) {
      song.play()

      document.querySelector('.time-select').style.opacity = .3
      document.querySelector('.sound-picker').style.opacity = .3

      play.src = "./svg/pause.svg"
      video.play()
    } else {
      song.pause()

      document.querySelector('.time-select').style.opacity = 1
      document.querySelector('.sound-picker').style.opacity = 1

      play.src = "./svg/play.svg"
      video.pause()
    }
  }

  // select sound
  timeSelect.forEach(option => {
    option.addEventListener('click', function(){
      fakeDuration = this.getAttribute('data-time')
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
    })
  })


  song.ontimeupdate = () => {
    let currentTime = song.currentTime
    let elapsedTime = fakeDuration - currentTime

    let seconds = Math.floor(elapsedTime % 60)
    let minutes = Math.floor(elapsedTime / 60)

    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
    outline.style.strokeDashoffset = progress

    timeDisplay.textContent = `${minutes}:${seconds}`

    if (currentTime >= fakeDuration){
      song.pause()
      song.currentTime = 0
      play.src = "./svg/play.svg"
      video.pause()
    }

  }


}

app();