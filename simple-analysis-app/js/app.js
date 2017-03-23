
function parseBool(x) {
	if (x === "true")
		return true
	else
		return false
}

function does(a) {
	if (typeof(a) !== "boolean") {a = parseBool(a)}
	if (a)
		return "does"
	else
		return "does not"
}
function are(a) {
	if (typeof(a) !== "boolean") {a = parseBool(a)}
	if (a) 
		return "are"
	else
		return "are not"
}
function doo(a) {
	if (typeof(a) !== "boolean") {a = parseBool(a)}
	if (a)
		return "do"
	else
		return "do not"
}
function can(a) {
	if (typeof(a) !== "boolean") {a = parseBool(a)}
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
})

//init tabs
$.get("tabs/home.html", function(data) {
	$("#pages").append(data)
})
$.get("tabs/match-schedule.html", function(data) {
	$("#pages").append(data)
})
$.get("tabs/teams.html", function(data) {
	$("#pages").append(data)
})
$.get("tabs/team.html", function(data) {
	$("#pages").append(data)
})
$.get("tabs/match.html", function(data) {
	$("#pages").append(data)
})
$.get("tabs/ranking.html", function(data) {
	$("#pages").append(data)
})
$.get("tabs/projections.html", function(data) {
	$("#pages").append(data)
})
$.get("tabs/matches.html", function(data) {
	$("#pages").append(data)
})
$.get("tabs/alexander.html", function(data) {
	$("#pages").append(data)
})
$.get("tabs/allianceselection.html", function(data) {
	$("#pages").append(data)
})
$.get("tabs/pit.html", function(data) {
	$("#pages").append(data)
})