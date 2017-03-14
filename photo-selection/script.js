var fs = require('fs');
var auto = require('jpeg-autorotate');
var options = {quality: 85};
var Dialogs = require('dialogs');
var dialogs = Dialogs(opts={})
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
				img.setAttribute("id","A-"+id.slice(2));
				return;
			} else if (orientation==6) {
				img.style.transform = "rotate(90deg)";
				renameFile(todb+id,todb+"C-"+id.slice(2));
				img.setAttribute("id","C-"+id.slice(2));
			} else if (orientation==3) {
				img.style.transform = "rotate(180deg)";
				renameFile(todb+id,todb+"B-"+id.slice(2));
				img.setAttribute("id","B-"+id.slice(2));
			} else if (orientation==8) {
				img.style.transform = "rotate(270deg)";
				renameFile(todb+id,todb+"D-"+id.slice(2));
				img.setAttribute("id","D-"+id.slice(2));
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
var teams_wilsonville = [568,753,847,955,957,997,1359,1425,1432,2411,2471,2521,2550,2635,2733,2811,2915,2990,3024,3574,3636,3673,3674,3711,4043,4051,4057,4060,4110,4488,5085,5198,5977,6343,6437,6443,6445,6456,6465]
var teams = [753,847,955,957,997,1425,1510,1571,2002,2374,2521,2550,2811,2898,2990,3131,3673,3674,4043,4051,4057,4110,4127,4132,4488,4662,4692,5085,5198,5468,5956,5970,6442,6445,6456,6696]
var teams_notes = {753:"",847:"",955:"On our alliance at Wilsonville.",957:"",997:"",1425:"",1510:"",1571:"",2002:"",2374:"",2521:"",2550:"The top ranked robot at Wilsonville.",2811:"",2898:"",2990:"",3131:"",3673:"",3674:"On our alliance at Wilsonville.",4043:"",4051:"",4057:"",4110:"",4127:"",4132:"",4488:"",4662:"",4692:"",5085:"",5198:"Can attach a climber.",5468:"",5956:"",5970:"",6442:"",6445:"",6456:"",6696:""}
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
		var notes = document.createElement("h4");
		notes.setAttribute("id",teams[x]+"notes");
		$("#"+teams[x]).append(notes);
		$("#"+teams[x]+"notes").text(teams_notes[teams[x]]);
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
		}
	}
	$(".removal").click(function(){
		var th = $(this);
		var id = $(this).attr("id");
		if (progress==images.length) {
			dialogs.confirm("Delete this photo?", function(ok) {
				if (ok) {
					fs.unlink("../../../Dropbox/1540_Photos/"+id);
					th.remove();
				}
			});
		}
	});
});