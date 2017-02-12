/*DOM对象 */
const player = document.querySelector(".player")
const video = player.querySelector(".viewer")
const progress = player.querySelector(".progress") 
const progressBar = player.querySelector(".progress__filled") 
const toggle = player.querySelector(".toggle")
const ranges = player.querySelectorAll(".player__slider")
const buttons = player.querySelectorAll("[data-skip]")

/*事件函数 */
function togglePlay(){
    const method = video.paused ? "play":"pause";
    video[method]();
}
/*改变button */
function updateButton(){
    const icon = video.paused ? '►' : '❚ ❚';
    // console.log(icon);
    toggle.textContent = icon;
}
/* 快进 & 回退 */
function skip(){
    video.currentTime += parseFloat(this.dataset.skip)
}



/*绑定事件 */
video.addEventListener("click",togglePlay);
video.addEventListener("play",updateButton);
video.addEventListener("pause",updateButton);

toggle.addEventListener("click",togglePlay);
buttons.forEach(button => button.addEventListener("click",skip))