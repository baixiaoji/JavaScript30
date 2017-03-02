
/**
 * 明确是做一个 「倒计时的提醒器」 
 * 需求
 *  1. 会有倒计时，将来时间的提醒
 *  2. 按钮设置，form提交
  */
  let countTimer;
  const timerBox = document.querySelector(".display__time-left")
  const endTime = document.querySelector(".display__end-time")
  const buttons = document.querySelectorAll("[data-time]")
  function timer(seconds){
    clearInterval(countTimer)
    const now = Date.now(); //返回1970 1/1 至今的 毫秒数
    const then = now + seconds*1000;  
    displayTimer(seconds)
    endTimer(then)
    countTimer = setInterval(() =>{
      
      const secondLeft = Math.round( (then - Date.now()) / 1000 );
        if(secondLeft <= 0){
          clearInterval(countTimer)
        }
      
      displayTimer(secondLeft)
    
    },1000);
  }
// 计时器
  function displayTimer(seconds){
    const minutes = Math.floor( seconds/60 );
    const remainSeconds = seconds % 60;
    let display = `${minutes}:${remainSeconds < 10 ? "0":""}${remainSeconds}`;
    timerBox.textContent = display;
  }

// 展示结束时间
function endTimer(timestamp){
  const end = new Date(timestamp);

  const hour = end.getHours();
  const AmericaHours = hour > 12 ? hour - 12 : hour;
  const minutes = end.getMinutes();

  endTime.textContent = `记得${AmericaHours}:${minutes < 10 ? "0" : ""}${minutes}回来`;
}
function startTimer(){
    const seconds = parseInt( this.dataset.time );     
    timer( seconds )
}

buttons.forEach(button => button.addEventListener("click",startTimer))

document.customForm.addEventListener("submit",function(e){
  e.preventDefault();
 const value = this.minutes.value;
 timer(value*60)
 this.reset();
})