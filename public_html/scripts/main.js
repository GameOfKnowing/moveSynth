var Tone = require('tone');
var synth, sLat, sLon, sAlt, pgOut, trackId, isTrack, position, freq, nLen, fMult;
fMult = 1;
synth = new Tone.Synth().toMaster();	

window.onload = function buffer(){
	pgOut = document.getElementById("myLocation");
}

window.startTrack = function(){ //starts GPS tracking
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
	initSynth(position)
}

function initSynth(position){  //Sanitizes position data for synth inpu and initializes synth
	sLat = Math.trunc((position.coords.latitude * 1000)%1000);
	sLon = Math.trunc((position.coords.longitude * 1000)%1000);
	var lenPow = 1 + (Math.abs(position.coords.latitude) / 22.5);
	lenPow = Math.trunc(lenPow);
	nLen = Math.pow(2, lenPow) + "n";
	//console.log(nLen);
	if (position.coords.altitude) {
		sAlt = Math.trunc(position.coords.altitude * 10);
		freq = Math.abs((sAlt+ Math.abs(sLon) + Math.abs(sLat))  * fMult);
		pgOut.innerHTML = pgOut.innerHTML + "<br>" + freq;
	} else {
		freq = (Math.abs(sLat) + Math.abs(sLon)) * fMult;
	}
}

window.stopTrack = function() {  //Stops GPS tracking
	if (isTrack == true) {
		isTrack = false;
		pgOut.innerHTML="NOT " + pgOut.innerHTML;
		navigator.geolocation.clearWatch(trackId);
	}
}

window.playNote = function(){
	synth.triggerAttackRelease(freq, nLen);
}

