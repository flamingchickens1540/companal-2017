function createFile(one,two) {
	var fs = require('fs');
	fs.writeFile(one, two, function(err) {
    	if (err) {
        	return console.log(err);
		}
	});
}

function appendFile(one,two) {
	var fs = require('fs');
	fs.appendFile(one,two, function(err) {
		if (err) {
			return console.log(err);
		}
	});
}

var accounts = {"55":"Dylan",
				"66":"Fin",
				"15":"Tristan",
				"40":"Ryan",
				"96":"Alexander",
				"31":"Jake",
				"76":"Dale",
				"24":"Amber",
				"64":"Hammad",
				"01":"Ben",
				"13":"Liam B",
				"72":"Josephine",
				"98":"Adolfo",
				"59":"Tyler",
				"00":"Anonymous Scout" 
				};
var logged = 0;
var act = "none";
var secact = "none";
var team = "none";

$(document).ready(function(){
	$("#logbutton").click(function(){
		var num = $("#lognum").val();
		if (accounts.hasOwnProperty(num)) {
			logged+=1;
			if (logged==1) {
				act=num;
			} else if (logged==2) {
				secact=num;
			}
			$("#yourname").text(accounts[num]);
			$("#check").animate({opacity:'1.0',top:'175'},1600);
		} else {
			$("#noid").show();
		}
		$("#lognum").val("");
		$("#logname").val("");
	});
	$(".close").click(function(){
		$("#noid").hide();
		$("#secondscout").hide();
	});
	$("#yes").click(function(){
		if (logged==2) {
			$("#top").animate({top:'-200px',opacity:'0.0'},1600);
			$("#check").animate({opacity:'0.0',top:'-200px'},1600);
			$("#teamsel").animate({opacity:'1.0',top:'0'},1600);
			$(".title").text(accounts[act]+", "+accounts[secact]);
		} else if (logged==1) {
			$("#secondscout").show();
			$("#check").animate({top:'400px',opacity:'0.0'},1600);
		}
	});
	$("#no").click(function(){
		$("#check").animate({top:'400px',opacity:'0.0'},1600);
		logged-=1;
		if (logged==0) {
			act="none";
		} else if (logged==1) {
			secact="none";
		}
	});
	$(".signout").click(function(){
		$("#lognum").val("");
		$("#logname").val("");
		$("#teamsel").animate({opacity:'0.0',top:'600px'},1600);
		$("#scouting").animate({opacity:'0.0',top:'600px'},1600);
		$("#top").animate({opacity:'1.0',top:'0'},1600);
		act="none";
		secact="none";
		logged=0;
	});
	$("#submit").click(function(){
		var fs = require('fs');
		var val = $("#extratext").val();
		var str = "pit_data/"+team+".json";
		if (!fs.existsSync(str)) {
	 		createFile(str,act+"|"+secact+"|"+val);
	 	} else {
	 		appendFile(str,"\n"+act+"|"+secact+"|"+val);
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
		$("#top").animate({opacity:'0.0',top:'-200px'},1600);
	});
	$("#backdir").click(function(){
		$("#top").animate({opacity:'1.0',top:'0'},1600);
		$("#dir").animate({opacity:'0.0',top:'-450px'},1600);
	});
});
