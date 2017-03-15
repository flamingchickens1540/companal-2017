
function does(a) {
	if (a)
		return "does"
	else
		return "does not"
}
function are(a) {
	if (a) 
		return "are"
	else
		return "are not"
}
function doo(a) {
	if (a)
		return "do"
	else
		return "do not"
}
function can(a) {
	if (a)
		return "can"
	else
		return "cannot"
}

	
var currentTab = "#tab-home";
$(".tab").click(function() {
	$(this).addClass("active")
	$(currentTab).removeClass("active")
	$("#page-"+currentTab.substr(5)).hide()
	currentTab = "#"+$(this).attr('id')
	$("#page-"+currentTab.substr(5)).show()
	if (currentTab === "#tab-match-schedule") {
		loadMatchSchedule()
	}
})

//init tabs
$.get("tabs/home.html", function(data) {
	$("#pages").append(data)
})
$.get("tabs/match-schedule.html", function(data) {
	$("#pages").append(data)
})
$.get("tabs/team.html", function(data) {
	$("#pages").append(data)
})
$.get("tabs/teams.html", function(data) {
	$("#pages").append(data)
})

function loadMatchSchedule() {
	
}