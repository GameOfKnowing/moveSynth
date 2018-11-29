var pgOut, trackId, isTrack, position;

window.onload = function buffer(){
	pgOut = document.getElementById("myLocation");
}

function startTrack() {
    isTrack = true;
    if (navigator.geolocation) {
	trackId = navigator.geolocation.watchPosition(showPosition);
    } else { 
        pgOut.innerHTML = "Geolocation is not supported by this browser.";}
    }
    
function showPosition(position) {
    	pgOut.innerHTML= "TRACKING<br>" +
	"Latitude: " + position.coords.latitude + 
    	"<br>Longitude: " + position.coords.longitude;
	if (position.coords.altitude) {
		pgOut.innerHTML = pgOut.innerHTML + "<br>Altitude: " + position.coords.altitude;
	}
}

function stopTrack() {
	if (isTrack == true) {
		isTrack = false;
		pgOut.innerHTML="NOT " + pgOut.innerHTML;
		navigator.geolocation.clearWatch(trackId);
	}
}
