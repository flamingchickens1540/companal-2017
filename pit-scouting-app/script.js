//function create(n,num) {
	//var act = {name:n,number:num};
	//accounts.push(act);
//}
var accounts = {"55":"Dylan",
				"66":"Fin",
				"15":"Tristan",
				"40":"Ryan",
				"96":"Alexander",
				"32":"Jake",
				"77":"Dale",
				"24":"Amber",
				"64":"Hammad",
				"01":"Ben",
				"13":"Liam B",
				"72":"Josephine",
				"98":"Adolfo",
				"59":"Tyler",
				};
var logged = false;
var act = "none";

$(document).ready(function(){
	$("#logbutton").click(function(){
		var num = $("#lognum").val();
		if (accounts.hasOwnProperty(num)) {
			act=num;
			logged=true;
			$("#yourname").text(accounts[num]);
			$("#check").animate({opacity:'1.0',top:'175'},1600);
		}
		$("#lognum").val("");
		$("#logname").val("");
	});
	$("#yes").click(function(){
		$("#top").animate({top:'-200px',opacity:'0.5'},1600);
		$("#check").animate({opacity:'0.5',top:'-200px'},1600);
		$("#scouting").animate({opacity:'1.0',top:'0'},1600);
		$("#title").text(accounts[act]);
	});
	$("#no").click(function(){
		$("#check").animate({top:'400px',opacity:'0.0'},1600);
		act="none"
		logged=false;
	});
	$("#signout").click(function(){
		$("#lognum").val("");
		$("#logname").val("");
		$("#scouting").animate({opacity:'0.0',top:'600px'},1600);
		$("#top").animate({opacity:'1.0',top:'0'},1600);
		act="none";
		logged=false;
	});
});