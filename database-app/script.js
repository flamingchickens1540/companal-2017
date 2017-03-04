var fs = require('fs');
var Dialogs = require('dialogs');
var dialogs = Dialogs(opts={})
window.$ = window.jQuery = require('jquery');

//Useful universal functions
function createFile(file,text) {
	fs.writeFile(file, text, function(err) {
    	if (err) {
        	return console.log(err);
		}
	});
}
function appendFile(file,text) {
	fs.appendFile(file,text, function(err) {
		if (err) {
			return console.log(err);
		}
	});
}
function deleteFile(fileName){
	fs.unlink(fileName, function(err) {
		if (err) {
			return console.error(err);
		}
	});
}
function renameFile(oldPath,newPath) {
	fs.rename(oldPath,newPath, (err) => {
		if (err) throw err;
		console.log('renamed complete');
	});
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

//Bonus for pit scouting
var pitbonus = 10;
//Bonus for stand scouting
var standbonus = 0;

//Files In Data-Collect
var manifest_pit = [];
var manifest_stand = [];
var additional = {};
var resutls = {};

//Stores:
//Member ID
//Total Number of Matches Scoutes
//Total Number of Robobucks
var scoutcount = {
	"98": [0, 100],
	"50": [0, 100], 
	"60": [0, 100],
	"64": [0, 100],
	"66": [0, 100],
	"81": [0, 100],
	"24": [0, 100],
	"25": [0, 100],
	"20": [0, 100],
	"21": [0, 100],
	"22": [0, 100],
	"23": [0, 100],
	"44": [0, 100],
	"40": [0, 100],
	"41": [0, 100],
	"96": [0, 100],
	"77": [0, 100],
	"76": [0, 100],
	"72": [0, 100],
	"97": [0, 100],
	"58": [0, 100],
	"99": [0, 100],
	"13": [0, 100],
	"12": [0, 100],
	"15": [0, 100],
	"14": [0, 100],
	"17": [0, 100],
	"16": [0, 100],
	"19": [0, 100],
	"18": [0, 100],
	"30": [0, 100],
	"37": [0, 100],
	"36": [0, 100],
	"34": [0, 100],
	"33": [0, 100],
	"55": [0, 100],
	"48": [0, 100]
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

//Checks For Inconsistencies In Which Team Won
function checkForI() {
	var keys = Object.keys(results);
	cfi(keys,0);
	createFile("data-collect/stand-scouting/manifest.json",JSON.stringify(manifest_stand));
	createFile("data-collect/results.json",JSON.stringify(results));
}
function cfi(keys,m) {
	var data = results[keys[m]];
	if (data.length>1) {
		var def = data[0].win;
		var inconsistent = false;
		for (scout in data) {
			if (data[scout].win!=def) {
				inconsistent=true;
				break;
			}
		}
		if (inconsistent) {
			var alliance;
			console.log(data);
			dialogs.confirm("There was an error with Match "+keys[m]+". If the red alliance won Match "+keys[m]+", press 'OK'.", function(ok) {
				if (ok) {
					alliance="red";
				} else {
					alliance="blue";
				}
				for (match in data) {
					var scout=data[match];
					if (scout.win!=alliance) {
						scoutcount[scout.scoutId][1]-=integer(scout.robobucks);
						var name = "m"+scout.matchNumber+"-"+scout.role+"-"+scout.teamNumber+".json";
						var index = manifest_stand.indexOf(name);
						manifest_stand.splice(index,1);
						deleteFile("data-collect/stand-scouting/"+name);
						results[match].splice(x,1);
						
					}
				}
				m+=1;
				if (keys.length>m) {
					cfi(keys,m);
				}
			});
		} else {
			m+=1;
			if (keys.length>m) {
				cfi(keys,m);
			}
		}
	}
}

//Imports Previous Files
function start() {
	createTable();
	manifest_stand = JSON.parse(fs.readFileSync('data-collect/stand-scouting/manifest.json'));
 	manifest_pit = JSON.parse(fs.readFileSync('data-collect/pit-scouting/manifest.json'));
 	additional = JSON.parse(fs.readFileSync('data-collect/additional.json'));
 	results = JSON.parse(fs.readFileSync('data-collect/results.json'));
 	//Load Stand
	for (x in manifest_stand) {
		if (fs.existsSync('data-collect/stand-scouting/'+manifest_stand[x])) {
			var data = JSON.parse(fs.readFileSync('data-collect/stand-scouting/'+manifest_stand[x]));
			scoutcount[data.scoutId][0]+=1;
          	scoutcount[data.scoutId][1]+=standbonus;
          	scoutcount[data.scoutId][1]+=integer(data.robubucks);
		}
	}
	//Load Pit
	for (x in manifest_pit) {
		if (fs.existsSync('data-collect/pit-scouting/'+manifest_pit[x])) {
			var data = JSON.parse(fs.readFileSync('data-collect/pit-scouting/'+manifest_pit[x]));
			scoutcount[data.scoutIds[0]][0]+=1;
          	scoutcount[data.scoutIds[0]][1]+=pitbonus;
          	if (data.scoutIds[1]!="-") {
				scoutcount[data.scoutIds[1]][0]+=1;
				scoutcount[data.scoutIds[1]][1]+=pitbonus;
			}
		}
	}
	//Load Additional
	var keys = Object.keys(additional);
	for (x in keys) {
		scoutcount[keys[x]][1]+=integer(additional[keys[x]]);
	}
	checkForI();
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
					scoutcount[teamData.scoutIds[0]][0]+=1;
					scoutcount[teamData.scoutIds[0]][1]+=pitbonus;
					if (teamData.scoutIds[1]!="-") {
						scoutcount[teamData.scoutIds[1]][0]+=1;
						scoutcount[teamData.scoutIds[1]][1]+=pitbonus;
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

//Imports Incoming Stand Data, Runs CheckForI()
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
          			scoutcount[data.scoutId][0]+=1;
          			scoutcount[data.scoutId][1]+=standbonus;
          			scoutcount[data.scoutId][1]+=integer(next.robobucks)
          			createFile("data-collect/stand-scouting/"+manifestArray[team],JSON.stringify(data));
				}
			}
			$("#impStand").addClass("disabled");
			createFile("data-collect/results.json",JSON.stringify(results));
			createFile("data-collect/stand-scouting/manifest.json",JSON.stringify(manifest_stand));
			dialogs.alert('Done importing data!');
			checkForI();
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
		var robo = fs.readFileSync('/Volumes/1540/companal/stand-scouting/robobucks.json');
		robo = JSON.parse(robo);
		var keys = Object.keys(scoutcount);	
		for (x in keys) {
			var id = keys[x];
			robo[id]=scoutcount[id][1].toString();
		}
		createFile("/Volumes/1540/companal/stand-scouting/robobucks.json",JSON.stringify(robo));
		$("#export").addClass("disabled");
		$("#impStand").addClass("disabled");
		$("#impPit").addClass("disabled");
		$("#new").removeClass("disabled");
	} else {
		dialogs.alert("The USB is not inserted properly.");
	}
}

//Creates The Table
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
		var td4 = document.createElement("td");
		td4.setAttribute("id",id+"bet");
		$("#"+id+"row").append(td4);
		$("#"+id+"bet").text(scoutcount[id][1]);
	}
}

//Updates The Table
function updateTable() {
	var keys = Object.keys(accounts);
	for (x in keys) {
		var id = keys[x];
		$("#"+id+"bet").text(scoutcount[id][1]);
		$("#"+id+"num").text(scoutcount[id][0]);
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
$("#addRB").click(function(){
	var keys = Object.keys(scoutcount);
	var values = Object.keys(accounts).map(function(key){return accounts[key]});
	var id = $("#idRB").val();
	var rb = integer($("#numRB").val());
	$("#idRB").val("");
	$("#numRB").val("");
	if (contains(keys,id)) {
		scoutcount[id][1]+=rb;
		additional[id]=(integer(additional[id])+rb).toString();
		createFile("data-collect/additional.json",JSON.stringify(additional));
	} else if (contains(values,id)) {
		id = getKeyByValue(accounts, id);
		scoutcount[id][1]+=rb;
		additional[id]=(integer(additional[id])+rb).toString();
		createFile("data-collect/additional.json",JSON.stringify(additional));
	}
	updateTable();
	$("#aos").hide();
	$("#hide").hide();
	$("#addOrSub").show();
});
$("#addOrSub").click(function(){
	$("#aos").show();
	$("#hide").show();
	$("#addOrSub").hide();
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