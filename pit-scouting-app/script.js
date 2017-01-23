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
				"51":"Lauren Mwi",
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
	accountNums: act+", "+secact,
	accountNames: accounts[act]+", "+accounts[secact],
	otherInfo: ""
}
var logged = false;
var act = "none";
var secact = "none";
var team = "none";

$(document).ready(function(){
	createTable();
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
			$("#check").animate({opacity:'1.0',top:'235'},1600);
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
		}
		$("#logname").val("");
	});
	$(".close").click(function(){
		$("#noid").hide();
		$("#secondscout").hide();
	});
	$("#yes").click(function(){
		$("#top").animate({top:'-300px',opacity:'0.0'},1600);
		$("#check").animate({opacity:'0.0',top:'-300px'},1600);
		$("#teamsel").animate({opacity:'1.0',top:'0'},1600);
		json["accountNums"]=act+", "+secact;
		json["accountNames"]=accounts[act]+", "+accounts[secact];
		if (secact=="-") {
			$(".title").text(accounts[act]);
		} else {
			$(".title").text(accounts[act]+", "+accounts[secact]);
		}
	});
	$("#no").click(function(){
		$("#check").animate({top:'400px',opacity:'0.0'},1600);
		logged=false;
		act="none";
		secact="none";
	});
	$(".signout").click(function(){
		$("#lognum").val("");
		$("#lognumb").val("");
		$("#logname").val("");
		$("#teamsel").animate({opacity:'0.0',top:'600px'},1600);
		$("#scouting").animate({opacity:'0.0',top:'600px'},1600);
		$("#top").animate({opacity:'1.0',top:'0'},1600);
		$("#camerabox").animate({opacity:'0.0',top:'600'},1600);
		act="none";
		secact="none";
		logged=false;
	});
	$("#submit").click(function(){
		var val = $("#extratext").val();
		json["otherInfo"]=val;
		var str = "pit_data/"+team+".json";
		var spotify = JSON.stringify(json);
		if (!fs.existsSync(str)) {
	 		createFile(str,spotify);
	 	} else {
	 		appendFile(str,"\n"+spotify);
	 	}
	 	$("#extratext").val("");
	 	$("#scouting").animate({opacity:'0.0',top:'600px'},1600);
	});
	$("#teamsubmit").click(function(){
		team = $("#teaminput").val();
		$("#scouting").animate({opacity:'1.0',top:'125'},1600);
		$("#teamdisplay").text(team);
		$("#teaminput").val("");
	});
	$("#forgetid").click(function(){
		$("#dir").animate({opacity:'1.0',top:'0'},1600);
		$("#check").animate({opacity:'0.0',top:'600px'},1600);
		$("#top").animate({opacity:'0.0',top:'-300px'},1600);
	});
	$("#backdir").click(function(){
		$("#top").animate({opacity:'1.0',top:'0'},1600);
		$("#dir").animate({opacity:'0.0',top:'600px'},1600);
	});
});