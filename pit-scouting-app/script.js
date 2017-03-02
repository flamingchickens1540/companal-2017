var fs = require('fs');
var remote = require('electron').remote;
var Dialogs = require('dialogs');
var dialogs = Dialogs(opts={})

function createFile(one,two) {
	fs.writeFile(one, two, function(err) {
    	if (err) {
        	return console.log(err);
		}
	});
}

function appendFile(one,two) {
	fs.appendFile(one,two, function(err) {
		if (err) {
			return console.log(err);
		}
	});
}

function createTable() {
	var keys = Object.keys(accounts);
	for (x in keys) {
		$("#tbody").append("<tr><td>"+accounts[keys[x]]+"</td><td>"+keys[x]+"</td></tr>");
	}
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
var json = {
	teamNumber: "0000",
	scoutIds: [00,00],
	roles: [],
	drivetrain: {
		drivetrainShifts:true,
		drivetrainType:"mecanum",
		motorCount:17,
		wheelType:"omni",
		allWheelsDriven:true
	},
	hasDefended: false,
	shooting: {
		hasHigh: false,
		hasLow: false,
		ballCapacity: 50,
		floorLoading: true,
		humanLoading: false,
		efficiency: 95, //estimate, %
		hopperLoading: false
	},
	gears: {
		canDeposit: true,
		humanLoading: false,
		floorLoading: true
	},
	canClimb: true,
	weight: 100, //pounds
	notes: ""
}
var def = json;
var logged = false;
var act = "none";
var roles = [];
var secact = "none";
var team = "none";
var round = 1;
var gearHuman = false;
var gearFloor = false;
var ballFloor = false;
var ballHuman = false;
var ballHopper = false;

$(document).on('keydown',function(e) { 
    var key = e.charCode || e.keyCode;
    if(key==9) {
    	e.preventDefault();
    }
});

$(document).ready(function(){
	createTable();
	$("body").css("overflow", "hidden");
	$("#savetoflash").click(function(){
		var array = JSON.parse(fs.readFileSync("manifest.json"));
		if (navigator.platform=="MacIntel") {
			createFile("/Volumes/1540/Companal/pit-scouting/manifest.json",JSON.stringify(array));
			if (fs.existsSync("/Volumes/1540")) {
				var array = JSON.parse(fs.readFileSync("manifest.json"));
				for (x in array) {
					if (!fs.existsSync("/Volumes/1540/companal/pit-scouting/"+array[x])) {
						var file = fs.readFileSync("pit_data/"+array[x]);
						createFile("/Volumes/1540/companal/pit-scouting/"+array[x],file);
					}
				}
				dialogs.alert("Files saved!");
			} else {
				dialogs.alert("The flashdrive 1540 is not inputed into the tablet.");
			}
		} else if (navigator.platform=="Win32") {
			createFile("K:/Companal/pit-scouting/manifest.json",JSON.stringify(array));
			if (fs.existsSync("K:/Companal/pit-scouting")) {
				var array = JSON.parse(fs.readFileSync("manifest.json"));
				for (x in array) {
					if (!fs.existsSync("K:/Companal/pit-scouting"+array[x])) {
						var file = fs.readFileSync("pit_data/"+array[x]);
						createFile("K:/Companal/pit-scouting"+array[x],file);
					}
				}
				$("#saved").show();
			} else {
				$("#no1540").show();
			}
		}
	});
	$("#logbutton").click(function(){
		var num = $("#lognum").val();
		var numb = $("#lognumb").val();
		if (accounts.hasOwnProperty(num) && accounts.hasOwnProperty(numb)) {
			logged=true;
			act=num;
			secact=numb;
			if (num==numb) {
				$("#yourname").text(accounts[num]);
				secact="-"
			} else {
				$("#yourname").text(accounts[num]+" and "+accounts[numb]);
			}
			$("#check").animate({opacity:'1.0',top:'260'},1600);
		} else {
			var chosen;
			if (!accounts.hasOwnProperty(num)) {
				chosen=num;
				$("#lognum").val("");
			} else {
				chosen=numb;
				$("#lognumb").val("");
			}
			if (chosen=="") {
				chosen="None";
			}
			$("#check").animate({top:'700px',opacity:'0.0'},1600);
			logged=false;
			dialogs.alert("There is no account with the id "+chosen+".");
			act="none";
			secact="none";
		}
		$("#logname").val("");
	});
	$("#next").click(function(){
		round+=1;
		if (round==2) {
			$("#roundtwo").show();
			$("#roundone").hide();
			$("#previous").show();
		} else if (round==3) {
			$("#roundthree").show();
			$("#roundtwo").hide();
		} else if (round==4) {
			$("#roundfour").show();
			$("#roundthree").hide();
		} else if (round==5) {
			$("#roundfive").show();
			$("#roundfour").hide();
		} else if (round==6) {
			$("#roundsix").show();
			$("#roundfive").hide();
		} else if (round==7) {
			$("#roundsix").hide();
			$("#roundseven").show();
			$("#next").hide();
		}
		if (round>7) {
			round=7;
		} 
	});
	$("#previous").click(function(){
		round-=1;
		if (round==1) {
			$("#roundtwo").hide();
			$("#roundone").show();
			$("#previous").hide();
		} else if (round==2) {
			$("#roundtwo").show();
			$("#roundthree").hide();
		} else if (round==3) {
			$("#roundthree").show();
			$("#roundfour").hide();
		} else if (round==4) {
			$("#roundfour").show();
			$("#roundfive").hide();
		} else if (round==5) {
			$("#roundfive").show();
			$("#roundsix").hide();
		} else if (round==6) {
			$("#roundseven").hide();
			$("#roundsix").show();
			$("#next").show();
		}
		if (round<1) {
			round=1;
		}
	});
	$("#yes").click(function(){
		$("#top").animate({top:'-300px',opacity:'0.0'},1600);
		$("#check").animate({opacity:'0.0',top:'-300px'},1600);
		$("#teamsel").animate({opacity:'1.0',top:'0'},1600);
		if (secact=="-") {
			$(".title").text(accounts[act]);
		} else {
			$(".title").text(accounts[act]+", "+accounts[secact]);
		}
	});
	$("#no").click(function(){
		$("#check").animate({top:'700px',opacity:'0.0'},1600);
		logged=false;
		act="none";
		secact="none";
	});
	$(".signout").click(function(){
		dialogs.alert("You have been signed out.", function(ok) {
			remote.getCurrentWindow().reload();
		 });
	});
	$("#gearfloor").click(function(){
		gearFloor = !gearFloor;
	});
	$("#shootingrole").click(function(){
		var x = roles.indexOf("shooting");
		if (x!=-1) {
			roles.splice(x,1);
		} else {
			roles.push("shooting");
		}
	});
	$("#gearsrole").click(function(){
		var x = roles.indexOf("gears");
		if (x!=-1) {
			roles.splice(x,1);
		} else {
			roles.push("gears");
		}
	});
	$("#defendrole").click(function(){
		var x = roles.indexOf("defending");
		if (x!=-1) {
			roles.splice(x,1);
		} else {
			roles.push("defending");
		}
	});
	$("#gearhuman").click(function(){
		gearHuman = !gearHuman;
	});
	$("#ballsfloor").click(function(){
		ballFloor = !ballFloor;
	});
	$("#ballshopper").click(function(){
		ballHopper = !ballHopper;
	});
	$("#ballshuman").click(function(){
		ballHuman = !ballHuman;
	});
	$("#otherdrive").click(function(){
		$("#driveoptions").show();
	});
	$("#otherwheel").click(function() {
		$("#wheeloptions").show();
	});
	$("#othermotor").click(function() {
		$("#motoroptions").show();
	});
	$("#otherrole").click(function() {
		var x = roles.indexOf("other");
		if (x!=-1) {
			roles.splice(x,1);
			$("#roletext").hide();
		} else {
			roles.push("other");
			$("#roletext").show();
		}
	});
	$("input").keypress(function (evt) {
		  var keycode = evt.charCode || evt.keyCode;
		  if (keycode  == 9) { //Enter key's keycode
		    return false;
		    console.log("hi");
		  }
	});
	$("#submit").click(function() {
		var list = [];
		list.push(["Drive Train Shifts",$("input[name='drivetrainShifts']:checked").val()]);
		list.push(["Type of Wheel",$("input[name='wheelType']:checked").val()]);
		list.push(["Number of Motors",$("#motorcount").val()]);
		list.push(["Can Robot Climb",$("input[name='canClimb']:checked").val()]);
		list.push(["Ball Capacity",$("#ballCapacity").val()]);
		list.push(["High Goal Shooter",$("input[name='hasHigh']:checked").val()]);
		list.push(["Low Goal Shooter",$("input[name='hasLow']:checked").val()]);
		list.push(["All Wheels Driven",$("input[name='wheelsDriven']:checked").val()]);
//		list.push(["Has Robot Defended",$("input[name='hasDefended']:checked").val()]);
		list.push(["Robot's Weight",$("#roboweight").val()]);
		list.push(["Can Deposit Gears",$("input[name='gears']:checked").val()]);
		list.push(["Shooter Efficiency",$("#accuracy").val()]);
		var go = true;
		var message = "";
		for (x in list) {
			if (list[x][1]==undefined || list[x][1]==null) {
				go=false;
				message=list[x][0];
				break;
			}
		}
		if (go) {
			var z = roles.indexOf("other");
			if (z!=-1) {
				roles.splice(z,1);
				roles.push($("#roletext").val());
			}
			json["teamNumber"]=team;
			json["scoutIds"]=[act,secact];
			json["notes"]=$("#extratext").val();
			json["drivetrain"]["drivetrainShifts"]=$("input[name='drivetrainShifts']:checked").val();
			if ($("input[name='drivetrainType']:checked").val()!="other") {
				json["drivetrain"]["drivetrainType"]=$("input[name='drivetrainType']:checked").val();
			} else {
				json["drivetrain"]["drivetrainType"]=$("#driveoptions").val();
			}
			json["drivetrain"]["motorCount"]=$("#motorcount").val();
			if ($("input[name='wheelType']:checked").val()!="other") {
				json["drivetrain"]["wheelType"]=$("input[name='wheelType']:checked").val();
			} else {
				json["drivetrain"]["wheelType"]=$("#wheeloptions").val();
			}
			json["canClimb"]=$("input[name='canClimb']:checked").val();
			json["allWheelsDriven"]=$("input[name='wheelsDriven']:checked").val();
			json["hasDefended"]=false;
			//json["hasDefended"]=$("input[name='hasDefended']:checked").val();
			json["weight"]=$("#roboweight").val();
			json["shooting"]["hasHigh"]=$("input[name='hasHigh']:checked").val();
			json["shooting"]["hasLow"]=$("input[name='hasLow']:checked").val();
			json["shooting"]["ballCapacity"]=$("#ballCapacity").val();
			json["shooting"]["floorLoading"]=ballFloor;
			json["shooting"]["humanLoading"]=ballHuman;
			json["shooting"]["hopperLoading"]=ballHopper;
			json["shooting"]["efficiency"]=$("#accuracy").val();
			json["gears"]["canDeposit"]=$("input[name='gears']:checked").val();
			json["gears"]["floorLoading"]=gearFloor;
			json["gears"]["humanLoading"]=gearHuman;
			json["roles"]=roles;
			var str = "pit_data/"+team+".json";
			var spotify = JSON.stringify(json);
		 	createFile(str,spotify);
		 	var array = JSON.parse(fs.readFileSync("manifest.json"));
		 	array.push(team+".json");
		 	var stringed = JSON.stringify(array);
		 	createFile("manifest.json",stringed);
		 	dialogs.alert("The data has been saved", function(ok) {
			 	remote.getCurrentWindow().reload();
		 	});
		 } else {
		 	dialogs.alert("You have not filled in: "+message+".");
		 }
	});
	$(".deselect-dt").click(function(){
		$("#driveoptions").hide();
	});
	$(".deselect-wh").click(function(){
		$("#wheeloptions").hide();
	});
	$("#teamsubmit").click(function(){
		team = $("#teaminput").val();
		$("#teaminput").attr("disabled", true);
		$("#teamsubmit").attr("disabled", true);
		$("#scouting").animate({opacity:'1.0',top:'120'},1600);
		$("#teamdisplay").text(team);
		$("#teaminput").val("");
		$("#roundone").show();
		$("#roundtwo").hide();
		$("#roundthree").hide();
		$("#roundfour").hide();
		$("#roundfive").hide();
		$("#roundsix").hide();
		$("#roundseven").hide();
		$("#previous").hide();
	});
	$("#forgetid").click(function(){
		$("body").css("overflow", "auto");
		$("#dir").animate({opacity:'1.0',top:'0'},1600);
		$("#check").animate({opacity:'0.0',top:'700px'},1600);
		$("#top").animate({opacity:'0.0',top:'-300px'},1600);
	});
	$(".backdir").click(function(){
		window.scrollTo(0, 0);
		$("body").css("overflow", "hidden");
		$("#dir").animate({opacity:'0.0',top:'700px'},1600);
		$("#top").animate({opacity:'1.0',top:'0'},1600);
	});
});