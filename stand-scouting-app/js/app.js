window.$ = window.jQuery = require('jquery');
// General
$(document).ready(function(){
	$('.login-info').hide();
	$('.name-div').hide();
	$('#no-login').hide();
	$("#forgot-id").hide();
	$('#cont-btn').hide();
	$('.betting').hide();
	$('#post-login').hide();
	$('#success').hide();
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
// Login
var accounts = {
	"15": "Tristan Peng"
};
function createTable() {
    var keys = Object.keys(accounts);
    for (x in keys) {
        $("tbody").append("<tr><td>" + keys[x] + "</td><td>" + accounts[keys[x]] + "</td></tr>");
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
		$('.chicken').animate({height: "100px"});
		$('.jumbotron').animate({height: "250px"});
		$('.jumbotron-big-title').replaceWith('<h2 class="jumbotron-big-title">Stand Scouting App</h2>');
		$('.login-info').delay(250).fadeIn(500);
		$('.login-info-replace').replaceWith('<h3 class="login-info-replace">' + num + " | " + accounts[act] + "</h3>");
	} else if (!accounts.hasOwnProperty(num)) {
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
// Forgot ID
$('#forgot-id-button').click(function(){
	$("#the-whole-login").fadeOut(500);
	$('#forgot-id').delay(500).fadeIn(500);
});
$('#forgot-id-back').click(function(){
	$('#forgot-id').fadeOut(500);
	$('#the-whole-login').delay(500).fadeIn(500);
});
// Betting
var jsonBet;
$('#bet-blue-win, #bet-red-win').click(function(){
	$('.betting').fadeOut(500);
	$('#post-login').delay(500).fadeIn(500);
});
$('#bet-red-win').click(function(){
	jsonBet = "Red";
});
$('#bet-blue-win').click(function(){
	jsonBet = "Blue";
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
var autoCross = false;
$('#auto-cross').click(function(){
	autoCross = true;
});
var autoGear = false;
$('#auto-gear').click(function(){
	autoGear = true;
});
var autoShoot = false;
$('#auto-shoot').click(function(){
	autoShoot = true;
});
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
	$('#the-whole-login').fadeIn(500);
	$('input[name=login-number]').val("");
	$('.login-info-replace').replaceWith('<div class="login-info-replace"><br><br><br></div>');
	$('.name').text("");
	$('.comments').text("");
	$('.name-div').hide();
	$('#cont-btn').hide();
	$('.chicken').animate({height: "143px"});
	$('.jumbotron').animate({height: "348px"});
	$('.jumbotron-big-title').replaceWith('<h1 class="jumbotron-big-title">Stand Scouting App</h1>');
});
$('#save-file').click(function(){
	$('#last-textarea').fadeOut(500);
	var json = {
		scoutId: $('input[name=login-number]').val(),
		bettingPick: jsonBet,
		auto: {
			crossedLine: autoCross,
			depositedGear: autoGear,
			shotCycle: autoShoot
		},
		notes: $('.comments').val()
	};
	var stringify = JSON.stringify(json);
	appendFile(__dirname + "/data/" + accounts[act] + ".json", stringify);
});
// TODO: make radios deselectable
function add_match(val) {
    var qty = document.getElementById('match-number-number').value;
    var new_qty = parseInt(qty,10) + val;
    document.getElementById('match-number-number').value = new_qty;
    return new_qty;
}
// getmac
require('getmac').getMac(function(err,macAddress){
    if (err)  throw err
    console.log(macAddress)
})
