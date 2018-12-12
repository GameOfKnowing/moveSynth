var Tone = require('tone');
var posObj, synth, sLat, sLon, sAlt, pgOut, trackId, isTrack, freq, nLen, fMult, lenPow;
fMult = 1;
var hour = new Date().getHours(); 
console.log(hour);
synth = new Tone.Synth().toMaster();

if ((hour > 18) || (hour < 6)){
	synth.oscillator.type = "fatsine";
} else {
	synth.oscillator.type = "fatsawtooth";
}

window.onload = function buffer(){
	pgOut = document.getElementById("myLocation");
}

window.startTrack = function(){ //starts GPS tracking
	isTrack = true;
	updateBack();
	console.log(navigator.geolocation);
	if (navigator.geolocation) {
		console.log("longitude: boop");
		trackId = navigator.geolocation.watchPosition(showPosition);
		Tone.Transport.bpm.value = 120;
	} else { 
		pgOut.innerHTML = "Geolocation is not supported by this browser.";
	}
	Tone.Transport.scheduleRepeat(beeper, "2n");
	//Tone.Transport.loop = true; 
}

window.stopTrack = function() {  //Stops GPS tracking
	if (isTrack == true) {
		isTrack = false;
		pgOut.innerHTML="NOT " + pgOut.innerHTML;
		navigator.geolocation.clearWatch(trackId);
	}
	updateBack();
}

window.playStop = function() {
	transportToggle();
	updateBack();
}

function updateBack() {
	console.log("gets to update");
	if (isTrack == true) {
		document.body.style.backgroundImage = 'url(../assets/boomboxTRC.svg)';
	} else {
		document.body.style.backgroundImage = 'url(../assets/boombox.svg)';}
}

function beeper(time) {
	synth.triggerAttackRelease(freq, nLen);
}

function transportToggle(){
	if (Tone.Transport.state == "started"){
		Tone.Transport.stop();
	} else {
		Tone.Transport.start();
	}
}

function showPosition(position) {
    	posObj = position;
	pgOut.innerHTML= "";
	pgOut.innerHTML= "TRACKING<br>" +
	"Latitude: " + position.coords.latitude + 
    	"<br>Longitude: " + position.coords.longitude;
	if (position.coords.altitude !== null) {
		pgOut.innerHTML = pgOut.innerHTML + "<br>Altitude: " + position.coords.altitude;
	}
	initSynth(position)
}

function initSynth(position){  //Sanitizes position data for synth inpu and initializes synth
	sLat = Math.trunc((position.coords.latitude * 1000)%1000);
	sLon = Math.trunc((position.coords.longitude * 1000)%1000);
	lenPow = 1 + (Math.abs(position.coords.latitude) / 22.5);
	lenPow = Math.trunc(lenPow);
	nLen = Math.pow(2, lenPow) + "n";
	//console.log(nLen);
	if (position.coords.altitude !== null) {
		sAlt = Math.trunc(position.coords.altitude * 10);
		freq = Math.abs((sAlt + Math.abs(sLon) + Math.abs(sLat))  * fMult);
		pgOut.innerHTML = pgOut.innerHTML + "<br>" + freq;
	} else {
		freq = (Math.abs(sLat) + Math.abs(sLon)) * fMult;
	}
}


