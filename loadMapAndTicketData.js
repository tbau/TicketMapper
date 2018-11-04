
var lat=38, long=-81;
var map, marker;
var camInterval=-1;
var keywordBox
var keyword=" "


	var tryAPIGeolocation = function () {
		jQuery.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU",
		function (success) {
			apiGeolocationSuccess({
				coords: {
				latitude: success.location.lat,
                longitude: success.location.lng
			}
		});
	})
	.fail(function (err) {
		alert("API Geolocation error! \n\n" + err);
	});
};

    var browserGeolocationFail = function (error) {};
	
    var tryGeolocation = function () {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				browserGeolocationSuccess,
				browserGeolocationFail, {
					maximumAge: 50000,
					timeout: 20000,
					enableHighAccuracy: true
				});
			}
		};
		
		
		var apiGeolocationSuccess = function (position) {
			alert("API geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
		};
		var browserGeolocationSuccess = function (position) {
			//alert("Browser geolocation success!\n\nlat = " + position.coords.latitude + "\nlng = " + position.coords.longitude);
			lat = position.coords.latitude;
			long = position.coords.longitude;	
			
		function myMap() {

		var mapProp= {
			center:new google.maps.LatLng(lat,long),
			zoom:12,
		};
		map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
		marker = new google.maps.Marker({position: new google.maps.LatLng(lat,long)
											});
	
		google.maps.event.addListener(map, "click", function (e) {
		//map.setCenter(new google.maps.LatLng(e.latLng.lat().toFixed(6),e.latLng.lng().toFixed(6))),
		lat = e.latLng.lat().toFixed(6)
		long = e.latLng.lng().toFixed(6)
		marker.setPosition(new google.maps.LatLng(lat,long))
		//map.setZoom(12)
		});

		marker.setMap(map); 
		}
		myMap()
		var b = document.createElement("button");
		b.id="search";
		b.onclick=searchLocations;
		b.innerText="Search";
		b.style="margin-bottom:30px;margin-left:10px;margin-top:10px;";
        desc.before(b);
            
		var b = document.createElement("button");
		b.id="center";
		b.onclick=centerOnMarker;
		b.innerText="Center";
		b.style="margin-bottom:30px;margin-left:10px;margin-top:10px;";
		desc.before(b);

		var label = document.createElement("label");
		label.className="switch"
		
		var input1 = document.createElement("input");
		input1.type="checkbox";
		input1.id="camCheckBox";

		var enableCam = () =>{
			error=false;
			if(!document.getElementById("camCheckBox").checked){
				if(camInterval==-1){}
				else			
					clearInterval(camInterval);
				video.srcObject.getTracks()[0].stop();
				video.pause();
				video.src="";
			}
			else{
			start().then(function (){
			if(!error){
				if(camInterval==-1){}
				else			
					clearInterval(camInterval);
				camInterval = setInterval(snap,50)
			}});
		}
	}
		input1.onclick=enableCam;
		label.appendChild(input1);

		var span = document.createElement("span");
		span.className = "slider2 round";
		span.style="width:40px;height:20px;"

		label.appendChild(span);
		desc.before(label);

		var p = document.createElement("p");
		
		var text = document.createTextNode("Enable Cam");
		p.appendChild(text);
		p.className="unformatted";
		p.style="width:80px;height:50px;font-size:85%;display:inline-block;";
		desc.before(p);

		var div = document.createElement("div");
		div.className="slideContainer";

		input = document.createElement("input");
		input.type="range";
		input.className="slider";
		input.min="2";
		input.max="150";
		input.value="10";
		input.step="1";
		input.id="myRange";
		input.style="width:99%;margin-right:0px;margin-left:10px;";
		div.appendChild(input);

		var sliderText = document.createElement("input");
		sliderText.id="sliderText";
		sliderText.type="text";
		sliderText.disabled="disabled";
		sliderText.value="10 mi";
		sliderText.style="width:10%;margin-top:25px;margin-bottom:10px;margin-left:10px;font-size:150%;color:black;"
		div.appendChild(sliderText);

		div.style="margin-right:5px;margin-bottom:20px;"
	
		desc.before(div);
		slider = document.getElementById("myRange");
	
		slider.oninput = function() {
			//console.log(this.value);
			document.getElementById("sliderText").value=this.value+" mi";
			withinRange=this.value;
		} 

		var searchText = document.createElement("input");
		searchText.id="searchText";

		var changeKeyword = () => {

			keyword = keywordBox.value;
			//console.log(keyword);
		}

		searchText.onchange = changeKeyword
		searchText.type="text";
		searchText.placeholder="Search for keyword";
		div.appendChild(searchText);

		div.style="margin-right:5px;margin-bottom:20px;"
	
		desc.before(div);
		
		keywordBox = document.getElementById("searchText");
	};		

var desc = document.getElementById("desc");
var withinRange = 20;

var centerOnMarker = () =>
{
    map.setCenter(marker.getPosition());
    map.setZoom(12);
}
var searchLocations = () =>		
{
desc.innerHTML="";
var i=0
jQuery.ajaxSetup({async:false});

$events=[]
if(keyword==" ")
	$events[0] = $.get("https://www.eventbriteapi.com/v3/events/search/?token=2AFLZ7JARFVXM5KYHJ5K&location.latitude="+lat+"&location.longitude="+long+"&location.within="+withinRange+"mi&sort_by=best", function(data, status){
	//console.log(data)
});
else
$events[0] = $.get("https://www.eventbriteapi.com/v3/events/search/?token=2AFLZ7JARFVXM5KYHJ5K&location.latitude="+lat+"&location.longitude="+long+"&location.within="+withinRange+"mi&sort_by=best&q="+keyword, function(data, status){
	//console.log(data)
});
while(!jQuery.isEmptyObject($events[i])&&$events[i].responseJSON.pagination.has_more_items==true&&i<1){
	i=i+1
	
if(keyword==" ")
	$events[i] = $.get("https://www.eventbriteapi.com/v3/events/search/?token=2AFLZ7JARFVXM5KYHJ5K&location.latitude="+lat+"&location.longitude="+long+"&location.within=30mi&page="+($events[i-1].responseJSON.pagination.page_number+1).toString()+"&sort_by=best", function(data, status){
		//console.log(data)
	});
else
$events[i] = $.get("https://www.eventbriteapi.com/v3/events/search/?token=2AFLZ7JARFVXM5KYHJ5K&location.latitude="+lat+"&location.longitude="+long+"&location.within=30mi&page="+($events[i-1].responseJSON.pagination.page_number+1).toString()+"&sort_by=best&q="+keyword, function(data, status){
	//console.log(data)
});

}
if($events[0].responseJSON.events.length==0)
{
	alert("Search term not found");
}
else
for(var j=0;j<=i;j++)
{
	for(var k=0;k<$events[i].responseJSON.events.length;k++){
		
		var div = document.createElement("div");
		div.className="events";
		var h1 = document.createElement("h1");
		h1.className="titleName"
		h1.innerHTML+="Name: "+$events[j].responseJSON.events[k].name.text+"<br><br>"
		div.appendChild(h1)
		if($events[j].responseJSON.events[k].description.text!=null)
			div.innerHTML+="Description: "+$events[j].responseJSON.events[k].description.html+"<br><br>"
		if($events[j].responseJSON.events[k].logo!=null){
			var img = document.createElement("img");
			img.alt="Logo"
			img.src = $events[j].responseJSON.events[k].logo.url
			div.appendChild(img)
		}
		div.innerHTML+="<br><br>"
		desc.appendChild(div);
		}
}

var images = document.getElementsByTagName("img");
for (var l in images){
 images[l].width="400"
}

desc.lastChild.style="border:8px limegreen ridge;"
}
//74e072f97f7a9b8a230da8b906eac520
var slider; 
// Update the current slider value (each time you drag the slider handle)
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("top").style.display = "block";
    } else {
        document.getElementById("top").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
} 
