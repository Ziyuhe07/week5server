

function startDataUpload() {
	alert ("start data upload");
	}
	
function startDataUpload() {
	alert ("start data upload");
	var name = document.getElementById("name").value;
	var surname = document.getElementById("surname").value;
	var module = document.getElementById("module").value;
	var postString = "name="+name +"&surname="+surname+"&module="+module;
	processData(postString);
	alert(name + " "+ surname + " "+module);
}
	var checkString = "";
	for (var i = 1;i< 5;i++){
		if (document.getElementById("check"+i).checked === true) {
			checkString = checkString + document.getElementById("check"+i).value + "||"
		}

	}

// now get the geometry values
	var latitude = document.getElementById("latitude").value;
	var longitude = document.getElementById("longitude").value;
	postString = postString + "&latitude=" + latitude + "&longitude=" + longitude;
	postString = postString + "&modulelist="+checkString;

	// pull the geometry component together
	// note that well known text requires the points as longitude/latitude !
	// well known text should look like: 'POINT(-71.064544 42.28787)'
	var geometrystring = "st_geomfromtext('POINT(" + req.body.longitude + " " +
	req.body.latitude + ")'";
	var querystring = "INSERT into formdata (name,surname,module,language, modulelist, lecturetime, geom) values ('"; 
	querystring = querystring + req.body.name + "','" + req.body.surname + "','" +
	req.body.module + "','";
	querystring = querystring + req.body.language + "','" + req.body.modulelist + "','"
	+ req.body.lecturetime+"',"+geometrystring + "))";	


var client;
function processData(postString) {
	client = new XMLHttpRequest();
	client.open('POST','http://developer.cege.ucl.ac.uk:30271/uploadData',true);
	client.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	client.onreadystatechange = dataUploaded;
	client.send(postString);
	}
// create the code to wait for the response from the data server, and process the response once it is received
function dataUploaded() {
// this function listens out for the server to say that the data is ready - i.e. has state 4
	if (client.readyState == 4) {
// change the DIV to show the response
		document.getElementById("dataUploadResult").innerHTML = client.responseText;
	}
}
