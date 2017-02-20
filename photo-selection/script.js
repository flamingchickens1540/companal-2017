var fs = require('fs');
var auto = require('jpeg-autorotate');
var options = {quality: 85};
var content;

function rotate(path,img,name) {
	auto.rotate(path, options, function(error, buffer, orientation) {
		progress+=1;
		if (progress==images.length) {
			$("#holder").show();
			$("#load").hide();
		}
		var val = parseInt($("#"+name).attr("value"));
		img.style.top-=val*2;
		img.style.position = "relative";
		if (error) {
			return;
		}
		if (orientation==6) {
			img.style.transform = "rotate(90deg)";
		} else if (orientation==3) {
			img.setAttribute("style","transform:rotate(180deg)");
		} else if (orientation==8) {
			img.setAttribute("style","transform:rotate(270deg)");
		}
		var y = img.naturalWidth/img.width;
		var z = ((img.height)/y-img.width)/2;
		img.style.top=parseInt((img.style.top).slice(0,-2))-z;
		$("#"+name).attr("value",val+z);
		$("#"+name).append(document.createElement("br"));
		$("#"+name).append(document.createElement("br"));
		$("#"+name).append(document.createElement("br"));
		$("#"+name).append(document.createElement("br"));
	});
}

function readFile(file) {
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

var progress = 0;
var images = []
var teams = [847,955,957,997,1359,1425,1510,1571,2374,2471,2521,2990,3024,3636,3711,4043,4125,4488,5085,5970,5975]

fs.readdir("../../../Dropbox/1540_Photos/", (err, files) => {
	files.forEach(file => {
		images.push(file);
	});
});

$(document).ready(function(){
	$("#holder").hide();
	for (x in teams) {
		var newdiv = document.createElement("div");
		var newtext = document.createElement("h1");
		newdiv.setAttribute("id",teams[x]);
		$("#holder").append(newdiv);
		newtext.setAttribute("id",teams[x]+"text");
		$("#"+teams[x]).append(newtext);
		$("#"+teams[x]+"text").text(teams[x]);
		$("#"+teams[x]).css("background-color","white");
		$("#"+teams[x]).css("border","solid 1px black");
		$("#"+teams[x]).attr("value",0);
	}
	for (x in images) {
		var newimg = document.createElement("img");
		var it = images[x].slice(3,-4);
 	 	newimg.className="removal";
 	 	newimg.setAttribute("src","../../../Dropbox/1540_Photos/"+images[x]);
		newimg.setAttribute("width","300px");
		newimg.setAttribute("id",images[x]);
		rotate("../../../Dropbox/1540_Photos/"+images[x],newimg,it);
		$("#"+it).append(newimg);
		$("#"+it).append(document.createElement("br"));
		$("#"+it).append(document.createElement("br"));
	}
	$(".removal").click(function(){
		if (progress==images.length) {
			if (confirm("Delete this photo?")) {
				var id = $(this).attr("id");
				fs.unlink("../../../Dropbox/1540_Photos/"+id);
				$(this).remove();
			}
		}
	});
});