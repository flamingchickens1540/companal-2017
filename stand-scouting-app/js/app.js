window.$ = window.jQuery = require('jquery');
// var sliderjs = require('bootstrap-slider');
var noUiSlider = require('nouislider');
var chartjs = require('chart.js');
var fs = require('fs');
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
	$('#fuel-end').hide();
	$('.pie').hide();
	$('.grades').hide();
	$('.badge-hide').hide();
});
// FS
function createFile(fileName, text){
	var fs = require('fs');
	fs.writeFile(fileName, text, function(err) {
    	if (err) {
        	return console.log(err);
		}
	});
}
function appendFile(fileName, text){
	var fs = require('fs');
	fs.appendFile(fileName, text, function(err) {
		if (err) {
			return console.log(err);
		}
	});
}
function readFile(fileName){
	var fs = require('fs');
	fs.readFile(fileName, function (err, data){
  	if (err) {
    	return console.error(err);
   	};
	 $('#match-number-number').val(data.toString());
	});
}
function deleteFile(fileName){
	var fs = require("fs");
	fs.unlink(fileName, function(err) {
  	if (err) {
    	return console.error(err);
  	}
	});
}
function infoFile(fileName) {
	var fs = require("fs");
	fs.stat(fileName, function (err, stats) {
	   if (err) {
	       return console.error(err);
	   }
	});
}
readFile("matchNum.txt");
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
	"17": "Ava",
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
		$('#login-input-number').css("border", "3px solid #5cb85c");
	} else if (!accounts.hasOwnProperty(num)) {
			$('#no-login').show();
			$('#login-input-number').css("border", "3px solid #d9534f");
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
$('#teleop-next').click(function(){
	$('#teleop').fadeOut(500);
	$('#fuel-end').delay(500).fadeIn(500);
});
$('#teleop-back').click(function(){
	$('#teleop').fadeOut(500);
	$('#post-login').delay(500).fadeIn(500);
});
var teleopFuel = [];
$('#teleop-fuel-submit').click(function(){
	teleopFuel.push($('input[name="teleop-radio-fuel"]:checked').val());
	$('.badge-hide').show();
	$('.badge-replace').replaceWith("<span class=\"badge-replace\">" + teleopFuel.length + "</span>");
	$('#teleop-fuel').replaceWith('<div id="teleop-fuel" class="btn-group" data-toggle="buttons"><span id="teleop-fuelcycle-lt10" class="btn btn-danger"><input type="radio" name="teleop-radio-fuel" value="<10" autocomplete="off">&lt;10</span><span id="teleop-fuelcycle-1025" class="btn btn-warning"><input type="radio" name="teleop-radio-fuel" value="10-25" autocomplete="off">10-25</span><span id="teleop-fuelcycle-2540" class="btn btn-primary"><input type="radio" name="teleop-radio-fuel" value="25-40" autocomplete="off">25-40</span><span id="teleop-fuelcycle-gt40" class="btn btn-success"><input type="radio" name="teleop-radio-fuel" value=">40" autocomplete="off">&gt;40</span</div>')
});
function teleopgearnum(val) {
    var qty = document.getElementById('teleop-gear').value;
    var new_qty = parseInt(qty,10) + val;
    if (new_qty < 0){
        new_qty = 0;
    }
    document.getElementById('teleop-gear').value = new_qty;
    return new_qty;
}
// Fuel End
$('#fuel-back').click(function(){
	$('#fuel-end').fadeOut(500);
	$('#teleop').delay(500).fadeIn(500);
});
$('#fuel-next').click(function(){
	$('#fuel-end').fadeOut(500);
	$('.pie').delay(500).fadeIn(500);
});
var fuelEndHopper = false;
var fuelEndHuman = false;
var fuelEndFloor = false;
$('#teleop-fuelload-hopper').click(function(){
	fuelEndHopper = !fuelEndHopper;
});
$('#teleop-fuelload-human').click(function(){
	fuelEndHuman = !fuelEndHuman;
});
$('#teleop-fuelload-floor').click(function(){
	fuelEndFloor = !fuelEndFloor;
});
// Pie
$('.pie-hide-button').hide();
$('#myChart').hide();
$('#pie-label').hide();
$('#pie-back').click(function(){
	$('.pie').fadeOut(500);
	$('#fuel-end').delay(500).fadeIn(500);
});
$('#pie-next').click(function(){
	$('.pie').fadeOut(500);
	$('.grades').delay(500).fadeIn(500);
});
$('#pie-show-editor').click(function(){
	$('.pie-hide-button').fadeOut(500);
	$('#pie-label').fadeOut(500);
	$('#myChart').fadeOut(500);
	$('.pie-hide').delay(500).fadeIn(500);
});
// $("#pie-shooting").slider({});
// $("#pie-gearing").slider({});
// $("#pie-defense").slider({});
// $("#pie-climbing").slider({});
// $("#pie-futzing").slider({});
var slider = document.getElementById('slider-color');
noUiSlider.create(slider, {
	start: [20, 40, 60, 80],
	behavior: 'tap',
	connect: [true, true, true, true, true],
	range: {
		'min': [0],
		'max': [100]
	}
});
var connect = slider.querySelectorAll('.noUi-connect');
var classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];
for(var i = 0; i < connect.length; i++){
    connect[i].classList.add(classes[i]);
}
var sliderArray = slider.noUiSlider.get();
var sliderShoot = parseInt(parseFloat(sliderArray[0]).toFixed(2));
var sliderGear = parseFloat(sliderArray[1]).toFixed(2) - sliderShoot;
var sliderDefense = parseFloat(sliderArray[2]).toFixed(2) - sliderGear - sliderShoot;
var sliderClimb = parseFloat(sliderArray[3]).toFixed(2) - sliderDefense - sliderGear - sliderShoot;
var sliderFutz = 100 - sliderClimb - sliderDefense - sliderGear - sliderShoot;
// Grades
$('#grades-back').click(function(){
	$('.grades').fadeOut(500);
	$('.pie').delay(500).fadeIn(500);
});
$('#grades-next').click(function(){
	$('.grades').fadeOut(500);
	$('#last-textarea').delay(500).fadeIn(500);
});
// Last Textarea
$('#textarea-back').click(function(){
	$('#last-textarea').fadeOut(500);
	$('#fuel-end').delay(500).fadeIn(500);
});
// $('#continue').click(function(){
// 	$('.betting').fadeIn(500);
// 	$('.comments').val("");
// 	$("#auto-form").replaceWith('<form id="auto-form"><h3 style="text-align: center;">Crossed Line</h3><div class="btn-group" data-toggle="buttons"><label id="auto-cross" class="btn btn-info"><input type="radio" name="auto-radio-cross" autocomplete="off">Crossed</label><label id="auto-no-cross" class="btn btn-info"><input type="radio" name="auto-radio-cross" autocomplete="off">Not Crossed</label></div><hr><h3 style="text-align: center;">Gear Placed</h3><div class="btn-group" data-toggle="buttons"><label id="auto-gear" class="btn btn-info"><input type="radio" name="auto-radio-gear" autocomplete="off">Placed</label><label id="auto-no-gear" class="btn btn-info"><input type="radio" name="auto-radio-gear" autocomplete="off">Not Placed</label></div><hr><h3 style="text-align: center;">Balls Shot</h3><div class="btn-group" data-toggle="buttons"><label id="auto-shoot" class="btn btn-info"><input type="radio" name="auto-radio-shoot" autocomplete="off">Shot Balls</label><label id="auto-no-shoot" class="btn btn-info"><input type="radio" name="auto-radio-shoot" autocomplete="off">Did Not Shoot Balls</label></div></form>');
// });
$('#sign-out').click(function(){
	window.location.reload();
	// $('#the-whole-login').fadeIn(500);
	// $('input[name=login-number]').val("");
	// $('.login-info-replace').replaceWith('<div class="login-info-replace"><br><br><br></div>');
	// $('.name').text("");
	// $('.comments').val("");
	// $('.name-div').hide();
	// $('#cont-btn').hide();
	// $('.chicken').animate({height: "143px"});
	// $('.jumbotron').animate({height: "348px"});
	// $('.jumbotron-big-title').replaceWith('<h1 class="jumbotron-big-title">Stand Scouting App</h1>');
	// $("#auto-form").replaceWith('<form id="auto-form"><h3 style="text-align: center;">Crossed Line</h3><div class="btn-group" data-toggle="buttons"><label id="auto-cross" class="btn btn-info"><input type="radio" name="auto-radio-cross" autocomplete="off">Crossed</label><label id="auto-no-cross" class="btn btn-info"><input type="radio" name="auto-radio-cross" autocomplete="off">Not Crossed</label></div><hr><h3 style="text-align: center;">Gear Placed</h3><div class="btn-group" data-toggle="buttons"><label id="auto-gear" class="btn btn-info"><input type="radio" name="auto-radio-gear" autocomplete="off">Placed</label><label id="auto-no-gear" class="btn btn-info"><input type="radio" name="auto-radio-gear" autocomplete="off">Not Placed</label></div><hr><h3 style="text-align: center;">Balls Shot</h3><div class="btn-group" data-toggle="buttons"><label id="auto-shoot" class="btn btn-info"><input type="radio" name="auto-radio-shoot" autocomplete="off">Shot Balls</label><label id="auto-no-shoot" class="btn btn-info"><input type="radio" name="auto-radio-shoot" autocomplete="off">Did Not Shoot Balls</label></div></form>');
});
$('#save-file').click(function(){
	$('#last-textarea').fadeOut(500);
	// Autonomous
	var autoCross = false;
	autoCross = $('input[name="auto-radio-cross"]:checked').val();
	// autoCross = JSON.parse(autoCross);
	if (autoCross == "true"){
		autoCross = true;
	} else if (autoCross == "false") {
		autoCross = false;
	}
	var autoCross = false;
	autoGear = $('input[name="auto-radio-gear"]:checked').val();
	// autoGear = JSON.parse(autoGear);
	if (autoGear == "true"){
		autoGear = true;
	} else if (autoGear == "false") {
		autoGear = false;
	}
	var autoShoot = false;
	autoShoot = $('input[name="auto-radio-shoot"]:checked').val();
	// autoShoot = JSON.parse(autoShoot);
	if (autoShoot == "true"){
		autoShoot = true;
	} else if (autoShoot == "false") {
		autoShoot = false;
	}
	// Tele-Op
	var teleopGear = parseInt($('#teleop-gear').val());
	var teleopClimb = $('input[name="teleop-radio-climb"]:checked').val();
	if (teleopClimb == "true"){
		teleopClimb = true;
	} else if (teleopClimb == "false") {
		teleopClimb = false;
	}
	// Fuel End
	var fuelEndAccuracy = $('input[name="fuel-end-accuracy"]:checked').val();
	var fuelEndRate = $('input[name="fuel-end-rate"]:checked').val();
	var fuelEndLoad = [];
	if (fuelEndHopper == true){
		fuelEndLoad.push("hopper");
	}
	if (fuelEndHuman == true){
		fuelEndLoad.push("human");
	}
	if (fuelEndFloor == true){
		fuelEndLoad.push("floor");
	}
	// Grades
	var gradesOverall = parseInt($('input[name="grades-overall"]:checked').val());
	var gradesShooting = parseInt($('input[name="grades-shooting"]:checked').val());
	var gradesGearing = parseInt($('input[name="grades-gearing"]:checked').val());
	var gradesDefense = parseInt($('input[name="grades-defense"]:checked').val());
	var gradesClimbing = parseInt($('input[name="grades-climbing"]:checked').val());
	// File
	var json = {
		scoutId: $('input[name=login-number]').val(),
		bettingPick: jsonBet,
		auto: {
			crossedLine: autoCross,
			depositedGear: autoGear,
			shotCycle: autoShoot
		},
		teleop: {
			balls: {
				cycles:  teleopFuel,
				accuracy: fuelEndAccuracy,
				shotRate: fuelEndRate,
				loadingZones: fuelEndLoad
			},
			gearsDeposited: teleopGear,
			climbed: teleopClimb
		},
		notes: $('.comments').val(),
		strategy: {
			pieChart: {
				// shooting: parseInt($("#pie-shooting").val()),
				// gearing: parseInt($("#pie-gearing").val()),
				// defense: parseInt($("#pie-defense").val()),
				// climbing: parseInt($("#pie-climbing").val()),
				// futzing: parseInt($("#pie-futzing").val())
				shooting: sliderShoot,
				gearing: sliderGear,
				defense: sliderDefense,
				climbing: sliderClimb,
				futzing: sliderFutz
			},
			grades: {
				overall: gradesOverall,
				shooting: gradesShooting,
				gearing: gradesGearing,
				defense: gradesDefense,
				climbing: gradesClimbing
			}
		}
	};
	var stringify = JSON.stringify(json);
	createFile(__dirname + "/data/" + "m" + $("#match-number-number").val() + "-" + accounts[act] + ".json", stringify);
	deleteFile('matchNum.txt');
	createFile('matchNum.txt', parseInt($("#match-number-number").val()) + 1);
	if (fs.existsSync('manifest.json') == false) {
		fs.writeFileSync('manifest.json', "[]")
	}
	var manifestRead = fs.readFileSync('manifest.json', 'utf-8');
	console.log(manifestRead);
	var manifestParse = JSON.parse(manifestRead);
	console.log(manifestParse);
	manifestParse.push("m" + $("#match-number-number").val() + "-" + accounts[act] + ".json");
	var mStringify = JSON.stringify(manifestParse);
	fs.writeFileSync('manifest.json', mStringify);
});
// function add_match(val) {
//     var qty = document.getElementById('match-number-number').value;
//     var new_qty = parseInt(qty,10) + val;
//     document.getElementById('match-number-number').value = new_qty;
//     return new_qty;
// }
// getmac
require('getmac').getMac(function(err,macAddress){
    if (err)  throw err
    console.log(macAddress)
});
