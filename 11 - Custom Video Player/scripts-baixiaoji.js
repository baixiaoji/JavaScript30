/*DOM对象 */
const player = document.querySelector(".player")
const video = player.querySelector(".viewer")
const progress = player.querySelector(".progress") 
const progressBar = player.querySelector(".progress__filled") 
const toggle = player.querySelector(".toggle")
const ranges = player.querySelectorAll(".player__slider")
const buttons = player.querySelectorAll("[data-skip]")

/*事件函数 */
function play(){
    if(video.paused){
        video.play()
    }else{
        video.pause()
    }
}
/*绑定事件 */
video.addEventListener("click",play)
toggle.addEventListener("click",play)