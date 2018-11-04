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

## Inspiration
The inspiration for this project mainly came from the technologies that I wanted to use for this project.
I was originally going to do something with image processing, but I didn't find anything I wanted to use that for.
I was already using the same technology stack, so I decided to look into the EventBrite api and that is when I came up with the idea for the project. 

## What it does
It is a website that displays a map of where you are. You can then search the surrounding area for different events. It then displays all of this information onto a neatly formatted webpage. There are also some fun things included in the website such as I used image processing so that if you put a black object in front of the camera, the page will scroll down, and if you put a white object in front of the camera, it will scroll up.

## How I built it
I built everything using HTML5, CSS3, JavaScript, and JQuery. I coded everything in Visual Studio Code. Most of the code is probably JavaScript. It uses the Google Map api for the map. It then uses JavaScript to dynamically place the buttons and sliders onto the page. Once the user clicks search, it uses a call to the EventBrite api, and displays the returned information on the page.

## Challenges I ran into
Some of the challenges I ran into are mainly getting the page to look how I wanted it too. I also had some trouble with the EventBrite api at first and figuring out the different calls and switches that I can use.

## Accomplishments that I'm proud of
I am really proud that I got Google Maps to work, as well as getting the image detection to work.

## What I learned
I learned a lot about a couple of different web technologies and how to use them. I learned more about JQuery, and I have become more comfortable with JavaScript in the process.

## What's next for TicketMapper
So some things that could be added for TicketMapper is integrating maybe a Weather api to determine if events are rained out, using more advanced filtering to find events that people are looking for, and fixing some of the formatting for the returned data. Another thing that could be added is integration with perhaps a calendar app, so users can keep track of the events they have coming up.