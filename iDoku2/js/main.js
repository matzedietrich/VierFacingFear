
var navSection;
var navArrow;
var navAnchors;
var startButton;
var contentContainer;
var introduction;
var content;
var startImage;

document.addEventListener('DOMContentLoaded',function(){
navSection = document.getElementsByTagName("nav")[0];
navArrow = navSection.getElementsByTagName("div")[0];
navAnchors = navSection.getElementsByTagName("a");
startButton = document.getElementById("startButton");
contentContainer = document.getElementById("contentContainer");
startImage = document.getElementById("startImage");
introduction = document.getElementById("introduction");
content = document.getElementById("content");

startButton.addEventListener("click", showContent);

navAnchors[0].addEventListener("click", showIntroduction);

for(var i = 1; i < navAnchors.length; i++){
    navAnchors[i].addEventListener("click", updateArrow);
}


});


function updateArrow(el){
        var navOffset = navSection.offsetTop;
        var anchorOffset = this.offsetTop;
        var anchorHeight = this.firstElementChild.offsetHeight;
        console.log(anchorHeight);
        var newArrowOffset = anchorOffset - navOffset + anchorHeight/2;
        navArrow.style.top = newArrowOffset+"px";
        for(var j = 0; j < navAnchors.length; j++){
            navAnchors[j].parentElement.style.opacity = 0.4;
        }
        this.parentElement.style.opacity = 1;

        var target = document.getElementById(this.dataset.target);
        contentContainer.scrollTop = target.offsetTop;
        console.log(target);
    event.preventDefault();
};

function showContent(){
    navSection.style.width = "10%";
    navSection.style.paddingLeft = "5vh";
    contentContainer.style.width = "70%";
    startImage.style.right = "-80vw";
    introduction.style.display = "none";
    content.style.display = "block";
    contentContainer.style.overflowY = "scroll";
        event.preventDefault();

}

function showIntroduction(){
        navSection.style.width = "0%";
    navSection.style.paddingLeft = "0vh";
    contentContainer.style.width = "50%";
    startImage.style.right = "0px";
    introduction.style.display = "block";
    content.style.display = "none";
    contentContainer.style.overflowY = "hidden";
        event.preventDefault();


}