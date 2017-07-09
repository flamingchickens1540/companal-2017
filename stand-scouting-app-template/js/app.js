// General
// Require
window.$ = window.jQuery = require('jquery');
var noUiSlider = require('nouislider');
var chartjs = require('chart.js');
var fs = require('fs-extra');
var Dialogs = require('dialogs');
var dialogs = Dialogs(opts = {});
// Functions
function jsonParse(filepath) {
  return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
};
function jsonStringify(toStringify ,filepath) {
  var toString = JSON.stringify(toStringify);
  fs.writeFileSync(filepath, toString);
}
function hide(className) {
  $(className).fadeOut(500).addClass('hide');
}
function show(className) {
  $(className).fadeIn(500).removeClass('hide');
}
function tabSwitch(className) {
  $('.tab').removeClass('active disabled');
  $(className).addClass('active disabled');
  hide('.body-div');
  className = className.substring(5);
  show('.' + className);
  $('.popover').remove();
  $('.tab-login').addClass('disabled');
};
function click(inputName, jsonName) {
  if ($(inputName).is(':checked')) {
    console.log(inputName);
    console.log($(inputName + ':checked').val());
    eval('json.' + jsonName + ' = ' + $(inputName + ':checked').val());
    console.log(json);
  }
};
function login() {
  for (i in scouts) {
    if ($('.login-form').val() == i) {
      show('.name-div');
      $('.name').text('Welcome, ' + scouts[i] + '!');
      hide('.login-top-chicken');
      $('.login-top-title').replaceWith('<h1 class="login-top-title"><img src="imgs/logo.png">&nbsp;Stand Scouting App - <span class="login-top-id">' + i + '</span> | <span class="login-top-name">' + scouts[i] + '</span></h1>');
      $('.login-top-title').animate({marginTop: '-3.5%'}, 1000);
      $('.login-top').animate({height: '100px'}, 1000);
      $('[data-toggle="popover"]').popover();
      $('[data-toggle="popover"]').click();
      hide('.alert-login');
    } else if (!scouts.hasOwnProperty($('.login-form').val())) {
      show('.alert-login');
    }
  };
};
// Other
$('.body-div-all').addClass('container hide body-div b-d-1 center');
// Other vars
var schedule = jsonParse('json/schedule.json');
var scouts = jsonParse('json/scouts.json');
var matchNum = fs.readFileSync('matchNum.txt', 'utf-8');
var divId = $('.b-d-1');
var divIdArr = [];
var nextId;
var spanInput;
var spanJson;
var json = {};
// Customization
for (i = 0; i < divId.length; i++) {
  divIdArr.push($(divId[i]).attr('id'));
}
for (i in divIdArr) {
  $('.progress-nav-tab').append('<li class="tab tab-' + divIdArr[i].toLowerCase() + '"><a>' + divIdArr[i] + '</a></li>')
}
$('.tab').addClass('disabled');
$('.back').append('<i class="fa fa-chevron-left"></i>&nbsp;Back');
$('.back').click(function () {
  tabSwitch('.tab-' + divIdArr[divIdArr.indexOf($('.body-div:visible').attr('id').toLowerCase()) - 1]);
});
$('.fi-back').click(function () {
  tabSwitch('.tab-login');
});
$('.next').append('Next&nbsp;<i class="fa fa-chevron-right"></i>');
$('.next').click(function () {
  for (i in divIdArr) {
    nextId = $(this).attr('id');
    if (nextId == divIdArr[i]) {
      tabSwitch('.tab-' + divIdArr[parseInt(i) + 1]);
    }
  }
});

$('.required').each(function () {
  if ($(this).is(':visible') && !$(this).is(':checked')) {
    dialogs.alert('Please fill out everything.');
  }
});
$('.multiple-choice').each(function () {
  if ($(this).attr('data-choice-3') == undefined) {
    $(this).replaceWith('<h3 class="center">' + $(this).attr('data-title') + '</h3><br><div class="btn-group" data-toggle="buttons"><span class="btn btn-success" data-class="' + $(this).attr('id') + '" data-json="' + $(this).attr('data-json') + '"><input type="radio" value="true" autocomplete="off" name="' + $(this).attr('id') + '">' + $(this).attr('data-choice-1') + '</span><span class="btn btn-danger" data-class="' + $(this).attr('id') + '" data-json="' + $(this).attr('data-json') + '"><input type="radio" value="false" autocomplete="off" name="' + $(this).attr('id') + '">' + $(this).attr('data-choice-2') + '</span></div>');
  } else if ($(this).attr('data-choice-4') == undefined) {
    $(this).replaceWith('<h3 class="center">' + $(this).attr('data-title') + '</h3><br><div class="btn-group" data-toggle="buttons"><span class="btn btn-success ' + $(this).attr('id') + '" data-class="' + $(this).attr('id') + '"><input type="radio" autocomplete="off">' + $(this).attr('data-choice-1') + '</span><span class="btn btn-warning ' + $(this).attr('id') + '" data-class="' + $(this).attr('id') + '"><input type="radio" autocomplete="off">' + $(this).attr('data-choice-2') + '</span><span class="btn btn-danger ' + $(this).attr('id') + '" data-class="' + $(this).attr('id') + '"><input type="radio" autocomplete="off">' + $(this).attr('data-choice-3') + '</span></div>');
    $('.' + $(this).attr('id')).click(function () {
      eval('json.' + $(this).attr('data-json') + ' = ' + $('.' + $(this).attr('id') + ':checked').val());
    });
  } else if ($(this).attr('data-choice-5') == undefined) {
    $(this).replaceWith('<h3 class="center">' + $(this).attr('data-title') + '</h3><br><div class="btn-group" data-toggle="buttons"><span class="btn btn-success ' + $(this).attr('id') + '" data-class="' + $(this).attr('id') + '"><input type="radio" autocomplete="off">' + $(this).attr('data-choice-1') + '</span><span class="btn btn-info ' + $(this).attr('id') + '" data-class="' + $(this).attr('id') + '"><input type="radio" autocomplete="off">' + $(this).attr('data-choice-2') + '</span><span class="btn btn-warning ' + $(this).attr('id') + '" data-class="' + $(this).attr('id') + '"><input type="radio" autocomplete="off">' + $(this).attr('data-choice-3') + '</span><span class="btn btn-danger ' + $(this).attr('id') + '" data-class="' + $(this).attr('id') + '"><input type="radio" autocomplete="off">' + $(this).attr('data-choice-4') + '</span></div>');
    $('.' + $(this).attr('id')).click(function () {
      eval('json.' + $(this).attr('data-json') + ' = ' + $('.' + $(this).attr('id') + ':checked').val());
    });
  } else if ($(this).attr('data-choice-6') == undefined) {
    $(this).replaceWith('<h3 class="center">' + $(this).attr('data-title') + '</h3><br><div class="btn-group" data-toggle="buttons"><span class="btn btn-success ' + $(this).attr('id') + '" data-class="' + $(this).attr('id') + '"><input type="radio" autocomplete="off">' + $(this).attr('data-choice-1') + '</span><span class="btn btn-info ' + $(this).attr('id') + '" data-class="' + $(this).attr('id') + '"><input type="radio" autocomplete="off">' + $(this).attr('data-choice-2') + '</span><span class="btn btn-primary ' + $(this).attr('id') + '" data-class="' + $(this).attr('id') + '"><input type="radio" autocomplete="off">' + $(this).attr('data-choice-3') + '</span><span class="btn btn-warning ' + $(this).attr('id') + '" data-class="' + $(this).attr('id') + '"><input type="radio" autocomplete="off">' + $(this).attr('data-choice-4') + '</span><span class="btn btn-danger ' + $(this).attr('id') + '" data-class="' + $(this).attr('id') + '"><input type="radio" autocomplete="off">' + $(this).attr('data-choice-5') + '</span></div>');
    $('.' + $(this).attr('id')).click(function () {
      eval('json.' + $(this).attr('data-json') + ' = ' + $('.' + $(this).attr('id') + ':checked').val());
    });
  }
});
$('.checkbox').each(function () {
  if ($(this).attr('data-choice-3') == undefined) {
    $(this).replaceWith('<h3 class="center">' + $(this).attr('data-title') + '</h3><br><div class="btn-group" data-toggle="buttons"><span class="btn btn-info ' + $(this).attr('id') + '"><input type="checkbox" value="true" autocomplete="off">' + $(this).attr('data-choice-1') + '</span><span class="btn btn-info ' + $(this).attr('id') + '"><input type="checkbox" value="false" autocomplete="off">' + $(this).attr('data-choice-2') + '</span></div>');
  } else if ($(this).attr('data-choice-4') == undefined) {
    $(this).replaceWith('<h3 class="center">' + $(this).attr('data-title') + '</h3><br><div class="btn-group" data-toggle="buttons"><span class="btn btn-info ' + $(this).attr('id') + '"><input type="checkbox" autocomplete="off">' + $(this).attr('data-choice-1') + '</span><span class="btn btn-info ' + $(this).attr('id') + '"><input type="checkbox" autocomplete="off">' + $(this).attr('data-choice-2') + '</span><span class="btn btn-info ' + $(this).attr('id') + '"><input type="checkbox" autocomplete="off">' + $(this).attr('data-choice-3') + '</span></div>');
  } else if ($(this).attr('data-choice-5') == undefined) {
    $(this).replaceWith('<h3 class="center">' + $(this).attr('data-title') + '</h3><br><div class="btn-group" data-toggle="buttons"><span class="btn btn-info ' + $(this).attr('id') + '"><input type="checkbox" autocomplete="off">' + $(this).attr('data-choice-1') + '</span><span class="btn btn-info"><input type="checkbox" autocomplete="off">' + $(this).attr('data-choice-2') + '</span><span class="btn btn-info"><input type="checkbox" autocomplete="off">' + $(this).attr('data-choice-3') + '</span><span class="btn btn-info"><input type="checkbox" autocomplete="off">' + $(this).attr('data-choice-4') + '</span></div>');
  }
});
$('span.btn').change(function () {
  spanInput = 'input[name=' + $(this).attr('data-class') + ']';
  spanJson = $(this).attr('data-json');
  click(spanInput, spanJson);
});
$('.increment-counter').each(function () {
  $(this).replaceWith('<h3 style="text-align: center;">' + $(this).attr('data-title') + '</h3><input class="increment-input no-border center  ' + $(this).attr('id') + '" value="0" readonly="readonly" style="font-size: 24pt; font-weight: bold;"><br><button type="button" class="btn btn-danger inc-decrease" data-decrease="' + $(this).attr('id') + '" style="width: 25%; margin-right: 1%;">-1</button><button type="button" class="btn btn-success inc-increase" data-increase="' + $(this).attr('id') + '" style="width: 25%; margin-left: 1%;">+1</button>');
});
$('.inc-increase').click(function () {
  $('.' + $(this).attr('data-increase')).val(parseInt($('.' + $(this).attr('data-increase')).val()) + 1);
  spanInput = 'input[name=' + $(this).attr('data-increase') + ']';
  spanJson = $(this).attr('data-json');
  click(spanInput, spanJson);
});
$('.inc-decrease').click(function () {
  $('.' + $(this).attr('data-decrease')).val(parseInt($('.' + $(this).attr('data-decrease')).val()) - 1);
  if ($('.increment-input').val() < 0) {
    $('.' + $(this).attr('data-decrease')).val(0);
  }
  spanInput = 'input[name=' + $(this).attr('data-decrease') + ']';
  spanJson = $(this).attr('data-json');
  click(spanInput, spanJson);
});
$('.short-answer').each(function () {
  $(this).replaceWith('<h3 class="center">' + $(this).attr('data-title') + '</h3><br><textarea class="form-control  ' + $(this).attr('id') + '" placeholder="' + $(this).attr('data-placeholder') + '"></textarea>')
});
var slider;
$('.slider').each(function () {
  slider = document.getElementById($(this).attr('id'));
  if ($(this).attr('data-sliders') == 1) {
    noUiSlider.create(slider, {
      start: [50],
      tooltips: [true],
      behavior: 'tap',
      connect: [true, true],
      range: {
        'min': [0],
        'max': [100]
      }
    });
    var connect = slider.querySelectorAll('.noUi-connect');
    var classes = ['slider-2-1', 'slider-1-2'];
    for (i = 0; i < connect.length; i++) {
      connect[i].classList.add(classes[i]);
    };
  } else if ($(this).attr('data-sliders') == 2) {
    noUiSlider.create(slider, {
      start: [33, 67],
      tooltips: [true, true],
      behavior: 'tap',
      connect: [true, true, true],
      range: {
        'min': [0],
        'max': [100]
      }
    });
    var connect = slider.querySelectorAll('.noUi-connect');
    var classes = ['slider-2-1', 'slider-2-2', 'slider-2-3'];
    for (i = 0; i < connect.length; i++) {
      connect[i].classList.add(classes[i]);
    };
  } else if ($(this).attr('data-sliders') == 3) {
    noUiSlider.create(slider, {
      start: [25, 50, 75],
      tooltips: [true, true, true],
      behavior: 'tap',
      connect: [true, true, true, true],
      range: {
        'min': [0],
        'max': [100]
      }
    });
    var connect = slider.querySelectorAll('.noUi-connect');
    var classes = ['slider-3-1', 'slider-3-2', 'slider-3-3', 'slider-3-4'];
    for (i = 0; i < connect.length; i++) {
      connect[i].classList.add(classes[i]);
    };
  } else if ($(this).attr('data-sliders') == 4) {
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
    var connect = slider.querySelectorAll('.noUi-connect');
    var classes = ['slider-4-1', 'slider-4-2', 'slider-4-3', 'slider-4-4', 'slider-4-5'];
    for (i = 0; i < connect.length; i++) {
      connect[i].classList.add(classes[i]);
    };
  }
});
var csAmt = [];
var csBadgeArr = [];
var csIdName;
var csClassName;
$('.cycle-submit').each(function () {
  csAmt.push($(this).attr('id'));
  if ($(this).attr('data-choice-3') == undefined) {
    $(this).replaceWith('<h3>' + $(this).attr('data-title') + '&nbsp;<span class="badge hide"><span class="badge-replace"></span></span></h3><div class="btn-group" data-toggle="buttons"><span class="btn btn-success"><input type="radio" class="' + $(this).attr('id') + '" value="' + $(this).attr('data-choice-1') + '" autocomplete="off">' + $(this).attr('data-choice-1') + '</span><span class="btn btn-danger"><input type="radio" class="' + $(this).attr('id') + '" value="' + $(this).attr('data-choice-2') + '" autocomplete="off">' + $(this).attr('data-choice-2') + '</span></div><br><br><button type="button" class="btn btn-success btn-cycle-submit" id="' + $(this).attr('id') + '">' + $(this).attr('data-submit-title') + '</button>');
  } else if ($(this).attr('data-choice-4') == undefined) {
    $(this).replaceWith('<h3>' + $(this).attr('data-title') + '&nbsp;<span class="badge hide"><span class="badge-replace"></span></span></h3><div class="btn-group" data-toggle="buttons"><span class="btn btn-success"><input type="radio" class="' + $(this).attr('id') + '" value="' + $(this).attr('data-choice-1') + '" autocomplete="off">' + $(this).attr('data-choice-1') + '</span><span class="btn btn-warning"><input type="radio" class="' + $(this).attr('id') + '" value="' + $(this).attr('data-choice-2') + '" autocomplete="off">' + $(this).attr('data-choice-2') + '</span><span class="btn btn-danger"><input type="radio" class="' + $(this).attr('id') + '" value="' + $(this).attr('data-choice-3') + '" autocomplete="off">' + $(this).attr('data-choice-3') + '</span></div><br><br><button type="button" class="btn btn-success btn-cycle-submit" id="' + $(this).attr('id') + '">' + $(this).attr('data-submit-title') + '</button>');
  } else if ($(this).attr('data-choice-5') == undefined) {
    $(this).replaceWith('<h3>' + $(this).attr('data-title') + '&nbsp;<span class="badge hide"><span class="badge-replace"></span></span></h3><div class="btn-group" data-toggle="buttons"><span class="btn btn-success"><input type="radio" class="' + $(this).attr('id') + '" value="' + $(this).attr('data-choice-1') + '" autocomplete="off">' + $(this).attr('data-choice-1') + '</span><span class="btn btn-primary"><input type="radio" class="' + $(this).attr('id') + '" value="' + $(this).attr('data-choice-2') + '" autocomplete="off">' + $(this).attr('data-choice-2') + '</span><span class="btn btn-warning"><input type="radio" class="' + $(this).attr('id') + '" value="' + $(this).attr('data-choice-3') + '" autocomplete="off">' + $(this).attr('data-choice-3') + '</span><span class="btn btn-danger"><input type="radio" class="' + $(this).attr('id') + '" value="' + $(this).attr('data-choice-4') + '" autocomplete="off">' + $(this).attr('data-choice-4') + '</span></div><br><br><button type="button" class="btn btn-success btn-cycle-submit" id="' + $(this).attr('id') + '">' + $(this).attr('data-submit-title') + '</button>');
  }
});
$('.btn-cycle-submit').click(function () {
  csIdName = $(this).attr('id');
  csClassName = '.' + csIdName;
  csBadgeArr.push($(csClassName + ':checked').val());
  show('.badge');
  $('.badge-replace').replaceWith('<span class="badge-replace">' + csBadgeArr.length + '</span>');
});
// Tabs
var tabClass;
for (i in divIdArr) {
  divIdArr[i] = divIdArr[i].toLowerCase();
  $('.tab-' + divIdArr[i]).click(function () {
    if (!$(this).hasClass('disabled')) {
      tabClass = $(this).attr('class');
      tabSwitch('.' + tabClass.substring(4));
    }
  });
}
$('.tab-login').addClass('active');
// Login
var login;
$('.login-form').focus(function(){
	$('.login-form').keypress(function(){
		if (event.which == 13) {
      event.preventDefault();
      login();
    }
  });
});
$('.btn-login').click(function () {
  login();
});
$('.btn-continue').click(function () {
  json.scoutId = parseInt($('.login-top-id').text());
  tabSwitch('.tab-' + divIdArr[1].toLowerCase());
  $('[data-toggle=popover]').click();
  $('.tab').removeClass('disabled');
  $('.tab-login').addClass('disabled');
  $('.info-bar-match-number').attr('readonly', 'readonly');
});
// Forgot ID
for (i in scouts) {
  $('.forgot-id-table').append('<tr><td>' + i + '</td><td>' + scouts[i] + '</td></tr>');
}
$('.btn-forgot-id').click(function () {
  hide('.body-div');
  show('.forgot-id');
});
// Info Bar
$('.info-bar-match-number').val(parseInt(matchNum));
$('.info-bar-match-number').click(function () {
  $('.info-bar-match-number').keypress(function () {
    if (event.which = 13) {
      event.preventDefault();
      fs.writeFileSync('matchNum.txt', $('.info-bar-match-number').val());
      $('.info-bar-match-number').val(parseInt(matchNum));
    }
  });
});
// JSON
$('.btn-save').click(function () {
  jsonStringify(json, 'data/m' + $('.info-bar-match-number').val() + '-' + 'r1' + '-' + '0001.json');
  fs.writeFileSync('matchNum.txt', parseInt(matchNum) + 1);
	const {ipcRenderer} = require('electron');
	ipcRenderer.send('quit');
});
