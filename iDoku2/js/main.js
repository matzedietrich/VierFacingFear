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
var lastDetImgEl
var scrollPosition = 0
var fixedImage
var imgPreload
var fixedImageLeft
var fixedImageRight
var image1
var image2
var image3
var imageCounter = 1

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
  fixedImageLeft = document.getElementById('left')
  fixedImageRight = document.getElementById('right')

  imgPreload = document.getElementById('imgPreload')

  startButton.addEventListener('click', showContent)

  fixedImageRight.addEventListener('click', function () {
    if (imageCounter < 3) {
      imageCounter++
      fixedImage.style.backgroundImage = "url('images/chapterImages/" + lastDetImgEl.innerHTML.replace(' ', '') + '/' + imageCounter + ".png')"
            if(imageCounter == 3){
        fixedImageRight.style.display = "none";
      }
      else{
          fixedImageRight.style.display = "block";
          fixedImageLeft.style.display = "block";
      }
    }
  })

  fixedImageLeft.addEventListener('click', function () {
    if (imageCounter > 1) {
      imageCounter--
      fixedImage.style.backgroundImage = "url('images/chapterImages/" + lastDetImgEl.innerHTML.replace(' ', '') + '/' + imageCounter + ".png')"
      if(imageCounter == 1){
        fixedImageLeft.style.display = "none";
      }
      else{
          fixedImageLeft.style.display = "block";
          fixedImageRight.style.display = "block";

      }
    }
  })

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
            if (lastDetEl.classList.contains('newImage') && lastDetEl != lastDetImgEl) {
              fixedImageLeft.style.display = "none";
              fixedImageRight.style.display = "block";
              imageCounter = 1
              lastDetImgEl = lastDetEl
              fixedImage.style.backgroundImage = "url('images/chapterImages/" + lastDetEl.innerHTML.replace(' ', '') + "/1.png')"
            }
            if(lastDetEl.classList.contains('onlyOne')){
              fixedImageLeft.style.display = "none";
              fixedImageRight.style.display = "none";
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
            if (lastDetEl.classList.contains('newImage') && lastDetEl != lastDetImgEl) {
              fixedImageLeft.style.display = "none";
              fixedImageRight.style.display = "block";
              imageCounter = 1
              lastDetImgEl = lastDetEl
              fixedImage.style.backgroundImage = "url('images/chapterImages/" + lastDetEl.innerHTML.replace(' ', '') + "/1.png')"
            }
            if(lastDetEl.classList.contains('onlyOne')){
              fixedImageLeft.style.display = "none";
              fixedImageRight.style.display = "none";
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
  contentContainer.style.overflowY = 'scroll'
  setTimeout(function () {   content.style.display = 'block'; }, 2000)
  event.preventDefault()
}

function showIntroduction () {
  navSection.style.width = '0%'
  navSection.style.paddingLeft = '0vh'
  contentContainer.style.width = '50%'
  startImage.style.right = '0px'
  content.style.display = 'none'
  contentContainer.style.overflowY = 'hidden'
  setTimeout(function () {     introduction.style.display = 'block'; }, 2000)
  event.preventDefault()
}
