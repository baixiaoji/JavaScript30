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
/* 设置音量 & 播放速度 */
function handleRangeUpdate(){
    video[this.name] = this.value;
}
/* 改变Bar */
function changeBar(){
    const percent = (video.currentTime / video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}



/*绑定事件 */
video.addEventListener("click",togglePlay);
video.addEventListener("play",updateButton);
video.addEventListener("pause",updateButton);
video.addEventListener("timeupdate",changeBar);

toggle.addEventListener("click",togglePlay);
buttons.forEach(button => button.addEventListener("click",skip))
ranges.forEach(range => range.addEventListener("change",handleRangeUpdate))
ranges.forEach(range => range.addEventListener("mousemove",handleRangeUpdate))

let mousedown = false;
progress.addEventListener("click",scrub)
progress.addEventListener("mousemove",(e) => mousedown && scrub(e))
progress.addEventListener("mousedown",() => mousedown = true)
progress.addEventListener("mouseup",() => mousedown = false)
