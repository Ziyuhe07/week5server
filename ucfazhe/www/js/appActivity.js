
function menuClicked() {
			alert("You clicked the menu");
}

function replaceGraphs() {
	document.getElementById("graphdiv").innerHTML ="<img src='images/ucl.png'>"
}

	// load the map
 	var mymap = L.map('mapid').setView([51.505, -0.09], 13);
	// load the tiles
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(mymap);
	// create a variable that will hold the XMLHttpRequest() - this must be done outside a function so that all the functions can use the same variable
	var client;
	// and a variable that will hold the layer itself – we need to do this outside the function so that we can use it to remove the layer later on
	var earthquakelayer;
	// create the code to get the Earthquakes data using an XMLHttpRequest
	function getEarthquakes() {
		client = new XMLHttpRequest();
		client.open('GET','https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');
		client.onreadystatechange = earthquakeResponse; // note don't use earthquakeResponse() with brackets as that doesn't work
		client.send();
	}
	// create the code to wait for the response from the data server, and process the response once it is received
	function earthquakeResponse() {
	// this function listens out for the server to say that the data is ready - i.e. has state 4
	if (client.readyState == 4) {
	// once the data is ready, process the data
	var earthquakedata = client.responseText;
	loadEarthquakelayer(earthquakedata);
	}
	}
	// convert the received data - which is text - to JSON format and add it to the map
	function loadEarthquakelayer(earthquakedata) {
	// convert the text to JSON
	var earthquakejson = JSON.parse(earthquakedata);
	// add the JSON layer onto the map - it will appear using the default icons
	earthquakelayer = L.geoJson(earthquakejson).addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(earthquakelayer.getBounds());
	}


//Track location function
	function trackLocation() {
	if (navigator.geolocation) {
	navigator.geolocation.watchPosition(showPosition);
	} else {
	document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
	}
	}

	function showPosition(position) {
	// draw a point on the map
	L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap)
		.bindPopup("<b>You were at "+ position.coords.longitude + " "+position.coords.latitude+"!</b>");
	mymap.setView([position.coords.latitude, position.coords.longitude], 13);
}

var xhr; // define the global variable to process the AJAX request
function callDivChange() {
xhr = new XMLHttpRequest();
xhr.open("GET", "test.html", true);
xhr.onreadystatechange = processDivChange;
//try {
//xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//}
//catch (e) {
// this only works in internet explorer
//}
xhr.send();
}
function processDivChange() {
if (xhr.readyState < 4) {}// while waiting response from server
//document.getElementById('div1').innerHTML = "Loading...";
else {
	if (xhr.readyState === 4) {// 4 = Response from server has been completely loaded.
//if (xhr.status == 200 && xhr.status < 300)
// http status between 200 to 299 are all successful
		document.getElementById('div1').innerHTML = xhr.responseText;
	}
}
}

//getPOI -view data as GeoJSON
function showFormData() {
		client.open('GET','http://developer.cege.ucl.ac.uk:30271/getPOI');
		client.onreadystatechange = showFormDataResponse; // note don't use earthquakeResponse() with brackets as that doesn't work
		client.send();
	}
	// create the code to wait for the response from the data server, and process the response once it is received
	function showFormDataResponse() {
		// this function listens out for the server to say that the data is ready - i.e. has state 4
	if (client.readyState == 4) {
	// once the data is ready, process the data
	var formData = client.responseText;
	loadFormDatalayer(formData);
	}
	}
	// convert the received data - which is text - to JSON format and add it to the map
	function loadEarthquakelayer(formData) {
	// convert the text to JSON
	var formDatajson = JSON.parse(formData);
	// add the JSON layer onto the map - it will appear using the default icons
	formDatalayer = L.geoJson(formDatajson).addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(formDatalayer.getBounds());
	}