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
        const pixwls = ctx.getImageData(0,0,width,height)
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
    link.innerHTML = `<img src="${data}" alt="Handsome Man">`
    strip.insertBefore(link,strip.firstChild)
}

getVideo();

video.addEventListener("canplay",paintToCanvas)