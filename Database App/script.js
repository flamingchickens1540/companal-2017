var fs = require('fs');
if (fs.existsSync('/Volumes/1540/companal/output/persondict.json')) {
  var personTxt = fs.readFileSync('/Volumes/1540/companal/output/persondict.json');
  var personDict = JSON.parse(personTxt);
  updateTable();
} else {
  var personDict = {};
}


function importData() {
  if (navigator.appVersion.indexOf('Mac') != -1) {
    if (fs.existsSync('/Volumes/1540/')) {
      // Reads stand manifest
      var jsonTxt = fs.readFileSync('/Volumes/1540/companal/stand-scouting/manifest.json');
      var manifestArray = JSON.parse(jsonTxt);
      for (var team in manifestArray) {
        if (fs.existsSync('/Volumes/1540/companal/stand-scouting/' + manifestArray[team])) {
          // Scouting update info
          var txt2 = fs.readFileSync('/Volumes/1540/companal/stand-scouting/' + manifestArray[team]);
          var teamData = JSON.parse(txt2);
          console.log(teamData.scoutId);
          addPerson(teamData.scoutId);
          // Writes to file
          var standSource = fs.createReadStream('/Volumes/1540/companal/stand-scouting/' + manifestArray[team]);
          var standDest = fs.createWriteStream('/Volumes/1540/companal/output/stand-scouting/' + manifestArray[team]);
          standSource.pipe(standDest);
        }
      }
      // Reads manifest
      jsonTxt = fs.readFileSync('/Volumes/1540/companal/pit-scouting/manifest.json');
      manifestArray = JSON.parse(jsonTxt);
      for (var team in manifestArray) {
        if (fs.existsSync('/Volumes/1540/companal/pit-scouting/' + manifestArray[team])) {
          var txt22 = fs.readFileSync('/Volumes/1540/companal/pit-scouting/' + manifestArray[team]);
          var teamData2 = JSON.parse(txt2);
          console.log(teamData.scoutId[0]);
          console.log(teamData.scoutId[1]);
          addPerson(teamData.scoutId[0]);
          addPerson(teamData.scoutId[1]);
          // Scouting update info
          // Writes to file
          var standSource = fs.createReadStream('/Volumes/1540/companal/pit-scouting/' + manifestArray[team]);
          var standDest = fs.createWriteStream('/Volumes/1540/companal/output/pit-scouting/' + manifestArray[team]);
          standSource.pipe(standDest);
        }
      }
      updateTable();
      alert('Done importing data!');
      } else {
        alert('USB not inserted properly ;)');
      }
    } else {
      alert('Oops! Something went wrong');
    }
  }

function exportData() {
  // Run Alexander's code here
  //var processedData = new Folder("~/Volumes/1540/ProcessedData");
}

function inDict(thing, dict) {
  for (thingy in dict) {
    if (thingy === thing) {
      return true;
    }
  }
}

function addPerson(name) {
  if (inDict(name, personDict)) {
    personDict[name] += 1;
  } else {
    personDict[name] = 1;
  }
  var dictFile = JSON.stringify(personDict);
  fs.writeFile(dictFile, 'Volumes/1540/companal/output/persondict.json', function(err) {
    if (err) {
        return console.log(err);
  }
}) 

}

function updateTable() {
  $("#scoutingTable td").remove();
  for (scout in personDict) {
    $('#scoutingTable tr:last').after('<tr><td>' + scout + '</td><td>' + personDict[scout] + '</td></tr>');
  }
}
