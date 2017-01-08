var cycleStartTime;
var duration = 0;
var refreshId;

var inputRowHtml = $("#input-row").html()

$("#input-row").hide()

$("#fuel-button").mousedown(function() {
	$("#status").append("[STAT] Starting shooting...<br>")
	$("#status").append("[STAT] Animation running<br>")
	$("#animated-element").addClass("ballanimation")
	cycleStartTime = new Date().getTime()
	refreshId = setInterval(function() {
		$("#current-duration").html(duration+(new Date().getTime()-cycleStartTime))
	}, 10)
})

$("#fuel-button").mouseup(function() {
	$("#status").append("[STAT] Shooting ended.<br>")
	$("#animated-element").removeClass("ballanimation")
	duration += (new Date().getTime()-cycleStartTime)
	clearInterval(refreshId)
	$("#input-row").show()
})

function abbrToName(abbr) {
	names = {
		"lt1": "< 1",
		"1t2": "1-2",
		"gt2": "> 2",
		"floor": "Floor",
		"hopper": "Hopper",
		"humanplayer": "Human Player",
		"lt70": "< 70%",
		"70t90": "70%-90%",
		"gt90": "> 90%"
	}
	return names[abbr]
}

function postCycle() {
	if (duration === 0) {
		alert("Record a cycle first!")
		return;
	}
	var bps = abbrToName($('input[name="bps"]:checked').attr('id'))
	var loaded = abbrToName($('input[name="loaded"]:checked').attr('id'))
	var accuracy = abbrToName($('input[name="accuracy"]:checked').attr('id'))
	if (typeof(bps) === "undefined" || typeof(loaded) === "undefined" || typeof(accuracy) === "undefined") {
		alert("Choose all options.")
		return;
	}
	$("#status").append("[STAT] Posting cycle.<br>")
	var html = '<tr><td>'+duration+'</td><td>'+bps+'</td><td>'+loaded+'</td><td>'+accuracy+'</td></tr>'
	$("#tbody").append(html)
	$('input[name="bps"]:checked').prop('checked', false).button('toggle')
	$('input[name="loaded"]:checked').button('toggle')
	$('input[name="accuracy"]:checked').button('toggle')
	$("#input-row").html(inputRowHtml)
	duration = 0
	$("#input-row").hide()
}