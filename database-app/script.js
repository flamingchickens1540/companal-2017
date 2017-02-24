var fs = require('fs');
window.$ = window.jQuery = require('jquery');

// if (fs.existsSync('/Volumes/1540/companal/output/persondict.json')) {
//   var personTxt = fs.readFileSync('/Volumes/1540/companal/output/persondict.json');
//   var personDict = JSON.parse(personTxt);
// } else {
//   var personDict = {};
// }

var pitbonus = 20;
var standbonus = 10;
var manifest_pit = [];
var manifest_stand = [];
var additional = {}

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

$("#aos").hide();
createTable();
importStart();

function createFile(one,two) {
	fs.writeFile(one, two, function(err) {
    	if (err) {
        	return console.log(err);
		}
	});
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

function importStart() {
	manifest_stand = JSON.parse(fs.readFileSync('data-collect/stand-scouting/manifest.json'));
	manifest_pit = JSON.parse(fs.readFileSync('data-collect/pit-scouting/manifest.json'));
	additional = JSON.parse(fs.readFileSync('data-collect/additional.json'));
	for (x in manifest_stand) {
		if (fs.existsSync('data-collect/stand-scouting/'+manifest_stand[x])) {
			var data = JSON.parse(fs.readFileSync('data-collect/stand-scouting/'+manifest_stand[x]));
			scoutcount[data.scoutId][0]+=1;
          	scoutcount[data.scoutId][1]+=standbonus;
		}
	}
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
	keys = Object.keys(additional);
	for (x in keys) {
		scoutcount[keys[x]][1]+=parseInt(additional[keys[x]]);
	}
	updateTable();
}

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
					createFile("data-collect/pit-scouting/"+manifestArray[team],txt);
          // Scouting update info
          // Writes to file
//           var standSource = fs.createReadStream('/Volumes/1540/companal/pit-scouting/' + manifestArray[team]);
//           var standDest = fs.createWriteStream('/Volumes/1540/companal/output/pit-scouting/' + manifestArray[team]);
//           standSource.pipe(standDest);
				}
			}
			$("#impPit").addClass("disabled");
			updateTable();
			alert('\nDone importing data!');
		} else {
			alert('\nUSB not inserted properly');
		}
	} else {
		alert('\nOops! Something went wrong');
	}
}

function importStand() {
	if (navigator.appVersion.indexOf('Mac') != -1) {
		if (fs.existsSync('/Volumes/1540/')) {
			// Reads stand manifest
			var jsonTxt = fs.readFileSync('/Volumes/1540/companal/stand-scouting/manifest.json');
			var manifestArray = JSON.parse(jsonTxt);
			var teamData = undefined;
			for (var team in manifestArray) {
				if (fs.existsSync(!fs.existsSync('data-collect/stand-scouting/'+manifestArray[team]) && '/Volumes/1540/companal/stand-scouting/' + manifestArray[team])) {
          			// Scouting update info
          			var txt = fs.readFileSync('/Volumes/1540/companal/stand-scouting/' + manifestArray[team]);
          			teamData = JSON.parse(txt);
          			scoutcount[teamData.scoutId][0]+=1;
          			scoutcount[teamData.scoutId][1]+=standbonus;
          			manifest_stand.push(manifestArray[team]);
          			createFile("data-collect/stand-scouting/"+manifestArray[team],txt);
          // Writes to file
//           var standSource = fs.createReadStream('/Volumes/1540/companal/stand-scouting/' + manifestArray[team]);
//           var standDest = fs.createWriteStream('/Volumes/1540/companal/output/stand-scouting/' + manifestArray[team]);
//           standSource.pipe(standDest);
				}
			}
			if (teamData!=undefined) {
				var tr = JSON.parse((fs.readFileSync('/Volumes/1540/companal/stand-scouting/transactions.json')));
				scoutcount[teamData.scoutId][1]+=parseInt(tr[teamData.scoutId]);
				var keys = Object.keys(tr);
				for (x in keys) {
					var id = keys[x];
					var tr_rb = parseInt(tr[id]);
					scoutcount[id][1]+=tr_rb;
				}
			}
			$("#impStand").addClass("disabled");
			updateTable();
			alert('\nDone importing data!');
		} else {
			alert('\nUSB not inserted properly');
		}
	} else {
    	alert('\nOops! Something went wrong');
	}
}

function exportData() {
	//alexander code
	var robo = fs.readFileSync('/Volumes/1540/companal/stand-scouting/robobucks.json');
	robo = JSON.parse(robo);
	var keys = Object.keys(scoutcount);
	for (x in keys) {
		var id = keys[x];
		robo[id]=scoutcount[id][1];
	}
	createFile("/Volumes/1540/companal/stand-scouting/robobucks.json",JSON.stringify(robo));
	createFile("data-collect/stand-scouting/manifest.json",JSON.stringify(manifest_stand));
	createFile("data-collect/pit-scouting/manifest.json",JSON.stringify(manifest_pit));
	createFile("data-collect/additional.json",JSON.stringify(additional));
	$("#export").addClass("disabled");
	$("#impStand").addClass("disabled");
	$("#impPit").addClass("disabled");
	$("#new").removeClass("disabled");
// 	var processedData = new Folder("/Volumes/1540/ProcessedData");
}

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
function updateTable() {
	var keys = Object.keys(accounts);
	for (x in keys) {
		var id = keys[x];
		$("#"+id+"bet").text(scoutcount[id][1]);
		$("#"+id+"num").text(scoutcount[id][0]);
	}
}

function newFlash() {
	$("#impPit").removeClass("disabled");
	$("#impStand").removeClass("disabled");
	$("#export").removeClass("disabled");
	$("#new").addClass("disabled");
}

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
	var id = $("#idRB").val();
	var rb = parseInt($("#numRB").val());
	$("#idRB").val("");
	$("#numRB").val("");
	if (contains(keys,id.toString())) {
		scoutcount[id][1]+=rb;
		additional[id]+=rb;
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