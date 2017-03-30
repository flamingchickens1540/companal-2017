const request = require('sync-request')
const fs = require('fs')

//DEFS
var closenessThreshold = 5000
var events = ["2017orore"]

var allMatches = []

for (var index in events) {
	var res = request('GET', `https://www.thebluealliance.com/api/v2/event/${events[index]}/matches`, {
		'headers': {
			'X-TBA-App-Id': 'frc1540:analysis18:v01'
		}
	})
	var resp = JSON.parse(res.getBody('utf8'))
	for (var i in resp) {
		var m = resp[i]
		if (m.comp_level === "qm")
			allMatches.push(m)
	}
}

var teams = {}
for (var index in allMatches) {
	var match = allMatches[index]
	for (var redblue = 0; redblue < 2; redblue++) {
		for (var teamIndex = 0; teamIndex < 3; teamIndex++) {
			var breakdown, teamNumber
			if (redblue === 0) {
				breakdown = match.score_breakdown.red
				teamNumber = match.alliances.red.teams[teamIndex].substr(3)
			}
			else {
				breakdown = match.score_breakdown.blue
				teamNumber = match.alliances.blue.teams[teamIndex].substr(3)
			}
			if (!teams.hasOwnProperty(teamNumber)) {
				teams[teamNumber] = {
					"autoRotors": 0,
					"totalRotors": 0,
					"autoFuelHigh": 0,
					"teleFuelHigh": 0,
					"allianceClimbs": 0,
					"autoCrosses": 0,
					"numMatches": 0,
					"teamNumber": teamNumber
				}
			}
			if (breakdown.rotor1Auto)
				teams[teamNumber].autoRotors++
			if (breakdown.rotor1Engaged)
				teams[teamNumber].totalRotors++
			if (breakdown.rotor2Engaged)
				teams[teamNumber].totalRotors++
			if (breakdown.rotor3Engaged)
				teams[teamNumber].totalRotors++
			if (breakdown.rotor4Engaged)
				teams[teamNumber].totalRotors++
			teams[teamNumber].autoFuelHigh += breakdown.autoFuelHigh
			teams[teamNumber].teleFuelHigh += breakdown.teleopFuelHigh
			if (breakdown.touchpadFar === "ReadyForTakeoff")
				teams[teamNumber].allianceClimbs++
			if (breakdown.touchpadMiddle === "ReadyForTakeoff")
				teams[teamNumber].allianceClimbs++
			if (breakdown.touchpadNear === "ReadyForTakeoff")
				teams[teamNumber].allianceClimbs++
			if (breakdown[`robot${teamIndex+1}Auto`] === "Mobility")
				teams[teamNumber].autoCrosses++
			teams[teamNumber].numMatches++
		}
	}
}	

for (var teamNumber in teams) {
	for (var cat in teams[teamNumber]) {
		teams[teamNumber][cat] /= teams[teamNumber].numMatches
	}

	var t = teams[teamNumber]
	console.log(teamNumber)
	console.log(`Cross line ${(t.autoCrosses * 100).toFixed(0)}% of matches.`)
	console.log(`Auto rotor achieved ${(t.autoRotors * 100).toFixed(0)}% of matches.`)
	console.log(`Average match had ${t.autoFuelHigh.toFixed(2)} AUTO balls.`)
	console.log(`Average match had ${t.teleFuelHigh.toFixed(2)} TELE balls.`)
	console.log(`Achieves an average of ${t.totalRotors.toFixed(1)} rotors.`)
	console.log(`Average ${t.allianceClimbs.toFixed(2)} climbs per match.`)
	console.log("\n")
}

var html = fs.readFileSync('teams.html', 'utf8')
html = html.replace('DATAGOESHERE', JSON.stringify(teams))
fs.writeFileSync('output.html', html)

/*{
	"autoRotors": 0,
	"totalRotors": 0,
	"autoFuelHigh": 0,
	"teleFuelHigh": 0,
	"allianceClimbs": 0,
	"autoCrosses": 0,
	"foulPoints": 0,
	"numMatches": 0
}*/

/*{
    "comp_level": "qm",
    "match_number": 10,
    "videos": [
      {
        "type": "youtube",
        "key": "4mu9f6KN1z8"
      }
    ],
    "time_string": null,
    "set_number": 1,
    "key": "2017orore_qm10",
    "time": 1490382180,
    "score_breakdown": {
      "blue": {
        "teleopPoints": 130,
        "robot3Auto": "Mobility",
        "rotor1Auto": false,
        "autoPoints": 10,
        "rotor1Engaged": true,
        "foulCount": 1,
        "touchpadFar": "None",
        "foulPoints": 0,
        "techFoulCount": 1,
        "totalPoints": 140,
        "tba_rpEarned": 0,
        "autoRotorPoints": 0,
        "adjustPoints": 0,
        "robot1Auto": "None",
        "rotor2Auto": false,
        "rotor4Engaged": false,
        "teleopRotorPoints": 80,
        "autoFuelHigh": 0,
        "teleopFuelHigh": 0,
        "teleopTakeoffPoints": 50,
        "robot2Auto": "Mobility",
        "kPaRankingPointAchieved": false,
        "autoFuelLow": 0,
        "teleopFuelLow": 0,
        "rotorBonusPoints": 0,
        "autoMobilityPoints": 10,
        "rotor3Engaged": false,
        "autoFuelPoints": 0,
        "teleopFuelPoints": 0,
        "touchpadMiddle": "None",
        "touchpadNear": "ReadyForTakeoff",
        "rotorRankingPointAchieved": false,
        "kPaBonusPoints": 0,
        "rotor2Engaged": true
      },
      "red": {
        "teleopPoints": 130,
        "robot3Auto": "Mobility",
        "rotor1Auto": true,
        "autoPoints": 70,
        "rotor1Engaged": true,
        "foulCount": 0,
        "touchpadFar": "ReadyForTakeoff",
        "foulPoints": 30,
        "techFoulCount": 0,
        "totalPoints": 230,
        "tba_rpEarned": 2,
        "autoRotorPoints": 60,
        "adjustPoints": 0,
        "robot1Auto": "Mobility",
        "rotor2Auto": false,
        "rotor4Engaged": false,
        "teleopRotorPoints": 80,
        "autoFuelHigh": 0,
        "teleopFuelHigh": 0,
        "teleopTakeoffPoints": 50,
        "robot2Auto": "None",
        "kPaRankingPointAchieved": false,
        "autoFuelLow": 0,
        "teleopFuelLow": 0,
        "rotorBonusPoints": 0,
        "autoMobilityPoints": 10,
        "rotor3Engaged": true,
        "autoFuelPoints": 0,
        "teleopFuelPoints": 0,
        "touchpadMiddle": "None",
        "touchpadNear": "None",
        "rotorRankingPointAchieved": false,
        "kPaBonusPoints": 0,
        "rotor2Engaged": true
      }
    },
    "alliances": {
      "blue": {
        "surrogates": [],
        "score": 140,
        "teams": [
          "frc6696",
          "frc4692",
          "frc4057"
        ]
      },
      "red": {
        "surrogates": [],
        "score": 230,
        "teams": [
          "frc4051",
          "frc4110",
          "frc997"
        ]
      }
    },
    "event_key": "2017orore"
  },*/