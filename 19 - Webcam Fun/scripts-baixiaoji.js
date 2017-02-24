const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    // open the camera 
    navigator.mediaDevices.getUserMedia({video:true,audio:false})
    // return the Primose
    .then((localMediaStream) =>{
       console.log(localMediaStream)
        video.src = window.URL.createObjectURL( localMediaStream );
        video.play()
    })
    //报错
    .catch(err =>{
        console.error(`OH NO!!!`,err)
    })
}
// paint to canvas
function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height =height;

    return setInterval(()=>{
        ctx.drawImage(video,0,0,width,height);
        // 获像素
        let pixels = ctx.getImageData(0,0,width,height);
       // 打乱像素
        pixels = redEffect(pixels);
        // 分离
        // pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.8;
        // 不能理解
        // pixels = greenScreen(pixels);
        ctx.putImageData(pixels,0,0)
    },16)
}
// screenshot
function takePhoto(){
    // shot sound
    snap.currentTime = 0;
    snap.play();
    // take the data out of the canvas
    const data = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download","handsome")
    link.innerHTML = `<img src="${data}" alt="Handsome Man"><div class="tip">点击下载</div>`
    strip.insertBefore(link,strip.firstChild)
}

function redEffect(pixels){
    for(let i = 0; i < pixels.data.length;i+=4){
        pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
        pixels.data[i + 1] = pixels.data[i + 1] -50; //green
        pixels.data[i + 2] = pixels.data[i + 2] *0.5; //blue
    }
    return pixels;
}

function rgbSplit(pixels){
    for(let i = 0; i < pixels.data.length;i+=4){
        pixels.data[i - 150] = pixels.data[i + 0]; // red
        pixels.data[i + 500] = pixels.data[i + 1]; //green
        pixels.data[i - 550] = pixels.data[i + 2]; //blue
    }
    return pixels;
}
// 不能理解
function greenScreen(pixels){
    const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    red = pixels.data[i + 0];
    green = pixels.data[i + 1];
    blue = pixels.data[i + 2];
    alpha = pixels.data[i + 3];

    if (red >= levels.rmin
      && green >= levels.gmin
      && blue >= levels.bmin
      && red <= levels.rmax
      && green <= levels.gmax
      && blue <= levels.bmax) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

getVideo();

video.addEventListener("canplay",paintToCanvas)