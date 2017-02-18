var fs = require('fs');
var dialogs = require('dialogs');
var content;

function readFile(file) {
	// First I want to read the file
	fs.readFile(file, function read(err, data) {
	    if (err) {
	        throw err;
	    }
	    content = data;
	    console.log(content);
    	processFile();
	});
	processFile();
}

function processFile() {
    console.log(content);
}

function addImage(name) {
	images.push(name);
}

var images = []
var teams = [955,997,1510,1540,2471,3711,4048,4488]

fs.readdir("../../../Dropbox/1540_Photos/", (err, files) => {
	files.forEach(file => {
		images.push(file);
	});
});

//x.slice(0,-3)

$(document).ready(function(){
	for (x in teams) {
		var newdiv = document.createElement("div");
		newdiv.setAttribute("id",teams[x]);
		document.body.appendChild(newdiv);
		var newtext = document.createElement("h1");
		newtext.setAttribute("id",teams[x]+"text");
		$("#"+teams[x]).append(newtext);
		$("#"+teams[x]+"text").text(teams[x]);
		$("#"+teams[x]).css("background-color","white");
		$("#"+teams[x]).css("border","solid 1px black");
	}
	for (x in images) {
		var newimg = document.createElement("img");
 	 	newimg.className="removal";
 	 	newimg.setAttribute("src","../../../Dropbox/1540_Photos/"+images[x]);
		newimg.setAttribute("width","300px");
		newimg.setAttribute("id",images[x]);
		var it = images[x].slice(3,-4);
		$("#"+it).append(newimg);
	}
	$(".removal").click(function(){
		if (confirm("Delete this photo?")) {
			var id = $(this).attr("id");
			fs.unlink("../../../Dropbox/1540_Photos/"+id);
			$(this).remove();
		}
	});
});