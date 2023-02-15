const carousel = document.querySelector(".carousel");
const FirstImg = carousel.querySelectorAll("img")[0];
const ArrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, prevPageX, prevscrollLeft;
let FirstImgWidth = FirstImg.clientWidth + 14; 
let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

const showSlideHidden = () => {
    ArrowIcons[0].style.display = carousel.scrollLeft == 0? "none" : "block"
    ArrowIcons[1].style.display = carousel.scrollLeft == scrollWidth? "none" : "block"
 
}


ArrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        carousel.scrollLeft += icon.id === "left"? -FirstImgWidth : FirstImgWidth;
        showSlideHidden()
        setTimeout(() => showSlideHidden(), 60)
    })
})



const dragStart =(e) => {
 isDragStart = true;
 prevPageX = e.pageX || e.touches[0].pageX;
 prevscrollLeft = carousel.scrollLeft;
}

const dragging = (e) =>{
    if(!isDragStart) return;
    e.preventDefault();
    carousel.classList.add("dragging")
    let PositionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevscrollLeft - PositionDiff;
    showSlideHidden()
}

const dragStop = () => {
isDragStart = false;
carousel.classList.remove("dragging")
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart)

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragStart)

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStart)