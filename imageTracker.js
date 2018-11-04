var video = document.querySelector("#video");
var stream=null;
var start = () => navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(log);

error=false;
var log = () => {error=true}  

var canvas1 = document.createElement("canvas");

var img1 = document.getElementById("img1")
var img2 = document.getElementById("img2")

img1.width=video.width/2
img2.width=video.width/2

var imgData

var update = () => {
	canvas1.getContext('2d').drawImage(video, 0, 0, video.width,video.height);
    // canvas.getContext('2d').drawImage(document.getElementById("img1"), 0, 0);
    imgData = canvas1.getContext('2d').getImageData(0, 0, video.width, video.height).data;
}

var snap = () => {
    update();
    createImageFromARGBdataDetectWhite(canvas1,imgData,video.width,video.height,225,250,225); 
   //  img1.src = canvas1.toDataURL();

    createImageFromARGBdataDetectBlack(canvas1,imgData,video.width,video.height,225,250,225); 
   // img2.src = canvas1.toDataURL();

}

function createImageFromARGBdataDetectWhite(canvas, rgbData, width, height, r,g,b)
{
	
	r = g = b = 165;
	canvas.width = width;
	canvas.height = height;
	
	var mContext = canvas.getContext('2d');
	var mImgData = mContext.createImageData(width, height);
	
    var i=0, curPixelNum=0;
    
    var count=0
	
	for (curPixelNum=0; curPixelNum<width*height; curPixelNum++)
	{
        if (rgbData[i] > r&&rgbData[i+1] > g&&rgbData[i+2] > b){
            mImgData.data[i]=0;
            mImgData.data[i+1]=0;
            mImgData.data[i+2]=0;
            count+=1;
        }		    
        else{
            mImgData.data[i] = rgbData[i];		
            mImgData.data[i+1] = rgbData[i+1];
            mImgData.data[i+2] = rgbData[i+2];
           
        }
        mImgData.data[i+3] = rgbData[i+3]; 
	    i += 4;
    }
    if(count>width*height/4){
     //   console.log("White");
     document.body.scrollTop -= 50; // For Safari
     document.documentElement.scrollTop -= 50; 

    }
	mContext.putImageData(mImgData, 0, 0);
	//return canvas;
}

function createImageFromARGBdataDetectBlack(canvas, rgbData, width, height, r,g,b)
{
	
	r = g = b = 50;
	canvas.width = width;
	canvas.height = height;
	
	var mContext = canvas.getContext('2d');
	var mImgData = mContext.createImageData(width, height);
	
    var i=0, curPixelNum=0;
    
    var count=0
	
	for (curPixelNum=0; curPixelNum<width*height; curPixelNum++)
	{
        if (rgbData[i] < r&&rgbData[i+1] < g&&rgbData[i+2] < b){
            mImgData.data[i]=255;
            mImgData.data[i+1]=255;
            mImgData.data[i+2]=255;
            count+=1;
        }		    
        else{
            mImgData.data[i] = rgbData[i];		
            mImgData.data[i+1] = rgbData[i+1];
            mImgData.data[i+2] = rgbData[i+2];
           
        }
        mImgData.data[i+3] = rgbData[i+3]; 
	    i += 4;
    }
    if(count>width*height/4){
      document.body.scrollTop += 50; // For Safari
      document.documentElement.scrollTop += 50; 

        //console.log("Black");
    }
	mContext.putImageData(mImgData, 0, 0);
	//return canvas;
}

