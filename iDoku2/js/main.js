/* jslint esversion:6 */

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

class Lichtbalken {
  constructor (x, y, backWidth, backHeight) {
    this.x = x
    this.y = y
    this.backWidth = backWidth
    this.backHeight = backHeight
    this.frontWidth = 60
    this.frontHeight = backHeight
    this.mouseDistance = 0
  }

  show () { // malt den Hintergrund des Balkens auf den Canvas
    fill(0)
    rect(this.x, this.y, this.backWidth, this.backHeight)
  }

  update() { // malt den leuchtenden Teil des Balkens auf dessen Hintergrund und updated seine Position

    // brerechnet die Position die Helligkeit des leuchtenden Teils
    if (mouseY < this.x) {
      this.mouseDistance = this.y - mouseY
    }else {
      this.mouseDistance = mouseY - this.y
    }
    if (this.backHeight.mouseDistance > 255) {
      this.mouseDistance = 255
    }

    // berechnet die Position des leuchtenden Teils
    for (var i = this.frontWidth; i >= 0; i -= 5) { // die Schleife sorgt für einen Farbverlauf
      fill(0, 0, 255 - this.mouseDistance, 255 - i * 6)
      rect(mouseX - (i / 2), this.y, i + 5, this.frontHeight)
    }
  }
}

let balken = new Lichtbalken(0, 0, window.innerWidth*0.25, window.innerHeight*0.008)

function setup () {
  var canvas = createCanvas(windowWidth*0.25, windowHeight*0.008)
  canvas.parent(canvasParent);
  frameRate(60);
}

function windowResized(){
  resizeCanvas(windowWidth*0.25, windowHeight*0.008)
}

function draw () {
  clear()
  noStroke()
  balken.show()
  balken.update()
}

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
    if (imageCounter < 2) {
      imageCounter++
      if(lastDetEl.classList.contains('gif')){
      fixedImage.style.backgroundImage = "url('images/chapterImages/" + lastDetImgEl.innerHTML.replace(' ', '') + '/' + imageCounter + ".gif')"
      }
      else{
      fixedImage.style.backgroundImage = "url('images/chapterImages/" + lastDetImgEl.innerHTML.replace(' ', '') + '/' + imageCounter + ".png')"
      }
      if (imageCounter == 2) {
        fixedImageRight.style.display = 'none'
        fixedImageLeft.style.display = 'block'

      }else {
        fixedImageRight.style.display = 'block'
        fixedImageLeft.style.display = 'block'
      }
    }
  })

  fixedImageLeft.addEventListener('click', function () {
    if (imageCounter > 1) {
      imageCounter--
      fixedImage.style.backgroundImage = "url('images/chapterImages/" + lastDetImgEl.innerHTML.replace(' ', '') + '/' + imageCounter + ".png')"
      if (imageCounter == 1) {
        fixedImageLeft.style.display = 'none'
        fixedImageRight.style.display = 'block'
      }
      else {
        fixedImageLeft.style.display = 'block'
        fixedImageRight.style.display = 'block'
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
              fixedImage.style.display = 'block';
              fixedImageLeft.style.display = 'none'
              fixedImageRight.style.display = 'block'
              imageCounter = 1
              lastDetImgEl = lastDetEl
              console.log(lastDetEl.innerHTML.replace(' ', ''));
              fixedImage.style.backgroundImage = "url('images/chapterImages/" + lastDetEl.innerHTML.replace(' ', '') + "/1.png')"
            }
              if(lastDetEl.classList.contains('noImg')){
              fixedImage.style.display = 'none';
            }
            if (lastDetEl.classList.contains('onlyOne')) {
              fixedImage.style.display = 'block';
              fixedImageLeft.style.display = 'none'
              fixedImageRight.style.display = 'none'
            }
            if(lastDetEl.classList.contains('noArrowChange')){

            }
            else{
            updateArrow(navEl)
          
            }
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
              fixedImage.style.display = 'block';
              fixedImageLeft.style.display = 'none'
              fixedImageRight.style.display = 'block'
              imageCounter = 1
              lastDetImgEl = lastDetEl
              fixedImage.style.backgroundImage = "url('images/chapterImages/" + lastDetEl.innerHTML.replace(' ', '') + "/1.png')"
            }
            if(lastDetEl.classList.contains('noImg')){
              fixedImage.style.display = 'none';
            }
            if (lastDetEl.classList.contains('onlyOne')) {
              fixedImage.style.display = 'block';
              fixedImageLeft.style.display = 'none'
              fixedImageRight.style.display = 'none'
            }
                        if(lastDetEl.classList.contains('noArrowChange')){

            }
            else{
            updateArrow(navEl)
            }
          }
        }
      }
    }
  })
})

function draw () {
  clear()
  noStroke()

  balken.show()
  balken.update()
}

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
  contentContainer.style.overflowY = 'hidden';
  contentContainer.scrollTop = 0;
  navArrow.style.top = '0vh';
    event.preventDefault()

  setTimeout(function () {     introduction.style.display = 'block'; }, 2000)
}
