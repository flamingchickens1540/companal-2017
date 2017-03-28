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

function createTemp() {
	var z = roles.indexOf("other");
	if (z!=-1) {
		roles.splice(z,1);
		roles.push($("#roletext").val());
	}
	json["teamNumber"]=team;
	json["round"]=round;
	json["scoutIds"]=[act,secact];
	json["notes"]=$("#extratext").val();
	json["drivetrain"]["drivetrainShifts"]=$("input[name='drivetrainShifts']:checked").val();
	json["gears"]["active"]=$("input[name='gearmech']:checked").val();
	if ($("input[name='drivetrainType']:checked").val()!="other") {
		json["drivetrain"]["drivetrainType"]=$("input[name='drivetrainType']:checked").val();
	} else {
		json["drivetrain"]["drivetrainType"]=$("#driveoptions").val();
	}
	if ($("input[name='lang']:checked").val()!="other") {
		json["language"]=$("input[name='lang']:checked").val();
	} else {
		json["language"]=$("#langoptions").val();
	}
	json["canClimb"]=$("input[name='canClimb']:checked").val();
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
	var spotify = JSON.stringify(json);
 	createFile("tempFile.json",spotify);
}

function isTemp() {
	if (fs.existsSync("tempFile.json")) {
		$("#top").hide();
		$("#round1").hide();
		$("#teamsel").css("opacity","1.0");
		$("#scouting").css("opacity","1.0");
		$("#scouting").css("top","120");
		$("#teamsel").css("top","0");
		var backup = JSON.parse(fs.readFileSync("tempFile.json"));
		round=backup["round"];
		team=backup["teamNumber"];
		act=backup["scoutIds"][0];
		secact=backup["scoutIds"][1];
		var climb = backup["canClimb"];
		$("label[name='canClimb']").each(function(){
			if (climb==$(this).attr("value")) {
				this.setAttribute("class","btn btn-warning active");
				$("input[value="+climb+"][name='canClimb']").attr("checked",true);
			}
		});
		var low = backup["shooting"]["hasLow"];
		$("label[name='hasLow']").each(function(){
			if (low==$(this).attr("value")) {
				this.setAttribute("class","btn btn-warning active");
				$("input[value="+low+"][name='hasLow']").attr("checked",true);
			}
		});
		var high = backup["shooting"]["hasHigh"];
		$("label[name='hasHigh']").each(function(){
			if (high==$(this).attr("value")) {
				this.setAttribute("class","btn btn-warning active");
				$("input[value="+high+"][name='hasHigh']").attr("checked",true);
			}
		});
		var shift = backup["drivetrain"]["drivetrainShifts"];
		$("label[name='drivetrainShifts']").each(function(){
			if (shift==$(this).attr("value")) {
				this.setAttribute("class","btn btn-warning active");
				$("input[value="+shift+"][name='drivetrainShifts']").attr("checked",true);
			}
		});
		var active = backup["gears"]["active"];
		$("label[name='gearmech']").each(function(){
			if (active==$(this).attr("value")) {
				this.setAttribute("class","btn btn-warning active");
				$("input[value="+active+"][name='gearmech']").attr("checked",true);
			}
		});
		var deposit = backup["gears"]["canDeposit"];
		$("label[name='gears']").each(function(){
			if (deposit==$(this).attr("value")) {
				this.setAttribute("class","btn btn-warning active");
				$("input[value="+deposit+"][name='gears']").attr("checked",true);
			}
		});
		var language = backup["language"];
		var found = false;
		$("label[name='lang']").each(function(){
			if (language==$(this).attr("value")) {
				found=true;
				this.setAttribute("class","btn btn-warning deselect-ln active");
				$("input[value="+language+"][name='lang']").attr("checked",true);
			}
		});
		if (language!=null && language!=null && !found) {
			$("#otherlang").attr("class","btn btn-warning active");
			$("input[value='other'][name='lang']").attr("checked",true);
			$("#langoptions").show();
			$("#langoptions").val(language);
		}
		var dt = backup["drivetrain"]["drivetrainType"];
		found = false;
		$("label[name='drivetrainType']").each(function(){
			if (dt==$(this).attr("value")) {
				found=true;
				this.setAttribute("class","btn btn-warning deselect-dt active");
				$("input[value="+dt+"][name='drivetrainType']").attr("checked",true);
			}
		});
		if (dt!=null && dt!=null && !found) {
			$("#otherdrive").attr("class","btn btn-warning active");
			$("input[value='other'][name='drivetrainType']").attr("checked",true);
			$("#driveoptions").show();
			$("#driveoptions").val(dt);
		}
		roles = backup["roles"];
		for (x in roles) {
			found=false;
			$("label[name='role']").each(function(){
				if (roles[x]==$(this).attr("value")) {
					found=true;
					this.setAttribute("class","btn btn-warning active");
					$("input[value="+roles[x]+"][name='role']").attr("checked",true);
				}
			});
			if (!found) {
				$("#otherrole").attr("class","btn btn-warning active");
				$("#otherRoleInput").attr("checked",true);
				$("#roletext").show();
				$("#roletext").val(roles[x]);
				roles.splice(x,1);
				roles.push("other");
			}
		}
		gearHuman=backup["gears"]["humanLoading"];
		if (gearHuman) {
			$("#gearhuman").addClass("active");
		}
		gearFloor=backup["gears"]["floorLoading"];
		if (gearFloor) {
			$("#gearfloor").addClass("active");
		}
		ballFloor=backup["shooting"]["floorLoading"];
		if (ballFloor) {
			$("#ballsfloor").addClass("active");
		}
		ballHopper=backup["shooting"]["hopperLoading"];
		if (ballHopper) {
			$("#ballshopper").addClass("active");
		}
		ballHuman=backup["shooting"]["humanLoading"];
		if (ballHuman) {
			$("#ballshuman").addClass("active");
		}
		$("#teaminput").attr("disabled", true);
		$("#teamsubmit").attr("disabled", true);
		$("#round"+round).show();
		if (secact=="-") {
			$(".title").text(accounts[act]);
		} else {
			$(".title").text(accounts[act]+", "+accounts[secact]);
		}
		if (round==7) {
			$("#next").hide();
		}
		if (round==1) {
			$("#previous").hide();
		}
		$("#teamdisplay").text(team);
		$("#extratext").val(backup["notes"]);
		$("#roboweight").val(backup["weight"]);
		$("#accuracy").val(backup["shooting"]["efficiency"]);
		$("#ballCapacity").val(backup["shooting"]["ballCapacity"]);
	}
}

function removeTemp() {
	if (fs.existsSync("tempFile.json")) {
		console.log("yep");
		fs.unlink("tempFile.json");
	} else {
		console.log("nope");
	}
}

function noShooting() {
	if (!hasLow && !hasHigh) {
		$("#ballCapacity").val("0");
		$("#accuracy").val("0%");
	}
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
	teamNumber: "0000", //
	scoutIds: [00,00], //
	roles: [],
	round: 0, //only for crashplan //
	language: "Java", //
	drivetrain: {
		drivetrainShifts:true, //
		drivetrainType:"mecanum",
	},
	hasDefended: false, //
	shooting: { //
		hasHigh: false, //
		hasLow: false, //
		ballCapacity: 50, //
		floorLoading: true, //
		humanLoading: false, //
		efficiency: 95, //estimate, % //
		hopperLoading: false //
	}, //
	gears: { //
		canDeposit: true, //
		humanLoading: false, //
		floorLoading: true, //
		active: false //
	}, //
	canClimb: true, //
	weight: 100, //pounds //
	notes: "" //
}
var def = json;
var logged = false;
var act = "none";
var roles = [];
var secact = "none";
var team = "none";
var round = 1;
var hasLow = true;
var hasHigh = true;
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
	isTemp();
// 	$("body").css("overflow", "hidden");
	$("#savetoflash").click(function(){
		var array;
		if (fs.existsSync('manifest.json')) {
			array = JSON.parse(fs.readFileSync("manifest.json"));
		} else {
			array = []
		}
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
			createFile("K:/companal/pit-scouting/manifest.json",JSON.stringify(array));
			if (fs.existsSync("K:/companal/pit-scouting")) {
				var array = JSON.parse(fs.readFileSync("manifest.json"));
				for (x in array) {
					if (!fs.existsSync("K:/companal/pit-scouting/"+array[x])) {
						var file = fs.readFileSync("pit_data/"+array[x]);
						createFile("K:/companal/pit-scouting/"+array[x],file);
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
			$("#round2").show();
			$("#round1").hide();
			$("#previous").show();
		} else if (round==3) {
			$("#round3").show();
			$("#round2").hide();
		} else if (round==4) {
			$("#round4").show();
			$("#round3").hide();
		} else if (round==5) {
			$("#round5").show();
			$("#round4").hide();
		} else if (round==6) {
			$("#round6").show();
			$("#round5").hide();
		} else if (round==7) {
			$("#round7").show();
			$("#round6").hide();
			$("#next").hide();
		}
		if (round>7) {
			round=7;
		}
		createTemp();
	});
	$("#previous").click(function(){
		round-=1;
		if (round==1) {
			$("#round2").hide();
			$("#round1").show();
			$("#previous").hide();
		} else if (round==2) {
			$("#round2").show();
			$("#round3").hide();
		} else if (round==3) {
			$("#round3").show();
			$("#round4").hide();
		} else if (round==4) {
			$("#round4").show();
			$("#round5").hide();
		} else if (round==5) {
			$("#round5").show();
			$("#round6").hide();
			$("#next").show();
		} else if (round==6) {
			$("#round6").show();
			$("#round7").hide();
			$("#next").show();
		}
		if (round<1) {
			round=1;
		}
		createTemp();
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
	$("label[value='false'][name='gears']").click(function(){
		console.log("hi");
		$("label[name='gearmech'][value='none']").attr("class","btn btn-warning active");
		$("input[name='gearmech'][value='none']").attr("checked","true");
	});
	$("label[value='false'][name='hasHigh']").click(function(){
		hasHigh=false;
		noShooting();
	});
	$("label[value='true'][name='hasHigh']").click(function(){
		hasHigh=true;
		noShooting();
	});
	$("label[value='false'][name='hasLow']").click(function(){
		hasLow=false;
		noShooting();
	});
	$("label[value='false'][name='hasLow']").click(function(){
		hasLow=true;
		noShooting();
	});
	$(".signout").click(function(){
		dialogs.confirm("Do you want to sign out?", function(ok) {
			if (ok) {
				dialogs.alert("You have been signed out.", function(ok) {
					removeTemp();
					remote.getCurrentWindow().reload();
				});
			}
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
	$("#otherlang").click(function() {
		$("#langoptions").show();
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
		list.push(["whether or not the drive train shifts",$("input[name='drivetrainShifts']:checked").val()]);
		list.push(["if the robot can climb",$("input[name='canClimb']:checked").val()]);
		list.push(["the robot's ball capacity",$("#ballCapacity").val()]);
		list.push(["if the robot has a high goal shooter",$("input[name='hasHigh']:checked").val()]);
		list.push(["if the robot has a low goal shooter",$("input[name='hasLow']:checked").val()]);
//		list.push(["Has Robot Defended",$("input[name='hasDefended']:checked").val()]);
		list.push(["the robot's weight",$("#roboweight").val()]);
		list.push(["whether the robot can deposit gears",$("input[name='gears']:checked").val()]);
		list.push(["the robot's shooter efficiency",$("#accuracy").val()]);
		list.push(["whether the gear mechanism is active or passive",$("input[name='gearmech']:checked").val()]);
		list.push(["what language your robot uses",$("input[name='lang']:checked").val()])
		var go = true;
		var message = "";
		for (x in list) {
			if (list[x][1]==undefined || list[x][1]==null || list[x][1]=="") {
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
			json["round"]=0;
			json["scoutIds"]=[act,secact];
			json["notes"]=$("#extratext").val();
			json["drivetrain"]["drivetrainShifts"]=$("input[name='drivetrainShifts']:checked").val();
			json["gears"]["active"]=$("input[name='gearmech']:checked").val();
			if ($("input[name='drivetrainType']:checked").val()!="other") {
				json["drivetrain"]["drivetrainType"]=$("input[name='drivetrainType']:checked").val();
			} else {
				json["drivetrain"]["drivetrainType"]=$("#driveoptions").val();
			}
			if ($("input[name='lang']:checked").val()!="other") {
				json["language"]=$("input[name='lang']:checked").val();
			} else {
				json["language"]=$("#langoptions").val();
			}
			json["canClimb"]=$("input[name='canClimb']:checked").val();
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
		 	var array;
		 	if (fs.existsSync('manifest.json')) {
				array = JSON.parse(fs.readFileSync("manifest.json"));
			} else {
				array = []
			}
		 	array.push(team+".json");
		 	var stringed = JSON.stringify(array);
		 	createFile("manifest.json",stringed);
		 	removeTemp();
		 	dialogs.alert("The data has been saved", function(ok) {
			 	remote.getCurrentWindow().reload();
		 	});
		 } else {
		 	dialogs.alert("You have not filled in "+message+".");
		 }
	});
	$(".deselect-dt").click(function(){
		$("#driveoptions").hide();
	});
	$(".deselect-wh").click(function(){
		$("#wheeloptions").hide();
	});
	$(".deselect-ln").click(function(){
		$("#langoptions").hide();
	});
	$("#teamsubmit").click(function(){
		team = $("#teaminput").val();
		if (team!="") {
			$("#teaminput").attr("disabled", true);
			$("#teamsubmit").attr("disabled", true);
			$("#scouting").animate({opacity:'1.0',top:'120'},1600);
			$("#teamdisplay").text(team);
			$("#teaminput").val("");
			$("#round1").show();
			$("#round2").hide();
			$("#round3").hide();
			$("#round4").hide();
			$("#round5").hide();
			$("#round6").hide();
			$("#round7").hide();
			$("#previous").hide();
			createTemp();
		} else {
			dialogs.alert("I'm pretty sure the team your scouting has a number.");
		}
	});
	$("#forgetid").click(function(){
		$("body").css("overflow", "auto");
		$("#dir").animate({opacity:'1.0',top:'0'},1600);
		$("#check").animate({opacity:'0.0',top:'700px'},1600);
		$("#top").animate({opacity:'0.0',top:'-300px'},1600);
	});
	$(".backdir").click(function(){
// 		window.scrollTo(0, 0);
		$("body").css("overflow", "hidden");
		$("#dir").animate({opacity:'0.0',top:'700px'},1600);
		$("#top").animate({opacity:'1.0',top:'0'},1600);
	});
});