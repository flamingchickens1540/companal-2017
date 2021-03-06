window.$ = window.jQuery = require('jquery');
// var sliderjs = require('bootstrap-slider');
var noUiSlider = require('nouislider');
var chartjs = require('chart.js');
var fs = require('fs-extra');
var Dialogs = require('dialogs');
var dialogs = Dialogs(opts = {});
// // getmac
// var teamColor;
// var teamNum;
// var macAddress;
// var address = JSON.parse(fs.readFileSync('json/macAddress.json', 'utf-8'));
// var dwight = address.dwight;
// var holly = address.holly;
// var angela = address.angela;
// var michael = address.michael;
// var jim = address.jim;
// var pam = address.pam;
// var addressArray = [dwight, holly, angela, michael, jim, pam];
// require('getmac').getMac(function(err,macAddress){
// 	if (err)  throw err
// 	macAddress = macAddress.replace(/-/g, '').replace(/:/g, '');
// 	switch (macAddress) {
// 		case addressArray[0].macAddress:
// 			teamColor = "Blue 3";
// 			break;
// 		case "9801a7cb4b19":
// 			teamColor = "Green 1";
// 			break;
// 		case addressArray[1].macAddress:
// 			teamColor = "Red 2";
// 			break;
// 		case addressArray[2].macAddress:
// 			teamColor = "Red 3";
// 			break;
// 		case addressArray[3].macAddress:
// 			teamColor = "Blue 2";
// 			break;
// 		case addressArray[4].macAddress:
// 			teamColor = "Blue 1";
// 			break;
// 		case addressArray[5].macAddress:
// 			teamColor = "Red 1";
// 			break;
// 		default:
// 			alert("This is not a 1540 verified tablet. :(");
// 			teamColor = "Red 1";
// 	}
// 	// Too lazy to name this section
// 	var newRole = fs.readFileSync('role.txt');
// 	var schedule = JSON.parse(fs.readFileSync('json/matchSched.json', "utf-8"));
// 	for (i in schedule) {
// 		if (i == fs.readFileSync('matchNum.txt')) {
// 			switch (teamColor) {
// 				case "Red 1":
// 					teamNum = schedule[i][0];
// 					break;
// 				case "Red 2":
// 					teamNum = schedule[i][1];
// 					break;
// 				case "Red 3":
// 					teamNum = schedule[i][2];
// 					break;
// 				case "Blue 1":
// 					teamNum = schedule[i][3];
// 					break;
// 				case "Blue 2":
// 					teamNum = schedule[i][4];
// 					break;
// 				case "Blue 3":
// 					teamNum = schedule[i][5];
// 					break;
// 				case "Green 1":
// 					teamNum = schedule[i][0];
// 					break;
// 				default:
// 					teamNum = ":(";
// 			}
// 		}
// 	}
// 	$('.team-color').append("<h3 style=\"text-align: center;\">Color: <span class='color-number'>" + teamColor + "</span>, Team Number: <span style='color: purple;'>" + teamNum + "</span>");
// 	if (addressArray.color == "red") {
// 		$('.color-number').css("color", "red");
// 	} else if (addressArray.color == "blue") {
// 		$('.color-number').css("color", "blue");
// 	} else if (macAddress = "9801a7cb4b19") {
// 		$('.color-number').css("color", "green");
// 	}
// });
// General
function fillOut(){
	if ($('.grades').is(':visible')) {
		dialogs.alert('Please fill out everything!');
	} else {
		dialogs.confirm(
			'You haven\'t filled out everything yet! Proceed?', function(ok) {
				if (ok) {
					if ($('#post-login').is(':visible')) {
						$('#post-login').fadeOut(500);
						$('#teleop').delay(500).fadeIn(500);
					} else if ($('#teleop').is(':visible')) {
						// if ($('#auto-shoot').hasClass('active') || $('input[name=teleop-radio-fuel]').val() == 'true') {
						// 	$('#teleop').fadeOut(500);
						// 	$('#fuel-end').delay(500).fadeIn(500);
						// } else {
							$('#teleop').fadeOut(500);
							$('.pie').delay(500).fadeIn(500);
						// }
					} else if ($('#fuel-end').is(':visible')) {
						$('#fuel-end').fadeOut(500);
						$('.pie').delay(500).fadeIn(500);
					}
				}
			}
		);
	}
};
$(document).ready(function(){
	$('#match-number-number').val(fs.readFileSync('matchNum.txt', 'utf-8'));
	$('.login-info').hide();
	$('#no-login').hide();
	$("#forgot-id").hide();
	$('#cont-btn').hide();
	// $('.betting').hide();
	$('#post-login').hide();
	$('#success').hide();
	$('#last-textarea').hide();
	$('#teleop').hide();
	$('#fuel-end').hide();
	$('.pie').hide();
	$('.grades').hide();
	$('.badge-hide').hide();
	$('.edit-match-btn').hide();
	$('.choose-role').hide();
	$('.password').hide();
	$('.finish').hide();
	$('.name-div').hide();
	// $('.betting-2').hide();
	// $('.betting-end').hide();
	var readMNum = fs.readFileSync('matchNum.txt', 'utf-8');
	var readRole = fs.readFileSync('role.txt', 'utf-8');
	var schedule = JSON.parse(fs.readFileSync('json/matchSched.json', "utf-8"));
	var teamNum;
	for (i in schedule) {
		if (i == parseInt(readMNum)) {
			switch (readRole) {
				case "r1":
					teamNum = schedule[i][0];
					break;
				case "r2":
					teamNum = schedule[i][1];
					break;
				case "r3":
					teamNum = schedule[i][2];
					break;
				case "b1":
					teamNum = schedule[i][3];
					break;
				case "b2":
					teamNum = schedule[i][4];
					break;
				case "b3":
					teamNum = schedule[i][5];
					break;
				default:
					teamNum = ":(";
			}
		}
	}
	if (fs.existsSync('data/m' + parseInt(readMNum) + '-' + readRole + '-' + teamNum +'.json')) {
		var parsedData = JSON.parse(fs.readFileSync('data/m' + parseInt(readMNum) + '-' + readRole + '-' + teamNum +'.json'));
		if (parsedData.crashed) {
			$('#login-input-number').val(parsedData.scoutId);
			$('#login-button').click();
			$('#the-whole-login').hide();
			$('#last-textarea').show();
			$('[data-toggle="popover"]').popover('hide');
			$('#textarea-back').hide();
		}
	}
	if (fs.existsSync('matchNum.txt') == false) {
		fs.writeFileSync('matchNum.txt', 1);
		window.location.reload();
	};
	if (!schedule.hasOwnProperty(fs.readFileSync('matchNum.txt', 'utf-8'))) {
		dialogs.prompt('No match number!', '1',
		function(num) {
			fs.writeFileSync('matchNum.txt', num);
			window.location.reload();
		});
	}
	// if ((fs.existsSync('json/transactions.json') == false) || (fs.readFileSync('json/transactions.json', 'utf-8') == '')) {
	// 	var noTransaction = {
	// 		"12": "0",
	// 		"13": "0",
	// 		"14": "0",
	// 		"15": "0",
	// 		"16": "0",
	// 		"17": "0",
	// 		"18": "0",
	// 		"19": "0",
	// 		"20": "0",
	// 		"21": "0",
	// 		"22": "0",
	// 		"23": "0",
	// 		"24": "0",
	// 		"25": "0",
	// 		"30": "0",
	// 		"33": "0",
	// 		"34": "0",
	// 		"36": "0",
	// 		"37": "0",
	// 		"40": "0",
	// 		"41": "0",
	// 		"44": "0",
	// 		"48": "0",
	// 		"50": "0",
	// 		"55": "0",
	// 		"58": "0",
	// 		"60": "0",
	// 		"64": "0",
	// 		"66": "0",
	// 		"72": "0",
	// 		"76": "0",
	// 		"77": "0",
	// 		"81": "0",
	// 		"96": "0",
	// 		"97": "0",
	// 		"98": "0",
	// 		"99": "0"
	// 	}
	// 	var nNT = JSON.stringify(noTransaction);
	// 	fs.writeFileSync('json/transactions.json', nNT);
	// 	window.location.reload();
	// }
	// if ((fs.existsSync('json/robobucks.json') == false) || (fs.readFileSync('json/robobucks.json', 'utf-8') == '')) {
	// 	var noRobobucks = {
	// 		"12": "100",
	// 		"13": "100",
	// 		"14": "100",
	// 		"15": "100",
	// 		"16": "100",
	// 		"17": "100",
	// 		"18": "100",
	// 		"19": "100",
	// 		"20": "100",
	// 		"21": "100",
	// 		"22": "100",
	// 		"23": "100",
	// 		"24": "100",
	// 		"25": "100",
	// 		"30": "100",
	// 		"33": "100",
	// 		"34": "100",
	// 		"36": "100",
	// 		"37": "100",
	// 		"40": "100",
	// 		"41": "100",
	// 		"44": "100",
	// 		"48": "100",
	// 		"50": "100",
	// 		"55": "100",
	// 		"58": "100",
	// 		"60": "100",
	// 		"64": "100",
	// 		"66": "100",
	// 		"72": "100",
	// 		"76": "100",
	// 		"77": "100",
	// 		"81": "100",
	// 		"96": "100",
	// 		"97": "100",
	// 		"98": "100",
	// 		"99": "100"
	// 	}
	// 	var sNR = JSON.stringify(noRobobucks);
	// 	fs.writeFileSync('json/robobucks.json', sNR);
	// 	window.location.reload();
	// };
	if (fs.existsSync('role.txt') == false) {
		fs.writeFileSync('role.txt', 'r1');
		window.location.reload();
	};
	// if (fs.existsSync('login.txt')) {
	// 	$('input[name=login-number]').val(fs.readFileSync('login.txt', 'utf-8'));
	// 	$('#login-button').click();
	// 	$('.name-div').show();
	// 	$('.name').text("Welcome, " + accounts[act] + "!");
	// } else {
	// 	$('.name-div').hide();
	// }
});
// // FS
// function createFile(fileName, text){
// 	var fs = require('fs');
// 	fs.writeFileSync(fileName, text, function(err) {
//     	if (err) {
//         	return console.log(err);
// 		}
// 	});
// }
// function appendFile(fileName, text){
// 	var fs = require('fs');
// 	fs.appendFileSync(fileName, text, function(err) {
// 		if (err) {
// 			return console.log(err);
// 		}
// 	});
// }
// function readFile(fileName){
// 	var fs = require('fs');
// 	fs.readFileSync(fileName, 'utf-8', function (err, data){
//   	if (err) {
//     	return console.error(err);
//    	};
// 	});
// }
// function deleteFile(fileName){
// 	var fs = require("fs");
// 	fs.unlinkSync(fileName, function(err) {
//   	if (err) {
//     	return console.error(err);
//   	}
// 	});
// }
// function infoFile(fileName) {
// 	var fs = require("fs");
// 	fs.statSync(fileName, function (err, stats) {
// 	   if (err) {
// 	       return console.error(err);
// 	   }
// 	});
// }
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
// 	var cfilepath = __dirname + "/data/" + 'json/Readable.json';
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
var accounts = JSON.parse(fs.readFileSync('json/scouts.json', 'utf-8'));
// var accounts = {
// 	"98": ["Adolfo", 100],
// 	"50": ["Noor", 100],
// 	"60": ["Nicholas", 100],
// 	"64": ["David", 100],
// 	"66": ["Alexander Y", 100],
// 	"81": ["Holly", 100],
// 	"24": ["Zack", 100],
// 	"25": ["Ruby", 100],
// 	"20": ["Lauren Mei", 100],
// 	"21": ["Hammad", 100],
// 	"22": ["Robin", 100],
// 	"23": ["Claire", 100],
// 	"44": ["Hannah", 100],
// 	"40": ["Fin", 100],
// 	"41": ["Amber", 100],
// 	"96": ["Liam B", 100],
// 	"77": ["Bailey", 100],
// 	"76": ["Spencer", 100],
// 	"72": ["Aarushi", 100],
// 	"97": ["Marti", 100],
// 	"58": ["Quinn", 100],
// 	"99": ["Jake", 100],
// 	"13": ["Andrei", 100],
// 	"12": ["Alexander M", 100],
// 	"15": ["Tristan", 100],
// 	"14": ["Jonathan", 100],
// 	"17": ["Ava", 100],
// 	"16": ["Tyler", 100],
// 	"19": ["Kobi", 100],
// 	"18": ["Ryan", 100],
// 	"30": ["Josephine", 100],
// 	"37": ["Kean", 100],
// 	"36": ["Liam W", 100],
// 	"34": ["Ben J", 100],
// 	"33": ["Culla", 100],
// 	"55": ["Dylan", 100],
// 	"48": ["Natalie", 100]
// };
function createTable() {
    var keys = Object.keys(accounts);
    for (x in keys) {
        $(".login-stuff").append("<tr><td>" + keys[x] + "</td><td>" + accounts[keys[x]] + "</td></tr>");
    }
};
createTable();
// Break
var roleAlert = $('.choose-role');
var loggedIn = false;
var act = "none";
$('#login-input-number').focus(function(){
	$('#login-input-number').keypress(function(){
		if (event.which == 13) {
			event.preventDefault();
			var num = $('input[name=login-number]').val();
			if (accounts.hasOwnProperty(num)) {
				act = num;
				logged = true;
				$('.name').text("Welcome, " + accounts[act] + "!");
				$('.name-div').fadeIn(250);
				$('#cont-btn').delay(250).fadeIn(250);
				$('.chicken').animate({height: "100px"});
				$('.chicken').animate({marginTop: '-2.5%'});
				$('.jumbotron-big-title').replaceWith('<h2 class="jumbotron-big-title" style="margin-top: 5px;">Stand Scouting App</h2>');
				$('.jumbotron').animate({height: "200px"}, 750);
				$('.login-info').delay(250).fadeIn(500);
				$('.login-info-replace').replaceWith('<h3 class="login-info-replace">' + num + " | " + accounts[act] + "</h3>");
				$('#login-input-number').css("border", "3px solid #5cb85c");
				$('[data-toggle="popover"]').popover();
				$('[data-toggle="popover"]').click();
			} else if (!accounts.hasOwnProperty(num) && parseInt($('#login-input-number').val()) != 69) {
				$('#no-login').show();
				$('#login-input-number').css("border", "3px solid #d9534f");
			} else if (parseInt($('#login-input-number').val()) == 69) {
				$('.password').fadeIn(500);
			}
		}
	});
});
$('#login-button').click(function(){
	var num = $('input[name=login-number]').val();
	if (accounts.hasOwnProperty(num)) {
		act = num;
		logged = true;
		$('.name').text("Welcome, " + accounts[act] + "!");
		$('.name-div').fadeIn(250);
		$('#cont-btn').delay(250).fadeIn(250);
		$('.chicken').animate({height: "100px"});
		$('.chicken').animate({marginTop: '-2.5%'});
		$('.jumbotron-big-title').replaceWith('<h2 class="jumbotron-big-title" style="margin-top: 5px;">Stand Scouting App</h2>');
		$('.jumbotron').animate({height: "200px"}, 750);
		$('.login-info').delay(250).fadeIn(500);
		$('.login-info-replace').replaceWith('<h3 class="login-info-replace">' + num + " | " + accounts[act] + "</h3>");
		$('#login-input-number').css("border", "3px solid #5cb85c");
		$('[data-toggle="popover"]').popover();
		$('[data-toggle="popover"]').click();
		// var start;
		// var totalValue;
		// function blueBet(max, min, points) {
		// 	if (((max >= (blueOpr - redOpr) && (blueOpr - redOpr) > min)) || ((max >= (redOpr - blueOpr) && (redOpr - blueOpr) > min))) {
		// 		start = 1;
		// 		totalValue = start * points;
		// 		if (totalValue < 1) {
		// 			totalValue = 1.1;
		// 		}
		// 		$('.expected').append('<h4>If you think <button type="button" id="bet-red-win-intro" class="btn btn-danger">Red</button> will win, you will get ' + totalValue + ' Robobucks for every ' + start + ' Robobuck you bet</h4>');
		// 	}
		// };
		// function redBet(max, min, points) {
		// 	if (((max >= (blueOpr - redOpr) && (blueOpr - redOpr) > min)) || ((max >= (redOpr - blueOpr) && (redOpr - blueOpr) > min))) {
		// 		start = 1;
		// 		totalValue = start * points;
		// 		if (totalValue < 1) {
		// 			totalValue = 1.1;
		// 		}
		// 		$('.expected').append('<h4>If you think <button type="button" id="bet-blue-win-intro" class="btn btn-default">Blue</button> will win, you will get ' + totalValue + ' Robobucks for every ' + start + ' Robobuck you bet</h4>');
		// 	}
		// };
		// for (i = 1; i < 2000; i++) {
		// 	redBet(10 * i, (10 * i) - 10, (20 - i) / 10);
		// 	blueBet(10 * i, (10 * i) - 10, (20 + (2 * i)) / 10);
		// };
	} else if (!accounts.hasOwnProperty(num) && parseInt($('#login-input-number').val()) != 69) {
		$('#no-login').show();
		$('#login-input-number').css("border", "3px solid #d9534f");
	} else if (parseInt($('#login-input-number').val()) == 69) {
		$('.password').fadeIn(500);
	}
});
$('.pass-submit').click(function(){
	if ($('.pass-input').val() == "team1540") {
		$('.password').fadeOut(500);
		$('.choose-role').delay(500).fadeIn(500);
	} else {
		dialogs.alert('Wrong password');
		window.location.reload();
	}
});
$('.close').click(function(){
	$('#no-login').fadeOut(125);
});
$('#cont-btn').click(function(){
	$('#the-whole-login').fadeOut(500);
	// $('.betting').delay(500).fadeIn(500);
	$('#post-login').delay(500).fadeIn(500);
	$('.flashdrive-save').fadeOut(500);
	$('[data-toggle="popover"]').popover('hide');
	$('#match-number-number').attr('readonly', 'readonly');
	// range_all_sliders = {
	// 	'min': [0, parseInt(robobucks[$('input[name=login-number]').val()]) * (1 / 10) / 2],
	// 	// '25%': [12.5, 12.5],
	// 	'20%': [parseInt(robobucks[$('input[name=login-number]').val()]) * (1 / 10), parseInt(robobucks[$('input[name=login-number]').val()]) * (1 / 10) / 2],
	// 	'40%': [parseInt(robobucks[$('input[name=login-number]').val()]) * (1 / 5), parseInt(robobucks[$('input[name=login-number]').val()]) * (1 / 10) / 2],
	// 	'60%': [parseInt(robobucks[$('input[name=login-number]').val()]) * (3 / 10), parseInt(robobucks[$('input[name=login-number]').val()]) * (1 / 10) / 2],
	// 	'80%': [parseInt(robobucks[$('input[name=login-number]').val()]) * (2 / 5), parseInt(robobucks[$('input[name=login-number]').val()]) * (1 / 10) / 2],
	// 	'max': [parseInt(robobucks[$('input[name=login-number]').val()]) / 2]
	// };
	// noUiSlider.create(pipsRange, {
	// 	range: range_all_sliders,
	// 	start: 0,
	// 	connect: [true, false],
	// 	pips: {
	// 		mode: 'range',
	// 		density: 10
	// 	}
	// });
});
// Choose Role
$('.role-submit').click(function(){
	if (!$("input[name=role-btn]:checked").val()) {
		fillOut();
	} else {
		fs.writeFileSync('role.txt', $('.role-btn:checked').val());
		window.location.reload();
	}
});
// Too lazy to name this section
var teamNum;
var teamColorName;
var teamColor = fs.readFileSync('role.txt', 'utf-8');
var schedule = JSON.parse(fs.readFileSync('json/matchSched.json', "utf-8"));
for (i in schedule) {
	if (i == parseInt(fs.readFileSync('matchNum.txt', 'utf-8'))) {
		switch (teamColor) {
			case "r1":
				teamNum = schedule[i][0];
				teamColorName = "Red 1";
				break;
			case "r2":
				teamNum = schedule[i][1];
				teamColorName = "Red 2";
				break;
			case "r3":
				teamNum = schedule[i][2];
				teamColorName = "Red 3";
				break;
			case "b1":
				teamNum = schedule[i][3];
				teamColorName = "Blue 1";
				break;
			case "b2":
				teamNum = schedule[i][4];
				teamColorName = "Blue 2";
				break;
			case "b3":
				teamNum = schedule[i][5];
				teamColorName = "Blue 3";
				break;
			default:
				teamNum = ":(";
		}
	}
}
$('.team-color').append("<h3 style=\"text-align: center;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Color: <span class='color-number'>" + teamColorName + "</span>, Team Number: <span style='color: purple;'>" + teamNum + "</span>");
switch (teamColor) {
	case "r1":
		$('.color-number').css('color', 'red');
		break;
	case "r2":
		$('.color-number').css('color', 'red');
		break;
	case "r3":
		$('.color-number').css('color', 'red');
		break;
	case "b1":
		$('.color-number').css('color', 'blue');
		break;
	case "b2":
		$('.color-number').css('color', 'blue');
		break;
	case "b3":
		$('.color-number').css('color', 'blue');
		break;
	default:
		teamNum = ":(";
}
// Forgot ID
$('#forgot-id-button').click(function(){
	$("#the-whole-login").fadeOut(500);
	$('#forgot-id').delay(500).fadeIn(500);
});
$('#forgot-id-back').click(function(){
	$('#forgot-id').fadeOut(500);
	$('#the-whole-login').delay(500).fadeIn(500);
});
// Flashdrive Save
// if (fs.existsSync('/Volumes/1540/')) {
// 	$('flashdrive-save').fadeIn(500);
// 	fs.writeFileSync("json/robobucks.json");
// 	fs.createReadStream("/Volumes/1540/Companal/stand-scouting/robobucks.json").pipe(fs.createWriteStream("json/robobucks.json"));
// } // NOTE: NOT WORKING!!!
$('.flashdrive-save').click(function(){
	if (!fs.existsSync('json/manifest.json')) {
		fs.writeFileSync('json/manifest.json', '[]')
	}
	if (navigator.platform == 'MacIntel') {
		if (fs.existsSync('/Volumes/1540/companal/stand-scouting/manifest.json')) {
			fManifest = JSON.parse(fs.readFileSync('/Volumes/1540/companal/stand-scouting/manifest.json'))
			dManifest = JSON.parse(fs.readFileSync('json/manifest.json'))
			var exportManifest = fManifest.concat(dManifest)
		} else {
			var exportManifest = JSON.parse(fs.readFileSync('json/manifest.json'))
		}
		fs.writeFileSync('/Volumes/1540/companal/stand-scouting/manifest.json', JSON.stringify(exportManifest))
		// Export
		// fs.copySync('json/transactions.json', '/Volumes/1540/companal/stand-scouting/transactions.json', {overwrite: true});
		// Import
		// if (fs.existsSync('/Volumes/1540/companal/stand-scouting/opr.json')) {
		// 	fs.copySync('/Volumes/1540/companal/stand-scouting/opr.json', 'json/opr.json', {overwrite: true});
		// }
		// if (fs.existsSync('/Volumes/1540/companal/stand-scouting/robobucks.json')) {
		// 	fs.copySync('/Volumes/1540/companal/stand-scouting/robobucks.json', 'json/robobucks.json', {overwrite: true});
		// }
		if (fs.existsSync('/Volumes/1540/companal/stand-scouting/matchSched.json')) {
			fs.copySync('/Volumes/1540/companal/stand-scouting/matchSched.json', 'json/matchSched.json', {overwrite: true});
		}
	} else if (navigator.platform == 'Win32') {
		if (fs.existsSync('K:/companal/stand-scouting/manifest.json')) {
			fManifest = JSON.parse(fs.readFileSync('K:/companal/stand-scouting/manifest.json'))
			dManifest = JSON.parse(fs.readFileSync('json/manifest.json'))
			var exportManifest = fManifest.concat(dManifest)
		} else {
			var exportManifest = JSON.parse(fs.readFileSync('json/manifest.json'))
		}
		fs.writeFileSync('K:/companal/stand-scouting/manifest.json', JSON.stringify(exportManifest))
		// Export
		// fs.copySync('json/transactions.json', 'K:/companal/stand-scouting/transactions.json', {overwrite: true});
		// Import
		// if (fs.existsSync('K:/companal/stand-scouting/robobucks.json')) {
		// 	fs.copySync('K:/companal/stand-scouting/robobucks.json', 'json/robobucks.json', {overwrite: true});
		// }
		// if (fs.existsSync('K:/companal/stand-scouting/opr.json', 'json/opr.json')) {
		// 	fs.copySync('K:/companal/stand-scouting/opr.json', 'json/opr.json', {overwrite: true});
		// }
	}
	var data = JSON.parse(fs.readFileSync('json/manifest.json', "utf-8"));
	for (i in data) {
		if (fs.existsSync("data/" + data[i]) == true) {
			if (navigator.platform == "MacIntel") {
				fs.copySync('data/' + data[i], "/Volumes/1540/companal/stand-scouting/" + data[i]);
			} else if (navigator.platform == "Win32") {
				fs.copySync('data/' + data[i], "K:/companal/stand-scouting/" + data[i]);
			}
			// if (navigator.platform == "MacIntel") {
			// 	fs.createReadStream(files[i]).pipe(fs.createWriteStream("/Volumes/1540/companal/stand-scouting"));
			// } else if (navigator.platform == "Win32" || "Win64") {
			// 	fs.createReadStream(files[i]).pipe(fs.createWriteStream("K:/companal/stand-scouting"));
			// }
		}
	}
	// var newTransaction = {
	// 	"12": "0",
	// 	"13": "0",
	// 	"14": "0",
	// 	"15": "0",
	// 	"16": "0",
	// 	"17": "0",
	// 	"18": "0",
	// 	"19": "0",
	// 	"20": "0",
	// 	"21": "0",
	// 	"22": "0",
	// 	"23": "0",
	// 	"24": "0",
	// 	"25": "0",
	// 	"30": "0",
	// 	"33": "0",
	// 	"34": "0",
	// 	"36": "0",
	// 	"37": "0",
	// 	"40": "0",
	// 	"41": "0",
	// 	"44": "0",
	// 	"48": "0",
	// 	"50": "0",
	// 	"55": "0",
	// 	"58": "0",
	// 	"60": "0",
	// 	"64": "0",
	// 	"66": "0",
	// 	"72": "0",
	// 	"76": "0",
	// 	"77": "0",
	// 	"81": "0",
	// 	"96": "0",
	// 	"97": "0",
	// 	"98": "0",
	// 	"99": "0"
	// }
	// var sNT = JSON.stringify(newTransaction);
	// fs.writeFileSync('json/transactions.json', sNT);
	fs.unlinkSync('json/manifest.json');
	fs.writeFileSync('json/manifest.json', '[]')
	$('.flashdrive-save').addClass('disabled');
	dialogs.alert("Done!", function (ok) {
		window.location.reload();
	});
});
// // OPR
// if (!(fs.existsSync('json/opr.json'))) {
// 	var oprTemp = {}
// 	for (var i = 1; i < 10000; i++) {
// 		oprTemp[String(i)] = "50"
// 	}
// 	fs.writeFileSync('json/opr.json', JSON.stringify(oprTemp))
// }
// var opr = JSON.parse(fs.readFileSync('json/opr.json', 'utf-8'));
// var redAlliance = [schedule[parseInt(fs.readFileSync('matchNum.txt', 'utf-8'))][0], schedule[parseInt(fs.readFileSync('matchNum.txt', 'utf-8'))][1], schedule[parseInt(fs.readFileSync('matchNum.txt', 'utf-8'))][2]];
// var redOpr = parseInt(opr[redAlliance[0]]) + parseInt(opr[redAlliance[1]]) + parseInt(opr[redAlliance[2]]);
// var blueAlliance = [schedule[parseInt(fs.readFileSync('matchNum.txt', 'utf-8'))][3], schedule[parseInt(fs.readFileSync('matchNum.txt', 'utf-8'))][4], schedule[parseInt(fs.readFileSync('matchNum.txt', 'utf-8'))][5]];
// var blueOpr = parseInt(opr[blueAlliance[0]]) + parseInt(opr[blueAlliance[1]]) + parseInt(opr[blueAlliance[2]]);
// // Betting
// var jsonBet;
// $('#bet-blue-win, #bet-red-win').click(function(){
// 	$('.betting').fadeOut(500);
// 	$('.betting-2').delay(500).fadeIn(500);
// });
// $('#bet-red-win').click(function(){
// 	jsonBet = "red";
// });
// $('#bet-blue-win').click(function(){
// 	jsonBet = "blue";
// });
// $('.skip-bet').click(function(){
// 	$('.betting').fadeOut(500);
// 	$('#post-login').delay(500).fadeIn(500);
// 	if (Math.random() < 0.5) {
// 		jsonBet = "red";
// 	} else {
// 		jsonBet = 'blue';
// 	}
// });
// // Betting 2
// var transaction = JSON.parse(fs.readFileSync('json/transactions.json', 'utf-8'));
// var robobucks = JSON.parse(fs.readFileSync('json/robobucks.json', 'utf-8'));
// var range_all_sliders;
// var pipsRange = document.getElementById('pips-range');
// $('#betting-2-next').click(function(){
// 	$('.betting-2').fadeOut(500);
// 	$('#post-login').delay(500).fadeIn(500);
// });
// $('#betting-2-back').click(function(){
// 	$('.betting-2').fadeOut(500);
// 	$('.betting').delay(500).fadeIn(500);
// });
// Post-Login
$('#auto-next').click(function(){
	if (!$("input[name='auto-radio-cross']:checked").val() || !$("input[name='auto-gear']:checked").val() || !$("input[name='auto-shoot']:checked").val()) {
	  fillOut();
	} else {
		$('#post-login').fadeOut(500);
		$('#teleop').delay(500).fadeIn(500);
	}
	// if ($('input[name="auto-radio-cross"]:checked') && $('input[name="auto-radio-gear"]:checked') && $('input[name="auto-radio-shoot"]:checked') == true) {
		// $('#post-login').fadeOut(500);
		// $('#teleop').delay(500).fadeIn(500);
	// } else if ($('input[name="auto-radio-cross"]:checked') && $('input[name="auto-radio-gear"]:checked') && $('input[name="auto-radio-shoot"]:checked') == false) {
	// 	alert("Fill out all options")
	// }
});
// $('#auto-back').click(function(){
// 	$('#post-login').fadeOut(500);
// 	$('.betting').delay(500).fadeIn(500);
// });
// Tele-Op
var teleopFuel = [];
$('#teleop-fuel-submit').click(function(){
	if ($('input[name="teleop-radio-fuel"]').is(':checked')) {
		teleopFuel.push($('input[name="teleop-radio-fuel"]:checked').val());
		$('.badge-hide').show();
		$('.badge-replace').replaceWith("<span class=\"badge-replace\">" + teleopFuel.length + "</span>");
		$('#teleop-fuel').replaceWith('<div id="teleop-fuel" class="btn-group" data-toggle="buttons"><span id="teleop-fuelcycle-lt10" class="btn btn-danger"><input type="radio" name="teleop-radio-fuel" value="<10" autocomplete="off">&lt;10</span><span id="teleop-fuelcycle-1025" class="btn btn-warning"><input type="radio" name="teleop-radio-fuel" value="10-25" autocomplete="off">10-25</span><span id="teleop-fuelcycle-2540" class="btn btn-primary"><input type="radio" name="teleop-radio-fuel" value="25-40" autocomplete="off">25-40</span><span id="teleop-fuelcycle-gt40" class="btn btn-success"><input type="radio" name="teleop-radio-fuel" value=">40" autocomplete="off">&gt;40</span</div>')
	} else {
		dialogs.alert('Nothing was selected!');
	}
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
var fuelEndAccuracy;
var fuelEndRate;
var fuelEndLoad;
$('#fuel-back').click(function(){
	$('#fuel-end').fadeOut(500);
	$('#teleop').delay(500).fadeIn(500);
});
$('#fuel-next').click(function(){
	// if (!$('input[name=fuel-end-accuracy]:checked').val() || !$('input[name=fuel-end-rate]:checked').val() || !$('input[name=fuel-end-load]:checked').val()) {
	// 	fillOut();
	// } else {
		$('#fuel-end').fadeOut(500);
		$('.pie').delay(500).fadeIn(500);
		$('.time-cat-btn').click();
		$('#myChart').fadeIn(500);
		fuelEndAccuracy = $('input[name="fuel-end-accuracy"]:checked').val();
		fuelEndRate = $('input[name="fuel-end-rate"]:checked').val();
		fuelEndLoad = [];
	// }
});
$('.no-fuel').click(function(){
	dialogs.confirm("Really?!", function(ans) {
		if (ans) {
			$('#fuel-end').fadeOut(500);
			$('.pie').delay(500).fadeIn(500);
			fuelEndAccuracy = 0;
			fuelEndRate = 0;
			fuelEndLoad = [0];
		}
	});
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
$('#teleop-next').click(function(){
	if (!$('input[name=teleop-climbtime]:checked').val() && !$('input[name=teleop-radio-fuel]:checked').val()) {
		fillOut();
	} else {
		// if ($('input[name=auto-shoot]:checked').val() == 0 || /* (teleopFuel.length > 0) */ $('input[name=teleop-fuel]').val() == 'false') {
		// 	$('#teleop').fadeOut(500);
		// 	$('.pie').delay(500).fadeIn(500);
		// } else {
			$('#teleop').fadeOut(500);
			$('#fuel-end').delay(500).fadeIn(500);
		// }
	}
});
$('#teleop-back').click(function(){
	$('#teleop').fadeOut(500);
	$('#post-login').delay(500).fadeIn(500);
});
// Pie
$('.pie-100-btn').click(function(){
	$('.pie-100-btn').css('color', 'white');
});
$('.shoot-100-btn').click(function(){
	slider.noUiSlider.set([100, 100, 100, 100]);
});
$('.gear-100-btn').click(function(){
	slider.noUiSlider.set([0, 100, 100, 100]);
});
$('.defense-100-btn').click(function(){
	slider.noUiSlider.set([0, 0, 100, 100]);
});
$('.climb-100-btn').click(function(){
	slider.noUiSlider.set([0, 0, 0, 100]);
});
$('.futz-100-btn').click(function(){
	slider.noUiSlider.set([0, 0, 0, 0]);
});
var sliderArray;
var sliderShoot;
var sliderGear;
var sliderDefense;
var sliderClimb;
var sliderFutz;
// $('.pie-hide-button').hide();
// $('#myChart').hide();
// $('.pie').ready(function(){
// 	slider.noUiSlider.reset();
// })
// Grades
var gradesShooting;
var gradesGearing;
var gradesDefense;
var gradesClimbing;
// Pie
var slider = document.getElementById('slider-color');
// if ($('#auto-shoot').hasClass('active') || (teleopFuel.length > 0)) {
// 	noUiSlider.create(slider, {
// 		start: [0, 25, 50, 75],
// 		tooltips: [true, true, true, true],
// 		behavior: 'tap',
// 		connect: [true, true, true, true, true],
// 		range: {
// 			'min': [0],
// 			'max': [100]
// 		}
// 	});
// } else {
	noUiSlider.create(slider, {
		start: [20, 40, 60, 80],
		tooltips: [true, true, true, true],
		behavior: 'tap',
		connect: [true, true, true, true, true],
		range: {
			'min': [0],
			'max': [100]
		}
	});
// }
var connect = slider.querySelectorAll('.noUi-connect');
var classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];
for (var i = 0; i < connect.length; i++) {
  connect[i].classList.add(classes[i]);
};
var bool = false;
$('#repel').click(function(){
	if (!$('#repel').hasClass('disabled')) {
		bool = !bool;
		if (bool) {
			var slider = document.getElementById('slider-color');
			slider.noUiSlider.on('update', function(){
				var arr = slider.noUiSlider.get();
				var results = [];
				var sorted_arr = arr.slice().sort();
				for (var i = 0; i < arr.length - 1; i++) {
					if (sorted_arr[i + 1] == sorted_arr[i]) {
						 results.push(parseInt(sorted_arr[i]));
					}
				};
				if (results.length > 0) {
					if (parseInt(arr[0]) == results[0]) {
						if ($('.noUi-handle-lower').hasClass('noUi-active')) {
							slider.noUiSlider.set([results[0], results[0] + 10, null, null]);
						} else {
							slider.noUiSlider.set([0, results[0], null, null]);
						}
					} else if (parseInt(arr[1]) == results[0]) {
						if ($('.noUi-origin:nth-child(4) > .noUi-handle').hasClass('noUi-active')) {
							slider.noUiSlider.set([null, results[0], results[0] + 10, null]);
						} else {
							slider.noUiSlider.set([null, results[0] - 10, results[0], null]);
						}
					} else if (parseInt(arr[2]) == results[0]) {
						if ($('.noUi-origin:nth-child(6) > .noUi-handle').hasClass('noUi-active')) {
							slider.noUiSlider.set([null, null, results[0], 100]);
						} else {
							slider.noUiSlider.set([null, null, results[0] - 10, results[0]]);
						}
					}
				}
			});
			slider.noUiSlider.on('set', function(){
				var sliderArray = slider.noUiSlider.get();
				var sliderShoot = parseInt(parseFloat(sliderArray[0]).toFixed(2));
				var sliderGear = parseFloat(sliderArray[1]).toFixed(2) - sliderShoot;
				var sliderDefense = parseFloat(sliderArray[2]).toFixed(2) - sliderGear - sliderShoot;
				var sliderClimb = parseFloat(sliderArray[3]).toFixed(2) - sliderDefense - sliderGear - sliderShoot;
				var sliderFutz = 100 - sliderClimb - sliderDefense - sliderGear - sliderShoot;
				$('#myChart').replaceWith("<canvas id='myChart'></canvas>");
				var ctx = document.getElementById("myChart").getContext('2d');
				var myChart = new Chart(ctx, {
					type: 'pie',
					data: {
						datasets: [{
							backgroundColor: [
								"#2ecc71",
								"#3498db",
								"#95a5a6",
								"#9b59b6",
								"#f1c40f"
							],
							data: [sliderShoot, sliderGear, sliderDefense, sliderClimb, sliderFutz]
						}]
					}
				});
			});
		} else if (!bool) {
			var slider = document.getElementById('slider-color');
			var sliderStuff = slider.noUiSlider.get();
			slider.noUiSlider.destroy();
			noUiSlider.create(slider, {
				start: [sliderStuff[0], sliderStuff[1], sliderStuff[2], sliderStuff[3]],
				tooltips: [true, true, true, true],
				behavior: 'tap',
				connect: [true, true, true, true, true],
				range: {
					'min': [0],
					'max': [100]
				}
			});
			var connect = slider.querySelectorAll('.noUi-connect');
			var classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];
			for (var i = 0; i < connect.length; i++) {
				connect[i].classList.add(classes[i]);
			};
			slider.noUiSlider.on('set', function(){
				var sliderArray = slider.noUiSlider.get();
				var sliderShoot = parseInt(parseFloat(sliderArray[0]).toFixed(2));
				var sliderGear = parseFloat(sliderArray[1]).toFixed(2) - sliderShoot;
				var sliderDefense = parseFloat(sliderArray[2]).toFixed(2) - sliderGear - sliderShoot;
				var sliderClimb = parseFloat(sliderArray[3]).toFixed(2) - sliderDefense - sliderGear - sliderShoot;
				var sliderFutz = 100 - sliderClimb - sliderDefense - sliderGear - sliderShoot;
				$('#myChart').replaceWith("<canvas id='myChart'></canvas>");
				var ctx = document.getElementById("myChart").getContext('2d');
				var myChart = new Chart(ctx, {
					type: 'pie',
					data: {
						datasets: [{
							backgroundColor: [
								"#2ecc71",
								"#3498db",
								"#95a5a6",
								"#9b59b6",
								"#f1c40f"
							],
							data: [sliderShoot, sliderGear, sliderDefense, sliderClimb, sliderFutz]
						}]
					}
				});
			});
		}
	}
	// if ($("input[name=repel-box]:checked").val() != 'on') {
	// 	slider.noUiSlider.on(/*'update'*/'change', function(){
	// 		var arr = slider.noUiSlider.get();
	// 		var results = [];
	// 		var sorted_arr = arr.slice().sort();
	// 		for (var i = 0; i < arr.length - 1; i++) {
	// 		  if (sorted_arr[i + 1] == sorted_arr[i]) {
	// 		     results.push(parseInt(sorted_arr[i]));
	// 		  }
	// 		};
	// 		if (results.length > 0) {
	// 			if (parseInt(arr[0]) == results[0]) {
	// 				if ($('.noUi-handle-lower').hasClass('noUi-active')) {
	// 					slider.noUiSlider.set([results[0], results[0] + 10, null, null]);
	// 				} else {
	// 					slider.noUiSlider.set([0, results[0], null, null]);
	// 				}
	// 			} else if (parseInt(arr[1]) == results[0]) {
	// 				if ($('.noUi-origin:nth-child(4) > .noUi-handle').hasClass('noUi-active')) {
	// 					slider.noUiSlider.set([null, results[0], results[0] + 10, null]);
	// 				} else {
	// 					slider.noUiSlider.set([null, results[0] - 10, results[0], null]);
	// 				}
	// 			} else if (parseInt(arr[2]) == results[0]) {
	// 				if ($('.noUi-origin:nth-child(6) > .noUi-handle').hasClass('noUi-active')) {
	// 					slider.noUiSlider.set([null, null, results[0], 100]);
	// 				} else {
	// 					slider.noUiSlider.set([null, null, results[0] - 10, results[0]]);
	// 				}
	// 			}
	// 		}
	// 	});
	// } else if ($("input[name=repel-box]:checked").val() == 'on') {
	// 	slider.noUiSlider.destroy();
	// 	var slider = document.getElementById('slider-color');
	// 	noUiSlider.create(slider, {
	// 		start: [20, 40, 60, 80],
	// 		tooltips: [true, true, true, true],
	// 		behavior: 'tap',
	// 		connect: [true, true, true, true, true],
	// 		range: {
	// 			'min': [0],
	// 			'max': [100]
	// 		}
	// 	});
	// 	var connect = slider.querySelectorAll('.noUi-connect');
	// 	var classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-4-color', 'c-5-color'];
	// 	for (var i = 0; i < connect.length; i++) {
	// 	  connect[i].classList.add(classes[i]);
	// 	};
	// }
});
// slider.noUiSlider.on('end', function(){
// 	var arr = slider.noUiSlider.get();
// 	// var results = [];
// 	var sorted_arr = arr.slice().sort();
// 	for (var i = 0; i < arr.length - 1; i++) {
// 	  if (sorted_arr[i + 1] == sorted_arr[i]) {
// 			// results.push(parseInt(sorted_arr[i]));
// 	 		slider.noUiSlider.destroy();
// 	 		if (arr[0] == arr[1]) {
// 				noUiSlider.create(slider, {
// 					start: [arr[0], arr[2], arr[3]],
// 					tooltips: [true, true, true],
// 					behavior: 'tap',
// 					connect: [true, true, true, true],
// 					range: {
// 						'min': [0],
// 						'max': [100]
// 					}
// 				});
// 				var connect = slider.querySelectorAll('.noUi-connect');
// 				var classes = ['c-1-color', 'c-3-color', 'c-4-color', 'c-5-color'];
// 				for (var i = 0; i < connect.length; i++) {
// 					connect[i].classList.add(classes[i]);
// 				}
// 				sliderGear = 0;
// 	 		} else if (arr[1] == arr[2]) {
// 				noUiSlider.create(slider, {
// 					start: [arr[0], arr[1], arr[3]],
// 					tooltips: [true, true, true],
// 					behavior: 'tap',
// 					connect: [true, true, true, true],
// 					range: {
// 						'min': [0],
// 						'max': [100]
// 					}
// 				});
// 				var connect = slider.querySelectorAll('.noUi-connect');
// 				var classes = ['c-1-color', 'c-2-color', 'c-4-color', 'c-5-color'];
// 				for (var i = 0; i < connect.length; i++) {
// 					connect[i].classList.add(classes[i]);
// 				}
// 				sliderDefense = 0;
// 	 		} else if (arr[2] == arr[3]) {
// 				noUiSlider.create(slider, {
// 					start: [arr[0], arr[1], arr[2]],
// 					tooltips: [true, true, true],
// 					behavior: 'tap',
// 					connect: [true, true, true, true],
// 					range: {
// 						'min': [0],
// 						'max': [100]
// 					}
// 				});
// 				var connect = slider.querySelectorAll('.noUi-connect');
// 				var classes = ['c-1-color', 'c-2-color', 'c-3-color', 'c-5-color'];
// 				for (var i = 0; i < connect.length; i++) {
// 					connect[i].classList.add(classes[i]);
// 				}
// 				sliderClimb = 0;
// 	 		}
// 	  }
// 	};
// });

// var array = slider.noUiSlider.get();
// $('.shoot-0-btn').click(function(){
// 	slider.noUiSlider.set([array[0], array[0], array[2], array[3]]);
// });
// $('.gear-0-btn').click(function(){
// 	slider.noUiSlider.set([array[0], array[1], array[1], array[3]]);
// });
// $('.defense-0-btn').click(function(){
// 	slider.noUiSlider.set([array[0], array[1], array[2], array[2]]);
// });
// $('.climb-0-btn').click(function(){
// 	slider.noUiSlider.set([array[0], array[0], array[2], array[1]]);
// });
// $('.futz-0-btn').click(function(){
// 	slider.noUiSlider.set([array[0], array[1], array[2], 100]);
// });
$('#pie-label').hide();
$('#pie-back').click(function(){
	if ($('#auto-shoot').hasClass('active') || (teleopFuel.length > 0)) {
		$('.pie').fadeOut(500);
		$('#fuel-end').delay(500).fadeIn(500);
	} else {
		$('.pie').fadeOut(500);
		$('#teleop').delay(500).fadeIn(500);
	}
});
$('#pie-next').click(function(){
	$('.pie').fadeOut(500);
	$('#myChart').fadeOut(500);
	$('.grades').delay(500).fadeIn(500);
	sliderArray = slider.noUiSlider.get();
	sliderShoot = parseInt(parseFloat(sliderArray[0]).toFixed(2));
	sliderGear = parseFloat(sliderArray[1]).toFixed(2) - sliderShoot;
	sliderDefense = parseFloat(sliderArray[2]).toFixed(2) - sliderGear - sliderShoot;
	sliderClimb = parseFloat(sliderArray[3]).toFixed(2) - sliderDefense - sliderGear - sliderShoot;
	sliderFutz = 100 - sliderClimb - sliderDefense - sliderGear - sliderShoot;
	if (Math.round(sliderShoot) == 0) {
		// $('.grades-shooting').empty();
		$('.grades-shooting').hide();
		gradesShooting = 0;
	}
	if (Math.round(sliderGear) == 0) {
		// $('.grades-gearing').empty();
		$('.grades-gearing').hide();
		gradesGearing = 0;
	}
	if (Math.round(sliderDefense) == 0) {
		// $('.grades-defense').empty();
		$('.grades-defense').hide();
		gradesDefense = 0;
	}
	if (Math.round(sliderClimb) == 0) {
		// $('.grades-climbing').empty();
		$('.grades-climbing').hide();
		gradesClimbing = 0;
	}
	if (Math.round(sliderShoot) > 0) {
		$('.grades-shooting').show();
		// $('.grades-shooting').append('<h3>Shooting</h3><div class="btn-group" data-toggle="buttons"><span id="grades-shooting-1" class="btn btn-danger"><input type="radio" name="grades-shooting" value="1" autocomplete="off">1</span><span id="grades-shooting-2" class="btn btn-warning"><input type="radio" name="grades-shooting" value="2" autocomplete="off">2</span><span id="grades-shooting-3" class="btn btn-primary"><input type="radio" name="grades-shooting" value="3" autocomplete="off">3</span><span id="grades-shooting-4" class="btn btn-info"><input type="radio" name="grades-shooting" value="4" autocomplete="off">4</span><span id="grades-shooting-5" class="btn btn-success"><input type="radio" name="grades-shooting" value="5" autocomplete="off">5</span></div>');
	}
	if (Math.round(sliderGear) > 0) {
		$('.grades-gearing').show();
		// $('.grades-gearing').append('<h3>Gearing</h3><div class="btn-group" data-toggle="buttons"><span id="grades-gearing-1" class="btn btn-danger"><input type="radio" name="grades-gearing" value="1" autocomplete="off">1</span><span id="grades-gearing-2" class="btn btn-warning"><input type="radio" name="grades-gearing" value="2" autocomplete="off">2</span><span id="grades-gearing-3" class="btn btn-primary"><input type="radio" name="grades-gearing" value="3" autocomplete="off">3</span><span id="grades-gearing-4" class="btn btn-info"><input type="radio" name="grades-gearing" value="4" autocomplete="off">4</span><span id="grades-gearing-5" class="btn btn-success"><input type="radio" name="grades-gearing" value="5" autocomplete="off">5</span></div>');
	}
	if (Math.round(sliderDefense) > 0) {
		$('.grades-defense').show();
		// $('.grades-defense').append('<h3>Defense</h3><div class="btn-group" data-toggle="buttons"><span id="grades-defense-1" class="btn btn-danger"><input type="radio" name="grades-defense" value="1" autocomplete="off">1</span><span id="grades-defense-2" class="btn btn-warning"><input type="radio" name="grades-defense" value="2" autocomplete="off">2</span><span id="grades-defense-3" class="btn btn-primary"><input type="radio" name="grades-defense" value="3" autocomplete="off">3</span><span id="grades-defense-4" class="btn btn-info"><input type="radio" name="grades-defense" value="4" autocomplete="off">4</span><span id="grades-defense-5" class="btn btn-success"><input type="radio" name="grades-defense" value="5" autocomplete="off">5</span></div>');
	}
	if (Math.round(sliderClimb) > 0) {
		$('.grades-climbing').show();
		// $('.grades-climbing').append('<h3>Climbing</h3><div class="btn-group" data-toggle="buttons"><span id="grades-climbing-1" class="btn btn-danger"><input type="radio" name="grades-climbing" value="1" autocomplete="off">1</span><span id="grades-climbing-2" class="btn btn-warning"><input type="radio" name="grades-climbing" value="2" autocomplete="off">2</span><span id="grades-climbing-3" class="btn btn-primary"><input type="radio" name="grades-climbing" value="3" autocomplete="off">3</span><span id="grades-climbing-4" class="btn btn-info"><input type="radio" name="grades-climbing" value="4" autocomplete="off">4</span><span id="grades-climbing-5" class="btn btn-success"><input type="radio" name="grades-climbing" value="5" autocomplete="off">5</span></div>');
	}
});
// $('#pie-show-editor').click(function(){
// 	$('.pie-hide-button').fadeOut(500);
// 	$('#pie-label').fadeOut(500);
// 	$('#myChart').fadeOut(500);
// 	$('.pie-hide').delay(500).fadeIn(500);
// });
// $("#pie-shooting").slider({});
// $("#pie-gearing").slider({});
// $("#pie-defense").slider({});
// $("#pie-climbing").slider({});
// $("#pie-futzing").slider({});
// Grades
$('#grades-back').click(function(){
	$('.grades').fadeOut(500);
	$('.pie').delay(500).fadeIn(500);
	$('#myChart').fadeIn(500);
});
$('#grades-next').click(function(){
	if (!$('input[name=grades-overall]:checked').val()) {
		fillOut();
	} else if ($('input[name=grades-shooting]').is(":visible") && !$('input[name=grades-shooting]:checked').val()) {
		fillOut();
	} else if ($('input[name=grades-gearing]').is(":visible") && !$('input[name=grades-gearing]:checked').val()) {
		fillOut();
	} else if ($('input[name=grades-defense]').is(":visible") && !$('input[name=grades-defense]:checked').val()) {
		fillOut();
	} else if ($('input[name=grades-climbing]').is(":visible") && !$('input[name=grades-climbing]:checked').val()) {
		fillOut();
	} else {
		$('.grades').fadeOut(500);
		$('#last-textarea').delay(500).fadeIn(500);
		gradesShooting = parseInt($('input[name="grades-shooting"]:checked').val());
		gradesGearing = parseInt($('input[name="grades-gearing"]:checked').val());
		gradesDefense = parseInt($('input[name="grades-defense"]:checked').val());
		gradesClimbing = parseInt($('input[name="grades-climbing"]:checked').val());
		if (Math.round(sliderShoot) == 0) {
			gradesShooting = 0;
		}
		if (Math.round(sliderGear) == 0) {
			gradesGearing = 0;
		}
		if (Math.round(sliderDefense) == 0) {
			gradesDefense = 0;
		}
		if (Math.round(sliderClimb) == 0) {
			gradesClimbing = 0;
		}
	}
});
// Last Textarea
$('#textarea-back').click(function(){
	$('#last-textarea').fadeOut(500);
	$('.grades').delay(500).fadeIn(500);
});
$('#textarea-next').click(function(){
	$('#last-textarea').fadeOut(500);
	// $('.betting-end').delay(500).fadeIn(500);
	$('.finish').delay(500).fadeIn(500);
});
$('.comments').click(function(){
	if ($('.comments').is(':focus')) {
		$('.ta-ol').hide();
		$('.ta-ol-nb').show();
	}
});
$('.ta-ol-nb').click(function(){
	$('.ta-ol').show();
	$('.ta-ol-nb').hide();
});
// // Betting End
// $('#betting-end-back').click(function(){
// 	$('.betting-end').fadeOut(500);
// 	$('#last-textarea').delay(500).fadeIn(500);
// });
// var win;
// $('#red-win').click(function(){
// 	win = "red";
// });
// $('#blue-win').click(function(){
// 	win = "blue";
// });
// $('#tie').click(function(){
// 	win = "tie";
// });
// $('#red-win, #blue-win, #tie').click(function(){
// 	$('#save-file').fadeIn(500);
// 	$('.end-result').replaceWith('<div class="container" style="text-align: center;"><i class="fa fa-check" aria-hidden="true" style="color: #20d420; font-size: 100pt;"></i></div>');
// });
// Navbar
$('#match-number-number').click(function(){
	if (!$('#match-number-number').attr('readonly')) {
		$('.edit-match-btn').fadeIn(500);
	}
});
$('#match-number-number').keypress(function(){
	if (event.which == 13) {
		if ($('#match-number-number').val() != fs.readFileSync('matchNum.txt')) {
			fs.writeFileSync('matchNum.txt', parseInt($("#match-number-number").val()), {overwrite: true});
			window.location.reload();
		} else {
			window.location.reload();
		}
	}
});
$('.edit-match').click(function(){
	if ($('#match-number-number').val() != fs.readFileSync('matchNum.txt')) {
		fs.writeFileSync('matchNum.txt', parseInt($("#match-number-number").val()), {overwrite: true});
		window.location.reload();
	} else {
		window.location.reload();
	}
});
// $('#continue').click(function(){
// 	$('.betting').fadeIn(500);
// 	$('.comments').val("");
/*$("#auto-form").replaceWith('<form id="auto-form"><h3 style="text-align: center;">Crossed Line</h3><div class="btn-group" data-toggle="buttons"><label id="auto-cross" class="btn btn-info"><input type="radio" name="auto-radio-cross" autocomplete="off">Crossed</label><label id="auto-no-cross" class="btn btn-info"><input type="radio" name="auto-radio-cross" autocomplete="off">Not Crossed</label></div><hr><h3 style="text-align: center;">Gear Placed</h3><div class="btn-group" data-toggle="buttons"><label id="auto-gear" class="btn btn-info"><input type="radio" name="auto-radio-gear" autocomplete="off">Placed</label><label id="auto-no-gear" class="btn btn-info"><input type="radio" name="auto-radio-gear" autocomplete="off">Not Placed</label></div><hr><h3 style="text-align: center;">Balls Shot</h3><div class="btn-group" data-toggle="buttons"><label id="auto-shoot" class="btn btn-info"><input type="radio" name="auto-radio-shoot" autocomplete="off">Shot Balls</label><label id="auto-no-shoot" class="btn btn-info"><input type="radio" name="auto-radio-shoot" autocomplete="off">Did Not Shoot Balls</label></div></form>');*/
// });
// Buttons
// $('#continue').click(function(){
// 	fs.writeFileSync('login.txt', $('input[name=login-number]').val(), {overwrite: true});
// 	window.location.reload();
// });
// $('#sign-out').click(function(){
	// if (fs.existsSync('login.txt')) {
	// 	fs.unlinkSync('login.txt');
	// }
	// window.location.reload();
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
	/*$("#auto-form").replaceWith('<form id="auto-form"><h3 style="text-align: center;">Crossed Line</h3><div class="btn-group" data-toggle="buttons"><label id="auto-cross" class="btn btn-info"><input type="radio" name="auto-radio-cross" autocomplete="off">Crossed</label><label id="auto-no-cross" class="btn btn-info"><input type="radio" name="auto-radio-cross" autocomplete="off">Not Crossed</label></div><hr><h3 style="text-align: center;">Gear Placed</h3><div class="btn-group" data-toggle="buttons"><label id="auto-gear" class="btn btn-info"><input type="radio" name="auto-radio-gear" autocomplete="off">Placed</label><label id="auto-no-gear" class="btn btn-info"><input type="radio" name="auto-radio-gear" autocomplete="off">Not Placed</label></div><hr><h3 style="text-align: center;">Balls Shot</h3><div class="btn-group" data-toggle="buttons"><label id="auto-shoot" class="btn btn-info"><input type="radio" name="auto-radio-shoot" autocomplete="off">Shot Balls</label><label id="auto-no-shoot" class="btn btn-info"><input type="radio" name="auto-radio-shoot" autocomplete="off">Did Not Shoot Balls</label></div></form>');*/
// });
// $('#save-file').hide();
$('.click').click();
$('#grades-next').click(function () {
	// Autonomous
	var autoCross = false;
	autoCross = $('input[name="auto-radio-cross"]:checked').val();
	// autoCross = JSON.parse(autoCross);
	if (autoCross == "true"){
		autoCross = true;
	} else if (autoCross == "false") {
		autoCross = false;
	}
	var autoGear = false;
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
	// File
	var autoShootNew = $('input[name=auto-shoot]:checked').val();
	var autoGearNew = $('input[name=auto-gear]:checked').val();
	var climbTime = $('input[name=teleop-climbtime]:checked').val();
	var json = {
		matchNumber: parseInt(fs.readFileSync('matchNum.txt', 'utf-8')),
		teamNumber: teamNum,
		role: fs.readFileSync('role.txt', 'utf-8'),
		scoutId: $('input[name=login-number]').val(),
		// bettingPick: jsonBet,
		// win: win,
		// robobucks: addedValue,
		crashed: true,
		auto: {
			crossedLine: autoCross,
			depositedGear: /*autoGear*/ autoGearNew,
			shotCycle: /*autoShoot*/ autoShootNew
		},
		teleop: {
			balls: {
				lowGoal: $("#low-goal:checked").val(),
				// cycles:  $('input[name=teleop-radio-fuel]:checked').val(),
				accuracy: /*fuelEndAccuracy*/ $('input[name=fuel-accuracy]:checked').val(),
				// shotRate: fuelEndRate,
				// loadingZones: fuelEndLoad
				shotTime: $('input[name=fuel-time]:checked').val()
			},
			gearsDeposited: teleopGear,
			climbed: /*teleopClimb*/ climbTime
		},
		notes: 'app crashed',
		strategy: {
			pieChart: {
				// shooting: parseInt($("#pie-shooting").val()),
				// gearing: parseInt($("#pie-gearing").val()),
				// defense: parseInt($("#pie-defense").val()),
				// climbing: parseInt($("#pie-climbing").val()),
				// futzing: parseInt($("#pie-futzing").val())
				shooting: Math.round(sliderShoot),
				gearing:  Math.round(sliderGear),
				defense:  Math.round(sliderDefense),
				climbing:  Math.round(sliderClimb),
				futzing:  Math.round(sliderFutz)
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
	var match = parseInt(fs.readFileSync('matchNum.txt', 'utf-8'));
	var filepath = "m" + match + "-" + teamColor + "-" + teamNum + ".json";
	fs.writeFileSync(__dirname + "/data/" + filepath, stringify, {flag: 'w'});
});
$('#save-file').click(function(){
	var readMNum = fs.readFileSync('matchNum.txt', 'utf-8');
	var readRole = fs.readFileSync('role.txt', 'utf-8');
	var schedule = JSON.parse(fs.readFileSync('json/matchSched.json', "utf-8"));
	var teamNum;
	for (i in schedule) {
		if (i == parseInt(readMNum)) {
			switch (readRole) {
				case "r1":
					teamNum = schedule[i][0];
					break;
				case "r2":
					teamNum = schedule[i][1];
					break;
				case "r3":
					teamNum = schedule[i][2];
					break;
				case "b1":
					teamNum = schedule[i][3];
					break;
				case "b2":
					teamNum = schedule[i][4];
					break;
				case "b3":
					teamNum = schedule[i][5];
					break;
				default:
					teamNum = ":(";
			}
		}
	}
	var parsedData = JSON.parse(fs.readFileSync('data/m' + parseInt(readMNum) + '-' + readRole + '-' + teamNum +'.json'));
	var stringData;
	if (parsedData.crashed) {
		parsedData.crashed = false;
		parsedData.notes = '';
		parsedData.notes = $('.comments').val();
		stringData = JSON.stringify(parsedData);
		fs.writeFileSync('data/m' + parseInt(readMNum) + '-' + readRole + '-' + teamNum +'.json', stringData);
	} else {
		// $('#last-textarea').fadeOut(500);
		// // getmac
		// require('getmac').getMac(function(err,macAddress){
		// 	if (err)  throw err
		// 	macAddress = macAddress.replace(/-/g, '').replace(/:/g, '');
		// 	switch (macAddress) {
		// 		case addressArray[0].macAddress:
		// 			teamColor = addressArray[0].role;
		// 			break;
		// 		case "9801a7cb4b19":
		// 			teamColor = "g1";
		// 			break;
		// 		case addressArray[1].macAddress:
		// 			teamColor = addressArray[1].role;
		// 			break;
		// 		case addressArray[2].macAddress:
		// 			teamColor = addressArray[2].role;
		// 			break;
		// 		case addressArray[3].macAddress:
		// 			teamColor = addressArray[3].role;
		// 			break;
		// 		case addressArray[4].macAddress:
		// 			teamColor = addressArray[4].role;
		// 			break;
		// 		case addressArray[5].macAddress:
		// 			teamColor = addressArray[5].role;
		// 			break;
		// 		default:
		// 			teamColor = "r1";
		// 	}
		// 	// Too lazy to name this section
		// 	var schedule = JSON.parse(fs.readFileSync('json/matchSched.json', "utf-8"));
		// 	for (i in schedule) {
		// 		if (i == $("#match-number-number").val()) {
		// 			switch (teamColor) {
		// 				case "r1":
		// 					teamNum = schedule[i][0];
		// 					break;
		// 				case "r2":
		// 					teamNum = schedule[i][1];
		// 					break;
		// 				case "r3":
		// 					teamNum = schedule[i][2];
		// 					break;
		// 				case "b1":
		// 					teamNum = schedule[i][3];
		// 					break;
		// 				case "b2":
		// 					teamNum = schedule[i][4];
		// 					break;
		// 				case "b3":
		// 					teamNum = schedule[i][5];
		// 					break;
		// 				case "g1":
		// 					teamNum = schedule[i][0];
		// 					break;
		// 				default:
		// 					teamNum = false;
		// 			}
		// 		}
		// 	}
		// 	// Autonomous
		// 	var autoCross = false;
		// 	autoCross = $('input[name="auto-radio-cross"]:checked').val();
		// 	// autoCross = JSON.parse(autoCross);
		// 	if (autoCross == "true"){
		// 		autoCross = true;
		// 	} else if (autoCross == "false") {
		// 		autoCross = false;
		// 	}
		// 	var autoCross = false;
		// 	autoGear = $('input[name="auto-radio-gear"]:checked').val();
		// 	// autoGear = JSON.parse(autoGear);
		// 	if (autoGear == "true"){
		// 		autoGear = true;
		// 	} else if (autoGear == "false") {
		// 		autoGear = false;
		// 	}
		// 	var autoShoot = false;
		// 	autoShoot = $('input[name="auto-radio-shoot"]:checked').val();
		// 	// autoShoot = JSON.parse(autoShoot);
		// 	if (autoShoot == "true"){
		// 		autoShoot = true;
		// 	} else if (autoShoot == "false") {
		// 		autoShoot = false;
		// 	}
		// 	// Tele-Op
		// 	var teleopGear = parseInt($('#teleop-gear').val());
		// 	var teleopClimb = $('input[name="teleop-radio-climb"]:checked').val();
		// 	if (teleopClimb == "true"){
		// 		teleopClimb = true;
		// 	} else if (teleopClimb == "false") {
		// 		teleopClimb = false;
		// 	}
		// 	// Fuel End
		// 	var fuelEndAccuracy = $('input[name="fuel-end-accuracy"]:checked').val();
		// 	var fuelEndRate = $('input[name="fuel-end-rate"]:checked').val();
		// 	var fuelEndLoad = [];
		// 	if (fuelEndHopper == true){
		// 		fuelEndLoad.push("hopper");
		// 	}
		// 	if (fuelEndHuman == true){
		// 		fuelEndLoad.push("human");
		// 	}
		// 	if (fuelEndFloor == true){
		// 		fuelEndLoad.push("floor");
		// 	}
		// 	// Grades
		// 	var gradesOverall = parseInt($('input[name="grades-overall"]:checked').val());
		// 	var gradesShooting = parseInt($('input[name="grades-shooting"]:checked').val());
		// 	var gradesGearing = parseInt($('input[name="grades-gearing"]:checked').val());
		// 	var gradesDefense = parseInt($('input[name="grades-defense"]:checked').val());
		// 	var gradesClimbing = parseInt($('input[name="grades-climbing"]:checked').val());
		// 	// File
		// 	var json = {
		// 		scoutId: $('input[name=login-number]').val(),
		// 		bettingPick: jsonBet,
		// 		auto: {
		// 			crossedLine: autoCross,
		// 			depositedGear: autoGear,
		// 			shotCycle: autoShoot
		// 		},
		// 		teleop: {
		// 			balls: {
		// 				cycles:  teleopFuel,
		// 				accuracy: fuelEndAccuracy,
		// 				shotRate: fuelEndRate,
		// 				loadingZones: fuelEndLoad
		// 			},
		// 			gearsDeposited: teleopGear,
		// 			climbed: teleopClimb
		// 		},
		// 		notes: $('.comments').val(),
		// 		strategy: {
		// 			pieChart: {
		// 				// shooting: parseInt($("#pie-shooting").val()),
		// 				// gearing: parseInt($("#pie-gearing").val()),
		// 				// defense: parseInt($("#pie-defense").val()),
		// 				// climbing: parseInt($("#pie-climbing").val()),
		// 				// futzing: parseInt($("#pie-futzing").val())
		// 				shooting: Math.round(sliderShoot),
		// 				gearing:  Math.round(sliderGear),
		// 				defense:  Math.round(sliderDefense),
		// 				climbing:  Math.round(sliderClimb),
		// 				futzing:  Math.round(sliderFutz)
		// 			},
		// 			grades: {
		// 				overall: gradesOverall,
		// 				shooting: gradesShooting,
		// 				gearing: gradesGearing,
		// 				defense: gradesDefense,
		// 				climbing: gradesClimbing
		// 			}
		// 		}
		// 	};
		// 	var stringify = JSON.stringify(json);
		// 	var filepath = "m" + $("#match-number-number").val() + "-" + teamColor + "-" + teamNum + ".json"
		// 	createFile(__dirname + "/data/" + filepath, stringify);
		// 	deleteFile('matchNum.txt');
		// 	createFile('matchNum.txt', parseInt($("#match-number-number").val()) + 1);
		// 	if (fs.existsSync('manifest.json') == false) {
		// 		fs.writeFileSync('manifest.json', "[]")
		// 	}
		// 	var manifestRead = fs.readFileSync('manifest.json', 'utf-8');
		// 	var manifestParse = JSON.parse(manifestRead);
		// 	manifestParse.push(filepath);
		// 	var mStringify = JSON.stringify(manifestParse);
		// 	fs.writeFileSync('manifest.json', mStringify);
		// });
		// Autonomous
		var autoCross = false;
		autoCross = $('input[name="auto-radio-cross"]:checked').val();
		// autoCross = JSON.parse(autoCross);
		if (autoCross == "true"){
			autoCross = true;
		} else if (autoCross == "false") {
			autoCross = false;
		}
		var autoGear = false;
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
		// // transaction.json
		// var addedValue;
		// var tStringify;
		// function betOver(max, min, points) {
		// 	if ((jsonBet == "red" && (max >= (redOpr - blueOpr) && (redOpr - blueOpr) > min)) || (jsonBet == "blue" && (max >= (blueOpr - redOpr) && (blueOpr - redOpr) > min))) {
		// 		// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 10);
		// 		addedValue = parseInt(pipsRange.noUiSlider.get()) * points;
		// 		if (addedValue < 1) {
		// 			addedValue = 1.1;
		// 		}
		// 		transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)) + 10);
		// 	}
		// };
		// function betUnder(max, min, points) {
		// 	if ((jsonBet == "red" && (max >= (blueOpr - redOpr) && (blueOpr - redOpr) > min)) || (jsonBet == "blue" && (max >= (redOpr - blueOpr) && (redOpr - blueOpr) > min))) {
		// 		// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 2);
		// 		addedValue = parseInt(pipsRange.noUiSlider.get()) * points;
		// 		if (addedValue < 1) {
		// 			addedValue = 1.1;
		// 		}
		// 		transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)) + 10);
		// 	}
		// };
		// if (transaction.hasOwnProperty($('input[name=login-number]').val())) {
		// 	if (opr.hasOwnProperty(teamNum)) {
		// 		if (jsonBet == win) {
		// 			if ((jsonBet == "red" && redOpr > blueOpr) || (jsonBet == "blue" && blueOpr > redOpr)) {
		// 				for (i = 1; i < 2000; i++) {
		// 					betOver(10 * i, (10 * i) - 10, (20 - i) / 10);
		// 				};
		// 			} else if ((jsonBet == "red" && redOpr < blueOpr) || (jsonBet == "blue" && blueOpr < redOpr)) {
		// 				for (i = 1; i < 2000; i++) {
		// 					betUnder(10 * i, (10 * i) - 10, (20 + (2 * i)) / 10);
		// 				};
		// 			}
		// 			if ((jsonBet == "red" && redOpr - blueOpr == 0) || (jsonBet == "blue" && blueOpr - redOpr == 0)) {
		// 				// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 10);
		// 				addedValue = parseInt(pipsRange.noUiSlider.get()) * 2;
		// 				transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)) + 10);
		// 			};
		// 			// if ((jsonBet == "red" && 10 >= redOpr - blueOpr > 0) || (jsonBet == "blue" && 10 >= blueOpr - redOpr > 0)) {
		// 			// 	// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 10);
		// 			// 	addedValue = parseInt(pipsRange.noUiSlider.get()) + (parseInt(pipsRange.noUiSlider.get()) * (9 / 10));
		// 			// 	transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)));
		// 			// } else if ((jsonBet == "red" && 20 >= redOpr - blueOpr > 10) || (jsonBet == "blue" && 20 >= blueOpr - redOpr > 10)) {
		// 			// 	// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 10);
		// 			// 	addedValue = parseInt(pipsRange.noUiSlider.get()) + (parseInt(pipsRange.noUiSlider.get()) * (4 / 5));
		// 			// 	transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)));
		// 			// } else if ((jsonBet == "red" && 30 >= redOpr - blueOpr > 20) || (jsonBet == "blue" && 30 >= blueOpr - redOpr > 20)) {
		// 			// 	// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 10);
		// 			// 	addedValue = parseInt(pipsRange.noUiSlider.get()) + (parseInt(pipsRange.noUiSlider.get()) * (7 / 10));
		// 			// 	transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)));
		// 			// } else if ((jsonBet == "red" && 40 >= redOpr - blueOpr > 30) || (jsonBet == "blue" && 40 >= blueOpr - redOpr > 30)) {
		// 			// 	// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 10);
		// 			// 	addedValue = parseInt(pipsRange.noUiSlider.get()) + (parseInt(pipsRange.noUiSlider.get()) * (3 / 5));
		// 			// 	transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)));
		// 			// } else if ((jsonBet == "red" && 50 >= redOpr - blueOpr > 40) || (jsonBet == "blue" && 50 >= blueOpr - redOpr > 40)) {
		// 			// 	// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 10);
		// 			// 	addedValue = parseInt(pipsRange.noUiSlider.get()) + (parseInt(pipsRange.noUiSlider.get()) * (5 / 10));
		// 			// 	transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)));
		// 			// } else if ((jsonBet == "red" && 60 >= redOpr - blueOpr > 50) || (jsonBet == "blue" && 60 >= blueOpr - redOpr > 50)) {
		// 			// 	// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 10);
		// 			// 	addedValue = parseInt(pipsRange.noUiSlider.get()) + (parseInt(pipsRange.noUiSlider.get()) * (2 / 5));
		// 			// 	transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)));
		// 			// } else if ((jsonBet == "red" && 70 >= redOpr - blueOpr > 60) || (jsonBet == "blue" && 70 >= blueOpr - redOpr > 60)) {
		// 			// 	// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 10);
		// 			// 	addedValue = parseInt(pipsRange.noUiSlider.get()) + (parseInt(pipsRange.noUiSlider.get()) * (3 / 10));
		// 			// 	transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)));
		// 			// } else if ((jsonBet == "red" && 80 >= redOpr - blueOpr > 70) || (jsonBet == "blue" && 80 >= blueOpr - redOpr > 70)) {
		// 			// 	// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 10);
		// 			// 	addedValue = parseInt(pipsRange.noUiSlider.get()) + (parseInt(pipsRange.noUiSlider.get()) * (1 / 5));
		// 			// 	transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)));
		// 			// } else if ((jsonBet == "red" && 80 >= redOpr - blueOpr > 70) || (jsonBet == "blue" && 80 >= blueOpr - redOpr > 70)) {
		// 			// 	// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 10);
		// 			// 	addedValue = parseInt(pipsRange.noUiSlider.get()) + (parseInt(pipsRange.noUiSlider.get()) * (1 / 10));
		// 			// 	transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)));
		// 			// } else if ((jsonBet == "red" && 10 >= blueOpr - redOpr > 0) || (jsonBet == "blue" && 10 >= redOpr - blueOpr > 0)) {
		// 			// 	// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 2);
		// 			// 	addedValue = 2 * parseInt(pipsRange.noUiSlider.get()) + (parseInt(pipsRange.noUiSlider.get()) * (1 / 5));
		// 			// 	transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)));
		// 			// } else if ((jsonBet == "red" && redOpr - blueOpr == 0) || (jsonBet == "blue" && blueOpr - redOpr == 0)) {
		// 			// 	// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 10);
		// 			// 	addedValue = parseInt(pipsRange.noUiSlider.get()) * 2;
		// 			// 	transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)));
		// 			// } else if ((jsonBet == "red" && 20 >= blueOpr - redOpr > 10) || (jsonBet == "blue" && 20 >= redOpr - blueOpr > 10)) {
		// 			// 	// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 2);
		// 			// 	addedValue = 2 * parseInt(pipsRange.noUiSlider.get()) + (parseInt(pipsRange.noUiSlider.get()) * (2 / 5));
		// 			// 	transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)));
		// 			// } else if ((jsonBet == "red" && 30 >= blueOpr - redOpr > 20) || (jsonBet == "blue" && 30 >= redOpr - blueOpr > 20)) {
		// 			// 	// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 2);
		// 			// 	addedValue = 2 * parseInt(pipsRange.noUiSlider.get()) + (parseInt(pipsRange.noUiSlider.get()) * (3 / 5));
		// 			// 	transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)));
		// 			// } else if ((jsonBet == "red" && 40 >= blueOpr - redOpr > 30) || (jsonBet == "blue" && 40 >= redOpr - blueOpr > 30)) {
		// 			// 	// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 2);
		// 			// 	addedValue = 2 * parseInt(pipsRange.noUiSlider.get()) + (parseInt(pipsRange.noUiSlider.get()) * (4 / 5));
		// 			// 	transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)));
		// 			// } else if ((jsonBet == "red" && 50 >= blueOpr - redOpr > 40) || (jsonBet == "blue" && 50 >= redOpr - blueOpr > 40)) {
		// 			// 	// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 2);
		// 			// 	addedValue = 3 * parseInt(pipsRange.noUiSlider.get());
		// 			// 	transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)));
		// 			// } else if ((jsonBet == "red" && 60 >= blueOpr - redOpr > 50) || (jsonBet == "blue" && 60 >= redOpr - blueOpr > 50)) {
		// 			// 	// transaction[$('input[name=login-number]').val()] + (transaction[$('input[name=login-number]').val()] / 2);
		// 			// 	addedValue = 3 * parseInt(pipsRange.noUiSlider.get()) + (parseInt(pipsRange.noUiSlider.get()) * (1 / 5));
		// 			// 	transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)));
		// 			// }
		// 		} else if (jsonBet != win) {
		// 			addedValue = parseInt(pipsRange.noUiSlider.get()) * -1;
		// 			transaction[$('input[name=login-number]').val()] = String(Math.round(parseInt(transaction[$('input[name=login-number]').val()]) + parseInt(addedValue)) + 10);
		// 		}
		// 	}
		// }
		// tStringify = String(JSON.stringify(transaction));
		// fs.writeFileSync('json/transactions.json', tStringify);
		// // Editing robobucks.json
		// var robobucksEdit = JSON.parse(fs.readFileSync('json/robobucks.json', 'utf-8'));
		// robobucksEdit[$('input[name=login-number]').val()] = String(parseInt(robobucksEdit[$('input[name=login-number]').val()]) + parseInt(transaction[$('input[name=login-number]').val()]));
		// rStringify = JSON.stringify(robobucksEdit);
		// fs.writeFileSync('json/robobucks.json', rStringify);
		// // Modal
		// if (addedValue > 0) {
		// 	$('.modal-body').append('<h1 style="text-align: center;"><b>Congratulations!</b>&nbsp;You won&nbsp;' + Math.round(addedValue) + '&nbsp;Robobucks!</h1>');
		// } else if (addedValue < 0) {
		// 	$('.modal-body').append('<h1 style="text-align: center;"><b>Please accept my deepest condolences for your loss.</b>&nbsp;You lost&nbsp;' + Math.round((addedValue * -1)) + '&nbsp;Robobucks.</h1>');
		// }
		// File
		var autoShootNew = $('input[name=auto-shoot]:checked').val();
		var autoGearNew = $('input[name=auto-gear]:checked').val();
		var climbTime = $('input[name=teleop-climbtime]:checked').val();
		var json = {
			matchNumber: parseInt(fs.readFileSync('matchNum.txt', 'utf-8')),
			teamNumber: teamNum,
			role: fs.readFileSync('role.txt', 'utf-8'),
			scoutId: $('input[name=login-number]').val(),
			// bettingPick: jsonBet,
			// win: win,
			// robobucks: addedValue,
			crashed: true,
			auto: {
				crossedLine: autoCross,
				depositedGear: /*autoGear*/ autoGearNew,
				shotCycle: /*autoShoot*/ autoShootNew
			},
			teleop: {
				balls: {
					lowGoal: $("#low-goal:checked").val(),
					// cycles:  $('input[name=teleop-radio-fuel]:checked').val(),
					accuracy: /*fuelEndAccuracy*/ $('input[name=fuel-accuracy]:checked').val(),
					// shotRate: fuelEndRate,
					// loadingZones: fuelEndLoad
					shotTime: $('input[name=fuel-time]:checked').val()
				},
				gearsDeposited: teleopGear,
				climbed: /*teleopClimb*/ climbTime
			},
			notes: 'app crashed',
			strategy: {
				pieChart: {
					// shooting: parseInt($("#pie-shooting").val()),
					// gearing: parseInt($("#pie-gearing").val()),
					// defense: parseInt($("#pie-defense").val()),
					// climbing: parseInt($("#pie-climbing").val()),
					// futzing: parseInt($("#pie-futzing").val())
					shooting: Math.round(sliderShoot),
					gearing:  Math.round(sliderGear),
					defense:  Math.round(sliderDefense),
					climbing:  Math.round(sliderClimb),
					futzing:  Math.round(sliderFutz)
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
		var match = parseInt(fs.readFileSync('matchNum.txt', 'utf-8'));
		var filepath = "m" + match + "-" + teamColor + "-" + teamNum + ".json";
		fs.writeFileSync(__dirname + "/data/" + filepath, stringify);
	}
	if (!fs.existsSync('json/manifest.json')) {
		fs.writeFileSync('json/manifest.json', "[]");
	}
	var manifestRead = fs.readFileSync('json/manifest.json', 'utf-8');
	var manifestParse = JSON.parse(manifestRead);
	var match = parseInt(fs.readFileSync('matchNum.txt', 'utf-8'));
	var filepath = "m" + match + "-" + teamColor + "-" + teamNum + ".json";
	manifestParse.push(filepath);
	var mStringify = JSON.stringify(manifestParse);
	fs.writeFileSync('json/manifest.json', mStringify);
	fs.writeFileSync('matchNum.txt', parseInt(fs.readFileSync('matchNum.txt', 'utf-8')) + 1);
	$('.jumbotron').css('z-index', '-998');
	$('.info-bar').css('z-index', '-999');
	$(".finish").removeClass('container');
	$("#save-file").css('border-radius', '0%');
  $("#save-file").animate({
			width: String($(document).width() + 'px'),
			height: String($(document).height() + 'px'),
			marginTop: '-230px'
		}, 1000, function () {
		const {ipcRenderer} = require('electron')
		ipcRenderer.send('quit');
  });
	// $('#save-file').animate({height: '10000px', width: "10000px"}, 5000, 'swing');
});
// function add_match(val) {
//     var qty = document.getElementById('match-number-number').value;
//     var new_qty = parseInt(qty,10) + val;
//     document.getElementById('match-number-number').value = new_qty;
//     return new_qty;
// }
