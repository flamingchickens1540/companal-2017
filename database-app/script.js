var fs = require('fs-extra');
var Dialogs = require('dialogs');
var dialogs = Dialogs(opts={})
window.$ = window.jQuery = require('jquery');

//Useful universal functions
function createFile(file,text) {
	fs.writeFileSync(file, text);
}
function appendFile(file,text) {
	fs.appendFileSync(file,text);
}
function deleteFile(fileName){
	fs.unlinkSync(fileName);
}
function renameFile(oldPath,newPath) {
	fs.renameSync(oldPath,newPath);
}
function getKeyByValue(object, value) {
	return Object.keys(object).find(key => object[key] === value);
}
function contains(a, obj) {
	var i = a.length;
	while (i--) {
		if (a[i] === obj) {
			return true;
		}
	}
	return false;
}
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
function integer(thing) {
	if (typeof thing=="string") {
		thing = parseInt(thing);
		return thing;
	} else if (typeof thing!="number") {
		return null;
	}
	return thing;
}
function isKey(obj, key) {
	return key in obj;
}

//Files In Data-Collect
var manifest_pit = [];
var manifest_stand = [];

//List of Teams
var teams = [753,847,955,957,997,1425,1510,1540,1571,2002,2374,2521,2550,2811,2898,2990,3131,3673,3674,4043,4051,4057,4110,4127,4132,4488,4662,4692,5085,5198,5468,5956,5970,6442,6445,6456,6696]

//Stores:
//Member ID
//Total Number of Matches Scoutes
var scoutcount = {
	"98": 0,
	"50": 0,
	"60": 0,
	"64": 0,
	"66": 0,
	"81": 0,
	"24": 0,
	"25": 0,
	"20": 0,
	"21": 0,
	"22": 0,
	"23": 0,
	"44": 0,
	"40": 0,
	"41": 0,
	"96": 0,
	"77": 0,
	"76": 0,
	"72": 0,
	"97": 0,
	"58": 0,
	"99": 0,
	"13": 0,
	"12": 0,
	"15": 0,
	"14": 0,
	"17": 0,
	"16": 0,
	"19": 0,
	"18": 0,
	"30": 0,
	"37": 0,
	"36": 0,
	"34": 0,
	"33": 0,
	"55": 0,
	"48": 0
};

//Stores:
//Member ID
//Member Name
var accounts = {
	"98": "Adolfo",
	"50": "Noor", 
	"60": "Nicholas", 
	"64": "David", 
	"66": "Alexander Y", 
	"81": "Holly", 
	"24": "Zack", 
	"25": "Ruby", 
	"20": "Lauren Mei", 
	"21": "Hammad", 
	"22": "Robin", 
	"23": "Claire", 
	"44": "Hannah", 
	"40": "Fin", 
	"41": "Amber", 
	"96": "Liam B", 
	"77": "Bailey", 
	"76": "Spencer", 
	"72": "Aarushi", 
	"97": "Marti", 
	"58": "Quinn", 
	"99": "Jake", 
	"13": "Andrei", 
	"12": "Alexander M", 
	"15": "Tristan", 
	"14": "Jonathan", 
	"17": "Avery", 
	"16": "Tyler", 
	"19": "Kobi", 
	"18": "Ryan", 
	"30": "Josephine", 
	"37": "Kean", 
	"36": "Liam W",
	"34": "Ben J", 
	"33": "Culla", 
	"55": "Dylan", 
	"48": "Natalie"
};

//Imports Previous Files
function start() {
	createTable();
	if (fs.existsSync('data-collect/stand-scouting/manifest.json')) {
		manifest_stand = JSON.parse(fs.readFileSync('data-collect/stand-scouting/manifest.json'));
 	}
 	if (fs.existsSync('data-collect/pit-scouting/manifest.json')) {
		manifest_pit = JSON.parse(fs.readFileSync('data-collect/pit-scouting/manifest.json'));
	}
	//Load Stand
	for (x in manifest_stand) {
		if (fs.existsSync('data-collect/stand-scouting/'+manifest_stand[x])) {
			var data = JSON.parse(fs.readFileSync('data-collect/stand-scouting/'+manifest_stand[x]));
			scoutcount[data.scoutId]+=1;
		}
	}
	//Load Pit
	for (x in manifest_pit) {
		if (fs.existsSync('data-collect/pit-scouting/'+manifest_pit[x])) {
			var data = JSON.parse(fs.readFileSync('data-collect/pit-scouting/'+manifest_pit[x]));
			scoutcount[data.scoutIds[0]]+=1;
          	if (data.scoutIds[1]!="-") {
				scoutcount[data.scoutIds[1]]+=1;
			}
		}
	}
	updateTable();
}

//Imports Incoming Pit Data
function importPit() {
	if (navigator.appVersion.indexOf('Mac') != -1) {
		if (fs.existsSync('/Volumes/1540/')) {
			jsonTxt = fs.readFileSync('/Volumes/1540/companal/pit-scouting/manifest.json');
			manifestArray = JSON.parse(jsonTxt);
			for (var team in manifestArray) {
				if (!fs.existsSync('data-collect/pit-scouting/'+manifestArray[team]) && fs.existsSync('/Volumes/1540/companal/pit-scouting/' + manifestArray[team])) {
					var txt = fs.readFileSync('/Volumes/1540/companal/pit-scouting/' + manifestArray[team]);
					var teamData = JSON.parse(txt);
					scoutcount[teamData.scoutIds[0]]+=1;
					if (teamData.scoutIds[1]!="-") {
						scoutcount[teamData.scoutIds[1]]+=1;
					}
					manifest_pit.push(manifestArray[team]);
					createFile("data-collect/pit-scouting/manifest.json",JSON.stringify(manifest_pit));
					createFile("data-collect/pit-scouting/"+manifestArray[team],txt);
				}
			}
			$("#impPit").addClass("disabled");
			updateTable();
			dialogs.alert('Done importing data!');
		} else {
			dialogs.alert('The USB not inserted properly');
		}
	} else {
		dialogs.alert('Oops! Something went wrong');
	}
}

//Imports Incoming Stand Data
function importStand() {
	if (navigator.appVersion.indexOf('Mac') != -1) {
		if (fs.existsSync('/Volumes/1540/')) {
			var jsonTxt = fs.readFileSync('/Volumes/1540/companal/stand-scouting/manifest.json');
			var manifestArray = JSON.parse(jsonTxt);
			for (var team in manifestArray) {
				if (!fs.existsSync('data-collect/stand-scouting/'+manifestArray[team]) && fs.existsSync('/Volumes/1540/companal/stand-scouting/'+manifestArray[team])) {
					var txt = fs.readFileSync('/Volumes/1540/companal/stand-scouting/'+manifestArray[team]);
					var data = JSON.parse(txt);
					manifest_stand.push(manifestArray[team]);
          			scoutcount[data.scoutId]+=1;
          			createFile("data-collect/stand-scouting/"+manifestArray[team],JSON.stringify(data));
				}
			}
			$("#impStand").addClass("disabled");
			createFile("data-collect/stand-scouting/manifest.json",JSON.stringify(manifest_stand));
			dialogs.alert('Done importing data!');
			updateTable();
		} else {
			dialogs.alert('The USB not inserted properly');
		}
	} else {
		dialogs.alert('Oops! Something went wrong');
	}
}

//Exports Data To Flashdrive
function exportData() {
	//alexander code
	if (fs.existsSync('/Volumes/1540')) {
		$("#export").addClass("disabled");
		$("#impStand").addClass("disabled");
		$("#impPit").addClass("disabled");
		$("#new").removeClass("disabled");
		fs.copySync('data-collect/stand-scouting/', '/Volumes/1540/companal/output/stand-scouting/')
		fs.copySync('data-collect/pit-scouting/', '/Volumes/1540/companal/output/pit-scouting/')
	} else {
		dialogs.alert("The USB is not inserted properly.");
	}
}

//Creates The Tables
function createTable() {
	var keys = Object.keys(accounts);
	for (x in keys) {
		var name = accounts[keys[x]];
		var id = keys[x]
		var tr = document.createElement("tr");
		tr.setAttribute("id",id+"row")
		$("#tbody").append(tr);
		var td = document.createElement("td");
		td.setAttribute("id",id+"id");
		$("#"+id+"row").append(td);
		$("#"+id+"id").text(id);
		var td2 = document.createElement("td");
		td2.setAttribute("id",id+"name");
		$("#"+id+"row").append(td2);
		$("#"+id+"name").text(name);
		var td3 = document.createElement("td");
		td3.setAttribute("id",id+"num");
		$("#"+id+"row").append(td3);
		$("#"+id+"num").text(scoutcount[id][0]);
	}
	for (match=1;match<=80;match+=1) {
		var tr = document.createElement("tr");
		tr.setAttribute("id","m"+match+"row");
		$("#matchBody").append(tr);
		var tnum = document.createElement("td");
		tnum.setAttribute("id","m"+match+"num");
		$("#m"+match+"row").append(tnum);
		$("#m"+match+"num").text(match);
		var r1 = document.createElement("td");
		r1.setAttribute("id","m"+match+"r1");
		$("#m"+match+"row").append(r1);
		$("#m"+match+"r1").text("0");
		var r2 = document.createElement("td");
		r2.setAttribute("id","m"+match+"r2");
		$("#m"+match+"row").append(r2);
		$("#m"+match+"r2").text("0");
		var r3 = document.createElement("td");
		r3.setAttribute("id","m"+match+"r3");
		$("#m"+match+"row").append(r3);
		$("#m"+match+"r3").text("0");
		var b1 = document.createElement("td");
		b1.setAttribute("id","m"+match+"b1");
		$("#m"+match+"row").append(b1);
		$("#m"+match+"b1").text("0");
		var b2 = document.createElement("td");
		b2.setAttribute("id","m"+match+"b2");
		$("#m"+match+"row").append(b2);
		$("#m"+match+"b2").text("0");
		var b3 = document.createElement("td");
		b3.setAttribute("id","m"+match+"b3");
		$("#m"+match+"row").append(b3);
		$("#m"+match+"b3").text("0");
	}
	for (x in teams) {
		var team = teams[x];
		var tr = document.createElement("tr");
		tr.setAttribute("id","r"+team+"row");
		$("#robotBody").append(tr);
		var name = document.createElement("td");
		name.setAttribute("id","r"+team+"bot");
		$("#r"+team+"row").append(name);
		$("#r"+team+"bot").text(team);
		var pit = document.createElement("td");
		pit.setAttribute("id","r"+team+"pit");
		$("#r"+team+"row").append(pit);
		$("#r"+team+"pit").text("False");
		var stand = document.createElement("td");
		stand.setAttribute("id","r"+team+"stand");
		$("#r"+team+"row").append(stand);
		$("#r"+team+"stand").text("0");
	}
}

//Updates The Tables
function updateTable() {
	var keys = Object.keys(accounts);
	for (x in keys) {
		var id = keys[x];
		$("#"+id+"num").text(scoutcount[id]);
	}
	for (x in manifest_stand) {
		var match = manifest_stand[x];
		if (fs.existsSync("data-collect/stand-scouting/"+match)) {
			var file = JSON.parse(fs.readFileSync("data-collect/stand-scouting/"+match));
			var scout = file.matchNumber;
			var role = file.role;
			var team = file.teamNumber;
			var text = $("#m"+scout+role).text();
			var num = $("#r"+team+"stand").text();
			$("#m"+scout+role).text(parseInt(text)+1);
			$("#r"+team+"stand").text(parseInt(num)+1);
		}
	}
	for (x in manifest_pit) {
		var pit = manifest_pit[x];
		if (fs.existsSync("data-collect/pit-scouting/"+pit)) {
			var file = JSON.parse(fs.readFileSync("data-collect/pit-scouting/"+pit));
			var team = file.teamNumber;
			$("#r"+team+"pit").text("True");
		}
	}
}

//Allows Uploading Of More Pit and Stand Data
function newFlash() {
	$("#impPit").removeClass("disabled");
	$("#impStand").removeClass("disabled");
	$("#export").removeClass("disabled");
	$("#new").addClass("disabled");
}

//Buttons
$("#impPit").click(function(){
	if (!$(this).hasClass("disabled")) {
		importPit();
	}
});
$("#impStand").click(function(){
	if (!$(this).hasClass("disabled")) {
		importStand();
	}
});
$("#export").click(function(){
	if (!$(this).hasClass("disabled")) {
		exportData();
	}
});
$("#new").click(function(){
	if (!$(this).hasClass("disabled")) {
		newFlash();
	}
});
$("#scrollToIds").click(function(){
	window.scrollTo(0,0);
});
$("#scrollToTeams").click(function(){
	window.scrollTo(0,1605);
});
$("#scrollToMatches").click(function(){
	window.scrollTo(0,3210);
});

//Runs At Start
start();

//For copying as a default
var scores = {
	"98": 0,
	"50": 0,
	"60": 0,
	"64": 0,
	"66": 0,
	"81": 0,
	"24": 0,
	"25": 0,
	"20": 0,
	"21": 0,
	"22": 0,
	"23": 0,
	"44": 0,
	"40": 0,
	"41": 0,
	"96": 0,
	"77": 0,
	"76": 0,
	"72": 0,
	"97": 0,
	"58": 0,
	"99": 0,
	"13": 0,
	"12": 0,
	"15": 0,
	"14": 0,
	"17": 0,
	"16": 0,
	"19": 0,
	"18": 0,
	"30": 0,
	"37": 0,
	"36": 0,
	"34": 0,
	"33": 0,
	"55": 0,
	"48": 0
}