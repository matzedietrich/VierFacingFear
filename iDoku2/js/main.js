var navSection
var navArrow
var navAnchors
var startButton
var contentContainer
var introduction
var content
var startImage
var detectElements
var lastDetEl
var scrollPosition = 0
var fixedImage
var imgPreload

document.addEventListener('DOMContentLoaded', function () {
  navSection = document.getElementsByTagName('nav')[0]
  navArrow = navSection.getElementsByTagName('div')[0]
  navAnchors = navSection.getElementsByTagName('a')
  startButton = document.getElementById('startButton')
  contentContainer = document.getElementById('contentContainer')
  startImage = document.getElementById('startImage')
  introduction = document.getElementById('introduction')
  content = document.getElementById('content')
  detectElements = document.getElementsByClassName('detect')
  fixedImage = document.getElementById('fixedImage')
  imgPreload = document.getElementById('imgPreload')

  startButton.addEventListener('click', showContent)

  navAnchors[0].addEventListener('click', showIntroduction)

  for (var i = 1; i < navAnchors.length; i++) {
    navAnchors[i].addEventListener('click', scrollTo)
  }

  contentContainer.addEventListener('scroll', function () { // scroll down
    if (contentContainer.scrollTop > scrollPosition) {
      scrollPosition = contentContainer.scrollTop
      for (var detEl in detectElements) {
        if (contentContainer.scrollTop + detectElements[detEl].offsetHeight >= (detectElements[detEl].offsetTop - detectElements[0].offsetHeight)) {
          if (lastDetEl == undefined) {
            lastDetEl = detectElements[detEl]
          }
          else if (detectElements[detEl].offsetTop + detectElements[detEl].offsetHeight >= lastDetEl.offsetTop) {
            lastDetEl = detectElements[detEl]
            var navEl = document.getElementById('nav' + lastDetEl.innerHTML)
            if (lastDetEl.classList.contains('newImage')) {
              fixedImage.style.backgroundImage = "url('images/chapterImages/" + lastDetEl.innerHTML.replace(' ', '') + ".png')"
            }
            updateArrow(navEl)
          }
        }
      }
    }else { // scrolling up
      scrollPosition = contentContainer.scrollTop
      for (var detEl in detectElements) {
        if (contentContainer.scrollTop - detectElements[detEl].offsetHeight <= (detectElements[detEl].offsetTop - detectElements[0].offsetHeight)) {
          if (lastDetEl == undefined) {
            lastDetEl = detectElements[detEl]
          }
          else if (detectElements[detEl].offsetTop - detectElements[detEl].offsetHeight <= lastDetEl.offsetTop) {
            lastDetEl = detectElements[detEl]
            var navEl = document.getElementById('nav' + lastDetEl.innerHTML)
            if (lastDetEl.classList.contains('newImage')) {
              fixedImage.style.backgroundImage = "url('images/chapterImages/" + lastDetEl.innerHTML.replace(' ', '') + ".png')"
            }
            updateArrow(navEl)
          }
        }
      }
    }
  })
})

function updateArrow (el) {
  var navOffset = navSection.offsetTop
  var anchorOffset = el.offsetTop
  var anchorHeight = el.firstElementChild.offsetHeight
  console.log(anchorHeight)
  var newArrowOffset = anchorOffset - navOffset + anchorHeight / 2
  navArrow.style.top = newArrowOffset + 'px'
  for (var j = 0; j < navAnchors.length; j++) {
    navAnchors[j].parentElement.style.opacity = 0.4
  }
  el.parentElement.style.opacity = 1
  event.preventDefault()
}

function scrollTo () {
  for (var j = 0; j < navAnchors.length; j++) {
    navAnchors[j].parentElement.style.opacity = 0.4
  }
  this.parentElement.style.opacity = 1

  var target = document.getElementById(this.dataset.target)
  contentContainer.scrollTop = target.offsetTop - 10
  event.preventDefault()
}

function showContent () {
  navSection.style.width = '10%'
  navSection.style.paddingLeft = '5vh'
  contentContainer.style.width = '60%'
  contentContainer.style.paddingTop = '10vh'
  startImage.style.right = '-80vw'
  introduction.style.display = 'none'
  content.style.display = 'block'
  contentContainer.style.overflowY = 'scroll'
  event.preventDefault()
}

function showIntroduction () {
  navSection.style.width = '0%'
  navSection.style.paddingLeft = '0vh'
  contentContainer.style.width = '50%'
  startImage.style.right = '0px'
  introduction.style.display = 'block'
  content.style.display = 'none'
  contentContainer.style.overflowY = 'hidden'
  event.preventDefault()
}
