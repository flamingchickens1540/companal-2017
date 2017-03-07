const request = require('sync-request')
const fs = require('fs')

//DEFS
var closenessThreshold = 5000
var events = ["2017txlu", "2017flwp", "2017mndu", "2017mndu2", "2017mxtl", "2017scmb", "2017miket", "2017milak", "2017misou", "2017waspo", "2017gagai", "2017ctwat", "2017inwla", "2017ncwin", "2017nhgrs", "2017onosh", "2017pahat", "2017vabla", "2017vahay", "2017waamv"]
var matchType = "qm"

var matchCodes = []

/*for (var index in events) {
	var res = request('GET', `https://www.thebluealliance.com/api/v2/event/${events[index]}/matches`, {
		'headers': {
			'X-TBA-App-Id': 'frc1540:analysis18:v01'
		}
	})
	var resp = JSON.parse(res.getBody('utf8'))
	for (var i in resp) {
		var m = resp[i]
		if (m.comp_level === matchType)
			matchCodes.push(m.key)
	}
}*/

var allMatches = []
allMatches = JSON.parse(fs.readFileSync('qmMatches.json', 'utf8'))

var whatWasntClose = {
	"climbing": 0,
	"autoKPA": 0,
	"autoMobility": 0,
	"autoRotors": 0,
	"teleKPA": 0,
	"teleRotors": 0,
	"fouls": 0
}
var totalKPA = {}
var KPAgt10 = 0
var numMatchesClose = 0;
var numMatches = allMatches.length;

for (var ind in allMatches) {
	var match = allMatches[ind]
	/*var res = request('GET', `https://www.thebluealliance.com/api/v2/match/${code}`, {
	  'headers': {
	    'X-TBA-App-Id': 'frc1540:analysis18:v01'
	  }
	})
	var match = JSON.parse(res.getBody('utf8'))
	allMatches.push(match)*/
	try {
		if (Math.abs(match.alliances.red.score - match.alliances.blue.score) < closenessThreshold) {

			//autoKPA
			var redDiff = match.alliances.red.score - match.score_breakdown.red.autoFuelPoints
			var blueDiff =  match.alliances.blue.score - match.score_breakdown.blue.autoFuelPoints
			if (Math.abs(redDiff - blueDiff) > closenessThreshold) {
				whatWasntClose.autoKPA++;
			}

			//teleKPA
			var redDiff = match.alliances.red.score - match.score_breakdown.red.teleopFuelPoints
			var blueDiff =  match.alliances.blue.score - match.score_breakdown.blue.teleopFuelPoints
			if (Math.abs(redDiff - blueDiff) > closenessThreshold) {
				whatWasntClose.teleKPA++;
			} 

			//climbing
			var redDiff = match.alliances.red.score - match.score_breakdown.red.teleopTakeoffPoints
			var blueDiff =  match.alliances.blue.score - match.score_breakdown.blue.teleopTakeoffPoints
			if (Math.abs(redDiff - blueDiff) > closenessThreshold) {
				whatWasntClose.climbing++;
			}

			//autoMobility
			var redDiff = match.alliances.red.score - match.score_breakdown.red.autoMobilityPoints
			var blueDiff =  match.alliances.blue.score - match.score_breakdown.blue.autoMobilityPoints
			if (Math.abs(redDiff - blueDiff) > closenessThreshold) {
				whatWasntClose.autoMobility++;
			} 

			//autoRotors
			var redDiff = match.alliances.red.score - match.score_breakdown.red.autoRotorPoints
			var blueDiff =  match.alliances.blue.score - match.score_breakdown.blue.autoRotorPoints
			if (Math.abs(redDiff - blueDiff) > closenessThreshold) {
				whatWasntClose.autoRotors++;
			}

			//teleRotors
			var redDiff = match.alliances.red.score - match.score_breakdown.red.teleopRotorPoints
			var blueDiff =  match.alliances.blue.score - match.score_breakdown.blue.teleopRotorPoints
			if (Math.abs(redDiff - blueDiff) > closenessThreshold) {
				whatWasntClose.teleRotors++;
			}

			//fouls
			var redDiff = match.alliances.red.score - match.score_breakdown.red.foulPoints
			var blueDiff =  match.alliances.blue.score - match.score_breakdown.blue.foulPoints
			if (Math.abs(redDiff - blueDiff) > closenessThreshold) {
				whatWasntClose.fouls++;
			}

			var redTotalKPA = match.score_breakdown.red.autoFuelPoints + match.score_breakdown.red.teleopFuelPoints
			var blueTotalKPA = match.score_breakdown.blue.autoFuelPoints + match.score_breakdown.blue.teleopFuelPoints
			if (totalKPA.hasOwnProperty(redTotalKPA))
				totalKPA[redTotalKPA] ++
			else
				totalKPA[redTotalKPA] = 1
			if (totalKPA.hasOwnProperty(blueTotalKPA))
				totalKPA[blueTotalKPA] ++
			else
				totalKPA[blueTotalKPA] = 1
			if (redTotalKPA > 10) 
				KPAgt10++
			if (blueTotalKPA > 10)
				KPAgt10++

			numMatchesClose++;
		}
	} catch (err) {
		numMatches--;
	}
}


//const fs = require('fs')
//fs.writeFileSync("qmMatches.json", JSON.stringify(allMatches))

console.log(totalKPA)
console.log(`There were ${KPAgt10} close match-alliances with >10 KPA`)

for (var criteria in whatWasntClose) {
	console.log(`${criteria} wasn't close in ${whatWasntClose[criteria]*100/numMatchesClose}% of matches...`);
}

console.log(`Analyzed ${numMatches} where ${numMatchesClose*100/numMatches}% or ${numMatchesClose} matches were close...`)