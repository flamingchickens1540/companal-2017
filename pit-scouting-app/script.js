var fs = require('fs');
var WebCamera = require("webcamjs");

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


var accounts = {"01":"Ben",
				"05":"Nicholas",
				"12":"Jonathan",
				"15":"Tristan",
				"18":"Liam W",
				"19":"Andrei",
				"20":"Holly",
				"22":"Ava",
				"24":"Amber",
				"26":"Ruby",
				"31":"Jake",
				"34":"Spencer",
				"37":"Aarushi",
				"39":"Kean",
				"40":"Ryan",
				"42":"David",
				"44":"Alexander Y",
				"48":"Kobi",
				"49":"Claire",
				"51":"Lauren Mei",
				"55":"Dylan",
				"59":"Tyler",
				"60":"Natalie",
				"64":"Hammad",
				"66":"Fin",
				"70":"Bailey",
				"71":"Culla",
				"72":"Josephine",
				"75":"Noor",
				"79":"Hannah",
				"82":"Marti",
				"85":"Robin",
				"92":"Zachary",
				"95":"Quinn",
				"96":"Alexander M",
				"98":"Adolfo",
				"99":"Liam B",
				"00":"Anonymous Scout"
				};
var json = {
	teamNumber: "0000",
	scoutIds: [00,00],
	drivetrain: {
		drivetrainShifts:true,
		drivetrainType:"mecanum",
		motorType:"775pro",
		motorCount:17,
		wheelType:"omni"
	},
	defense: {
		willDefend: true, //is the team willing to defend?
		hasDefended: false, //has it been their strategy to defend?
	},
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
var secact = "none";
var team = "none";
var round = 1;
var gearHuman = false;
var gearFloor = false;
var ballFloor = false;
var ballHuman = false;
var ballHopper = false;

$(document).ready(function(){
	createTable();
	$("body").css("overflow", "hidden");
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
			$("#noid").show(chosen);
			$("#alertid").text(chosen);
			$("#check").animate({top:'700px',opacity:'0.0'},1600);
			logged=false;
			act="none";
			secact="none";
		}
		$("#logname").val("");
	});
	$(".close").click(function(){
		$("#noid").hide();
		$("#secondscout").hide();
	});
	$("#next").click(function(){
		round+=1;
		if (round==2) {
			$("#roundtwo").show();
			$("#roundone").hide();
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
		$("#lognum").val("");
		$("#lognumb").val("");
		$("#logname").val("");
		$("#teamsel").animate({opacity:'0.0',top:'700px'},1600);
		$("#scouting").animate({opacity:'0.0',top:'700px'},1600);
		$("#top").animate({opacity:'1.0',top:'0'},1600);
		$("#camerabox").animate({opacity:'0.0',top:'700px'},1600);
		act="none";
		secact="none";
		logged=false;
	});
	$("#gearfloor").click(function(){
		gearFloor = !gearFloor;
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
	$("#otherwheel").click(function(){
		$("#wheeloptions").show();
	});
	$("#othermotor").click(function(){
		$("#motoroptions").show();
	});
	$("#submit").click(function(){
		$("#driveoptions").hide();
	 	$("#motoroptions").hide();
	 	$("#wheeloptions").hide();
		json["teamNumber"]=team;
		json["scoutIds"]=[act,secact];
		json["notes"]=$("#extratext").val();
		json["drivetrain"]["drivetrainShifts"]=$("input[name='drivetrainShifts']:checked").val();
		if ($("input[name='drivetrainType']:checked").val()!="other") {
			json["drivetrain"]["drivetrainType"]=$("input[name='drivetrainType']:checked").val();
		} else {
			json["drivetrain"]["drivetrainType"]=$("#driveoptions").val();
		}
		if ($("input[name='motorType']:checked").val()!="other") {
			json["drivetrain"]["motorType"]=$("input[name='motorType']:checked").val();
		} else {
			console.log($("#motoroptions").val());
			json["drivetrain"]["motorType"]=$("#motoroptions").val();
		}
		json["drivetrain"]["motorCount"]=$("#motorcount").val();
		if ($("input[name='wheelType']:checked").val()!="other") {
			json["drivetrain"]["wheelType"]=$("input[name='wheelType']:checked").val();
		} else {
			json["drivetrain"]["wheelType"]=$("#wheeloptions").val();
		}
		json["canClimb"]=$("input[name='canClimb']:checked").val();
		json["defense"]["willDefend"]=$("input[name='willDefend']:checked").val();
		json["defense"]["hasDefended"]=$("input[name='hasDefended']:checked").val();
		json["weight"]=$("#roboweight").val();
		json["shooting"]["hasHigh"]=$("input[name='hasHigh']:checked").val();
		json["shooting"]["hasLow"]=$("input[name='hasLow']:checked").val();
		json["shooting"]["ballCapacity"]=$("input[name='ballCapacity']:checked").val();
		json["shooting"]["floorLoading"]=ballFloor;
		json["shooting"]["humanLoading"]=ballHuman;
		json["shooting"]["hopperLoading"]=ballHopper;
		json["shooting"]["efficiency"]=$("input[name='ballCapacity']:checked").val();
		json["gears"]["canDeposit"]=$("input[name='gears']:checked").val();
		json["gears"]["floorLoading"]=gearFloor;
		json["gears"]["humanLoading"]=gearHuman;
		var str = "pit_data/"+team+".json";
		var spotify = JSON.stringify(json);
	 	createFile(str,spotify);
	 	var array = JSON.parse(fs.readFileSync("manifest.json"));
	 	array.push(team+".json");
	 	var stringed = JSON.stringify(array);
	 	createFile("manifest.json",stringed);
	 	$("#extratext").val("");
	 	$("#motoroptions").val("");
	 	$("#wheeloptions").val("");
	 	$("#driveoptions").val("");
	 	gearHuman = false;gearFloor = false;ballFloor = false;ballHuman = false;ballHopper = false;
	 	$("#scouting").animate({opacity:'0.0',top:'700px'},1600);
	 	json=def;
	 	round=1;
	});
	$("#teamsubmit").click(function(){
		team = $("#teaminput").val();
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