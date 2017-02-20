var fs = require('fs');
var auto = require('jpeg-autorotate');
var options = {quality: 85};
var content;

function rotate(path,img,name) {
	var id = img.getAttribute("id");
	var todb = "../../../Dropbox/1540_Photos/";
	var c = id.slice(0,-1*(id.length-1));
	if (c=="Z") {
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
				renameFile(todb+id,todb+"A-"+id.slice(2));
				return;
			} else if (orientation==6) {
				img.style.transform = "rotate(90deg)";
				renameFile(todb+id,todb+"C-"+id.slice(2));
			} else if (orientation==3) {
				img.style.transform = "rotate(180deg)";
				renameFile(todb+id,todb+"B-"+id.slice(2));
			} else if (orientation==8) {
				img.style.transform = "rotate(270deg)";
				renameFile(todb+id,todb+"D-"+id.slice(2));
			}
			var z = ((img.naturalHeight)/(img.naturalWidth/img.width)-img.width)/2;
			console.log(z+" "+img.naturalHeight);
			img.style.top=parseInt((img.style.top).slice(0,-2))-z;
			$("#"+name).attr("value",val+z);
			$("#"+name).append(document.createElement("br"));
			$("#"+name).append(document.createElement("br"));
			$("#"+name).append(document.createElement("br"));
			$("#"+name).append(document.createElement("br"));
		});
	} else {
		progress+=1;
		if (progress==images.length) {
			$("#holder").show();
			$("#load").hide();
		}
		var val = parseInt($("#"+name).attr("value"));
		img.style.top-=(val*2);
		img.style.position = "relative";
		if (c=="A") {
			return;
		} else if (c=="C") {
			img.style.transform = "rotate(90deg)";
		} else if (c=="B") {
			img.style.transform = "rotate(180deg)";
		} else if (c=="D") {
			img.style.transform = "rotate(270deg)";
		}
		img.style.top=parseInt((img.style.top).slice(0,-2))-37;
		$("#"+name).attr("value",val);
		$("#"+name).append(document.createElement("br"));
		$("#"+name).append(document.createElement("br"));
		$("#"+name).append(document.createElement("br"));
		$("#"+name).append(document.createElement("br"));
	}
}

function renameFile(oldPath,newPath) {
	fs.rename(oldPath,newPath, (err) => {
		if (err) throw err;
		console.log('renamed complete');
	});
}

function readFile(file) {
	fs.readFile(file, function read(err, data) {
	    if (err) {
	        throw err;
	    }
	    content = data;
	    console.log(content);
	});
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
	images.shift();
	for (x in images) {
		var newimg = document.createElement("img");
		var it = images[x].slice(5,-4);
		if ($("#"+it).length) {
		 	newimg.className="removal";
		 	newimg.setAttribute("src","../../../Dropbox/1540_Photos/"+images[x]);
			newimg.setAttribute("width","300px");
			newimg.setAttribute("id",images[x]);
			rotate("../../../Dropbox/1540_Photos/"+images[x],newimg,it);
			$("#"+it).append(newimg);
			$("#"+it).append(document.createElement("br"));
			$("#"+it).append(document.createElement("br"));
		} else {
			progress+=1;
			if (progress==images.length) {
				$("#holder").show();
				$("#load").hide();
			}
			fs.unlink("../../../Dropbox/1540_Photos/"+images[x]);
		}
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