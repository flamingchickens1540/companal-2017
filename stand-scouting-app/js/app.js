// General
$(document).ready(function(){
	$('.login-info').hide();
	$('.name-div').hide();
	$('#no-login').hide();
	$('#cont-btn').hide();
	$('.betting').hide();
	$('#post-login').hide();
	$('#success-alert').hide();
	$('#last-textarea').hide();
	$('#teleop').hide();
});
// Save File
function createFile(fileName, text) {
	var fs = require('fs');
	fs.writeFile(fileName, text, function(err) {
    	if (err) {
        	return console.log(err);
		}
	});
}
function appendFile(fileName, text) {
	var fs = require('fs');
	fs.appendFile(fileName, text, function(err) {
		if (err) {
			return console.log(err);
		}
	});
}
// $('#save-file').click(function(){
// 	$('#save-alert').show();
// 	var fs = require("fs");
// 	NB causes files to save in both __dirname and __dirname/data/
// 	// Unreadable
// 	fs.writeFile($('input[name=message]').val() + " - Match " + $('input[name=message1]').val() + ' - Unreadable.txt', '',  function(err) {
// 		 if (err) {
// 				return console.error(err);
// 		 };
// 	});
// 	// Readable
// 	fs.writeFile($('input[name=message]').val() + " - Match " + $('input[name=message1]').val() + ' - Readable.txt', '',  function(err) {
// 		 if (err) {
// 				return console.error(err);
// 		 };
// 	});
// 	// Unreadable
// 	var hfilepath = __dirname + "/data/" + 'Unreadable.txt';
// 	var hcontent = "FIRST Steamworks 2017"
// 	+ "\n"
// 	+ "TEAM 1540 FLAMING CHICKENS STAND SCOUTING APPLICATION"
// 	+ "\n"
// 	+ "___________________________________________________________________________"
// 	+ "\n"
// 	// + Betting
// 	+ "\n"
// 	+ "Additional Comments: "
// 	+ $('.comments').val();
// 	fs.writeFile(hfilepath, hcontent, function (err) {
// 		if(err){
// 					console.log("An error ocurred updating the file"+ err.message);
// 					console.log(err);
// 					return;
// 		}
// 		console.log("The h file has been succesfully saved");
// 	});
// 	// Readable
// 	var cfilepath = __dirname + "/data/" + 'Readable.json';
// 	var ccontent = $('.comments').val();
// 	fs.writeFile(cfilepath, ccontent, function (err) {
// 		if(err){
// 					console.log("An error ocurred updating the file"+ err.message);
// 					console.log(err);
// 					return;
// 		}
// 		console.log("The c file has been succesfully saved");
// 	});
// });
// Login
var accounts = {
	"15": "Tristan Peng",
	"55": "Dylan Smith",
	"66": "Fin Hoyer",
	"40": "Ryan Selden",
	"18": "Liam Wang"
	"51": "Lauren Mei Calora",
	"96": "Alexander Mackworth",
	"98": 'Adolfo "Wukong" Apolloni'
};
function createTable() {
    var keys = Object.keys(accounts);
    for (x in keys) {
        $("tbody").append("<tr><td>"+accounts[keys[x]]+"</td><td>"+keys[x]+"</td></tr>");
    }
}
createTable();
var loggedIn = false;
var act = "none";
$('#login-button').click(function(){
	var num = $('input[name=login-number]').val();
	if (accounts.hasOwnProperty(num)) {
		act = num;
		logged = true;
		$('.name').text("Welcome, " + accounts[act] + "!");
		$('.name-div').fadeIn(250);
		$('#cont-btn').delay(250).fadeIn(250);
		$('.jumbotron').animate({top: "-50px"});
		$('.chicken').animate({height: "100px"});
		$('.jumbotron').animate({height: "250px"});
		$('.jumbotron-big-title').replaceWith('<h2 class="jumbotron-big-title">Stand Scouting App</h2>')
		$('.login-info').delay(250).fadeIn(500);
		$('.login-info-replace').replaceWith("<h3>" + num + " | " + accounts[act] + "</h3>");
		createFile(__dirname + "data/" + accounts[act] + ".json", num + " | " + accounts[act]);
		// TODO: add other stuff to json file name. ALSO remember to replace all other appendFiles!!!
	}	else if (!accounts.hasOwnProperty(num)) {
		$('#no-login').show();
	}
});
$('.close').click(function(){
	$('#no-login').fadeOut(125);
});
$('#cont-btn').click(function(){
	$('#the-whole-login').fadeOut(500);
	$('.betting').delay(500).fadeIn(500);
});
// Betting
$('#bet-blue-win, #bet-red-win').click(function(){
	$('.betting').fadeOut(500);
	$('#post-login').delay(500).fadeIn(500);
});
$('#bet-red-win').click(function(){
	appendFile(__dirname + "data/" + accounts[act] + ".json", "\nRed");
});
$('#bet-blue-win').click(function(){
	appendFile(__dirname + "data/" + accounts[act] + ".json", "\nBlue");
});
// Post-Login
$('#auto-next').click(function(){
	$('#post-login').fadeOut(500);
	$('#teleop').delay(500).fadeIn(500);
});
// $('#auto-back').click(function(){
// 	$('#post-login').fadeOut(500);
// 	$('.betting').delay(500).fadeIn(500);
// });
// Tele-Op
$('#teleop-next').click(function(){
	$('#teleop').fadeOut(500);
	$('#last-textarea').delay(500).fadeIn(500);
});
$('#teleop-back').click(function(){
	$('#teleop').fadeOut(500);
	$('#post-login').delay(500).fadeIn(500);
});
// Last Textarea
$('#textarea-back').click(function(){
	$('#last-textarea').fadeOut(500);
	$('#teleop').delay(500).fadeIn(500);
});
$('#sign-out').click(function(){
	window.location.reload();
});
$('#save-file').click(function(){
	document.write('<h2 style="font-family: Montserrat;">Hello, World!</h2>');
	appendFile(__dirname + "data/" + accounts[act] + ".json", "\n" + $('.comments').val());
});
// NOTE: account[act] for #save-file
// getmac
require('getmac').getMac(function(err,macAddress){
    if (err)  throw err
    console.log(macAddress)
})
