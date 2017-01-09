
//declarations to be linked to real data
var allTeams = ["1540", "1000", "1001"]



for (var index in allTeams) {
	var team = allTeams[index]
	$("#team-1-selector").append(`<option value="${team}">${team}</option>`)
	$("#team-2-selector").append(`<option value="${team}">${team}</option>`)
	$("#team-3-selector").append(`<option value="${team}">${team}</option>`)
}


var currentTab = "#tab-home";
$(".tab").click(function() {
	$(this).addClass("active")
	$(currentTab).removeClass("active")
	currentTab = "#"+$(this).attr('id')
	if (currentTab.substr(0, 9) === "#tab-team") {
		loadTeamTab(currentTab.substr(9))
	}
})

//init tabs
$.get("tabs/home.html", function(data) {
	$("#pages").append(data)
})

function loadTeamTab(teamTabNumber) { //should be '1' '2' or '3'
	var teamNumber = $(`#team-${teamTabNumber}-selector`).val()
	if (allTeams.indexOf(teamNumber) < 0) { //team doesn't exist!
		postAlert("That's not a real team!")
		$("#tab-home").click()
	} else {
		postAlert(`Switching to ${teamNumber}`)
	}
}

function postAlert(text) {
	$("#alert-parent").html(`<div class="alert alert-danger alert-dismissible" role="alert">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <strong>Error!</strong> ${text}
</div>`)
	setTimeout(function() {
		$("#alert-parent").html('')
	}, 1000)
}




//initialize selectors
$('.selecter').selectize({
    create: true,
    sortField: {
        field: 'text',
        direction: 'asc'
    },
    dropdownParent: 'body'
})